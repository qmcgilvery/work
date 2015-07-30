function alertUser()
{
	var user = nlapiGetContext();
	var iser = user.getName();
	alert (iser);
	if (nlapiGetFieldValue('custrecord_address').length == 0);
	{
		nlapiSetFieldValue('custrecord_address', 'Hi');
	}
	
};
function consoleUser()
{
	
	if (nlapiGetFieldValue('custrecord_wc_address').length == 0);
	{
		nlapiSetFieldValue('custrecord_wc_address', 'Hideho');
	}
}

function isSeismograph()
{
	
	if(nlapiGetLineItemText("item","item", 1) == "SEI00001")	{ 
		nlapiSetFieldValue('custbody_isseismograph', "T");
	}
}

function seismograph()
{
	nlapiSetFieldText('MEMO', 'Original values');
}



/*
 if (nlapiGetFieldValue('itemid').length == 0);
	{
 */


