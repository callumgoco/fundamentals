function setupTransitions() {
    const main = document.querySelector('.main-content');
    if (main) {
        main.style.animation = 'none';
        main.offsetHeight;
        main.style.animation = 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    }

    const currentPath = window.location.pathname;
    document.querySelectorAll('.sidebar nav a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPath) {
            a.classList.add('active');
            const bar = document.querySelector('.sidebar-bar');
            if (bar) {
                bar.style.top = a.offsetTop + 'px';
            }
        }
    });
}

function setupPageTransitions() {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setupTransitions();
    setupPageTransitions();
}); 