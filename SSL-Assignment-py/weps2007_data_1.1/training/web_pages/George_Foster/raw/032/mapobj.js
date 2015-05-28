/*
 * DS map object clases
 * /cvs_eng/DestinationSearch/web/js/mapobj.js,v 1.36 2006/03/08 22:25:44 jvinding Exp
 */

/* properties */
function DSMapObject( point, element, xOffset, yOffset, zOffset ) {
    this.init( point, element, xOffset, yOffset, zOffset );
}
DSMapObject.prototype.init = function( point, element, xOffset, yOffset, zOffset ) {
    if( arguments.length > 0 ) {
        this.point = point;
        this.element = element;
        this.xOffset = ( xOffset ? xOffset : 0 );
        this.yOffset = ( yOffset ? yOffset : 0 );
        this.zOffset = ( zOffset ? zOffset : 0 );
    }
    this.properties = new Object();
};
DSMapObject.prototype.addEventListener = function( type, func ) {
    switch( type ) {
        case 'click':
            DSMap.setCursor( this.element, 'pointer' );
        case 'mouseout':
        case 'mouseover':
            if( ! this.events ) {
                this.events = new DSEvent();
            }
            if( ! this.events.getListeners( type ) ) {
                var o = this;
                this.events.registerEvent( type );
                DSBrowserEvent.addListener( this.element, type, function( evt ) {
                    var e = new DSBrowserEventObject( evt, window.event, this );
                    o.events.triggerEvent( type, e, o );
                }, false );
            }
        break;
    }
    this.events.addListener( type, func );
};

DSMapObject.prototype.setProperty = function( name, val ) {
    return this.properties[name] = val;
};
DSMapObject.prototype.setProperties= function() {
    for( var i=0; i<arguments.length; i++ ) {
        this.properties[arguments[i]] = arguments[++i];
    }
    return this;
};
DSMapObject.prototype.getProperty = function( name ) {
    return( name && this.properties[name] ? this.properties[name] : "" );
}
DSMapObject.prototype.update = function() { };
DSMapObject.prototype.remove = function() { };


/* MapObject collection */
function DSMapObject_Iterator( coll, offset ) {
    this.coll = coll;
    this.pos = ( offset ? offset : 0 );
}
function DSMapObject_HasNext() {
    if( this.coll && ( this.pos+1 ) <= this.coll.order.length ) {
        return true;
    }
    this.pos = 0; // reset
    return false;
}
function DSMapObject_Next() {
    return( this.coll.objects[this.coll.order[this.pos++]] );
}
function DSMapObject_GetId() {
    return this.coll.order[this.pos - 1];
}
function DSMapObject_SetIteratorOffset( offset ) {
    this.pos = offset;
}
function DSMapObject_GetIteratorOffset() {
    return this.pos;
}


function DSMapObject_Add( obj ) {
    this.objects[this.currIdx] = obj;
    this.order.push( this.currIdx );
    return this.currIdx++;
}
function DSMapObject_Remove( key ) {
    if( this.objects[key] ) {
        delete this.objects[key]
        for( var i=0; i<this.order.length; ++i ) {
            if( this.order[i] == key ) {
                this.order.splice( i, 1 );
            }
        }
        return true;
    }
    return false;
}
function DSMapObject_RemoveAll() {
    this.objects = new Object();
    this.order = new Array();
    this.currPos = this.currIdx = 0;
}
function DSMapObject_GetByIndex( i ) {
    return this.objects[this.order[i]];
}
function DSMapObject_GetById( id ) {
    return this.objects[id] ? this.objects[id] : null;
}
function DSMapObject_Size() {
    return this.order.length;
}
function DSMapObject_GetByProperty( name, val ) {
    for( var i=0; i<this.order.length; ++i ) {
        if( this.objects[this.order[i]].getProperty( name ) == val ) {
            return this.objects[this.order[i]];
        }
    }
    return null;
}
function DSMapObject_GetIdsByProperty( name, val ) {
    var ids = new Array();
    for( var i=0; i<this.order.length; ++i ) {
        if( this.objects[this.order[i]].getProperty( name ) == val ) {
            ids.push( this.order[i] );
        }
    }
    return ids;
}

function DSMapObject_Collection() {
    this.objects = new Object();
    this.order = new Array();
    this.currPos = this.currIdx = 0;
}
DSMapObject_Collection.prototype.add    = DSMapObject_Add;
DSMapObject_Collection.prototype.remove = DSMapObject_Remove;
DSMapObject_Collection.prototype.getById = DSMapObject_GetById;
DSMapObject_Collection.prototype.getByIndex = DSMapObject_GetByIndex;
DSMapObject_Collection.prototype.size = DSMapObject_Size;
DSMapObject_Collection.prototype.getByProperty = DSMapObject_GetByProperty;
DSMapObject_Collection.prototype.getIdsByProperty = DSMapObject_GetIdsByProperty;
DSMapObject_Collection.prototype.removeAll = DSMapObject_RemoveAll;

DSMapObject_Iterator.prototype.next    = DSMapObject_Next;
DSMapObject_Iterator.prototype.getId   = DSMapObject_GetId;
DSMapObject_Iterator.prototype.hasNext = DSMapObject_HasNext;
DSMapObject_Iterator.prototype.setOffset = DSMapObject_SetIteratorOffset;
DSMapObject_Iterator.prototype.getOffset = DSMapObject_GetIteratorOffset;

/*
 * Icons
 */
function DSIcon( point, iconSrc, xOffset, yOffset, zOffset ) {
    if( arguments.length ) {
        this.init( point, iconSrc, xOffset, yOffset, zOffset );
    }
}
DSIcon.prototype = new DSMapObject();
DSIcon.superclass = DSMapObject.prototype;
DSIcon.prototype.init = function( point, iconSrc, xOffset, yOffset, zOffset ) {
    var icon =  DSMap.createImage( iconSrc );
    DSBrowserEvent.addListener( icon, 'error', DSIcon.ImageError );
    DSIcon.superclass.init.call( this, point, icon, xOffset, yOffset, zOffset );
};
DSIcon.prototype.getIcon = function() { return this.icon; };
/* if the load fails, and the source is not already the default icon, set it to the default */
DSIcon.DEFAULT_ICON = 'img/map_icon_blank.png';
DSIcon.ImageError = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var i = e.getCurrentTarget();
    if( ! DSMap.getImgSrc( i ).match( DSIcon.DEFAULT_ICON ) ) {
        DSMap.setImgSrc( i, DSIcon.DEFAULT_ICON );
    }
}
/*
 * Poly-line
 */
function DSPolyLine( shapePoints, url, routeArea, visibleArea ) {
    this.init( shapePoints, url, routeArea, visibleArea );
}
DSPolyLine.prototype = new DSMapObject();
DSPolyLine.superclass = DSMapObject.prototype;

DSPolyLine.prototype.init = function( shapePoints, url, routeArea, visibleArea ) {
    this.eventsInited = false;
    this.shapePoints = shapePoints;
    this.routeArea = routeArea;
    this.routeRect = null;
    this.setVisibleArea( visibleArea );
    var el;
    if( url ) {
        el = document.createElement( 'img' );
        DSBrowserEvent.addListener( el, 'load', DSPolyLine.ImageLoad );
        DSPolyLine.superclass.init.call( this, this.point, el, 0, 0, -1 );
        this.setLineUrl( url );
        this.url = url;
    } else {
        alert( 'TODO: create poly line element' );
        el = DSMap.createElement( null, 'div', '' );
        DSPolyLine.superclass.init.call( this, this.point, el, 0, 0, -1 );
    }
};

DSPolyLine.prototype.updateCallback = function( data ) {
    if( data.routeUrl ) {
        this.setLineUrl( data.routeUrl );
        this.setVisibleArea( data.visibleRouteArea );
        this.map.positionObject( this );
    }
};
DSPolyLine.prototype.doUpdateLine = function( m ) {
    this.element.style.display = 'none';
    var ur = m.getMapLayerURPoint();
    var ll = m.getMapLayerLLPoint();
    var bound = [ ll.lng, ll.lat, ur.lng, ur.lat ];
    this.center = m.getCenterPoint();
    var o = this;
    mapping.getRouteImageUrl( function( data ) { o.updateCallback( data ) }, this.shapePoints, this.routeArea, bound, m.zoomLevel );
};
DSPolyLine.prototype.updateLine = function( e, m ) {
    if( ! this.center && e.previousCenter ) {
        this.center = e.previousCenter;
    }
    if( e.eventType == 'zoom' && e.previousZoomLevel != m.zoomLevel ) {
        this.routeRect = null; // need to recalculate for this zoom level
        this.doUpdateLine( m );
    } else if( e.eventType == 'recenter' ) {
        var center = this.center;
        var newCenter = m.getCenterPoint();

        var tl = m.gridSystem.getUL( newCenter.lng, newCenter.lat, this.map.width, this.map.height );
        var br = m.gridSystem.getLR( newCenter.lng, newCenter.lat, this.map.width, this.map.height );
        var mapRect = new Rectangle(tl.y, tl.x, br.y, br.x);

        // Lazily calculate the rectangle containing the route and the visible rect.
        if (!this.routeRect) {
            this.routeRect = this.calculateRect(this.routeArea, m);
        }
        if (!this.visibleRect) {
            this.visibleRect = this.calculateRect(this.visibleArea, m);
        }

        // Calculate the intersection with the visible map area
        var routeIntersect = mapRect.intersection(this.routeRect);
        var visibleIntersect = mapRect.intersection(this.visibleRect);

        // If the intsersection of the clipped visible and route rects results in the clipped
        // route rectangle, then the user hasn't scrolled a new portion of the route into view and
        // there is no need to update the line.
        var finalIntersect = routeIntersect.intersection(visibleIntersect);
        if (!routeIntersect.equals(finalIntersect)) {
            this.doUpdateLine( m );
        }
    }
};

DSPolyLine.prototype.calculateRect = function(area, map) {
    var tl = map.gridSystem.toXY(area[0], area[3]);
    var br = map.gridSystem.toXY(area[2], area[1]);
    return new Rectangle(tl.y, tl.x, br.y, br.x);
}

DSPolyLine.prototype.update = function( map ) {
    if( ! this.eventsInited ) {
        this.eventsInited = true;
        this.map = map;
        var o = this;
        map.addEventListener( 'zoom', function( e, m ) { o.updateLine( e, m ) } );
        map.addEventListener( 'recenter', function( e, m ) { o.updateLine( e, m ) } );
    }
};

DSPolyLine.prototype.setVisibleArea = function( a ) {
    this.visibleArea = a;
    this.point = new DSPoint( a[3], a[0] );
    this.visibleRect = null;
};
DSPolyLine.prototype.setLineUrl = function( url ) {
    this.url = url;
/*@cc_on
    @if (@_win32)
        var el = this.element;
        var u = url.split( '?', 2 );
        DSMap.setAlphaImageLoader( el, u[0] + '?' + u[1].replace( /%/g, '%25' ) );
    @else @*/
        this.element.src = url;
    /*@
    @end
@*/
};
DSPolyLine.ImageLoad = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    var i = e.getCurrentTarget();
    i.style.display = 'block';
};

function Rectangle(top, left, bottom, right) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
}

// Calculcates the intersection of this rectangle with the given rectangle.  Stores the result
// in 'dest' and returns the resulting rectangle.  If 'dest' is not given, a new rectangle is
// created and returned.
Rectangle.prototype.intersection = function(r, dest) {
    var x1 = Math.max(this.left, r.left);
    var y1 = Math.max(this.top, r.top);
    var x2 = Math.min(this.right, r.right);
    var y2 = Math.min(this.bottom, r.bottom);

    if (!dest) {
        dest = new Rectangle();
    }

    dest.top = y1;
    dest.left = x1;
    dest.bottom = y2;
    dest.right = x2;

    return dest;
}

// Determines if the given rectangle matches this one exactly.
Rectangle.prototype.equals = function(r) {
    return this.left  == r.left  && this.top    == r.top &&
           this.right == r.right && this.bottom == r.bottom;
}
