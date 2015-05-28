
// NOTE: remember me (username cookie) is implemented on the backend

function addLoginCSS(d){
	var url = WEBSITE_IMAGES+"/v5/content/Subscription/styles/login.css";
	if(d.createStyleSheet) {
		d.createStyleSheet(url);
	} else {
		var css = createElement("link","","",url);
		d.getElementsByTagName("HEAD")[0].appendChild(css);
	}
}

function createLogin(){
	if($("loginFrame")){ return; }
	$("memberInfo").appendChild(createElement("div","screen_overlay"));
	var login_frame = createElement("div","loginFrame","hide");
	var login_iframe = createElement("iframe","login_holder","","/blank.html","",1,1);
	login_iframe.frameBorder=0;
	login_iframe.scrolling="no";
	var login_title = createElement("h3","","handle");
	var login_close = createElement("a","closeLogin","close-link");
	login_close.appendChild(d.createTextNode("close"));
	login_title.appendChild(d.createTextNode("Login "));
	login_title.appendChild(login_close);
	login_frame.appendChild(login_title);
	login_frame.appendChild(login_iframe);
	$("memberInfo").appendChild(login_frame);
	logWinMove(); 
	if(d.getElementById("user")){ 
		addEvent(d.getElementById("user"),"click",createLoginFrame); 
		if(location.host.indexOf("theglo")==-1){
			addEvent(d.getElementById("user"),"click",function(){
				Element.hide(d.getElementById("welcomeBlock")); 
				Element.show(d.getElementById("regInfo")); 
			}); 
		}
	}
}

/* reg block */
function displayLogin(layout){
	if(layout!="red") { 
		if(getCookie("ERIGHTS")==null){ 
			d.getElementById("regInfo").style.display = "none";
			d.getElementById("welcomeBlock").style.display = "block";
		} else if(getCookie("ERIGHTS")!=null) {
			d.getElementById("regInfo").style.display = "block";
			d.getElementById("welcomeBlock").style.display = "none";
		}
	}
}

function checkLoginStatus(){
	if(location.href.indexOf("theglo")==-1){
		var xhr = hector();
		if(xhr){
			try {
				xhr.open("POST", "/v5/content/MemberCentre/setErights.html", true);
				xhr.onreadystatechange = function() {
					try {
						if(xhr.responseText.indexOf("302")!=-1){
							xhr.abort();
						} else if(xhr.status == 302) { 
							xhr.abort();
						} else if(xhr.status == 200) { 
							displayLogin("static"); 
						}
					} catch (e) { 
						xhr.abort();
					}
				}
				xhr.send(null);		
			} catch (e) { 
				return false; 
			}
		}
	}
}
	
function createLoginFrame(){
	if(!d.getElementById("memberInfo") || getCookie("ERIGHTS")!=null) { return; }

	/* NB: overlay opacity for non-IE *//*@cc_on @*/
	/*@if (@_jscript_version >= 5) @else @*/
	if(d.getElementById("screen_overlay")){ d.getElementById("screen_overlay").style.display = "block";	}
	/*@end @*/
	
	/* NB: position box */
	d.getElementById("loginFrame").className = (this.id=="user") ? "" : "upsell";
	
	var pos = getElPos(this);
	d.getElementById("loginFrame").style.position = "absolute";
	d.getElementById("loginFrame").style.left = (pos[0] > 320) ? (pos[0]+100)+"px" : (pos[0]+300)+"px";
	d.getElementById("loginFrame").style.top = (this.id=="user") ? (pos[1]+100)+"px" : (pos[1]+20)+"px";

	/* NB: create box */
	addLoginCSS(d);
	var iframe = d.getElementById("login_holder");
	if(d.getElementById("login_holder").src.indexOf("loginFrame")==-1){
		iframe = d.getElementById("login_holder")
		iframe.src = WEBSITE_TGAM+"/servlet/Page/document/v5/includes/global/login/loginFrame?user_URL="+encodeURI(location.href)+"\u0026ord="+random_number;
		Element.removeClassName(d.getElementById("loginFrame"),"hide");
	} else if(d.getElementById("loginFrame").style.display=="none"){
		Element.show(d.getElementById("loginFrame"));
	}
	return false;
}

function logWinMove(){ 
	var loginWin;
	if(d.getElementById("loginFrame") && getElementsByClassName(d.getElementById("loginFrame"),"h3","handle").length>0){
		loginWin = new Draggable("loginFrame",{handle:"handle",zindex:100000,starteffect:function(){},endeffect:function(){} })
		addEvent($("closeLogin"), "click", loginWinClose); 
		pageLoaderRI();
	} else {
		setTimeout("logWinMove()",50);	
	}
}

function loginWinClose(){
	top.window.LoginRI = LoginRI;
	Element.hide(d.getElementById("loginFrame")); 
	if(d.getElementById("screen_overlay")){ Element.hide(d.getElementById("screen_overlay"));  }
	if(top.window.location.href.indexOf("logout")!=-1){ top.window.location.replace(WEBSITE_TGAM); }
}

function pageLoaderRI() {
	if (d.getElementById("loginForm")) {
		LoginRI.init("loginForm", "user_name", "user_password", "user_remember", "userLogin");
	} 
}

var LoginRI = {
	xhr : null,
	loginForm : "loginForm",
	objUser : null,
	objPass : null,
	objSubmit : null,
	loginError : null,
	regObj : null,
	regForm : null,
	elmToHideOnSuccess : ["lbl_memberAction_new", "lbl_memberAction_return", "memberLogin", "memberAction_return", "memberAction_new"],
	user : null,	

	init : function(objLoginForm, objUser, objPass, objRemember, objSubmit) {
		this.xhr = hector();
		this.loginForm = $(objLoginForm);
		this.objUser = $(objUser);
		this.objPass = $(objPass);
		this.objRemember = $(objRemember);
		this.objSubmit = $(objSubmit);
		if(!d.getElementById("loginNow")){
			this.regObj = $("userReg");
			this.regForm = $("memberAccount");
		}
		this.addLoginFormHandler();
	},
	
	addLoginFormHandler : function() {
		new Form.Observer(LoginRI.loginForm, 1, LoginRI.validateLogin);
		addEvent(this.loginForm, "submit", function() {
			this.loginForm.style.cursor = "wait";
			this.transmit();
			return false;
		}.bind(this));
		addEvent(this.objSubmit, "click", function() {
			this.loginForm.style.cursor = "wait";
			this.objSubmit.className = "process";
			this.transmit();
			return false;
		}.bind(this));
	},
	
	transmit : function() {
		//$("loginFrame").style.cursor = "progress";
		var url = this.loginForm.action;
		url += "?user_name=" + encodeURI(this.objUser.value);
		url += "\u0026user_password=" + encodeURI(this.objPass.value);
		url += "\u0026user_remember=" + ((this.objRemember.checked) ? 1 : 0);
		url += "\u0026user_action=login";
		url += "\u0026redirect=false";
		this.xhr = hector();
		this.xhr.open("POST", url, true);
		this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		this.xhr.onreadystatechange = function() {
			LoginRI.process();
		}
		this.xhr.send('');
	},
		
	validateLogin : function() {
		if(LoginRI.objUser.value.length>=3 && LoginRI.objPass.value.length>=1){
			if(LoginRI.user == null){
				Element.addClassName(LoginRI.objSubmit,"active");
				if($("loginErrors")) { $("loginErrors").remove(); }
			}
		}
	},
	
	process : function() {
		if(this.loginSuccess() && $("loginFrame")) {	
			this.createUser();
			Element.addClassName(LoginRI.objSubmit,"active");
			if($("loginErrors")) { $("loginErrors").remove(); }
			this.finalizeLoginDisplay();
			return;
		} else if(this.loginSuccess()) {
			this.hideLoginForm();
			this.createUser();
			this.chkUserSub();
			subRedirect();
			this.populateRegForm();
			$("userInfo").getElementsByTagName("HR")[0].className = "hide";
			$("userInfo").getElementsByTagName("H3")[0].childNodes[1].nodeValue = "Your Member Account";
			new Effect.Appear(this.regObj);
			Register.init();
			Register.makeEditable();
			if($("newspaperInfo")) { 
				Newspaper.init();
			} else if($("studentInfo")) {
				Student.init();
			} else if($("billingInfo")) {
				Billing.init();
			} else {
				return;
			}
		}
	},

	loginSuccess : function() {
		if (this.xhr.readyState == 4) {
			//$("loginFrame").style.cursor = "auto";
			if(this.xhr.status && (this.xhr.status == 200)) {
				this.loginForm.style.cursor = "default";
				if(this.xhr.responseText.indexOf("OK") == -1) {
					this.createLoginError();
					this.objSubmit.className = "inactive";
					return false;
				} else {
					return true;	
				}
			}
		}
	},

	createLoginError : function() {
		if ($("loginErrors")) {
			Element.remove($("loginErrors"));
		}
		this.loginErrors = Builder.build(this.xhr.responseText);
		this.loginForm.insertBefore(this.loginErrors, this.loginForm.lastChild);
	},

	populateRegForm : function() {
		if($("regErrors")) {
			Element.remove($("regErrors"));
		}
		this.regForm.user_regname.value = this.user.username.toLowerCase();
		this.regForm.user_regpassword.value = this.user.password;
		this.regForm.user_firstname.value = this.user.firstname;
		this.regForm.user_lastname.value = this.user.lastname;
		this.regForm.user_email.value = this.user.email;
		this.regForm.user_postal.value = this.user.postal;
		this.user.gender == "M" ? this.regForm.user_genderM.checked = true : this.regForm.user_genderF.checked = true;
		this.makeSelection(this.regForm.user_country, this.user.country);
		this.makeSelection(this.regForm.user_agerange, this.user.agerange);
		this.makeCheckBoxSelection(this.user.access_at_home, this.regForm.user_access_athome);
		this.makeCheckBoxSelection(this.user.access_at_work, this.regForm.user_access_atwork);
		this.makeCheckBoxSelection(this.user.access_pda, this.regForm.user_access_pda);
		this.makeCheckBoxSelection(this.user.access_other, this.regForm.user_access_other);
		this.makeCheckBoxSelection(this.user.sendInfo, this.regForm.user_sendinfo);
		this.makeCheckBoxSelection(this.user.remember, this.regForm.user_remember);
	},
	
	makeSelection : function(obj, val) {
		for (var i=0; i<obj.length; i++) {
			if (obj.options[i].value == val) {
				obj.options[i].selected = true;
			}
		}
	},

	makeCheckBoxSelection : function(obj, objToCheck) {
		if(obj == 1) { objToCheck.checked = true; }
	},

	hideLoginForm : function() {
		for(var x=0; x<this.elmToHideOnSuccess.length; x++) {
			Element.remove(this.elmToHideOnSuccess[x]);
		}
	},

	finalizeLoginDisplay : function() {
		
		var user_url = unescape(location.href.split("user_URL=")[1]);
		user_url = user_url.split("/");
		if(user_url[2].indexOf("theglo")==-1){
			location.href = user_url[0]+"//"+user_url[2]+"/v5/content/Subscription/completeLogin.html";
		} else {
			LoginRI.chkUserSub();
			loginWinClose();
		
			var regInfo;
			var dom_start = (top.window) ? top.window.document : document;
			Element.hide(dom_start.getElementById("loginFrame")); 
			Element.hide(dom_start.getElementById("screen_overlay")); 
			if(dom_start.getElementById("regInfo").contentDocument) {
		    regInfo = dom_start.getElementById("regInfo").contentDocument; 
		  } else if (dom_start.getElementById("regInfo").contentWindow) {
		    regInfo = dom_start.getElementById("regInfo").contentWindow.document;
		  } else if (dom_start.getElementById("regInfo").document) {
		    regInfo = dom_start.getElementById("regInfo").document;
		  } else {
				return;
			}
			
			addEvent(regInfo.getElementById("user"),"click",function(){
				if(location.href.indexOf("insiderhome")!=-1 || location.href.indexOf("Insider/home")!=-1){
					return confirm("Your preferences may not be saved if you logout from this page directly.\nWe recommend logging out from another page.\nDo you still wish to logout?");
				}
			});
			regInfo.getElementById("welcome").getElementsByTagName("EM")[0].firstChild.nodeValue = " "+this.objUser.value;
			regInfo.getElementById("user").href = WEBSITE_TGAM+"/servlet/Page/document/v4/reg/logoutPage?ord="+random_number;
			regInfo.getElementById("user").firstChild.nodeValue = " (logout) ";
			regInfo.getElementById("memberCenter").style.display = "inline";
			Element.hide(dom_start.getElementById("welcomeBlock")); 
			Element.show(dom_start.getElementById("regInfo")); 
		}
	},
	
	createUser : function() {
		var objR = eval('(' + this.xhr.responseText + ')');
		this.user = objR.user;
	},
	
	chkUserSub : function(){
		var url = "/servlet/Page/document/v5/includes/global/login/user_subscription";
		this.xhr = hector();
		this.xhr.open("GET", url, true);
		this.xhr.onreadystatechange = function() {
			if (this.xhr.readyState == 4) {
				if (this.xhr.status == 200) { 
					this.user.subscription = this.xhr.responseText;
					if(this.user.subscription.indexOf("key")!=-1){ 
						isSubscriber("["+this.user.firstname+"][true]"); 
					}
				}
			}
		}.bind(this);
		this.xhr.send(null);
	}
};

var Login = LoginRI;