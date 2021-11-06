<?php
/**
 * Plugin Name: <%= pluginName %>
 * Plugin URI: <%= projectHome %>
 * Description: <%= description %>
 * Version: 0.0.1
 * Text Domain: <%= pluginDash %>
 * Domain Path: /languages
 * Author: <%= authorName %>
 * Author URI: <%= projectHome %>
 * License: GPLv2
 *
 * @package <%= longOrgPrefix %>\<%= packageName %>
 */

/**
 * Load plugin functionality.
 *
 * @since 1.0.0
 */
function <%= orgPrefix %>_<%= pluginUnderscore %>_loader() {

	// Load the text domain.
	load_plugin_textdomain( '<%= pluginDash %>', false, dirname( dirname( __FILE__ ) ) . '/languages' );

}

/**
 * Builds the class file name for the plugin
 *
 * @since 1.0.0
 *
 * @param string $class The name of the class to get.
 * @return string
 */
function <%= orgPrefix %>_<%= pluginUnderscore %>_get_class_file( $class ) {

	$prefix   = '<%= longOrgPrefix %>\\<%= packageName %>\\';
	$base_dir = __DIR__ . '/src/lib/';

	$len = strlen( $prefix );

	if ( 0 !== strncmp( $prefix, $class, $len ) ) {
		return '';
	}

	$relative_class = substr( $class, $len );
	$file           = $base_dir . str_replace( '\\', '/', 'class-' . strtolower( str_replace( '_', '-', $relative_class ) ) ) . '.php';

	$relative_class_parts = explode( '\\', $relative_class );

	if ( 1 < count( $relative_class_parts ) ) {

		$class_file = $relative_class_parts[0] . '/class-' . strtolower( str_replace( '_', '-', $relative_class_parts[1] ) );
		$file       = $base_dir . str_replace( '\\', '/', $class_file ) . '.php';

	}

	return $file;

}

/**
 * Auto-loading functionality for the plugin features
 *
 * @since 1.0.0
 *
 * @param object $class The class to load.
 */
function <%= orgPrefix %>_<%= pluginUnderscore %>_autoloader( $class ) {

	$file = <%= orgPrefix %>_<%= pluginUnderscore %>_get_class_file( $class );

	if ( ! empty( $file ) && file_exists( $file ) ) {
		include $file;
	}
}

spl_autoload_register( '<%= orgPrefix %>_<%= pluginUnderscore %>_autoloader' );

add_action( 'plugins_loaded', '<%= orgPrefix %>_<%= pluginUnderscore %>_loader' );
