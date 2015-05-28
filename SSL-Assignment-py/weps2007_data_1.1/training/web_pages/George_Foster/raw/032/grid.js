/*
 * Copyright 2006 Local Matters, Inc.; all rights reserved.
 * $Header: /cvs_eng/DestinationSearch/web/js/grid.js,v 1.14 2006/03/08 18:30:56 jvinding Exp $
 */

var EQUITORIAL_EARTH_RADIUS_MEAN_METERS = 6.378245e6;
var HALF_PI = Math.PI / 2.0;

// Simple coordinate class
function coord(x, y) {
    this.x = x;
    this.y = y;
}

function radians(deg) { return deg * (Math.PI / 180.0); }
function degrees(rad) { return rad * (180.0 / Math.PI) }

// GridSystem class
function GridSystem(p, x_size, y_size, x_units, y_units, invert_y, origin_lon, origin_lat) {
    this._P = p;
    this._x_grid_size = x_size;
    this._y_grid_size = y_size;
    this._x_upg = x_units;
    this._y_upg = y_units;

    this._invert_y = invert_y;
    this._origin_lon = radians(origin_lon);
    this._origin_lat = radians(origin_lat);

    this.reset();
}

// "Static" method to create a new GridSystem object for a given grid size (meters)
GridSystem.newInstance = function( size_x, size_y, tile_width, tile_height ) {
    return new GridSystem( new EquiRectangularMapProjection( radians(0.0), radians(DSMapConfig.standardParallel) ),
                           size_x,
                           size_y,
                           tile_width,
                           tile_height,
                           true,
                           -180.0,
                           90.0 );
};

GridSystem.prototype.reset = function() {
    var pt = this._P.forward( this._origin_lon, this._origin_lat );
    this._x_translation = - pt.x;
    this._y_translation = - pt.y;
    this._x_scale = (this._x_upg / this._x_grid_size);
    this._y_scale = (this._y_upg / this._y_grid_size) * (this._invert_y ? -1.0 : 1.0);
};

GridSystem.prototype.getXScale = function() {
    return this._x_scale;
}

GridSystem.prototype.getYScale = function() {
    return this._y_scale;
}

/**
* Calculate the x grid number of coordinate.
*
* @param x X coordinate in grid units.
*/
GridSystem.prototype.gridX = function(x) {
    return Math.floor(x / this._x_upg);
};

/**
 * Calculate the y grid number of coordinate.
 *
 * @param y Y coordinate in grid units.
 */
GridSystem.prototype.gridY = function(y) {
    return Math.floor(y / this._y_upg);
};

/**
* Calculate the x/y grid number of coordinate.
*
* @param x X coordinate in map units.
* @param y Y coordinate in map units.
* - or -
* @param pt Coordinate in map units.
*/
GridSystem.prototype.grid = function( x, y ) {
    if( arguments.length == 1 ) {
        var pt = x;
        return new coord( this.gridX( pt.x ), this.gridY( pt.y ) );
    } else {
        return new coord( this.gridX(x), this.gridY(y) );
    }
};

/**
 * Calculate the x offset position within the x grid.
 *
 * @param x X coordinate in grid units.
 */
GridSystem.prototype.offsetX = function(x) {
    return x % this._x_upg;
};

/**
 * Calculate the y offset position within the y grid.
 *
 * @param y Y coordinate in grid units.
 */
GridSystem.prototype.offsetY = function(y) {
    return y % this._y_upg;
};

/**
* Calculate the x/y offset position within the x/y grid.
*
* @param x X coordinate in map units.
* @param y Y coordinate in map units.
*/
GridSystem.prototype.offset = function(x, y) {
    if( arguments.length == 1 ) {
        var pt = x;
        return new coord( this.offsetX( pt.x ), this.offsetY( pt.y ) );
    } else {
        return new coord( this.offsetX( x ), this.offsetY( y ) );
    }
};


// get x grid coordinate of given grid and offset
GridSystem.prototype.toX = function(grid) {
    var offset = ( arguments.length == 2 ? arguments[1] : 0 );
    return (grid * this._x_upg ) + offset;
};

// get y grid coordinate of given grid and offset
GridSystem.prototype.toY = function(grid) {
    var offset = ( arguments.length == 2 ? arguments[1] : 0 );
    return (grid * this._y_upg ) + offset;
};

// get x,y grid coordinate of given grids/offsets
GridSystem.prototype.toXY = function(gridX, offsetX, gridY, offsetY) {
    if( arguments.length == 2 ) {
        var lon = gridX;
        var lat = offsetX;
        var xy = this._P.forward( radians(lon), radians(lat) );
        return new coord( (xy.x + this._x_translation) * this._x_scale,
                          (xy.y + this._y_translation) * this._y_scale );
    } else {
        return new coord( this.toX(gridX, offsetX),
                          this.toY(gridY, offsetY));
    }
};

/**
 * Convert an X/Y grid coordinate to a longitude/latitude.
 *
 * @param x
 * @param y
 * @return the corresponding longitude/latitude coordinate.
 */
GridSystem.prototype.toLL = function(x, y) {
    if( arguments.length == 1 ) {
        y = arguments[0].y;
        x = arguments[0].x;
    }
    var ll =  this._P.inverse( (x / this._x_scale) - this._x_translation,
                               (y / this._y_scale) - this._y_translation );
    ll.x = degrees(ll.x);
    ll.y = degrees(ll.y);
    return ll;
};

/**
 * Calculate the grid coordinate for the upper-left point of an image
 * given the center lon/lat and image dimensions.
 *
 * @param center_lon
 * @param center_lat
 * @param width
 * @param height
 * @return
 */
GridSystem.prototype.getUL = function(center_lon, center_lat, width, height) {
    var xy = this.toXY(center_lon, center_lat);
    if (this._invert_y)
        return new coord( xy.x - (width / 2.0),
                          xy.y - (height / 2.0) );
    else
        return new coord( xy.x - (width / 2.0),
                          xy.y + (height / 2.0) );
};

/**
 * Calculate the grid coordinate for the lower-right point of an image
 * given the center lon/lat and image dimensions.
 *
 * @param center_lon
 * @param center_lat
 * @param width
 * @param height
 * @return
 */
GridSystem.prototype.getLR = function(center_lon, center_lat, width, height) {
    var xy = this.toXY(center_lon, center_lat);
    if (this._invert_y)
        return new coord( xy.x + (width / 2.0),
                          xy.y + (height / 2.0) );
    else
        return new coord( xy.x + (width / 2.0),
                          xy.y - (height / 2.0) );
};

/**
 * Calculate the grid coordinate for the lower-left point of an image
 * given the center lon/lat and image dimensions.
 *
 * @param center_lon
 * @param center_lat
 * @param width
 * @param height
 * @return
 */
GridSystem.prototype.getLL = function(center_lon, center_lat, width, height) {
    var xy = this.toXY(center_lon, center_lat);
    if (this._invert_y)
        return new coord( xy.x - (width / 2.0),
                          xy.y + (height / 2.0) );
    else
        return new coord( xy.x - (width / 2.0),
                          xy.y - (height / 2.0) );
};

/**
 * Calculate the grid coordinate for the upper-right point of an image
 * given the center lon/lat and image dimensions.
 *
 * @param center_lon
 * @param center_lat
 * @param width
 * @param height
 * @return
 */
GridSystem.prototype.getUR = function( center_lon, center_lat, width, height ) {
    var xy = this.toXY(center_lon, center_lat);
    if (this._invert_y)
        return new coord( xy.x + (width / 2.0),
                          xy.y - (height / 2.0) );
    else
        return new coord( xy.x + (width / 2.0),
                          xy.y + (height / 2.0) );
};


// Equi-Rectangular Map Projection class
function EquiRectangularMapProjection(lon, lat) {
    this._center_lon = lon;          // center longitude (projection center)
    this._center_lat = lat;          // center latitude
    this._cos_center_lat = Math.cos(lat); // cosine of the center latitude
    this._R = EQUITORIAL_EARTH_RADIUS_MEAN_METERS;
}

function adjust_lon(lon) {
   if (lon < -Math.PI)
      return lon - (Math.floor(lon / Math.PI) * Math.PI);
   else if (lon > Math.PI)
      return -(Math.PI - lon + (Math.floor(lon / Math.PI) * Math.PI));
   return lon;
}

EquiRectangularMapProjection.prototype.forward = function(lon, lat) {
    return new coord( this._R * adjust_lon(lon - this._center_lon) * this._cos_center_lat,
                      this._R * lat );
};

EquiRectangularMapProjection.prototype.inverse = function(x, y) {
    return new coord( adjust_lon(this._center_lon + x / (this._R * this._cos_center_lat)),
                      Math.min(y / this._R, HALF_PI) );
};
