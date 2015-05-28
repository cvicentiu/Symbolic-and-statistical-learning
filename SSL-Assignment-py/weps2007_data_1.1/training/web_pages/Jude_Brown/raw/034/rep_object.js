/****************************
* ReportingCall Global Vars *
*****************************/
var defaultCall="";
var defaultDelimiter = "&";
var GETs = new Array(null);
var section_0 = new Array("gateway","portal","tab","area","sec_0","section_0");
var section_zeros = section_0.join("");

/****************************
* ReportingCall Constructor *
*****************************/
function ReportingCall(call,d) {
   var pagename;
   var gateway;
   var url;
   var loginstatus;
   var login;
   var zyg;
   var era;
	var d_lmt = arguments.length==1?defaultDelimiter:d;
	var bits = call.split(d_lmt);
	for(var i=0;i< bits.length;i++){
	    if(i==0){
		this.host=bits[i];
		this.path = new Object();
	    }else{
		av = bits[i].split("=");
		if (av[1]=="") continue;
		else this[av[0]] = av[1] + "";
		if(section_zeros.indexOf(av[0])){
		    for (var j=0;j<section_0.length;j++){
			if(this[section_0[j]]){
			    this.path[section_0[j]] = this[section_0[j]] + "";
			}
		    }
		}
		if (av[0].indexOf("section_")>=0){
		    this.path[av[0]] = av[1] + "";
		}
	    }
	}
	this.getPropCount = getPropCount;
	this.objectToString = objectToString;
	this.origin = this.objectToString(this.path)+(this.pageName?this.pageName:"");
	this.joinProps = joinProps;
	this.getValue = getValue;
	this.getProps = getProps;
	this.setProps = setProps;
	this.clearProps = clearProps;
	this.cleanArgs = cleanArgs;
}
//new ReportingCall(defaultCall);

/************************
* ReportingCall Methods *
*************************/
ReportingCall.prototype.setPropsFromString = function(str,d) {
		var d_lmt = d?d:",";
		var strg = this.cleanArgs(str);
		var avs = strg.split(d_lmt);
		var props = new Array();
		for(var i=0; i<avs.length; i++){
			props[i] = avs[i].split("=");
		}
		for(var i=0; i<props.length; i++){
			if(props[i][1] == "null" || props[i][1] == ""){
				this.deleteRepProps(props[i][0]);
			}
			else{
				this.setRepProps(props[i][0] + "=" + props[i][1]);
			}
		}
	
}

ReportingCall.prototype.setRepProps = function() {
	if (arguments.length==0)
		return;
	else
		var avs = new Array();
	for (var i=0; i < arguments.length; i++) {
		avs[i] = arguments[i].split("=");
		this.setProps(avs[i][0],avs[i][1]);
		this.setPathParts(avs[i][0] + "=" + avs[i][1]);
	}
}

ReportingCall.prototype.deleteRepProps = function() {
	if (arguments.length==0){
		return;
	}else{
		for(var i=0; i<arguments.length; i++){
			delete this[arguments[i]];
			var path = this.getPath();
			delete path[arguments[i]];
		}
	}
}

ReportingCall.prototype.getPath = function() {
	return this.path;
}

ReportingCall.prototype.setPathParts = function(arg) {
	if(arguments.length == 0){
		return;
	}else{
		if(arg.indexOf(".")>=0){
			var pg = arg.split('=');
			this.setProps('pageName',pg[1]);
		}else if(arg.indexOf("section_")>=0){
			this.setPath(arg);
		}else{
			for(var i=0; i<section_0.length; i++){
				if(arg.indexOf(section_0[i])>=0)
					this.setPath(arg);
			}
		}
	}
}

ReportingCall.prototype.setPath = function(arg) {
	if(arguments.length == 0){
		return;
	}else{
		var path = this.getPath();
		for(var i=0; i<arguments.length; i++){
			avs = arguments[i].split("=");
			if(avs[1] == "null"){
				this.deleteRepProps(avs[0]);
			}else{
				this.setProps(avs[0],avs[1]);
				path[avs[0]] = avs[1];
			}
		}
	}
}

ReportingCall.prototype.resetPath = function(arg) {
	var sec_0 = "section_0";
	var pth = arguments.length == 0?this.origin:arg;
	for (var j in section_0){
		if(this[section_0[j]])
			sec_0 = section_0[j];
	}
	if(pth.indexOf("/")==0) pth = pth.substring(1);
	if(pth.lastIndexOf("/") == (pth.length-1)) pth = pth.slice(0, pth.length-1);
	var or = pth.split("/");
	this.clearProps(this.getPath());
	for (var i in or){
		if (i == 0){
			this.setRepProps(sec_0 + "=" + or[i]);
		}else{
			this.setRepProps("section_" + i + "=" + or[i]);
		}
	}
	var props = this.getProps();
	var xSecs = new Array();
	for (i in props) {
		if (props[i].indexOf("section_")>=0)
		xSecs[xSecs.length] = props[i];
	}
	for (j in xSecs) {
		if (this.path[xSecs[j]])
			continue;
		else
			delete this[xSecs[j]];
	}
}

ReportingCall.prototype.pathToString = function(mode){
	var pathParts = new Array();
	var thisPath = this.getPath();
	var sortedPath = new Object();
	for (var i in thisPath) {
	    if(i.toString().indexOf("_")==-1){
		if(typeof thisPath[i] != "function"){
		    pathParts[0] = [i, thisPath[i]];
		}
	    } else {
		pathParts[i.toString().substring(i.toString().indexOf("_")+1)] = [i, thisPath[i]];
	    }
	}
	for (var j = 0, k = 0; j < pathParts.length; j++) {
		if (typeof(pathParts[j]) == 'undefined') continue;
		sortedPath[pathParts[j][0]] = pathParts[j][1];
		++k;
	}
	var strPath = this.objectToString(sortedPath);
	if (mode == "h") { strPath = strPath.substring(0, strPath.length-1); }
	else if (mode == "p") { strPath = "/" + strPath; }
	else { strPath = strPath; }
   if(strPath.indexOf("//")!=-1){
      strPath = strPath.replace(new RegExp("/+","g"));
   }

	return strPath;

}

ReportingCall.prototype.toString = function(d) {
	var d_lmt = arguments.length == 0?",":d;
	var meth = new Array();
	var prop = "";
	var c = 0;
	for(var p in this){
		if (p == "path"){
			prop += "path: " + this.objectToString(this[p]) + d_lmt;
			continue;
		}
		if (typeof this[p] == "function")
			meth[c++] = p;
		else
			prop += p + ": " + this[p] + d_lmt;
	}
	for(i in meth){
		prop += "METHOD: " + meth[i] + d_lmt; 
	}
	return prop;
}

ReportingCall.prototype.makeFullCall = function() {
	// Deprecated. Left here for legacy implementations.
	return;
}

ReportingCall.prototype.makeTaxCall = function() {
	// Deprecated. Left here for legacy implementations.
	return;
}

ReportingCall.prototype.getQueryVals = function(){
	var qsStr = document.location.search;
	var qsEmpty = "";
	if((typeof(qsStr)!='undefined')&&(qsStr!=null)){
		qsStr=qsStr.replace(/\?/,"");
		qsStr=qsStr.replace(/\&/g,"|");
		return unescape(qsStr);
	}else return qsEmpty;
}

/************************
* Utility methods used  *
* indirectly by the     *
* ReportingCall object. *
*************************/
function joinProps(prim, second, d) {
	var delim= d?d:"|";
	var aggregate="";
	if(prim)aggregate=prim;else return aggregate;
	if(second)aggregate+=delim+second;
	return aggregate;
}

function objectToString(o,d) {
	var d_lmt = d?d:"/";
	var str = "", pCnt = this.getPropCount(this[o]), cnt = 1;
	for(var i in o){
		if(typeof o[i] == "function") continue;
		d_lmt = cnt==pCnt?"":d_lmt;
		str += o[i] + d_lmt;
		cnt++;
	}
	return(str);
}

function getPropCount(o){
	if (arguments.length == 0)
		return false;
	var pCount = 0;
	for(var i in this[o]){
		pCount++
	}
	return pCount;
}

function getValue(prop) {
	return this[prop];
}

function getProps() {
	var avs = new Array();
	for (var av in this){
		if(typeof this[av] == "function") continue;
		avs[avs.length] = av;
	}
	return avs;
}

function setProps (a,v) {
	if(v == "null"){
		delete this[a];
	}else{
		this[a] = v;
	}
}

function clearProps (o) {
	for (var i in o) {
		delete o[i];
	}
}

function cleanArgs (s) {
	var str = s.replace(/\s/g, "");
	return str;
}
