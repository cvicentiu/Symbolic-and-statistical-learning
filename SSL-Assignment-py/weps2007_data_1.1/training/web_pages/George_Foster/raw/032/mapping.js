/*
 * Methods for: com.aptas.etosha.web.mapping.DwrMappingControllerImpl
 * $Id: mapping.js,v 1.1.4.2 2006/08/14 16:44:42 jconrad Exp $
 */

var mapping = new Object();
var path = urls.dwr;

mapping.getLocations = function( type, callback, cat, lat, lng, radius, uid, ptkn ) {
    if( type == 'related' ) {
        mapping.getRelateds( callback, cat, lat, lng, radius, uid, ptkn );
    } else if ( type == 'poi' ) {
        mapping.getPois( callback, cat, lat, lng, radius, uid, ptkn );
    } else if ( type == 'myplaces' ) {
        mapping.getNearbySavedLocations( callback, lat, lng, radius, uid, ptkn );
    }
}
mapping.getRelateds = function( callback, cat, lat, lng, radius, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'getRelateds', cat, lat, lng, radius, uid, ptkn );
}
mapping.getPois = function( callback, cat, lat, lng, radius, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'getPois', cat, lat, lng, radius, uid, ptkn );
}
mapping.getNearbySavedLocations = function( callback, lat, lng, radius, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'getNearbySavedLocations', lat, lng, radius, uid, ptkn );
}
mapping.getMapSearchData = function( callback, offset, relateds, pois, categorySearch, compareSearch, compareIds, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'getMapSearchData', offset, categorySearch, compareSearch, compareIds, uid, ptkn );
}
mapping.addToMyList = function( callback, listingIds, savedLoc, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'addToMyList', listingIds, savedLoc, uid, ptkn );
}
mapping.addListingsToItinerary = function( callback, listingIds, savedLoc, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'addListingsToItinerary', listingIds, savedLoc, uid, ptkn );
}
mapping.reorderItineraryPlaces = function( callback, placeIds, movementType, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'reorderItineraryPlaces', placeIds, movementType, uid, ptkn );
}
mapping.editListingNote = function( callback, id, note, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'editListingNote', id, note, uid, ptkn );
}
mapping.saveSavedLocation = function( callback, id, name, address, note, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'saveSavedLocation', id, name, address, note, uid, ptkn );
}
mapping.saveSavedLocationLatLng = function( callback, id, name, address, lat, lng, note, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'saveSavedLocation', id, name, address, lat, lng, note, uid, ptkn );
}
mapping.removeSavedLocations = function( callback, ids, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'removeSavedLocations', ids, uid, ptkn );
}
mapping.getSearchCount = function( callback, what, latitude, longitude, distance, businessName, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'getSearchCount', what, latitude, longitude, distance, businessName, uid, ptkn );
}
mapping.setVisitorPreference = function( callback, key, value, uid, ptkn ) {
    DWREngine._execute( callback, path, 'mapping', 'setVisitorPreference', uid, ptkn, key, value );
}
mapping.getRouteImageUrl = function( callback, shapeData, routeArea, boundingArea, zoomLevel ) {
    DWREngine._execute( callback, path, 'mapping', 'getRouteImageUrl', shapeData, routeArea, boundingArea, zoomLevel, u.uid, u.ptkn );
};

