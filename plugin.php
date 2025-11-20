<?php
/**
 * Plugin Name: MyPlugin Blocks
 * Plugin URI: https://example.com/myplugin-blocks
 * Description: Custom Gutenberg blocks for WordPress - includes alert boxes and dynamic post listings
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Your Name
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: myplugin-blocks
 * Domain Path: /languages
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin constants
define( 'MYPLUGIN_BLOCKS_VERSION', '1.0.0' );
define( 'MYPLUGIN_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'MYPLUGIN_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register all blocks in the blocks directory
 */
function myplugin_register_blocks() {
    $blocks_dir = MYPLUGIN_BLOCKS_PATH . 'blocks';

    // Security: Validate directory exists and is readable
    if ( ! is_dir( $blocks_dir ) || ! is_readable( $blocks_dir ) ) {
        return;
    }

    // Use scandir instead of glob for better security
    $items = scandir( $blocks_dir );

    if ( false === $items ) {
        return;
    }

    foreach ( $items as $item ) {
        // Skip hidden files and parent directory references
        if ( '.' === $item[0] ) {
            continue;
        }

        $block_path = $blocks_dir . '/' . $item;
        $block_json = $block_path . '/block.json';

        // Verify it's a directory with block.json
        if ( is_dir( $block_path ) && file_exists( $block_json ) ) {
            register_block_type( $block_path );
        }
    }
}
add_action( 'init', 'myplugin_register_blocks' );

/**
 * Load plugin text domain for translations
 */
function myplugin_blocks_load_textdomain() {
    load_plugin_textdomain(
        'myplugin-blocks',
        false,
        dirname( plugin_basename( __FILE__ ) ) . '/languages'
    );
}
add_action( 'plugins_loaded', 'myplugin_blocks_load_textdomain' );