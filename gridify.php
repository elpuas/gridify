<?php
/**
 * Plugin Name:       Gridify
 * Description:       A block that allows you to set a CSS Grid layout and arrange child blocks within it.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           2.0.0
 * Author:            ElPuas Digital Crafts
 * Author URI:        https://elpuas.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gridify
 *
 * @package           gridify
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_gridify_block_init() {
	register_block_type( __DIR__ . '/build/gridify' );
	register_block_type( __DIR__ . '/build/gridify-item' );
}
add_action( 'init', 'create_block_gridify_block_init' );
