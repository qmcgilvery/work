
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
    // store values from form 
    var name 		= request.getParameter('custpage_field1' );
    var employee 	= request.getParameter('custpage_field2' );
    var status 		= request.getParameter('custpage_field3' );
    var sn 			= request.getParameter('custpage_field4' );
    
	    // log values
		nlapiLogExecution("DEBUG", "Name", name); // name;
	    nlapiLogExecution("DEBUG", "Employee", employee); // employee;
	    nlapiLogExecution("DEBUG", "Status", status); // status;
	    nlapiLogExecution("DEBUG", "SN", sn); // sn;
	    
    // create search filter
    var searchFilters = new Array();
	searchFilters.push(new nlobjSearchFilter("custrecord1431", null, 'is', sn)); 
	// search for and return item with matching SN
	var searchResult = nlapiSearchRecord("customrecord812", 1068, searchFilters, null); 
	nlapiLogExecution("DEBUG", "to be removed", searchResult.length); //  amount of items w matching sn
	nlapiLogExecution("DEBUG", "to be removed", searchResult[0].getId()); //  logs ID of first record with matching sn
  
	// get ID of item returned from search 
	results = searchResult[0].getId();
	// load record of item
	var orig 		= nlapiLoadRecord('customrecord812', results);
	
		// store values of item
		var oldDate 	= orig.getFieldValue('custrecord1426');
		var oldStatus 	= orig.getFieldValue('custrecord1425');
		var oldExp 		= orig.getFieldText('custrecord1424'); 
		//var oldSn 	= orig.getFieldValue('custrecord1431');
		
			// log values
			nlapiLogExecution("DEBUG", "Date", oldDate); // logs old date
			nlapiLogExecution("DEBUG", "status", oldStatus); // logs old status
			nlapiLogExecution("DEBUG", "expert", oldExp); // logs old expert TOP
			//nlapiLogExecution("DEBUG", "sn", oldSn); // logs old serial number
			
	var nStat 	= orig.setFieldValue('custrecord1425', status); // get value of the checkout date on original record
	var nExp	= orig.setFieldValue('custrecord1424', employee); // get value of the checkout date on original record
	
	/*
	var subrec = orig.createSubrecord(existingrecmachcustrecord1432);
	subrec.setFieldValue('custrecord1420', 'something');
	subrec.commit();
	*/
	
	nlapiSubmitRecord(orig, null, null);

  }
}

