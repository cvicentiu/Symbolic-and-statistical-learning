/*
 * $Header: /cvs_eng/DestinationSearch/client/dex/web/js/ds_common.js,v 1.21.4.15 2006/10/31 18:16:27 jvinding Exp $
 * Common DS functions
 */
function image_get_src( img ) {
/*@cc_on
    @if (@_win32)
        if( img && typeof img.filters == 'object' && img.filters[0] ) {
            return img.filters[0].src
        } else if( img ) {
    @*/
            return img.src;
    /*@
        }
    @end
@*/
}
function image_set_src( img, src, sizing ) {
/*@cc_on
    @if (@_win32)
        if( src.match( /(.*\/img\/).*\.png(?:;|$)/ ) ) {
            var s = sizing ? ', sizingMethod="' + sizing + '"' : '';
            img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '"' + s + ')';
            img.src = RegExp.$1 + 'pixel_trans.gif';
        } else if (img.src != src) {
    @*/
            img.src = src;
    /*@
        }
    @end
@*/
}

/*
 * Find's the given event's closest table ancestor.
 * Loops through inputs, grabbing checkboxes
 * Passes on to CheckAllHandler
 */
function CheckAll_TblFinder( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var controlCb = e.getCurrentTarget();
    var cbs = new Array();
    var controlContainer = controlCb;

    if( controlContainer.id == "myPlacesCCb" ) {
        controlContainer = document.getElementById( 'mylistTbl' );
    } else if( controlContainer.id == "myItinCCb" ) {
        controlContainer = document.getElementById( 'myitineraryTbl' );
    } else {
        while( controlContainer && controlContainer.tagName.toLowerCase() != 'table' ) {
            controlContainer = controlContainer.parentNode;
        }
    }

    var bodies = controlContainer.getElementsByTagName( 'tbody' );
    for( var i=0; i<bodies.length; i++ ) {
        var inputs = bodies[i].getElementsByTagName( 'input' );
        for( var j=0; j<inputs.length; j++ ) {
            if( inputs[j].type == 'checkbox' ) {
                cbs.push( inputs[j] );
            }
        }
    }
    CheckAllHandler( controlCb, 1, cbs );
}

function CheckAll_LiFinder( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var controlCb = e.getCurrentTarget();
    var cbs = new Array();

    var ul = controlCb;
    while( ul && ul.tagName.toLowerCase() != 'ul' ) {
        ul = ul.parentNode;
    }

    var lis = ul.getElementsByTagName( 'li' );
    for( var i=0; i<lis.length; i++ ) {
        var inputs = lis[i].getElementsByTagName( 'span' )[0].getElementsByTagName( 'input' );
        for( var j=0; j<inputs.length; j++ ) {
            if( inputs[j].type == 'checkbox' && !DOMNode.isClass( inputs[j], 'skip' ) ) {
                cbs.push( inputs[j] );
            }
        }
    }
    CheckAllHandler( controlCb, 1, cbs );
}

function CheckAllHandler( controlCb, doCheck, cbs ) {
    var state = controlCb.checked;

    for( var i=0; i<cbs.length; ++i ) {
        if( doCheck ) {
            // don't call setVar for boxes that are to be unchecked and are already not checked
            if( state == false && !cbs[i].checked ) { continue; }

            // don't remove if boxes are to be checked and box is already checked
            var remove = ( ( state == true && cbs[i].checked ) ? 0 : 1 );

            dsform.setVar( cbs[i].name, cbs[i].value, 1, remove );
            cbs[i].checked = state;
        }
    }

    toggle_behavior( state, controlCb.id );
}

function checkboxes_check_state( id ) {
    var toggleFunc = ( id == 'mapCalloutButtons' ? mapresctrls_toggle_behavior : resultctrls_toggle_behavior );
    var t = document.getElementById( id );
    if( t ) {
        var cbs = t.getElementsByTagName( 'input' );
        for( var i=0; i<cbs.length; ++i ) {
            if( cbs[i].checked ) {
                toggleFunc( true );
                return;
            }
        }
    }
    toggleFunc( false );
}


function error_message_add( msg ) {
    var m = document.getElementById( 'msgErr' );
    var d;
    if( m ) {
        d = DOMNode.getByTagAndClass( m, 'div', 'msgTxt' )
    }
    if(! d ) {
        var h = document.getElementById( 'hdr' );
        if( h && h.nextSibling ) {
            var e = h.nextSibling;
            d = document.createElement( 'div' );
            d.id = 'msgErr';
            d.className = 'msgBox err'
            h.parentNode.insertBefore( d, e );
            d = DOMNode.create( d, '', 'div', 'class', 'msgTxt' );
            DOMNode.create( d, '', 'img', 'src', 'img/misc_error.png', 'alt', lcl.getString( 'js.err' ) );
        }
    }
    if( d ) {
        DOMNode.create( d, msg, 'p', 'class', 'msg' );
        var c = DOMNode.getByTagAndClass( document, 'div', 'callout' );
        for( var i = 0; i < c.length; ++i ) {
            c[i].style.display = 'none'; // other wise firefox doesn't reposition it
            c[i].style.display = 'block';
        }
    }
}

function mapresctrls_toggle_behavior( state ) {
    var d = document.getElementById( 'mapCalloutButtons' );
    if( d ) {
        var as = d.getElementsByTagName( 'a' );
        array_walk( as, function( o ) {
            if( DOMNode.isClass( o, 'addToPlaces' ) || DOMNode.isClass( o, 'addToItinerary' ) ) {
                if( state ) {
                    DSBrowserEvent.removeListener( o, 'click', null_func );
                    DSBrowserEvent.addListener( o, 'click', mylist_add_checked );
                    DOMNode.removeClass( o, 'disabled' );
                    var i = o.getElementsByTagName( 'img' )[0];
                    if( i ) {
                        image_set_src( i, image_get_src( i ).replace( /_dis\./, '.' ) );
                    }
                } else {
                    DSBrowserEvent.removeListener( o, 'click', mylist_add_checked );
                    DSBrowserEvent.addListener( o, 'click', null_func );
                    DOMNode.addClass( o, 'disabled' );
                    i = o.getElementsByTagName( 'img' )[0];
                    if( i ) {
                        image_set_src( i, image_get_src( i ).replace( /(?:_dis)?(\..{3})(?:;|$)/, '_dis$1' ) );
                    }
                }
            }
        } );
    }
}




function resultctrls_toggle_behavior( state ) {
    var d = document.getElementById( 'resultCtrls' );
    if( d ) {
        var as = d.getElementsByTagName( 'a' );
        var newsrc;
        array_walk( as, function( o ) {
            if( DOMNode.isClass( o, 'addToPlaces' ) || DOMNode.isClass( o, 'addToItinerary' ) ) {
                var img = o.firstChild;
                if( state ) {
                    DSBrowserEvent.removeListener( o, 'click', null_func );
                    DSBrowserEvent.addListener( o, 'click', mylist_add_checked );
                    DOMNode.removeClass( o, 'disabled' );
                    if( img && img.tagName == 'IMG' ) {
                        newsrc = image_get_src( img ).replace( '_dis', '' );
                        image_set_src( img, newsrc );
                    }
                } else {
                    DSBrowserEvent.removeListener( o, 'click', mylist_add_checked );
                    DSBrowserEvent.addListener( o, 'click', null_func );
                    DOMNode.addClass( o, 'disabled' );
                    if( img && img.tagName == 'IMG' ) {
                        newsrc = image_get_src( img ).replace( /(?:_dis)?(\..{3})(?:;|$)/, '_dis$1' );
                        image_set_src( img, newsrc );
                    }
                }
            }
        });
    }
}
/* check current state for any checked boxes and set the behavior accordingly */
function mapresctrls_check_state() { return checkboxes_check_state( 'mapCalloutButtons' ); }


/*
 * ad enlarger functionality
 * finds the image that was clicked on (or near the href that was clicked)
 * and loads the large version in a new floating div
 */
function AdEnlarge( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );

    if( e.getCurrentTarget().parentNode ) {
        var img = e.getCurrentTarget().parentNode.getElementsByTagName( 'img' )[0];
        if( img ) {
            var src = image_get_src( img ).replace( /_small|_medium|_thumb/, '_large' );

            // create the actual image
            window.setTimeout( function() {
                var newImg = document.createElement( 'img' );
                DSBrowserEvent.addListener( newImg, 'load', AdEnlargePosition );
                newImg.src = src;
                newImg.galleryImg = 'no'; // to get rid of the IE image tool bar
                newImg.style.position = 'absolute';
            }, 0 );
        }
    }
}
DSLink.addType( 'adEnlarge', AdEnlarge );
/* called when the image created in AdEnlarge fires the load event */
function AdEnlargePosition( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var i = e.getCurrentTarget();
    DSBrowserEvent.removeListener( i, 'load', AdEnlargePosition );

    var m = DOMNode.create( null, '', 'div', 'class', 'adModal' );
    m.style.height = document.documentElement.scrollHeight + "px";
    DSBrowserEvent.addListener( m, 'click', function() { m.parentNode.removeChild( m ) } );

    var ua = navigator.userAgent.toLowerCase();
    if( ua.indexOf( 'msie' ) != -1 && ua.indexOf ( 'win' ) != -1 ) {
        // IE hack to hide the select boxes
        var ifrm = DOMNode.create( m, '', 'iframe' );
        ifrm.style.position = 'absolute';
        ifrm.style.width = '100%';
        ifrm.style.height = '100%';
        ifrm.style.filter = 'alpha(opacity=0)';
    }
    document.getElementsByTagName( 'body' )[0].appendChild( m );

    var d = DOMNode.create( m, '', 'div', 'class', 'adWin' );
    d.appendChild( i );

    var thresh = .85;
    var ww, wh;
    if( window.innerWidth ) {
        ww = window.innerWidth;
        wh = window.innerHeight;
    } else if( document.documentElement && document.documentElement.clientWidth ) {
        ww = document.documentElement.clientWidth;
        wh = document.documentElement.clientHeight;
    } else {
        ww = wh = 0;
    }
    var height = i.height;
    var width = i.width;
    var pctW = ( width  / ww );
    var pctH = ( height / wh );

    // scale the image down if it's too big
    if( pctW > thresh || pctH > thresh ) {
        var top = ( pctW > pctH ? pctW : pctH );
        var factor = 1 - ( top - thresh );
        width  = Math.floor( i.width  *= factor );
        height = Math.floor( i.height *= factor );
    }
    i.width = width; // always have to set height and width for the IE png hack
    i.height = height;
    image_set_src( i, i.src, 'scale' ); // for the IE PNG hack

    // grow container slightly larger than ad image
    d.style.width  = width  + 20 + 'px';
    d.style.height = height + 22 + 'px';

    m.removeChild( d );
    d.style.backgroundColor = '#fffbcb';

    var wrapper = document.createElement( 'div' );
    wrapper.style.position = 'absolute';
    wrapper.style.left = Math.floor( ( ww - width  ) / 2 ) + 'px';
    var tmpTop = Math.floor( ( wh - height ) / 2 );
    if( document && document.documentElement && document.documentElement.scrollTop ) {
        tmpTop += document.documentElement.scrollTop;
    }
    wrapper.style.top = tmpTop + 'px';

    // don't let clicks on the window close itself
    DSBrowserEvent.addListener( wrapper, 'click', null_func );

    var title = document.createElement( 'p' );
    title.style.backgroundColor = '#00729b';
    title.style.margin = 0;
    title.style.textAlign = 'right';
    title.style.marginRight = '-14px';

    // add the closer link
    var c = DOMNode.create( title, lcl.getString( 'js.closewin' ), 'a', 'href', 'javascript:void(0)' );
    DSBrowserEvent.addListener( c, 'click', function() { m.parentNode.removeChild( m ) } );

    var wrapped = new DSShadow( title, d );
    wrapper.appendChild( wrapped );
    m.appendChild( wrapper );

    // finally, show the div
    m.style.visibility = 'visible';
}

/*
* called by events attached to links on both results and map results pages
* used for adding to both my places and my itinerary
*/
function mylist_add_checked( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var ids = new Array();
    var checked = new Array();
    var behaviorId;
    var f = document.getElementById( 'searchResultsForm' ); // for search results page
    if( f ) {
        behaviorId = 'searchResCCb';
    } else {
        f = document.getElementById( 'mapSearchResults' ); // for map results page
        behaviorId = 'mapResCCb';
    }

    if ( f ) {
        var a = f.getElementsByTagName( 'input' );
        for( var i = 0; i < a.length; ++i ) {
            if( a[i].type == 'checkbox' && a[i].name == 'listingId' && a[i].checked ) {
                var info = a[i].value;
                if( typeof listingInfo != 'undefined' && listingInfo[info] ) {
                    info += "|" + listingInfo[info];
                }
                ids.push( info );
                checked.push( a[i] );
            }
        }
    }

    var d, ajaxFunc, type;
    if( e && e.getCurrentTarget() && e.getCurrentTarget().className && DOMNode.isClass( e.getCurrentTarget(), 'addToItinerary' ) ) {
        type = 'Itin';
        d = document.getElementById( 'myItinList' );
        ajaxFunc = mapping.addListingsToItinerary;
    } else {
        type = 'Places';
        d = document.getElementById( 'myPlacesList' );
        ajaxFunc = mapping.addToMyList;
    }

    DOMNode.truncate( d );
    DOMNode.addClass( DOMNode.create( d, lcl.getString( 'js.loading' ), 'p' ), 'load' );

    ajaxFunc( mylist_dwr_callback_factory( type ), ids, null, u.uid, u.ptkn );

    // if we're on the search results page we need to add the "in list" icon if there's not one already
    /*
    if( document.getElementById( 'searchResultsTbl' ) ) {
        array_walk( ids, function( o ) {
            mylist_update_search_results( o );
        } );
    }
    */

    // uncheck the checked checkboxes
    array_walk( checked, function( o ) {
        o.checked = false;
    });

    // uncheck the control cb
    var ccb = document.getElementById( behaviorId );
    if( ccb ) {
        ccb.checked = false;
    }

    // disable the add links
    toggle_behavior( false, behaviorId );

    return true;
}

function mylist_dwr_callback_factory( type ) {
    return function( data ) {
        mylist_dwr_callback( type, data );
    }
}
/*
function mylist_update_search_results( id ) {
    var tb = document.getElementById( 't'+id );

    if( tb && ( DOMNode.getByTagAndClass( tb, 'span', 'inlist' ) ).length == 0 ) {
        var p = tb.getElementsByTagName( 'p' )[0];
        if( p ) {
            var il = document.createElement( 'span' );
            il.appendChild( document.createTextNode( lcl.getString( 'js.inplaces' ) ) );
            DOMNode.addClass( il, 'inlist' );
            p.parentNode.insertBefore( il, p );
        }

        var span = tb.getElementsByTagName( 'span' )[0];
        if( span ) {
            DOMNode.addClass( span, 'inlistNumber' );
        }
        var a = DOMNode.getByTagAndClass( tb, 'a', 'resList' )[0];
        if( a ) {
            a.parentNode.removeChild( a );
        }
    }
}
*/
function mylist_add_one_get_id( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var id = mylist_get_id( e );
    mylist_add_one( id );
}
function myitin_add_one_get_id( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var id = mylist_get_id( e );
    myitin_add_one( id );
}
function mylist_get_id( e ) {
    var id = e.getCurrentTarget().id;
    return id.replace( /^addML/, '' );
}
function mylist_add_one( id ) {
    var d = document.getElementById( 'myPlacesList' );
    if( d ) {
        DOMNode.truncate( d );
        d.style.height = 'auto';
        d.style.visibility = 'visible';
        DOMNode.addClass( DOMNode.create( d, lcl.getString( 'js.loading' ), 'p' ), 'load' );
    }
    mapping.addToMyList( mylist_dwr_callback_factory( 'Places' ), [id], null, u.uid, u.ptkn );
}
function myitin_add_one( id ) {
    var d = document.getElementById( 'myItinList' );
    if( d ) {
        DOMNode.truncate( d );
        d.style.height = 'auto';
        d.style.visibility = 'visible';
        DOMNode.addClass( DOMNode.create( d, lcl.getString( 'js.loading' ), 'p' ), 'load' );
    }
    mapping.addListingsToItinerary( mylist_dwr_callback_factory( 'Itin' ), [id], null, u.uid, u.ptkn );
}
function mylist_add_details_page( evt ) {

    var e = new DSBrowserEventObject( evt, window.event, this );
    var p = new JSVoidParser( e.getCurrentTarget().href );
    var lid = e.getCurrentTarget().id;
    var id = lid.replace( /^addML/, '' ) + "|" + p.getOneValue( 'listingImpressionId' );

    mapping.addToMyList( mylist_dwr_callback_factory( 'Places' ), [id], null, u.uid, u.ptkn );

    var p = e.getCurrentTarget().parentNode;
    var parent = p.parentNode;
    parent.removeChild( p );

    p = document.createElement( 'p' );
    p.id = 'detInList';
    p.appendChild( document.createTextNode( lcl.getString( 'js.inplaces' ) ) );
    parent.appendChild( p );
}



/*
* checkbox functions
*/
/* finds the top-level checkbox container, passing to controlCb_checker */
function controlCb_checkerFinder( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );

    var pNode = e.getCurrentTarget();
    while( pNode && !DOMNode.isClass( pNode, 'cbParent' ) ) {
        pNode = pNode.parentNode;
    }
    controlCb_checker( pNode );
}

function controlCb_checker( node ) {
    if( node && DOMNode.isClass( node,'cbParent' ) ) {
        var controlCb = DOMNode.getByTagAndClass( node, 'input', 'controlCb' )[0];
        var cbs = controlCb_get_checkboxes( node, true );
        var numChecked = 0;

        array_walk( cbs, function( o ) {
            if( !DOMNode.isClass( o, 'controlCb' ) && o.checked ) {
                numChecked++;
            }
        });

        if( numChecked == 0 ) {
            controlCb.checked = false;
            toggle_behavior( false, controlCb.id );
        } else {
            if( numChecked < cbs.length ) {
                controlCb.checked = false;
            } else if( numChecked == cbs.length ) {
                controlCb.checked = true;
            }
            toggle_behavior( true, controlCb.id );
        }
    }
}

function toggle_behavior( state, id ) {
    switch( id ) {
        case 'searchResCCb': resultctrls_toggle_behavior ( state ); break;
        case 'mapResCCb':    mapresctrls_toggle_behavior ( state ); break;
        case 'myPlacesCCb':  myplaces_toggle_behavior    ( state ); break;
        case 'myItinCCb':    myitin_toggle_behavior      ( state ); break;
    }
}


function controlCb_get_checkboxes( cont, trim ) {
    var cbs = array_grep( cont.getElementsByTagName( 'input' ), function( o ) {
        return( o.type == 'checkbox' && ( !trim || !DOMNode.isClass( o, 'controlCb' ) ) );
    })
    return cbs;
}

function RemoveRecentSearches() {
    dsform.go(urls.removeRecentSearches, 1)
}
function RemoveRecentLocations() {
    dsform.go(urls.removeRecentLocations, 1)
}
