/*
 * $Header: /cvs_eng/DestinationSearch/client/dex/web/js/search_res.js,v 1.24.4.1 2006/10/27 23:13:30 jvinding Exp $
 * Dex-specific Search results functions
 */

function InitSearchResults() {
    var table = document.getElementById( 'searchResultsTbl' );
    if( table ) {
        var i;
        // checkAll checkbox
        var cbs = controlCb_get_checkboxes( table );
        array_walk( cbs, function( o ) {
            if( DOMNode.isClass( o, 'controlCb' ) ) {
                o.disabled = false;
                DSBrowserEvent.addListener( o, 'click', CheckAll_TblFinder );
            } else {
                DSBrowserEvent.addListener( o, 'click', controlCb_checkerFinder );
            }
        } );
    }

    // compare_checked control
    var c = document.getElementById( 'compareCtrl' );
    if( c ) {
        DSBrowserEvent.addListener( c, 'click', function( evt ) {
            var e = new DSBrowserEventObject( evt, window.event, this );
            document.getElementById( 'searchResultsForm' ).submit();
            e.preventDefault();
        } );
    }

    // resultCtrls links
    resultctrls_check_state();
}
DSInit.addFunction( InitSearchResults );
DSLink.addType( 'fromFlyout', ToggleFromFlyout );
DSLink.addType( 'moreRefine', ToggleMoreLinks );


//* this doesn't actually work the same as FollowLink if there is multiple
//+ arguments in the URL w/ the same name.
function FollowLinkSearchResultsForm( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var url = new Url( e.getCurrentTarget().href );
    var f = document.getElementById( 'searchResultsForm' );
    if( !f ) { return true; }

    var location = url.getLocation();
    var ps = url.getParamString();
    if( ps.length ) {
        location += ';' + ps;
    }
    f.action = location;
    var keys = url.getQueryNames();
    for( var i = 0; i < keys.length; ++i ) {
        if( typeof f[keys[i]] == 'undefined' ) {
            var o = document.createElement( 'input' );
            try { o.type = 'hidden' } catch( e ) {}; // ie5/mac doesn't let you set this property
            o.name = keys[i];
            f.appendChild( o );
        }
        f[keys[i]].value = url.getQuery( keys[i] );
    }
    f.submit();
    e.getCurrentTarget().href = '#'; // safari won't preventDefault
    e.preventDefault();
    return false;
}

/* check current state for any checked boxes and set the behavior accordingly */
function resultctrls_check_state() { return checkboxes_check_state( 'searchResultsTbl' ); }

function ToggleFromFlyout( evt ) {
    var e  = new DSBrowserEventObject( evt, window.event, this );
    var id = e.getCurrentTarget().id.substring( 2 );
    var wrapper = document.getElementById( id );

    if( ! wrapper ) {
        var div = DOMNode.findNextSibling( e.getCurrentTarget(), 'div' );
        if( div && DOMNode.isClass( div, 'fromHelpCont' ) ) {
            var p = div.parentNode;
            div.style.width = '580px';

            // get rid of the div in the document (we'll be re-adding it shortly)
            div.parentNode.removeChild( div );
            div.style.display = 'block';

            var title = document.createElement( 'p' );
            title.style.backgroundColor = '#ff0';
            title.style.margin = 0;
            title.style.textAlign = 'right';
            title.style.marginRight = '-14px';
            DOMNode.addClass( title, 'title' );

            wrapper = document.createElement( 'div' );
            wrapper.style.position = 'absolute';
            wrapper.style.zIndex = 10000;
            DOMNode.addClass( wrapper, 'wrapper' );

            var wrapped = new DSShadow( title, div );
            wrapper.appendChild( wrapped );
            p.appendChild( wrapper );
            DOMNode.addClass( wrapped, 'wrapped' );

            // add the closer link to the title
            var c = DOMNode.create( title, lcl.getString( 'js.closefromwin' ), 'a', 'href', 'javascript:void(0)' );
            DSBrowserEvent.addListener( c, 'click', function() { wrapper.style.display = 'none'; } );

            wrapper.id = id;
            div.style.width = '560px'; // hack to shrink div to fit inside 'wrapped' container
            wrapper.style.minWidth = '580px';

            // wrapped doesn't have the correct offsetHeight until it's display=block
            var topPos = wrapped.offsetHeight + 3;
            var pointy = DSMap.createImage( 'img/from_pointer.png', wrapped, 546, topPos, 500, 30, 25, '', '' );
            pointy.id = 'pointy';
        }
    }

    // position the wrapper
    var el = e.getCurrentTarget();
    var xPos = 0;
    var yPos = 0;

    while( el ) {
        xPos += el.offsetLeft;
        yPos += el.offsetTop;
        el = el.offsetParent;
    }
    wrapper.style.left = ( xPos - 580 ) + e.getCurrentTarget().offsetWidth + 'px';
    wrapper.style.top  = ( yPos - 90 ) + 'px';

    // get the state before hiding all
    var state = ( wrapper.style.display == 'block' ? true : false );

    // hide all flyouts
    FromHideAll();

    if( ! state ) {
        wrapper.style.display = 'block';

        topPos = wrapper.style.top.replace( 'px', '' );
        // everyone but safari uses document.documentElement.scrollTop
        scrollTop = (   document.documentElement.scrollTop
                      ? document.documentElement.scrollTop
                      : (   document.body.scrollTop
                          ? document.body.scrollTop
                          : 0
                        )
                    );

        if( topPos < scrollTop ) {
            window.scrollTo( window.scrollX, (topPos - 20 ) );
        }
    }
}

function FromHideAll() {
    var divs = DOMNode.getByTagAndClass( document, 'div', 'wrapper' );
    array_walk( divs, function( o ) {
        o.style.display = 'none';
    } );
}


function ToggleMoreLinks( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var d = document.getElementById( 'moreTerms' );

    if( d && e && e.getCurrentTarget() && e.getCurrentTarget().firstChild && e.getCurrentTarget().firstChild.nodeValue ) {
        var newstate = ( d.style.display == 'block' ? 'none' : 'block' );
        var spans    = e.getCurrentTarget().parentNode.getElementsByTagName( 'span' );
        d.style.display = newstate;

        if( newstate == 'block' ) {
            e.getCurrentTarget().firstChild.nodeValue = lcl.getString( 'js.less' );
            spans[0].appendChild( document.createTextNode( '\xab' ) );
            spans[1].removeChild( spans[1].firstChild );
        } else {
            e.getCurrentTarget().firstChild.nodeValue = lcl.getString( 'js.more' );
            spans[0].removeChild( spans[0].firstChild );
            spans[1].appendChild( document.createTextNode( '\xbb' ) );
        }
    }
}
