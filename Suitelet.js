/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       24 Jul 2015     quentin
 *
 */

/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 *

*/

function suitelet(request, response)
{
  if (request.getMethod() == 'GET' )
  {
    //Create the form and add fields to it 
    var form = nlapiCreateForm("Suitelet - GET call" );
    form.addField('custpage_field1', 'text', 'Name' ).setDefaultValue('Product Name' );
    form.addField('custpage_field2', 'select', 'Employee', 'employee' );
    form.addField('custpage_field3', 'select', 'Status', '807' );
    //form.addField('custpage_field3', 'select', 'Employee', 'employee' ); Serial number list to go here
    form.addField('custpage_field4', 'text', 'serial num' );
    
    form.addSubmitButton('Submit' );
		
    response.writePage(form);
	 }
  //POST call
  else
  {
    //var form = nlapiCreateForm("Suitelet - POST call" );
	
    var SN = request.getParameter('custpage_field4' );
    
    
    
    
	nlapiLogExecution("DEBUG", "Name", request.getParameter('custpage_field1' )); // logs name;
    nlapiLogExecution("DEBUG", "Employee", request.getParameter('custpage_field2' )); // logs empl;
    nlapiLogExecution("DEBUG", "Status", request.getParameter('custpage_field3' )); // logs status;
    nlapiLogExecution("DEBUG", "SN", SN); // logs sn;
    
    var worker = request.getParameter('custpage_field2' );
    var searchFilters = new Array();
	searchFilters.push(new nlobjSearchFilter("custrecord1431", null, 'is', SN)); // sets filter: sn field is current sn
	
	var searchResult = nlapiSearchRecord("customrecord812", 1068, searchFilters, null); // searches for and returns item with matching sn
	nlapiLogExecution("DEBUG", "to be removed", searchResult.length); //  amount of items w matching sn
	nlapiLogExecution("DEBUG", "to be removed", searchResult[0].getId()); //  logs ID of first record with matching sn
  
	results = searchResult[0].getId(); // stores ID of record with matching sn 	
	
	var orig 		= nlapiLoadRecord('customrecord812', results); // load original record
	
	var oldDate 	= orig.getFieldValue('custrecord1426'); // get value of the checkout date on original record
	var oldStatus 	= orig.getFieldValue('custrecord1425'); // get value of the checkout date on original record
	var oldSn 		= orig.getFieldValue('custrecord1431'); // get value of the checkout date on original record
	var oldExp 		= orig.getFieldText('custrecord1424'); // get value of the checkout date on original record
	
		nlapiLogExecution("DEBUG", "Date", oldDate); // logs serial number
		nlapiLogExecution("DEBUG", "status", oldStatus); // logs serial number
		nlapiLogExecution("DEBUG", "sn", oldSn); // logs serial number
		nlapiLogExecution("DEBUG", "expert", oldExp); // logs serial number
		
		var nStat 	= orig.setFieldValue('custrecord1425', '2'); // get value of the checkout date on original record
		var nSn 	= orig.setFieldValue('custrecord1431', '00000'); // get value of the checkout date on original record
		var nExp	= orig.setFieldValue('custrecord1424', worker); // get value of the checkout date on original record
		
		nlapiSubmitRecord(orig, null, null);
		
	//editSubrecord(String)
		
	
	//nlapiCreateRecord(812, Object)
	
    /*create the fields on the form and populate them with values from the previous screen 
    var resultField1 = form.addField('custpage_res1', 'text', 'Text Field value entered: ' );
    resultField1.setDefaultValue(request.getParameter('custpage_field1' ));
    resultField1.setDisplayType('inline' );
		
    var resultField2 = form.addField('custpage_res2', 'integer', 'Integer Field value entered: ' );
    resultField2.setDefaultValue(request.getParameter('custpage_field2' ));
    resultField2.setDisplayType('inline' );
		
    var resultField3 = form.addField('custpage_res3', 'select', 'Select Field value entered: ', 'customer' );
    resultField3.setDefaultValue(request.getParameter('custpage_field3' ));
    resultField3.setDisplayType('inline' );
    */
	message = '<html><h1>Thank You!</h1></html>'
    response.writePage(message);
   
    
  }
}

