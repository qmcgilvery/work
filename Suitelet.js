
/**
 * @param {nlobjRequest} request Request object
 * @param {nlobjResponse} response Response object
 * @returns {Void} Any output is written via response object
 *

*/

function suitelet(request, response)
{	  
	if (request.getMethod() == 'GET' ) // present user with login screen
	{
		var formLogin = nlapiCreateForm("Suitelet - GET call" );	    
		
		formLogin.addField('custpage_field_name', 'select', 'Employee', 'employee' );
		formLogin.addField('custpage_field_id', 'text', 'ID' );
		formLogin.addField('custpage_field_returns', 'checkbox', 'RETURN' );	    
		formLogin.addSubmitButton('Submit' );
	     
		response.writePage(formLogin);
	}
	 var loginName  = request.getParameter('custpage_field_name');
	 var loginId	= request.getParameter('custpage_field_id'); 
	 var returns	= request.getParameter('custpage_field_returns'); 
	 
	 if ((loginName !== null) & loginName == loginId) // checkout form
	 {
		var form = nlapiCreateForm("Suitelet - GET call" );

		form.addField('custpage_field2', 'select', 'Employee', 'employee' ).setDefaultValue(loginName);
	    form.addField('custpage_field3', 'select', 'SKU', '816' );
	    
		    var searchColumns = new Array();
		    searchColumns[0] = new nlobjSearchColumn("internalid"); 
		    searchColumns[1] = new nlobjSearchColumn("name"); 
		    var searchResults = nlapiSearchRecord("customrecord812", "customsearch1070", null, searchColumns);
		    var LeadsTab = form.addTab('custpage_leads_tab', 'SampleTab');
		    var addthefield = form.addField('custpage_select_device', 'select', 'Select Device', null);
		    
		    for (var i = 0; searchResults != null && i < searchResults.length; i++) 
		    {
		    var id = searchResults[i].getId();
		    var name = searchResults[i].getValue('name');
		    addthefield.addSelectOption(id,name);
		    }
		   
		form.setScript('customscript1174');
	    form.addSubmitButton('Submit' );
	    
	    response.writePage(form);
	  }
	 
	 if ((loginName !== null) & loginName == loginId && returns == "T") // return form
	 {
		 
		var form = nlapiCreateForm("Suitelet - GET call" );
	    form.addField('custpage_field2', 'select', 'Employee', 'employee' ).setDefaultValue(loginName);
	    form.addField('custpage_field3', 'select', 'SKU', '816' ); 
	    form.addField('custpage_field5', 'select', 'Condition', '813' ).setDefaultValue(3);
	    form.addField('custpage_field6', 'longtext', 'Return Notes' );
	    form.addField('custpage_field7', 'longtext', 'Damage Notes' );
	    form.addField('custpage_field8', 'checkbox', 'RETURN' );
    
	    form.setScript('customscript1174');
	    form.addSubmitButton('Submit' );
	    
	    response.writePage(form);
	  }
	 
	
	 var device	  	= request.getParameter('custpage_field3');
	 if (device !== null) // process return/checkout form
	 {
	    // store values from form 
	    var employee 	= request.getParameter('custpage_field2' );
	    var sku 		= request.getParameter('custpage_field3' );
	    var con			= request.getParameter('custpage_field5' );
	    var rNotes		= request.getParameter('custpage_field6' );
	    var dNotes		= request.getParameter('custpage_field7' ); 
		var ret			= request.getParameter('custpage_field8' ); 
		
		var d	 		= new Date();
		var today = nlapiDateToString(d);
		var dBack = nlapiDateToString(nlapiAddDays(d,2));
			
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
