<?php
/**
 * Plugin Name: Igentworks Auto Blogs
 * Description: Igentworks Auto Blogs is a powerful WordPress plugin that automates content creation using advanced AI. It allows you to generate high-quality blog posts on a predefined schedule, keeping your website fresh and engaging without manual effort.
 * Version: 1.0.0
 * Author: Igentworks
 */

if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}


// Register admin menu
add_action('admin_menu', function () {
    add_menu_page(
        'Igentworks Auto Blogs', // website title 
        'Auto Blogs',  // sidemenu
        'manage_options', 
        'auto-blog-poster', 
        'render_auto_blog_poster', 
        'dashicons-edit', 
        24
    );
});



function render_auto_blog_poster() {

    $nonce = wp_create_nonce('wp_rest');
    echo '<div   id="auto-blogger"></div>';
    echo "<script>
        window.autoBloggerData = {nonce: '$nonce'};
    </script>";
}

add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'toplevel_page_auto-blog-poster') {
        return;
    }
   
    wp_enqueue_script(
        'auto-blog-app',
        plugin_dir_url(__FILE__) . 'dist/assets/index.js',
        [],
        '0.1.0',
        true
    );
    
    add_filter('script_loader_tag', function ($tag, $handle) {
        if ($handle === 'auto-blog-app') {
            return str_replace('src=', 'type="module" src=', $tag);
        }
        return $tag;
    }, 10, 2);

    wp_enqueue_style(
        'auto-blog-style',
        plugin_dir_url(__FILE__) . 'dist/assets/index.css',
        [],
        '1.1.0'
    );


},1000);

