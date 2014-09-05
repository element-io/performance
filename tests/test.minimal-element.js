(function() {
	'use strict';

	// MODULES //

	var // Minimal element:
		element = require( 'minimal-element' );


	// METHODS:

	var createHTMLElement = element.html,
		createSVGElement = element.svg;


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
			var figure,
				canvas,
				graph,
				circle,
				content,
				start,
				end;

			// Start the clock:
			start = Date.now();

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
				.attr( 'width', WIDTH )
				.attr( 'height', HEIGHT )
				.attr( 'viewBox', '0 0 ' + WIDTH + ' ' + HEIGHT )
				.attr( 'preserveAspectRatio', 'xMidYMid' )
				.attr( 'data-aspect', WIDTH/HEIGHT );

			// Create a group element, configure, and append to the canvas:
			graph = createSVGElement( 'g' );

			graph
				.attr( 'property', 'graph' )
				.attr( 'class', 'graph' );

			canvas.append( graph );

			// Create the data elements...
			for ( var i = 0; i < data.length; i++ ) {
				circle = createSVGElement( 'circle' );

				circle
					.attr( 'class', 'datum' )
					.attr( 'cx', data[ i ][ 0 ] )
					.attr( 'cy', data[ i ][ 1 ] )
					.attr( 'r', RADIUS );
			}

			// Serialize the figure:
			content = figure.toString();

			// Stop the clock:
			end = Date.now();

			// Return the time:
			return end - start;
		}; // end FUNCTION test()
	} // end FUNCTION createTest()

	
	// EXPORTS //

	module.exports = createTest;

})();