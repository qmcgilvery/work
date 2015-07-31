
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
    form.addField('custpage_field4', 'text', 'serial num' );
    form.addField('custpage_field5', 'select', 'Condition', '813' );
    form.addField('custpage_field6', 'longtext', 'Return Notes' );
    form.addField('custpage_field7', 'longtext', 'Damage Notes' );
    
    
    form.addSubmitButton('Submit' );
     
    form.setScript('customscript1174');
    response.write(tester = "yes");
    response.writePage(form);
	 }
  
  //POST call, submit
  else
  {
    // store values from form 
    var name 		= request.getParameter('custpage_field1' );
    var employee 	= request.getParameter('custpage_field2' );
    var status 		= request.getParameter('custpage_field3' );
    var sn 			= request.getParameter('custpage_field4' );
    var con			= request.getParameter('custpage_field5' );
    var rNotes		= request.getParameter('custpage_field6' );
    var dNotes		= request.getParameter('custpage_field7' ); 
	   
	    // create search filter
	    var searchFilters = new Array();
		searchFilters.push(new nlobjSearchFilter("custrecord1431", null, 'is', sn)); 
		
		// search for and return item with matching SN
		var searchResult = nlapiSearchRecord("customrecord812", 1068, searchFilters, null); 
		
		// get ID of item returned from search 
		results = searchResult[0].getId();
		
		// load record of item
		var orig 		= nlapiLoadRecord('customrecord812', results);
		
	// update parent record
	var nStat 	= orig.setFieldValue('custrecord1425', status); // set value of the status
	var nExp	= orig.setFieldValue('custrecord1424', employee); // set value of the expert
	
	// create child record
	var child = nlapiCreateRecord("customrecord811");
	
	// set values for child record
	child.setFieldValue('custrecord1432', results);
	child.setFieldValue('custrecord1420', rNotes);
	child.setFieldValue('custrecord1421', dNotes);
	
	// submit child, parent
	nlapiSubmitRecord(child, null, null);
	nlapiSubmitRecord(orig, null, null);

  }
}

