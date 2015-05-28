function refreshBannerGroup(group_id)
{
	eval('if(typeof (rotateBannerTimeout_' + group_id + ') != \'undefined\'){ window.clearTimeout(rotateBannerTimeout_' + group_id + ')}');
	
	var rpcclient = new xmlrpc_client('xmlremote', document.location.hostname);
	//rpcclient.debug = true;  
	
	rpcclient.addParam(group_id);
	//send to server for saving
	rpcclient.call('banner.loadBannerGroup', finishSavingBanner);	
}
function finishSavingBanner(returnValue)
{
	var newGroup = returnValue[0];
	var bannerGroupID = returnValue[1];
		
	var oldGroup = document.getElementById("bannergroup_"+bannerGroupID);
	oldGroup.parentNode.innerHTML = newGroup;	
		
	var js = document.getElementById("bannerscript_"+bannerGroupID).innerHTML;
	if(typeof(js) != 'undefined')
		eval(js);

}
function showBanner(element)
{
    for (var i = 0; i < arguments.length; i++) 
    {
		var element = $(arguments[i]);
		element.style.display = 'block';
    }	 
}
function fadeOutBanner(element)
{
	var elem_id = (element.id.substr(7));
	var oldOpacity = Element.getInlineOpacity(element);
	var options = Object.extend({
	from: Element.getOpacity(element) || 1.0,
	to:   0.0,
	afterFinishInternal: function(effect) { with(Element) { 
		if(effect.options.to!=0) return;
		hide(effect.element);
		setStyle(effect.element, {opacity: oldOpacity}); }}
	}, arguments[1] || {});
	return new Effect.Opacity(element,options);
}

function fadeInBanner(element, ieOffset)
{
	var elem_id = (element.id.substr(7));
	if(document.all && ieOffset > 0)
	{
		//element.style.marginLeft = "-"+ieOffset+"px";
	}
	var options = Object.extend({
	from: (Element.getStyle(element, 'display') == 'none' ? 0.0 : Element.getOpacity(element) || 0.0),
	to:   1.0,
	beforeSetup: function(effect) { with(Element) {
		setOpacity(effect.element, effect.options.from);
		showBanner(effect.element);}}
	}, arguments[1] || {});
	return new Effect.Opacity(element,options);
}
function preloadBanner(id, path)
{
	var img = $('img-'+id);
	if(typeof(img) != 'undefined' && (img.tagName == 'IMG' || img.tagName=='EMBED'))
	{
		img.src = path;
	}
}