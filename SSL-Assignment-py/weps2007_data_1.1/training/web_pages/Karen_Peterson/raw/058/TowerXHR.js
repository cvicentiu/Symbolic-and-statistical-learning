//
// XHR :: Custom xmlhttprequest Class
// Written by Andy Frey ( andy [at] onesandzeros [dot] biz )
// http://onesandzeros.biz/xhr/ for latest info
//
//  Versions--
//    1.3 (27 December 2005) -- fixed timeout problem
//    1.2 (4 November 2005) -- fixed query decoding issues
//

// will be the object from the browser for io calls
// it needs to be its own thing out in the global scope
var xmlhttp;
var xmlhttpTimer = -1; // used for timeouts on broken calls

// pass this consturctor a var/val pair string (var=val&var=val&var=val...)
// and it magically creates an array of objects such that { name:nameOfVar, value:valOfVar }
function VarPairs( u ) {
	// split query string into variable/value pairs
	this.pairs = new Array();
	this.uri = u;
	var vps = this.uri.split( "&" );
	// run through and load up varPairs with var/val objects { varname, varvalue }
	for( var i = 0; i < vps.length; i++ ) {
		this.pairs[i] = {
			name:decodeURIComponent( vps[i].substring( 0, vps[i].indexOf( "=" ) ) ), // get everything up to first = sign
			value:decodeURIComponent( vps[i].substring( vps[i].indexOf( "=" ) + 1 ) )// get everything after the first = sign
		};
	}

	// pass it the name of the variable whose var/val pair you'd like
	this.getVar = function ( n ) {
		for( var i = 0; i < this.pairs.length; i++ )
			if( this.pairs[i].name == n )
				return this.pairs[i];
		return { name:"", value:"" };
	};

}

var onTowerXHRPreSend = function () {
	// stuff to do right before sendAndLoad() is called
};

var onTowerXHRPostSend = function () {
	// stuff to do right after sendAndLoad() comes back from receipt of data
};

var onTowerXHRWaiting = function ( n ) {
	// stuff to do while waiting for a response (n is the readyState value)
};

var onTowerXHRRecv = function () {
	alert( "Received data OK!" );
};

var onTowerXHRTimeout = function () {
	alert( "Connection timed out." );
};

var onTowerXHRErr = function ( e ) {
	//alert( "Error loading data (status code " + e + ")." );
};

// this function handles the firing of the above functions
// on return from io script
var onTowerXMLHTTPChangeState = function () {

	switch( xmlhttp.readyState ) {

	case 0: // uninitialized
	case 1: // loading
	case 2: // loaded
	case 3: // interactive
		// fire off waiting method for all these states
		onTowerXHRWaiting( xmlhttp.readyState );
		break;

	case 4: // complete
		// first, kill the timeout timer
		clearTimeout( xmlhttpTimer );
		if( xmlhttp.status == 200 )
			onTowerXHRRecv();  // call receive method
		else
			onTowerXHRErr( xmlhttp.status );  // call error method (pass it the status code)
		onTowerXHRPostSend();
		break;

	default:  // in case we get something unknown
		onTowerXHRWaiting( xmlhttp.readyState );

	}

}

// pass this thing the url to the script that will handle requests
function TowerXHR( is, rt, to ) {

	this.ioScript = is; // the url for the io script
	this.queryString;
	this.vp;
	this.reqType = ( rt.toUpperCase == "GET" ) ? "GET" : "POST";
	this.timeout = to * 1000; // ms to elapse before io is considered dead
	this.currentVar = "";
	this.currentChildren = new Array();
	this.currentChild = 0;

	this.setIOTimeout = function ( t ) {
		this.timeout = t;
	};

	this.getIOTimeout = function () {
		return this.timeout;
	};

	this.setScript = function ( s ) {
		this.ioScript = s;
	};

	this.getScript = function () {
		return this.ioScript;
	};

	this.getQueryString = function () {
		return this.queryString;
	};

	this.nodeTypeToString = function ( n ) {
		switch( n ) {
			case 1: return "ELEMENT"; break;
			case 2: return "ATTRIBUTE"; break;
			case 3: return "TEXT"; break;
			case 4: return "CDATA_SECTION"; break;
			case 5: return "ENTITY_REFERENCE"; break;
			case 6: return "ENTITY"; break;
			case 7: return "PROCESSING_INSTRUCTION"; break;
			case 8: return "COMMENT"; break;
			case 9: return "DOCUMENT"; break;
			case 10: return "DOCUMENT_TYPE"; break;
			case 11: return "DOCUMENT_FRAGMENT"; break;
			case 12: return "NOTATION"; break;
			default: return "UNKNOWN (" + n + ")";
		}
	};

	this.getNode = function ( n ) {
		if( xmlhttp.responseXML )
			if( xmlhttp.responseXML.getElementsByTagName( n ).length )
				return xmlhttp.responseXML.getElementsByTagName( n )[0];
		return null;
	};

	this.getNodeValue = function ( n ) {
		if( xmlhttp.responseXML )
			if( this.getNode( n ).firstChild )
				return this.getNode( n ).firstChild.nodeValue;
		return "";
	};

	this.getNodeAttribute = function ( n, a ) {
		if( xmlhttp.responseXML )
			if( xmlhttp.responseXML.getElementsByTagName( n ).length )
				return xmlhttp.responseXML.getElementsByTagName( n )[0].getAttribute( a );
		return null;
	};

	this.resetNodes = function () {
		this.currentChild = 0;
	};

	this.getNodesCount = function () {
		return this.currentChildren.length;
	};

	this.getNodes = function ( n ) {
		if( this.currentVar != n ) {
			// name is different from the last search, so reset child info
			this.currentVar = n;
			this.currentChildren = xmlhttp.responseXML.getElementsByTagName( this.currentVar );
			this.currentChild = 0;
		}
		// there are multiple children by that name, so return them one at a time
		if( this.currentChild < this.currentChildren.length )
			return this.currentChildren[this.currentChild++];
		else
			return false;
	};

	this.getResponseXML = function () {
		return xmlhttp.responseXML;
	};

	this.getResponseText = function () {
		return xmlhttp.responseText;
	};

	// pass this method just the var=val&var=val string
	// note: don't forget to override the onXXX methods prior!
	this.sendAndLoad = function ( qs ) {
		this.queryString = encodeURI( qs );
		// reset the var getter thing's stuff (trust me, it must be this way)
		this.currentVar = "";
		this.currentChildren = new Array();
		this.currentChild = 0;
		// instantiate the request object
		if( window.XMLHttpRequest ) {
			// code for Mozilla, etc.
			xmlhttp = new XMLHttpRequest();
		} else if( window.ActiveXObject ) {
			// code for IE
			xmlhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
		}
		// if it was instantiated OK
		if( xmlhttp ) {
			xmlhttp.onreadystatechange = onTowerXMLHTTPChangeState;
			onTowerXHRPreSend();
			xmlhttp.open( this.reqType, this.ioScript, true );
			xmlhttp.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
			xmlhttp.send( this.queryString );
			xmlhttpTimer = setTimeout( "onTowerXHRTimeout()", this.timeout );
		}
	}

	this.getVar = function ( n ) {
		var varPairs = new VarPairs( xmlhttp.responseText );
		if( this.reqType == "GET" ) {
			for( var i = 0; i < varPairs.length; i++ )
				if( varPairs[i].name == n )
					return varPairs[i];
		}
		return false;
	};

}
