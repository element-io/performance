(function() {
	'use strict';

	// MODULES //

	var // Test class:
		Uber = require( 'test' ),

		// Test task:
		task = require( './task.js' );


	// TEST //

	/**
	* FUNCTION: Test()
	*	Test constructor.
	*
	* @constructor
	* @returns {Test} Test instance
	*/
	function Test() {
		Uber.call( this );
		this._name = 'Minimal Element';
		this._desc = 'Tests using minimal elements to serialize HTML/SVG on the server.';
		return this;
	} // end FUNCTION Test()

	/**
	* Create a prototype which inherits from the parent prototype.
	*/
	Test.prototype = Object.create( Uber.prototype );

	/**
	* Set the constructor.
	*/
	Test.prototype.constructor = Test;

	/**
	* METHOD: run()
	*	Test runner.
	*
	* @returns {Test} Test instance
	*/
	Test.prototype.run = function() {
		var data = this._data,
			total = this._repeats,
			mem;

		this._times = new Array( total );
		this._ram = new Array( total );
		this._heap = new Array( total );

		for ( var i = 0; i < total; i++ ) {
			this._times[ i ] = task( data );
			mem = process.memoryUsage();
			this._ram[ i ] = mem.rss;
			this._heap[ i ] = mem.heapUsed / mem.heapTotal;
		}

		return this;
	}; // end METHOD run()

	
	// EXPORTS //

	module.exports = function createTest() {
		return new Test();
	};

})();