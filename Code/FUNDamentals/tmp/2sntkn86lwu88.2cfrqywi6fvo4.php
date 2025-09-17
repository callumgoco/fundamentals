<div class="dashboard-header">
    <div class="header-content">
        <div class="header-text" id="dashboard-welcome">
            <h1 class="dashboard-title">Hi <?= ($user) ?> 👋 Ready to dive in?</h1>
            <p class="dashboard-subtitle">Your financial journey continues here.</p>
        </div>

        <div class="dashboard-animation-container">
            <div class="lottie-animation-wrapper"></div>
            <dotlottie-wc 
                src="https://lottie.host/da17d58a-8673-42a5-ae4a-72f46b6812be/H0MnbK50JS.lottie"
                style="width: 184px; height: 184px; position: relative; z-index: 2;"
                speed="1"
                autoplay
                loop>
            </dotlottie-wc>
        </div>
    </div>
</div>

<div class="progress-overview-section">
    <div class="combined-progress-card">
        <div class="progress-content">
            <div class="stats-section">
                <div class="section-header">
                    <h2>Overall Progress</h2>
                </div>
                <p class="progress-description">You're making excellent progress on your financial education journey!</p>
                
                <div class="stats-grid">
                    <div class="stat-card games-stat">
                        <div class="stat-icon">
                            <span class="material-icons">sports_esports</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number"><?= ($total_games) ?></div>
                            <div class="stat-label">Games Played</div>
                        </div>
                    </div>
                    
                    <div class="stat-card score-stat">
                        <div class="stat-icon">
                            <span class="material-icons">emoji_events</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number"><?= ($total_quizzes) ?>/12</div>
                            <div class="stat-label">Best Score</div>
                        </div>
                    </div>
                    
                    <div class="stat-card modules-stat">
                        <div class="stat-icon">
                            <span class="material-icons">import_contacts</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number"><?= ($completed_modules) ?>/<?= ($total_modules) ?></div>
                            <div class="stat-label">Modules Completed</div>
                        </div>
                    </div>
                    
                    <div class="stat-card quiz-stat">
                        <div class="stat-icon">
                            <span class="material-icons">psychology</span>
                        </div>
                        <div class="stat-content">
                            <div class="stat-number"><?= ($total_quizzes) ?></div>
                            <div class="stat-label">Quiz Attempts</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="circular-progress">
                <div class="circular-progress-inner">
                    <div class="circular-progress-circle" data-percentage="<?= ($module_completion_percentage) ?>">
                        <div class="circular-progress-fill"></div>
                        <div class="circular-progress-text">
                            <span class="percentage"><?= ($module_completion_percentage) ?>%</span>
                            <span class="label">Complete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modules-overview-section">
    <div class="section-header">
        <h2>Learning Modules</h2>
        <a href="<?= ($BASE) ?>/modules" class="see-all-link">View all modules</a>
    </div>
    
    <div class="modules-grid">
        <div class="module-card">
            <div class="module-header">
                <div class="module-icon budgeting">
                    <span class="material-icons">account_balance_wallet</span>
                </div>
                <div class="module-status">
                    <?php if ($modules_data['budgeting']['completed']): ?>
                        <span class="status-completed">
                            <i class="material-icons" style="font-size: 1rem;">check</i>
                            Completed
                        </span>
                    <?php else: ?>
                        <?php if ($modules_data['budgeting']['progress'] > 0): ?>
                            <span class="status-progress">
                                <i class="material-icons" style="font-size: 1rem;">schedule</i>
                                In Progress
                            </span>
                        <?php else: ?>
                            <span class="status-not-started">
                                <i class="material-icons" style="font-size: 1rem;">error_outline</i>
                                To do list
                            </span>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
            <h3><?= ($modules_data['budgeting']['name']) ?></h3>
            <p>Learn to manage your money effectively by tracking income and expenses.</p>
            <div class="module-action">
                <?php if ($modules_data['budgeting']['completed']): ?>
                    <a href="<?= ($BASE) ?>/modules/budgeting" class="module-link">Review Module</a>
                <?php else: ?>
                    <?php if ($modules_data['budgeting']['progress'] > 0): ?>
                        <a href="<?= ($BASE) ?>/modules/budgeting" class="module-link">Continue Module</a>
                    <?php else: ?>
                        <a href="<?= ($BASE) ?>/modules/budgeting" class="module-link">Start Module</a>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="module-card">
            <div class="module-header">
                <div class="module-icon saving">
                    <span class="material-icons">savings</span>
                </div>
                <div class="module-status">
                    <?php if ($modules_data['saving']['completed']): ?>
                        <span class="status-completed">
                            <i class="material-icons" style="font-size: 1rem;">check</i>
                            Completed
                        </span>
                    <?php else: ?>
                        <?php if ($modules_data['saving']['progress'] > 0): ?>
                            <span class="status-progress">
                                <i class="material-icons" style="font-size: 1rem;">schedule</i>
                                In Progress
                            </span>
                        <?php else: ?>
                            <span class="status-not-started">
                                <i class="material-icons" style="font-size: 1rem;">error_outline</i>
                                To do list
                            </span>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
            <h3><?= ($modules_data['saving']['name']) ?></h3>
            <p>Build financial security through smart saving strategies and goal-setting techniques.</p>
            <div class="module-action">
                <?php if ($modules_data['saving']['completed']): ?>
                    <a href="<?= ($BASE) ?>/modules/saving" class="module-link">Review Module</a>
                <?php else: ?>
                    <?php if ($modules_data['saving']['progress'] > 0): ?>
                        <a href="<?= ($BASE) ?>/modules/saving" class="module-link">Continue Module</a>
                    <?php else: ?>
                        <a href="<?= ($BASE) ?>/modules/saving" class="module-link">Start Module</a>
                    <?php endif; ?>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="module-card coming-soon">
            <div class="module-header">
                <div class="module-icon investing">
                    <span class="material-icons">trending_up</span>
                </div>
                <div class="module-status">
                    <span class="status-not-started">
                        <i class="material-icons" style="font-size: 1rem;">error_outline</i>
                        To do list
                    </span>
                </div>
            </div>
            <h3>Basic Investing</h3>
            <p>Learn investment fundamentals and how your money can grow over time.</p>
            <div class="module-action">
                <button class="module-link" disabled>Coming Soon</button>
            </div>
        </div>
    </div>
</div>

<div class="achievements-section" id="progress-section">
    <div class="section-header">
        <h2>Your Achievements</h2>
    </div>
    
    <div class="achievements-grid">
        <div class="achievement-card">
            <div class="achievement-icon">
                <div class="badge-placeholder">
                    <span class="material-icons">military_tech</span>
                </div>
            </div>
            <h3>Badges</h3>
            <p>Earn badges for learning and completing modules.</p>
            <div class="achievement-stats">
                <span class="stat-muted">0 earned</span>
            </div>
        </div>
        
        <div class="achievement-card">
            <div class="achievement-icon">
                <div class="streak-placeholder">
                    <span class="material-icons">local_fire_department</span>
                </div>
            </div>
            <h3>Streaks</h3>
            <p>Keep your learning streak alive for extra rewards.</p>
            <div class="achievement-stats">
                <span class="stat-highlight"><?= ($current_streak) ?> days</span>
            </div>
        </div>
        
        <div class="achievement-card">
            <div class="achievement-icon">
                <div class="challenge-placeholder">
                    <span class="material-icons">emoji_events</span>
                </div>
            </div>
            <h3>Challenges</h3>
            <p>Complete challenges to test your financial skills.</p>
            <div class="achievement-stats">
                <span class="stat-highlight"><?= ($total_games) ?> completed</span>
            </div>
        </div>
    </div>
</div>

<link rel="stylesheet" href="<?= ($BASE) ?>/public/css/dashboard.css">
<link rel="stylesheet" href="<?= ($BASE) ?>/public/css/dashboard-tour.css">

<script>
    window.dashboardData = {
        onboardingCompleted: <?= ($onboarding_completed ? 'true' : 'false') ?>,
        user: "<?= ($user) ?>",
        userId: "<?= ($user) ?>",
        hasSeenTour: <?= (($has_seen_tour == 1) ? 'true' : 'false') ?>,
        tourContinueSection: <?= ($tour_continue_section ? '"' . $tour_continue_section . '"' : 'null')."
" ?>
    };
</script>
<script src="<?= ($BASE) ?>/public/js/dashboard-tour.js"></script>