<?php

class ProfileController extends Controller {
    function __construct() {
        parent::__construct();
    }

    function show($f3) {
        $f3->set('user', $_SESSION['user']);
        
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        
        $f3->set('email', $user->email);
        $f3->set('goal', $user->goal);
        $f3->set('learning_style', $user->learning_style);
        $f3->set('confidence', $user->confidence);
        
        $f3->set('title', 'Profile & Settings');
        $f3->set('content', 'profile.html');
        
        echo \Template::instance()->render('layout.html');
    }
}