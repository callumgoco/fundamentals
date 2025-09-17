<?php

class GamesController extends Controller {
    function show($f3) {
        $f3->set('user', $_SESSION['user']);
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        $user_id = $user->id;
        
        $game_scores = [];
        $games = ['stock-market-simulator', 'budget-blitz', 'fomo-fighter', 'tax-trek'];
        
        foreach ($games as $game) {
            $personal_best = $this->db->exec(
                'SELECT * FROM mg_scores WHERE user_id = ? AND game_name = ? ORDER BY score DESC LIMIT 1',
                [$user_id, $game]
            );
            
            $global_top = $this->db->exec(
                'SELECT gs.*, u.username 
                 FROM mg_scores gs 
                 JOIN users u ON gs.user_id = u.id 
                 WHERE gs.game_name = ? 
                 ORDER BY gs.score DESC 
                 LIMIT 3',
                [$game]
            );
            
            $game_scores[$game] = [
                'personal_best' => !empty($personal_best) ? $personal_best[0] : null,
                'global_top' => $global_top
            ];
        }
        
        $f3->set('game_scores', $game_scores);
        
        $f3->set('onboarding_completed', $user->onboarding_completed);
        $f3->set('has_seen_tour', $user->has_seen_tour);
        $f3->set('tour_continue_section', $user->tour_continue_section);
        $f3->set('title', 'Mini-Games');
        $f3->set('content', 'games.html');
        
        echo \Template::instance()->render('layout.html');
    }
    
    function showStockMarket($f3) {
        $f3->set('user', $_SESSION['user']);
        $f3->set('PATH', '/games');
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        
        $f3->set('title', 'Stock Market Frenzy');
        $f3->set('content', 'stock-market-game.html');
        
        echo \Template::instance()->render('layout.html');
    }
    
    function showBudgetBlitz($f3) {
        $f3->set('user', $_SESSION['user']);
        $f3->set('PATH', '/games');
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        
        $f3->set('title', 'Budget Blitz');
        $f3->set('content', 'budget-blitz-game.html');
        
        echo \Template::instance()->render('layout.html');
    }
    
    function showFOMOFighter($f3) {
        $f3->set('user', $_SESSION['user']);
        $f3->set('PATH', '/games');
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        
        $f3->set('title', 'FOMO Fighter');
        $f3->set('content', 'fomo-fighter-game.html');
        
        echo \Template::instance()->render('layout.html');
    }
}