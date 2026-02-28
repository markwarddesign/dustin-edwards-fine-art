<nav id="navbar" class="fixed w-full z-50 <?php echo is_front_page() ? 'mix-blend-difference text-white bg-transparent' : 'bg-stone-900 text-white shadow-lg'; ?> px-6 md:px-12 py-8 transition-all duration-300">
    <div class="flex justify-between items-center">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="text-xl md:text-2xl font-display font-semibold tracking-widest hover:opacity-70 transition-opacity">
            <?php bloginfo( 'name' ); ?>
        </a>
        
        <!-- Desktop Menu -->
        <div class="hidden lg:flex gap-12 text-xs uppercase tracking-widest font-semibold">
            <a href="/" class="hover:text-bronze-300 transition-colors">Home</a>
            <a href="/collection" class="hover:text-bronze-300 transition-colors">Collection</a>
            <a href="/the-artist" class="hover:text-bronze-300 transition-colors">The Artist</a>
            <a href="/philosophy" class="hover:text-bronze-300 transition-colors">Philosophy</a>
            <a href="/inquire" class="hover:text-bronze-300 transition-colors">Inquire</a>
        </div>
        
        <!-- Mobile Menu Button -->
        <button id="mobile-menu-toggle" class="lg:hidden text-white" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>
    </div>
</nav>

<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 w-screen h-screen bg-stone-900 z-[999999] hidden">
    <button id="mobile-menu-close" class="fixed top-10 right-10 text-bronze-300 z-[9999999]" aria-label="Close menu">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
    <div class="flex flex-col items-center justify-center h-full gap-6 text-center">
        <a href="/" class="text-bronze-300 hover:text-white text-lg font-display font-semibold uppercase tracking-[0.2em] transition-colors">Home</a>
        <a href="/collection" class="text-bronze-300 hover:text-white text-lg font-display font-semibold uppercase tracking-[0.2em] transition-colors">Collection</a>
        <a href="/the-artist" class="text-bronze-300 hover:text-white text-lg font-display font-semibold uppercase tracking-[0.2em] transition-colors">The Artist</a>
        <a href="/philosophy" class="text-bronze-300 hover:text-white text-lg font-display font-semibold uppercase tracking-[0.2em] transition-colors">Philosophy</a>
        <a href="/inquire" class="text-bronze-300 hover:text-white text-lg font-display font-semibold uppercase tracking-[0.2em] transition-colors">Inquire</a>
    </div>
</div>
