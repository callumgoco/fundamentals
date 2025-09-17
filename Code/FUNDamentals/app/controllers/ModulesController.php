<?php

class ModulesController extends Controller {
    function show($f3) {
        $f3->set('user', $_SESSION['user']);
        $f3->set('PATH', '/modules');
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        $user_id = $user->id;
        
        $module_progress = new DB\SQL\Mapper($this->db, 'module_progress');
        $module_progress->load(['user_id=?', $user_id]);
        
        $quiz_results = $this->db->exec('SELECT module, quiz_type, score, total_questions FROM quiz_results WHERE user_id = ?', [$user_id]);
        $challenge_summaries = $this->db->exec('SELECT module, total_score, total_scenarios, max_possible_score FROM challenge_summary WHERE user_id = ?', [$user_id]);
        
        $game_scores = $this->db->exec('SELECT module, score, total_scenarios FROM game_scores WHERE user_id = ?', [$user_id]);
        
        $modules_completion = [
            'budgeting' => [
                'completed' => !$module_progress->dry() && $module_progress->budgeting_progress >= 100,
                'progress' => !$module_progress->dry() ? $module_progress->budgeting_progress : 0,
                'has_pre_quiz' => false,
                'has_post_quiz' => false,
                'has_game' => false,
                'pre_quiz_score' => [
                    'score' => 0,
                    'total' => 5
                ],
                'post_quiz_score' => [
                    'score' => 0,
                    'total' => 7
                ],
                'game_score' => [
                    'score' => 0,
                    'total_scenarios' => 6,
                    'max_score' => 12
                ]
            ],
            'saving' => [
                'completed' => !$module_progress->dry() && $module_progress->savings_progress >= 100,
                'progress' => !$module_progress->dry() ? $module_progress->savings_progress : 0,
                'has_pre_quiz' => false,
                'has_post_quiz' => false,
                'has_game' => false,
                'pre_quiz_score' => [
                    'score' => 0,
                    'total' => 5
                ],
                'post_quiz_score' => [
                    'score' => 0,
                    'total' => 7
                ],
                'game_score' => [
                    'score' => 0,
                    'total_scenarios' => 10,
                    'max_score' => 100
                ]
            ]
        ];
        
        foreach ($quiz_results as $quiz) {
            if ($quiz['module'] == 'budgeting') {
                if ($quiz['quiz_type'] == 'pre') {
                    $modules_completion['budgeting']['has_pre_quiz'] = true;
                    $modules_completion['budgeting']['pre_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 5
                    ];
                } elseif ($quiz['quiz_type'] == 'post') {
                    $modules_completion['budgeting']['has_post_quiz'] = true;
                    $modules_completion['budgeting']['post_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 7
                    ];
                }
            } elseif ($quiz['module'] == 'saving') {
                if ($quiz['quiz_type'] == 'pre') {
                    $modules_completion['saving']['has_pre_quiz'] = true;
                    $modules_completion['saving']['pre_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 5
                    ];
                } elseif ($quiz['quiz_type'] == 'post') {
                    $modules_completion['saving']['has_post_quiz'] = true;
                    $modules_completion['saving']['post_quiz_score'] = [
                        'score' => $quiz['score'],
                        'total' => $quiz['total_questions'] ?: 7
                    ];
                }
            }
        }
        
        foreach ($challenge_summaries as $challenge) {
            if ($challenge['module'] == 'budgeting') {
                $modules_completion['budgeting']['has_game'] = true;
                $modules_completion['budgeting']['game_score'] = [
                    'score' => $challenge['total_score'],
                    'total_scenarios' => $challenge['total_scenarios'],
                    'max_score' => $challenge['max_possible_score']
                ];
            }
        }
        
        foreach ($game_scores as $game_score) {
            if ($game_score['module'] == 'budgeting') {
                $modules_completion['budgeting']['has_game'] = true;
                $total_scenarios = $game_score['total_scenarios'] ?: 6;
                $max_score = $total_scenarios * 2;
                $modules_completion['budgeting']['game_score'] = [
                    'score' => $game_score['score'],
                    'total_scenarios' => $total_scenarios,
                    'max_score' => $max_score
                ];
            }
        }
        
        foreach ($game_scores as $game_score) {
            if ($game_score['module'] == 'saving') {
                $modules_completion['saving']['has_game'] = true;
                $modules_completion['saving']['game_score'] = [
                    'score' => $game_score['score'],
                    'total_scenarios' => $game_score['total_scenarios'],
                    'max_score' => 100
                ];
            }
        }
        
        $f3->set('modules_completion', $modules_completion);
        $f3->set('onboarding_completed', $user->onboarding_completed);
        $f3->set('has_seen_tour', $user->has_seen_tour);
        $f3->set('tour_continue_section', $user->tour_continue_section);
        $f3->set('title', 'Modules');
        $f3->set('content', 'modules.html');
        echo \Template::instance()->render('layout.html');
    }

    function showBudgeting($f3) {
        $f3->set('user', $_SESSION['user'] ?? '');
        $f3->set('PATH', '/modules');
        $f3->set('title', 'Budgeting Module');
        $f3->set('content', 'budgeting-module.html');
        echo \Template::instance()->render('layout.html');
    }

    function showSaving($f3) {
        $f3->set('user', $_SESSION['user'] ?? '');
        $f3->set('PATH', '/modules');
        $f3->set('title', 'Saving and Goal Setting Module');
        $f3->set('content', 'saving-module.html');
        echo \Template::instance()->render('layout.html');
    }

    function showReview($f3) {
        $module = $f3->get('PARAMS.module');
        
        if (!isset($_SESSION['user'])) {
            $f3->reroute('/');
            return;
        }
        
        $f3->set('user', $_SESSION['user']);
        $f3->set('PATH', '/modules');
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        $user_id = $user->id;
        
        $quiz_results = $this->db->exec('SELECT module, quiz_type, score, total_questions, answers FROM quiz_results WHERE user_id = ? AND module = ?', [$user_id, $module]);
        
        $challenge_summary = $this->db->exec('SELECT * FROM challenge_summary WHERE user_id = ? AND module = ?', [$user_id, $module]);
        
        $game_scores = $this->db->exec('SELECT * FROM game_scores WHERE user_id = ? AND module = ?', [$user_id, $module]);
        
        $pre_quiz_questions = $this->db->exec('SELECT * FROM quiz_questions WHERE module = ? AND quiz_type = "pre" ORDER BY question_number', [$module]);
        $post_quiz_questions = $this->db->exec('SELECT * FROM quiz_questions WHERE module = ? AND quiz_type = "post" ORDER BY question_number', [$module]);
        $challenge_scenarios = $this->db->exec('SELECT * FROM challenge_scenarios WHERE module = ? ORDER BY scenario_number', [$module]);
        $performance_insights = $this->db->exec('SELECT * FROM performance_insights WHERE module = ? ORDER BY display_order', [$module]);
        
        $review_data = [
            'module' => $module,
            'pre_quiz' => [
                'score' => 0,
                'total' => 5,
                'answers' => []
            ],
            'post_quiz' => [
                'score' => 0,
                'total' => 7,
                'answers' => []
            ],
            'challenge' => [
                'score' => 0,
                'total_scenarios' => 6,
                'max_score' => 12,
                'scenarios_completed' => 0
            ],
            'pre_quiz_questions' => $pre_quiz_questions,
            'post_quiz_questions' => $post_quiz_questions,
            'challenge_scenarios' => $challenge_scenarios,
            'performance_insights' => $performance_insights
        ];
        
        foreach ($quiz_results as $quiz) {
            if ($quiz['quiz_type'] == 'pre') {
                $review_data['pre_quiz'] = [
                    'score' => $quiz['score'],
                    'total' => $quiz['total_questions'],
                    'answers' => json_decode($quiz['answers'], true)
                ];
            } elseif ($quiz['quiz_type'] == 'post') {
                $review_data['post_quiz'] = [
                    'score' => $quiz['score'],
                    'total' => $quiz['total_questions'],
                    'answers' => json_decode($quiz['answers'], true)
                ];
            }
        }
        
        if ($module == 'budgeting') {
            if (!empty($challenge_summary)) {
                $challenge = $challenge_summary[0];
                $review_data['challenge'] = [
                    'score' => $challenge['total_score'],
                    'total_scenarios' => $challenge['total_scenarios'],
                    'max_score' => $challenge['max_possible_score'],
                    'scenarios_completed' => $challenge['scenarios_completed']
                ];
            } elseif (!empty($game_scores)) {
                $game_score = $game_scores[0];
                $total_scenarios = $game_score['total_scenarios'] ?: 6;
                $max_score = $total_scenarios * 2;
                $review_data['challenge'] = [
                    'score' => $game_score['score'],
                    'total_scenarios' => $total_scenarios,
                    'max_score' => $max_score,
                    'scenarios_completed' => $total_scenarios
                ];
            }
        } elseif ($module == 'saving') {
            if (!empty($game_scores)) {
                $game_score = $game_scores[0];
                $review_data['challenge'] = [
                    'score' => $game_score['score'],
                    'total_scenarios' => $game_score['total_scenarios'],
                    'max_score' => 100,
                    'scenarios_completed' => $game_score['total_scenarios']
                ];
            }
        }
        
        $module_info = $this->getModuleInfo($module);
        
        $f3->set('review_data', $review_data);
        $f3->set('module_name', $module_info['name']);
        $f3->set('module_subtitle', $module_info['subtitle']);
        $f3->set('title', 'Module Review - ' . $module_info['name']);
        $f3->set('content', 'module-review.html');
        echo \Template::instance()->render('layout.html');
    }
    
    private function getModuleInfo($module) {
        $modules = [
            'budgeting' => [
                'name' => 'Budgeting and Expense Tracking',
                'subtitle' => 'Learn to manage your money effectively by tracking your income and expenses.'
            ],
            'saving' => [
                'name' => 'Saving and Goal Setting',
                'subtitle' => 'Build financial security through smart saving strategies and goal-setting techniques.'
            ],
            'investing' => [
                'name' => 'Introduction to Investing',
                'subtitle' => 'Discover the basics of investing and building wealth over time.'
            ],
            'savings' => [
                'name' => 'Building an Emergency Fund',
                'subtitle' => 'Prepare for unexpected events by building a solid emergency fund.'
            ],
            'credit' => [
                'name' => 'Credit Management',
                'subtitle' => 'Learn how to build and maintain good credit for your financial future.'
            ]
        ];
        
        return $modules[$module] ?? [
            'name' => ucfirst($module),
            'subtitle' => 'Financial education module'
        ];
    }
}