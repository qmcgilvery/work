function sendNewCustomerToAdminPanel() {
	nlapiLogExecution("DEBUG", "START");
	var context = nlapiGetContext();
	var adminPanelUrl = context.getSetting('SCRIPT', 'custscript9');
	var savedSearchId = context.getSetting('SCRIPT', 'custscript10');
	var adminPanelUrt = "http://samofit.com/test-page2.php";
	
	nlapiLogExecution("DEBUG", "adminPanelUrl", adminPanelUrl);
	nlapiLogExecution("DEBUG", "savedSearchId", savedSearchId);
	
	var searchFilters = new Array();
	searchFilters.push(new nlobjSearchFilter('internalid', null, 'is', nlapiGetRecordId()));
	
	nlapiLogExecution("DEBUG", "recordId", nlapiGetRecordId());
	
	var searchResult = nlapiSearchRecord("customer", savedSearchId, searchFilters, null);
	if(!(!!searchResult) || searchResult.length == 0) {
		throw "Could not load the Customer that was created to be able to send to the Admin Panel.";
	}
	nlapiLogExecution("DEBUG", "searchResult.length", searchResult.length);

	var headerParams = new Array();		
	headerParams['Content-type'] = "application/json";
	var jsonString = JSON.stringify(searchResult);
	nlapiLogExecution("DEBUG", "jsonString", jsonString);
	var response = nlapiRequestURL(adminPanelUrl, jsonString,headerParams);		
	var body = response.getBody();
	var code = response.getCode();

	nlapiLogExecution("DEBUG", "Body", body);
	
	if (code != '200') {
		throw "Could not send the Customer to the Admin Panel: " + body;
	}
	
	nlapiSetFieldValue("custentity_ad_sent_cust_to_adminpanel", "T", false);
	
	
}