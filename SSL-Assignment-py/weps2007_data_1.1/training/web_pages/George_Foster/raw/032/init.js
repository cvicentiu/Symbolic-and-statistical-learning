/*
 * $Header: /cvs_eng/DestinationSearch/web/js/init.js,v 1.29.4.1 2006/10/27 23:13:30 jvinding Exp $
 * Init functions
 */


function DSInit() {}

DSInit.initFunctions = new Array ();

DSInit.addFunction = function( func, pri ) {
    pri = pri || 50;
    var f = DSInit.initFunctions;
    var i = f.length - 1;
    while( i >= 0 && f[i][1] > pri ) --i;
    f.splice( i + 1, 0, [ func, pri ] );
}
/*
 * Init function, called when page is done loading
 */
DSInit.Init = function() {
    // quit if this function has already been called
    if (arguments.callee.done) return;

    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;

    var err = null;

    for( var i = 0; i < DSInit.initFunctions.length; ++i ) {
        try {
            DSInit.initFunctions[i][0]();
        } catch( e ) {
            if( ! err ) {
                err = e;
            }
        }
    }
    DSInit.initFunctions = null;  // clean up to free up some memory

    try {
        DSLink.addBehaviours();
    } catch( e ) {
        if( ! err ) {
            err = e;
        }
    }
    if( err ) {
        throw( err );
    }
}


/*
 * window.onload replacement
 * calls init function when the DOM tree is loaded and parsed
 */

// moz
if( document.addEventListener ) {
    document.addEventListener( "DOMContentLoaded", DSInit.Init, null );
}

// IE
/*@cc_on
    @if (@_jscript_version >= 5.6)
       document.write( "<script defer src='" + urls.ieInit + "'><"+"/script>" );
    @end
@*/

// everyone else
window.onload = DSInit.Init;
