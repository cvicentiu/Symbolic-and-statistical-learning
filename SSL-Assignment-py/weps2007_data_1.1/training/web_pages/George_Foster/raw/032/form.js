/*
 * DS functions
 * $Header: /cvs_eng/DestinationSearch/web/js/form.js,v 1.12.4.1 2006/10/27 23:13:30 jvinding Exp $
 */


/*
 * global
 */
function DSForm() {
    this.action = '';
    this.params = new Object();
    this.method = 'post';
}

DSForm.prototype.getAction = function() {
    return this.action;
}
DSForm.prototype.setAction = function( action ) {
    this.action = action;
}
DSForm.prototype.setMethod = function( method ) {
    this.method = method;
}
DSForm.prototype.setPostCallback = function( callback ) {
    this.postCallback = callback;
}

DSForm.prototype.setVar = function( name, val, append, remove ) {
    var added = 0;

    // create the array if it doesn't exist
    if( ! this.params[name] ) { this.params[name] = new Array(); }

    if( this.params[name] ) {
        var cur = -1;

        // find the index of the given k/v pair
        for( var i=0; i<this.params[name].length; ++i ) {
            if( this.params[name][i] == val ) { cur = i; }
        }

        if( cur > -1 ) {
            if( remove ) {
                this.params[name].splice( cur, 1 );

                // remove empty array
                if( this.params[name].length == 0 ) { delete this.params[name]; }

                return;
            } else {
                // don't add duplicate n/v pairs
                return;
            }
        }

        // only modify an existing-named param if append it set
        if( append != '1' ) {
            this.params[name] = new Array();
            this.params[name].push( val );
        }
        added++;
    }

    if( append || !added ) {
        this.params[name].push( val );
    }
}

DSForm.prototype.getVar = function( name ) {
    return( this.params[name] ? this.params[name] : new Array() );
}

/* submitType should be:
 * 0 - normal
 * 1 - norefresh
 * 2 - send sessionid manually
 */
DSForm.prototype.submit = function( submitType ) {
    var url;
    var f = DOMNode.create( document.getElementsByTagName( 'body' )[0], '', 'form', 'action', this.action, 'method', this.method );
    f.style.display = 'none';

    for( var i in this.params ) {
        for( var j=0; j<this.params[i].length; ++j ) {
            DOMNode.create( f, '', 'input', 'name', i, 'value', this.params[i][j] );

            // build up a string of param k/v pairs for norefresh use
            if( submitType == 1 ) { url += i + "=" + this.params[i][j] + "&"; }
        }
    }

    if( submitType == 1 ) {
        // append the sessionId, since IE doesn't send cookies with image requests
        (document.createElement( 'img' ) ).src = this.action + ";jsessionid=" + u.sid + "?" + url + "noresponse=1";
    } else if( submitType == 2 ) {
        f.action = this.action + ";jsessionid=" + u.sid;
        f.submit();
    } else {
        f.submit();
    }
}

/*
 * dsform.go takes any number of name and val parameters (after action and submitType)
 * now can tage a uri fragment ('#')
 */
DSForm.prototype.go = function( action, submitType, name, val ) {
    var frag;

    for( var i=2; i<arguments.length; i++ ) {
        if( arguments[i] == '#' ) {
            frag = arguments[++i];
            continue;
        }
        this.setVar( arguments[i], arguments[++i] );
    }

    if( action ) {
        this.setAction( frag ? action + '#' + frag : action );
    }
    this.submit( submitType );
    return false;
}

/*
 *
 */
DSForm.prototype.postUrl = function( url ) {
    var u = new Url( url );
    var location = u.getLocation();
    var ps = u.getParamString();
    if( ps ) {
        location += ';' + ps;
    }
    var keys = u.getQueryNames();
    for( var i=0; i<keys.length; ++i ) {
        this.setVar( keys[i], u.getQuery( keys[i] ) );
    }

    if( this.postCallback ) {
        location = this.postCallback( location );
    }

    this.go( location, 0 );
}

/*
 * parse a the href of a clicked link and submit it as a form
 * with all the other params already in the form
 */
DSForm.prototype.postLink = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    if( e.getAltKey() || e.getCtrlKey() ) {
        return true;
    }
    var t = e.getCurrentTarget() || e.getTarget();
    while( t.nodeName != 'A' && t.parentNode ) { t = t.parentNode; }
    this.postUrl( t.href );
    if( DSBrowser.isSafari ) {
        t.href = '#'; // safari won't preventDefault
    }
    e.preventDefault();
    return false;
}

/*
 * copy the given form's properties into our own form
 */
DSForm.prototype.copy = function( form ) {
    if( form.action ) { this.setAction( form.action ); }
    var dsform = this;
    array_walk( form.elements, function( o ) {
        dsform.setVar( o.name, o.value );
    } );
}
