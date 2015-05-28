/*
 * $Header: /cvs_eng/DestinationSearch/web/js/effects.js,v 1.7 2006/02/01 15:07:09 rsimpson Exp $
 * DS effects library
 */

/* shade function: repeatedly calls itself, changing this.elem's size */
function Effect_Shade() {
    if( this.animSteps.length ) {
        var step = this.animSteps.shift();

        this.elem.style.height = step + 'px';

        // continue to call ourselves (with delay) while there are still animSteps
        var o = this;
        this.shadeId = window.setTimeout( function() { o.shade() }, this.STEP_DELAY );
    } else {
        this.shadeId = null;
        if( this.postHook ){
            this.postHook();
            this.postHook = null;
        }
    }
}
function Effect_ShadeSetup( dir ) {
    var o;

    if( this.shadeId || this.elem.style.visibility == 'hidden' ) {
        return;
    }
    if( dir == 'up' || ! this.openHeight ) {
        this.openHeight = Effect.findElementHeight( this.elem );
    }

    if( ! this.openHeight ) {
        return;
    }

    var m, h;
    if( dir == 'up' ) {
        m = -1;
        h = this.openHeight
        o = this;
        this.postHook = function() { o.elem.style.visibility = 'hidden' };
    } else {
        m = 1;
        h = 0;
        this.postHook = null;
    }

    var steps = Math.floor( this.openHeight / this.STEP_PIX );
    var dy = Math.floor( this.openHeight / steps ) * m;

    while( steps-- ) {
        this.animSteps.push( h );
        h += dy;
    }
    this.animSteps.push( dir == 'up' ? 0 : this.openHeight );

    this.elem.style.overflow = 'hidden';

    o = this;
    this.shadeDownId = window.setTimeout( function() { o.shade( dir ) }, this.STEP_DELAY );
}
function Effect_ShadeUp()   { this._shadeSetup( 'up' ); }
function Effect_ShadeDown() { this.elem.style.visibility = 'visible'; this._shadeSetup( 'down' ); }

function Effect( elem ) {
    this.elem = elem;
    this.STEP_PIX   = 10;
    this.STEP_DELAY = 10;
    this.animSteps  = new Array();
    this.openHeight = Effect.findElementHeight( this.elem );
}
Effect.prototype.shade       = Effect_Shade;
Effect.prototype.shadeUp     = Effect_ShadeUp;
Effect.prototype.shadeDown   = Effect_ShadeDown;
Effect.prototype._shadeSetup = Effect_ShadeSetup;

Effect.findElementHeight = function( elem ) {
    if ( elem && elem.style.height && elem.style.height != 'auto' ) {
        return parseInt( elem.style.height );
    } else if( elem && typeof elem.offsetHeight != 'undefined' ) {
        return elem.offsetHeight;
    }
    return null;
}
