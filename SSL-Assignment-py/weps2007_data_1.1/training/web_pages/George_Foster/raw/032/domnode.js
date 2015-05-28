/* $Header: /cvs_eng/DestinationSearch/web/js/domnode.js,v 1.13.4.1 2006/10/27 23:13:30 jvinding Exp $ */
function DOMNode(){};

/* find the nearest next previous by node name */
DOMNode.findPrevSibling = function( node, siblingName ) {
    var n = siblingName.toUpperCase();
    for( node = node.previousSibling; node && node.nodeName != n; node = node.previousSibling );
    return node;
}
/* find the nearest next sibling by node name */
DOMNode.findNextSibling = function( node, siblingName ) {
    var n = siblingName.toUpperCase();
    for( node = node.nextSibling; node && node.nodeName != n; node = node.nextSibling );
    return node;
}
/* find the nearest ancestor by node name */
DOMNode.findAncestor = function( node, ancestorName ) {
    var n = ancestorName.toUpperCase();
    for( node = node.parentNode; node && node.nodeName != n; node = node.parentNode);
    return node;
}
/* find the first text node */
DOMNode.findFirstTextChild = function( elem ) {
    while( elem.nodeType != 3 && elem.firstChild ) {
        elem = elem.firstChild;
    }
    return( elem.nodeType == 3 ? elem : null );
}

DOMNode.truncate = function( elem ) {
    for( ; elem.firstChild; elem.removeChild( elem.firstChild ) );
}

DOMNode.checkAttribute = function( elem, attribute, value ) {
    var attr;
    if( ! elem ) { return false; }
    switch( attribute ) {
        case 'class':
            attr = elem.className;
            break;
        default:
            attr = elem.getAttribute( attribute );
    }
    return ( attr && attr.match( '\\b' + value + '\\b' ) );
}
/* checks to see if elem's class contains clazz */
DOMNode.isClass = function( elem, clazz ) {
    return DOMNode.checkAttribute( elem, 'class', clazz );
}
DOMNode.isRel = function( elem, rel ) {
    return DOMNode.checkAttribute( elem, 'rel', rel );
}

DOMNode.editStyleValue = function( elem, style, value ) {
    switch( style ) { /* no where near complete */
        case 'cursor':
            try {
                elem.style.cursor = value;
            } catch( e ) {
                if( value == 'pointer' ) { /* IE5 */
                    elem.style.cursor = 'hand';
                }
            }
        break;
        default:
            elem.style[style] = value;
    }
}

/* sets elem's class, appending if already set */
DOMNode.addClass = function( elem, clazz ) {
    for ( var i=1; i<arguments.length; i++ ) {
        if ( ! DOMNode.isClass( elem, arguments[i] )) {
            elem.className = ( elem.className ? elem.className+' '+arguments[i] : arguments[i] );
        }
    }
    return elem;
}
/* removes the given class from the given elem */
DOMNode.removeClass = function( elem, clazz ) {
    elem.className = elem.className.replace( new RegExp( '\\b'+clazz+'\\b' ), '' );
}

/*
* create a new 'type' DOM element
* with a text node of value 'val' (or span if omitted)
* append the it to 'parent' element
* set remaining n:v pairs as attributes
*/
DOMNode.create = function( parent, val, type ) {
    var el;
    if ( !type || type == "text" ) {
        el = document.createTextNode( val );
    } else {
        el = document.createElement( type );
        if ( val ) { el.appendChild( document.createTextNode( val ) ); }

        for ( var i=3; i<arguments.length; i++ ) {
            switch( arguments[i] ) {
                case 'class':
                case 'className':
                    DOMNode.addClass( el, arguments[++i] );
                    break;
                case 'colspan':
                    el.colSpan = arguments[++i];
                    break;
                case 'style':
                    if( document.all && ! window.opera ) {
                        // you can't use setAttribute w/ "style" in IE
                        el.style.cssText = arguments[++i];
                        break;
                    }
                    // fall through for non IE browsers
                default:
                    el.setAttribute( arguments[i], arguments[++i] );
            }
        }
    }
    if( parent ) {
        parent.appendChild( el );
    }
    return el;
}

DOMNode.appendAfter = function( newEl, sib ) {
    if( sib.nextSibling ) {
        sib.parentNode.insertBefore( newEl, sib.nextSibling );
    } else {
        sib.parentNode.appendChild( newEl );
    }
}

/* get child elements of parent having tag and class */
DOMNode.getByTagAndClass = function( base, tagname, className ) {
    if( arguments.length < 3 ) { throw( 'DOMNode.getByTagAndClass: insufficient number of arguments' ); }
    return array_grep( base.getElementsByTagName( tagname ), ( className
            ? function( o ) { return DOMNode.isClass( o, className ); }
            : function() { return true; } ) );
}
/*
 *
 */
DOMNode.getOffsets = function( el ) {
    var xy = { x:0,y:0 };
    while( el ){
        xy.x += el.offsetLeft;
        xy.y += el.offsetTop;
        el = el.offsetParent
    }
    return xy;
}
