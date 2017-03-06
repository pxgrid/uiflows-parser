const expect     = require( 'chai' ).expect;
const proxyquire = require( 'proxyquire' );
const sinon      = require( 'sinon' );


describe( 'lexer()', () => {

	const testUiflowsStr = '[hoge]\nfuga\n==> aaa\n[aaa]\nfoo' ;
	const testCount = 5;

	const stubParseByLine = sinon.stub();

	const lexer = proxyquire( '../../lib/lexer.js', {
		'./parseByLine.js': stubParseByLine
	} );


	beforeEach( () => {


	} );


	afterEach( () => {

		stubParseByLine.reset();

	} );


	it( 'should returns array', () => {

		expect( lexer( testUiflowsStr) ).to.be.an('array');

	} );


	it( 'should call `parseByLine` on each line of argument string', () => {

		lexer( testUiflowsStr );
		expect( stubParseByLine.callCount ).to.equal( testCount );

	} );


	it( 'should returned array\'s to be a object parsed by `parseByLine`', () => {

		let testObj = { test: 'test' };

		stubParseByLine.returns( testObj );

		expect( lexer( testUiflowsStr ) ).to.eql( [ testObj, testObj, testObj, testObj, testObj ] );

	} );

} );
