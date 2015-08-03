/**
 * Module Description
 * 
 * Version    Date            Author           Remarks
 * 1.00       31 Jul 2015     quentin
 *
 */

/**
 * The recordType (internal id) corresponds to the "Applied To" record in your script deployment. 
 * @appliedtorecord recordType 
 * 
 * @param {String} type Access mode: create, copy, edit
 * @returns {Void}
 */
function clientPageInit(type){
   
}
function fieldChange(type, name)
{
	//  Prompt for additional information,  based on values already selected. 
	if (nlapiGetFieldValue('custpage_field5') < '3') 
	{
		alert('Fill out Damage report!!!');
	}
}
/*
function onSave()
{
// access the NetSuite server to instantiate a new Estimate
var rec = nlapiCreateRecord('estimate');  rec.setFieldValue('entity','846');
rec.insertLineItem('item',1);
rec.setLineItemValue('item','item', 1, '30');
rec.setLineItemValue('item','quantity', 1, '500');

var id = nlapiSubmitRecord(rec, true);

return true;
}

function postSourcing(type, name)
{
 // Execute this code when all the fields from item are sourced on the sales order.
	 var searchFilters = new Array();
		searchFilters.push(new nlobjSearchFilter("custrecord1431", null, 'is', sn)); 
		// search for and return item with matching SN
		var searchResult = nlapiSearchRecord("customrecord812", 1068, searchFilters, null); 
 
  if(type =='item' && name =='item')
  {
    // Once all the fields from item are sourced
	  nlapiLoadRecord(String, Number, Object)
	  nlapiGetFieldValue(String)
    var rate = nlapiGetCurrentLineItemValue('item', 'rate');
    var line = nlapiGetCurrentLineItemIndex(type);
 
    if(rate < 10)
    {
        nlapiSetCurrentLineItemValue('item', 'rate', 20);
    }
  }
}
*/