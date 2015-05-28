var IE4 = (document.all) ? true : false;
var NS4 = (document.layers) ? true : false;
var ver4 = IE4 || NS4 ;

// *************************************************************
//  CLIENT_SIDE SNIFFER CODE (Borrowed from hp.com)
// *************************************************************
// convert all characters to lowercase to simplify testing
var agt=navigator.userAgent.toLowerCase();

// *** BROWSER VERSION ***
// Note: On IE5, these return 4, so use is_ie5up to detect IE5.
var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);

// *** BROWSER TYPE ***
var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
            && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
            && (agt.indexOf('webtv')==-1));
var is_nav4up = (is_nav && (is_major >= 4));
var is_nav5up = (is_nav && (is_major >= 5));
var is_ie   = (agt.indexOf("msie") != -1);
var is_ie3  = (is_ie && (is_major < 4));
var is_ie4  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")==-1) );
var is_ie4up  = (is_ie  && (is_major >= 4));
var is_ie5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
var is_ie5up  = (is_ie  && !is_ie3 && !is_ie4);

function validateSearch(srchStr){
	var retVal = false

	//if(srchStr.length < 3){
	//	alert("The search string must be at least three characters long.")
	//}else{
		retVal = true
	//}

	return retVal
}

function fixSearchStr(srchStr){
	var retVal

	retVal = srchStr

	retVal = str_replace( "'", "", retVal )
	retVal = str_replace( "?", " ", retVal )
	retVal = str_replace( "&", " ", retVal )
	retVal = str_replace( '"', '', retVal )
	retVal = str_replace( ',', ' ', retVal )
	retVal = str_replace( "$", " ", retVal )
	retVal = str_replace( "=", " ", retVal )
	retVal = str_replace( ";", " ", retVal )

	return retVal
}


function validEmail(curEM){
	if( curEM.indexOf('@') == -1 || curEM.indexOf('.') == -1){
		return false
	}else{
		return true
	}
}

function str_replace( find, replace, subject ){
	find = new String(find)
	replace = new String(replace)
	var retVal = new String(subject)
	var i

	i = retVal.indexOf(find)

	while( i > -1 ){
		retVal = retVal.substr(0, i) + replace + retVal.substr(i + 1)
		i = retVal.indexOf(find, i + replace.length)
	}
	return retVal
}

function newWin(obj){
var winOpt = "scrollbars=yes,resizable=yes,width=600,height=730"
var thisWin = window.open(obj.href,obj.target,winOpt)
}

function getHttpReq(){
	var xmlhttp=false;
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	// JScript gives us Conditional compilation, we can cope with old IE versions.
	// and security blocked creation of the objects.
	 try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	 } catch (e) {
		try {
		 xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
		 xmlhttp = false;
		}
	 }
	@end @*/
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}

	return xmlhttp;
}

function trim(sInString) {
  sInString = sInString.replace( /^\s+/g, "" );// strip leading
  return sInString.replace( /\s+$/g, "" );// strip trailing
}

var onLoadFunc = new Array();
var onLoadData = new Array();

function registerOnLoadData(func, objData){
	//var funcName = new String(func);
	//funcName = funcName.slice(9,funcName.indexOf("{") - 1);
	//alert('registerOnLoadData: '+funcName+'\n'+objData);
	try{
		onLoadFunc.push(func);
		onLoadData.push(objData);
	}catch(e){
		alert('Error registering onLoad events: ' + e);
	}
}

function Body_onLoad(){
	try{
		for(i in onLoadData){
			var func = onLoadFunc[i];
			var args = onLoadData[i].split(',');

			var funcName = new String(func);
			funcName = funcName.slice(9,funcName.indexOf("{") - 1);
			//alert('function: '+funcName+'\ndata:\n\t'+args.join('\n\t'));

			switch (args.length){
				case 0:
					func();
					break;
				case 1 :
					if (trim(args[0]) == ""){
						func();
					}else{
						func(args[0]);
					}
					break;
				case 2:
					func(args[0], args[1]);
					break;
				case 3:
					func(args[0], args[1], args[2]);
					break;
				case 4:
					func(args[0], args[1], args[2], args[3]);
					break;
				case 5:
					func(args[0], args[1], args[2], args[3], args[4]);
					break;
				case 6:
					func(args[0], args[1], args[2], args[3], args[4], args[5]);
					break;
				default:
					alert("Unsupported number of onLoad arguments.\n"+
								"Function: " + onLoadFunc[i] + "\n" +
								"Number of arguments: " + args.length);
			}

		}
	}catch(e){
		alert('Error calling onLoad events: ' + e);
	}

}

//////////////////////////////
// AJAX Functionality

var req = false;

//the generic response catching functio, actually deals with receiving the AJAX data
function GenCatchDataFunc(){
	alert("ReadyState: " + req.readyState);
	//server finished transmitting
	if(req.readyState==4){
		//server transmitted
		if(req.status==200){
			alert(req.responseText);
			//req.catchDataFunc();

			//var rDoc=req.responseText;
			//dispObj.innerHTML = AncOutStart+'<tr><td>Data retrieved.</td></tr>'+AncOutEnd;
			//dispObj.innerHTML = AncOutStart+rDoc+AncOutEnd;
			//req.dispObj.innerHTML = rDoc;
		} else {
			alert('HTTP Error: '+req.status+'\nError text: '+req.statusText);
		}
	}
}

//this function deals with the form being submitted and initiates the AJAX connection
function Callback(a_url, a_async, a_catchDataFunc, a_dispObj, a_inprocessMsg){

	//alert("Callback:\n" + a_url + "\n" + a_async + "\n" + a_catchDataFunc + "\n" + a_dispObj + "\n" + a_inprocessMsg);

	if (a_url == undefined || a_url == ""){
		alert('AJAX data error - No URL provided.');
		return;
	}

	if (a_catchDataFunc == undefined){
		alert('AJAX data error - No data catching function provided.');
		return
	}

	if (a_dispObj == undefined || a_dispObj == ""){
		a_dispObj = ""
	}

	if (a_inprocessMsg == undefined){
		a_inprocessMsg = "";
	}

	if (a_dispObj > ""){
		try{
			dispObj = document.getElementById(a_dispObj);

			if (dispObj == undefined){
				//document.write(getProperties(window));
				alert('AJAX display object '+a_dispObj+' is undefined');
				return false;
			}
		} catch(e) {
			alert('Error retrieving display object: '+e);
		}
	}

	try{
		// branch for native XMLHttpRequest object
		if(window.XMLHttpRequest) {
			try {
				req = new XMLHttpRequest();
			} catch(e) {
				req = false;
			}
		// branch for IE/Windows ActiveX version
		} else if(window.ActiveXObject) {
			try {
				req = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {
					req = false;
				}
			}
		}
	} catch(e) {
		alert('Error retrieving HTTP object for AJAX: '+e);
	}
	var retState=false;
	if(req){
		try{
			if (a_dispObj > ""){
				req.dispObj = dispObj
				req.dispObj.innerHTML= a_inprocessMsg;
			}

			req.onreadystatechange = GenCatchDataFunc
			//req.catchDataFunc = a_catchDataFunc;

			curURL = "http://"+window.location.host+a_url

			req.open('GET', curURL, a_async);
			req.send(null);
		} catch(e) {
			//alert('There has been an AJAX error.');
			alert('There has been an AJAX error: '+e);
		}
	} else {
		retState=true;
	}
	return retState;
}


// AJAX Functionality END
//////////////////////////////

//----- Gets the form containing the specified object
function getForm(inObj){
	var elem=inObj;
	while(elem.nodeName != 'FORM'){
		elem=elem.parentNode;
	}
	return elem;
}

//----- Searches parents of inObj for node specified in nodeType
function searchParent(inObj,nodeType){
	if(inObj.nodeName==nodeType){
		return inObj;
	} else {
		if(inObj.nodeName=='#document'){
			return false;
		} else {
			return searchParent(inObj.parentNode,nodeType);
		}
	}
}

//----- Searches next inObj's next sibling until it finds nodeType
function searchNextSib(inObj,nodeType){
	if(inObj.nodeName==nodeType){
		return inObj;
	} else {
		if(inObj.nextSibling){
			return searchNextSib(inObj.nextSibling,nodeType);
		} else {
			return false;
		}
	}
}

//----- Searches next inObj's next sibling until it finds nodeType
function searchPrevSib(inObj,nodeType){
	if(inObj.nodeName==nodeType){
		return inObj;
	} else {
		if(inObj.nextSibling){
			return searchPrevSib(inObj.previousSibling,nodeType);
		} else {
			return false;
		}
	}
}
