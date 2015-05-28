/*
 * Init functions
 * $Id: smallmap_poi.js,v 1.1.2.3 2006/12/04 21:08:22 jvinding Exp $
 * $URL: https://chow/DestinationSearch/ds-core-web/trunk/src/main/webapp/js/smallmap_poi.js $
 */

function DSSmallMapIcon( point, iconSrc, zIndex ) {
    this.init( point, iconSrc, zIndex );
}
DSSmallMapIcon.prototype = new DSIcon();
DSSmallMapIcon.superclass = DSIcon.prototype;
DSSmallMapIcon.prototype.init = function ( point, iconSrc, zIndex ) {
    this._setSize( iconSrc );
    DSSmallMapIcon.superclass.init.call( this, point, iconSrc, this.width, this.height, zIndex );
    this.addEventListener( 'mouseover', DSSmallMapIcon.showAddress );
    this.addEventListener( 'mouseout', DSSmallMapIcon.hideAddress );
    this.addEventListener( 'click', function() { dsform.postUrl( urls.viewMap ) } );
};

DSSmallMapIcon.hideAddress = function( e, poi ) {
    var d = document.getElementById( 'smallMapAddr' );
    DOMNode.truncate( d );
    d.appendChild (document.createTextNode( lcl.getString( 'js.smallmapinstr' ) ) );
}
DSSmallMapIcon.showAddress = function( e, poi ) {
    var d = document.getElementById( 'smallMapAddr' );
    DOMNode.truncate( d );
    var c = DOMNode.create( d, '', 'dl', 'class', 'addrBlock' );
    DOMNode.create( c, poi.getProperty( 'name' ), 'dt' );

    var a;
    if( ( a = poi.getProperty( 'address' ) ) ) {
        DOMNode.create( c, a, 'dd', 'class', 'addr' );
    }
    if( ( a = poi.getProperty( 'city' ) ) ) {
        DOMNode.create( c, a, 'dd', 'class', 'city' );
    }
    if( ( a = poi.getProperty( 'state' ) ) ) {
        DOMNode.create( c, a, 'dd', 'class', 'state' );
    }
    if( ( a = poi.getProperty( 'zip' ) ) ) {
        DOMNode.create( c, a, 'dd', 'class', 'zip' );
    }
}

function DSSmallMapIcon_SetSize( iconSrc ) {
    var offset;
    if( iconSrc.match( /map_icon_(\d+)/ ) ) {
        offset = RegExp.$1;
    }
    if( offset && offset >= 100 ) {
        this.width  = '34';
        this.height = '29';
    } else {
        this.width  = '24';
        this.height = '27';
    }
}

DSSmallMapIcon.prototype._setSize = DSSmallMapIcon_SetSize;
