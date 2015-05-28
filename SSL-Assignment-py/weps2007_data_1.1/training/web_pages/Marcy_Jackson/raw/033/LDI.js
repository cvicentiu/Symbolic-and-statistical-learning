// Repository for Leadership Directories Javascript Functions

//function addProductToCart(prodID) {
//	var curCookie = "Cart" + prodID + "=" + prodID;
//	document.cookie = curCookie;
//	document.location=
//}
//
//
//
function LDIgetMonthName(MonthNumber) {
	switch(MonthNumber){
		case 0:
			return "January";
			break;
		case 1:
			return "February";
			break;
		case 2:
			return "March";
			break;
		case 3:
			return "April";
			break;
		case 4:
			return "May";
			break;
		case 5:
			return "June";
			break;
		case 6:
			return "July";
			break;
		case 7:
			return "August";
			break;
		case 8:
			return "September";
			break;
		case 9:
			return "October";
			break;
		case 10:
			return "November";
			break;
		case 11:
			return "December";
			break;
		}
	}
function LDIgetDayName(DayNumber){
	switch(DayNumber){
		case 0:
			return "Sunday";
			break;
		case 1:
			return "Monday";
			break;
		case 2:
			return "Tuesday";
			break;
		case 3:
			return "Wednesday";
			break;
		case 4:
			return "Thursday";
			break;
		case 5:
			return "Friday";
			break;
		case 6:
			return "Saturday";
			break;
		}
	}
//
// LLOI login
//
function LLOIlogin(Remember, U,  P){
	if(document.getElementById(Remember).checked){
		var ed=new Date();
		ed.setDate(ed.getDate()+15);
		document.cookie="BvD="+"UID-"+escape(document.getElementById(U).value)+"-"+"PID-"+escape(document.getElementById(P).value)+";expires="+ed.toGMTString()+";"+"path=/";
		document.getElementById("pnlLLOIlogin").style.display="none";
		location.href="http://ldi.bvdep.com/validate.asp?Username="+document.getElementById(U).value+"&Password="+document.getElementById(P).value;
	}else{
		document.login.submit();
	};
}
function LLOIhidelogin(){}
function xLLOIhidelogin(){
	var strCookie=""+document.cookie;
	if (strCookie.indexOf("BvD")>-1){
		document.getElementById("pnlLLOIlogin").height=0;
		document.getElementById("pnlLLOIlogin").style.display="none";
		if (strCookie.indexOf(";",strCookie.indexOf("BvD"))==-1){
			strCookie=unescape(strCookie.substring(strCookie.indexOf("BvD")+4));
		}
		else{
			strCookie=unescape(strCookie.substring(strCookie.indexOf("BvD")+4,strCookie.indexOf(";",strCookie.indexOf("BvD"))));
		};
		var str = new Array();
		str = strCookie.split("-");
		document.getElementById("btnEnterLLOI").onclick = function(){location.href="http://ldi.bvdep.com/validate.asp?Username=" + str[1] + "+&Password=" + str[3]};
	}
}
//
//
function BounceButton(id, callingbutton, custID) {
	obj=document.getElementsByTagName("input");
	for (i=0;i<obj.length;i++) {
		if (obj[i].name.indexOf(id)>=0) {
			if (obj[i].type=="radio") {
				if (obj[i].value != callingbutton) {
					obj[i].checked=false;
				}
			}
			if (obj[i].type=="hidden") {
				obj[i].value=custID;
			}
		}
	}
}
function addProductToCartFull() {
	if (addProductToCart.arguments.length==1){
	var strCookie = "Cart" + prodID + "=default-1-" + prodID + "-default-default; path=/";
	}
	else if (addProductToCart.arguments.length==2){
	var strCookie = "Cart" + prodID + "=default-1-" + prodID + "-" +addProductToCart.arguments[1] + "-default; path=/";
	}
	else if (addProductToCart.arguments.length==3){
	var strCookie = "Cart" + prodID + "=default-1-" + prodID + "-" +addProductToCart.arguments[1] + "-" +addProductToCart.arguments[2] + "; path=/";
	}
	document.cookie = strCookie;
	location.href='https://www.leadershipdirectories.com/order/cart.aspx?s=3&FromPage=' + location.pathname;
}	
function addProductToCart(prodID) {
	if (addProductToCart.arguments.length==1){
	var strCookie = "Cart" + prodID + "=default-1-" + prodID + "-default-default; path=/";
	}
	else if (addProductToCart.arguments.length==2){
	var strCookie = "Cart" + prodID + "=default-1-" + prodID + "-" +addProductToCart.arguments[1] + "-default; path=/";
	}
	else if (addProductToCart.arguments.length==3){
	var strCookie = "Cart" + prodID + "=default-1-" + prodID + "-" +addProductToCart.arguments[1] + "-" +addProductToCart.arguments[2] + "; path=/";
	}
	document.cookie = strCookie;
	location.href='https://www.leadershipdirectories.com/order/cart.aspx?s=3&FromPage=' + location.pathname;
	//location.href='../order/cart.aspx?s=3&FromPage=' + location.pathname;
}	
function addProductToCart_OLD(prodID) {
	var strCookie = "Cart" + prodID + "=" + prodID + "; path=/";
	document.cookie = strCookie;
	var strNewLocation = DisplayExtraText('AddToCartMessage','visible');
}		
function DisplayExtraText(cntID, visibility) {
	obj = document.getElementsByTagName("div");
	obj[cntID].style.visibility = visibility;
}		
function DisplayOtherText(cntID, selID) {
	selbox = document.getElementsByTagName("SELECT")[selID]
	if (selbox.value=="Other"){
		obj = document.getElementsByTagName("TEXTAREA");
		obj[cntID].style.visibility = 'visible';
	}
	else {
		obj = document.getElementsByTagName("TEXTAREA");
		obj[cntID].style.visibility = 'hidden';
	}
}
function SearchLPodPerson(SearchWho){
	WindowObjectReference = window.open("http://www.leadershipprofiles.com/list.asp?referer=ldi&srchwho="+SearchWho);
}
function SearchLPodCompany(SearchWho){
	WindowObjectReference = window.open("http://www.leadershipprofiles.com/list.asp?referer=ldi&srchcomp="+SearchWho);
}
//
//
// code for mouse over pop-up
//
//
function showHelpBox(e, msg) {
HelpBox.init();
	if(typeof HelpBox=="undefined" || !HelpBox.ready) return;
	HelpBox.show(e, msg);
	}
function hideHelpBox() {
	if(typeof HelpBox=="undefined" || !HelpBox.ready) return;
	HelpBox.hide();
	}
//
// actual class
//
var HelpBox = {
	followMouse: true,
	overlaySelects: true,
	offX: 8,
	offY: 12,
	showDelay: 100,
	hideDelay: 200,
	tipID: "tipDiv",
	ovTimer: 0,
	ready: false,
	timer: null,
	tip: null,
	shim: null,
	supportsOverlay: false,
	init: function() {
		if(document.createElement && document.body && typeof document.body.appendChild !="undefined"){
			if(!document.getElementById(this.tipID)){
				var el=document.createElement("DIV");
				el.id=this.tipID;
				el.style.position="absolute";
				document.body.appendChild(el);
				}
			this.supportsOverlay=this.checkOverlaySupport();
			this.ready=true;
			}	
		},
	show: function(e,msg) {
		if(this.timer){
			clearTimeout(this.timer);
			this.timer=0;
			}
		if(!this.ready) return;
		this.tip=document.getElementById(this.tipID);
		if(this.followMouse) InternalEvents.add(document,"mousemove",this.trackMouse,true);
		this.writeTip("");
		this.writeTip(msg);
		PhysicalBounds.getDimensions();
		this.handleOverlay(1,this.showDelay);
		this.positionTip(e);
		this.timer=setTimeout("HelpBox.toggleVis('"+this.tipID+"', 'visible')",this.showDelay);
		},
	writeTip: function(msg) {
		if(this.tip&&typeof this.tip.innerHTML!="undefined") this.tip.innerHTML=msg;
		},
	hide: function() {
		if(this.timer) {
			clearTimeout(this.timer);
			this.timer=0;
			}
		this.handleOverlay(0,this.hideDelay)
		this.timer=setTimeout("HelpBox.toggleVis('"+this.tipID+"','hidden')",this.hideDelay);
		if(this.followMouse) InternalEvents.remove(document,"mousemove",this.trackMouse,true);
		this.tip=null;
		},
	positionTip: function(e) {
		if(this.tip&&this.tip.style) {
			var x=e.pageX? e.pageX:e.clientX+PhysicalBounds.scrollX;
			var y=e.pageY? e.pageY: e.clientY+PhysicalBounds.scrollY;
			if(x+this.tip.offsetWidth+this.offX>PhysicalBounds.width+PhysicalBounds.scrollX){
				x=x-this.tip.offsetWidth-this.offX;
				if(x<0) x=0;
				}else x=x+this.offX;
			if(y+this.tip.offsetHeight+this.offY>PhysicalBounds.height+PhysicalBounds.scrollY){
				y=y-this.tip.offsetHeight-this.offY;
				if(y<PhysicalBounds.scrollY) y=PhysicalBounds.height+PhysicalBounds.scrollY-this.tip.offsetHeight;
				}else y=y+this.offY;
			this.tip.style.left=x+"px";
			this.tip.style.top=y+"px";
			}
		this.positionOverlay();
		},
	toggleVis: function(id,vis) {
		var el=document.getElementById(id);
		if(el) el.style.visibility=vis;
		},
	toggleMouse: function(e) {
		e=InternalEvents.DOMit(e);
		HelpBox.positionTip(e);
		},
	trackMouse: function(e) {
		e=InternalEvents.DOMit(e);
		HelpBox.positionTip(e);
		},
	checkOverlaySupport: function() {
		if(navigator.userAgent.indexOf("Windows")!=-1&&
					typeof document.body!="undefined"&&
					typeof document.body.insertAdjacentHTML!="undefined"&&
					!window.opera&&navigator.appVersion.indexOf("MSIE 5.0")==-1
					) return true; else return false;
		},
	handleOverlay: function(bVis,d){
		if(this.overlaySelects&&this.supportsOverlay){
			if(this.ovTimer){
				clearTimeout(this.ovTimer);
				this.ovTimer=0;
			}
			switch(bVis){
				case 1:
					if(!document.getElementById('tipShim')){
						document.body.insertAdjacentHTML("beforeEnd",'<iframe id="tipShim" src="javascript:void();" style="position:absolute; left:0; top:0; z-index:1; visibility:hidden;  filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);" scrolling="no" frameborder="0"></iframe>');
						}
					this.shim=document.getElementById('tipShim');
					if(this.shim&&this.tip){
						this.shim.style.width=this.tip.offsetWidth+"px";
						this.shim.style.height=this.tip.offsetHeight+"px";
						}
					this.ovTimer=setTimeout("HelpBox.toggleVis('tipShim', 'visible')",d);
					break;
				case 0:
					this.ovTimer=setTimeout("HelpBox.toggleVis('tipShim', 'hidden')",d);
					if(this.shim)this.shim=null;
					break;
				}
			}
		},
	positionOverlay: function(){
		if(this.overlaySelects&&this.supportsOverlay&&this.shim){
			this.shim.style.left=this.tip.style.left;
			this.shim.style.top=this.tip.style.top;
			}
		}
	};
//
// internal events
//
var InternalEvents = {
	add: function(obj, eType, fp, cap){
		cap=cap || false;
		if(obj.addEventListener) obj.addEventListener(eType, fp, cap);
		else if(obj.attachEvent) obj.attachEvent("on"+eType,fp);
		},
	remove: function(obj, eType, fp, cap){
		cap=cap || false;
		if(obj.removeEventListener) obj.removeEventListener(eType, fp, cap);
		else if(obj.detachEvent) obj.detachEvent("on"+eType,fp);
		},
	DOMit: function(e){
		e=e? e: window.event;
		e.tgt=e.srcElement? e.srcElement: e.target;
		if(!e.preventDefault) e.preventDefault=function(){return false;}
		if (!e.stopPropagation) e.stopPropagation=function(){if(window.event) window.event.cancelBubble=true;}
		return e;
		}
	};
//
// box placement
//
var PhysicalBounds = {
	getWinWidth: function() {
		this.width=0;
		if(window.innerWidth) this.width=window.innerWidth-18;
		else if(document.documentElement && document.documentElement.clientWidth) 
			this.width=document.documentElement.clientWIdth;
		else if(document.body && document.body.clientWidth) 
			this.width=document.body.clientWIdth;
		},
	getWinHeight: function() {
		this.height=0;
		if(window.innerHeight) this.height=window.innerHeight-18;
		else if(document.documentElement && document.documentElement.clientHeight) 
			this.height=document.documentElement.clientHeight;
		else if(document.body && document.body.clientHeight) 
			this.height=document.body.clientHeight;
		},
	getScrollX: function() {
		this.scrollX=0;
		if(typeof window.pageXOffset == "number") this.scrollX=window.pageXOffset;
		else if(document.documentElement && document.documentElement.scrollLeft)
			this.scrollX=document.documentElement.scrollLeft;
		else if(document.body && document.body.scrollLeft)
			this.scrollX=document.body.scrollLeft;
		},
	getScrollY: function() {
		this.scrollY=0;
		if(typeof window.pageYOffset == "number") this.scrollY=window.pageYOffset;
		else if(document.documentElement && document.documentElement.scrollTop)
			this.scrollY=document.documentElement.scrollTop;
		else if(document.body && document.body.scrollTop)
			this.scrollY=document.body.scrollTop;
		},
	getDimensions: function() {
		this.getWinWidth();
		this.getWinHeight();
		this.getScrollX();
		this.getScrollY();
		}
	};
//
//
//
function ReadCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
}
function BillingSameAs() {
	var Cust = ReadCookie("CustomerCart");
	var CustArray=Cust.split("|");
	if(document.getElementById("inpcbxP2S1SameAsBilling").checked){
	//	for(var i=0;i<document.getElementById("ldiP2S1prefix").options.length;++i){
	//		if(document.getElementById("ldiP2S1prefix").options(i).text==CustArray[0]){
	//		document.getElementById("ldiP2S1prefix").options(i).selected=true;
	//		}
	//	}
		document.getElementById("inptxtP2S1FirstName").value=CustArray[1];
		document.getElementById("inptxtP2S1LastName").value=CustArray[2];
	//	for(var i=0;i<document.getElementById("ldiP2S1suffix").options.length;++i){
	//		if(document.getElementById("ldiP2S1suffix").options(i).text==CustArray[3]){
	//			document.getElementById("ldiP2S1suffix").options(i).selected=true;
	//		}
	//	}
		document.getElementById("inptxtP2S1Organization").value=CustArray[4];
		document.getElementById("inptxtP2S1Title").value=CustArray[5];
		document.getElementById("inptxP2S1tDepartment").value=CustArray[6];
		document.getElementById("inptxtP2S1Address1").value=CustArray[7];
		document.getElementById("inptxtP2S1Address2").value=CustArray[8];
		document.getElementById("inptxtP2S1city").value=CustArray[9];
		for(var i=0;i<document.getElementById("ldiP2S1state").options.length;++i){
			if(document.getElementById("ldiP2S1state").options(i).text==CustArray[10]){
				document.getElementById("ldiP2S1state").options(i).selected=true;
			}
		}
		document.getElementById("inptxtP2S1zip").value=CustArray[11];
		for(var i=0;i<document.getElementById("ldiP2S1country").options.length;++i){
			if(document.getElementById("ldiP2S1country").options(i).text==CustArray[12]){
				document.getElementById("ldiP2S1country").options(i).selected=true;
			}
		}
		document.getElementById("inptxtP2S1Phone").value=CustArray[14];
		document.getElementById("inptxtP2S1fax").value=CustArray[15];
	}
	else {
		document.getElementById("ldiP2S1prefix").SelectedIndex=0;
		document.getElementById("inptxtP2S1FirstName").value="";
		document.getElementById("inptxtP2S1LastName").value="";
		document.getElementById("ldiP2S1suffix").SelectedIndex=0;
		document.getElementById("inptxtP2S1Organization").value="";
		document.getElementById("inptxtP2S1Title").value="";
		document.getElementById("inptxP2S1tDepartment").value="";
		document.getElementById("inptxtP2S1Address1").value="";
		document.getElementById("inptxtP2S1Address2").value="";
		document.getElementById("inptxtP2S1city").value="";
		document.getElementById("ldiP2S1state").SelectedIndex=0;
		document.getElementById("inptxtP2S1zip").value="";
		document.getElementById("ldiP2S1country").SelectedIndex=0;
		document.getElementById("inptxtP2S1Phone").value="";
		document.getElementById("inptxtP2S1fax").value="";
	};
}	
function ShippingSameAs() {
	var Cust = ReadCookie("CustomerCart");
	var CustArray=Cust.split("|");
	if(document.getElementById("inpcbxP2S2SameAsShipping").checked){
	//	for(var i=0;i<document.getElementById("ldiP2S2prefix").options.length;++i){
	//		if(document.getElementById("ldiP2S2prefix").options(i).text==CustArray[0]){
	//			document.getElementById("ldiP2S2prefix").options(i).selected=true;
	//		}
	//	}
		document.getElementById("inptxtP2S2FirstName").value=CustArray[1];
		document.getElementById("inptxtP2S2LastName").value=CustArray[2];
	//	for(var i=0;i<document.getElementById("ldiP2S2suffix").options.length;++i){
	//		if(document.getElementById("ldiP2S2suffix").options(i).text==CustArray[3]){
	//			document.getElementById("ldiP2S2suffix").options(i).selected=true;
	//		}
	//	}
		document.getElementById("inptxtP2S2Organization").value=CustArray[4];
		document.getElementById("inptxtP2S2Title").value=CustArray[5];
		document.getElementById("inptxP2S2tDepartment").value=CustArray[6];
		document.getElementById("inptxtP2S2Address1").value=CustArray[7];
		document.getElementById("inptxtP2S2Address2").value=CustArray[8];
		document.getElementById("inptxtP2S2city").value=CustArray[9];
		for(var i=0;i<document.getElementById("ldiP2S2state").options.length;++i){
			if(document.getElementById("ldiP2S2state").options(i).text==CustArray[10]){
				document.getElementById("ldiP2S2state").options(i).selected=true;
			}
		}
		document.getElementById("inptxtP2S2zip").value=CustArray[11];
		for(var i=0;i<document.getElementById("ldiP2S2country").options.length;++i){
			if(document.getElementById("ldiP2S2country").options(i).text==CustArray[12]){
				document.getElementById("ldiP2S2country").options(i).selected=true;
			}
		}
		document.getElementById("inptxtP2S2Phone").value=CustArray[14];
		document.getElementById("inptxtP2S2fax").value=CustArray[15];
	}
	else {
		document.getElementById("ldiP2S2prefix").SelectedIndex=0;
		document.getElementById("inptxtP2S2FirstName").value="";
		document.getElementById("inptxtP2S2LastName").value="";
		document.getElementById("ldiP2S2suffix").SelectedIndex=0;
		document.getElementById("inptxtP2S2Organization").value="";
		document.getElementById("inptxtP2S2Title").value="";
		document.getElementById("inptxP2S2tDepartment").value="";
		document.getElementById("inptxtP2S2Address1").value="";
		document.getElementById("inptxtP2S2Address2").value="";
		document.getElementById("inptxtP2S2city").value="";
		document.getElementById("ldiP2S2state").SelectedIndex=0;
		document.getElementById("inptxtP2S2zip").value="";
		document.getElementById("ldiP2S2country").SelectedIndex=0;
		document.getElementById("inptxtP2S2Phone").value="";
		document.getElementById("inptxtP2S2fax").value="";
	};
}	
//
//
// Misc contact functions
//
//
var displayAccountNumberText="<div class=BodyText_Blue style='width:150px;background-color:#F5F5FF;border:1px solid #337;padding:8px;'>Your account number appears in the upper right-hand corner of your invoice.</div>";
var displayPromoCodeText="<div class=BodyText_Blue style='width:400px;background-color:#F5F5FF;border:1px solid #337;padding:8px;'>Please enter the promotion code included on the mail piece you received from us.  Promotion codes can be found on the back cover of a catalog, on the order form included with a letter, or on your renewal notice in the bill code box.  </div>";
var displayEmailPrivacyText="<div class=BodyText_Blue style='width:230px;background-color:#F5F5FF;border:1px solid #337;padding:8px;'>We are committed to protecting the privacy of our customers. E-mail addresses provided in the course of completing any transaction on the Leadership Directories web site are for the internal use of Leadership Directories, Inc. only and may be used to send promotional e-mails, special offers, or other product news. We do not share, sell, or trade our customers' e-mail addresses with any third party.</div>";
var displayTaxExemptText="<div class=BodyText_Blue style='width:150px;background-color:#F5F5FF;border:1px solid #337;padding:8px;'>If we do not already have one on file, we will contact you for a copy of your tax exemption certificate. </div>";
function InfoChangeSameAs() {
	if(document.getElementById("inpcbxP1S0SameAs").checked){
		document.getElementById("inptxtP1S0OldFirstName").value=document.getElementById("inptxtP1S0FirstName").value;
		document.getElementById("inptxtP1S0OldLastName").value=document.getElementById("inptxtP1S0LastName").value;
		document.getElementById("inptxtP1S0OldPhone").value=document.getElementById("inptxtP1S0Phone").value;
		//document.getElementById("inptxtP1S0OldExt").value=document.getElementById("inptxtP1S0Ext").value;
		document.getElementById("inptxtP1S0OldEmail").value=document.getElementById("inptxtP1S0Email").value;
	}
	else {
		document.getElementById("inptxtP1S0OldFirstName").value="";
		document.getElementById("inptxtP1S0OldLastName").value="";
		document.getElementById("inptxtP1S0OldPhone").value="";
		//document.getElementById("inptxtP1S0OldExt").value="";
		document.getElementById("inptxtP1S0OldEmail").value="";
	};
}
			
			
			