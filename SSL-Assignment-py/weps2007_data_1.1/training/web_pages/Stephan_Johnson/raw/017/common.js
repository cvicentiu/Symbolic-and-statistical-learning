function commonObject()
{

	this.hiddenHref = function(l_url, l_args)
	{
		var f = document.createElement('FORM');
		f.className='invisible'; 
		f.method='post'; 
		document.body.appendChild(f);

		argsArray = l_args.split("&");
		for (var a=0; a<argsArray.length; a++)
		{
			vars = argsArray[a].split("=");
			var h=document.createElement('INPUT');
			h.type='hidden';
			h.name=vars[0];
			h.value=vars[1];
			f.appendChild(h);
		}
		f.action=l_url;
		f.submit();

	};

	this.include = function(js)
	{
		document.write("<" + "script src=\"/scripts/" + js + "\"></" + "script>");
	};

}

var COMMON = new commonObject;

var r1 = new Array();
var r2 = new Array();
var r3 = new Array();