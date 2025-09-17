<?php

class SimulationsController extends Controller {
    function show($f3) {
        $f3->set('user', $_SESSION['user']);
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        
        $f3->set('onboarding_completed', $user->onboarding_completed);
        $f3->set('has_seen_tour', $user->has_seen_tour);
        $f3->set('tour_continue_section', $user->tour_continue_section);
        $f3->set('title', 'Simulations');
        $f3->set('content', 'simulations.html');
        
        echo \Template::instance()->render('layout.html');
    }
}