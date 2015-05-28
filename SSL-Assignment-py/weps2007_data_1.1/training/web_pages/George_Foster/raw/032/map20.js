/*
 * /cvs_eng/DestinationSearch/web/js/map20.js,v 1.184 2006/03/09 17:32:51 jvinding Exp
 * Configuration Parameters
 */

var DSMapConfig = {
    'background': '#f2f0e1',
    'singleZoom': 3,
    'emptyZoom': 14,
    'defaultLat': 39.73926,
    'defaultLng': -104.98478,
    'defaultLocale': '',

    'imageBase': 'img/',
    'pixelUrl': 'img/pixel_trans.gif',
    'brokenUrl': 'img/map_unavailable.gif',

    'tileBase': 'http://localhost/tiles/',
    'tileExtension': '.png',
    'tileSuffix': '',
    'tileWidth': 256,
    'tileHeight': 256,
    'tileAttempts': 1,

    'slidePixels': 30,
    'slideDelay': 30,

    'standardParallel': 40
};

/**
 * creates a DSPoint
 *
 * @param lat Lattitude of the point
 * @param lng Longitude of the point
 * @return new DSPoint object
 * @constructor
 */
function DSPoint( lat, lng ) {
    this.lat = lat;
    this.lng = lng;
}

/* DSSlider */
/**
 * Creates a vertical slider control for the zoom bar
 *
 * @param map The map this slider is for
 * @param slider The image element for the slider
 * @param thumb The thumb image element
 * @constructor
 */
function DSSlider( slider, thumb ) {
    this.slider = slider;
    this.thumb = thumb;

    this.events = new DSEvent();
    this.events.registerEvent( 'startSlide' );
    this.events.registerEvent( 'slide' );
    this.events.registerEvent( 'endSlide' );

    DSBrowserEvent.bind( this.thumb, 'mousedown', this, this.startSlide );
    DSBrowserEvent.bind( this.slider, 'mousedown', this, this.startSlide );
    DSBrowserEvent.preventEvent( this.slider, 'dblclick' );
    DSBrowserEvent.preventEvent( this.thumb, 'dblclick' );

    this.usableHeight = this.slider.height - this.thumb.height;
    this.top = parseInt( this.slider.style.top );
    this.bottom = this.top + this.usableHeight;
    this.offsetTop = ( DSMap.GetOffsets( this.slider.parentNode ) ).y;
}
DSSlider.prototype.addEventListener = function( type, callback ) {
    this.events.addListener( type, callback );
};
DSSlider.prototype.getPosition = function() {
    var p = ( parseInt( this.thumb.style.top ) - this.top ) / this.usableHeight;
    return p;
};
DSSlider.prototype.setPosition = function( p ) {
    this.thumb.style.top = this.top + Math.round( p * this.usableHeight ) + 'px';
    return p;
};
DSSlider.prototype.endSlide = function() {
    DSBrowserEvent.remove( this.mousemove );
    DSBrowserEvent.remove( this.mouseup );
    this.mousemove = this.mouseup = this.prevY = null;
    this.events.triggerEvent( 'endSlide', { position: this.getPosition() }, this );
};
DSSlider.prototype.startSlide = function( e ) {
    if( e.getMouseButton() == 0 ) {
        var y = e.getPageY();
        this.mousemove = DSBrowserEvent.bind( document, 'mousemove', this, this.slide );
        this.mouseup = DSBrowserEvent.bind( document, 'mouseup', this, this.endSlide );
        if( e.getTarget() == this.slider ) {
            this.thumb.style.top = ( y - this.offsetTop - ( this.thumb.height / 2 ) ) + 'px';
        }
        this.prevY = y - this.thumb.offsetTop - this.offsetTop;
        this.events.triggerEvent( 'startSlide', { position: this.getPosition() }, this );
        e.stopPropagation();
        e.preventDefault();
    }
};
DSSlider.prototype.slide = function( e ) {
    var y = e.getPageY() - this.offsetTop - this.prevY;
    if( y < this.top ) {
        y = this.top;
    }
    if( y > this.bottom ) {
        y = this.bottom;
    }
    this.thumb.style.top = y + 'px';
    this.events.triggerEvent( 'slide', { position: this.getPosition() }, this );
    e.stopPropagation();
    e.preventDefault();
};
/*
 * DSTile
 */
function DSTile( parent ) {
    this.img = DSMap.createElement( parent, 'img', '', 'src', DSMapConfig.pixelUrl, 'style', 'position: absolute;', 'galleryImg', 'no' );
    DSBrowserEvent.addListener( this.img, 'load', DSTile.load );
    DSBrowserEvent.addListener( this.img, 'error', DSTile.error );
}
DSTile.errors = new Object();
DSTile.error = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var i = e.getCurrentTarget();
    if( ! DSTile.errors[i.src] ) {
        DSTile.errors[i.src] = 1;
    }
    if( DSTile.errors[i.src]++ < DSMapConfig.tileAttempts ) {
        var s = i.src;
        i.src = DSMapConfig.pixelUrl;
        i.src = s;
    } else if( ! i.src.match( DSMapConfig.brokenUrl ) ) {
        i.src = DSMapConfig.brokenUrl;
    }
};
DSTile.load = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var i = e.getCurrentTarget();
    i.style.visibility = 'visible';
};

DSTile.prototype.addGridXOffset = function( x ) {
    this.gridX += x;
};
DSTile.prototype.addGridYOffset = function( y ) {
    this.gridY += y;
};
DSTile.prototype.setGridXY = function( x, y ) {
    this.gridX = x;
    this.gridY = y;
};
DSTile.prototype.setSize = function( width, height ){
    this.img.width = width;
    this.img.height = height;
};
DSTile.prototype.getWidth = function() {
    return this.img.width;
};
DSTile.prototype.getHeight = function() {
    return this.img.height;
};
DSTile.prototype.setLeft = function( left ) {
    this.img.style.left = left;
};
DSTile.prototype.setTop = function( top ) {
    this.img.style.top = top;
};
DSTile.prototype.setUrl = function( url ) {
    this.img.style.visibility = 'hidden';
    if( typeof this.img.complete != 'undefined' && ! this.img.complete ) {
        // IE doesn't seem to trigger a load event if you change images before the original image is done loading
        var o = this;
        window.setTimeout( function() { o.setUrl( url ); }, 1000 );
        return;
    }
    if( url ) {
        if( this.img.src != url ) {
            this.img.src = url;
        } else {
            this.img.style.visibility = 'visible';
        }
    } else {
        this.img.src = DSMapConfig.brokenUrl;
    }
};
/**
 * This class is used to figure out the url to a certain tile
 *
 * @param base The base url including a trailing slash
 * @param tileSet e.g. satellite, hybrid, etc.
 * @param extension .png, .jpg, must include the '.'
 * @param locale
 * @param suffix Items to be appended to the url, used to put info in the server logs
 * @constructor
 */
function DSMapTileUrlFactory( base, tileSet, extension, locale, suffix ) {
    this.base = base || '';
    this.tileSet = tileSet || '';
    this.extension = extension || '';
    this.locale = locale || '';
    this.suffix = suffix || '';
    this.post = this.extension + '?' + this.suffix;
    this.setPre();
}
DSMapTileUrlFactory.prototype.setPre = function() {
    this.pre = this.base + ( this.locale.length ? this.locale + '/' : '' );
};

/**
 * Gets the url for a tile
 *
 * @param x The x coordinate of the tile
 * @param y The y coordinate of the tile
 * @param z The zoom level of the tile
 * @return the full url including suffix
 */
DSMapTileUrlFactory.prototype.getUrl = function( x, y, z ) {
    return this.pre + z + '/' + x + '/' + y + this.post;
};
/**
 * Sets the locale for the tiles
 *
 * @param locale
 */
DSMapTileUrlFactory.prototype.setLocale = function( locale ) {
    this.locale = locale;
    this.setPre();
};

/*
 * DSMap
 */
/**
 * Create a DSMap object
 *
 * @param container A pointer to the html element that will contain the map
 * @return A DSMap object
 * @constructor
 */
function DSMap( container ) {
    this.container = container;
    if( ! container ) { throw( 'DSMap: unable to find container: "' + container + '"' ); }

    this.prevX = this.prevY = null;
    this.originPoint = null;
    this.zoomLevel = DSMap.Scales.length;
    this.locale = DSMapConfig.defaultLocale;
    if( ! DSMap.scalesInited ) {
        for (var i = 0; i < DSMap.Scales.length; ++i ) {
            DSMap.Grid[i] = GridSystem.newInstance( DSMap.Scales[i] * DSMapConfig.tileWidth, DSMap.Scales[i] * DSMapConfig.tileHeight, DSMapConfig.tileWidth, DSMapConfig.tileHeight );
        }
        DSMap.scalesInited = true;
    }
    this.year = new Date().getYear();
    if( this.year < 1000 ) this.year += 1900;
    this.copyrightTxt = '\xa9' + this.year + ' Local Matters, Inc.';
    this.setScale();
    this.width = parseInt( this.container.clientWidth );
    this.height = parseInt( this.container.clientHeight );
    this.tileUrlFactory = new DSMapTileUrlFactory( DSMapConfig.tileBase, '', DSMapConfig.tileExtension,
         this.locale, 'w=' + this.width + '&h=' + this.height + DSMapConfig.tileSuffix );
    this.columns = Math.ceil( this.width / DSMapConfig.tileWidth ) + 2;
    this.rows = Math.ceil( this.height / DSMapConfig.tileHeight ) + 2;
    this.mapLayerWidth = this.columns * DSMapConfig.tileWidth;
    this.mapLayerHeight = this.rows * DSMapConfig.tileHeight;
    this.initContainer();
    this.objects = new DSMapObject_Collection();
    this.events = new DSEvent();
    this.events.registerEvent( 'zoom' );
    this.events.registerEvent( 'recenter' );
    this.keyboardEnabled = false;
}
DSMap.prototype.addEventListener = function( type, callback ) {
    this.events.addListener( type, callback );
};
DSMap.prototype.setLocale = function( locale ) {
    this.locale = locale;
    this.tileUrlFactory.setLocale( locale );
};

/*
 * Utility functions
 */
DSMap.GetOffsets = function( el ) {
    var xy = new coord( 0, 0 );
    while( el ){
        xy.x += el.offsetLeft;
        xy.y += el.offsetTop;
        el = el.offsetParent
    }
    return xy;
};
DSMap.getImgSrc = function( img ) {
/*@cc_on
    @if (@_win32)
        if( img && img.filters && img.filters[0] ) {
            return img.filters[0].src
        } else if( img ) {
    @*/
            return img.src;
    /*@
        }
    @end
@*/
};
DSMap.setAlphaImageLoader = function( img, src, sizing ) {
    var s = sizing ? ', sizingMethod="' + sizing + '"' : '';
    img.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + src + '"' + s + ')';
    img.src = 'img/pixel_trans.gif';
};
DSMap.setImgSrc = function( img, src, sizing ) {
/*@cc_on
    @if (@_win32)
        if( src.match( /\.png(;|$)/ ) ) {
            DSMap.setAlphaImageLoader( img, src, sizing );
        } else
    @*/
        if (img.src != src) {
            img.src = src;
        }
    /*@
    @end
@*/
};
DSMap.setCursor = function( el, cursor ) {
    try {
        el.style.cursor = cursor;
    } catch( e ) { /* IE5 */
        if( cursor == 'pointer' ) {
            el.style.cursor = 'hand';
        }
    }
};
DSMap.createElement = function( parent, type, val ) {
    var el;
    if ( !type || type == "text" ) {
        el = document.createTextNode( val );
    } else {
        el = document.createElement( type );
        if ( val ) { el.appendChild( document.createTextNode( val ) ); }

        for ( var i=3; i<arguments.length; i++ ) {
            if( arguments[i] == 'style' && document.all && ! window.opera ) {
                // you can't use setAttribute w/ "style" in IE
                el.style.cssText = arguments[++i];
            } else {
                el.setAttribute( arguments[i], arguments[++i] );
            }
        }
        // TODO: make sure nothing is calling this
        // that doesn't use DSBrowserEvent then kill this line
    }
    if( parent ) {
        parent.appendChild( el );
    }
    return el;
};

DSMap.createImage = function( src, parent, left, top, zIndex, width, height, alt, title ) {
    var style = 'position: absolute;';
    if( typeof left != 'undefined' ) { style += 'left: ' + left + 'px;'; }
    if( typeof top != 'undefined' ) { style += 'top: ' + top + 'px;'; }
    if( typeof zIndex != 'undefined' ) { style += 'z-index: ' + zIndex + ';'; }

    var i = DSMap.createElement( parent, 'img', '', 'galleryImg', 'no', 'style', style,
                                 'title', title ? title : '',
                                 'alt', alt ? alt : '');
    DSMap.setImgSrc( i, src );

    if( width != undefined ) { i.width = width; }
    if( height != undefined ) { i.height = height; }
    return i;
};

/* User interaction */
/**
 * Enables mouse interaction with the map.  In addition to dragging the map
 * this enables double-clicking to recenter the map.
 *
 * This is also called by <code>DSMap.addControls</code>
 */
DSMap.prototype.enableDragging = function() {
    if( ! this.mousedown ) {
        this.mousedown = DSBrowserEvent.bind( this.viewport, 'mousedown', this, this.startDrag );
        this.dblclick = DSBrowserEvent.bind( this.viewport, 'dblclick', this, this.centerOnClick );
    }
};

/**
 * Enables keyboard interaction with the map.
 *
 * This is also called by <code>DSMap.addControls</code>
 */
/*
DSMap.prototype.enableKeyboardControls = function() {
    if( ! this.keyboardEnabled ) {
        this.keyboardEnabled = true;
        DSMap.bindEvent( document, 'keypress', this, DSMap.prototype.keypress );
    }
}
*/

/**
 * Adds the pan and zoom controls to the map
 *
 * Also calls <code>this.enableDragging</code> and <code>this.enableKeyboardControls</code>
 * to enable more user interaction
 *
 * @param type The type of controls to add, defaults to DSMap.LARGE_CONTROLS
 * @param nokb if true keyboard controls are disabled
 */
DSMap.prototype.addControls = function( type, nokb ) {
    if( ! type ) {
        type = DSMap.LARGE_CONTROLS;
    }

    // zoom controls
    var i;
    if( type.zoom ) {
        var t = type.zoom.zoomIn;
        i = DSMap.createImage(  t[0], this.viewport, t[1], t[2], 100 + t[3], t[4], t[5] );
        DSMap.setCursor( i, 'pointer' );
        DSBrowserEvent.bind( i, 'click', this, t[6] );
        DSBrowserEvent.preventEvent( i, 'dblclick' ); // otherwise double-clicking on these controls recenters after panning/zooming

        t = type.zoom.zoomOut;
        i = DSMap.createImage(  t[0], this.viewport, t[1], t[2], 100 + t[3], t[4], t[5] );
        DSMap.setCursor( i, 'pointer' );
        DSBrowserEvent.bind( i, 'click', this, t[6] );
        DSBrowserEvent.preventEvent( i, 'dblclick' ); // otherwise double-clicking on these controls recenters after panning/zooming

        if( type.zoom.slider && type.zoom.thumb ) {
            t = type.zoom.slider;
            var s = DSMap.createImage( t[0], this.viewport, t[1], t[2], 100 + t[3], t[4], t[5] );
            t = type.zoom.thumb;
            i = DSMap.createImage(  t[0], this.viewport, t[1], t[2], 100 + t[3], t[4], t[5] );
            this.zoomSlider = new DSSlider( s, i );
            var o = this;
            this.zoomSlider.addEventListener( 'slide', function( e ) { o.scaleMap( e.position ) } );
            this.zoomSlider.addEventListener( 'startSlide', function( e ) { o.startZoom( e ) } );
            this.zoomSlider.addEventListener( 'endSlide', function( e ) { o.endZoom( e ) } );
        }
    }

    var p = type.misc;
    for( var j = 0; j < p.length; ++j ) {
        i = DSMap.createImage( p[j][0], this.viewport, p[j][1], p[j][2], 100 + p[j][3], p[j][4], p[j][5] );
        DSMap.setCursor( i, 'pointer' );
        if( p[j][6] ) {
            DSBrowserEvent.bind( i, 'click', this, p[j][6] );
        }
        DSBrowserEvent.preventEvent( i, 'dblclick' ); // otherwise double-clicking on these controls recenters after panning/zooming
    }

    this.enableDragging();
    /* FIXME: this messes up text boxes too close to the map in safari
    if( ! nokb ) {
        this.enableKeyboardControls();
    }
    */
};

DSMap.prototype.positionTile = function( i ) {
    var t = this.tiles[i];
    t.setLeft( ( ( i % this.columns ) * t.getWidth() + this.mlOffsetLeft ) + 'px' );
    t.setTop( ( Math.floor( i / this.columns ) * t.getHeight() + this.mlOffsetTop ) + 'px' );
};

DSMap.prototype.scaleMap = function( p ) {
    var lvl =  ( p * ( DSMap.Scales.length - 1 ) ) + 1;
    var intLvl = Math.round( lvl + .5 );
    var decLvl = lvl - intLvl;
    var nl = intLvl - 1 > 0 ? intLvl - 1 : 1;

    var ns = DSMap.Scales[intLvl - 1] + ( (  DSMap.Scales[intLvl - 1] - DSMap.Scales[nl - 1] ) * decLvl );
    if( ns > 0 ) {
        var r = this.scale / ns;
        var th = Math.round( DSMapConfig.tileHeight * r );
        var tw = Math.round( DSMapConfig.tileWidth * r );
        var ol = ( ( Math.abs( this.zooming.leftAdjusted ) + ( this.width / 2 ) ) / DSMapConfig.tileWidth );
        var ot = ( ( Math.abs( this.zooming.topAdjusted ) + ( this.height / 2 ) ) / DSMapConfig.tileHeight );
        this.mapLayer.style.left = Math.round( this.zooming.left + ( ( DSMapConfig.tileWidth - tw ) * ol ) ) + 'px';
        this.mapLayer.style.top = Math.round( this.zooming.top + ( ( DSMapConfig.tileHeight - th ) * ot ) ) + 'px';
        for( var i = 0; i < this.tiles.length; ++i ) {
            this.tiles[i].setSize( tw, th );
            this.positionTile( i );
        }
    }
};
DSMap.prototype.startZoom = function( e ) {
    this.zooming = { mapCenter: this.getCenterPoint(),
                     left: parseInt( this.mapLayer.style.left ),
                     top: parseInt( this.mapLayer.style.top ),
                     leftAdjusted: this.getMapLeft(),
                     topAdjusted: this.getMapTop()
                   };
    this.hideObjects();
    this.scaleMap( e.position );
};
DSMap.prototype.endZoom = function( e ) {
    var p = e.position;
    this.showObjects();
    this.setZoomLevel( Math.round( p * ( DSMap.Scales.length - 1 ) ) + 1, this.zooming.mapCenter );
    this.zooming = null;
};
DSMap.prototype.startDrag = function( e ) {
    if( e.getMouseButton() == 0 ) {
        this.prevX = e.getPageX();
        this.prevY = e.getPageY();
        if( this.mousemove ) {
            DSBrowserEvent.remove( this.mousemove );
        }
        if( this.mouseup ) {
            DSBrowserEvent.remove( this.mouseup );
        }
        this.mousemove = DSBrowserEvent.bind( document, 'mousemove', this, this.drag );
        this.mouseup = DSBrowserEvent.bind( document, 'mouseup', this, this.endDrag );

        this.viewport.style.cursor = 'move';
        this.prepareEventObject();
        e.preventDefault();
        e.stopPropagation();
    }
};

DSMap.prototype.endDrag = function( evt ) {
    DSBrowserEvent.remove( this.mousemove );
    DSBrowserEvent.remove( this.mouseup );
    this.viewport.style.cursor = 'auto';
    this.mousemove = this.mouseup = this.prevX = this.prevY = null;

    var o = this.getEventObject();
    this.events.triggerEvent( 'recenter', o, this );
};
DSMap.prototype.drag = function( e ) {
    var x = e.getPageX();
    var y = e.getPageY();
    var deltaX = this.prevX - x;
    var deltaY = this.prevY - y;
    this.mapLayer.style.left = ( parseInt( this.mapLayer.style.left ) - deltaX ) + 'px';
    this.mapLayer.style.top = ( parseInt( this.mapLayer.style.top ) - deltaY ) + 'px';
    this.checkWrap();

    this.prevX = x;
    this.prevY = y;

    e.stopPropagation();
    e.preventDefault();
};

DSMap.prototype.centerOnClick = function( e ) {
    var xy = DSMap.GetOffsets( this.viewport );
    this.slideBy( ( this.width / 2 ) - ( e.getPageX() - xy.x ), ( this.height / 2 ) - ( e.getPageY() - xy.y ) );
};

/*
DSMap.prototype.keypress = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    if( e.getTarget().nodeName == 'INPUT' || e.getTarget().nodeName == 'TEXTAREA' ) {
        e.stopPropagation();
        return;
    }
    if( e.getAltKey() || e.getCtrlKey() ) {
        // don't interfere with browser commands
        return;
    }
    switch( e.getCharCode() ) {
        case 43: // minus
            this.zoomIn();
            break;
        case 45: // plus
            this.zoomOut();
            break;
        default:
    }
};
*/

DSMap.prototype.prepareEventObject = function() {
    this.beforeEvent = {
        previousZoomLevel: this.zoomLevel,
        previousCenter: this.getCenterPoint()
    };
};
DSMap.prototype.getEventObject = function() {
    var o = this.beforeEvent;
    this.beforeEvent = {};
    o.zoomLevel = this.zoomLevel;
    o.center = this.getCenterPoint();
    return o;
};


/* Zoom Controls */
/**
 * Sets the zoom level, updates the zoom slider (if it exists)
 * and loads and centers the new map
 *
 * @param z zoomlevel
 */
DSMap.prototype.setZoomLevel = function( z, p ) {
    this.prepareEventObject();
    if( z < 1 ) {
        z = 1;
    } else if( z > DSMap.Scales.length ) {
        z = DSMap.Scales.length;
    }
    if( this.zoomSlider ) {
        this.zoomSlider.setPosition( ( ( z - 1 ) / ( DSMap.Scales.length - 1 ) ) );
    }
    this.originPoint = p ? p : this.getCenterPoint();
    this.zoomLevel = z;
    this.setScale();
    this.loadTiles();
    this.events.triggerEvent( 'zoom', this.getEventObject(), this );
};
/**
 * Zooms in 1 level
 */
DSMap.prototype.zoomIn = function() {
    this.setZoomLevel( this.zoomLevel - 1 );
};
/**
 * Zooms out 1 level
 */
DSMap.prototype.zoomOut = function() {
    this.setZoomLevel( this.zoomLevel + 1 );
};
/**
 * Pans and zooms the map so all DSMapObjects are visible
 * If only 1 object exists on the map, the zoom level is set to DSMapConfig.singleZoom
 * If there are no objects on the map, the zoom level is set to DSMapConfig.emptyZoom
 * and the map is centered on DSMapConfig.defaultLat, DSMapConfig.defaultLng
 *
 * @param factor The amount of map that should contain all the objects
 *               This defaults to .9, so the center 90% of the map should contain everything
 */
DSMap.prototype.bestFit = function( factor ) {
    if( typeof factor != 'number' ) {
        factor = .9;
    }
    var p;
    var it = new DSMapObject_Iterator( this.objects );

    if( it.hasNext() ) {
        p = it.next();
        var P = this.gridSystem._P;
        var maxpt = P.forward( radians( p.point.lng ), radians( p.point.lat ) );
        var minpt = new coord( maxpt.x, maxpt.y );

        while( it.hasNext() ) {
            p = it.next();
            var pt = P.forward( radians( p.point.lng ), radians( p.point.lat ) );
            if( pt.x < minpt.x ) minpt.x = pt.x;
            if( pt.x > maxpt.x ) maxpt.x = pt.x;
            if( pt.y < minpt.y ) minpt.y = pt.y;
            if( pt.y > maxpt.y ) maxpt.y = pt.y;
        }

        if( minpt.x == maxpt.x && minpt.y == maxpt.y ) {
            var ll = P.inverse( minpt.x, minpt.y );
            ll.x = degrees( ll.x );
            ll.y = degrees( ll.y );
            this.centerAndZoom( new DSPoint( ll.y, ll.x ), DSMapConfig.singleZoom );
        } else {
            var midll = P.inverse( ( minpt.x + maxpt.x ) / 2.0, ( minpt.y + maxpt.y ) / 2.0 );
            midll.x = degrees( midll.x );
            midll.y = degrees( midll.y );

            var dist_x = maxpt.x - minpt.x;
            var dist_y = maxpt.y - minpt.y;

            var width  = this.width;
            var height = this.height;

            // adjust horizontal distance to figure out the corresponding width radius
            dist_x *= width / height;

            var radius = Math.max( dist_x, dist_y ) / factor;
            for( var i = 0; i < DSMap.Scales.length; ++i ) {
               if( radius <= ( width / DSMap.Grid[i].getXScale() ) ) {
                    break;
                }
            }

            var zoom = Math.min( i, DSMap.Scales.length - 1 );
            var midPoint = new DSPoint( midll.y, midll.x );
            this.centerAndZoom( midPoint, zoom + 1 );
        }
    } else {
        if( DSMapConfig.defaultLat && DSMapConfig.defaultLng && DSMapConfig.emptyZoom ) {
            this.centerAndZoom( new DSPoint( DSMapConfig.defaultLat, DSMapConfig.defaultLng ), DSMapConfig.emptyZoom );
        }
    }
};
/* Pan Controls */
/**
 * Pans north by 45% of the map height
 */
DSMap.prototype.panNorth = function() {
    this.slideBy( 0, 0.45 * this.height );
};
/**
 * Pans north by 45% of the map height and east by 45% of the map width
 */
DSMap.prototype.panNorthEast = function() {
    this.slideBy( -0.45 * this.width, 0.45 * this.height );
};
/**
 * Pans north by 45% of the map height and west by 45% of the map width
 */
DSMap.prototype.panNorthWest = function() {
    this.slideBy( 0.45 * this.width, 0.45 * this.height );
};
/**
 * Pans south by 45% of the map height
 */
DSMap.prototype.panSouth = function() {
    this.slideBy( 0, -0.45 * this.height );
};
/**
 * Pans south by 45% of the map height and east by 45% of the map width
 */
DSMap.prototype.panSouthEast = function() {
    this.slideBy( -0.45 * this.width, -0.45 * this.height );
};
/**
 * Pans south by 45% of the map height and west by 45% of the map width
 */
DSMap.prototype.panSouthWest = function() {
    this.slideBy( 0.45 * this.width, -0.45 * this.height );
};
/**
 * Pans east by 45% of the map width
 */
DSMap.prototype.panEast = function() {
    this.slideBy( -0.45 * this.width, 0 );
};
/**
 * Pans west by 45% of the map width
 */
DSMap.prototype.panWest = function() {
    this.slideBy( 0.45 * this.width, 0 );
};

/**
 * @param p A DSPoint to center the map on
 * @param z The desired zoom level
 */
DSMap.prototype.centerAndZoom = function( p, z ) {
    this.prepareEventObject();
    this.setZoomLevel( z, p );
    var o = this.getEventObject();
    this.events.triggerEvent( 'recenter', o, this );
};
/* * */
DSMap.LARGE_CONTROLS = {
    'zoom': {
        'zoomIn': [ DSMapConfig.imageBase + 'map_zoom_in.png', 35, 96, 0, 24, 23, DSMap.prototype.zoomIn ],
        'zoomOut': [ DSMapConfig.imageBase + 'map_zoom_out.png', 35, 287, 0, 24, 22, DSMap.prototype.zoomOut ],
        'slider': [ DSMapConfig.imageBase + 'map_zoom_slider.png', 35, 121, 0, 24, 162 ],
        'thumb': [ DSMapConfig.imageBase + 'map_zoom_thumb.png', 31, 215, 1, 30, 17 ]
    },
    'misc': [
        [ DSMapConfig.imageBase + 'map_pan_n.png', 36, 10, 0, 19, 27, DSMap.prototype.panNorth ],
        [ DSMapConfig.imageBase + 'map_pan_ne.png', 55, 18, 0, 19, 19, DSMap.prototype.panNorthEast ],
        [ DSMapConfig.imageBase + 'map_pan_nw.png', 17, 18, 0, 19, 19, DSMap.prototype.panNorthWest ],
        [ DSMapConfig.imageBase + 'map_pan_s.png', 36, 56, 0, 19, 29, DSMap.prototype.panSouth ],
        [ DSMapConfig.imageBase + 'map_pan_se.png', 54, 56, 0, 19, 19, DSMap.prototype.panSouthEast ],
        [ DSMapConfig.imageBase + 'map_pan_sw.png', 19, 56, 0, 17, 17, DSMap.prototype.panSouthWest ],
        [ DSMapConfig.imageBase + 'map_pan_e.png', 55, 37, 0, 28, 19, DSMap.prototype.panEast ],
        [ DSMapConfig.imageBase + 'map_pan_w.png', 10, 37, 0 , 26, 19, DSMap.prototype.panWest ],
        [ DSMapConfig.imageBase + 'map_pan_center.png', 36, 37, 0, 19, 19, DSMap.prototype.bestFit ]
    ]
};

/* * */
/**
 * Set the copyright notice on the map
 * The data vendor copyright notice cannot be changed
 *
 * @param copyrightStr The copyright notice to use
 */
DSMap.prototype.setCopyright = function( copyrightStr ) {
    this.copyrightLayer.firstChild.nodeValue = this.copyrightTxt = copyrightStr;
};

/* * */
DSMap.prototype.getScale = function() {
    return this.scale;
};
DSMap.prototype.setScale = function() {
    this.scale = DSMap.Scales[this.zoomLevel - 1];
    this.gridSystem = DSMap.Grid[this.zoomLevel - 1];
};
DSMap.prototype.positionMap = function() {
    if( this.originPoint ) {
        var xy = this.getXYByPoint( this.originPoint );
        this.mapLayer.style.left = Math.round( ( this.width / 2 ) - xy.x ) + 'px';
        this.mapLayer.style.top = Math.round( ( this.height / 2 ) - xy.y  ) + 'px';
    }
};

DSMap.prototype.updateTiles = function() {
    for( var i = 0; i < this.tiles.length; ++i ) {
        this.tiles[i].setSize( DSMapConfig.tileWidth, DSMapConfig.tileHeight );
        this.positionTile( i );
    }
    this.updateDataCopyright();
};
DSMap.prototype.updateMap = function() {
    this.updateTiles();
};
DSMap.prototype.loadTiles = function() {
    this.mlOffsetTop = this.mlOffsetLeft = 0;
    if( this.originPoint ) {
        var tl = this.gridSystem.getUL( this.originPoint.lng, this.originPoint.lat, this.mapLayerWidth, this.mapLayerHeight );
        var br = this.gridSystem.getLR( this.originPoint.lng, this.originPoint.lat, this.mapLayerWidth, this.mapLayerHeight );
        var tlTile = this.gridSystem.grid( tl );
        var brTile = this.gridSystem.grid( br );
        var o = 0;
        for( var i = tlTile.y; i < brTile.y; ++i ) {
            for( var j = tlTile.x; j < brTile.x; ++j ) {
                this.tiles[o].setGridXY( j, i );
                this.tiles[o++].setUrl( this.tileUrlFactory.getUrl( j, i, this.zoomLevel ) );
            }
        }
        this.updateMap();
        this.positionMap();
        /* TODO: maybe I can optimize this by only updating objects that are going to be visible? */
        this.updateObjects();
    }
};

function DSMap_UpdateObjects() {
    for( var it = new DSMapObject_Iterator( this.objects ); it.hasNext(); ) {
        this.positionObject( it.next() );
    }
}
DSMap.prototype.slide = function() {
    if( this.slideSteps.length ) {
        var p = this.slideSteps.shift();
        this.mapLayer.style.left = ( parseInt( this.mapLayer.style.left ) + p[0] ) + 'px';
        this.mapLayer.style.top = ( parseInt( this.mapLayer.style.top ) + p[1] ) + 'px';
        this.checkWrap();

        var o = this;
        this.slideId = window.setTimeout( function() { o.slide() }, DSMapConfig.slideDelay );
    } else {
        o = this.getEventObject();
        this.events.triggerEvent( 'recenter', o, this );
    }
};
DSMap.prototype.slideBy = function( x, y ) {
    if( this.slideId ) {
        window.clearTimeout( this.slideId );
    }
    var maxX = DSMapConfig.tileWidth * 2;
    var maxY = DSMapConfig.tileHeight * 2;
    if( Math.abs( x ) > maxX || Math.abs( y ) > maxY ) {
        var newCenter = this.getPointByXY( this.width / 2 - x, this.height / 2 - y );
        this.centerOnPoint( newCenter );
        return;
    }

    this.slideSteps = new Array();

    var absX = Math.abs( x );
    var absY = Math.abs( y );

    var distance = absX > absY ? absX : absY;
    var steps = Math.floor( distance / DSMapConfig.slidePixels );

    var dx = dy = 0;
    if ( steps > 0 ) {
        dx = Math.floor( absX / steps ) * ( absX > 0 ? ( x / absX ) : 1 );
        dy = Math.floor( absY / steps ) * ( absY > 0 ? ( y / absY ) : 1 );
    }
    // TODO: this isn't quite right.  it pops too far and the end because of the math.floors
    var rx = x - ( dx * steps );
    var ry = y - ( dy * steps );

    while( steps-- ) {
        this.slideSteps.push( [ dx, dy ] );
    }
    if( rx != 0 || ry != 0 ) {
        this.slideSteps.push( [ rx, ry ] );
    }

    var o = this;
    this.slideId = window.setTimeout( function() { o.slide() }, DSMapConfig.slideDelay );
};
// panned too far north, take tiles from the bottom and put them on top
function DSMap_WrapNorth() {
    this.mlOffsetTop -= DSMapConfig.tileHeight;
    for( var i = 0; i < this.columns; ++i ) {
        var t = this.tiles.pop();
        // @TODO: can I remove the concept of a grid from the tiles?
        t.addGridYOffset( -this.rows );
        this.tiles.unshift( t );
        t.setUrl( this.tileUrlFactory.getUrl( t.gridX, t.gridY, this.zoomLevel ) );
    }
    this.updateMap();
}
// panned too far south, take tiles from the top and put them on bottom
function DSMap_WrapSouth() {
    this.mlOffsetTop += DSMapConfig.tileHeight;
    for( var i = 0; i < this.columns; ++i ) {
        var t = this.tiles.shift();
        // @TODO: can I remove the concept of a grid from the tiles?
        t.addGridYOffset( this.rows );
        this.tiles.push( t );
        t.setUrl( this.tileUrlFactory.getUrl( t.gridX, t.gridY, this.zoomLevel ) );
    }
    this.updateMap();
}
// panned too far west, take tiles from the right and put them on left
function DSMap_WrapWest() {
    this.mlOffsetLeft -= DSMapConfig.tileWidth;
    for( var i = this.columns - 1; i < this.tiles.length; i += this.columns ) {
        var t = this.tiles.splice( i, 1 )[0];
        // @TODO: can I remove the concept of a grid from the tiles?
        t.addGridXOffset( -this.columns );
        this.tiles.splice( i - this.columns + 1, 0, t );
        t.setUrl( this.tileUrlFactory.getUrl( t.gridX, t.gridY, this.zoomLevel ) );
    }
    this.updateMap();
}
// panned too far east, take tiles from the left and put them on right
function DSMap_WrapEast() {
    this.mlOffsetLeft += DSMapConfig.tileWidth;
    for( var i = 0; i < this.tiles.length; i += this.columns ) {
        var t = this.tiles.splice( i, 1 )[0];
        // @TODO: can I remove the concept of a grid from the tiles?
        t.addGridXOffset( this.columns );
        this.tiles.splice( i + this.columns - 1, 0, t );
        t.setUrl( this.tileUrlFactory.getUrl( t.gridX, t.gridY, this.zoomLevel ) );
    }
    this.updateMap();
}

function DSMap_CenterOnPoint( p ) {
    this.prepareEventObject();
    this.originPoint = new DSPoint( p.lat, p.lng );
    this.loadTiles();
    var o = this.getEventObject();
    this.events.triggerEvent( 'recenter', o, this );
}
function DSMap_GetXYByPoint( p ) {
    if( this.tiles[0].gridX != null && this.tiles[0].gridY != null ) {
        var x = this.gridSystem.toX( this.tiles[0].gridX );
        var y = this.gridSystem.toY( this.tiles[0].gridY );
        var xy = this.gridSystem.toXY( p.lng, p.lat );
        return new coord( Math.round( xy.x - x ), Math.round( xy.y - y ) );
    }
    return null;
}
DSMap.prototype.getPointByMapLayerXY = function( x, y ) {
    if( this.tiles[0].gridX != null && this.tiles[0].gridY != null ) {
        var xy = this.gridSystem.toLL( this.gridSystem.toXY( this.tiles[0].gridX, x, this.tiles[0].gridY, y ) );
        return new DSPoint( xy.y, xy.x )
    }
    return null;
};
DSMap.prototype.getPointByXY = function( x, y ) {
    return this.getPointByMapLayerXY( x - this.getMapLeft(), y - this.getMapTop() );
};
DSMap.prototype.getCenterPoint = function() {
    return this.getPointByXY( Math.floor( this.width / 2 ), Math.floor( this.height / 2 ) );
};
DSMap.prototype.getMapLayerLLPoint = function() {
    var p = this.getCenterPoint();
    var xy =  this.gridSystem.getLL( p.lng, p.lat, this.mapLayerWidth, this.mapLayerHeight );
    var ll = this.gridSystem.toLL( xy.x, xy.y );
    return new DSPoint( ll.y, ll.x );
};
DSMap.prototype.getMapLayerURPoint = function() {
    var p = this.getCenterPoint();
    var xy =  this.gridSystem.getUR( p.lng, p.lat, this.mapLayerWidth, this.mapLayerHeight );
    var ll = this.gridSystem.toLL( xy.x, xy.y );
    return new DSPoint( ll.y, ll.x );
};

function DSMap_CheckWrap() {
    var self = this;
    window.setTimeout( function() {
        var l = self.getMapLeft();
        var t = self.getMapTop();
        var tw2 = DSMapConfig.tileWidth / 2;
        var th2 = DSMapConfig.tileHeight / 2;

        if( t > -th2 ) {
            self.wrapNorth();
        } else if ( ( t + self.mapLayerHeight - self.height ) < th2 ) {
            self.wrapSouth();
        }
        if( l > -tw2 ) {
            self.wrapWest();
        } else if ( ( l + self.mapLayerWidth - self.width ) < tw2 ) {
            self.wrapEast();
        }
    }, 0 );
}

/* Map Object Related methods */
DSMap.prototype.positionObject = function( obj ) {
    var xy = this.getXYByPoint( obj.point );
    if( xy ) {
        obj.element.style.left = ( xy.x - obj.xOffset + this.mlOffsetLeft ) + 'px';
        obj.element.style.top = ( xy.y - obj.yOffset + this.mlOffsetTop ) + 'px';
        obj.update( this );
    }
};

/**
 * Add an object to the map
 *
 * @param obj A DSMapObject
 * @return An object id
 */
DSMap.prototype.addObject = function( obj ) {
    var id = this.objects.add( obj );
    this.mapLayer.appendChild( obj.element );
    obj.element.style.position = 'absolute';
    obj.z = 5 + obj.zOffset;
    obj.element.style.zIndex = obj.z;
    this.positionObject( obj );
    return id;
};
/**
 * Remove an object from the map
 *
 * @param o The id of the object to be removed or a reference to the object itself
 */
DSMap.prototype.removeObject = function( o ) {
    var id = -1;
    if( typeof o == 'object' ) {
        for( var it = new DSMapObject_Iterator( this.objects ); it.hasNext(); ) {
            var i = it.next();
            if( i === o ) {
                id = it.getId();
                break;
            }
        }
    } else {
        id = o;
    }
    var obj = this.objects.getById( id );
    if( obj ) {
        this.mapLayer.removeChild( obj.element );
        obj.remove( this );
        this.objects.remove( id );
    }
};

/**
 * Remove all objects from the map
 *
 * @param obj A DSMapObject
 */
DSMap.prototype.removeAll = function() {
    var o;
    for( var it = new DSMapObject_Iterator( this.objects ); it.hasNext(); ) {
        o = it.next();
        o.element.parentNode.removeChild( o.element );
    }
    this.objects.removeAll();
};

function DSMap_ShowObjects() {
    for( var it = new DSMapObject_Iterator( this.objects ); it.hasNext(); ) {
        var o = it.next();
        o.element.style.visibility = 'visible';
    }
}
function DSMap_HideObjects() {
    for( var it = new DSMapObject_Iterator( this.objects ); it.hasNext(); ) {
        var o = it.next();
        o.element.style.visibility = 'hidden';
    }
}
/*
 *
 */
DSMap.prototype.updateDataCopyright = function() {
    if( ! this.dataLayer ) {
        this.dataLayer = DSMap.createElement( this.viewport, 'div', '', 'style', 'position: absolute; bottom: 0; z-index: 100; font-size: 10px; ' + ( this.width >= 250 ? 'right' : 'left' ) + ': 0' );
        this.dataLayerText = DSMap.createElement( this.dataLayer, 'text', '' );
    }
    var dp;
    var ll = this.getCenterPoint();
    if( ll && ll.lng > -10 && ll.lng < 180 ) {
        dp = 'TeleAtlas';
    } else {
        dp = 'NAVTEQ';
    }
    this.dataLayerText.nodeValue = '\xa9' + this.year + ' ' + dp;
};
DSMap.prototype.addCopyright = function() {
    this.copyrightLayer = DSMap.createElement( this.viewport, 'div', this.copyrightTxt, 'style', 'position: absolute; left: 0; z-index: 100; font-size: 10px; bottom: ' +  ( this.width >= 250 ? 0 : '10px' ) );
    this.updateDataCopyright();
};

function DSMap_GetMapLeft() {
    return parseInt( this.mapLayer.style.left ) + this.mlOffsetLeft;
}
function DSMap_GetMapTop() {
    return parseInt( this.mapLayer.style.top ) + this.mlOffsetTop;
}

DSMap.prototype.initContainer = function() {
    this.viewport = DSMap.createElement( this.container, 'div', '', 'style', 'overflow: hidden; position: relative; background-color: ' + DSMapConfig.background + '; width: ' + this.width + 'px; height: ' + this.height + 'px' );

    this.mapLayer = DSMap.createElement( this.viewport, 'div', '', 'style', 'position: absolute; top: 0; left: 0; z-index: 1; width: ' + this.mapLayerWidth + 'px; height: ' + this.mapLayerHeight + 'px'  );
    this.tileLayer = DSMap.createElement( this.mapLayer, 'div', '', 'style', 'position: absolute; top: 0; left: 0; z-index: 1; width: 100%; height: 100%' );

    this.tiles = new Array();
    for( var i = 0; i < this.rows; ++i ) {
        for( var j = 0; j < this.columns; ++j ) {
            this.tiles.push( new DSTile( this.tileLayer ) );
        }
    }
    this.mlOffsetTop = this.mlOffsetLeft = 0;
    this.addCopyright();
};

DSMap.Scales = [ 1.7021276, 3.4042553, 6.80851064, 13.61702128, 27.23404256, 54.46808512, 108.93617024, 217.87234048, 435.74468096, 871.48936192, 1742.97872384, 3485.95744768, 6971.9148953, 13943.82979072 ]
DSMap.Grid = new Array();
DSMap.scalesInited = false;

DSMap.prototype.centerOnPoint = DSMap_CenterOnPoint;
DSMap.prototype.updateObjects = DSMap_UpdateObjects;

DSMap.prototype.hideObjects = DSMap_HideObjects;
DSMap.prototype.showObjects = DSMap_ShowObjects;

DSMap.prototype.getXYByPoint = DSMap_GetXYByPoint;
DSMap.prototype.wrapNorth = DSMap_WrapNorth;
DSMap.prototype.wrapSouth = DSMap_WrapSouth;
DSMap.prototype.wrapWest = DSMap_WrapWest;
DSMap.prototype.wrapEast = DSMap_WrapEast;
DSMap.prototype.checkWrap = DSMap_CheckWrap;

DSMap.prototype.getMapLeft = DSMap_GetMapLeft;
DSMap.prototype.getMapTop = DSMap_GetMapTop;
