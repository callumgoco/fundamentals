<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= ($title) ?> - FUNDamentals</title>
    <link rel="stylesheet" href="/FUNDamentals/public/css/style.css">
    <link rel="stylesheet" href="/FUNDamentals/public/css/animations.css">
    <link rel="stylesheet" href="/FUNDamentals/public/css/dashboard-tour.css">
    <link rel="icon" href="/FUNDamentals/public/img/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Inter:400,600,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intro.js@7.2.0/minified/introjs.min.css">
    <script src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.6.2/dist/dotlottie-wc.js" type="module"></script>
    <script type="text/javascript">
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "s3ymmxcupc");
    </script>
</head>
<body>
    <div class="app-layout">
        <aside class="sidebar">
            <div class="logo-container">
                <span class="material-icons logo-icon">savings</span>
                <div class="logo">FUNDamentals</div>
            </div>
            <nav>
                <ul>
                    <li><a href="/FUNDamentals/dashboard" <?= ($PATH == '/dashboard' ? 'class="active"' : '') ?>><span class="material-icons">dashboard</span> Dashboard</a></li>
                    <li><a href="/FUNDamentals/modules" <?= ($PATH == '/modules' ? 'class="active"' : '') ?>><span class="material-icons">menu_book</span> Modules</a></li>
                    <li><a href="/FUNDamentals/simulations" <?= ($PATH == '/simulations' ? 'class="active"' : '') ?>><span class="material-icons">science</span> Calculators</a></li>
                    <li><a href="/FUNDamentals/games" <?= ($PATH == '/games' ? 'class="active"' : '') ?>><span class="material-icons">sports_esports</span> Mini-Games</a></li>
                    <li><a href="/FUNDamentals/vocab" <?= ($PATH == '/vocab' ? 'class="active"' : '') ?>><span class="material-icons">school</span> Money Words</a></li>
                    <li><a href="/FUNDamentals/profile" <?= ($PATH == '/profile' ? 'class="active"' : '') ?>><span class="material-icons">person</span> Profile</a></li>
                </ul>
            </nav>
            <a href="/FUNDamentals/profile" class="profile-box" data-tooltip="View Profile">
                <div class="avatar-container">
                    <div class="avatar"><?= (substr($user,0,1)) ?></div>
                    <div class="progress-ring">
                        <div class="progress-fill" style="--progress: <?= ($sidebar_progress ?: 0) ?>%;"></div>
                    </div>
                </div>
                <div class="user-info">
                    <div class="user-name"><?= ($user) ?></div>
                    <div class="user-progress"><?= ($sidebar_progress ?: 0) ?>% Complete</div>
                </div>

                <div class="tooltip">
                    <div class="tooltip-header">Your Progress</div>
                    <div class="tooltip-stats">
                        <div class="stat">
                            <span class="stat-value"><?= ($sidebar_progress ?: 0) ?>%</span>
                            <span class="stat-label">Overall</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value"><?= ($sidebar_completed_modules ?: 0) ?>/<?= ($sidebar_total_modules ?: 5) ?></span>
                            <span class="stat-label">Modules</span>
                        </div>
                    </div>
                </div>
            </a>
            <a href="/FUNDamentals/logout" class="logout-btn">Logout</a>
        </aside>
        <main class="main-content">
            <?php echo $this->render($content,NULL,get_defined_vars(),0); ?>
        </main>
    </div>
    <script src="/FUNDamentals/public/js/transitions.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/intro.js@7.2.0/minified/intro.min.js"></script>

</body>
</html> 