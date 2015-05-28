/*
 * DS functions
 * $Header: /cvs_eng/DestinationSearch/client/dex/web/js/functions.js,v 1.26.4.12 2007/01/10 20:44:11 jvinding Exp $
 */


/*
 * globals
 */
var map;
var smallAd, largeAd;

function HelpOpenWindow( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var url = e.getCurrentTarget().href;
    var body = document.getElementsByTagName( 'body' )[0];
    var w = body.offsetWidth * .75;
    var h = window.open( url, 'helpWindow', 'location=no,scrollbars=yes,toolbar=yes,menubar=no,status=no,buttons=no,resizable=yes,width=' + w );
    h.moveTo( self.screen.width/4, 0 );
    e.preventDefault();
    return false;
}

function GetCheckBoxValue( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var c = e.getCurrentTarget();
    dsform.setVar( c.name, c.value, 1, 1 );
}

function CityLinkHandler( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    ToggleCityList( e.getCurrentTarget() );
}

function CollapsableLinkHandler( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    ToggleCollapsableList( e.getCurrentTarget() );
}
function ToggleCollapsableList( a ) {
    a.blur();
    var ul = DOMNode.findNextSibling( a, 'ul' );
    if( ul ) {
        if( ul.style.display != 'none' ) {
            ul.style.display = 'none';
            DOMNode.removeClass( a, 'controlLinkAct')
        } else {
            ul.style.display = 'block';
            DOMNode.addClass( a, 'controlLinkAct');
        }
        return( ul.style.display != 'none' );
    }
    return false;
}
function ToggleCityList( a ) {
    if( ToggleCollapsableList( a ) ){
        var ul = DOMNode.findNextSibling( a, 'ul' );
        if( ul ) {
            HideAllCities( ul );
        }
    }
}

function HideAllCities( ul ) {
    var d = document.getElementById( 'homeCities' );
    if( d ) {
        var uls = d.getElementsByTagName( 'ul' );
        array_walk( uls, function( o ) {
            if( typeof ul == 'undefined' || o !== ul ) {
                o.style.display = 'none';
                var a = DOMNode.findPrevSibling( o, 'a' );
                if( a ) { DOMNode.removeClass( a, 'controlLinkAct' ); }
            }
        });
    }
}

function AddRelatedFactory( i ) {
    return function( evt ) { AddRelatedToMap( evt, i ) };
}

function ToFromToggle() {
    var txt = document.getElementById( 'toFromText' );
    var sel = document.getElementById( 'toFromSel' );
    if( sel && txt ) {
        var v = sel.nodeName == 'SELECT' ? sel[sel.selectedIndex].value : sel.value;
        txt.firstChild.nodeValue = ( v == '1,2' ? lcl.getString( 'js.to' ) : lcl.getString( 'js.from' ) ) + ':';
    }
}

/*
 * parent:  should have the desired maximum width set on it
 *        and contain all elems.  Needs to have
 *        overflow: hidden set.
 *
 * elems: one per row of data.  Needs to have
 *        white-space: nowrap set.
 *        Truncatable text needs to be in first text node.
 *
 * maxWidth: if set, used for max elem width; otherwise
 *           maxWidth is calculated automatically
 */
function TruncateLongLines( parent, elems, maxElemWidth ) {
    // get the width of the ellipsis and the maximum elem width
    var dots = document.createElement( 'span' );
    dots.appendChild( document.createTextNode( lcl.getString( 'js.ellipsis' ) ) );
    parent.appendChild( dots );
    var maxTrimmedWidth = maxElemWidth - dots.offsetWidth;
    if( !maxElemWidth ) {
        dots.style.display = 'block';
        maxElemWidth = dots.offsetWidth;
    }
    parent.removeChild( dots );

    for( var i=0; i<elems.length; i++ ) {
        var trimmed = 0;
        var oldDisplay = elems[i].style.display;

        elems[i].style.display = 'inline';

        // find the text node
        var e = elems[i];
        while( e.nodeType != 3 && e.firstChild ) {
            e = e.firstChild;
        }
        if( e.nodeType != 3 ) { continue; }
        var origStr = e.nodeValue;

        // get close
        var numChars = e.nodeValue.length;
        var charWidth = ( elems[i].offsetWidth / numChars );
        var charsAllowed = Math.floor( maxElemWidth/charWidth ) - 2; // - 2 to ensure a buffer

        if( numChars > charsAllowed ) {
            charsAllowed -= 5;  // make room for the dots and the buffer
            if( charsAllowed < 0 ) { charsAllowed = 0; }
            e.nodeValue = e.nodeValue.substring( 0, charsAllowed );
            trimmed++;
        }

        // make sure it's really small enough (incase the string is something like 'WWWWWWWWIIII'
        while ( e.nodeValue != '' &&
                ( ( trimmed && elems[i].offsetWidth > maxTrimmedWidth ) ||
                  elems[i].offsetWidth > maxElemWidth ) ) {
            e.nodeValue = e.nodeValue.substring( 0, e.nodeValue.length - 1 );
            trimmed++;
        }

        elems[i].style.display = oldDisplay;

        if( trimmed ) {
            e.parentNode.title = origStr;
            e.nodeValue += lcl.getString( 'js.ellipsis' );
        }
    }
}

/*
 * Helper function for truncating the result list on map results page
 *   gets width of checkbox/number (preWidth), subtracts from list
 *   width, and passes to TLL
 */
function MapTruncHelper( list, elems ) {
    var pre = DOMNode.getByTagAndClass( list, 'span', 'listPre' )[0];
    var preWidth = ( pre ? pre.offsetWidth : 0 );
    TruncateLongLines( list, elems, ( list.offsetWidth - preWidth ) );
}

function GetIconSet( src ) {
    if( new RegExp( 'map_nodes/([^/]+)/' ).test( src ) ) {
        return RegExp.$1;
    }
    return '';
}
function GetIcon( idx, iconSet ) {
    var i;
    if( parseInt( idx ) == idx ) {
        // idx is a number
        if( ! arguments.callee.letters ) {
            // only setup this array once
            arguments.callee.letters = lcl.getString( 'js.letters' ).split( '' );
        }
        i = idx < arguments.callee.letters.length ? arguments.callee.letters[idx] : 'blank';
    } else if( idx == '' ) {
        i = 'blank';
    } else {
        i = idx.toLowerCase();
    }
    switch( iconSet ) {
        case 'disabled':
        case 'advertiser':
            // valid iconSet
            break;
        case 'POI':
            i = idx;
            break;
        default:
            iconSet = 'default';
    }
    return 'img/map_nodes/' + iconSet + '/map_icon_' + i + '.png';
}

/*
 * looks for listingIds in the form and corresponding checkboxes on the page, and makes them checked.
 * Used when going from results to map page (when both pages have checkboxes)
 */
function CheckCheckedBoxes() {
    var checked = dsform.getVar( 'listingId' );
    var cb;
    for( var i=0; i<checked.length; ++i ) {
        if( ( cb = document.getElementById( 'listing'+checked[i] ) ) ) {
            cb.checked = true;
        }
    }
}
function mylist_get_ul( truncate, type ) {
    var id = ( type
             ? 'my' + type + 'List'
             : 'myPlacesList' );

    var d = document.getElementById( id );
    if( !d ) { return d; }

    var ul = d.getElementsByTagName( 'ul' )[0];
    if( !ul || truncate ) {
        DOMNode.truncate( d );
        ul = document.createElement( 'ul' );
        d.appendChild( ul );
    }
    return ul;
}

function mylist_dwr_callback( type, data ) {
    if( type == 'Itin' ) {
        for( var i = 0; i < data.displayMessages.length; ++i ) {
            error_message_add( data.displayMessages[i] );
        }
        var placesUl = mylist_get_ul( 1, 'Places' );
        var itinUl   = mylist_get_ul( 1, 'Itin' );

        if( !u.loggedIn ) {
            DOMNode.create( DOMNode.create( placesUl, '', 'li' ), lcl.getString( 'js.signinplaces' ), 'a', 'href', urls.displaylogin );
        }

        mylist_create_list( placesUl, data.listGroup.listBusinesses, 'id', 'businessName' );
        mylist_create_list( itinUl, data.itinerary.itineraryPlaces, 'placeId', 'name' );
    } else {
        var ul = mylist_get_ul( 1 );

        if( !u.loggedIn ) {
            DOMNode.create( DOMNode.create( ul, '', 'li' ), lcl.getString( 'js.signinplaces' ), 'a', 'href', urls.displaylogin );
        }

        mylist_create_list( ul, data.listBusinesses, 'id', 'businessName' );
    }
}

function mylist_create_list( ul, loopVar, idVar, nameVar ) {
    for( var i = 0; i < loopVar.length; ++i ) {
        var a = DOMNode.create( DOMNode.create( ul, '', 'li' ), loopVar[i][nameVar], 'a',
                'href', urls.detailsSearch + '?detailsListingId=' + loopVar[i][idVar] );
        DSBrowserEvent.addListener( a, 'click', PostLink );
    }
}

/*
 * Populates a where box with the value from an imageMap click
 */
function ImageMapClick( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    dsform.postUrl( e.getCurrentTarget().href );
    e.preventDefault();
}

function InpBoxClick( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    if( e.getCurrentTarget().value == lcl.getString( 'js.addrstr1' ) ||
        e.getCurrentTarget().value == lcl.getString( 'js.addrstr2' ) ) {
        DOMNode.addClass( e.getCurrentTarget(), 'input-box std' );
        e.getCurrentTarget().value = '';
    }
    var newId = ( e.getCurrentTarget().id == 'workAddress'
                ? 'workManual'
                : 'homeManual');

    var inp = document.getElementById( newId );
    if ( inp ) { inp.checked = true; }
}

function mywww_toggle_sm( evt, effect ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var type = e.getTarget().id.match (/^my(Places|Itin)Title$/)[1];

    var d = document.getElementById( 'my' + type + 'List' );
    if (d) {
        if( effect.elem === e.getTarget() ) {
            // original effect.elem is the title bar; reset to actual content div
            effect.elem = d;
        }
        var on = ( effect.elem.offsetHeight == 0 ? 0 : 1 );
        var img;
        if( on ) {
            effect.shadeUp();
            img = 'img/icon_plus_small.gif';
        } else {
            effect.shadeDown();
            img = 'img/icon_minus_small.gif';
        }
        e.getTarget().style.backgroundImage = 'url('+img+')';
    }
}

/*
 *
 */
function RefineSelectSubmit( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    if( typeof omniture_refine == 'function' ) { omniture_refine( e ); }
    var form = e.getCurrentTarget().form;
    if( form ) {
        dsform.copy( form );
        dsform.go( '', 0 );
    }
}
/* my recent searches */
function recent_remove_all( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    dsform.go( urls.removeRecentSearches, 1 );
    /** @TODO: DSDropDown */
    var rs;
    if( (rs = document.getElementById( 'recentSearchesContents' )) ) {
        rs.parentNode.removeChild( rs );
    }
    e.preventDefault();
    if( DOMNode.isClass( e.getCurrentTarget(), 'myRecentRemove' ) ) {
        myrecent_toggle_behavior( false );
    }
    return false;
}
