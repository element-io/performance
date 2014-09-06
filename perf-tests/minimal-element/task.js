/**
*
*	TASK
*
*
*	DESCRIPTION:
*		- Uses minimal elements to serialize HTML/SVG on the server.
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

	// MODULES //

	var // Minimal element:
		element = require( 'minimal-element' );


	// METHODS:

	var createHTMLElement = element.html,
		createSVGElement = element.svg;


	// TASK //

	/**
	* FUNCTION: task( data )
	*	Runs the test task.
	*
	* @param {Array} data - array of arrays
	* @returns {Number} number of elapsed nanoseconds during task execution
	*/
	function task( data ) {
		var len = data.length,
			w = WIDTH,
			h = HEIGHT,
			r = RADIUS,
			d,
			figure,
			canvas,
			graph,
			circle,
			content,
			start,
			end;
		
		// Start the clock:
		start = process.hrtime();

		// Create a figure element and configure:
		figure = createHTMLElement( 'figure' );

		figure.attr( 'class', 'figure' );

		// Create a new SVG canvas and configure:
		canvas = createSVGElement( 'svg' );

		canvas
			.attr( 'xmlns', 'http://www.w3.org/2000/svg' )
			.attr( 'xmlns:xlink', 'http://www.w3.org/1999/xlink' )
			.attr( 'xmlns:ev', 'http://www.w3.org/2001/xml-events' )
			.attr( 'property', 'canvas' )
			.attr( 'class', 'canvas' )
			.attr( 'width', w )
			.attr( 'height', h )
			.attr( 'viewBox', '0 0 ' + w + ' ' + h )
			.attr( 'preserveAspectRatio', 'xMidYMid' )
			.attr( 'data-aspect', w/h );

		// Create a group element, configure, and append to the canvas:
		graph = createSVGElement( 'g' );

		graph
			.attr( 'property', 'graph' )
			.attr( 'class', 'graph' );

		canvas.append( graph );

		// Create the data elements...
		for ( var i = 0; i < len; i++ ) {
			circle = createSVGElement( 'circle' );

			d = data[ i ];

			circle
				.attr( 'class', 'datum' )
				.attr( 'cx', d[ 0 ] )
				.attr( 'cy', d[ 1 ] )
				.attr( 'r', r );
		}

		// Serialize the figure:
		content = figure.toString();

		// Stop the clock:
		end = process.hrtime( start );

		// Return the elapsed time:
		return end[ 0 ]*1e9 + end[ 1 ];
	} // end FUNCTION task()


	// EXPORTS //

	module.exports = task;

})();