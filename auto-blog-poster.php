<?php
/**
 * Plugin Name: Auto Blog Poster
 * Description: AI Auto Blogger is a powerful WordPress plugin that automates content creation using advanced AI. It allows you to generate high-quality blog posts on a predefined schedule, keeping your website fresh and engaging without manual effort.
 * Version: 0.1.0
 * Author: Stuart Steinberg
 */

if (!defined('ABSPATH')) {
    exit; // Prevent direct access
}


// Register admin menu
add_action('admin_menu', function () {
    add_menu_page(
        'AI Auto Blogger', 
        'Auto Blog Poster', 
        'manage_options', 
        'auto-blog-poster', 
        'render_auto_blog_poster', 
        'dashicons-edit', 
        24
    );
});



function render_auto_blog_poster() {



    
    echo '<div id="auto-blogger"></div>';
}

add_action('admin_enqueue_scripts', function ($hook) {
    if ($hook !== 'toplevel_page_auto-blog-poster') {
        return;
    }
   
    wp_enqueue_script(
        'auto-blog-app',
        plugin_dir_url(__FILE__) . 'dist/assets/index.js', 
        ['wp-element'], 
        '0.1.0',
        true
    );

    wp_enqueue_style(
        'auto-blog-style',
        plugin_dir_url(__FILE__) . 'dist/assets/index.css',
        [],
        '1.1.0'
    );
    wp_enqueue_style(
        'auto-blog-style-new',
        plugin_dir_url(__FILE__) . 'dist/assets/style.css',
        [],
        '1.1.0'
    );













},100);

