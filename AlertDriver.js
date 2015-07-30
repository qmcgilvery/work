function afterSubmit(type)
{   	   
	var delivery    = nlapiGetFieldValue('custbody31');
	
	var login = nlapiGetRole();
	
	var obj	 	    = JSON.stringify({delivery:delivery, login:login});   
	nlapiLogExecution('DEBUG','Before Load'+obj);
	
	return delivery;
	
};