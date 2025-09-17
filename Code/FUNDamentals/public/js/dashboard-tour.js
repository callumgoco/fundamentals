document.addEventListener('DOMContentLoaded', function() {
    initializeCircularProgress();
    
    initializeDashboardFeatures();
    
    if (window.dashboardData && !window.dashboardData.hasSeenTour && window.dashboardData.onboardingCompleted) {
        setTimeout(() => {
            startDashboardTour();
        }, 1000);
    }
});

function initializeCircularProgress() {
    const progressCircle = document.querySelector('.circular-progress-circle');
    if (!progressCircle) return;
    
    const percentage = parseInt(progressCircle.dataset.percentage) || 0;
    
    progressCircle.style.setProperty('--percentage', 0);
    progressCircle.style.background = `conic-gradient(
        from -90deg,
        #ff6b35 0deg,
        #ff4500 0deg,
        #f1f5f9 0deg,
        #f1f5f9 360deg
    )`;
    
    setTimeout(() => {
        animateCircularProgress(progressCircle, 0, percentage, 2000);
    }, 200);
    
    const percentageText = progressCircle.querySelector('.percentage');
    if (percentageText) {
        animateNumber(percentageText, 0, percentage, 2000);
    }
}

function animateCircularProgress(element, start, end, duration) {
    const startTime = Date.now();
    const difference = end - start;
    
    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentPercentage = start + (difference * easeProgress);
        const currentDegrees = Math.round(currentPercentage * 3.6 * 10) / 10;
        
        element.style.setProperty('--percentage', currentPercentage);
        
        element.style.background = `conic-gradient(
            from -90deg,
            #ff6b35 0deg,
            #ff4500 ${currentDegrees}deg,
            #f1f5f9 ${currentDegrees}deg,
            #f1f5f9 360deg
        )`;
        
        if (progress < 1) {
            requestAnimationFrame(updateProgress);
        }
    }
    
    requestAnimationFrame(updateProgress);
}

function animateNumber(element, start, end, duration) {
    const startTime = Date.now();
    const difference = end - start;
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (difference * easeProgress));
        
        element.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function initializeDashboardFeatures() {
    const statCardElements = document.querySelectorAll('.stat-card');
    statCardElements.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, (index + 1) * 150);
    });
    
    const progressCard = document.querySelector('.combined-progress-card');
    if (progressCard) {
        progressCard.style.opacity = '0';
        progressCard.style.transform = 'translateY(30px)';
        progressCard.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            progressCard.style.opacity = '1';
            progressCard.style.transform = 'translateY(0)';
        }, 300);
    }
}

function startDashboardTour() {
    const tourSteps = [
        {
            intro: `<strong>Welcome to FUNDamentals! 🎉</strong><br><br>
                   Let me show you around your dashboard. This quick tour will help you discover all the tools and features 
                   available to boost your financial literacy.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.sidebar nav ul li:nth-child(1)',
            intro: `<strong>Dashboard</strong><br><br>
                   Your home base! View your progress, achievements, and get quick access to learning activities.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.sidebar nav ul li:nth-child(2)',
            intro: `<strong>Modules</strong><br><br>
                   Interactive learning modules covering budgeting, saving, and investing. Each module includes lessons, 
                   quizzes, and hands-on activities.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.sidebar nav ul li:nth-child(3)',
            intro: `<strong>Calculators</strong><br><br>
                   Financial calculators and tools to help you make informed decisions about budgeting, loans, 
                   and investments.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.sidebar nav ul li:nth-child(4)',
            intro: `<strong>Mini-Games</strong><br><br>
                   Fun, interactive games that teach financial concepts through gameplay. Learn while having fun!`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.sidebar nav ul li:nth-child(5)',
            intro: `<strong>Money Words</strong><br><br>
                   Your financial vocabulary guide. Learn key financial terms with simple explanations and examples.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.sidebar nav ul li:nth-child(6)',
            intro: `<strong>Profile</strong><br><br>
                   Manage your account settings, view your learning preferences, and track your overall progress.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.progress-overview-section',
            intro: `<strong>Progress Overview</strong><br><br>
                   Your learning dashboard at a glance! See your stats for games played, modules completed, 
                   quiz attempts, and overall progress.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.stats-grid',
            intro: `<strong>Your Statistics</strong><br><br>
                   Track your learning activity:<br>
                   • <strong>Games Played:</strong> Interactive learning games completed<br>
                   • <strong>Best Score:</strong> Your highest quiz scores<br>
                   • <strong>Modules Completed:</strong> Learning modules you've finished<br>
                   • <strong>Quiz Attempts:</strong> Total quizzes you've taken`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.modules-overview-section',
            intro: `<strong>Learning Modules</strong><br><br>
                   Your structured learning path. Each module includes interactive lessons, quizzes, and practical 
                   exercises to build your financial knowledge step by step.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.modules-grid .module-card:first-child',
            intro: `<strong>Budgeting Module</strong><br><br>
                   Learn the fundamentals of managing your money, tracking expenses, and creating effective budgets. 
                   This is a great starting point for your financial journey.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.modules-grid .module-card:nth-child(2)',
            intro: `<strong>Saving Module</strong><br><br>
                   Discover smart saving strategies, goal-setting techniques, and how to build financial security 
                   for your future.`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            element: '.achievements-section',
            intro: `<strong>Your Achievements</strong><br><br>
                   Track your accomplishments and milestones:<br>
                   • <strong>Badges:</strong> Earned for completing modules and activities<br>
                   • <strong>Streaks:</strong> Keep your learning momentum going<br>
                   • <strong>Challenges:</strong> Special tasks that test your skills`,
            tooltipClass: 'dashboard-tour-tooltip'
        },
        {
            intro: `<strong>You're all set! 🚀</strong><br><br>
                   Now you know your way around the dashboard. Ready to start your financial learning journey? 
                   I recommend beginning with the <strong>Budgeting Module</strong> to build a solid foundation.`,
            tooltipClass: 'dashboard-tour-tooltip'
        }
    ];

    introJs()
        .setOptions({
            steps: tourSteps,
            showProgress: true,
            showBullets: false,
            exitOnOverlayClick: false,
            exitOnEsc: true,
            nextLabel: 'Next →',
            prevLabel: '← Back',
            skipLabel: 'Skip',
            doneLabel: 'Start Learning!'
        })
        .onbeforechange(function(targetElement) {
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center',
                    inline: 'nearest'
                });
            }
        })
        .oncomplete(function() {
            markTourAsCompleted();
        })
        .onexit(function() {
            markTourAsCompleted();
        })
        .start();
}

async function markTourAsCompleted() {
    try {
        const response = await fetch('/FUNDamentals/dashboard/complete-tour', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: window.dashboardData?.user || ''
            })
        });

        const result = await response.json();
        
        if (result.success) {
            console.log('Tour completion marked successfully');
            if (window.dashboardData) {
                window.dashboardData.hasSeenTour = true;
            }
        } else {
            console.error('Failed to mark tour as completed:', result.error);
        }
    } catch (error) {
        console.error('Error marking tour as completed:', error);
    }
}

function restartDashboardTour() {
    startDashboardTour();
}

window.startDashboardTour = startDashboardTour;
window.restartDashboardTour = restartDashboardTour;

 