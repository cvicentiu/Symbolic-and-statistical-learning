function splash_onload() {

    var frame = document.getElementById( "splash-frame" );

    if ( frame == null ) {
        window.alert( "unable to find frame" );
        return;
    }
    
    var doc = frame.contentWindow.document;

    var messages = doc.getElementById( "splash-messages" );

    //var messages = doc.documentElement.firstChild;
    //window.alert( messages.nodeName );
    
    var potential_messages = messages.childNodes;

    var known_messages = new Array();

    for( var i = 0; i < potential_messages.length; ++i ) {

        var current = potential_messages.item( i );

        if ( current.nodeName == 'DIV' ) {
            known_messages[known_messages.length] = current;
        }

    }

    var splash_visited = getCookie( "splash_visited2" );

    var index = 0;

    if ( splash_visited == 'true' )
        index = Math.floor( Math.random() * known_messages.length );    

    var result = known_messages[index];

    //get the parent from the target document.
    var parent_div = document.getElementById( "splash-message" );

    //now update the HTML in the target.
    parent_div.innerHTML = result.innerHTML;
    
    setCookie( "splash_visited2", "true" );

}

/**
 * Sets a Cookie with the given name and value.
 *
 * name       Name of the cookie
 * value      Value of the cookie
 * [expires]  Expiration date of the cookie (default: end of current session)
 * [path]     Path where the cookie is valid (default: path of calling document)
 * [domain]   Domain where the cookie is valid
 *              (default: domain of calling document)
 * [secure]   Boolean value indicating if the cookie transmission requires a
 *              secure transmission
 */
function setCookie(name, value, expires, path, domain, secure) {
    document.cookie= name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

/**
 * Gets the value of the specified cookie.
 *
 * name  Name of the desired cookie.
 *
 * Returns a string containing value of specified cookie,
 *   or null if cookie does not exist.
 */
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return unescape(dc.substring(begin + prefix.length, end));
}
