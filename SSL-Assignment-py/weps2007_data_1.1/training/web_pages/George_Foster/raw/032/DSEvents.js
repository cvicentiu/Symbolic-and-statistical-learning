/*
 * $Id: DSEvents.js,v 1.7.4.1 2006/10/27 23:13:30 jvinding Exp $
 * $URL: https://chow/DestinationSearch/ds-core-web/trunk/src/main/webapp/js/DSEvents.js $
 * DD functions
 */

function DSEvent() {
    this.events = {};
}
DSEvent.prototype.registerEvent = function( type ) {
    if( typeof this.events[type] != 'undefined' ) {
        alert( 'Attempt to re-register event type: ' + type );
    } else {
        this.events[type] = [];
    }
};
DSEvent.prototype.triggerEvent = function( type, evt, obj ) {
    if( typeof this.events[type] == 'undefined' ) {
        alert( 'Unknown event: ' + type );
        return false;
    }
    if( typeof evt != 'object' || evt == null ) {
        evt = {};
    }
    evt.eventType = type;

    for( var i = 0; i < this.events[type].length; ++i ) {
        if( this.events[type][i]( evt, obj ) == false ) {
            return false;
        }
    }
    return true;
};
DSEvent.prototype.addListener = function( type, callback ) {
    if( typeof this.events[type] == 'undefined' ) {
        alert( 'attempt to listen to unknown event type: ' + type );
    } else {
        this.events[type].push( callback );
    }
};
DSEvent.prototype.getListeners = function( type ) {
    return this.events[type] || null;
};
/*
 *
 */
function DSEventToken( e, t, f ) {
    this.elem = e;
    this.type = t;
    this.func = f;
}

function DSBrowserEventObject( e, we, fa ) {
    this.event = e || we;
    this.el = fa.element;
}
DSBrowserEventObject.prototype.preventDefault = function() {
    if( this.event.preventDefault != null ) {
        this.event.preventDefault();
    } else if ( this.event.returnValue !== null ) {
        this.event.returnValue = false;
    }
};
DSBrowserEventObject.prototype.getType = function() {
    return this.event.type;
};
DSBrowserEventObject.prototype.getKeyCode = function() {
    return this.event.keyCode;
};
DSBrowserEventObject.prototype.getCharCode = function() {
    return this.event.charCode;
};
DSBrowserEventObject.prototype.getShiftKey = function() {
    return this.event.shiftKey;
};
DSBrowserEventObject.prototype.getCtrlKey = function() {
    return this.event.ctrlKey;
};
DSBrowserEventObject.prototype.getMetaKey = function() {
    return this.event.metaKey;
};
DSBrowserEventObject.prototype.getAltKey = function() {
    return this.event.altKey;
};
DSBrowserEventObject.prototype.getMouseButton = function() {
    var b = this.event.button;

    if( DSBrowserEvent.isIE || DSBrowserEvent.isSafari ) {
        return ( b >= 4 ) ? 1 : ( b >= 2 ) ? 2 : 0;
    }
    return b;
};
DSBrowserEventObject.prototype.getPageX = function() {
    // in cases where a pageY exists, it's good
    if( this.event.pageX ) {
        return this.event.pageX;
    }
    // in IE, pageX = scrollTop + clientX
    if( DSBrowserEvent.isIE ) {
        if( document.documentElement && document.documentElement.scrollTop > 0 ) {
            return this.event.clientX + document.documentElement.scrollTop;
        } else if( document.body != null && document.body.scrollTop > 0 ) {
            return this.event.clientX + document.body.scrollTop;
        } else {
            return this.event.clientX;
        }
    } else {
       // in Konqueror, Opera and iCab, clientY *is* pageY
        return this.event.clientX;
    }
};
DSBrowserEventObject.prototype.getPageY = function( e ) {
    // in cases where a pageY exists, it's good
    if( this.event.pageY ) {
        return this.event.pageY;
    }
    // in IE, add scrollTop to clientY
    if( DSBrowserEvent.isIE ) {
        if( document.documentElement && document.documentElement.scrollTop > 0 ) {
            return this.event.clientY + document.documentElement.scrollTop;
        } else if( document.body != null && document.body.scrollTop > 0 ) {
            return this.event.clientY + document.body.scrollTop;
        } else {
            return this.event.clientY;
        }
    } else {
       // in Konqueror, Opera and iCab, clientY really contains the pageY value
        return this.event.clientY;
    }
};
DSBrowserEventObject.prototype.preventDefault = function() {
   if( this.event.preventDefault != null ) {
      this.event.preventDefault();
   } else if( this.event.returnValue !== null ) {
      this.event.returnValue = false;
   }
};
DSBrowserEventObject.prototype.stopPropagation = function() {
    if( this.event.stopPropagation != null ) {
        this.event.stopPropagation();
    } else if( this.event.cancelBubble !== null ) {
        this.event.cancelBubble = true;
    }
};
DSBrowserEventObject.prototype.getTarget = function() {
    return this.event.target != null ? this.event.target : this.event.srcElement != null ? this.event.srcElement : null;
};
DSBrowserEventObject.prototype.getCurrentTarget = function() {
    return this.event.currentTarget != null ? this.event.currentTarget : this.el;
};

var DSBrowserEvent = {};
DSBrowserEvent.ua = navigator.userAgent.toLowerCase();
DSBrowserEvent.isOpera = ( DSBrowserEvent.ua.indexOf("opera") != -1 );
DSBrowserEvent.isIE = ( DSBrowserEvent.ua.indexOf( 'msie' ) != -1 && ! DSBrowserEvent.isOpera );
DSBrowserEvent.isSafari = ( DSBrowserEvent.ua.indexOf( 'safari' ) != -1 );

DSBrowserEvent.addListener = function( el, t, f ) {
    if( el.addEventListener && !( DSBrowserEvent.isSafari && t == 'dbclick' ) ) {
        el.addEventListener( t, f, false );
    } else {
        // Non-w3c compliant browsers
        // not going to do attachEvent for IE so
        // .removeListener works as expected
        if (!el['on' + t]) {
            el['on' + t] = function( e ) {
            if( t == 'error' )
                if( !e ) e = window.event;
                var fa = el[t + 'Handlers'];
                for( var i = 0; i < fa.length; ++i ) {
                    if( typeof fa[i] == 'function' ) {
                        fa[i]( e );
                    }
                }
            };
            el[t + 'Handlers'] = new Array();
            el[t + 'Handlers'].element = el;
        }
        el[t + 'Handlers'].push( f );
    }

    return new DSEventToken( el, t, f );
};
DSBrowserEvent.removeListener = function( el, t, f ) {
    if( el.removeEventListener && !( DSBrowserEvent.isSafari && t == 'dbclick' ) ) {
        el.removeEventListener( t, f, false );
    } else {
        var fa = el[t + 'Handlers'];
        for( var i = 0; fa && i < fa.length; ++i ) {
            if( fa[i] == f ) {
                fa.splice( i, 1 );
                //TODO: break
            }
        }
    }
};
DSBrowserEvent.bind = function( elem, type, obj, func, arg ) {
    var f = function( evt ) {
	     var e = new DSBrowserEventObject( evt , window.event, this);
	     func.call( obj, e, arg )
    };
    return DSBrowserEvent.addListener( elem, type, f );
};
DSBrowserEvent.remove = function( tok ) {
    DSBrowserEvent.removeListener( tok.elem, tok.type, tok.func );
};
DSBrowserEvent.preventEvent = function( e, t ) {
    return DSBrowserEvent.addListener( e, t, DSBrowserEvent.killEvent );
};
DSBrowserEvent.killEvent = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    e.stopPropagation();
    e.preventDefault();
};
