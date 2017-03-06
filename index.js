'use strict';

const lexer       = require( './lib/lexer.js' );
const DotTree     = require( './lib/DotTree.js' );


/**
 * uiflows形式の文字列をdot言語文字列にパースして返す。
 *
 * @param  {string} code - uiflows形式文字列
 * @return {string} - dot言語文字列
 */
const uiflowsParser = function ( code ) {

	let tokens = lexer( code );
	let dotTree = new DotTree( tokens );
	return dotTree.getCode();

}

module.exports = uiflowsParser;
