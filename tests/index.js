/**
*
*	MINIMAL ELEMENT PERFORMANCE
*
*
*	DESCRIPTION:
*		- Minimal element performance tests.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// TESTS //

	var test1 = require( './test.minimal-element.js' ),
		test2 = require( './test.jsdom_d3_1.js' ),
		test3 = require( './test.jsdom_d3_2.js' ),
		test4 = require( './test.jsdom_d3_3.js' ),
		test5 = require( './test.jsdom_d3_4.js' ),
		test6 = require( './test.jsdom.js' );


	// VARIABLES //

	var numData = 100,
		WIDTH = 500,
		HEIGHT = 500,
		data,
		xPos,
		yPos;

	data = new Array( numData );

	for ( var i = 0; i < numData; i++ ) {
		xPos = Math.random() * WIDTH;
		yPos = Math.random() * HEIGHT;
		data[ i ] = [ xPos, yPos ];
	}

	
	// EXPORTS //

	module.exports = {
		'minimal_element': test1( data ),
		'jsdom_d3_1': test2( data ),
		'jsdom_d3_2': test3( data ),
		'jsdom_d3_3': test4( data ),
		'jsdom_d3_4': test5( data ),
		'jsdom': test6( data )
	};

})();