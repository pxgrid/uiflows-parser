'use strict';


const DotRecord = class {

	constructor ( port, record ) {

		this.port = port;
		this.record = record === undefined ? [] : record;

	}

	addItem ( item ) {

		this.record.push( item );

	}

};


module.exports = DotRecord;
