/*
 * DS DWR functions
 * /cvs_eng/DestinationSearch/web/js/dwr_functions.js,v 1.126 2006/03/07 23:36:24 jvinding Exp
 */

/*
 * Generic function to add pois to the map
 *  allows data parameter to be either an array of objects or a single object
 *  defer will defer displaying pois until the map image loads
 */
function AddToMap( type, cat, icon, _data ) {
    var poi;
    var data = new Array();
    var fullcat = type+"_"+cat;

    if( _data.length ) {
        data = _data;     // _data is an array of objects
    } else if( _data && _data.name ) {
        data.push( _data ); // _data is a single object
    } else {
        return; // empty
    }

    for( var i = 0; i < data.length; ++i ) {
        poi = new DSPoi( new DSPoint( data[i].latitude, data[i].longitude ), icon ).setProperties( "type", fullcat, "id", data[i].uid, "indexNumber", data[i].indexNumber, "name", data[i].name, "address", data[i].address, "city", data[i].city, "state", data[i].state, "phoneNumber", data[i].phoneNumber);
        map.addObject( poi );
    }
}

/*
 * called by mapping.getLocations() as a callback
 */
function DwrPoiCbFactory( type, cat, icon ) {
    return function( data ) { AddPoisToMap( type, cat, icon, data ) };
}

/*
 * AddPoiToMap recieves a list of MapLocationVO objects from DWR
 * and loops through them, adding them as pois to the map
 */
function AddPoisToMap( type, cat, icon, data ) {
    var poi;
    var fullcat = type+"_"+cat;

    try {
        DOMNode.getByTagAndClass( document.getElementById( type+'Cbs' ), 'input', cat )[0].disabled = false;
    } catch (e) {}

    if (! data || ! data.success) {
        HandleAptasDwrError( data );
    } else {
        AddToMap( type, cat, icon, data.mapLocationVOs );
    }
}

/* called via click event from results_map.jsp */
function AddMyPlacesToMap( evt )   { AddToMapHandlerHelper( evt, 'myplaces' ); }
function AddPoiToMap( evt )        { AddToMapHandlerHelper( evt, 'poi' ); }
function AddRelatedToMap( evt, i ) { AddToMapHandlerHelper( evt, 'related', i ); }

function AddToMapHandlerHelper( evt, type, i ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    /* using e.getTarget() vs. e.getCurrentTarget() here because IE says e.getCurrentTarget() is undefined */
    var c = e.getCurrentTarget() || e.getTarget();

    var state = c.checked;
    var cat = c.className;
    if( state ) {
        c.disabled = true; // disable checkbox; re-enable in dwr callback
    }
    if( type == 'related' ) {
        AddToMapHandler( state, type, cat, i );
    } else {
        AddToMapHandler( state, type, cat );
    }
    if( state ) {
        dsform.setVar( c.name, c.value, type != 'myplaces' )
    } else {
        dsform.setVar( c.name, c.value, 0, 1 )
    }
}
/*
* AddToMapHandler is called from AddToMapHandlerHelper (above).
* It defines the icon and passes the cat and icon off to DWR
*/
function AddToMapHandler( state, type, cat, num ) {
    var fullcat = type+"_"+cat;
    if( state ) {
        // true; checked box
        // TODO: use GetIcon()
        var icon = GetPoiIcon( type, cat, num );
        var ll = map.getCenterPoint();
        //* the map scale is in meters per pixel
        var radius = map.getScale() * ( Math.min( map.width, map.height ) / 2 );
        mapping.getLocations( type, DwrPoiCbFactory( type, cat, icon ), cat, ll.lat, ll.lng, radius, u.uid, u.ptkn );
    } else {
        // false; unchecked box
        var ids = map.objects.getIdsByProperty( 'type', fullcat );
        for( var i = 0; i < ids.length; ++i ) {
            map.removeObject( ids[i] );
        }
    }
}

/*
 * cat is either:
 *   'related', in which case we use num (position in list) to define icon, or
 *   'gas|parking|shopping|transport|wireless', in which case we use that name
 */
function GetPoiIcon( type, cat, num ) {
    var i, s;
    switch( type ) {
        case 'related':
            i = num;
            s = type;
            break;
        case 'poi':
            i = cat;
            s = 'POI';
            break;
        case 'myplaces':
            i = 'my_places';
            s = 'special';
            break;
    }
    return GetIcon( i, s );
}
function AddSavedLocToItin( poi ) {
    var id;
    if( ( id = poi.getProperty( 'id' ) ) ) {
        mapping.addListingsToItinerary( mylist_dwr_callback_factory( 'Itin' ), [], id, u.uid, u.ptkn );
        DSPoi.HideFlyouts();
    }
}

function RemoveSavedLocationCB( data, poi ) {
    // TODO: check for errors?
    map.removeObject( poi );
    mylist_dwr_callback( 'Itin', data );
}
function RemoveSavedLocation( poi ) {
    var id;
    if( ( id = poi.getProperty( 'id' ) ) ) {
        mapping.removeSavedLocations( function( data ) { RemoveSavedLocationCB( data, poi ) }, [id], u.uid, u.ptkn );
    }
}
function HandleAptasDwrError (data) {
    //return; // TODO: is this the right thing to do?

    if (data && ! data.success) {
        dbg.printSeparator("DWR errors");
        dbg.printCode(debug_object_dump_r(data));
    } else {
        dbg.print("No data or no error");
    }
}
