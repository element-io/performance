/**
*
*	TASK
*
*
*	DESCRIPTION:
*		- Uses a headless DOM environment provided by JSDOM to build a figure element.
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
		var NS = 'http://www.w3.org/2000/svg',
			len = data.length,
			w = WIDTH,
			h = HEIGHT,
			r = RADIUS,
			d,
			container,
			figure,
			canvas,
			graph,
			circle,
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
		canvas = document.createElementNS( NS, 'svg' );

		canvas.setAttributeNS( null, 'property', 'canvas' );
		canvas.setAttributeNS( null, 'class', 'canvas' );
		canvas.setAttributeNS( null, 'width', w );
		canvas.setAttributeNS( null, 'height', h );
		canvas.setAttributeNS( null, 'viewBox', '0 0 ' + w + ' ' + h );
		canvas.setAttributeNS( null, 'preserveAspectRatio', 'xMidYMid' );
		canvas.setAttributeNS( null, 'data-aspect', w/h );

		figure.appendChild( canvas );

		// Append a group element to the canvas:
		graph = document.createElementNS( NS, 'g' );

		graph.setAttributeNS( null, 'property', 'graph' );
		graph.setAttributeNS( null, 'class', 'graph' );

		canvas.appendChild( graph );

		// Create the data elements...
		for ( var i = 0; i < len; i++ ) {
			circle = document.createElementNS( NS, 'circle' );

			d = data[ i ];

			circle.setAttributeNS( null, 'class', 'datum' );
			circle.setAttributeNS( null, 'cx', d[0] );
			circle.setAttributeNS( null, 'cy', d[1] );
			circle.setAttributeNS( null, 'r', r );

			graph.appendChild( circle );
		}

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