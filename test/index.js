const expect = require( 'chai' ).expect;


describe( 'uiflows-parser', () => {

	const uiflowsParser = require( '../index.js' );


	it( 'uiflows文字列を解釈しdot言語文字列を返すこと', () => {

		expect( uiflowsParser( '[hoge]' ) ).to.be.a('string');

	} );

} );
