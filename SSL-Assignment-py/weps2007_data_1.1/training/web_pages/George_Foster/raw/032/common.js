/*
 * application-independent javascript functions
 * TODO: need to be split out into individual files
 * $Header: /cvs_eng/DestinationSearch/web/js/common.js,v 1.32.4.1 2006/10/27 23:13:30 jvinding Exp $
 */

/*
* replacement functions
*/
if ( !Array.prototype.push ) {
    Array.prototype.push = function() {
        for ( var i=0;i<arguments.length;++i ) {
            this[this.length]=arguments[i];
        }
        return this.length;
    }
}
if ( !Array.prototype.splice ) {
    /*
     * NOTE: this isn't a true splice implementation: it doesn't support
     * replacing items, just deleting them
     */
    Array.prototype.splice = function( offset, length ) {
        var temp = new Array ();
        for ( var i = this.length - 1; i >= 0; --i ) {
            if ( i < offset || i > ( offset + length - 1 ) ) {
                temp[temp.length] = this[i];
            }
            --this.length;
        }
        for ( i = temp.length - 1; i >= 0; --i ) {
            this[this.length] = temp[i];
        }
    }
}
Array.prototype.getUnique = function() {
    var tmpO = new Object();
    var tmpA = new Array();
    for ( var i=0; i<this.length; ++i ) {
        tmpO[this[i]] = 1;
    }
    for ( i in tmpO ) {
        tmpA.push( i );
    }
    return tmpA;
}
if ( typeof( encodeURIComponent ) == 'undefined' ) {
    encodeURIComponent = function( data ) {
        var c = data.split( "" );
        var n = "";
        for ( var i=0; i<c.length; ++i ) {
            switch ( c[i] ) {
                case " ":  n += "%20"; break;
                case '"':  n += "%22"; break;
                case "#":  n += "%23"; break;
                case "$":  n += "%24"; break;
                case "%":  n += "%25"; break;
                case "&":  n += "%26"; break;
                case "+":  n += "%2B"; break;
                case ",":  n += "%2C"; break;
                case "/":  n += "%2F"; break;
                case ":":  n += "%3A"; break;
                case ";":  n += "%3B"; break;
                case "<":  n += "%3C"; break;
                case "=":  n += "%3D"; break;
                case ">":  n += "%3E"; break;
                case "?":  n += "%3F"; break;
                case "@":  n += "%40"; break;
                case "[":  n += "%5B"; break;
                case "\\": n += "%5C"; break;
                case "]":  n += "%5D"; break;
                case "^":  n += "%5E"; break;
                case "`":  n += "%60"; break;
                case "{":  n += "%7B"; break;
                case "|":  n += "%7C"; break;
                case "}":  n += "%7D"; break;
                default:   n += c[i];
            }
        }
        return n;
    }
}
if ( typeof( decodeURIComponent ) == 'undefined' ) {
    decodeURIComponent = function( data ) {
        var c = data.split( "" );
        var n = "";
        for ( var i=0; i<c.length; ++i ) {
            if ( c[i] == "%" ) {
                var decVal = parseInt( data.substring( i+1, i+3 ), 16 );
                n += String.fromCharCode( decVal );
                i += 2;
            } else {
                n += c[i];
            }
        }
        return n;
    }
}
/* End replacement functions */


/* URL class */
/* TODO: accessors for the rest of the stuff */
function Url_QueryExists (key) { return (typeof this.query[key] != 'undefined'); }
function Url_GetQuery (key) { return (this.query[key] ? this.query[key] : ''); }
function Url_GetQueryNames (key) { var a = new Array (); for (var i in this.query) { a.push (i); }; return a;}
function Url_GetParamString (key) { return this.paramString; }
function Url_GetLocation (key) { return this.location; }
function Url_Decode (val) { return decodeURIComponent (val.replace (/\+/g, "%20")); }
/* TODO: this doesn't handle multiple values for the same key */
function Url (url)
{
    var pieces = url.split ('?');
    var p2 = pieces[0].split (';');
    this.query = new Object ();
    this.queryString = '';
    this.anchor = '';
    this.location = p2[0];
    this.paramString = (p2[1] ? p2[1] : '');
    if (pieces[1]) {
        var p3 = pieces[1].split ('#');
        this.queryString = p3[0];
        this.anchor = (p3[1] ? p3[1] : '');
    }
    if (this.queryString) {
        var kvPairs = this.queryString.split (/[&;]/);
        for (var i = 0; i < kvPairs.length; ++i) {
            var kv = kvPairs[i].split ('=');
            this.query[Url_Decode (kv[0])] = Url_Decode (kv[1]);
        }
    }
}
Url.prototype.queryExists = Url_QueryExists;
Url.prototype.getQuery = Url_GetQuery;
Url.prototype.getQueryNames = Url_GetQueryNames;
Url.prototype.getLocation = Url_GetLocation;
Url.prototype.getParamString = Url_GetParamString;
/* End URL class */


/*
 * JSVoidParser
 */
function JSVoidParser( url ) {
    this.url = url
    this.parsed = new Object();
    if( decodeURIComponent( url ).match( /void\(['"](.+)['"]\)/ ) ) {
        var info = RegExp.$1;
        var l = info.split( /\|/ );
        for( var i = 0; i < l.length; ++i ) {
            var d = l[i].indexOf( '=' );
            d = ( d >= 0 ? d : l[i].length - 1 );
            var key = l[i].substring( 0, d );
            var val = l[i].substring( d + 1 );
            this.parsed[key] = val;
        }
    } else {
        this.parsed = null;
    }
}
JSVoidParser.prototype.getOneValue = function( key ) {
    return this.parsed[key] || '';
}
function DSBrowserDetect() {
    this.ua = navigator.userAgent.toLowerCase();
    if( this.check( 'safari' ) ) {
        this.browser = "Safari";
    }  else if( this.check( 'firefox' ) ) {
        this.browser = "Firefox" ;
    } else if( this.check( 'msie' ) ) {
        this.browser = "Internet Explorer";
    } else {
        this.browser = 'Unknown Browser';
    }
    this.isSafari = this.browser == "Safari";
    this.isFirefox = this.browser == "Firefox";
    this.isIE = this.browser == "Internet Explorer";
    this.isIE55 = ( this.isIE && this.check( 'msie 5.5' ) );
}
DSBrowserDetect.prototype.check = function( s ) { return this.ua.indexOf( s ) != -1 };
var DSBrowser = new DSBrowserDetect();

function DSLink () {}
DSLink.linkTypes = new Object();
DSLink.addType = function ( type, func, setup ) {
    if( typeof DSLink.linkTypes[type] != 'undefined' ) {
        alert( 'attempted to redefine link type "' + type + '"' );
    } else {
        DSLink.linkTypes[type] = [ setup, func ];
    }
}
DSLink.addBehaviours = function() {
    array_walk( document.getElementsByTagName( 'a' ), function( o ) {
        var r = String( o.getAttribute( 'rel' ) ).split( ' ' );
        for( var i = 0; i < r.length; ++i ) {
            var t = DSLink.linkTypes[r[i]];
            if( typeof t != 'undefined' ) {
                if( typeof t[0] == 'function' ) {
                    t[0]( o );
                }
                if( typeof t[1] == 'function' ) {
                    DSBrowserEvent.addListener( o, 'click', t[1] );
                }
            }
        }
    } );
    DSLink.linkTypes = null;
}


/*
 * convenience functions
 */
function quotemeta (string)
{
    return string.replace(/(\W)/g, "\\$1");
}
function array_grep (list, func)
{
    var a = new Array ();
    for (var i = 0; i < list.length; ++i) {
        if (func (list[i])) {
            a.push (list[i]);
        }
    }
    return a;
}
function array_walk (list, func)
{
    for (var i = 0; i < list.length; ++i) {
        func (list[i]);
    }
}


function null_func( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    e.preventDefault();
    e.stopPropagation();
}

function PrintPage() {
    if( window.print ) {
        window.print();
    } else {
        alert( lcl.getString( 'js.printerr' ) );
    }
}

function PostLink( evt ) {
    return dsform.postLink( evt );
}
DSLink.addType( 'post', PostLink );
DSLink.addType( 'print', PrintPage );

function Dragable( el, x, y ) {
    this.element = el;
    this.events = new DSEvent();
    this.properties = new Object();

    this.element.style.position = 'absolute';
    this.element.style.zIndex = '1000';

    this.events.registerEvent( 'drop' );

    /* not adding the event handlers as prototype functions so it's easier to remove them */
    var o = this;
    this.mousedown = function( evt ) {
        var e = new DSBrowserEventObject( evt, window.event, this );
        var xy = DOMNode.getOffsets( o.element );
        this.drag( e.getPageX() - xy.x, e.getPageY() - xy.y );
    };
    this.mousemove = function( evt ) {
        var e = new DSBrowserEventObject( evt, window.event, this );
        o.element.style.left = ( e.getPageX() - o.x ) + 'px';
        o.element.style.top = ( e.getPageY() - o.y ) + 'px';
    };
    this.mouseup = function( evt ) {
        var e = new DSBrowserEventObject( evt, window.event, this );
        DSBrowserEvent.removeListener( document, 'mousemove', o.mousemove );
        DSBrowserEvent.removeListener( document, 'mouseup', o.mouseup );
        var obj = {
            mouseX: e.getPageX(),
            mouseY: e.getPageY(),
            x: e.getPageX() - o.x,
            y: e.getPpageY() - o.y
        };
        o.events.triggerEvent( 'drop', obj, o );
    };
    DSBrowserEvent.addListener( this.element, 'mousedown', this.mousedown );
    if( typeof x == 'number' && typeof y == 'number' ) {
        this.drag( x, y );
    }
}
Dragable.prototype.drag = function( x, y ) {
    this.x = x;
    this.y = y;
    DSBrowserEvent.addListener( document, 'mousemove', this.mousemove );
    DSBrowserEvent.addListener( document, 'mouseup', this.mouseup );
}
Dragable.prototype.addEventListener = function( type, func ) {
    this.events.addListener( type, func );
};
Dragable.prototype.setProperty = function( name, val ) {
    return this.properties[name] = val;
};
Dragable.prototype.getProperty = function( name ) {
    return( name && this.properties[name] ? this.properties[name] : "" );
};
Dragable.prototype.destroy = function() {
    DSBrowserEvent.removeListener( this.element, 'mousedown', this.mousedown );
    this.element = null;
    this.mouseup = null;
    this.mousemove = null;
    this.mousedown = null;
    this.events = null;
};
