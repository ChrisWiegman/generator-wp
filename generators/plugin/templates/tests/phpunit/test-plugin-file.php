<?php

/**
 * Test the primary plugin file
 *
 * @package <%= longOrgPrefix %>\<%= packageName %>
 */

namespace <%= longOrgPrefix %>\<%= packageName %>\Tests;

use PHPUnit\Framework\TestCase;
use Brain\Monkey;

/**
 * Test the main plugin file
 */
class PluginFileTest extends TestCase {

	protected function tearDown(): void {

		Monkey\tearDown();
		parent::tearDown();

	}

	/**
	 * Test loader function
	 */
	public function test_<%= orgPrefix %>_<%= pluginUnderscore %>_loader() {

		Monkey\Functions\expect( 'load_plugin_textdomain' )->once();
		Monkey\Functions\expect( 'plugin_dir_url' )->once();
		Monkey\Functions\expect( 'get_file_data' )->once();

		<%= orgPrefix %>_<%= pluginUnderscore %>_loader();

		$this->assertTrue( true );
		// Dummy assertion as we're relying on expectations above.

	}

	public function test_autoloader_registered() {
		$this->assertContains( '<%= orgPrefix %>_<%= pluginUnderscore %>_autoloader', spl_autoload_functions() );
	}

	public function test_autoloader() {

		$test_classes = array(
			'<%= longOrgPrefix %>\<%= packageName %>\Class_One' => '/app/src/lib/class-class-one.php',
			'<%= longOrgPrefix %>\<%= packageName %>\Sub_Classes\Class_Two' => '/app/src/lib/Sub_Classes/class-class-two.php',
			'Class_Three' => '',
		);

		foreach ( $test_classes as $test_class => $class_file ) {

			$file = <%= orgPrefix %>_<%= pluginUnderscore %>_get_class_file( $test_class );

			$this->assertEquals( $class_file, $file );

		}
	}
}
