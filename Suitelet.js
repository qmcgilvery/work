
/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 *


function suitelet(request, response)
{
  if (request.getMethod() == 'GET' )
  {
    //Create the form and add fields to it 
    var form = nlapiCreateForm("Suitelet - GET call" );
    //form.addField('custpage_field1', 'text', 'Name' ).setDefaultValue('Product Name' );
    form.addField('custpage_field2', 'select', 'Employee', 'employee' );
    form.addField('custpage_field3', 'select', 'SKU', '816' );
    form.addField('custpage_field4', 'text', 'serial num' );
    form.addField('custpage_field5', 'select', 'Condition', '813' ).setDefaultValue(3);
    form.addField('custpage_field6', 'longtext', 'Return Notes' );
    form.addField('custpage_field7', 'longtext', 'Damage Notes' );
    form.addField('custpage_field8', 'checkbox', 'RETURN' );
    
    
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
    var sku 		= request.getParameter('custpage_field3' );
    var sn 			= request.getParameter('custpage_field4' );
    var con			= request.getParameter('custpage_field5' );
    var rNotes		= request.getParameter('custpage_field6' );
    var dNotes		= request.getParameter('custpage_field7' ); 
	var ret			= request.getParameter('custpage_field8' ); 
	var d	 		= new Date();
	var today = nlapiDateToString(d);
	var dBack = nlapiDateToString(nlapiAddDays(d,2));
		
	//nlapiLogExecution("DEBUG", "status", status); //  amount of items w matching sn
	nlapiLogExecution("DEBUG", "condition", con); //  logs ID of first record with matching sn
	nlapiLogExecution("DEBUG", "sku", sku); //  amount of items w matching sn
	
	    // create search filter
	    var searchFilters = new Array();
		searchFilters.push(new nlobjSearchFilter("custrecord1437", null, 'is', sku)); 
		
		// search for and return item with matching SN
		var searchResult = nlapiSearchRecord("customrecord812", 1068, searchFilters, null); 
		
		// get ID of item returned from search 
		results = searchResult[0].getId();
		
		// load record of item
		var orig 		= nlapiLoadRecord('customrecord812', results);
		
			// Set values for checkouts
			orig.setFieldValue('custrecord1425', 2); // set status to "out w expert"
			orig.setFieldValue('custrecord1424', employee); // set value of the expert
			orig.setFieldValue('custrecord1426', today); // sets checkout date
			orig.setFieldValue('custrecord1427', dBack); // sets checkout date 
			// Set values for returns
			if (ret == "T") {
				
				orig.setFieldValue('custrecord1425', 1); // set status to "available"
				orig.setFieldValue('custrecord1424', ''); // set value of the expert
				// create child record
				var child = nlapiCreateRecord("customrecord811");
				
				// set values for child record
				child.setFieldValue('custrecord1418', today);
				child.setFieldValue('custrecord1432', results);
				child.setFieldValue('custrecord1420', rNotes);
				child.setFieldValue('custrecord1421', dNotes);
				
				// submit child
				nlapiSubmitRecord(child, null, null);
			}
		
	// submit parent
	nlapiSubmitRecord(orig, null, null);
	
  }
}
*/

function suitelet(request, response)
{	  
  if (request.getMethod() == 'GET' )
  {
	  var formLogin = nlapiCreateForm("Suitelet - GET call" );
	    formLogin.addField('custpage_field_name', 'select', 'Employee', 'employee' );
	    formLogin.addField('custpage_field_id', 'text', 'ID' );
	    
	    var employee = nlapiGetFieldText('custpage_field_id');
	    
	    formLogin.addButton('custpage_button_login', 'Login',"window.location.href='https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=1171&deploy=1&compid=TSTDRV1345885&h=b6917ad96a098cf749d6&name=" + employee + "'");
	    formLogin.addSubmitButton('Submit' );
	     
	    response.writePage(formLogin);
  }
  
  var loginName = request.getParameter('custpage_field_name');
  var loginId	= request.getParameter('custpage_field_id');
  
	 if ((loginName !== null) & loginName == loginId)
	  {
		 var form = nlapiCreateForm("Suitelet - GET call" );
		    //form.addField('custpage_field1', 'text', 'Name' ).setDefaultValue('Product Name' );
		    form.addField('custpage_field2', 'select', 'Employee', 'employee' );
		    form.addField('custpage_field3', 'select', 'SKU', '816' );
		    form.addField('custpage_field4', 'text', 'serial num' );
		    form.addField('custpage_field5', 'select', 'Condition', '813' ).setDefaultValue(3);
		    form.addField('custpage_field6', 'longtext', 'Return Notes' );
		    form.addField('custpage_field7', 'longtext', 'Damage Notes' );
		    form.addField('custpage_field8', 'checkbox', 'RETURN' );
		    
		    form.addSubmitButton('Submit' );
		     
		    response.writePage(form);
	  }
  }
