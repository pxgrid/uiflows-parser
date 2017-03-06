'use strict';

const _ = require( 'lodash' );


const DotNode   = require( './DotNode.js' );
const DotRecord = require( './DotRecord.js' );
const DotLink   = require( './DotLink.js' );


/**
 * _.templateに渡すdot言語のテンプレート文字列
 *
 * @const
 * @type {string}
 */
const templateSrc = `
	digraph "" {

	graph [ rankdir = "LR" ];
	node [
		fontsize = "16"
		shape = "record"
		tooltip = ""
	];
	edge [];

	<% _.each( nodes, function ( node ) {%>
		"<%= node.id %>" [
			<%if ( node.href ) { %>
				URL = "<%= node.href %>"
				tooltip = "<%= node.href %>"
			<% } else { %>
				tooltip = ""
			<% } %>
			label = "
				<% _.each( node.label, function ( label, i ) { %>
					<<%= label.port %>> <%= label.record.join( '|' ) %>
					<% if ( node.label.length - 1 !== i ) { %> | <% } %>
				<% } )%>
			"
		];
	<% } )%>

	<% _.each( links, function ( link ) {%>
		<%= link.from %> -> <%= link.to %>;
	<% } )%>
	}
`;


/**
 * @constructor
 * @param {array} tokens - lexerの返り値
 */
const DotTree = function ( tokens ) {

	this.nodes = [];
	this.links = [];

	this.template = _.template( templateSrc );

	let portCount = 0;
	let namePool = [];

	for ( let i = 0, l = tokens.length; i < l; i ++ ) {

		let token     = tokens[ i ];
		let tokenPrev = ( i !== 0 ) ? tokens[ i - 1 ] : null;

		switch ( token.type ) {

			case 'head': {

				portCount = 0;

				if ( namePool.indexOf( token.content ) === -1 ) {

					namePool.push( token.content );

				}

				let nodeId = `node${ namePool.indexOf( token.content ) }`;
				let node = new DotNode( nodeId );

				let record0 = new DotRecord( `port${ ( portCount ++ ) }`, [ token.content ] );
				node.addRecord( record0 );

				if ( !!token.href ) { node.setLink( token.href ); }

				this.nodes.push( node );
				break;
			}

			case 'text': {

				let node = this.nodes[ this.nodes.length - 1 ];
				//ひとつ前のトークンタイプに応じて
				//新規labelの追加か、recordの続きかを分岐
				if (
					!!tokenPrev && tokenPrev.type === 'head' ||
					!!tokenPrev && tokenPrev.type === 'separator' ||
					!!tokenPrev && tokenPrev.type === 'link'
				) {

					let emptyRecord = new DotRecord( `port${ ( portCount ++ ) }` );
					node.addRecord( emptyRecord );

				}

				let record = node.label[ node.label.length - 1 ];
				record.addItem( token.content );
				break;

			}

			case 'separator': {
				break;
			}

			case 'link': {

				let node = this.nodes[ this.nodes.length - 1 ];

				if ( namePool.indexOf( token.content ) === -1 ) {

					namePool.push( token.content );

				}

				let linkFrom = `${ node.id }:port${ ( portCount - 1 ) }`;
				let linkTo   = `node${ namePool.indexOf( token.content ) }:port0`;
				let link = new DotLink( linkFrom, linkTo );

				this.links.push( link );
				break;

			}

		}

	};

	// リンクされているが、
	// ↑の処理で一度も作られなかった node を生成する
	namePool.forEach( function ( name, i ) {

		let nodeid = `node${ i }`;
		let isExisted = this.nodes.some( function ( o ) { return o.id === nodeid } );

		if ( !isExisted ) {

			this.nodes.push( {
				id: nodeid,
				label: [ {
					port: 'port0',
					record: [ name ]
				} ]
			} );

		}

	}.bind( this ) );

	return this;

};


/**
 * @this DotTree
 * @return {string} - dot言語文字列
 */
DotTree.prototype.getCode = function () {

	return this.template( { nodes: this.nodes, links: this.links } );

};


module.exports = DotTree;
