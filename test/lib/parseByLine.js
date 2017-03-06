const expect = require( 'chai' ).expect;


describe( 'parseByLine()', () => {

	const parseByLine = require( '../../lib/parseByLine.js' );


	it( 'should return a object', () => {

		expect( parseByLine() ).to.be.a('object');

	} );


	context( 'when HEAD line', () => {

		it( 'should return the type to be `\'head\'` when arguments with `[any strings]`', () => {

			expect( parseByLine( '[any strings]' ).type ).to.equal( 'head' );

		} );

		it( 'should return the content to be `any strings` when arguments with `[any strings]`', () => {

			expect( parseByLine( '[any strings]' ).content ).to.equal( 'any strings' );

		} );

		it( 'should return the href to be properly when arguments with like a `[any strings](./hoge/fuga.html)`', () => {

			expect( parseByLine( '[any strings](./hoge/fuga.html)'   ).href ).to.equal( './hoge/fuga.html' );
			expect( parseByLine( '[any strings](#hoge)'              ).href ).to.equal( '#hoge' );
			expect( parseByLine( '[any strings](http://example.com)' ).href ).to.equal( 'http://example.com' );

		} );

	} );


	context( 'when SEPARATOR line', () => {

		it( 'should return the type to be `\'separator\'` when the arguments repeated one or more times `-`.', () => {

			expect( parseByLine( '-' ).type ).to.equal( 'separator' );
			expect( parseByLine( '-----' ).type ).to.equal( 'separator' );

		} );

	} );


	context( 'when LINK line', () => {

		it( 'should return the type to be `\'link\'` when arguments with `==> hoge`', () => {

			expect( parseByLine( '==> hoge' ).type ).to.equal( 'link' );

		} );

		it( 'should return the content to be `\'hoge\'` when arguments with `==> hoge`', () => {

			expect( parseByLine( '==> hoge' ).content ).to.equal( 'hoge' );

		} );

		it( 'should return the target to be properly when arguments with like a `==> hoge:fuga`', () => {

			expect( parseByLine( '==> hoge'      ).target ).to.not.be.ok;
			expect( parseByLine( '==> hoge:fuga' ).target ).to.equal( 'fuga' );

		} );

	} );


	context( 'when BLANK line', () => {

		it( 'should return the type to be `\'blank\'` when arguments with `\\s`', () => {

			expect( parseByLine( '	' ).type ).to.equal( 'blank' );

		} );

	} );


	context( 'when OTHERS line', () => {

		it( 'should return the type to be `\'text\'` when arguments with others', () => {

			expect( parseByLine( 'hogehoge'  ).type ).to.equal( 'text' );
			expect( parseByLine( '/hogehoge' ).type ).to.equal( 'text' );
			expect( parseByLine( '#hogehoge' ).type ).to.equal( 'text' );

		} );

		it( 'should return the content to be properly when arguments with others', () => {

			expect( parseByLine( 'hogehoge'  ).content ).to.equal( 'hogehoge' );
			expect( parseByLine( '/hogehoge' ).content ).to.equal( '/hogehoge' );
			expect( parseByLine( '#hogehoge' ).content ).to.equal( '#hogehoge' );

		} );

	} );

} );
