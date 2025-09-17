<link rel="stylesheet" href="<?= ($BASE) ?>/static/css/modules.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<script>
    window.dashboardData = window.dashboardData || {
        onboardingCompleted: <?= ($onboarding_completed ? 'true' : 'false') ?>,
        user: "<?= ($user) ?>"
    };
</script>

<div class="modules-header">
    <div class="header-content">
        <div class="header-text">
            <h1 class="modules-title">Learning Modules</h1>
            <p class="modules-subtitle">Master financial literacy through interactive modules designed for your success</p>
        </div>
        <div class="modules-animation-container">
            <div class="lottie-animation-wrapper"></div>
            <dotlottie-wc 
                src="https://lottie.host/15152c67-9198-4c03-86d4-95b900fbc388/Ni5Gylf8lg.lottie"
                style="width: 184px; height: 184px; position: relative; z-index: 2;"
                speed="1"
                autoplay
                loop>
            </dotlottie-wc>
        </div>
    </div>
</div>

<div class="module-grid">
    <div class="module-card" id="budgeting-module">
        <div class="module-header">
            <div class="module-status">
                <?php if ($modules_completion['budgeting']['completed']): ?>
                    <span class="status-completed">
                        <i class="material-icons" style="font-size: 1rem;">check</i>
                        Completed
                    </span>
                <?php else: ?>
                    <?php if ($modules_completion['budgeting']['progress'] > 0): ?>
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
        
        <h3 class="module-title">Budgeting and Expense Tracking</h3>
        
        <p class="module-description">Learn to manage your money effectively by tracking your income and expenses. Understand the 50/30/20 rule and find the right budgeting tools.</p>
        
        <div class="module-progress">
            <div class="progress-label">
                <i class="material-icons">trending_up</i>
                Progress
            </div>
            
            <div class="progress-items">
                <div class="progress-item <?= ($modules_completion['budgeting']['has_pre_quiz'] ? 'completed' : 'not-completed') ?>" id="module-progress-tracker">
                    <div class="progress-item-name <?= ($modules_completion['budgeting']['has_pre_quiz'] ? 'completed' : 'not-completed') ?>">
                        <i class="material-icons"><?= ($modules_completion['budgeting']['has_pre_quiz'] ? 'check_circle' : 'radio_button_unchecked') ?></i>
                        Pre-Quiz
                    </div>
                    <div class="progress-item-score">
                        <?php if ($modules_completion['budgeting']['has_pre_quiz']): ?>
                            <div class="score-main">
                                <?= ($modules_completion['budgeting']['pre_quiz_score']['score']) ?>/<?= ($modules_completion['budgeting']['pre_quiz_score']['total'])."
" ?>
                            </div>
                        <?php else: ?>
                            <div class="score-main" style="color: #9ca3af;">-/<?= ($modules_completion['budgeting']['pre_quiz_score']['total'] ? $modules_completion['budgeting']['pre_quiz_score']['total'] : '5') ?></div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="progress-item <?= ($modules_completion['budgeting']['has_game'] ? 'completed' : 'not-completed') ?>">
                    <div class="progress-item-name <?= ($modules_completion['budgeting']['has_game'] ? 'completed' : 'not-completed') ?>">
                        <i class="material-icons"><?= ($modules_completion['budgeting']['has_game'] ? 'check_circle' : 'radio_button_unchecked') ?></i>
                        Mini-Game
                    </div>
                    <div class="progress-item-score">
                        <?php if ($modules_completion['budgeting']['has_game']): ?>
                            <div class="score-main">
                                <?= ($modules_completion['budgeting']['game_score']['score']) ?>/<?= ($modules_completion['budgeting']['game_score']['max_score'])."
" ?>
                            </div>
                        <?php else: ?>
                            <div class="score-main" style="color: #9ca3af;">--/<?= ($modules_completion['budgeting']['game_score']['max_score'] ? $modules_completion['budgeting']['game_score']['max_score'] : '12') ?></div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="progress-item <?= ($modules_completion['budgeting']['has_post_quiz'] ? 'completed' : 'not-completed') ?>">
                    <div class="progress-item-name <?= ($modules_completion['budgeting']['has_post_quiz'] ? 'completed' : 'not-completed') ?>">
                        <i class="material-icons"><?= ($modules_completion['budgeting']['has_post_quiz'] ? 'check_circle' : 'radio_button_unchecked') ?></i>
                        Post-Quiz
                    </div>
                    <div class="progress-item-score">
                        <?php if ($modules_completion['budgeting']['has_post_quiz']): ?>
                            <div class="score-main">
                                <?= ($modules_completion['budgeting']['post_quiz_score']['score']) ?>/<?= ($modules_completion['budgeting']['post_quiz_score']['total'])."
" ?>
                            </div>
                        <?php else: ?>
                            <div class="score-main" style="color: #9ca3af;">-/<?= ($modules_completion['budgeting']['post_quiz_score']['total'] ? $modules_completion['budgeting']['post_quiz_score']['total'] : '7') ?></div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="module-action">
            <?php if ($modules_completion['budgeting']['completed']): ?>
                <a href="<?= ($BASE) ?>/modules/budgeting/review" class="btn btn-secondary">Review Module</a>
                <a href="<?= ($BASE) ?>/modules/budgeting" class="btn btn-primary">Try Again</a>
            <?php else: ?>
                <?php if ($modules_completion['budgeting']['progress'] > 0): ?>
                    <a href="<?= ($BASE) ?>/modules/budgeting" class="btn btn-primary">Continue Module</a>
                    <a href="<?= ($BASE) ?>/modules/budgeting/review" class="btn btn-secondary">Review Module</a>
                <?php else: ?>
                    <a href="<?= ($BASE) ?>/modules/budgeting" class="btn btn-primary">Start Module</a>
                    <button class="btn btn-secondary" disabled>Review Module</button>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>

    <div class="module-card" id="saving-module">
        <div class="module-header">
            <div class="module-status">
                <?php if ($modules_completion['saving']['completed']): ?>
                    <span class="status-completed">
                        <i class="material-icons" style="font-size: 1rem;">check</i>
                        Completed
                    </span>
                <?php else: ?>
                    <?php if ($modules_completion['saving']['progress'] > 0): ?>
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
        
        <h3 class="module-title">Saving and Goal Setting</h3>
        
        <p class="module-description">Build financial security through smart saving strategies and goal-setting techniques. Learn about emergency savings, SMART goals, and compound interest.</p>
        
        <div class="module-progress">
            <div class="progress-label">
                <i class="material-icons">trending_up</i>
                Progress
            </div>
            
            <div class="progress-items">
                <div class="progress-item <?= ($modules_completion['saving']['has_pre_quiz'] ? 'completed' : 'not-completed') ?>" id="module-progress-tracker">
                    <div class="progress-item-name <?= ($modules_completion['saving']['has_pre_quiz'] ? 'completed' : 'not-completed') ?>">
                        <i class="material-icons"><?= ($modules_completion['saving']['has_pre_quiz'] ? 'check_circle' : 'radio_button_unchecked') ?></i>
                        Pre-Quiz
                    </div>
                    <div class="progress-item-score">
                        <?php if ($modules_completion['saving']['has_pre_quiz']): ?>
                            <div class="score-main">
                                <?= ($modules_completion['saving']['pre_quiz_score']['score']) ?>/<?= ($modules_completion['saving']['pre_quiz_score']['total'])."
" ?>
                            </div>
                        <?php else: ?>
                            <div class="score-main" style="color: #9ca3af;">-/<?= ($modules_completion['saving']['pre_quiz_score']['total'] ? $modules_completion['saving']['pre_quiz_score']['total'] : '5') ?></div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="progress-item <?= ($modules_completion['saving']['has_game'] ? 'completed' : 'not-completed') ?>">
                    <div class="progress-item-name <?= ($modules_completion['saving']['has_game'] ? 'completed' : 'not-completed') ?>">
                        <i class="material-icons"><?= ($modules_completion['saving']['has_game'] ? 'check_circle' : 'radio_button_unchecked') ?></i>
                        Challenge
                    </div>
                    <div class="progress-item-score">
                        <?php if ($modules_completion['saving']['has_game']): ?>
                            <div class="score-main">
                                <?= ($modules_completion['saving']['game_score']['score']) ?>/<?= ($modules_completion['saving']['game_score']['max_score'])."
" ?>
                            </div>
                        <?php else: ?>
                            <div class="score-main" style="color: #9ca3af;">--/<?= ($modules_completion['saving']['game_score']['max_score'] ? $modules_completion['saving']['game_score']['max_score'] : '12') ?></div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <div class="progress-item <?= ($modules_completion['saving']['has_post_quiz'] ? 'completed' : 'not-completed') ?>">
                    <div class="progress-item-name <?= ($modules_completion['saving']['has_post_quiz'] ? 'completed' : 'not-completed') ?>">
                        <i class="material-icons"><?= ($modules_completion['saving']['has_post_quiz'] ? 'check_circle' : 'radio_button_unchecked') ?></i>
                        Post-Quiz
                    </div>
                    <div class="progress-item-score">
                        <?php if ($modules_completion['saving']['has_post_quiz']): ?>
                            <div class="score-main">
                                <?= ($modules_completion['saving']['post_quiz_score']['score']) ?>/<?= ($modules_completion['saving']['post_quiz_score']['total'])."
" ?>
                            </div>
                        <?php else: ?>
                            <div class="score-main" style="color: #9ca3af;">-/<?= ($modules_completion['saving']['post_quiz_score']['total'] ? $modules_completion['saving']['post_quiz_score']['total'] : '7') ?></div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="module-action">
            <?php if ($modules_completion['saving']['completed']): ?>
                <a href="<?= ($BASE) ?>/modules/saving/review" class="btn btn-secondary">Review Module</a>
                <a href="<?= ($BASE) ?>/modules/saving" class="btn btn-primary">Try Again</a>
            <?php else: ?>
                <?php if ($modules_completion['saving']['progress'] > 0): ?>
                    <a href="<?= ($BASE) ?>/modules/saving" class="btn btn-primary">Continue Module</a>
                    <a href="<?= ($BASE) ?>/modules/saving/review" class="btn btn-secondary">Review Module</a>
                <?php else: ?>
                    <a href="<?= ($BASE) ?>/modules/saving" class="btn btn-primary">Start Module</a>
                    <button class="btn btn-secondary" disabled>Review Module</button>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>

    <div class="module-card coming-soon" id="emergency-fund-module">
        <div class="module-header">
            <div class="module-status">
                <span class="status-not-started">
                    <i class="material-icons" style="font-size: 1rem;">error_outline</i>
                    Coming Soon
                </span>
            </div>
        </div>
        
        <h3 class="module-title">Building an Emergency Fund</h3>
        
        <p class="module-description">Prepare for unexpected events by building a solid emergency fund. Learn how much to save and where to keep your emergency savings.</p>
        
        <div class="module-progress">
            <div class="progress-label">
                <i class="material-icons">trending_up</i>
                Progress
            </div>
            
            <div class="progress-items">
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Pre-Quiz
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">-/5</div>
                    </div>
                </div>
                
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Mini-Game
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">--/12</div>
                    </div>
                </div>
                
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Post-Quiz
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">-/7</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="module-action">
            <button class="btn btn-primary" disabled>Coming Soon</button>
            <button class="btn btn-secondary" disabled>Review Module</button>
        </div>
    </div>

    <div class="module-card coming-soon" id="credit-management-module">
        <div class="module-header">
            <div class="module-status">
                <span class="status-not-started">
                    <i class="material-icons" style="font-size: 1rem;">error_outline</i>
                    Coming Soon
                </span>
            </div>
        </div>
        
        <h3 class="module-title">Understanding and Managing Credit</h3>
        
        <p class="module-description">Discover how credit scores work, the importance of good credit, and how to use credit cards responsibly to avoid debt.</p>
        
        <div class="module-progress">
            <div class="progress-label">
                <i class="material-icons">trending_up</i>
                Progress
            </div>
            
            <div class="progress-items">
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Pre-Quiz
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">-/5</div>
                    </div>
                </div>
                
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Mini-Game
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">--/12</div>
                    </div>
                </div>
                
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Post-Quiz
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">-/7</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="module-action">
            <button class="btn btn-primary" disabled>Coming Soon</button>
            <button class="btn btn-secondary" disabled>Review Module</button>
        </div>
    </div>

    <div class="module-card coming-soon" id="investing-module">
        <div class="module-header">
            <div class="module-status">
                <span class="status-not-started">
                    <i class="material-icons" style="font-size: 1rem;">error_outline</i>
                    Coming Soon
                </span>
            </div>
        </div>
        
        <h3 class="module-title">Basic Investing and Compound Growth</h3>
        
        <p class="module-description">Understand the power of compound growth and learn the basics of investing, including index funds, risk, and long-term strategy.</p>
        
        <div class="module-progress">
            <div class="progress-label">
                <i class="material-icons">trending_up</i>
                Progress
            </div>
            
            <div class="progress-items">
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Pre-Quiz
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">-/5</div>
                    </div>
                </div>
                
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Mini-Game
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">--/12</div>
                    </div>
                </div>
                
                <div class="progress-item not-completed">
                    <div class="progress-item-name not-completed">
                        <i class="material-icons">radio_button_unchecked</i>
                        Post-Quiz
                    </div>
                    <div class="progress-item-score">
                        <div class="score-main" style="color: #9ca3af;">-/7</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="module-action">
            <button class="btn btn-primary" disabled>Coming Soon</button>
            <button class="btn btn-secondary" disabled>Review Module</button>
        </div>
    </div>
</div>

<script>
    window.dashboardData = {
        onboardingCompleted: <?= ($onboarding_completed ? 'true' : 'false') ?>,
        user: "<?= ($user) ?>",
        userId: "<?= ($user) ?>",
        hasSeenTour: <?= ($has_seen_tour ? 'true' : 'false') ?>,
        tourContinueSection: <?= ($tour_continue_section ? '"' . $tour_continue_section . '"' : 'null')."
" ?>
    };
</script> 