function splash_subscribe_onload() {

    // 1.  Assert that we're on a permalink apge

    if ( document.location.href.indexOf( "/posts/" ) == -1 )
        return;
    
    // 2.  Assert that we're coming from google/yahoo

    if ( document.referrer == null )
        return;

    var ref = document.referrer;
        
    if ( ref.indexOf( "google." ) == -1 &&
         ref.indexOf( "technorati.com" ) == -1 &&
         ref.indexOf( "search.yahoo.com" ) == -1 &&
         ref.indexOf( "search.live.com" ) == -1 &&
         ref.indexOf( "aolsearch" ) == -1 &&
         ref.indexOf( "websearch.cnn.com" ) == -1 &&
         ref.indexOf( "search.sympatico.msn.ca" ) == -1 &&
         ref.indexOf( "search.msn.com" ) == -1 ) {

        //this is not a search engine...
        return;

    }

    var frame = document.getElementById( "splash-subscribe-frame" );

    var doc = frame.contentWindow.document;
    var result = doc.getElementById( "content" );

    //get the parent from the target document.
    var parent_div = document.getElementById( "splash-subscribe-body" );

    //now update the HTML in the target.
    parent_div.innerHTML = result.innerHTML;
    
}
