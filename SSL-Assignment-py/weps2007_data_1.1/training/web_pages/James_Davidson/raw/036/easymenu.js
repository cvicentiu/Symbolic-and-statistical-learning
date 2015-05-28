
function showMenu(item)
{
	//item.childNodes[0].style.display = "inline";

	var i = item.childNodes[1];
	
	i.style.display = "block";
	i.style.zIndex = "1000";

	var shim = document.createElement('iframe');
	//shim.setAttribute('id','easymenu_shim');
	shim.setAttribute('name','easymenu_shim');
	var oH = i.offsetHeight;
	var oW = i.offsetWidth;
	if(oH == 0 )
	{
		oH = "25px";
	}
	if(oW == 0)
	{
		oW = "120px";	
	}
	shim.setAttribute('height',i.offsetHeight);
	shim.setAttribute('width',i.offsetWidth);
	shim.setAttribute('position','absolute');

	shim.setAttribute('z-index',1000);
	shim.setAttribute('src','about:blank');
	shim.setAttribute('frameborder','no');
	shim.setAttribute('scroll','no');
	shim.style.position="absolute";
	item.appendChild(shim);
}

function hideMenu(item)
{
	//item.childNodes[0].style.display = "none";
	
	var cMenu = document.getElementById("EasyMenuContext");
	
	if(cMenu==null)
	{
		item.childNodes[1].style.display = "none";
		
		if(item.lastChild.tagName == 'IFRAME')
			item.removeChild(item.lastChild);	
	}
}



function showDrag(item)
{
	item.childNodes[0].style.display = "inline";

}

function hideDrag(item)
{
	item.childNodes[0].style.display = "none";

}

