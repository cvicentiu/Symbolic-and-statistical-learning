No3 = (parseInt(navigator.appVersion) > 3) ? 1:0;
NS6 = (!document.all && document.getElementById) ? 1 : 0;
if (navigator.userAgent == "Mozilla/4.0 (compatible; MSIE 4.5; Mac_PowerPC)") { No3 = 0; }
layer = (document.all && No3) ? "document.all['L'+menu].style" : (document.layers && No3) ? "document.layers['L'+menu]" : 0;

if (NS6) {layer = "document.getElementById('L'+menu).style"};
//alert(layer)

var timer;

function Show() { if(layer) {
	//alert(NS6)
	if(timer) clearTimeout(timer);
	for(menu=0; menu<Layer.length; menu++) { if(Layer[menu]) { eval(layer).visibility = "hidden"; } }
	for(i=0; i<arguments.length; i++) { 
		menu=arguments[i]; 
		//alert(menu)
		if (Layer[menu]) {eval(layer).visibility = "visible";} 
	}
	
} }

function Hide() { timer = setTimeout("Show()", 300); }



//////////////////////////////////////////////////////

	hovercolor1   = "#CC0000";	// color name/code 1 
	bgcolor1      = "#333399";	// color name/code 1 
	hovercolor2   = "#CC0000";	// color name/code 2
	bgcolor2	  = "#333399";  // color name/code 2
	hovercolor3   = "#CC0000";	// color name/code 2
	bgcolor3	  = "#333399";  // color name/code 2
	menu_border   = 1;	// IE only
	border_color  = "#000000";	// IE only
	arrow_pic     = "/images/arrow_green.gif"; // url of arrow picture for submenus
	arrow         = "  <IMG SRC='"+arrow_pic+"' BORDER=0 ALT=''>";
//////////////////////////////////////////////////////


function LayerSpecs(Colors,Left,Top,Width,ID) { if(No3 || NS6) {
	
	hovercolor = eval("hovercolor" + Colors)
	bgcolor = eval("bgcolor" + Colors)
	background = bgcolor	// I took out the ability for a bg graphic cuz we wont need it
	this.background = background
	this.bgcolor = bgcolor
	
	if((!document.all) || NS6) { 
		this.left = Left-2;
		this.top = Top-7;
	}
	else {
	   this.left  = Left;
	   this.top   = Top;
	}
	if (NS6 || document.layers) {
	   this.left  = Left;
	   this.top   = Top;
	}
	this.info  = "";
	if (ID.indexOf("|") > -1) {
		ID = ID.replace("|",",")
		
	}	
	T=0;
	for(i=5; i<arguments.length; i++) {
		var arg, arg_arr, thishref, thisname
		arg = arguments[i]
		arg_arr = arg.split("|^|");
		thishref = arg_arr[0]
		thisname = arg_arr[1]
		submenu = arg_arr[2]
		thisstyle = arg_arr[3]
		if (!thisstyle) {thisstyle = ""}
		if(document.all || NS6) { 
			this.info += "<TR><TD style='cursor:hand' class=menunav"+thisstyle+" WIDTH="+Width
			this.info += " onClick='window.location.href=\"" + thishref + "\"'"
			this.info += " onMouseOver='this.bgColor=\""+hovercolor+"\";"
			if (submenu) { this.info += submenu } else { this.info += "Show(" + ID + ");" }
			this.info += "'"
			this.info += " onMouseOut='this.bgColor=\"\";"
			//if (submenu) { this.info += submenu }
			this.info += "'"
			this.info += ">&nbsp;<a href=\""+thishref+"\" class=menunav"+thisstyle+">" + thisname + "</a></TD></TR>"; }
		else { this.info += "<LAYER onClick='window.location.href=\"" + thishref + "\"'"
			this.info += " onMouseOver='this.bgColor=\""+hovercolor+"\";"
			if (submenu) { this.info += submenu }
			this.info += "'"
			this.info += " onMouseOut='this.bgColor=\""+bgcolor+"\"' WIDTH="+Width+" POSITION=RELATIVE TOP="+T+">&nbsp;&nbsp;<a href=\""+thishref+"\" class=menunav"+thisstyle+">" + thisname + "</a></LAYER>"; }
		T+=20;
	}
	
} 
}

Layer = new Array();

