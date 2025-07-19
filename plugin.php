<?php
/*
Plugin Name: MyPlugin Blocks
*/

function myplugin_register_blocks() {
    $blocks = glob( plugin_dir_path( __FILE__ ) . 'blocks/*' );
    foreach ( $blocks as $block_dir ) {
        if ( is_dir( $block_dir ) && file_exists( $block_dir . '/block.json' ) ) {
            register_block_type( $block_dir );
        }
    }
}
add_action( 'init', 'myplugin_register_blocks' );