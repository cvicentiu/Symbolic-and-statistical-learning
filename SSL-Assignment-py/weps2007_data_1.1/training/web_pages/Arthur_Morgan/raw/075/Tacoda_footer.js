/*Aggregate Knowledge Test - 2.15.07*/

		var metas = document.getElementsByTagName("META");

		for (i = 0; i < metas.length; i++) {
	
		if (metas[i].name == "headline") { var writehead = metas[i].content }
		if (metas[i].name == "syndicate") { var writesynd = metas[i].content }
			
			}
			
/*RecEngine-0D56B322-C5A9-C6E4-E8BC-1244BD9CB207*/


document.write('<a id = "akAPI"><\/a>');

var akApiKey = "RecEngine-0D56B322-C5A9-C6E4-E8BC-1244BD9CB207";
var akTarget = window.top.location.toString();
var akTargetType = "NEWS";
var akTargetDesc = (!akTargetDesc)?"headline not avialable":writehead; 
var akResultsTitle=(!akResultsTitle)?"syndicate not available":writesynd;
var akMaxNum = "4";

var akScript = document.createElement('script'); 
akScript.setAttribute('src','http://api.aggregateknowledge.com/2007/01/15/js/' + (new Date()).valueOf() % 3600000 + '.js');
document.getElementsByTagName('head')[0].appendChild(akScript); 

/* tacoda footer voided 01.31.07, original content backed at /common_scripts/Tacoda.old/Tacoda_footer.v4.js */

/* iCrossing tracking code : added 4/4/06 */

var io = new Image();
var pageAction, sale, price, sku, order_code, currency_id, user_defined1, user_defined2, user_defined3, urlA, prefix;
function pixel()
{
	var icstring ="://www.ic-live.com/goat.php?cID=1161&cdid=2681&campID=8";
	var refVar = (document.referrer);
	var locURL = location.href;
	var locHttp = locURL.split(":")[0];

	if (!pageAction) { pageAction = 0; };
	if (!sale) { sale=""; }
	if (!price) { price=""; }
	if (!sku) { sku=""; }
	if (!order_code) { order_code=""; }
	if (!user_defined1) { user_defined1=""; }
	if (!user_defined2) { user_defined2=""; }
if (!user_defined3) { user_defined3=""; }
	if (!currency_id) { currency_id=""; }
	if (locHttp.toLowerCase( ) == "https")  { prefix="https"+icstring+"";}
	if (locHttp.toLowerCase( ) == "http")  { prefix="http"+icstring+"";}

	if (pageAction > 0) {
		urlA = prefix+"&convID="+pageAction+"&sl="+sale+"&convP="+price+"&curID="+currency_id+"&ordID="+escape(order_code)+"&ud1="+escape(user_defined1)+"&ud2="+escape(user_defined2)+"&ud3="+escape(user_defined3)+"&sku="+escape(sku)+"&refVar="+escape(refVar);
	} else {
		urlA = prefix+"&refVar="+escape(refVar);
	}	
	io.src = urlA;
}
pixel();