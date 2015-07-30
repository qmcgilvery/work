/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       23 Jul 2015     quentin
 *
 */

/**
 * @returns {Void} Any or no return value
 */
function workflowAction() {
	
	var currentId = nlapiGetRecordId();
	nlapiLogExecution("DEBUG", "Current Record", currentId); // logs ID of current record.
	
	var rec = nlapiLoadRecord('customrecord812', nlapiGetRecordId()); // load current record
	var serialNum = rec.getFieldValue('custrecord1431'); // get value of the serial number field on current record
	
	nlapiLogExecution("DEBUG", "serial number", serialNum); // logs serial number
	
	var searchFilters = new Array();
	searchFilters.push(new nlobjSearchFilter("custrecord1431", null, 'is', serialNum)); // sets filter: sn field is current sn
	
	var searchResult = nlapiSearchRecord("customrecord812", 1068, searchFilters, null); // searches for and returns item with matching sn
	nlapiLogExecution("DEBUG", "to be removed", searchResult[0].getId()); //  logs ID of first record with matching sn
	
	results = searchResult[0].getId(); // stores ID of record with matching sn 
	
	var orig = nlapiLoadRecord('customrecord812', results); // load original record
	var exp = orig.getFieldValue('custrecord1426'); // get value of the checkout date on original record
	
	nlapiLogExecution("DEBUG", "Datw", exp); // logs serial number
	
	
	/*

	if (currentId != results) {
		nlapiDeleteRecord("customrecord812", results);
	}
		 
	 var rec = nlapiLoadRecord('customrecord812', nlapiGetRecordId()); // load current record
	 
	 var serialNum 	= rec.getFieldValue('custrecord1431'); // get value of the serial number field on current record
	 var employee 	= rec.getFieldValue('custrecord1424'); // get value of the serial number field on current record
	 var status 	= rec.getFieldValue('custrecord1425'); // get value of the serial number field on current record
	 var employee 	= rec.getFieldValue('custrecord1424'); // get value of the serial number field on current record
	 var employee 	= rec.getFieldValue('custrecord1424'); // get value of the serial number field on current record
	
	nlapiLogExecution("DEBUG", "serial number", serialNum); // logs serial number
	
	var searchFilters = new Array();
	searchFilters.push(new nlobjSearchFilter("custrecord1431", null, 'is', serialNum)); // sets filter: sn field is current sn
	
	var searchResult = nlapiSearchRecord("customrecord812", 1068, searchFilters, null); // returns matching sn 
	nlapiLogExecution("DEBUG", "to be removed", searchResult[0].getId()); //  logs ID of duplicate	
	
	 
    nlapiSubmitField('customrecord812', 105, 'Status', 'Out with Expert');
    nlapiSubmitField('customrecord812', 105, 'Employee', 'Moses McGlivery');
    var update		= nlapiSubmitField('customrecord812', 105, 'Employee', 'Moses McGlivery');
    var updatefield = nlapiSubmitField('customrecord812', 105, 'Status', 'Out with Expert');
    updatefield;
    update;  
    nlapiLogExecution("DEBUG", "START", updatefield);    	

	
	*/
};