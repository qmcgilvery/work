function newCustomersSuitelet(request, response) {
	
	var savedSearchId = "1043";
	
	var searchResult = nlapiSearchRecord("customer", savedSearchId, null, null);
	if(!(!!searchResult) || searchResult.length == 0) {
		throw "Could not load the Customer that was created to be able to send to the Admin Panel.";
	}

	var i=0;
	for (i=0; i<=4; i++)
		   response.write(JSON.stringify(searchResult[i]));
	
	/*
	var headerParams = new Array();		
	headerParams['Content-type'] = "application/json";
	var jsonString = "name=momo&age=35";
	nlapiLogExecution("DEBUG", "jsonString", jsonString);
	nlapiRequestURL("http://samofit.com/test-page2.php", jsonString,headerParams);		
	*/
	
}

/*
function beforeLoad(type,form)
{   
	var customer = nlapiGetFieldValue('companyname');
	var email 	 = nlapiGetFieldValue('email');
	var phone	 = nlapiGetFieldValue('phone');
	
	var obj	 	 = JSON.stringify({name:customer, email:email, phonenum:phone});   
	
	nlapiLogExecution('DEBUG','Before Load'+obj);
}


function beforeSubmit(type,form)
{	
	 customer = nlapiGetFieldValue('companyname');
	 email 	 = nlapiGetFieldValue('email');
	 phone	 = nlapiGetFieldValue('phone');
	
	 obj	 	 = JSON.stringify({name:customer, email:email, phonenum:phone});   
}


function afterSubmitWF(type)
{   
	var customer = nlapiGetFieldValue('companyname');
	var email 	 = nlapiGetFieldValue('email');
	var phone	 = nlapiGetFieldValue('phone');
	var obj	 	 = JSON.stringify({name:customer, email:email, phonenum:phone});   
	return obj;
}
*/