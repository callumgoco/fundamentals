<?php
// Set home directory
$home = '/home/callumoc';
// Start session
session_start();

// Load F3
$f3 = require($home.'/AboveWebRoot/fatfree-master/lib/base.php');

// Set up configuration
$f3->set('DEBUG', 3);
$f3->set('UI', 'templates/');
$f3->set('BASE', '/FUNDamentals');
$f3->set('TPL.ext', '.html');
$f3->set('UPLOADS', 'uploads/');
$f3->set('AUTOLOAD', 'app/controllers/');

// Database connection
$db = new DB\SQL(
    'mysql:host=localhost;dbname=callumoc_db',
    'callumoc_callumoc',
    'callum_database_2025'
);
$f3->set('DB', $db);

// Routes
$f3->route('GET /', function($f3) {
    if (isset($_SESSION['user'])) {
        // Get user data to check onboarding status
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        
        if ($user->onboarding_completed) {
            $f3->reroute('/dashboard');
        } else {
            $f3->set('user', $_SESSION['user']);
            echo \Template::instance()->render('home.html');
        }
    } else {
        // Show landing page for non-authenticated users
        echo \Template::instance()->render('landing.html');
    }
});

// Authentication routes
$f3->route('GET /login', function($f3) {
    if (!$f3->exists('error')) $f3->set('error', '');
    if (!$f3->exists('success')) $f3->set('success', '');
    echo \Template::instance()->render('login.html');
});

$f3->route('GET /register', function($f3) {
    if (!$f3->exists('error')) $f3->set('error', '');
    if (!$f3->exists('success')) $f3->set('success', '');
    echo \Template::instance()->render('register.html');
});

$f3->route('POST /register', function($f3) {
    $username = $f3->get('POST.username');
    $password = $f3->get('POST.password');
    $email = $f3->get('POST.email');

    // Check if username already exists
    $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
    $user->load(['username=?', $username]);

    if (!$user->dry()) {
        $f3->set('error', 'Username already exists');
        echo \Template::instance()->render('register.html');
        return;
    }

    // Create new user
    $user->reset();
    $user->username = $username;
    $user->password = password_hash($password, PASSWORD_DEFAULT);
    $user->email = $email;
    $user->save();

    $f3->set('success', 'Registration successful! Please log in.');
    echo \Template::instance()->render('login.html');
});

$f3->route('POST /login', function($f3) {
    $username = $f3->get('POST.username');
    $password = $f3->get('POST.password');

    $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
    $user->load(['username=?', $username]);

    if ($user->dry() || !password_verify($password, $user->password)) {
        $f3->set('error', 'Invalid username or password');
        echo \Template::instance()->render('login.html');
        return;
    }

    $_SESSION['user'] = $username;
    
    // Check if user has completed onboarding
    if ($user->onboarding_completed) {
        $f3->reroute('/dashboard');
    } else {
        $f3->reroute('/');
    }
});

$f3->route('GET /logout', function($f3) {
    session_destroy();
    $f3->reroute('/');
});

// Add onboarding routes
$f3->route('GET /onboarding', function($f3) {
    // Check if user is logged in
    if (!isset($_SESSION['user'])) {
        $f3->reroute('/');
        return;
    }
    $f3->set('user', $_SESSION['user']);
    echo \Template::instance()->render('onboarding.html');
});

// Add onboarding data save route
$f3->route('POST /onboarding', function($f3) {
    // Check if user is logged in
    if (!isset($_SESSION['user'])) {
        $f3->error(403); // Forbidden
        return;
    }

    // Get POST data
    $data = json_decode($f3->get('BODY'), true);
    
    // Update user record
    $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
    $user->load(['username=?', $_SESSION['user']]);
    
    if (!$user->dry()) {
        $user->goal = $data['goal'];
        $user->confidence = $data['confidence'];
        $user->learning_style = $data['learn'];
        $user->onboarding_completed = true; // Set onboarding completion flag
        $user->save();
        
        echo json_encode(['status' => 'success']);
    } else {
        $f3->error(404);
    }
});

// Dashboard and core pages
$f3->route('GET /dashboard', 'DashboardController->show');
$f3->route('POST /dashboard/complete-tour', 'DashboardController->completeTour');
$f3->route('GET /modules', 'ModulesController->show');
$f3->route('GET /modules/budgeting', 'ModulesController->showBudgeting');
$f3->route('GET /modules/saving', 'ModulesController->showSaving');
$f3->route('GET /modules/@module/review', 'ModulesController->showReview');
$f3->route('GET /simulations', 'SimulationsController->show');
$f3->route('GET /games', 'GamesController->show');
$f3->route('GET /games/stock-market', 'GamesController->showStockMarket');
$f3->route('GET /games/budget-blitz', 'GamesController->showBudgetBlitz');
$f3->route('GET /games/fomo-fighter', 'GamesController->showFOMOFighter');
$f3->route('GET /vocab', 'VocabController->show');
$f3->route('GET /profile', 'ProfileController->show');
// $f3->route('GET /help', 'HelpController->show');

// Tour API endpoints removed - functionality disabled

// Game Score API endpoints
$f3->route('POST /api/games/score', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $data = json_decode($f3->get('BODY'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $game_name = $data['game_name'] ?? '';
        $score = $data['score'] ?? 0;
        $final_value = $data['final_value'] ?? 0;
        $years_played = $data['years_played'] ?? 0;
        $profit_loss = $data['profit_loss'] ?? 0;

        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Save score to database
        $game_score = new DB\SQL\Mapper($f3->get('DB'), 'mg_scores');
        $game_score->user_id = $user_id;
        $game_score->game_name = $game_name;
        $game_score->score = $score;
        $game_score->final_value = $final_value;
        $game_score->years_played = $years_played;
        $game_score->profit_loss = $profit_loss;
        $game_score->created_at = date('Y-m-d H:i:s');
        $game_score->save();
        
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'score_id' => $game_score->id]);
        
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

$f3->route('GET /api/games/leaderboard/@game', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $game_name = $f3->get('PARAMS.game');
        $limit = $f3->get('GET.limit') ?: 10;
        
        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Get top scores for this game (all users)
        $global_scores = $f3->get('DB')->exec(
            'SELECT gs.*, u.username 
             FROM mg_scores gs 
             JOIN users u ON gs.user_id = u.id 
             WHERE gs.game_name = ? 
             ORDER BY gs.score DESC 
             LIMIT ?', 
            [$game_name, $limit]
        );

        // Get user's personal best scores
        $personal_scores = $f3->get('DB')->exec(
            'SELECT * 
             FROM mg_scores 
             WHERE user_id = ? AND game_name = ? 
             ORDER BY score DESC 
             LIMIT 3', 
            [$user_id, $game_name]
        );

        // Get user's rank
        $user_rank = $f3->get('DB')->exec(
            'SELECT COUNT(*) + 1 as rank 
             FROM (
                SELECT user_id, MAX(score) as best_score 
                FROM mg_scores 
                WHERE game_name = ? 
                GROUP BY user_id
             ) as user_best 
             WHERE best_score > (
                SELECT MAX(score) 
                FROM mg_scores 
                WHERE user_id = ? AND game_name = ?
             )', 
            [$game_name, $user_id, $game_name]
        );

        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'global_leaderboard' => $global_scores,
            'personal_scores' => $personal_scores,
            'user_rank' => $user_rank[0]['rank'] ?? 'N/A'
        ]);
        
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

$f3->route('POST /modules/budgeting/pre-quiz', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $data = json_decode($f3->get('BODY'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $answers = $data['answers'];
        $score = $data['score'];
        $total_questions = $data['total_questions'];

        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Save to database
        $quiz_result = new DB\SQL\Mapper($f3->get('DB'), 'quiz_results');
        $quiz_result->user_id = $user_id;
        $quiz_result->module = 'budgeting';
        $quiz_result->quiz_type = 'pre';
        $quiz_result->answers = json_encode($answers);
        $quiz_result->score = $score;
        $quiz_result->total_questions = $total_questions;
        $quiz_result->save();
        
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'score' => $score]);
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

$f3->route('POST /modules/budgeting/game', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $data = json_decode($f3->get('BODY'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $score = $data['score'];
        $total_scenarios = $data['total_scenarios'];
        $final_budget = $data['final_budget'];

        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Save to database
        $game_score = new DB\SQL\Mapper($f3->get('DB'), 'game_scores');
        $game_score->user_id = $user_id;
        $game_score->module = 'budgeting';
        $game_score->score = $score;
        $game_score->total_scenarios = $total_scenarios;
        $game_score->final_budget = $final_budget;
        $game_score->save();
        
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

$f3->route('POST /modules/budgeting/post-quiz', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $data = json_decode($f3->get('BODY'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $answers = $data['answers'];
        $score = $data['score'];
        $total_questions = $data['total_questions'];

        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Save to quiz_results table
        $quiz_result = new DB\SQL\Mapper($f3->get('DB'), 'quiz_results');
        $quiz_result->user_id = $user_id;
        $quiz_result->module = 'budgeting';
        $quiz_result->quiz_type = 'post';
        $quiz_result->answers = json_encode($answers);
        $quiz_result->score = $score;
        $quiz_result->total_questions = $total_questions;
        $quiz_result->save();
        
        // Update module_progress table
        $module_progress = new DB\SQL\Mapper($f3->get('DB'), 'module_progress');
        $module_progress->load(['user_id=?', $user_id]);
        
        if($module_progress->dry()){
            $module_progress->user_id = $user_id;
        }
        $module_progress->budgeting_progress = 100; // or some other metric
        $module_progress->save();

        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

// Saving Module API Routes
$f3->route('POST /modules/saving/pre-quiz', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $data = json_decode($f3->get('BODY'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $answers = $data['answers'];
        $score = $data['score'];
        $total_questions = $data['total_questions'];

        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Save to database
        $quiz_result = new DB\SQL\Mapper($f3->get('DB'), 'quiz_results');
        $quiz_result->user_id = $user_id;
        $quiz_result->module = 'saving';
        $quiz_result->quiz_type = 'pre';
        $quiz_result->answers = json_encode($answers);
        $quiz_result->score = $score;
        $quiz_result->total_questions = $total_questions;
        $quiz_result->save();
        
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'score' => $score]);
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

$f3->route('POST /modules/saving/game', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $data = json_decode($f3->get('BODY'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $score = $data['score'];
        $total_saved = $data['total_saved'] ?? 0;
        $final_budget = $data['final_budget'];
        $fomo_level = $data['fomo_level'] ?? 0;
        $social_score = $data['social_score'] ?? 5;
        $decisions = $data['decisions'] ?? [];

        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Save to database
        $game_score = new DB\SQL\Mapper($f3->get('DB'), 'game_scores');
        $game_score->user_id = $user_id;
        $game_score->module = 'saving';
        $game_score->score = $score;
        $game_score->total_scenarios = 10; // FOMO game has 10 rounds
        $game_score->final_budget = $final_budget;
        $game_score->save();
        
        // Save additional FOMO game data to a separate table if needed
        // For now, we'll store the additional data in the existing structure
        // You can create a separate table later if needed
        
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

$f3->route('POST /modules/saving/post-quiz', function($f3) {
    if (!isset($_SESSION['user'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Not logged in']);
        return;
    }

    try {
        $data = json_decode($f3->get('BODY'), true);
        if (!$data) {
            throw new Exception('Invalid JSON data');
        }
        
        $answers = $data['answers'];
        $score = $data['score'];
        $total_questions = $data['total_questions'];

        // Get user ID
        $user = new DB\SQL\Mapper($f3->get('DB'), 'users');
        $user->load(['username=?', $_SESSION['user']]);
        if ($user->dry()) {
            throw new Exception('User not found');
        }
        $user_id = $user->id;

        // Save to quiz_results table
        $quiz_result = new DB\SQL\Mapper($f3->get('DB'), 'quiz_results');
        $quiz_result->user_id = $user_id;
        $quiz_result->module = 'saving';
        $quiz_result->quiz_type = 'post';
        $quiz_result->answers = json_encode($answers);
        $quiz_result->score = $score;
        $quiz_result->total_questions = $total_questions;
        $quiz_result->save();
        
        // Update module_progress table
        $module_progress = new DB\SQL\Mapper($f3->get('DB'), 'module_progress');
        $module_progress->load(['user_id=?', $user_id]);
        
        if($module_progress->dry()){
            $module_progress->user_id = $user_id;
        }
        $module_progress->savings_progress = 100; // Mark saving module as completed
        $module_progress->save();

        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
});

// Run the application
$f3->run(); 