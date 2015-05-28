/*
 * $Header: /cvs_eng/DestinationSearch/client/dex/web/js/initdex.js,v 1.24.4.9 2007/01/10 20:44:11 jvinding Exp $
 * Init functions
 */
function BindEvent( object, func ) {
    return function( e ) { func( object, e ) };
}

/* init js links on the home page */
function InitHome() {
    var d = document.getElementById( 'homeCities' );
    if( d ) {
        var as = DOMNode.getByTagAndClass( d, 'a', 'controlLink' );
        array_walk( as, function( o ) {
            DSBrowserEvent.addListener( o, 'click', CityLinkHandler );
        } );
        HideAllCities();
    }
    if( ( d = document.getElementById( 'servicesLink' ) ) ) {
        DSBrowserEvent.addListener( d, 'click', CollapsableLinkHandler );
        ToggleCollapsableList( d );
    }
}

function InitNoCity() {
    var _map = document.getElementById( 'stateImgMap' );
    if( _map ) {
        var areas = _map.getElementsByTagName( 'area' );
        for( var i=0; i<areas.length; ++i ) {
            DSBrowserEvent.addListener( areas[i], 'click', ImageMapClick );
        }
    }
}

function InitUInfo() {
    var d = document.getElementById( 'uinfoCont' );
    if( d ) {
        // focus the first field
        var field = document.getElementById( 'emailAddress' );
        if( field ) {
            field.focus();
        }

        var c = document.getElementById( 'cancel' );
        if( c ) {
            DSBrowserEvent.addListener( c, 'click', function( evt ) {
                var e = new DSBrowserEventObject( evt, window.event, this );
                dsform.go( urls.back );
                e.preventDefault();
                return false;
            } );
        }
    }
}

function InitMyWWWSm() {
    var d = document.getElementById( 'myPlacesTitle' );
    if( d ) {
        var eff1 = new Effect( d );
        DSBrowserEvent.addListener( d, 'click', function( e ) { mywww_toggle_sm( e, eff1 ) } );
    }
    d = document.getElementById( 'myItinTitle' );
    if( d ) {
        var eff2 = new Effect( d );
        DSBrowserEvent.addListener( d, 'click', function( e ) { mywww_toggle_sm( e, eff2 ) } );
    }
}
function RefineCatSubmit( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    if( typeof omniture_refine == 'function' ) { omniture_refine( e ); }
    e.getCurrentTarget().form.submit();
}
function InitRefine() {
    var d = document.getElementById( 'refine' );
    if( d ) {
        var sels = d.getElementsByTagName( 'select' );
        array_walk( sels, function( o ) {
            if( o.className == 'relatedCats' ) {
                DSBrowserEvent.addListener( o, 'change', RefineCatSubmit );
            } else {
                DSBrowserEvent.addListener( o, 'change', RefineSelectSubmit );
            }
        } );
    }
}

function InitMyPlaces() {
    var d = document.getElementById( 'myplaces' );
    if( d ) {
        var as = DOMNode.getByTagAndClass( d, 'a', 'noteTog' );
        array_walk( as, function( o ) {
            var cls = ( DOMNode.isClass( o, 'edit' ) ? 'edit' : 'add' );
            DSBrowserEvent.addListener( o, 'click', function() { NoteToggle( o.parentNode, cls ) } );
        } );

        as = DOMNode.getByTagAndClass( d, 'input', 'noteSub' );
        array_walk( as, function( o ) {
            if( DOMNode.isClass( o, 'save' ) ) {
                var id   = o.id.substring( 1 );
                var type = ( DOMNode.isClass( o, 'location' ) ? 'location' : 'business' );
                DSBrowserEvent.addListener( o, 'click', function() { NoteSubmit( o.parentNode, 1, id, type ) } );
            } else if( DOMNode.isClass( o, 'cancel' ) ) {
                DSBrowserEvent.addListener( o, 'click', function() { NoteSubmit( o.parentNode, 0 ) } );
            }
        } );
    }
}



/*
 * Init function, called when page is done loading
 */
DSInit.addFunction( function() {
    var d, a, i;
    array_walk( DOMNode.getByTagAndClass( document, 'a', 'myRecentRemove' ), function( o ) {
        DSBrowserEvent.addListener( o, 'click', recent_remove_all );
    } );

    if( ( d = document.getElementById( 'detailsTbl' ) ) ) {
        if( ( d = d.getElementsByTagName( 'td' )[0] ) ) {
            if( ( d = DOMNode.getByTagAndClass( d, 'a', 'addToList' )[0] ) ) {
                DSBrowserEvent.addListener( d, 'click', mylist_add_details_page );
            }
        }
    }

} );
DSInit.addFunction( InitNoCity );
DSInit.addFunction( InitUInfo );
DSInit.addFunction( InitMyWWWSm );
DSInit.addFunction( InitHome );
DSInit.addFunction( InitRefine );
DSInit.addFunction( InitMyPlaces );

function launchHelpMovie( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var url = e.getCurrentTarget().href;
    var h = window.open( url, 'helpWindow', 'location=no,scrollbars=no,toolbar=no,resizable=no,width=650,height=450' );
    h.focus();
    e.preventDefault();
    return false;
}
DSLink.addType( 'helpMovie', launchHelpMovie );

