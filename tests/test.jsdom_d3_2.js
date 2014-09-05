(function() {
	'use strict';

	// MODULES //

	var // JSDOM:
		jsdom = require( 'jsdom' ).jsdom,

		// D3:
		d3 = require( 'd3' );


	// VARIABLES //

	var WIDTH = 500,
		HEIGHT = 500,
		RADIUS = 5;


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
			var window,
				document,
				body,
				figure,
				canvas,
				graph,
				content,
				start,
				end;

			// Create the document:
			document = jsdom( '<html><head></head><body></body></html>' );

			// Get the parent window:
			window = document.parentWindow;

			// Get the body:
			body = document.querySelector( 'body' );

			// Start the stopwatch:
			start = Date.now();

			// Create a figure element:
			figure = document.createElement( 'figure' );

			// Add a class to the figure:
			figure.className += 'figure';

			// Append to the body:
			body.appendChild( figure );

			// Append a SVG canvas to the figure element and configure:
			canvas = d3.select( figure ).append( 'svg:svg' )
				.attr( 'property', 'canvas' )
				.attr( 'class', 'canvas' )
				.attr( 'width', WIDTH )
				.attr( 'height', HEIGHT )
				.attr( 'viewBox', '0 0 ' + WIDTH + ' ' + HEIGHT )
				.attr( 'preserveAspectRatio', 'xMidYMid' )
				.attr( 'data-aspect', WIDTH / HEIGHT );

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
				.attr( 'r', RADIUS );

			// Get the body content:
			content = body.innerHTML;

			// Stop the clock:
			end = Date.now();

			// Free up the allocated memory:
			window.close();

			// Return the time:
			return end - start;
		}; // end FUNCTION test()
	} // end FUNCTION createTest()

	
	// EXPORTS //

	module.exports = createTest;

})();