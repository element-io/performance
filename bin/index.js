#!/usr/bin/env node


(function() {
	'use strict';

	var tests = require( './../tests' ),
		keys = Object.keys( tests ),
		total = 100,
		results = {},
		name,
		mean,
		sum;

	for ( var i = 0; i < keys.length; i++ ) {
		name = keys[ i ];
		results[ name ] = [];
		sum = 0;
		for ( var j = 0; j < total; j++ ) {
			sum += tests[ name ]();
		}
		mean = Math.round( sum / total );
		console.log( name + ': ' + mean + ' ms (avg)' );
	}

})();