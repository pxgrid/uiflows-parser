'use strict';

const parseByLine = require( './parseByLine.js' );


/**
 * 渡されたuiflows形式の文字列を一行ごとに解釈した配列を返す。
 *
 * @requires parseByLine
 * @param {string} code - uiflows lang string
 * @returns {array}
 */
const lexer = function ( code ) {

	// TODO uiflows形式以外のstringが渡された場合

	return code.split( /\n/ ).map( parseByLine );

};


module.exports = lexer;
