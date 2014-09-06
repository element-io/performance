


(function() {
	'use strict';

	// MODULES //

	var // Filesystem module:
		fs = require( 'fs' ),

		// Path module:
		path = require( 'path' );


	/**
	* FUNCTION: getData()
	*	Loads the test data into memory.
	*/
	function getData() {
		var filenames,
			numFiles,
			filepath,
			file,
			data;

		// Read the data directory:
		filenames = fs.readdirSync( __dirname );

		// Only keep data files...
		filenames = filenames.filter( function filter( filename ) {
			return filename.substr( -5 ) === '.json' && parseFloat( filename ) < 1001;
		});

		numFiles = filenames.length;

		// Initialize the data array:
		data = new Array( numFiles );

		// Load the data...
		for ( var i = 0; i < numFiles; i++ ) {
			filepath = path.join( __dirname, filenames[i] );
			file = fs.readFileSync( filepath, {'encoding': 'utf8'} );
			data[ i ] = JSON.parse( file );
		}

		return data;
	} // end FUNCTION getData()


	// EXPORTS //

	module.exports = getData();

})();