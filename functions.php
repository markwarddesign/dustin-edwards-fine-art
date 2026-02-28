<?php
/**
 * D Edwards Theme Functions
 *
 * @package D Edwards
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Enqueue theme styles and scripts
 */
function dedwards_enqueue_styles() {
    // Enqueue TailwindCSS compiled styles (high priority)
    wp_enqueue_style( 
        'dedwards-tailwind', 
        get_template_directory_uri() . '/assets/css/style.css',
        array(),
        filemtime( get_template_directory() . '/assets/css/style.css' )
    );
    
    // Enqueue navigation script
    wp_enqueue_script(
        'dedwards-navigation',
        get_template_directory_uri() . '/assets/js/navigation.js',
        array(),
        filemtime( get_template_directory() . '/assets/js/navigation.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'dedwards_enqueue_styles', 1 );

/**
 * Render custom PHP template parts in FSE theme
 */
function dedwards_render_template_part( $block_content, $block ) {
    if ( $block['blockName'] === 'core/template-part' ) {
        $slug = $block['attrs']['slug'] ?? '';
        
        // Check if a PHP version exists
        if ( $slug && locate_template( "parts/{$slug}.php" ) ) {
            ob_start();
            get_template_part( 'parts/' . $slug );
            return ob_get_clean();
        }
    }
    
    return $block_content;
}
add_filter( 'render_block', 'dedwards_render_template_part', 10, 2 );

/**
 * Add theme support for various features
 */
function dedwards_theme_support() {
    // Disable core block patterns
    remove_theme_support( 'core-block-patterns' );
    
    // Add support for responsive embeds
    add_theme_support( 'responsive-embeds' );
    
    // Add support for editor styles
    add_theme_support( 'editor-styles' );
    
    // Add support for full and wide align images
    add_theme_support( 'align-wide' );
    
    // Add support for widgets in Gutenberg
    add_theme_support( 'widgets-block-editor' );
    
    // Register navigation menus
    register_nav_menus( array(
        'primary' => __( 'Primary Navigation', 'dedwards' ),
    ) );
}
add_action( 'after_setup_theme', 'dedwards_theme_support' );

/**
 * Register custom block category
 */
function dedwards_register_block_category( $categories ) {
    return array_merge(
        array(
            array(
                'slug'  => 'custom',
                'title' => __( 'Custom', 'dedwards' ),
                'icon'  => null,
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories_all', 'dedwards_register_block_category', 10, 1 );

/**
 * Disable all core blocks except basic text blocks
 */
function dedwards_allowed_block_types( $allowed_blocks, $editor_context ) {
    // Check if we're editing a work post
    $post_type = '';
    if ( isset( $editor_context->post ) ) {
        $post_type = $editor_context->post->post_type;
    }
    
    if ( $post_type === 'work' ) {
        return array(
            'dedwards/work-hero',
            'core/paragraph',
            'core/heading',
        );
    }
    
    // For all other post types (pages, etc.)
    return array(
        // Custom blocks
        'dedwards/hero-section',
        'dedwards/quote-section',
        'dedwards/artist-section',
        'dedwards/mosaic-gallery',
        'dedwards/statement-section',
        'dedwards/contact-section',
        'dedwards/collection-section',
        'dedwards/artist-hero',
        'dedwards/artist-bio',
        'dedwards/artist-timeline',
        'dedwards/philosophy-section',
        'dedwards/inquire-section',
        'dedwards/gallery-header',
        'dedwards/adaptive-gallery',
        
        // Basic text blocks
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/list-item',
        
        // Widget and third-party blocks
        'core/legacy-widget',
        'core/widget-group',
        'core/shortcode',
        'social-photo-feed-widget/social-photo-feed',
        'social-photo-feed/block',
        'spfw/social-photo-feed',
        'spfw/block',
        
        // Wrapper and utility blocks
        'dedwards/styled-wrapper',
    );
}
add_filter( 'allowed_block_types_all', 'dedwards_allowed_block_types', 10, 2 );

/**
 * Enable widgets in Gutenberg and support for social-photo-feed-widget
 */
function dedwards_enable_widget_support() {
    // Enable legacy widget block in Gutenberg
    add_filter( 'use_widgets_block_editor', '__return_true' );
    
    // Allow specific widget plugins to work with Gutenberg
    add_filter( 'widget_types_to_hide_from_legacy_widget_block', function( $widget_types ) {
        // Remove social-photo-feed from hidden widgets so it appears in Gutenberg
        return array_diff( $widget_types, array( 
            'social_photo_feed_widget',
            'social-photo-feed-widget',
            'spfw_widget',
            'social_photo_feed'
        ) );
    });
    
    // Make sure widgets are available in block editor
    add_filter( 'gutenberg_can_edit_post_type', '__return_true' );
}
add_action( 'init', 'dedwards_enable_widget_support' );

/**
 * Add custom styling support to core blocks
 */
function dedwards_add_block_styling_support() {
    // Add support for custom CSS classes and styles on shortcode blocks
    add_filter( 'render_block_core/shortcode', 'dedwards_add_shortcode_wrapper', 10, 2 );
}
add_action( 'init', 'dedwards_add_block_styling_support' );

/**
 * Wrap shortcode blocks with custom styling
 */
function dedwards_add_shortcode_wrapper( $block_content, $block ) {
    $attributes = $block['attrs'] ?? array();
    
    // Get custom attributes from block settings
    $max_width = $attributes['maxWidth'] ?? '';
    $background = $attributes['backgroundColor'] ?? '';
    $custom_css = $attributes['customCSS'] ?? '';
    $padding = $attributes['padding'] ?? '';
    $margin = $attributes['margin'] ?? '';
    
    // Build CSS classes
    $css_classes = array( 'dedwards-shortcode-wrapper' );
    
    // Add max-width classes
    if ( $max_width ) {
        switch ( $max_width ) {
            case 'xs':
                $css_classes[] = 'max-w-xs mx-auto';
                break;
            case 'sm':
                $css_classes[] = 'max-w-sm mx-auto';
                break;
            case 'md':
                $css_classes[] = 'max-w-md mx-auto';
                break;
            case 'lg':
                $css_classes[] = 'max-w-lg mx-auto';
                break;
            case 'xl':
                $css_classes[] = 'max-w-xl mx-auto';
                break;
            case '2xl':
                $css_classes[] = 'max-w-2xl mx-auto';
                break;
            case '3xl':
                $css_classes[] = 'max-w-3xl mx-auto';
                break;
            case '4xl':
                $css_classes[] = 'max-w-4xl mx-auto';
                break;
            case 'full':
                $css_classes[] = 'w-full';
                break;
        }
    }
    
    // Add background classes
    if ( $background ) {
        switch ( $background ) {
            case 'white':
                $css_classes[] = 'bg-white';
                break;
            case 'stone-50':
                $css_classes[] = 'bg-stone-50';
                break;
            case 'stone-100':
                $css_classes[] = 'bg-stone-100';
                break;
            case 'stone-900':
                $css_classes[] = 'bg-stone-900';
                break;
            case 'bronze-50':
                $css_classes[] = 'bg-bronze-50';
                break;
            case 'transparent':
                $css_classes[] = 'bg-transparent';
                break;
        }
    }
    
    // Add padding classes
    if ( $padding ) {
        switch ( $padding ) {
            case 'sm':
                $css_classes[] = 'p-4';
                break;
            case 'md':
                $css_classes[] = 'p-8';
                break;
            case 'lg':
                $css_classes[] = 'p-12';
                break;
            case 'xl':
                $css_classes[] = 'p-16';
                break;
            case 'none':
                $css_classes[] = 'p-0';
                break;
        }
    }
    
    // Add margin classes
    if ( $margin ) {
        switch ( $margin ) {
            case 'sm':
                $css_classes[] = 'my-4';
                break;
            case 'md':
                $css_classes[] = 'my-8';
                break;
            case 'lg':
                $css_classes[] = 'my-12';
                break;
            case 'xl':
                $css_classes[] = 'my-16';
                break;
            case 'none':
                $css_classes[] = 'my-0';
                break;
        }
    }
    
    // Only wrap if we have custom styling
    if ( count( $css_classes ) > 1 || $custom_css ) {
        $class_string = implode( ' ', $css_classes );
        $style_attr = $custom_css ? ' style="' . esc_attr( $custom_css ) . '"' : '';
        
        return '<div class="' . esc_attr( $class_string ) . '"' . $style_attr . '>' . $block_content . '</div>';
    }
    
    return $block_content;
}

/**
 * Temporarily allow all blocks for debugging (remove this after testing)
 */
function dedwards_temporarily_allow_all_blocks( $allowed_blocks, $editor_context ) {
    // Uncomment the line below to temporarily see all available blocks
    // return true; // This allows ALL blocks - use only for testing
    
    // Call the original function
    return dedwards_allowed_block_types( $allowed_blocks, $editor_context );
}
// add_filter( 'allowed_block_types_all', 'dedwards_temporarily_allow_all_blocks', 5, 2 );

/**
 * Debug: Temporarily allow ALL blocks to see what's available
 * REMOVE THIS AFTER TESTING
 */
add_filter( 'allowed_block_types_all', function( $allowed_blocks, $editor_context ) {
    // This will show ALL available blocks - use only for debugging
    return true;
}, 5, 2 );
add_action( 'init', 'dedwards_enable_widget_support' );

/**
 * Register widget areas for theme
 */
function dedwards_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Primary Sidebar', 'dedwards' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Main widget area for pages and posts', 'dedwards' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s mb-8">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title text-lg font-semibold mb-4 text-stone-800">',
        'after_title'   => '</h3>',
    ) );
    
    register_sidebar( array(
        'name'          => __( 'Footer Widget Area', 'dedwards' ),
        'id'            => 'footer-widgets',
        'description'   => __( 'Widget area for footer content', 'dedwards' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title text-sm font-semibold mb-2 text-stone-600">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'dedwards_widgets_init' );

/**
 * Dequeue default WordPress block styles
 */
function dedwards_dequeue_block_styles() {
    // Remove core block styles
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-blocks-style' );
    wp_dequeue_style( 'classic-theme-styles' );
    
    // Remove Contact Form 7 default styles (we'll add custom ones)
    wp_dequeue_style( 'contact-form-7' );
}
add_action( 'wp_enqueue_scripts', 'dedwards_dequeue_block_styles', 100 );
add_action( 'enqueue_block_editor_assets', 'dedwards_dequeue_block_styles', 100 );

/**
 * Add custom Contact Form 7 styling
 */
function dedwards_add_cf7_styles() {
    if ( function_exists( 'wpcf7' ) ) {
        wp_add_inline_style( 'dedwards-tailwind', '
            /* Contact Form 7 Custom Styles - Support for your Tailwind classes */
            .wpcf7-form {
                font-family: inherit;
            }
            
            /* Your custom form styling */
            .wpcf7-form .group {
                margin-bottom: 2rem;
            }
            
            .wpcf7-form input[type="text"],
            .wpcf7-form input[type="email"],
            .wpcf7-form input[type="tel"],
            .wpcf7-form textarea {
                width: 100%;
                background: transparent;
                border: 0;
                border-bottom: 1px solid #e7e5e4;
                padding: 0.75rem 0;
                color: #1c1917;
                outline: none;
                transition: border-color 0.3s ease;
                border-radius: 0;
                font-family: "Playfair Display", serif;
                font-size: 1.125rem;
                line-height: 1.75;
                resize: none;
            }
            
            .wpcf7-form input:focus,
            .wpcf7-form textarea:focus {
                border-bottom-color: #92400e;
            }
            
            .wpcf7-form input[type="submit"] {
                background: #0c0a09 !important;
                color: white !important;
                border: none !important;
                padding: 1.25rem 3rem !important;
                font-size: 0.625rem !important;
                text-transform: uppercase !important;
                letter-spacing: 0.25em !important;
                cursor: pointer !important;
                transition: background-color 0.5s ease !important;
                font-weight: 400 !important;
                border-radius: 0 !important;
            }
            
            .wpcf7-form input[type="submit"]:hover {
                background: #92400e !important;
            }
            
            .wpcf7-form label {
                display: block;
                font-size: 0.625rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: #a8a29e;
                margin-bottom: 0.5rem;
                transition: color 0.3s ease;
            }
            
            .wpcf7-form .wpcf7-form-control-wrap {
                display: block;
                width: 100%;
            }
            
            .wpcf7-response-output {
                border: none !important;
                padding: 1rem !important;
                margin: 1rem 0 !important;
                border-radius: 0 !important;
                font-size: 0.875rem !important;
            }
            
            .wpcf7-mail-sent-ok {
                background: #f0fdf4 !important;
                color: #166534 !important;
                border-left: 4px solid #22c55e !important;
            }
            
            .wpcf7-validation-errors,
            .wpcf7-mail-sent-ng {
                background: #fef2f2 !important;
                color: #dc2626 !important;
                border-left: 4px solid #ef4444 !important;
            }
            
            /* Hide any visible class text */
            .wpcf7-form *:before,
            .wpcf7-form *:after {
                content: none !important;
            }
            
            /* Ensure proper text alignment for submit button wrapper */
            .wpcf7-form .pt-8 {
                padding-top: 2rem;
                text-align: center;
            }
        ' );
    }
}
add_action( 'wp_enqueue_scripts', 'dedwards_add_cf7_styles' );

/**
 * Clean up Contact Form 7 output to remove visible CSS classes
 */
function dedwards_clean_cf7_output( $output ) {
    // Convert class: syntax to actual CSS classes and remove the visible text
    $output = preg_replace_callback(
        '/\[([^\]]+)\s+(class:[^\]]*)\]/',
        function($matches) {
            $field_part = $matches[1];
            $class_part = $matches[2];
            
            // Extract classes from class: syntax
            preg_match_all('/class:([a-zA-Z0-9\[\]:\-_\.\(\)]+)/', $class_part, $class_matches);
            $classes = $class_matches[1];
            
            // Join classes with spaces
            $class_string = implode(' ', $classes);
            
            // Rebuild the shortcode with proper class attribute
            return '[' . $field_part . ' class="' . $class_string . '"]';
        },
        $output
    );
    
    // Also clean up any remaining class: text that might appear as content
    $output = preg_replace('/class:[a-zA-Z0-9\[\]:\-_\.\(\)]+\s*/', '', $output);
    
    return $output;
}
add_filter( 'wpcf7_form_elements', 'dedwards_clean_cf7_output', 10, 1 );

/**
 * Additional cleanup for any remaining visible class text
 */
function dedwards_clean_all_class_text( $content ) {
    // Remove any remaining visible class: text
    $content = preg_replace('/\bclass:[a-zA-Z0-9\[\]:\-_\.\(\)]+\s*/i', '', $content);
    return $content;
}
add_filter( 'the_content', 'dedwards_clean_all_class_text', 25 );
add_filter( 'widget_text', 'dedwards_clean_all_class_text', 25 );

/**
 * Enhanced Contact Form 7 processing to handle Tailwind classes
 */
function dedwards_process_cf7_classes( $form ) {
    // Handle submit buttons with a more specific approach
    $form = preg_replace_callback(
        '/\[submit\s+([^"]+)(".*?")\]/',
        function($matches) {
            $attributes_part = trim($matches[1]); // Everything before the quoted text
            $quoted_text = $matches[2]; // "Send Message"
            
            // Extract all class: values from the attributes
            preg_match_all('/class:([^\s]+)/', $attributes_part, $class_matches);
            
            if (!empty($class_matches[1])) {
                $classes = implode(' ', $class_matches[1]);
                // Remove all class: entries from attributes
                $clean_attributes = preg_replace('/class:[^\s]+\s*/', '', $attributes_part);
                $clean_attributes = trim($clean_attributes);
                
                // Build the final shortcode
                if ($clean_attributes) {
                    return '[submit ' . $clean_attributes . ' class="' . $classes . '" ' . $quoted_text . ']';
                } else {
                    return '[submit class="' . $classes . '" ' . $quoted_text . ']';
                }
            }
            
            return '[submit ' . $attributes_part . $quoted_text . ']';
        },
        $form
    );
    
    // Handle other form elements (text, email, textarea) - simplified
    $form = preg_replace_callback(
        '/\[(text\*?|email\*?|textarea)\s+([^\]]+)\]/',
        function($matches) {
            $field_type = $matches[1];
            $attributes = $matches[2];
            
            // Extract all class: values
            preg_match_all('/class:([^\s\]]+)/', $attributes, $class_matches);
            
            if (!empty($class_matches[1])) {
                $classes = implode(' ', $class_matches[1]);
                // Remove all class: entries
                $clean_attributes = preg_replace('/class:[^\s\]]+\s*/', '', $attributes);
                $clean_attributes = trim($clean_attributes);
                
                if ($clean_attributes) {
                    return '[' . $field_type . ' ' . $clean_attributes . ' class="' . $classes . '"]';
                } else {
                    return '[' . $field_type . ' class="' . $classes . '"]';
                }
            }
            
            return '[' . $field_type . ' ' . $attributes . ']';
        },
        $form
    );
    
    // Final cleanup - remove any remaining visible class: text or orphaned quotes
    $form = preg_replace('/class:[a-zA-Z0-9\[\]:\-_\.\(\)]+/', '', $form);
    $form = preg_replace('/"[^"]*"\s*\]?\s*$/', '', $form);
    $form = preg_replace('/"\s*\]\s*/', '', $form);
    
    return $form;
}
add_filter( 'wpcf7_form_elements', 'dedwards_process_cf7_classes', 5, 1 );

/**
 * Disable global styles (theme.json inline styles)
 */
function dedwards_disable_global_styles() {
    wp_dequeue_style( 'global-styles' );
    wp_dequeue_style( 'wp-block-library' );
}
add_action( 'wp_enqueue_scripts', 'dedwards_disable_global_styles', 999 );

/**
 * Remove SVG filters that may interfere
 */
function dedwards_remove_svg_filters() {
    remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );
}
add_action( 'init', 'dedwards_remove_svg_filters' );

// Enqueue Google Fonts
function dustin_edwards_scripts() {
    wp_enqueue_style( 
        'google-fonts', 
        // Loads Inter (300-500), Cinzel (400,600), Playfair (400-600 + italics)
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap', 
        array(), 
        null 
    );
}
add_action( 'wp_enqueue_scripts', 'dustin_edwards_scripts' );

/**
 * Register Custom Post Type: Work
 */
function dedwards_register_work_post_type() {
    $labels = array(
        'name'                  => _x( 'Works', 'Post Type General Name', 'dedwards' ),
        'singular_name'         => _x( 'Work', 'Post Type Singular Name', 'dedwards' ),
        'menu_name'             => __( 'Portfolio', 'dedwards' ),
        'name_admin_bar'        => __( 'Work', 'dedwards' ),
        'archives'              => __( 'Work Archives', 'dedwards' ),
        'attributes'            => __( 'Work Attributes', 'dedwards' ),
        'parent_item_colon'     => __( 'Parent Work:', 'dedwards' ),
        'all_items'             => __( 'All Works', 'dedwards' ),
        'add_new_item'          => __( 'Add New Work', 'dedwards' ),
        'add_new'               => __( 'Add New', 'dedwards' ),
        'new_item'              => __( 'New Work', 'dedwards' ),
        'edit_item'             => __( 'Edit Work', 'dedwards' ),
        'update_item'           => __( 'Update Work', 'dedwards' ),
        'view_item'             => __( 'View Work', 'dedwards' ),
        'view_items'            => __( 'View Works', 'dedwards' ),
        'search_items'          => __( 'Search Work', 'dedwards' ),
        'not_found'             => __( 'Not found', 'dedwards' ),
        'not_found_in_trash'    => __( 'Not found in Trash', 'dedwards' ),
        'featured_image'        => __( 'Featured Image', 'dedwards' ),
        'set_featured_image'    => __( 'Set featured image', 'dedwards' ),
        'remove_featured_image' => __( 'Remove featured image', 'dedwards' ),
        'use_featured_image'    => __( 'Use as featured image', 'dedwards' ),
        'insert_into_item'      => __( 'Insert into work', 'dedwards' ),
        'uploaded_to_this_item' => __( 'Uploaded to this work', 'dedwards' ),
        'items_list'            => __( 'Works list', 'dedwards' ),
        'items_list_navigation' => __( 'Works list navigation', 'dedwards' ),
        'filter_items_list'     => __( 'Filter works list', 'dedwards' ),
    );
    
    $args = array(
        'label'                 => __( 'Work', 'dedwards' ),
        'description'           => __( 'Portfolio Work Items', 'dedwards' ),
        'labels'                => $labels,
        'supports'              => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'taxonomies'            => array( 'work_category', 'work_tag' ),
        'hierarchical'          => false,
        'public'                => true,
        'show_ui'               => true,
        'show_in_menu'          => true,
        'menu_position'         => 5,
        'menu_icon'             => 'dashicons-portfolio',
        'show_in_admin_bar'     => true,
        'show_in_nav_menus'     => true,
        'can_export'            => true,
        'has_archive'           => true,
        'exclude_from_search'   => false,
        'publicly_queryable'    => true,
        'capability_type'       => 'post',
        'show_in_rest'          => true,
        'rest_base'             => 'works',
        'rewrite'               => array( 'slug' => 'collection', 'with_front' => false ),
        'template'              => array(
            array( 'core/image' ),
            array( 'core/paragraph', array(
                'placeholder' => 'Add work description...',
            ) ),
        ),
    );
    
    register_post_type( 'work', $args );
}
add_action( 'init', 'dedwards_register_work_post_type', 0 );

/**
 * Register Custom Taxonomies for Work Post Type
 */
function dedwards_register_work_taxonomies() {
    // Work Category
    $category_labels = array(
        'name'              => _x( 'Work Categories', 'taxonomy general name', 'dedwards' ),
        'singular_name'     => _x( 'Work Category', 'taxonomy singular name', 'dedwards' ),
        'search_items'      => __( 'Search Categories', 'dedwards' ),
        'all_items'         => __( 'All Categories', 'dedwards' ),
        'parent_item'       => __( 'Parent Category', 'dedwards' ),
        'parent_item_colon' => __( 'Parent Category:', 'dedwards' ),
        'edit_item'         => __( 'Edit Category', 'dedwards' ),
        'update_item'       => __( 'Update Category', 'dedwards' ),
        'add_new_item'      => __( 'Add New Category', 'dedwards' ),
        'new_item_name'     => __( 'New Category Name', 'dedwards' ),
        'menu_name'         => __( 'Categories', 'dedwards' ),
    );

    register_taxonomy( 'work_category', array( 'work' ), array(
        'hierarchical'      => true,
        'labels'            => $category_labels,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'work-category' ),
    ) );

    // Work Tags
    $tag_labels = array(
        'name'              => _x( 'Work Tags', 'taxonomy general name', 'dedwards' ),
        'singular_name'     => _x( 'Work Tag', 'taxonomy singular name', 'dedwards' ),
        'search_items'      => __( 'Search Tags', 'dedwards' ),
        'all_items'         => __( 'All Tags', 'dedwards' ),
        'edit_item'         => __( 'Edit Tag', 'dedwards' ),
        'update_item'       => __( 'Update Tag', 'dedwards' ),
        'add_new_item'      => __( 'Add New Tag', 'dedwards' ),
        'new_item_name'     => __( 'New Tag Name', 'dedwards' ),
        'menu_name'         => __( 'Tags', 'dedwards' ),
    );

    register_taxonomy( 'work_tag', array( 'work' ), array(
        'hierarchical'      => false,
        'labels'            => $tag_labels,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array( 'slug' => 'work-tag' ),
    ) );
}
add_action( 'init', 'dedwards_register_work_taxonomies', 0 );

/**
 * Customize work archive posts per page and pagination
 */
function dedwards_customize_work_archive( $query ) {
    if ( ! is_admin() && $query->is_main_query() ) {
        if ( is_post_type_archive( 'work' ) ) {
            $query->set( 'posts_per_page', 9 );
        }
    }
}
add_action( 'pre_get_posts', 'dedwards_customize_work_archive' );

/**
 * Custom pagination for work archives
 */
function dedwards_work_archive_pagination() {
    global $wp_query;
    
    $total_pages = $wp_query->max_num_pages;
    $current_page = max( 1, get_query_var( 'paged' ) );
    
    if ( $total_pages <= 1 ) {
        return;
    }
    
    echo '<nav class="work-pagination mt-24 border-t border-stone-200 pt-12" aria-label="Works pagination">';
    echo '<div class="flex justify-center items-center space-x-8">';
    
    // Previous link
    if ( $current_page > 1 ) {
        $prev_link = get_previous_posts_page_link();
        echo '<a href="' . esc_url( $prev_link ) . '" class="text-stone-400 hover:text-stone-800 transition-colors text-[10px] uppercase tracking-[0.2em]">← Previous</a>';
    }
    
    // Page numbers
    echo '<div class="flex items-center space-x-4">';
    for ( $i = 1; $i <= $total_pages; $i++ ) {
        if ( $i == $current_page ) {
            echo '<span class="w-8 h-8 bg-stone-900 text-white flex items-center justify-center text-sm font-medium">' . $i . '</span>';
        } else {
            $page_link = get_pagenum_link( $i );
            echo '<a href="' . esc_url( $page_link ) . '" class="w-8 h-8 border border-stone-300 text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 flex items-center justify-center text-sm transition-all">' . $i . '</a>';
        }
    }
    echo '</div>';
    
    // Next link
    if ( $current_page < $total_pages ) {
        $next_link = get_next_posts_page_link();
        echo '<a href="' . esc_url( $next_link ) . '" class="text-stone-400 hover:text-stone-800 transition-colors text-[10px] uppercase tracking-[0.2em]">Next →</a>';
    }
    
    echo '</div>';
    echo '</nav>';
}

/**
 * Add custom fields support for Work post type
 */
function dedwards_work_meta_boxes() {
    add_meta_box(
        'work_details',
        __( 'Work Details', 'dedwards' ),
        'dedwards_work_details_callback',
        'work',
        'normal',
        'default'
    );
}
add_action( 'add_meta_boxes', 'dedwards_work_meta_boxes' );

function dedwards_work_details_callback( $post ) {
    wp_nonce_field( 'dedwards_save_work_details', 'dedwards_work_details_nonce' );
    
    $material = get_post_meta( $post->ID, '_work_material', true );
    $year = get_post_meta( $post->ID, '_work_year', true );
    $dimensions = get_post_meta( $post->ID, '_work_dimensions', true );
    $edition = get_post_meta( $post->ID, '_work_edition', true );
    ?>
    <style>
        #work_details label {
            color: #1c1917 !important;
            font-weight: 600;
            display: block;
            margin-bottom: 8px;
        }
        #work_details .widefat {
            margin-bottom: 16px;
        }
        #work_details p {
            margin: 0 0 16px 0;
        }
    </style>
    <p>
        <label for="work_material"><?php _e( 'Material:', 'dedwards' ); ?></label>
        <input type="text" id="work_material" name="work_material" value="<?php echo esc_attr( $material ); ?>" class="widefat" placeholder="e.g., Bronze">
    </p>
    <p>
        <label for="work_year"><?php _e( 'Year:', 'dedwards' ); ?></label>
        <input type="text" id="work_year" name="work_year" value="<?php echo esc_attr( $year ); ?>" class="widefat" placeholder="e.g., 2023">
    </p>
    <p>
        <label for="work_dimensions"><?php _e( 'Dimensions:', 'dedwards' ); ?></label>
        <input type="text" id="work_dimensions" name="work_dimensions" value="<?php echo esc_attr( $dimensions ); ?>" class="widefat" placeholder="e.g., 24 x 18 x 12 inches">
    </p>
    <p>
        <label for="work_edition"><?php _e( 'Edition:', 'dedwards' ); ?></label>
        <input type="text" id="work_edition" name="work_edition" value="<?php echo esc_attr( $edition ); ?>" class="widefat" placeholder="e.g., Edition of 15">
    </p>
    <?php
}

function dedwards_save_work_details( $post_id ) {
    if ( ! isset( $_POST['dedwards_work_details_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['dedwards_work_details_nonce'], 'dedwards_save_work_details' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    if ( isset( $_POST['work_material'] ) ) {
        update_post_meta( $post_id, '_work_material', sanitize_text_field( $_POST['work_material'] ) );
    }
    if ( isset( $_POST['work_year'] ) ) {
        update_post_meta( $post_id, '_work_year', sanitize_text_field( $_POST['work_year'] ) );
    }
    if ( isset( $_POST['work_dimensions'] ) ) {
        update_post_meta( $post_id, '_work_dimensions', sanitize_text_field( $_POST['work_dimensions'] ) );
    }
    if ( isset( $_POST['work_edition'] ) ) {
        update_post_meta( $post_id, '_work_edition', sanitize_text_field( $_POST['work_edition'] ) );
    }
}
add_action( 'save_post', 'dedwards_save_work_details' );

/**
 * Expose custom meta fields in REST API for work posts
 */
function dedwards_register_work_meta_rest() {
    register_post_meta( 'work', '_work_material', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    
    register_post_meta( 'work', '_work_year', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    
    register_post_meta( 'work', '_work_dimensions', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
    
    register_post_meta( 'work', '_work_edition', array(
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
    ) );
}
add_action( 'init', 'dedwards_register_work_meta_rest' );

/**
 * Register Custom Blocks
 */
function dedwards_register_blocks() {
    // Register hero section block
    register_block_type( 
        get_template_directory() . '/blocks/hero-section',
        array(
            'editor_script' => 'dedwards-hero-section-editor',
        )
    );
    
    // Enqueue the hero section block script
    wp_register_script(
        'dedwards-hero-section-editor',
        get_template_directory_uri() . '/build/hero-section/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor' ),
        filemtime( get_template_directory() . '/build/hero-section/index.js' )
    );
    
    // Register quote section block
    register_block_type( get_template_directory() . '/blocks/quote-section' );
    
    // Register artist section block
    register_block_type( get_template_directory() . '/blocks/artist-section' );
    
    // Register statement section block
    register_block_type( get_template_directory() . '/blocks/statement-section' );
    
    // Register contact section block with render callback for shortcode processing
    register_block_type( get_template_directory() . '/blocks/contact-section', array(
        'render_callback' => 'dedwards_render_contact_section',
    ) );
    
    // Register collection section block with render callback
    register_block_type( get_template_directory() . '/blocks/collection-section', array(
        'render_callback' => 'dedwards_render_collection_section',
        'editor_script' => 'dedwards-collection-section-editor',
    ) );
    
    // Enqueue the collection section block script
    wp_register_script(
        'dedwards-collection-section-editor',
        get_template_directory_uri() . '/build/collection-section/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/collection-section/index.js' )
    );
    
    // Register work single page blocks with editor scripts
    wp_register_script(
        'dedwards-work-hero-editor',
        get_template_directory_uri() . '/build/work-hero/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/work-hero/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/work-hero', array(
        'render_callback' => 'dedwards_render_work_hero',
        'editor_script' => 'dedwards-work-hero-editor',
    ) );
    
    wp_register_script(
        'dedwards-work-details-editor',
        get_template_directory_uri() . '/build/work-details/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/work-details/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/work-details', array(
        'render_callback' => 'dedwards_render_work_details',
        'editor_script' => 'dedwards-work-details-editor',
    ) );
    
    wp_register_script(
        'dedwards-work-gallery-editor',
        get_template_directory_uri() . '/build/work-gallery/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/work-gallery/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/work-gallery', array(
        'render_callback' => 'dedwards_render_work_gallery',
        'editor_script' => 'dedwards-work-gallery-editor',
    ) );
    
    wp_register_script(
        'dedwards-work-cta-editor',
        get_template_directory_uri() . '/build/work-cta/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/work-cta/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/work-cta', array(
        'render_callback' => 'dedwards_render_work_cta',
        'editor_script' => 'dedwards-work-cta-editor',
    ) );
    
    // Register artist page blocks
    wp_register_script(
        'dedwards-artist-hero-editor',
        get_template_directory_uri() . '/build/artist-hero/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/artist-hero/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/artist-hero', array(
        'render_callback' => 'dedwards_render_artist_hero',
        'editor_script' => 'dedwards-artist-hero-editor',
    ) );
    
    wp_register_script(
        'dedwards-artist-bio-editor',
        get_template_directory_uri() . '/build/artist-bio/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/artist-bio/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/artist-bio', array(
        'render_callback' => 'dedwards_render_artist_bio',
        'editor_script' => 'dedwards-artist-bio-editor',
    ) );
    
    wp_register_script(
        'dedwards-artist-timeline-editor',
        get_template_directory_uri() . '/build/artist-timeline/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/artist-timeline/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/artist-timeline', array(
        'render_callback' => 'dedwards_render_artist_timeline',
        'editor_script' => 'dedwards-artist-timeline-editor',
    ) );
    
    // Register philosophy section block
    wp_register_script(
        'dedwards-philosophy-section-editor',
        get_template_directory_uri() . '/build/philosophy-section/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/philosophy-section/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/philosophy-section', array(
        'render_callback' => 'dedwards_render_philosophy_section',
        'editor_script' => 'dedwards-philosophy-section-editor',
    ) );
    
    // Register inquire section block
    wp_register_script(
        'dedwards-inquire-section-editor',
        get_template_directory_uri() . '/build/inquire-section/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/inquire-section/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/inquire-section', array(
        'render_callback' => 'dedwards_render_inquire_section',
        'editor_script' => 'dedwards-inquire-section-editor',
    ) );
    
    // Register mosaic gallery block
    wp_register_script(
        'dedwards-mosaic-gallery-editor',
        get_template_directory_uri() . '/build/mosaic-gallery/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor', 'wp-data' ),
        filemtime( get_template_directory() . '/build/mosaic-gallery/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/mosaic-gallery', array(
        'render_callback' => 'dedwards_render_mosaic_gallery',
        'editor_script' => 'dedwards-mosaic-gallery-editor',
    ) );
    
    // Register Gallery Header and Adaptive Gallery blocks
    wp_register_script(
        'dedwards-gallery-header-editor',
        get_template_directory_uri() . '/build/gallery-header/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor' ),
        filemtime( get_template_directory() . '/build/gallery-header/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/gallery-header', array(
        'render_callback' => 'dedwards_render_gallery_header',
        'editor_script' => 'dedwards-gallery-header-editor',
    ) );
    
    wp_register_script(
        'dedwards-adaptive-gallery-editor',
        get_template_directory_uri() . '/build/adaptive-gallery/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-block-editor' ),
        filemtime( get_template_directory() . '/build/adaptive-gallery/index.js' )
    );
    
    register_block_type( get_template_directory() . '/blocks/adaptive-gallery', array(
        'render_callback' => 'dedwards_render_adaptive_gallery',
        'editor_script' => 'dedwards-adaptive-gallery-editor',
    ) );
}
add_action( 'init', 'dedwards_register_blocks' );

/**
 * Render callback for contact section to process Contact Form 7 shortcodes
 */
function dedwards_render_contact_section( $attributes ) {
    $heading = $attributes['heading'] ?? 'Acquire & Inquire';
    $subheading = $attributes['subheading'] ?? 'My hope is that each sculpture stirs something unique within you.';
    $form_shortcode = $attributes['formShortcode'] ?? '';
    
    ob_start();
    ?>
    <section class="py-32 px-6 md:px-12 bg-white">
        <div class="max-w-xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="font-serif text-4xl md:text-5xl mb-6 text-stone-800"><?php echo wp_kses_post( $heading ); ?></h2>
                <p class="text-stone-500 font-light text-sm md:text-base"><?php echo wp_kses_post( $subheading ); ?></p>
            </div>
            
            <?php if ( $form_shortcode ) : ?>
                <div class="dedwards-contact-form">
                    <?php echo do_shortcode( $form_shortcode ); ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for collection section to display work posts
 */
function dedwards_render_collection_section( $attributes ) {
    $heading = $attributes['heading'] ?? 'The Collection';
    $subheading = $attributes['subheading'] ?? 'A curated selection of bronze works exploring the untamed spirit of the American West and the human form.';
    $posts_per_page = $attributes['postsPerPage'] ?? 6; // Default to 6 for homepage
    $category = $attributes['category'] ?? '';
    $show_view_all = $attributes['showViewAll'] ?? true;
    
    // Check if this is an archive page
    $is_archive = is_post_type_archive( 'work' );
    
    // If archive, use pagination and show more posts
    if ( $is_archive ) {
        $posts_per_page = 9;
        $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
    } else {
        $paged = 1;
    }
    
    $args = array(
        'post_type' => 'work',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'paged' => $paged,
    );
    
    if ( ! empty( $category ) ) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'work_category',
                'field' => 'term_id',
                'terms' => $category,
            ),
        );
    }
    
    $works = new WP_Query( $args );
    
    ob_start();
    ?>
    <div class="pt-32 md:pt-48 px-6 md:px-12 pb-12 bg-stone-50 min-h-screen">
        <div class="max-w-7xl mx-auto">
            <h1 class="font-display text-4xl md:text-5xl text-stone-850 mb-4"><?php echo esc_html( $heading ); ?></h1>
            <p class="font-serif italic text-stone-500 mb-16 max-w-2xl"><?php echo esc_html( $subheading ); ?></p>
            
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
                        ?>
                        <a href="<?php the_permalink(); ?>" class="group cursor-pointer block">
                            <div class="relative overflow-hidden aspect-[4/5] bg-stone-200 shadow-xl">
                                <div class="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img 
                                    src="<?php echo esc_url( $featured_image ); ?>" 
                                    class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                    alt="<?php echo esc_attr( get_the_title() ); ?>"
                                />
                            </div>
                            <div class="mt-6 flex flex-col items-center text-center">
                                <h3 class="font-serif text-2xl italic text-stone-800"><?php the_title(); ?></h3>
                                <p class="text-[10px] uppercase tracking-[0.2em] text-bronze-600 mt-2"><?php echo esc_html( $material ); ?></p>
                            </div>
                        </a>
                    <?php endwhile; ?>
                    <?php wp_reset_postdata(); ?>
                <?php else : ?>
                    <p class="col-span-full text-center text-stone-500">No works found.</p>
                <?php endif; ?>
            </div>
            
            <?php if ( ! $is_archive && $show_view_all && $works->found_posts > $posts_per_page ) : ?>
                <!-- View All Button -->
                <div class="mt-32 text-center">
                    <a href="<?php echo esc_url( get_post_type_archive_link( 'work' ) ); ?>" class="inline-block bg-stone-900 text-white px-12 py-5 text-[10px] uppercase tracking-[0.25em] hover:bg-bronze-600 transition-colors duration-300 font-medium">
                        View All Works
                    </a>
                </div>
            <?php endif; ?>
            
            <?php if ( $is_archive && $works->max_num_pages > 1 ) : ?>
                <!-- Archive Pagination -->
                <nav class="work-pagination mt-32 border-t border-stone-200 pt-12" aria-label="Works pagination">
                    <div class="flex justify-center items-center space-x-8">
                        <?php if ( $paged > 1 ) : ?>
                            <a href="<?php echo esc_url( get_pagenum_link( $paged - 1 ) ); ?>" class="text-stone-400 hover:text-stone-800 transition-colors text-[10px] uppercase tracking-[0.2em]">
                                ← Previous
                            </a>
                        <?php endif; ?>
                        
                        <div class="flex items-center space-x-4">
                            <?php 
                            $total_pages = $works->max_num_pages;
                            for ( $i = 1; $i <= $total_pages; $i++ ) : 
                            ?>
                                <?php if ( $i == $paged ) : ?>
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
                        
                        <?php if ( $paged < $total_pages ) : ?>
                            <a href="<?php echo esc_url( get_pagenum_link( $paged + 1 ) ); ?>" class="text-stone-400 hover:text-stone-800 transition-colors text-[10px] uppercase tracking-[0.2em]">
                                Next →
                            </a>
                        <?php endif; ?>
                    </div>
                </nav>
            <?php endif; ?>
            
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
    <?php
    return ob_get_clean();
}

/**
 * Render callback for work hero block - Full work page layout
 */
function dedwards_render_work_hero( $attributes, $content, $block ) {
    $post_id = $block->context['postId'] ?? get_the_ID();
    
    // Get work data
    $title = get_the_title( $post_id );
    $description = get_the_content( null, false, $post_id );
    $material = get_post_meta( $post_id, '_work_material', true ) ?: 'Bronze';
    $year = get_post_meta( $post_id, '_work_year', true ) ?: '2023';
    $dimensions = get_post_meta( $post_id, '_work_dimensions', true );
    $edition = get_post_meta( $post_id, '_work_edition', true );
    
    $featured_image = get_the_post_thumbnail_url( $post_id, 'full' );
    if ( ! $featured_image ) {
        $featured_image = 'https://images.unsplash.com/photo-1628607153673-455b550117d9?q=80&w=1500&auto=format&fit=crop';
    }
    
    // Detail images from block attributes
    $detail_image_1 = $attributes['detailImage1']['url'] ?? $featured_image;
    $detail_image_2 = $attributes['detailImage2']['url'] ?? $featured_image;
    
    ob_start();
    ?>
    <div class="bg-white">
        <div class="pt-24 pb-12 min-h-screen">
            <!-- Navigation Breadcrumb -->
            <div class="px-6 md:px-12 mb-8">
                <a href="<?php echo esc_url( home_url( '/work' ) ); ?>" class="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors inline-flex items-center gap-2">
                    &larr; Back to Collection
                </a>
            </div>

            <div class="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12">
                <!-- Left: Images -->
                <div class="lg:col-span-5 space-y-4">
                    <div class="bg-stone-100 aspect-[4/5] overflow-hidden relative">
                        <img src="<?php echo esc_url( $featured_image ); ?>" class="w-full h-full object-cover" alt="<?php echo esc_attr( $title ); ?>">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-stone-100 aspect-square overflow-hidden">
                            <img src="<?php echo esc_url( $detail_image_1 ); ?>" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Detail 1">
                        </div>
                        <div class="bg-stone-100 aspect-square overflow-hidden">
                            <img src="<?php echo esc_url( $detail_image_2 ); ?>" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Detail 2">
                        </div>
                    </div>
                </div>

                <!-- Right: Info -->
                <div class="lg:col-span-7 lg:sticky lg:top-32 h-fit pt-8">
                    <h1 class="font-serif italic text-4xl md:text-6xl text-stone-900 mb-6">
                        <?php echo esc_html( $title ); ?>
                    </h1>
                    
                    <div class="grid grid-cols-2 gap-y-6 gap-x-12 border-t border-b border-stone-200 py-8 mb-8">
                        <div>
                            <span class="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Medium</span>
                            <span class="font-display text-stone-800"><?php echo esc_html( $material ); ?></span>
                        </div>
                        <div>
                            <span class="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Year</span>
                            <span class="font-display text-stone-800"><?php echo esc_html( $year ); ?></span>
                        </div>
                        <?php if ( $dimensions ) : ?>
                        <div>
                            <span class="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Dimensions</span>
                            <span class="font-display text-stone-800"><?php echo esc_html( $dimensions ); ?></span>
                        </div>
                        <?php endif; ?>
                        <?php if ( $edition ) : ?>
                        <div>
                            <span class="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Edition</span>
                            <span class="font-display text-stone-800"><?php echo esc_html( $edition ); ?></span>
                        </div>
                        <?php endif; ?>
                    </div>

                    <div class="prose prose-stone mb-12">
                        <div class="font-serif text-lg leading-relaxed text-stone-600">
                            <?php echo wp_kses_post( $description ); ?>
                        </div>
                    </div>

                    <a href="<?php echo esc_url( home_url( '/inquire' ) ); ?>" class="block w-full bg-stone-900 text-white py-5 px-8 text-xs uppercase tracking-[0.25em] hover:bg-bronze-600 transition-colors text-center">
                        Inquire About This Piece
                    </a>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for work details block
 */
function dedwards_render_work_details( $attributes, $content, $block ) {
    $post_id = $block->context['postId'] ?? get_the_ID();
    
    $material = get_post_meta( $post_id, '_work_material', true );
    $year = get_post_meta( $post_id, '_work_year', true );
    $dimensions = get_post_meta( $post_id, '_work_dimensions', true );
    $edition = get_post_meta( $post_id, '_work_edition', true );
    
    $details = array();
    if ( $material ) $details[] = array( 'label' => 'Material', 'value' => $material );
    if ( $year ) $details[] = array( 'label' => 'Year', 'value' => $year );
    if ( $dimensions ) $details[] = array( 'label' => 'Dimensions', 'value' => $dimensions );
    if ( $edition ) $details[] = array( 'label' => 'Edition', 'value' => $edition );
    
    ob_start();
    ?>
    <section class="py-20 px-6 md:px-12 bg-white">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-sm font-display uppercase tracking-widest text-bronze-800 mb-12 text-center border-b border-bronze-200 pb-4">
                Specifications
            </h2>
            
            <?php if ( ! empty( $details ) ) : ?>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <?php foreach ( $details as $detail ) : ?>
                        <div class="flex flex-col">
                            <dt class="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">
                                <?php echo esc_html( $detail['label'] ); ?>
                            </dt>
                            <dd class="font-serif text-xl text-stone-800">
                                <?php echo esc_html( $detail['value'] ); ?>
                            </dd>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for work gallery block
 */
function dedwards_render_work_gallery( $attributes ) {
    $images = $attributes['images'] ?? array();
    
    ob_start();
    ?>
    <section class="py-20 px-6 md:px-12 bg-bronze-50">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-sm font-display uppercase tracking-widest text-bronze-800 mb-12 text-center border-b border-bronze-200 pb-4">
                Additional Views
            </h2>
            
            <?php if ( ! empty( $images ) ) : ?>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <?php foreach ( $images as $image ) : ?>
                        <div class="group relative aspect-square overflow-hidden bg-stone-200 shadow-lg">
                            <img 
                                src="<?php echo esc_url( $image['url'] ); ?>" 
                                alt="<?php echo esc_attr( $image['alt'] ?? '' ); ?>"
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for work CTA block
 */
function dedwards_render_work_cta( $attributes ) {
    $heading = $attributes['heading'] ?? 'Interested in This Piece?';
    $description = $attributes['description'] ?? 'Contact me to discuss acquisition, commissioning a similar work, or to arrange a studio visit.';
    $button_text = $attributes['buttonText'] ?? 'Get In Touch';
    $button_link = $attributes['buttonLink'] ?? '/contact';
    
    ob_start();
    ?>
    <section class="py-24 px-6 md:px-12 bg-stone-900">
        <div class="max-w-3xl mx-auto text-center">
            <h2 class="font-serif text-4xl md:text-5xl text-white mb-6">
                <?php echo wp_kses_post( $heading ); ?>
            </h2>
            
            <p class="text-stone-400 text-lg mb-12 max-w-2xl mx-auto font-light">
                <?php echo wp_kses_post( $description ); ?>
            </p>
            
            <a href="<?php echo esc_url( $button_link ); ?>" class="inline-block bg-bronze-600 text-white px-12 py-5 text-[10px] uppercase tracking-[0.25em] hover:bg-bronze-500 transition-colors duration-300">
                <?php echo esc_html( $button_text ); ?>
            </a>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for artist hero block
 */
function dedwards_render_artist_hero( $attributes ) {
    $background_image = $attributes['backgroundImage']['url'] ?? 'https://images.unsplash.com/photo-1531872378909-0d19e09d171d?q=80&w=1500&auto=format&fit=crop';
    $title = $attributes['title'] ?? 'The Artist';
    
    ob_start();
    ?>
    <div class="relative h-[60vh] w-full overflow-hidden">
        <img src="<?php echo esc_url( $background_image ); ?>" class="w-full h-full object-cover object-center grayscale brightness-75" alt="">
        <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="font-display text-5xl md:text-7xl text-white tracking-widest"><?php echo esc_html( $title ); ?></h1>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for artist bio block
 */
function dedwards_render_artist_bio( $attributes ) {
    $heading = $attributes['heading'] ?? 'Dustin Edwards';
    $content = $attributes['content'] ?? '';
    $image_url = $attributes['imageUrl'] ?? '';
    
    ob_start();
    ?>
    <div class="max-w-6xl mx-auto px-6 md:px-12 py-24 bg-white">
        <h2 class="font-serif text-3xl md:text-4xl italic text-stone-800 mb-12 text-center"><?php echo esc_html( $heading ); ?></h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <?php if ( $image_url ) : ?>
                <div>
                    <img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $heading ); ?>" class="w-full h-auto">
                </div>
            <?php endif; ?>
            <div class="artist-bio font-serif text-lg md:text-xl leading-loose text-stone-600 space-y-8">
                <?php echo wp_kses_post( $content ); ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for artist timeline block
 */
function dedwards_render_artist_timeline( $attributes ) {
    $heading = $attributes['heading'] ?? 'Timeline';
    $events = $attributes['events'] ?? array();
    
    ob_start();
    ?>
    <div class="max-w-4xl mx-auto px-6 md:px-12 py-24 border-t border-stone-200 bg-white">
        <h3 class="font-display text-center text-xl uppercase tracking-widest mb-12 text-stone-900"><?php echo esc_html( $heading ); ?></h3>
        <div class="space-y-12">
            <?php foreach ( $events as $event ) : ?>
                <div class="flex flex-col md:flex-row gap-4 md:gap-12">
                    <span class="font-display text-stone-400 md:w-24 md:text-right"><?php echo esc_html( $event['year'] ?? '' ); ?></span>
                    <div class="flex-1">
                        <h4 class="font-serif text-xl mb-2 text-stone-900"><?php echo esc_html( $event['title'] ?? '' ); ?></h4>
                        <p class="text-stone-500 font-light text-sm"><?php echo esc_html( $event['description'] ?? '' ); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for philosophy section block
 */
function dedwards_render_philosophy_section( $attributes ) {
    $heading = $attributes['heading'] ?? 'My work is rooted in a desire to honor the spirit, beauty, and movement found in God\'s creation.';
    $paragraphs = $attributes['paragraphs'] ?? array();
    $signature_url = $attributes['signatureUrl'] ?? '';
    
    ob_start();
    ?>
    <div class="bg-bronze-50 pt-32 md:pt-48 px-6 md:px-12 pb-32 min-h-screen flex flex-col items-center justify-center">
        <div class="max-w-3xl text-center">
            <div class="mb-12">
                <span class="font-display text-6xl text-bronze-300">"</span>
            </div>
            <h1 class="font-serif text-3xl md:text-5xl leading-tight text-stone-800 mb-12">
                <?php echo wp_kses_post( $heading ); ?>
            </h1>
            <div class="w-24 h-px bg-stone-300 mx-auto mb-12"></div>
            <div class="font-light text-stone-600 text-lg leading-relaxed space-y-6">
                <?php foreach ( $paragraphs as $paragraph ) : ?>
                    <p><?php echo wp_kses_post( $paragraph ); ?></p>
                <?php endforeach; ?>
            </div>
            <?php if ( $signature_url ) : ?>
                <div class="mt-16">
                    <img src="<?php echo esc_url( $signature_url ); ?>" class="h-16 mx-auto opacity-50" alt="Signature">
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for inquire section block
 */
function dedwards_render_inquire_section( $attributes ) {
    $heading = $attributes['heading'] ?? 'Inquire';
    $description = $attributes['description'] ?? 'Available for commissions, gallery exhibitions, and private collection acquisitions.';
    $studio_location = $attributes['studioLocation'] ?? 'Twin Falls, Idaho, USA';
    $representation = $attributes['representation'] ?? 'Available for Gallery Representation';
    $email = $attributes['email'] ?? 'info@dustinedwards.com';
    $form_shortcode = $attributes['formShortcode'] ?? '';
    
    ob_start();
    ?>
    <div class="pt-32 md:pt-48 px-6 md:px-12 pb-24 bg-white min-h-screen">
        <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div>
                <h1 class="font-display text-4xl md:text-5xl text-stone-850 mb-8"><?php echo wp_kses_post( $heading ); ?></h1>
                <p class="font-serif text-xl text-stone-600 mb-12">
                    <?php echo wp_kses_post( $description ); ?>
                </p>
                
                <div class="space-y-8 border-t border-stone-100 pt-8">
                    <div>
                        <h3 class="text-xs uppercase tracking-widest text-stone-400 mb-2">Studio Location</h3>
                        <p class="font-display text-stone-800"><?php echo esc_html( $studio_location ); ?></p>
                    </div>
                    <div>
                        <h3 class="text-xs uppercase tracking-widest text-stone-400 mb-2">Representation</h3>
                        <p class="font-display text-stone-800"><?php echo esc_html( $representation ); ?></p>
                    </div>
                    <div>
                        <h3 class="text-xs uppercase tracking-widest text-stone-400 mb-2">Contact</h3>
                        <a href="mailto:<?php echo esc_attr( $email ); ?>" class="font-display text-stone-800 hover:text-bronze-600 transition-colors"><?php echo esc_html( $email ); ?></a>
                    </div>
                </div>
            </div>

            <div>
                <?php 
                if ( $form_shortcode ) {
                    echo do_shortcode( $form_shortcode );
                } else {
                    echo '<p class="text-stone-400 text-center p-8 bg-stone-50 rounded">Add Contact Form 7 shortcode in block settings</p>';
                }
                ?>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for mosaic gallery section
 */
function dedwards_render_mosaic_gallery( $attributes ) {
    $heading = $attributes['heading'] ?? 'Gallery';
    $subheading = $attributes['subheading'] ?? 'Selected Works';
    $posts_per_page = $attributes['postsPerPage'] ?? 8;
    $category = $attributes['category'] ?? '';
    $show_titles = $attributes['showTitles'] ?? true;
    $show_metadata = $attributes['showMetadata'] ?? false;
    $mosaic_pattern = $attributes['mosaicPattern'] ?? 'dynamic';
    
    $args = array(
        'post_type' => 'work',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
    );
    
    if ( ! empty( $category ) ) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'work_category',
                'field' => 'term_id',
                'terms' => $category,
            ),
        );
    }
    
    $works = new WP_Query( $args );
    
    ob_start();
    ?>
    <section class="px-4 md:px-12 pb-32 bg-bronze-50">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-bronze-200 pb-6">
            <h2 class="text-sm font-display uppercase tracking-widest text-bronze-800">
                <?php echo esc_html( $heading ); ?>
            </h2>
            <span class="text-xs font-sans uppercase tracking-[0.2em] text-bronze-500 mt-2 md:mt-0">
                <?php echo esc_html( $subheading ); ?>
            </span>
        </div>

        <!-- Mosaic Grid Container -->
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4">
            <?php if ( $works->have_posts() ) : ?>
                <?php 
                $index = 0;
                while ( $works->have_posts() ) : $works->the_post(); 
                    $material = get_post_meta( get_the_ID(), '_work_material', true );
                    $material = $material ?: 'Bronze';
                    
                    $edition = get_post_meta( get_the_ID(), '_work_edition', true );
                    $dimensions = get_post_meta( get_the_ID(), '_work_dimensions', true );
                    
                    // Format material/edition info
                    if ( $edition ) {
                        $work_info = $material . ' ' . $edition;
                    } else if ( $dimensions ) {
                        $work_info = $material . ', ' . $dimensions;
                    } else {
                        $work_info = $material;
                    }
                    
                    $featured_image = get_the_post_thumbnail_url( get_the_ID(), 'large' );
                    if ( ! $featured_image ) {
                        $featured_image = 'https://images.unsplash.com/photo-1628607153673-455b550117d9?q=80&w=1500&auto=format&fit=crop';
                    }
                    
                    // Get mosaic classes based on pattern
                    $patterns = array(
                        'dynamic' => array(
                            'col-span-2 row-span-2', // Large 2x2
                            'col-span-1 row-span-1', // Regular 1x1
                            'col-span-1 row-span-2', // Tall 1x2
                            'col-span-2 row-span-1', // Wide 2x1
                            'col-span-1 row-span-1', // Regular 1x1
                            'col-span-1 row-span-1', // Regular 1x1
                            'col-span-2 row-span-1', // Wide 2x1
                            'col-span-1 row-span-2', // Tall 1x2
                            'col-span-1 row-span-1', // Regular 1x1
                            'col-span-2 row-span-2', // Large 2x2
                        ),
                        'uniform' => array(
                            'col-span-1 row-span-1', // All uniform
                        ),
                        'featured' => array(
                            'col-span-2 row-span-3', // Hero piece
                            'col-span-1 row-span-1',
                            'col-span-1 row-span-1',
                            'col-span-1 row-span-2',
                            'col-span-1 row-span-1',
                            'col-span-1 row-span-1',
                            'col-span-2 row-span-1',
                            'col-span-1 row-span-1',
                        )
                    );
                    
                    $pattern = isset( $patterns[ $mosaic_pattern ] ) ? $patterns[ $mosaic_pattern ] : $patterns['dynamic'];
                    $grid_class = $pattern[ $index % count( $pattern ) ];
                ?>
                    <a 
                        href="<?php the_permalink(); ?>" 
                        class="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 <?php echo esc_attr( $grid_class ); ?>"
                    >
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                        
                        <img 
                            src="<?php echo esc_url( $featured_image ); ?>" 
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt="<?php echo esc_attr( get_the_title() ); ?>"
                        />
                        
                        <!-- Overlay Content -->
                        <?php if ( $show_titles || $show_metadata ) : ?>
                            <div class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                <?php if ( $show_titles ) : ?>
                                    <h3 class="font-serif text-white text-lg leading-tight mb-1">
                                        <?php the_title(); ?>
                                    </h3>
                                <?php endif; ?>
                                <?php if ( $show_metadata ) : ?>
                                    <p class="text-xs uppercase tracking-wider text-white/80">
                                        <?php echo esc_html( $work_info ); ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                        
                        <!-- Hover indicator -->
                        <div class="absolute top-4 right-4 w-6 h-6 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <div class="w-full h-full bg-white rounded-full transform scale-0 group-hover:scale-75 transition-transform duration-200"></div>
                        </div>
                    </a>
                <?php 
                $index++;
                endwhile; 
                wp_reset_postdata(); ?>
            <?php else : ?>
                <div class="col-span-full flex items-center justify-center h-64 text-center text-bronze-600 bg-bronze-100 rounded-lg">
                    <p>No works found. Add some work posts to display them here.</p>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- Gallery Info -->
        <div class="mt-12 text-center">
            <p class="text-xs uppercase tracking-[0.3em] text-bronze-500">
                <?php echo $works->found_posts; ?> <?php echo ( $works->found_posts === 1 ) ? 'Work' : 'Works'; ?>
            </p>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Enqueue block editor assets
 */
function dedwards_enqueue_block_editor_assets() {
    // Enqueue TailwindCSS for the block editor
    wp_enqueue_style( 
        'dedwards-tailwind-editor', 
        get_template_directory_uri() . '/assets/css/style.css',
        array(),
        filemtime( get_template_directory() . '/assets/css/style.css' )
    );
    
    // Enqueue editor-specific styles
    wp_enqueue_style( 
        'dedwards-editor', 
        get_template_directory_uri() . '/assets/css/editor.css',
        array( 'dedwards-tailwind-editor' ),
        filemtime( get_template_directory() . '/assets/css/editor.css' )
    );
    
    // Enqueue Google Fonts for the block editor
    wp_enqueue_style( 
        'google-fonts-editor', 
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Cinzel:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap', 
        array(), 
        null 
    );
    
    // Enqueue block extensions for custom styling controls
    wp_enqueue_script(
        'dedwards-block-extensions',
        get_template_directory_uri() . '/assets/js/block-extensions.js',
        array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-editor', 'wp-hooks', 'wp-compose', 'wp-block-editor' ),
        filemtime( get_template_directory() . '/assets/js/block-extensions.js' ),
        false
    );
}
add_action( 'enqueue_block_editor_assets', 'dedwards_enqueue_block_editor_assets' );

/**
 * Add Tailwind classes to navigation block mobile overlay
 */
function dedwards_add_tailwind_to_nav_overlay( $block_content, $block ) {
    if ( 'core/navigation' === $block['blockName'] ) {
        // Add Tailwind classes to overlay elements
        $block_content = str_replace(
            'wp-block-navigation__responsive-container is-menu-open',
            'wp-block-navigation__responsive-container is-menu-open fixed inset-0 w-screen h-screen bg-stone-900 flex items-center justify-center z-[999999]',
            $block_content
        );
        
        $block_content = str_replace(
            'wp-block-navigation__responsive-container-content',
            'wp-block-navigation__responsive-container-content flex flex-col items-center justify-center w-full h-full gap-8 text-center',
            $block_content
        );
        
        $block_content = str_replace(
            'class="wp-block-navigation__container',
            'class="wp-block-navigation__container flex flex-col items-center justify-center gap-8 text-center',
            $block_content
        );
    }
    return $block_content;
}
add_filter( 'render_block', 'dedwards_add_tailwind_to_nav_overlay', 10, 2 );

/**
 * Render callback for Gallery Header block
 */
function dedwards_render_gallery_header( $attributes ) {
    $title = $attributes['title'] ?? 'Gallery';
    $subtitle = $attributes['subtitle'] ?? 'Visualizing Western form and Wildlife within architectural landscapes.';
    $description = $attributes['description'] ?? 'A selection of environmental studies exploring scale, light, and placement.';
    
    ob_start();
    ?>
    <header class="max-w-4xl mx-auto pt-32 pb-32 px-8 text-center reveal">
        <h1 class="font-serif italic text-6xl md:text-8xl font-light mb-10 text-stone-900">
            <?php echo esc_html( $title ); ?>
        </h1>
        <div class="w-16 h-[1px] bg-stone-700 mx-auto mb-12"></div>
        <p class="text-stone-600 font-light leading-relaxed text-xl md:text-2xl font-serif italic max-w-2xl mx-auto">
            <?php echo wp_kses_post( $subtitle ); ?>
        </p>
        <p class="mt-8 text-[11px] uppercase tracking-[0.4em] text-stone-500 max-w-sm mx-auto leading-loose">
            <?php echo wp_kses_post( $description ); ?>
        </p>
    </header>
    <?php
    return ob_get_clean();
}

/**
 * Render callback for Adaptive Gallery block
 */
function dedwards_render_adaptive_gallery( $attributes ) {
    $images = $attributes['images'] ?? array();
    
    ob_start();
    ?>
    <main class="max-w-[1600px] mx-auto px-8 md:px-12 pb-40">
        <?php if ( empty( $images ) ) : ?>
            <div class="text-center py-20 border-2 border-dashed border-stone-300">
                <p class="text-stone-500">Add images to create your adaptive gallery</p>
            </div>
        <?php else : ?>
            <div class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                <?php foreach ( $images as $index => $image ) : 
                    // Vary the margin for visual interest
                    $margin_class = 'mb-8';
                    
                    switch ( $index % 6 ) {
                        case 0:
                            $margin_class = 'mb-12';
                            break;
                        case 1:
                            $margin_class = 'mb-6';
                            break;
                        case 2:
                            $margin_class = 'mb-10';
                            break;
                        case 3:
                            $margin_class = 'mb-8';
                            break;
                        case 4:
                            $margin_class = 'mb-14';
                            break;
                        case 5:
                            $margin_class = 'mb-6';
                            break;
                    }
                    
                    $delay = 0.1 * ($index + 1);
                    ?>
                    <div class="w-full <?php echo esc_attr( $margin_class ); ?> break-inside-avoid reveal" style="animation-delay: <?php echo esc_attr( $delay ); ?>s;">
                        <div class="img-wrapper overflow-hidden bg-stone-100">
                            <img 
                                src="<?php echo esc_url( $image['url'] ); ?>" 
                                alt="<?php echo esc_attr( $image['alt'] ?? '' ); ?>"
                                class="w-full h-auto transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                        <?php if ( ! empty( $image['title'] ) || ! empty( $image['caption'] ) ) : ?>
                            <div class="mt-6 text-left">
                                <?php if ( ! empty( $image['title'] ) ) : ?>
                                    <h3 class="font-serif text-xl md:text-2xl font-light italic text-stone-900">
                                        <?php echo esc_html( $image['title'] ); ?>
                                    </h3>
                                <?php endif; ?>
                                <?php if ( ! empty( $image['caption'] ) ) : ?>
                                    <p class="text-[9px] uppercase tracking-[0.3em] text-stone-500 mt-1">
                                        <?php echo esc_html( $image['caption'] ); ?>
                                    </p>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </main>
    
    <!-- Add reveal animation CSS -->
    <style>
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            animation: revealUp 0.8s ease-out forwards;
        }
        
        @keyframes revealUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .img-wrapper {
            overflow: hidden;
        }
        
        .img-wrapper img {
            transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .img-wrapper:hover img {
            transform: scale(1.05);
        }
    </style>
    <?php
    return ob_get_clean();
}