/*
 * scraps.js
 * 
 * Various helper functions for Sitebuilder2 that are required on several pages
 * but are not included in the Prototype or Scriptaculous libraries.
 */

/*
  Call this function within a keypress function, to cancel any default
  action this keypress might have.
*/
cancelDefaultEvents = function(keyEvent) {
  if (keyEvent.preventDefault) keyEvent.preventDefault();
  keyEvent.returnValue = false;
};
 
/*
 WCookie(name) - load a cookie with this name
 WCookie(name,value,[hours],[path]) - create and save a cookie with this name/value,
 		optionally specifying the hours to expiry, and a path (default '/')
*/
var WCookie = function(name, value, hours, path) {
  this.name = name;
  
  //set some defaults
  this.expires = '';
  this.path = '/';
  this.value = '';
  
  if (value) {  
	  this.value = value;
	  if (hours) {
	    this.hours = hours;
	    this.expires = '; expires='+WCookie._getGMTStringForHoursAhead(hours);
	  } else {
	    this.expires = '';
	  }
	  if (path) {
	    this.path = path;
	  } else {
	    this.path = '/';
	  }
	  this.save();
  } else {
      this.value = this.load();
  }
};

WCookie._getGMTStringForHoursAhead = function(hours) {
  var date = new Date();
  date.setTime(date.getTime() + (hours*60*60*1000));
  return date.toGMTString();
};

WCookie.prototype.load = function() {
  var nameEQ = this.name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') 
      c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) 
      return c.substring(nameEQ.length,c.length);
  }
  return null;
};

WCookie.prototype.save = function() {
   document.cookie = this.name+'='+this.value+this.expires+'; path='+this.path;
};

WCookie.prototype.erase = function() {
   this.value = '';
   this.hours = -1;
   this.expires = '; expires='+WCookie._getGMTStringForHoursAhead(this.hours);
   this.save();
};
 
 
 
/**
	StringBuilder class. When appending strings repeatedly, this
	is MUCH faster than using strings directly, ESPECIALLY in
	Internet Explorer.
*/ 
// Initializes a new instance of the StringBuilder class
// and appends the given value if supplied
if (typeof(StringBuilder)=="undefined")
{
var StringBuilder = function(value)
{
    this.strings = new Array("");
    this.append(value);
}
// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value)
{
    if (value)
    {
        this.strings.push(value);
    }
}
// Clears the string buffer
StringBuilder.prototype.clear = function ()
{
    this.strings.length = 1;
}
// Converts this instance to a String.
StringBuilder.prototype.toString = function ()
{
    return this.strings.join("");
}
} 


/*
 * Use instead of encodeURIComponent() on its own because they do not
 * take into account multi-byte characters (such as Chinese symbols)
 */
String.prototype.postEncode = function() {
	var output = new StringBuilder();
	var size = this.length;
	for(var i=0; i<size; i++) {
	   	var c = this.charCodeAt(i).toString();
    		if (c>127) {
	    		output.append('%26%23');
	    		output.append(c);
	    		output.append('%3B');	
    		} else {
	    		output.append(encodeURIComponent(this.substr(i,1)));
    		}
	}
	return output.toString();
};

/*
 * Similar to postEncode but creates plain HTML entities, rather than
 * URL encoded HTML entities.
 */
String.prototype.characterEscape = function() {
	var output = new StringBuilder();
	var size = this.length;
	for(var i=0; i<size; i++) {
	   	var c = this.charCodeAt(i).toString();
    		if (c>127) {
	    		output.append('&#');
			output.append(c);
			output.append(';');	
    		} else {
	    		output.append(this.substr(i,1));
    		}	
	}
	return output.toString();
};

/*
 * Removes leading and trailing whitespace from a string
 */
String.prototype.trim = function() {
   	return this.replace(/^\s+|\s+$/g,'');
}

/*
 * Extensions to the Prototype library to serialise a form using String.postEncode() as specified above
 */
var WForm = {
 
  postEncode : function(form) {
	var elements = Form.getElements($(form));
    var queryComponents = new Array();

    for (var i = 0; i < elements.length; i++) {
      var queryComponent = WForm.Element.postEncode(elements[i]);
      if (queryComponent)
        queryComponents.push(queryComponent);
    }

    return queryComponents.join('&');
  },

  Element : {
  	 postEncode : function(element) {
	    element = $(element);
	    var method = element.tagName.toLowerCase();
	    var parameter = Form.Element.Serializers[method](element);
	
	    if (parameter) {
	      var key = parameter[0].postEncode();
	      if (key.length == 0) return;
	
	      if (parameter[1].constructor != Array)
	        parameter[1] = [parameter[1]];
	
	      return parameter[1].map(function(value) {
	        return key + '=' + value.postEncode();
	      }).join('&');
	    }
     }
   }
};

//Track AJAX requests so we can cancel 'old' ones.
Ajax.currentRequests = {};

Ajax.Responders.register({
	onCreate: function(request) {
		if (request.options.onlyLatestOfClass && Ajax.currentRequests[request.options.onlyLatestOfClass]) {
			// if a request of this class is already in progress, attempt to abort it before launching this new request
			try { 
				Ajax.currentRequests[request.options.onlyLatestOfClass].transport.abort(); 
			} catch(e) {}
		}
		// keep note of this request object so we can cancel it if superceded
		Ajax.currentRequests[request.options.onlyLatestOfClass] = request;
	},
	onComplete: function(request) {
		if (request.options.onlyLatestOfClass) {
			// remove the request from our cache once completed so it can be garbage collected
			Ajax.currentRequests[request.options.onlyLatestOfClass] = null;
		}
	}
});

//add the event to onLoad because IE will try and do things before actually loading hte page
//TODO just use Event.observe?
var addEvent = function(obj, type, fn, tmp) {
	tmp || (tmp = true);
	if( obj.attachEvent ) {
		obj["e"+type+fn] = fn;
		obj[type+fn] = function(){obj["e"+type+fn]( window.event );}
		obj.attachEvent( "on"+type, obj[type+fn] );
	} else {
		obj.addEventListener( type, fn, true );
	};
}