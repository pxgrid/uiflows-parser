'use strict';

const HEAD      = /^\s*\[([^\]]*)\](\([^)]+\))?\s*$/;
const SEPARATOR = /^-+$/;
const LINK      = /^\s*==>\s*([^:\]]*):?([^:\]]+)?/;
const BLANK     = /^\s*$/;


/**
 * @returns {object}
 */
const parseByLine = function( line, num ) {

	if ( HEAD.test( line ) ) {

		return { type: 'head', content: RegExp.$1, href: RegExp.$2.replace( /(\(|\))/g, '' ) };

	}

	if ( SEPARATOR.test( line ) ) {

		return { type: 'separator' };

	}

	if ( LINK.test( line ) ) {

		return { type: 'link', content: RegExp.$1, target: RegExp.$2 };

	}

	if ( BLANK.test( line ) ) {

		return { type: 'blank' };

	}

	return { type: 'text', content: line };

};


module.exports = parseByLine;
