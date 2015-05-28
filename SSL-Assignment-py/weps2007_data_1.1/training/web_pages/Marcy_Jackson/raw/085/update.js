<!--

	var SERVER_CONTROLLER = new Array();	

	SERVER_CONTROLLER[0] = "frupdate.asp?wci=addworkplace&wce=UserEvent";
	SERVER_CONTROLLER[1] = "friendsreunited.asp?wci=selectwork&wce=UserEvent";
	SERVER_CONTROLLER[2] = "friendsreunited.asp?wci=memberlistdofe&wce=executerequest";
	SERVER_CONTROLLER[3] = "friendsreunited.asp?wci=selectteam&wce=userevent";
	SERVER_CONTROLLER[4] = "http://www.friendsreunitedconnections.co.uk/flmain.asp?wci=register";
	SERVER_CONTROLLER[5] = "friendsreunited.asp?wci=abmain&wce=executerequest";
	SERVER_CONTROLLER[6] = "friendsreunited.asp?wci=memberqa&wce=executerequest";
	SERVER_CONTROLLER[7] = "http://mypage.myfriendsreunited.com/xml.asp?wci=memreg";
	SERVER_CONTROLLER[8] = "friendsreunited.asp?WCI=poll&WCE=checkPostcode";
	SERVER_CONTROLLER[9] = "friendsreunited.asp?WCI=poll&WCE=processOptionals";
	SERVER_CONTROLLER[10] = "friendsreunited.asp?WCI=frmain&WCE=processOptionals";
	
	/**
	 * Executes a server request by patching the header request in the
	 * current document. The parameters specified will be attached to
	 * the request.
	 *
	 */

	var jsrefreshFunction = 'executeRequest(\'action=refresh\')';

	function canexecuteRequest(){
		if( document.getElementById && document.childNodes && document.createElement ) {
			return true;
		}else{
			return false;
		}
	}

	function executeRequest(params,n) {
		var head = document.getElementsByTagName('head').item(0);
		var old  = document.getElementById('lastLoadedCmds');
		if (old) head.removeChild(old);
		
		script = document.createElement('script');
		
		parameters = new String(params).split(',');
		
		var scriptUrl = SERVER_CONTROLLER[n] + '&rnd=' + Math.random();
		for (var i = 0; i < parameters.length; i++) {
			scriptUrl += "&" + parameters[i];
		}	
		script.src = scriptUrl;
		script.type = 'text/javascript';
		script.defer = true;
		script.id = 'lastLoadedCmds';
		void(head.appendChild(script));
	} // > function executeRequest(...)
	
	/**
	 * Dynamically updates the content of a frame.
	 * 
	 */
	function update(frame, id, html) {
		
		var doc = eval(frame + '.document');
		
		if (doc.layers) {
			var l = doc[id];
			l.document.open();
			l.document.write(html);
			l.document.close();
		} else if (doc.all && doc.all[id]) {
			doc.all[id].innerHTML = html;
		} else if (doc.createRange) {
			var l = doc.getElementById(id);
			var r = doc.createRange();
			while (l.hasChildNodes()) {
				l.removeChild(l.lastChild);
			}
			r.setStartAfter(l);
			var docFrag = r.createContextualFragment(html);
			l.appendChild(docFrag);
		}
		
	} // > function update(...)

	function updatevar(frame, id, v) {

		eval(frame + '.' + 'doswitch(\'' + v + '\')');
		return;		

	var ovar = eval(frame + '.' + id);
	alert(ovar + ' - ' + v);
		ovar = v;
	alert(ovar + ' = ' + v);	
	}

	
	function scrollToBottom(fme,bottom) {
		
		var doc = fme.messageiframe.document;
		var wnd = fme.messageiframe;

		var y = doc.height ? doc.height : doc.body.scrollHeight;
		
		wnd.scrollTo(
			0, 
			((bottom == 'true') ? y : 0)
		);
	}
	
function addOption(selObj, sText, sValue){
          var opt = document.createElement('option');
          var txt = document.createTextNode(sText);
          opt.setAttribute('value', sValue);
          opt.appendChild(txt);
          selObj.appendChild(opt);
          return false;
}

function removeAllOptions(obj){
          var l = obj.options.length;
          for (i=0;i<l;i++){
                    obj.removeChild(obj.options[0]);
          }
          return false;
}
	
// -->


