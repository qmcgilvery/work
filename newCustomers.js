
function postAdminPanel(request, response) {
	nlapiLogExecution("DEBUG", "start");
	var returnObj = {};
	returnObj.status = "success";
	var jsonString = JSON.stringify(returnObj);
	var body = request.getBody();
	nlapiLogExecution("DEBUG", "body", body);
	response.write(jsonString);
}
