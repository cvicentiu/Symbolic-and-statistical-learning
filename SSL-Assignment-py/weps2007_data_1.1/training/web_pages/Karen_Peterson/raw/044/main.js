var gtimer;
		function GShow() {
			if(glayer) {
				if(gtimer) clearTimeout(gtimer);
				for(gmenu=0; gmenu<GLayer.length; gmenu++) { 
					if(GLayer[gmenu]) {
						eval(glayer).visibility = "hidden"; 
					}
				}
				for(i=0; i<arguments.length; i++) {
					gmenu=arguments[i];
					eval(glayer).visibility = "visible";
				}
			} 	
		}
		function GHide() {
			gtimer = setTimeout("GShow()", 200);
		}
		
	
	//Sniff for the browser
var bwr = navigator.appName;
var agt = navigator.userAgent.toLowerCase(); 


	No3 = (parseInt(navigator.appVersion) > 3) ? 1:0;
		
		
glayer = (document.all && No3) ? "document.all['GL'+gmenu].style" : (document.layers && No3) ? "document.layers['GL'+gmenu]" : (!document.all && document.getElementById && No3) ? "document.getElementById('GL'+gmenu).style" : 0;


		isNS4 = (document.layers && No3) ? 1:0;
		isIE = (document.all && No3) ? 1:0;
		isNS6 = (!document.all && document.getElementById && No3) ? 1:0;
		is_win = (agt.indexOf("win")!=-1);
		is_mac = (agt.indexOf("mac")!=-1);
		

			hovercolor   = "#EFEFEF";	
			bgcolor      = "#E2E2E2";	
			background   = "";			
			menu_border  = 0;			
			border_color = "#666666";	
	
			
			
			function GLayerSpecs(Left,Top,Width,Level) {
				if(No3){
						if ((document.all) && (is_win)) {
						Left+=8;
						Top+=5;
						Width-=6;
					}
					else if ((document.all) && (is_mac)) {
						Left+=0;
						Top+=-35;
						Width-=0;
						}
						else if (!document.all && document.getElementById) {
						Left+=0;
						Top+=4;
						Width-=6;
						}
					
					else if ((document.layers) && (is_mac)) {
						Left+=0;
						Top+=-9;
						Width-=0;
						}
					
					else if ((document.layers) && (is_win)) {
						Left+=0;
						Top+=0;
						Width-=0;
						}
						
					
					this.left  = Left;
					this.top   = Top;
					this.info  = "";
					T=0;
					m=1;	
					
					
					for(i=4; i<arguments.length; i++) {
        		if ((document.all)||(!document.all && document.getElementById && No3))
							this.info += "<TR><TD bgcolor='E2E2E2' Height='23' WIDTH='"+Width+"' onMouseOver='this.bgColor=\""+hovercolor+"\"' onMouseOut='this.bgColor=\"\"'>"+arguments[i]+"</TD></TR>";
						else
							this.info += "<LAYER bgcolor='E2E2E2' Height='23' onMouseOver='this.bgColor=\""+hovercolor+"\"' onMouseOut='this.bgColor=\""+bgcolor+"\"' WIDTH='"+Width+"' POSITION='RELATIVE' TOP='"+T+"'>&nbsp;"+arguments[i]+"</LAYER>";
						T+=23;
						m+=1;
					}
				}
			}

			
// On each layer, adjust the coordinates within "LayerSpecs" to position  the dropdown
// put in the anchors you want, and their corresponding text
// set the text styles with your style sheet
// LayerSpec(left, top, width)
//If browser is IE then set the following variables
						

			
GLayer = new Array();

///////////////  M E N U  ///////////////////

// Blank box for Athletics -- has no dropdown; x=2000 puts divved black box off screen





//undergrad progs
//GLayer[1] = new GLayerSpecs(12,45,120,
GLayer[1] = new GLayerSpecs(12,55,300,
'&nbsp;&nbsp;',
'<a href="http://www.scu.edu/cas/" onMouseOver="GShow(1)" class="DropDown">&nbsp;&nbsp;College of Arts &amp; Sciences</a>',
'<a href="http://www.scu.edu/business/" onMouseOver="GShow(1)" class="DropDown">&nbsp;&nbsp;Leavey School of Business</a>',
'<a href="http://www.scu.edu/engineering/" onMouseOver="GShow(1)" class="DropDown">&nbsp;&nbsp;School of Engineering</a>');

// Grad Progs
//GLayer[2] = new GLayerSpecs(134,45,250,
GLayer[2] = new GLayerSpecs(124,55,400,
'&nbsp;&nbsp;',
'<a href="http://www.scu.edu/business/" onMouseOver="GShow(2)" class="DropDown">&nbsp;&nbsp;Leavey School of Business</a>',
'<a href="http://www.scu.edu/engineering/" onMouseOver="GShow(2)" class="DropDown">&nbsp;&nbsp;School of Engineering</a>',
'<a href="http://www.scu.edu/ecppm/" onMouseOver="GShow(2)" class="DropDown">&nbsp;&nbsp;School of Education, Counseling Psychology &amp;  Pastoral Ministries</a>',
'<a href="http://www.scu.edu/law" onMouseOver="GShow(2)" class="DropDown">&nbsp;&nbsp;School of Law</a>');

//Ctrs of Distinction -- not used yet
//GLayer[3] = new GLayerSpecs(380,45,240,
GLayer[3] = new GLayerSpecs(340,55,350,
'&nbsp;&nbsp;',
'<a href="http://www.scu.edu/arrupe/" onMouseOver="GShow(3)" class="DropDown">&nbsp;&nbsp;Pedro Arrupe, S.J., Center for Community-Based Learning</a>',
'<a href="http://www.scu.edu/bannancenter/" onMouseOver="GShow(3)" class="DropDown">&nbsp;&nbsp;Bannan Center for Jesuit Education</a>',
'<a href="http://www.scu.edu/sts/" onMouseOver="GShow(3)" class="DropDown">&nbsp;&nbsp;Center for Science, Technology &amp; Society</a>',
'<a href="http://www.scu.edu/ethics/" onMouseOver="GShow(3)" class="DropDown">&nbsp;&nbsp;Markkula Center for Applied Ethics</a>',
'<a href="http://www.scu.edu/centers/" onMouseOver="GShow(3)" class="DropDown">&nbsp;&nbsp;Other Centers &amp; Institutes</a>');

j = (GLayer[0]) ? 0:1;
			for(i=j; i<GLayer.length; i++) {
				if ((document.all)||(!document.all && document.getElementById && No3))
					document.write("<DIV bgcolor='#E2E2E2' onMouseOver='clearTimeout(gtimer)' onMouseOut='GHide("+i+")' ID='GL"+i+"' STYLE='position:absolute; visibility:hidden;top:"+GLayer[i].top+"; left:"+GLayer[i].left+";'><TABLE bgcolor='#E2E2E2' CELLPADDING='0' CELLSPACING='0'>"+GLayer[i].info+"</TABLE></DIV>");
				else if(document.layers && No3) 
					document.write("<LAYER bgcolor='#E2E2E2' onMouseOver='clearTimeout(gtimer)' onMouseOut='GHide("+i+")' ID='GL"+i+"' POSITION='ABSOLUTE' VISIBILITY='HIDDEN' "+" BACKGROUND='"+background+"' TOP='"+GLayer[i].top+"' LEFT='"+GLayer[i].left+"'>"+GLayer[i].info+"</LAYER>");	
			}

