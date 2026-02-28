(function() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (!navbar) return;
    
    const isFrontPage = navbar.classList.contains('mix-blend-difference');
    
    // Scroll effect (only for front page)
    if (isFrontPage) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.remove('bg-transparent', 'py-8', 'mix-blend-difference');
                navbar.classList.add('bg-stone-900/90', 'backdrop-blur-sm', 'py-4', 'shadow-lg');
            } else {
                navbar.classList.add('bg-transparent', 'py-8', 'mix-blend-difference');
                navbar.classList.remove('bg-stone-900/90', 'backdrop-blur-sm', 'py-4', 'shadow-lg');
            }
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
        
        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }
})();
