<?php

class Controller {
    protected $f3;
    protected $db;

    function __construct() {
        $this->f3 = \Base::instance();
        $this->db = $this->f3->get('DB');
    }

    function beforeRoute() {
        if (!isset($_SESSION['user']) && $this->f3->get('PATH') != '/') {
            $this->f3->reroute('/');
            exit;
        }

        if (isset($_SESSION['user'])) {
            $this->setSidebarVariables();
        }
    }

    function afterRoute() {
    }
    
    function setSidebarVariables() {
        $user = new DB\SQL\Mapper($this->db, 'users');
        $user->load(['username=?', $_SESSION['user']]);
        $user_id = $user->id;
        
        $module_progress = new DB\SQL\Mapper($this->db, 'module_progress');
        $module_progress->load(['user_id=?', $user_id]);
        
        $total_modules = 5;
        $total_progress = 0;
        $completed_modules = 0;
        
        if (!$module_progress->dry()) {
            $total_progress += $module_progress->budgeting_progress ?: 0;
            $total_progress += $module_progress->savings_progress ?: 0;
            $total_progress += $module_progress->investing_progress ?: 0;

            if (($module_progress->budgeting_progress ?: 0) >= 100) $completed_modules++;
            if (($module_progress->savings_progress ?: 0) >= 100) $completed_modules++;
            if (($module_progress->investing_progress ?: 0) >= 100) $completed_modules++;
        }
        
        $overall_completion = round($total_progress / $total_modules);

        $this->f3->set('sidebar_progress', $overall_completion);
        $this->f3->set('sidebar_completed_modules', $completed_modules);
        $this->f3->set('sidebar_total_modules', $total_modules);
        $this->f3->set('sidebar_user_role', '');
    }
}