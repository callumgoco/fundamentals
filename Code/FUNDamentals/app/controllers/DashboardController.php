<?php

class DashboardController extends Controller {
    function show($f3) {
        $f3->set('user', $_SESSION['user']);
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        $user_id = $user->id;
        
        $f3->set('goal', $user->goal);
        $f3->set('learning_style', $user->learning_style);
        $f3->set('confidence', $user->confidence);
        $f3->set('onboarding_completed', $user->onboarding_completed);
        
        $f3->set('has_seen_tour', $user->has_seen_tour);
        $f3->set('tour_continue_section', $user->tour_continue_section);
        
        error_log("Tour Debug - User: " . $_SESSION['user'] . 
                  ", has_seen_tour: " . var_export($user->has_seen_tour, true) . 
                  ", onboarding_completed: " . var_export($user->onboarding_completed, true) . 
                  ", tour_continue_section: " . var_export($user->tour_continue_section, true));
        
        $module_progress = new DB\SQL\Mapper($this->db, 'module_progress');
        $module_progress->load(['user_id=?', $user_id]);
        
        $quiz_results = $this->db->exec('SELECT module, quiz_type, score, total_questions, created_at FROM quiz_results WHERE user_id = ? ORDER BY created_at DESC', [$user_id]);
        $game_scores = $this->db->exec('SELECT module, score, total_scenarios, final_budget, created_at FROM game_scores WHERE user_id = ? ORDER BY created_at DESC', [$user_id]);
        
        $modules_data = [
            'budgeting' => [
                'name' => 'Budgeting and Expense Tracking',
                'completed' => !$module_progress->dry() && $module_progress->budgeting_progress >= 100,
                'progress' => !$module_progress->dry() ? $module_progress->budgeting_progress : 0,
                'pre_quiz_score' => [
                    'score' => 0,
                    'total' => 5,
                    'percentage' => 0
                ],
                'post_quiz_score' => [
                    'score' => 0,
                    'total' => 7,
                    'percentage' => 0
                ],
                'game_score' => [
                    'score' => 0,
                    'max_score' => 12,
                    'percentage' => 0,
                    'final_budget' => 0
                ],
                'last_activity' => null
            ],
            'saving' => [
                'name' => 'Saving and Goal Setting',
                'completed' => !$module_progress->dry() && $module_progress->savings_progress >= 100,
                'progress' => !$module_progress->dry() ? $module_progress->savings_progress : 0,
                'pre_quiz_score' => [
                    'score' => 0,
                    'total' => 5,
                    'percentage' => 0
                ],
                'post_quiz_score' => [
                    'score' => 0,
                    'total' => 7,
                    'percentage' => 0
                ],
                'game_score' => [
                    'score' => 0,
                    'max_score' => 100,
                    'percentage' => 0,
                    'final_budget' => 0
                ],
                'last_activity' => null
            ]
        ];
        
        foreach ($quiz_results as $quiz) {
            if ($quiz['module'] == 'budgeting') {
                if ($quiz['quiz_type'] == 'pre') {
                    $modules_data['budgeting']['pre_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 5,
                        'percentage' => round(($quiz['score'] / ($quiz['total_questions'] ?: 5)) * 100)
                    ];
                    $modules_data['budgeting']['last_activity'] = $quiz['created_at'];
                } elseif ($quiz['quiz_type'] == 'post') {
                    $modules_data['budgeting']['post_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 7,
                        'percentage' => round(($quiz['score'] / ($quiz['total_questions'] ?: 7)) * 100)
                    ];
                    $modules_data['budgeting']['last_activity'] = $quiz['created_at'];
                }
            } elseif ($quiz['module'] == 'saving') {
                if ($quiz['quiz_type'] == 'pre') {
                    $modules_data['saving']['pre_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 5,
                        'percentage' => round(($quiz['score'] / ($quiz['total_questions'] ?: 5)) * 100)
                    ];
                    $modules_data['saving']['last_activity'] = $quiz['created_at'];
                } elseif ($quiz['quiz_type'] == 'post') {
                    $modules_data['saving']['post_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 7,
                        'percentage' => round(($quiz['score'] / ($quiz['total_questions'] ?: 7)) * 100)
                    ];
                    $modules_data['saving']['last_activity'] = $quiz['created_at'];
                }
            }
        }
        
        foreach ($game_scores as $game) {
            if ($game['module'] == 'budgeting') {
                $total_scenarios = $game['total_scenarios'] ?: 6;
                $max_score = $total_scenarios * 2;
                $modules_data['budgeting']['game_score'] = [
                    'score' => $game['score'],
                    'max_score' => $max_score,
                    'percentage' => round(($game['score'] / $max_score) * 100),
                    'final_budget' => $game['final_budget']
                ];
                $modules_data['budgeting']['last_activity'] = $game['created_at'];
            } elseif ($game['module'] == 'saving') {
                $total_scenarios = $game['total_scenarios'] ?: 10;
                $max_score = 100;
                $modules_data['saving']['game_score'] = [
                    'score' => $game['score'],
                    'max_score' => $max_score,
                    'percentage' => round(($game['score'] / $max_score) * 100),
                    'final_budget' => $game['final_budget']
                ];
                $modules_data['saving']['last_activity'] = $game['created_at'];
            }
        }
        
        $total_modules = 5;
        $completed_modules = 0;
        $total_progress = 0;
        
        foreach ($modules_data as $module) {
            if ($module['completed']) {
                $completed_modules++;
            }
            $total_progress += $module['progress'];
        }
        
        $overall_completion = round($total_progress / $total_modules);
        
        $total_quizzes = count($quiz_results);
        $total_games = count($game_scores);
        
        $recent_activities = array_merge($quiz_results, $game_scores);
        $activity_dates = array_unique(array_map(function($activity) {
            return date('Y-m-d', strtotime($activity['created_at']));
        }, $recent_activities));
        $current_streak = count($activity_dates);

        $progress_status = 'starting';
        if ($overall_completion >= 80) {
            $progress_status = 'excellent';
        } elseif ($overall_completion >= 50) {
            $progress_status = 'good';
        } elseif ($overall_completion >= 20) {
            $progress_status = 'working';
        }

        $module_completion_percentage = round(($completed_modules / $total_modules) * 100);

        $f3->set('modules_data', $modules_data);
        $f3->set('overall_completion', $overall_completion);
        $f3->set('completed_modules', $completed_modules);
        $f3->set('total_modules', $total_modules);
        $f3->set('module_completion_percentage', $module_completion_percentage);
        $f3->set('total_quizzes', $total_quizzes);
        $f3->set('total_games', $total_games);
        $f3->set('current_streak', $current_streak);
        $f3->set('progress_status', $progress_status);

        $f3->set('title', 'Dashboard');
        $f3->set('PATH', '/dashboard');
        $f3->set('content', 'dashboard.html');
        
        echo \Template::instance()->render('layout.html');
    }
    
    function completeTour($f3) {
        header('Content-Type: application/json');

        if (!isset($_SESSION['user'])) {
            http_response_code(403);
            echo json_encode(['success' => false, 'error' => 'Not logged in']);
            return;
        }

        try {
            $input = json_decode(file_get_contents('php://input'), true);

            $user = new DB\SQL\Mapper($this->db, 'users');
            $user->load(['username=?', $_SESSION['user']]);
            
            if (!$user->dry()) {
                $user->has_seen_tour = 1;
                $user->save();
                
                echo json_encode(['success' => true, 'message' => 'Tour completion recorded']);
            } else {
                echo json_encode(['success' => false, 'error' => 'User not found']);
            }
            
        } catch (Exception $e) {
            error_log('Error completing tour: ' . $e->getMessage());
            echo json_encode(['success' => false, 'error' => 'An error occurred while updating tour status']);
        }
    }
}