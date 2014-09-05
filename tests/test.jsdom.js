(function() {
	'use strict';

	// MODULES //

	var // JSDOM:
		jsdom = require( 'jsdom' ).jsdom;


	// VARIABLES //

	var NS = 'http://www.w3.org/2000/svg',
		WIDTH = 500,
		HEIGHT = 500,
		RADIUS = 5;


	// DOCUMENT //

	var document,
		body;

	// Create the document:
	document = jsdom( '<html><head></head><body></body></html>' );

	// Get the body:
	body = document.querySelector( 'body' );


	// TESTS //

	/**
	* FUNCTION: createTest( data )
	*	Returns a test function.
	*
	* @param {Array} data - data formatted as an array of arrays
	* @returns {Function} test function
	*/
	function createTest( data ) {
		/**
		* FUNCTION: test()
		*	Test function
		*
		* @returns {Number} number of elapsed milliseconds while running the test
		*/
		return function test() {
			var figure,
				canvas,
				graph,
				circle,
				content,
				start,
				end;

			// Start the stopwatch:
			start = Date.now();

			// Create a figure element:
			figure = document.createElement( 'figure' );

			// Add a class to the figure:
			figure.className += 'figure';

			// Append to the body:
			body.appendChild( figure );

			// Append a SVG canvas to the figure element and configure:
			canvas = document.createElementNS( NS, 'svg' );

			canvas.setAttributeNS( null, 'property', 'canvas' );
			canvas.setAttributeNS( null, 'class', 'canvas' );
			canvas.setAttributeNS( null, 'width', WIDTH );
			canvas.setAttributeNS( null, 'height', HEIGHT );
			canvas.setAttributeNS( null, 'viewBox', '0 0 ' + WIDTH + ' ' + HEIGHT );
			canvas.setAttributeNS( null, 'preserveAspectRatio', 'xMidYMid' );
			canvas.setAttributeNS( null, 'data-aspect', WIDTH/HEIGHT );

			figure.appendChild( canvas );

			// Append a group element to the canvas:
			graph = document.createElementNS( NS, 'g' );

			graph.setAttributeNS( null, 'property', 'graph' );
			graph.setAttributeNS( null, 'class', 'graph' );

			canvas.appendChild( graph );

			// Create the data elements:
			for ( var i = 0; i < data.length; i++ ) {
				circle = document.createElementNS( NS, 'circle' );

				circle.setAttributeNS( null, 'class', 'datum' );
				circle.setAttributeNS( null, 'cx', data[i][0] );
				circle.setAttributeNS( null, 'cy', data[i][1] );
				circle.setAttributeNS( null, 'r', RADIUS );

				graph.appendChild( circle );
			}

			// Get the body content:
			content = body.innerHTML;

			// Remove the child:
			body.removeChild( figure );

			// Stop the clock:
			end = Date.now();

			// Return the time:
			return end - start;
		}; // end FUNCTION test()
	} // end FUNCTION createTest()

	
	// EXPORTS //

	module.exports = createTest;

})();