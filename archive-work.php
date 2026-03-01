<?php
/**
 * Archive template for Work post type with pagination
 * 
 * @package D Edwards
 */

get_header();

// Get current page for pagination
$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;

$args = array(
    'post_type' => 'work',
    'posts_per_page' => 9,
    'paged' => $paged,
    'post_status' => 'publish',
);

$works = new WP_Query( $args );
?>

<main class="work-archive">
    <div class="pt-32 md:pt-48 px-6 md:px-12 pb-12 bg-stone-50 min-h-screen">
        <div class="max-w-7xl mx-auto">
            <h1 class="font-display text-4xl md:text-5xl text-stone-850 mb-4">The Collection</h1>
            <p class="font-serif italic text-stone-500 mb-16 max-w-2xl">
                A curated selection of bronze works exploring the untamed spirit of the American West and the human form.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                <?php if ( $works->have_posts() ) : ?>
                    <?php while ( $works->have_posts() ) : $works->the_post(); ?>
                        <?php
                        $material = get_post_meta( get_the_ID(), '_work_material', true );
                        $material = $material ?: 'Bronze';
                        
                        $featured_image = get_the_post_thumbnail_url( get_the_ID(), 'large' );
                        if ( ! $featured_image ) {
                            $featured_image = 'https://images.unsplash.com/photo-1628607153673-455b550117d9?q=80&w=1500&auto=format&fit=crop';
                        }
                        
                        $is_in_progress = has_term( 'in-progress', 'work_category', get_the_ID() );
                        ?>
                        <a href="<?php the_permalink(); ?>" class="group cursor-pointer block">
                            <div class="relative overflow-hidden aspect-[4/5] bg-stone-200 shadow-xl">
                                <div class="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img 
                                    src="<?php echo esc_url( $featured_image ); ?>" 
                                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                    alt="<?php echo esc_attr( get_the_title() ); ?>"
                                />
                                <?php if ( $is_in_progress ) : ?>
                                <div class="absolute top-3 left-3 z-20 bg-stone-900/80 backdrop-blur-sm text-bronze-300 text-[9px] uppercase tracking-[0.2em] px-3 py-1.5">
                                    In Progress
                                </div>
                                <?php endif; ?>
                            </div>
                            <div class="mt-6 flex flex-col items-center text-center">
                                <h3 class="font-serif text-2xl italic text-stone-800"><?php the_title(); ?></h3>
                                <p class="text-[10px] uppercase tracking-[0.2em] text-bronze-600 mt-2"><?php echo esc_html( $material ); ?></p>
                            </div>
                        </a>
                    <?php endwhile; ?>
                <?php else : ?>
                    <p class="col-span-full text-center text-stone-500">No works found.</p>
                <?php endif; ?>
            </div>
            
            <?php 
            // Custom pagination
            if ( $works->max_num_pages > 1 ) :
                $total_pages = $works->max_num_pages;
                $current_page = max( 1, get_query_var( 'paged' ) );
                ?>
                <nav class="work-pagination mt-24 border-t border-stone-200 pt-12" aria-label="Works pagination">
                    <div class="flex justify-center items-center space-x-8">
                        <?php if ( $current_page > 1 ) : ?>
                            <a href="<?php echo esc_url( get_pagenum_link( $current_page - 1 ) ); ?>" class="text-stone-400 hover:text-stone-800 transition-colors text-[10px] uppercase tracking-[0.2em]">
                                ← Previous
                            </a>
                        <?php endif; ?>
                        
                        <div class="flex items-center space-x-4">
                            <?php for ( $i = 1; $i <= $total_pages; $i++ ) : ?>
                                <?php if ( $i == $current_page ) : ?>
                                    <span class="w-8 h-8 bg-stone-900 text-white flex items-center justify-center text-sm font-medium">
                                        <?php echo $i; ?>
                                    </span>
                                <?php else : ?>
                                    <a href="<?php echo esc_url( get_pagenum_link( $i ) ); ?>" class="w-8 h-8 border border-stone-300 text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 flex items-center justify-center text-sm transition-all">
                                        <?php echo $i; ?>
                                    </a>
                                <?php endif; ?>
                            <?php endfor; ?>
                        </div>
                        
                        <?php if ( $current_page < $total_pages ) : ?>
                            <a href="<?php echo esc_url( get_pagenum_link( $current_page + 1 ) ); ?>" class="text-stone-400 hover:text-stone-800 transition-colors text-[10px] uppercase tracking-[0.2em]">
                                Next →
                            </a>
                        <?php endif; ?>
                    </div>
                </nav>
            <?php endif; ?>
            
            <?php wp_reset_postdata(); ?>
            
            <!-- CTA Section -->
            <div class="mt-48 pt-20 text-center max-w-3xl mx-auto border-t border-stone-200">
                <h2 class="font-serif italic text-3xl md:text-4xl text-stone-900 mb-6">
                    Commission a Unique Piece
                </h2>
                <p class="font-serif text-lg text-stone-600 mb-10 leading-relaxed">
                    Each bronze sculpture is a labor of love, crafted to capture the essence of the American West. 
                    I welcome commissions for custom works that bring your vision to life in timeless bronze.
                </p>
                <a href="<?php echo esc_url( home_url( '/inquire' ) ); ?>" class="inline-block bg-stone-900 text-white py-5 px-12 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze-700 transition-all duration-300 font-medium">
                    Start a Conversation
                </a>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>