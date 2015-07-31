
function beforeLoad(type,form)
{   
	
	nlapiLogExecution("DEBUG", "START");
	var adminPanelUrl 		= "http://samofit.com/test-page.html";
	var orderText			= nlapiGetFieldText('createdfrom');
	var orderValue 			= nlapiGetFieldValue('createdfrom');
	var obj	 	    		= JSON.stringify({ordertext:orderText, ordervalue:orderValue});   
	
	nlapiLogExecution('DEBUG','Before Load'+obj);
	nlapiLogExecution("DEBUG", "adminPanelUrl", adminPanelUrl);
	
	var headerParams = new Array();		
	headerParams['Content-type'] = "application/json";
	nlapiLogExecution("DEBUG", "values", obj);
	var response = nlapiRequestURL(adminPanelUrl, obj, headerParams);		
	var body = response.getBody();
	var code = response.getCode();

	nlapiLogExecution("DEBUG", "Body", body);
	
	if (code != '200') {
		throw "Could not send the Customer to the Admin Panel: " + body;
	}
	
	nlapiSetFieldValue("custentity_ad_sent_cust_to_adminpanel", "T", false);
}	
	
	/*
	var adminPanelUrl = "http://samofit.com/test-page.html";
	var response = nlapiRequestURL(adminPanelUrl);
		var html = '<html><body><h1>Hello World</h1></body></html>'; 
		response.write(html);
	
	var orderText			= nlapiGetFieldText('createdfrom');
	var orderValue 			= nlapiGetFieldValue('createdfrom');
	var trackingText    	= nlapiGetFieldText('packagetrackingnumber');
	var trackingValue    	= nlapiGetFieldValue('packagetrackingnumber');
	var obj	 	    	= JSON.stringify({ordertext:orderText, ordervalue:orderValue, trackingvalue:trackingValue, trackingtext:trackingText});   
	nlapiLogExecution('DEBUG','Before Load'+obj);
	
	var adminPanelUrl = "http://samofit.com/test-page.html";
		  var headerParams = new Array();		
			headerParams['Content-type'] = "application/json";
			var response = nlapiRequestURL(adminPanelUrl, obj, headerParams);	
			
			var body = response.getBody();
			
			nlapiLogExecution("DEBUG", "Body", body);	
			nlapiLogExecution("DEBUG", "Response", response);	
	
}

function beforeSubmit(type)
{   	   
	var orderText			= nlapiGetFieldText('createdfrom');
	var orderValue 			= nlapiGetFieldValue('createdfrom');
	var trackingText    	= nlapiGetFieldText('packagetrackingnumber');
	var trackingValue    	= nlapiGetFieldValue('packagetrackingnumber');
	var obj	 	    	= JSON.stringify({ordertext:orderText, ordervalue:orderValue, trackingvalue:trackingValue, trackingtext:trackingText});   
	nlapiLogExecution('DEBUG','Before Load'+obj);
	
}



function afterSubmit(type)
{   	   
	var order 		= nlapiGetFieldValue('createdfrom');
	var tracking    = nlapiGetFieldValue('packagetrackingnumberfedex');
	var obj	 	    = JSON.stringify({ordernum:order, trackingnum:tracking});   
	nlapiLogExecution('DEBUG','Before Load'+obj);
}
*/
