
function updateStatus()
{ 
var status = nlapiGetFieldText('orderstatus');

var headerParams = new Array();		
	headerParams['Content-type'] = "text/xml";
	nlapiLogExecution("DEBUG", "Status", status);
	var response = nlapiRequestURL(adminPanelUrl, status,headerParams);		
	
	var code = response.getCode();
	
	if (code != '200') {
		throw "Could not send the Customer to the Admin Panel: " + body;
	}

}

	