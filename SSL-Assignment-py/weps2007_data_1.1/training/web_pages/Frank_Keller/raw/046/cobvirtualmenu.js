// Author: Vince Reid, vince@virtualred.net
// Copyright: Internet Business Solutions S.L.
// http://www.virtualred.net
// VirtualMenu: v1.7

 	var globalsdefined = false; 
	var ie, ns6, ns7, ns, opera, globmenuid, c1, ie5_5; 
	
	function defineglobals(){ 
		if(globalsdefined == true) return; 

		globalsdefined = true; 
		ie = document.all; 
		ns6 = document.getElementById && !document.all; 
		ns7 = navigator.userAgent.indexOf("Netscape/7") >= 0;
		ns = document.layers; 
		opera = false; 
		ie5_5 = false; 
		
		if(ie){ 	
			var agent = navigator.userAgent.toLowerCase(); 
			
			opera = (agent.indexOf("opera") != -1); 
			
			if(!opera) { 
				ie5_5=true; 
			} 
		} 
		
		globmenuid=1; 
		c1 = new Array(); 
	}; 

	function a4() { 
		if(ie||ns6) this.style.visibility = "visible"; 
		else if(ns) this.visibility = "show"; 
	}; 
	
	function a7() { 
		if(ie||ns6) this.style.visibility = "hidden"; 
		else if(ns) this.visibility = "hide"; 
	}; 
	
	function setsubmenu(themenu,mn) { 
		var offsetleft = 0; 
		
		if(ie) { 
			var mnp = mn; 
			
			do { 
				offsetleft += mnp.offsetLeft; 
				mnp = mnp.offsetParent; 
			} 
			while (mnp != null); 
			
			mnn = eval(mn.id+"sub"); 
			mnn.style.pixelTop = themenu.offsetTop + 14; 
			mnn.style.pixelLeft = offsetleft; 
			mnn.style.visibility = "hidden"; 
		} 
		
		else if(ns) { 
			mnn = eval('document.layers.'+mn.id+"sub"); 
			mnn.left = mn.pageX; 
			mnn.top = mn.pageY-3; 
			mnn.visibility = "hide"; 
		} 
		
		else if(ns6) { 
			mnn = document.getElementById(mn.id+"sub"); 
			mnn.style.top = mn.offsetTop + 14; 
			mnn.style.left = mn.offsetLeft; 
			mnn.style.visibility = "hidden"; 
		} 
		
		mnn.onmouseover=a4; 
		mnn.onmouseout=a7; 
	}; 

	function menushow(mn) { 
		if(ie||ns6) { 
			var mnp = mn; 
			var offsetleft = 0; 
			var offsettop = 0; 
			
			do { 
				offsetleft += mnp.offsetLeft; 
				offsettop += mnp.offsetTop; 
				mnp = mnp.offsetParent; 
			} 
			while (mnp != null); 
			
			//alert(offsetleft);
			
			if(ns6) mnn = document.getElementById(mn.id+'sub'); 
			else mnn = eval(mn.id+"sub"); 
			
			if(ie5_5) offsettop -= 1; 

			if(opera) { 
				mnn.style.pixelTop = offsettop + 14; 
				mnn.style.pixelLeft = offsetleft; 
			} 
			else if(ns6) { 
				mnn.style.top = offsettop + mn.offsetHeight; 
				mnn.style.left = offsetleft; 
			} 
			else { 
				mnn.style.pixelTop = offsettop + mn.offsetHeight; 
				mnn.style.pixelLeft = offsetleft; 
			} 
			
			mnn.style.visibility = "visible"; 
		} 
		else if(ns) { 
			mnn = eval(mn+'sub'); 
			mnp = eval(mn+'glob.'+mn); 
			mnn.left = mnp.pageX; 
			mnn.top = mnp.pageY-3; 
			mnn.visibility = "show"; 
		} 
		else if(ns6) { 
			mnn = document.getElementById(mn.id+'sub'); 
			mnn.style.top = mn.offsetTop + mn.offsetHeight; 
			mnn.style.left = mn.offsetLeft; 
			mnn.style.visibility="visible"; 
		} 
	}; 

	function menuhide(mn) { 
		if(ie){ 
			mnn = eval(mn.id+"sub"); 
			mnn.style.visibility="hidden"; 
		} 
		else if(ns) { 
			mnn = eval(mn+'sub'); 
			mnn.visibility="hide"; 
		}
		else if(ns6) { 
			mnn = document.getElementById(mn.id+'sub'); 
			mnn.style.visibility="hidden"; 
		} 
	}; 

	function Menu() { 
		Menu.prototype.addMenu = function addMenu(mid, mtext) { 
									if (c1[mid]) alert('Menu id '+mid+' is already defined as '+c1[mid]); 
									if (c0 == true) alert('You have to define all the main menus before defining the sub menus'); 
									
									c1[mid] = mid;
									
									if(ie) { 
										this.d8 += '<td align="'+this.maincalign+'" bgcolor="'+this.maincbgcolor+'" bordercolor="'+this.maincbordercolor+'">'; 
										this.d8 += '<div class=ddmenu id="'+mid+'" onMouseover="menushow(this)" onMouseout="menuhide(this)" STYLE="position:relative; z-index: 6">'; 
										this.d8 += '<font color="'+this.fontcolor+'" face="'+this.font+'" size="'+this.size+'">'+mtext+'</font></div></td>'; 
									} 
									else if(ns) { 
										this.d8 += '<td class=ddmenu align="left" bgcolor="'+this.maincbgcolor+'" bordercolor="'+this.maincbordercolor+'">'; 
										this.d8 += '<ilayer id="'+mid+'glob">'; 
										this.d8 += '<layer id="'+mid+'" bgcolor="'+this.maincbgcolor+'" onmouseover="menushow(\'document.layers.'+mid+'\')" onMouseout="menuhide(\'document.layers.'+mid+'\')">'; 
										this.d8 += '<font color="'+this.fontcolor+'" face="'+this.font+'" size="'+this.size+'">'+mtext+'</font></layer></ilayer></td>\n'; 
									} 
									else if(ns6) { 
										this.d8 += '<td align="'+this.maincalign+'" bgcolor="'+this.maincbgcolor+'" bordercolor="'+this.maincbordercolor+'">'; 
										this.d8 += '<div class=ddmenu id="'+mid+'" onMouseover="menushow(this)" onMouseout="menuhide(this)" STYLE="position:relative; z-index: 6">'; 
										this.d8 += '<font color="'+this.fontcolor+'" face="'+this.font+'" size="'+this.size+'">'+mtext+'</font></div></td>'; 
									} 
								};
		
		Menu.prototype.addSubMenu = function addSubMenu(mid, mtext, murl) { 
										if (c1[mid]==null) alert('The menu id ' + mid + ' is not defined'); 
										
										if(this.g4 != mid) { 
											if(this.g4 != null) { 
												if(ns) this.d7 += '</table></layer>'; 
												else this.d7 += '</table></div>'; 
											} 
											
											this.g4=mid; 
											
											if(ie) 			this.d7 += '<div id="'+mid+'sub" style="position:absolute; z-index:2; visibility: hidden; width:200; height:10;">\n'; 
											else if(ns6) 	this.d7 += '<div id="'+mid+'sub" style="position:absolute; z-index:2; visibility: hidden;">\n'; 
											else if(ns) 	this.d7 += '<layer id="'+mid+'sub" visibility="hide">&nbsp;\n'; 
											
											this.d7 += '<table border="'+this.subtborder+'" cellspacing="'+this.subtspacing+'" cellpadding="'+this.subtpadding+'" bgcolor="'+this.subtbgcolor+'">\n'; 
										} 
										
										this.d7 += '<tr><td align="'+this.subcalign+'" bgcolor="'+this.subcbgcolor+'" bordercolor="'+this.subcbordercolor+'"><font color="'+this.fontcolor+'" face="'+this.font+'" size="'+this.size+'"><img src="/clearpixel.gif" border="0" width=4 height=10><a class=ddmenu href="'+murl+'">'+mtext+'</a>&nbsp;</font></td></tr>\n'; 
									}; 
		
		Menu.prototype.startMenu = function startMenu() { 
										if(opera) this.d8 += '<div id="vrmenu'+globmenuid+'" STYLE="position:relative">\n'; 
										else if(ie) this.d8 += '<div id="vrmenu'+globmenuid+'" STYLE="position:absolute; width:100; height:10;">\n'; 
										else if(ns6) this.d8 += '<div id="vrmenu'+globmenuid+'" STYLE="position:relative;">\n'; 
										
										this.d8 += '<table border="'+this.maintborder+'" cellspacing="'+this.maintspacing+'" cellpadding="'+this.maintpadding+'" bgcolor="'+this.maintbgcolor+'"><tr>\n'; 
									}; 
									
		Menu.prototype.showMainMenu = function showMainMenu() { 
											if(ie||ns6) this.d8 += '</tr></table></div>'; 
											else if(ns) this.d8 += '</tr></table></layer>';
											document.write(this.d8); 
										}; 
		
		Menu.prototype.showMenu = function showMenu() { 
										if(ie) this.d7 += '</table></div>&nbsp;'; 
										else if(ns6) this.d7 += '</table></div>'; 
										else if(ns) this.d7 += '</table></layer>'; 
										
										document.write(this.d7); 
										
										for(men in c1) { 
											if(c1[men]!=1) { 
												if(ie) setsubmenu(eval('document.all.vrmenu'+globmenuid),eval(document.all[men])); 
												else if(ns) setsubmenu(eval('document.layers.'+men+'glob'),eval('document.'+men+'glob.document.'+men)); 
												else if(ns6) setsubmenu(eval(document.getElementById('vrmenu'+globmenuid)),eval(document.getElementById(men))); 
												
												c1[men]=1; 
											} 
										} 
										
										globmenuid++; 
									}; 
		
		Menu.prototype.maintableprops = function(bgcolor,spacing,padding,border) { 
											this.maintbgcolor = bgcolor; 
											this.maintspacing = spacing; 
											this.maintpadding = padding; 
											this.maintborder = border; 
										};
										
		Menu.prototype.maincellprops = function maincellprops(align,bgcolor,bordercolor) { 
											this.maincalign = align; 
											this.maincbgcolor = bgcolor; 
											this.maincbordercolor = bordercolor; 
										}; 
		
		Menu.prototype.subtableprops = function subtableprops(bgcolor,spacing,padding,border) { 
											this.subtbgcolor = bgcolor; 
											this.subtspacing = spacing;
											this.subtpadding = padding; 
											this.subtborder = border; 
										}; 
		
		Menu.prototype.subcellprops = function subcellprops(align,bgcolor,bordercolor) { 
											this.subcalign = align;
											this.subcbgcolor = bgcolor; 
											this.subcbordercolor = bordercolor; 
										}; 
		
		Menu.prototype.fontdetails = function fontdetails(font,size,color) { 
											this.font = font; 
											this.size = size; 
											this.fontcolor = color; 
										}; 
		
		defineglobals(); 
		
		//defines colour of main table border and positioning
		this.maintableprops("#ffffff",0,0,0)
		//defines colour of main cells and positioning
		this.maincellprops("left","#999933","#000000")
		//defines colour of sub table cell borders and positioning
		this.subtableprops("#000000",1,3,0)
		//defines colour of sub cells and positioning
		this.subcellprops("left","#999933","#999933")
		//defines font type, size and colour
		this.fontdetails("Verdana",1,"#000000")
		
		this.g4 = null; 
		this.d8 = ""; 
		this.d7 = "";
		c0 = false; 
		c1['vrmenu'+globmenuid] = 1; 
	}; 
	
	function rollOn(num) {
		document.images["roll" + num].src = "/resources/images/arrow.gif";
	}
	
	function rollOff(num) {
		document.images["roll" + num].src = "/clearpixel.gif";
	}
	
		function rollOnDistSpkrs(num) {
		document.images["roll" + num].src = "/resources/images/DistSpkrs_arrowon.gif";
	}
	
	function rollOffDistSpkrs(num) {
		document.images["roll" + num].src = "/resources/images/DistSpkrs_arrowoff.gif";
	}