/**
*
*	TASK
*
*
*	DESCRIPTION:
*		- Uses a headless DOM environment (provided by JSDOM) combined with D3 to build a figure element.
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

	var // D3 library:
		d3 = require( 'd3' );


	// TASK //

	/**
	* FUNCTION: task( document, data )
	*	Runs the test task.
	*
	* @param {Document} document - document object
	* @param {Array} data - array of arrays
	* @returns {Number} number of elapsed milliseconds during task execution.
	*/
	function task( document, data ) {
		var w = WIDTH,
			h = HEIGHT,
			r = RADIUS,
			container,
			figure,
			canvas,
			graph,
			content,
			start,
			end;

		// Start the clock:
		start = process.hrtime();

		// Create a container element:
		container = document.createElement( 'div' );

		// Create a figure element:
		figure = document.createElement( 'figure' );

		// Add a class to the figure:
		figure.className += 'figure';

		// Append to the container:
		container.appendChild( figure );

		// Append a SVG canvas to the figure element and configure:
		canvas = d3.select( figure ).append( 'svg:svg' )
			.attr( 'property', 'canvas' )
			.attr( 'class', 'canvas' )
			.attr( 'width', w )
			.attr( 'height', h )
			.attr( 'viewBox', '0 0 ' + w + ' ' + h )
			.attr( 'preserveAspectRatio', 'xMidYMid' )
			.attr( 'data-aspect', w/h );

		// Append a group element to the canvas:
		graph = canvas.append( 'svg:g' )
			.attr( 'property', 'graph' )
			.attr( 'class', 'graph' );

		// Create the data elements:
		graph.selectAll( 'datum' )
			.data( data )
		  .enter().append( 'svg:circle' )
			.attr( 'class', 'datum' )
			.attr( 'cx', function ( d ) {
				return d[ 0 ];
			})
			.attr( 'cy', function ( d ) {
				return d[ 1 ];
			})
			.attr( 'r', r );

		// Get the container content:
		content = container.innerHTML;

		// Stop the clock:
		end = process.hrtime( start );

		// Remove the child:
		container.removeChild( figure );

		// Return the time:
		return end[ 0 ]*1e9 + end[ 1 ];
	} // end FUNCTION task()


	// EXPORTS //

	module.exports = task;

})();