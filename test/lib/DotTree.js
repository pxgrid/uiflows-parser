const expect     = require( 'chai' ).expect;
const sinon      = require( 'sinon' );
const proxyquire = require( 'proxyquire' );


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

describe( 'DotTree()', () => {

	const DotTree = require( '../../lib/DotTree.js' );


	describe( 'constructor', () => {

		let dotTree = new DotTree([]);


		it( 'should has the `this.nodes` property', () => {

			expect( dotTree.nodes ).to.be.ok;

		} );

		it( 'should the `this.nodes` property is an array', () => {

			expect( dotTree.nodes ).to.be.an( 'array' );

		} );


		it( 'should has the `this.links` property', () => {

			expect( dotTree.links ).to.be.ok;

		} );

		it( 'should the `this.nodes` property is an array', () => {

			expect( dotTree.links ).to.be.an( 'array' );

		} );


		it( 'should has the `this.template` property', () => {

			expect( dotTree.template ).to.be.ok;

		} );

		it( 'should the `this.template` property is return of _.template with templateSrc', () => {

			let stubTemplate = sinon.stub();
			let DotTree = proxyquire( '../../lib/DotTree.js', {
				'lodash': { template: stubTemplate }
			} );
			let dotTree = new DotTree([]);

			expect( stubTemplate.calledWith( templateSrc ) ).to.be.ok;

		} );


		it( 'todo `for` inners' );

	} );


	describe( '#getCode', () => {

		it( 'should return string', () => {

			let dotTree = new DotTree([]);

			expect( dotTree.getCode() ).to.be.a('string');

		} );


		it( 'should call once `this.template` with properly arguments', () => {

			let stubTemplate = sinon.stub();
			let dotTree = new DotTree([]);
			dotTree.template = stubTemplate;
			dotTree.getCode();

			expect( stubTemplate.calledOnce ).to.be.ok;
			expect( stubTemplate.args[0][0].nodes ).to.equal( dotTree.nodes );
			expect( stubTemplate.args[0][0].links ).to.equal( dotTree.links );

		} );

	} );

} );
