'use strict';


const DotNode = class {

	constructor ( id ) {

		this.id = id;
		this.label = [];
		this.href = null;

	}

	addRecord ( record ) {

		this.label.push( record );

	}

	setLink ( href ) {

		this.href = href;

	}

};


module.exports = DotNode;
