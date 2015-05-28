/*
 * $Header: /cvs_eng/DestinationSearch/client/dex/web/js/omniture.js,v 1.22.4.11 2007/01/11 23:00:28 jvinding Exp $
 */

function omniture_click( link, linkName ) {
    s.tl( link, 'o', linkName );
}

function omniture_click_listen( link, linkName ) {
    DSBrowserEvent.addListener( link, 'click', function () {
        omniture_click( link, linkName );
    } );
}

function omniture_listing_click_through( evt ) {
    var t;
    var e = new DSBrowserEventObject( evt, window.event, this );
    var a = e.getCurrentTarget();
    s.events = s.linkTrackEvents = 'event8';
    s.linkTrackVars = 'prop13,eVar22,eVar24,eVar25,eVar1,products,events';

    var p = new JSVoidParser( a.href );
    if( p.parsed ) {
        t = p.getOneValue( 'advertiserType' );
        s.products = p.getOneValue( 'products' );
        s.eVar1 = p.getOneValue( 'inRegion' );
        s.prop13 = p.getOneValue( 'listingImpressionId' );
        s.eVar25 = p.getOneValue( 'headingId' );
    } else if( a.href ) {
        var u = new Url( a.href );
        t = u.getQuery( 'advertiserType' );
        s.products = u.getQuery( 'products' );
        s.eVar1 = u.getQuery( 'inRegion' );
        s.prop13 = u.getQuery( 'listingImpressionId' );
        s.eVar25 = u.getQuery( 'headingId' );
    } else {
        return;
    }
    switch( t ) {
        case 'FR':
            s.eVar24 = 'A';
            break;
        case 'FA':
            s.eVar24 = '5';
            break;
        case 'PP':
            s.eVar24 = 'P';
            break;
        case 'trade':
            s.eVar24 = 'T';
            break;
        case 'FR':
            s.eVar24 = 'A';
            break;
        case 'LL':
            s.eVar24 = 'L';
            break;
        default:
            s.eVar24 = 'B';
    }
    switch( a.className ) {
        case 'specials':
            s.eVar22 = 'Specials';
            break;
        case 'fastfacts':
            s.eVar22 = 'Fast Facts';
            break;
        case 'video':
            s.eVar22 = 'Video';
            break;
        case 'addToMyPlaces':
        case 'addToPlaces':
            s.eVar22 = 'Add Listing to My Places';
            break;
        case 'addToItinerary':
            s.eVar22 = 'Add Listing to My Itinerary';
            break;
        case 'adenl':
            s.eVar22 = 'YP Ad Viewer';
            break;
        case 'businessWebsite':
            s.eVar22 = 'Website Link to Business';
            break;
        case 'emailBusiness':
            s.eVar22 = 'Email Link to Business';
            break;
        case 'mapDirections':
            s.eVar22 = 'Map/Directions';
            break;
        case 'compare':
            s.eVar22 = 'Selected for Compare';
            break;
        default:
            s.eVar22 = '';
    }
    if( s.eVar22 == '' ) {
        switch( a.id ) {
            case 'detailsPrint':
                s.eVar22 = 'Business Profile Print';
                break;
            case 'detailsEmail':
                s.eVar22 = 'Email Listing to Friend';
                break;
            case 'moreListings':
                s.eVar22 = 'More Listings link';
                break;
        }
    }
/* TODO:
            s.eVar22 = 'Full Business Profile';
            s.eVar22 = 'Basic Business Profile';
*/
/* TODO: if not off BP page
            s.eVar23
*/
    omniture_click( a, 'listing_click_thru' );
}
/* called from RefineSelectSubmit() */
function omniture_refine( e ) {
    var sel = e.getCurrentTarget();
    var l = DOMNode.findPrevSibling( sel, 'label' );
    if( l ) {
        s.eVar20 = DOMNode.findFirstTextChild( l ).nodeValue;
    }
    refineLabel = sel.options[sel.selectedIndex].firstChild.nodeValue;
    refineTerm = refineLabel.substring( 0, refineLabel.lastIndexOf( " " ) );
    s.eVar21 = refineTerm;
    s.events = s.linkTrackEvents = 'event7';
    s.linkTrackVars = 'prop12,eVar20,eVar21,events';
    omniture_click( sel, 'refinements' );
}
function omniture_compare_sort( e ) {
    var sel = e.getCurrentTarget();
    var sort = sel.options[sel.selectedIndex].firstChild.nodeValue;
    var ln;
    if( /business name/i.test( sort ) ) {
        ln =  'compare_sort_by_name';
    } else if( /category/i.test( sort ) ) {
        ln = 'compare_sort_by_category';
    } else if ( /distance/i.test( sort ) ) {
        ln =  'compare_sort_by_distance';
    }
    if( ln != '' ) {
        omniture_click( sel, ln );
    }
}


/*
 * attach to links
 * [ 'htmlId', 'linkName' ]
 */
var omniture_links_by_id = [
    [ 'logoLink', 'home_from_logo' ],

    [ 'hdrLogin', 'log_in_at_top_of_page' ],
    [ 'hdrLogout', 'log_out_at_top_of_page' ],
    [ 'hdrHelp', 'help_at_top_of_page' ],

    [ 'footCopyright', 'copyright' ],
    [ 'footUsage', 'web_site_use_agreement' ],
    [ 'footContact', 'contact_us' ],
    [ 'footGeoSearch', 'geography_search' ],
    [ 'footPrivacy', 'privacy_policy' ],
    [ 'footAboutDex', 'about_dex' ],
    [ 'footAccount', 'my_account' ],
    [ 'footHome', 'home_link_in_footer' ],
    [ 'footHelp', 'help_in_footer' ],
    [ 'footAdvertise', 'awd_link_footer' ],

    [ 'specialsPrint', 'print_specials' ],
    [ 'detailsMapPrint', 'print_map' ],
    [ 'directionsPrint', 'print_driving_directions' ],
    [ 'itinPrint', 'print_itinerary_directions' ],
    [ 'mydexPrint', 'print_mydex' ],
    [ 'comparePrint', 'print_compare_businesses' ],
    [ 'resultsPrint', 'print_search_results' ],
    [ 'resultsMapPrint', 'print_search_results_on_map' ],
    [ 'adprint', 'print_YPA' ],

    [ 'resultsEmail', 'email_search_results' ],
    [ 'resultsMapEmail', 'email_search_results_on_map' ],
    [ 'directionsEmail', 'email_driving_directions' ],
    [ 'itinEmail', 'email_itinerary_directions' ],
    [ 'detailsMapEmail', 'email_map' ],
    [ 'compareEmail', 'email_compare_businesses' ],

    [ 'homeRecycle', 'recycle_phone_books' ],
    [ 'homeAdvertise', 'awd_link_home_page' ],

    [ 'nameSearch', 'business_name_search' ],

    [ 'detailsEdit', 'profile_edit' ],

    [ 'adprev', 'YPA_previous' ],
    [ 'adnext', 'YPA_next' ],
    /* ad language switching and zooming tracking code is in the adcontroler */

    [ 'poi0', 'map_show_nearby_shopping_centers' ],
    [ 'poi1', 'map_show_nearby_parking' ],
    [ 'poi2', 'map_show_nearby_public_trans' ],
    [ 'poi3', 'map_show_nearby_gas_stations' ],
    [ 'poi4', 'map_show_nearby_wireless_hotspots' ],

    [ 'compareNext', 'compare_next_page' ],
    [ 'comparePrev', 'compare_prev_page' ],
    [ 'sortCategory', 'compare_sort_by_category' ],
    [ 'sortDistance', 'compare_sort_by_distance' ],
    [ 'sortName', 'compare_sort_by_name' ]
];
/* [ 'htmlTag', 'class', 'linkName' ] */
var omniture_links_by_class = [
    [ 'fromLink', 'business_from_distance' ],
    [ 'compareRemoveAll', 'compare_remove_all' ],
    [ 'compareRemove', 'compare_remove_listing' ]
];

var omniture_click_through_link_classes = [
    'specials',
    'fastfacts',
    'video',
    'addToMyPlaces',
    'addToPlaces',
    'addToItinerary',
    'adenl',
    'mapDirections',
    'businessWebsite',
    'emailBusiness',
    'compare'
];
var omniture_click_through_link_ids = [
    'detailsPrint',
    'detailsEmail',
    'moreListings'
];

DSInit.addFunction( function() {
    var o, a;
    for( var i = 0; i < omniture_links_by_id.length; ++i ) {
        o = omniture_links_by_id[i];
        a = document.getElementById( o[0] );
        if( a ) {
            omniture_click_listen( a, o[1] );
        }
    }
    var links = document.getElementsByTagName( 'a' );
    array_walk( links, function( l ) {
        var c = array_grep( omniture_click_through_link_classes, function( o ) {
            return DOMNode.isClass( l, o );
        } );
        if( c.length ) {
            DSBrowserEvent.addListener( l, 'click', omniture_listing_click_through );
        } else {
            c = array_grep( omniture_links_by_class, function( o ) {
                return DOMNode.isClass( l, o[0] );
            } );
            if( c.length ) {
                omniture_click_listen( l, c[0][1] );
            }
        }
    } );
    array_walk( omniture_click_through_link_ids, function( o ) {
        var l = document.getElementById( o );
        if( l ) {
            DSBrowserEvent.addListener( l, 'click', omniture_listing_click_through );
        }
    } );
} );

DSInit.addFunction( function() {
    var t = document.getElementById( 'tabmap' );
    if( t ) {
        var a = t.getElementsByTagName( 'area' );
        for( var i = 0; i < a.length; ++i ) {
            omniture_click_listen( a[i], a[i].className + '_tab' );
        }
    }
} ); // tabs

