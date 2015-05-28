/*
 * DS Flyout class
 * $Header: /cvs_eng/DestinationSearch/web/js/DSFlyout.js,v 1.27.4.1 2006/10/27 23:13:30 jvinding Exp $
 */
var _DSFLYOUT_OFFSET_X = 0;
var _DSFLYOUT_OFFSET_Y = 0;
var _DSFLYOUT_OFFSET_Z = 50;

function DSFlyout_Init( point, element ) {
    if ( arguments.length ) {
        DSFlyout.superclass.init.call( this, point, element, _DSFLYOUT_OFFSET_X, _DSFLYOUT_OFFSET_Y, _DSFLYOUT_OFFSET_Z );
    }
}
function DSFlyout( point, title, body, options ) {
    var titleBg, bodyBg;
    if( typeof options == 'object' ) {
        titleBg = options.titleBg;
        bodyBg = options.bodyBg;
    }

    // create the wrapped div
    var fWrap = new DSShadow( title, body, titleBg, bodyBg );

    // replace the top-left corner with a pointy one
    var tl = fWrap.getElementsByTagName( 'div' )[0];
    fWrap.removeChild( tl );
    DSMap.createImage( 'img/flyout_pointy_corner_tl.png', DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 25px; width: 25px; top: -14px; left: -11px; z-index: 2;' ) ); // top-left corner

    // add the closer icon
    var c = DOMNode.create( body, '', 'img', 'src', 'img/icon_close.png', 'alt', lcl.getString( 'js.closefly' ), 'style', 'position: absolute; top: 0; right: 5px;' );
    DSBrowserEvent.addListener( c, 'click', DSPoi.HideFlyouts );

    // make this a MapObject
    this.init( point, fWrap );
}
DSFlyout.prototype = new DSMapObject();
DSFlyout.superclass = DSMapObject.prototype;
DSFlyout.prototype.init = DSFlyout_Init;


/*
 * DSShadow class
 *
 * the body element should have both width and background color style attributes set
 *   otherwise, 170px and white are used as defaults
 *
 * also, the element to which the returned div is appended must be absolutely positioned.
 *
 * TODO: dynamic title background color
 */
function DSShadow( title, body, _titleBg, _bodyBg ) {
    var i;
    if( typeof title == 'string' ) {
        _title = document.createElement( 'p' );
        _title.style.margin = 0;
        _title.appendChild( document.createTextNode( title ) );
        title = _title;
    }
    if( typeof body  == 'string' ) {
        _body  = document.createElement( 'p' );
        _body.style.margin = 0;
        _body.appendChild( document.createTextNode( body ) );
        body = _body;
    }

    // drop shadow wrapper
    var fWrap = document.createElement( 'div' );
    DOMNode.addClass( fWrap, 'fWrap' );
    fWrap.style.backgroundColor = '#fff';

    // determine width
    var width = ( body.style.width ? parseInt( body.style.width ) : 170 );
    fWrap.style.width = width + 'px';
    var bodyBg   = ( body.style.backgroundColor  ? body.style.backgroundColor  : ( _bodyBg  ? _bodyBg :  '#fff' ) );
    var titleBg  = ( title.style.backgroundColor ? title.style.backgroundColor : ( _titleBg ? _titleBg : '#daeef5' ) );

    // top row
    DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 4px; overflow: hidden; width: 4px; top: -2px; left: 1px; background-color: '+titleBg ); // top-left mask
    DSMap.createImage( 'img/flyout_round_corner_tl.png', DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 5px; overflow: hidden; width: 5px; top: -5px; left: -1px; z-index: 2;' ) ); // top-left corner
    DOMNode.create( fWrap, '', 'div', 'style', 'background-color: '+titleBg+'; font-weight: bold; line-height: 16px; min-height: 16px; padding: 0 24px 6px 10px' ).appendChild( title ); // title
    var top = DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 3px; overflow: hidden; width: '+(width-5)+'px; top: -4px; left: 2px; background-color: '+titleBg+'; border-top: 1px solid #000', 'class', 'topMiddle' ); // top middle
    DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 4px; overflow: hidden; width: 4px; top: -2px; right: 1px; background-color: '+titleBg ); // top-right mask
    var topRight = DSMap.createImage( 'img/flyout_round_corner_tr.png', DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 18px; overflow: hidden; width: 13px; top: -13px; right: -9px;', 'class', 'topRight' ) ); // top-right corner

    // middle row
    var left = DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; width: 3px; top: 0; height: 100%; left: 0; background-color: transparent; border-left: 1px solid #000' ); // left side
    if( body ) { fWrap.appendChild( body ); }
    var right = DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; width: 3px; top: 0; height: 100%; bottom: 5px; right: 0; background-color: transparent; border-right: 1px solid #000' ); // right side

    DOMNode.create( fWrap, '', 'div', 'style', 'clear: both' );

    // bottom row
    var bl = DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 4px; width: 4px; bottom: -3px; left: 1px; overflow: hidden; background-color: '+bodyBg ); // bottom-left mask
    DSMap.createImage( 'img/flyout_round_corner_bl.png', DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 13px; overflow: hidden; width: 20px; bottom: -13px; left: -11px; z-index: 2;', 'class', 'bottomLeft' ) ); // bottom-left corner
    var bottom = DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 3px; left: 4px; width: '+( width - 8 )+'px; overflow: hidden; background-color: '+bodyBg+'; border-bottom: 1px solid #000', 'class', 'bottomMiddle' ); // bottom middle
    DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 4px; overflow: hidden; width: 4px; bottom: -3px; right: 1px; background-color: '+bodyBg ); // bottom-right mask
    DSMap.createImage( 'img/flyout_round_corner_br.png', DOMNode.create( fWrap, '', 'div', 'style', 'position: absolute; height: 13px; overflow: hidden; width: 13px; bottom: -13px; right: -9px;', 'class', 'bottomRight' ) ); // bottom-right corner

    // bottomest row
    var bottom_shadow = DOMNode.create( fWrap, '', 'div', 'class', 'bottom_shadow', 'style', 'position: absolute; height: 9px; overflow: hidden; left: 9px; right: 4px; bottom: -13px; background: url(img/flyout_shadow_bottom.png) repeat-x' ); // bottom shadow
    var right_shadow = DOMNode.create( fWrap, '', 'div', 'class', 'right_shadow', 'style', 'position: absolute; width: 9px; top: 5px; bottom: 0; right: -9px; background: url(img/flyout_shadow_right.png) repeat-y' ); // right side shadow

    /* IE Work arounds */
    if( DSBrowser.isIE ) {
        var height = 0;
        document.body.appendChild( fWrap );
        height = fWrap.offsetHeight;
        document.body.removeChild( fWrap );
        fWrap.style.visibility = 'visible';

        if( DSBrowser.isIE55 ) {
            top.style.height = '5px';
            bottom.style.height = '4px';
        }

        left.style.height = right.style.height = height + 'px';
        right_shadow.style.backgroundImage = 'none';
        right_shadow.style.height = ( height - 5 ) + 'px';
        right_shadow.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="img/flyout_shadow_right.png", sizingMethod="scale")';
        right_shadow.style.top = 'auto';

        bottom_shadow.style.backgroundImage = 'none';
        bottom_shadow.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="img/flyout_shadow_bottom.png", sizingMethod="scale")';
        bottom_shadow.style.width = ( width - 13 ) + 'px';

        bottom.style.bottom = '-4px';
    }

    return fWrap;
}
