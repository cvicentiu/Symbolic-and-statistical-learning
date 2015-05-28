/* shared by downloads, mdl and vdl */



function iframeShim(options) {
	/* --
		pass in:
		element: the element you want to put this shim under
		display: turn it on?
		name: the id you want to give the new DOM element of the iframe shim
		zindex: the index of the shim; optional, default is 1 less than the element
		margin: make the iframe smaller than the element to give a buffer (for things like shadows)
		offset: {top:#, left:#} - move the iframe up/down, left/right relative to the element
	 -- */
	this.options = options;
	el = options.element;
	this.shim = document.createElement('IFRAME');
	this.shim.id = options.name || el+"_shim";
	try{
		if(!document.getElementById(el).style.zIndex)
			document.getElementById(el).style.zIndex = 1;
		} catch(e){document.getElementById(el).style.zIndex = 1;}
	this.shim.style.position = 'absolute';
	this.shim.style.zIndex = document.getElementById(el).style.zIndex - 1;
	this.shim.style.border = 'none';
	//this.shim.style.border = "1px solid blue";
	//alert(this.shim.style.border);
	this.shim.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
	this.shim.setAttribute('src', 'javascript:void(0);');
	this.shim.setAttribute('frameborder', '0');
	this.shim.setAttribute('scrolling', 'no');
	document.getElementById(el).parentNode.appendChild(this.shim);
	if(options.display) this.shim.style.display='';
	else this.shim.style.display='none';
}
iframeShim.prototype = {
	position: function(){
		var el = this.options.element;
		this.left = this.getLeft();
		this.top = this.getTop();
		this.width = document.getElementById(el).offsetWidth;
		this.height = document.getElementById(el).offsetHeight;
		if(this.options.margin){
			this.width = this.width-(this.options.margin*2);
			this.height = this.height-(this.options.margin*2);
			this.left = this.left + this.options.margin;
			this.top = this.top + this.options.margin;
		}

		if(this.options.offset){
			this.left = this.left-this.options.offset.left;
			this.top = this.top-this.options.offset.top;
		}
 		this.shim.style.left = this.left + 'px';
 		this.shim.style.width = this.width + 'px';
 		this.shim.style.height = this.height + 'px';
 		this.shim.style.top = this.top + 'px';
		//alert('w: '+this.width+'px h: '+this.height+'px l: '+this.left+'px t: '+this.top+'px');
	},
	getOffset: function(what){
		var el = document.getElementById(this.options.element);
		var offset = 0;
		do {
			offset += el['offset'+what] || 0;
			el = el.offsetParent;
		} while (el);
		return offset;
	},
	getTop: function(){
		return this.getOffset('Top');
	},
	getLeft: function(){
		return this.getOffset('Left');
	},
	show: function(){
		this.shim.style.display="";
		this.position();
	},
	hide: function(){
		this.shim.style.display="none";
	}
}

var LocalVars = {
	UserVars: function(specs){
		specs = specs || {};
		this.sentSpecs = specs;
		this.userName = (specs.userName && specs.userName.trim() != '') ? specs.userName.trim() : false;
		this.userNameDisplay = (this.userName) ? unescape(this.userName.replace(/\+/g,' ')) : false;
		this.ursRegId = specs.ursRegId || false;
		this.loggedIn = parseInt(specs.loggedIn) || false;
		this.rememberMe = parseInt(specs.rememberMe) || false;
	},
	PageVars: function(specs){
		specs = specs || {};
		this.sentSpecs = specs;
		this.pageType = parseInt(specs.pageType) || false;
		this.nodeId = parseInt(specs.nodeId) || false;
		this.channelId = parseInt(specs.channelId) || false;
		this.siteId = parseInt(specs.siteId) || false;
		this.assetId = parseInt(specs.assetId) || false;
		this.editionId = parseInt(specs.editionId) || false;
		this.edition = specs.edition || false;
		this.oid = (this.pageType && this.nodeId && this.siteId && this.assetId)
			? this.pageType+"-"+this.nodeId+"_"+this.siteId+"-"+this.assetId
			: false;
	}
}

String.prototype.trim = function(){
	return this.replace(/^\s*|\s*$/g,'');
}

var UserVars = {};
var PageVars = {};

function toggleLoginForm() {
	if (document.getElementById('uloginForm').style.display == 'none') {
		document.getElementById('uloginForm').style.display = '';
		loginShim.show();
	} else {
		document.getElementById('uloginForm').style.display = 'none';
		loginShim.hide();
		document.uloginForm.reset();
	}
	return false;
}


function initLoginPaths() {
	var loginAs = document.getElementById('hd_unilogin').getElementsByTagName('A');
	
	for (var i=0; i<loginAs.length; i++) {
		if (loginAs[i].href.match(/\/13\d{2}\-/)) {
			var seperator = (loginAs[i].href.indexOf("?") > 0) ? "&" : "?";
			loginAs[i].href += seperator+"path="+escape(document.location);
		}
	}

	var seperator = (document.getElementById('uloginForm').action.indexOf("?") > 0) ? "&" : "?";
	document.getElementById('uloginForm').action += seperator+"path="+escape(document.location);
	loginAs = null;
}


// go to login state if CR pressed
function goToLoginIfCR(event) {
    if (window.event) {
        if (window.event.keyCode == 13) {
            document.getElementById('uloginForm').submit();
        }
    } else {
        return false;
    }
}

/* -- var loginShim = null;
window.onload = function() {
    loginShim = new iframeShim({element:'uloginForm'});
    initLoginPaths();
} -- */


