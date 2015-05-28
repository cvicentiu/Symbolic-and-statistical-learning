/*
 * DD functions
 * /cvs_eng/DestinationSearch/web/js/DSDropDown.js,v 1.22 2006/03/01 22:23:51 jvinding Exp
 */

function DSDropDownItem( elem, text, type ) {
    this.elem = elem;
    this.text = text || '';
    this.type = type || '';
    this.properties = {};
    for( var i = 3; i < arguments.length; ++i ) {
        this.setProperty( arguments[i], arguments[++i] );
    }
}
DSDropDownItem.prototype.getValue = function() {
    return this.text;
}
DSDropDownItem.prototype.setProperty = function( key, value ) {
    return this.properties[key] = value;
}
DSDropDownItem.prototype.getProperty = function( key ) {
    return this.properties[key];
}
DSDropDownItem.prototype.isType = function( type ) {
    return( type == this.type );
}
DSDropDownItem.prototype.addEventListener = function( type, func ) {
    switch( type ) {
        case 'click':
        case 'mouseout':
        case 'mouseover':
            if( ! this.events ) {
                this.events = new DSEvent();
            }
            if( ! this.events.getListeners( type ) ) {
                var o = this;
                this.events.registerEvent( type );
                DSBrowserEvent.addListener( this.elem, type, function() { o.events.triggerEvent( type, null, o ); } );
            }
        break;
    }
    this.events.addListener( type, func );
}

/*
 *
 */
function DSDropDown( key, textbox ) {
    if( ! key ) { throw( 'DSMap: you must specifly a key' ); }
    if( DSDropDown.lists[key] ) { throw( 'DSMap: duplicate key: "' + key + '"' ); }
    if( ! textbox ) { throw( 'DSMap: unable to find textbox: "' + textbox + '"' ); }

    this.key = key;
    this.textbox = textbox;
    this.parent = textbox.parentNode;
    this.listItems = [];
    this.pos = -1;
    this.createDropDown();
    this.textbox.setAttribute( "autocomplete", "off" ); // disable browser autocomplete

    DSBrowserEvent.addListener( this.textbox, 'click', this.eventMethod( DSDropDown.click ) );
    DSBrowserEvent.addListener( this.textbox, 'keydown', this.eventMethod( DSDropDown.typing ) );
    DSBrowserEvent.addListener( this.textbox, 'keypress', this.eventMethod( DSDropDown.typing ) );

    this.events = new DSEvent();
    this.events.registerEvent( 'typing' );
    this.events.registerEvent( 'select' );

    this.listXOffset = this.listYOffset = this.listExtraW = 0;

    /*
    TODO: animation
    this.useEffects = ( disableEffects ? false : true );
    if( this.useEffects ) {
        this.effect = new Effect( this.elem );
    }
*/
    DSDropDown.lists[key] = this;
    if( ! DSDropDown.inited ) {
        // Check any clicks for closing the list(s)
        DSBrowserEvent.addListener( document, 'click', DSDropDown.HideLists );
        DSDropDown.inited = true;
    }
}

/*
 *
 */
DSDropDown.lists = new Object();
DSDropDown.inited = false;
DSDropDown.HideLists = function( evt ) {
    for( var type in DSDropDown.lists ) {
        DSDropDown.lists[type].hide();
    }
}
/*
 *
 */
DSDropDown.prototype.eventMethod = function( method, arg ) {
    var o = this;
    return function( e ) { method.call( o, e, arg ); };
}
DSDropDown.click = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );
    this.toggleVisibility();
    e.stopPropagation();
}
DSDropDown.prototype.createDropDown = function() {
    if (navigator.userAgent.indexOf( "MSIE" ) >= 0) {
        this.shim = DOMNode.create( this.parent, '', 'iframe', 'class', 'DSDDList', 'style', 'filter:alpha(opacity=0);padding:0;margin:0;' );
    }
    this.list = DOMNode.create( this.parent, '', 'div', 'class', 'DSDDList' );
    this.listElem = DOMNode.create( this.list, '', 'dl' );
}
DSDropDown.prototype.getLength = function() {
    return this.listItems.length;
}
DSDropDown.prototype.updateShim = function() {
    if( this.shim ) {
        this.shim.style.top = this.list.style.top;
        this.shim.style.left = this.list.style.left;
        this.shim.style.width = this.list.style.width;
        this.shim.style.visibility = this.list.style.visibility;
        this.shim.style.height = this.list.clientHeight + 'px';
    }
};
DSDropDown.prototype.positionList = function() {
    var top = this.textbox.offsetTop + this.textbox.offsetHeight;
    var left = this.textbox.offsetLeft;
    var width = this.textbox.offsetWidth - 2;

    this.list.style.top   = top   + this.listYOffset + 'px';
    this.list.style.left  = left  + this.listXOffset + 'px';
    this.list.style.width = width + this.listExtraW  + 'px';
    this.updateShim();
}
DSDropDown.prototype.setListOffset = function( x, y, w ) {
    this.listXOffset = ( typeof x != 'undefined' ? x : 0 );
    this.listYOffset = ( typeof y != 'undefined' ? y : 0 );
    this.listExtraW  = ( typeof w != 'undefined' ? w : 0 );
}
DSDropDown.prototype.positionArrow = function() {
    var top  = this.textbox.offsetTop + this.arrowYOffset;
    var left = this.textbox.offsetLeft + this.textbox.offsetWidth + this.arrowXOffset;
    this.arrow.style.top = top + 'px';
    this.arrow.style.left = left + 'px';
}
DSDropDown.prototype.addDropDownArrow = function( url, x, y ) {
    this.arrowXOffset = ( typeof x != 'undefined' ? x : 0 );
    this.arrowYOffset = ( typeof y != 'undefined' ? y : 0 );
    this.arrow = DOMNode.create( null, '', 'img', 'src', url, 'class', 'DSDDArrow' );
    DOMNode.appendAfter( this.arrow, this.textbox );
    DSBrowserEvent.addListener( this.arrow, 'click', this.eventMethod( DSDropDown.click ) );
    this.positionArrow();
}
DSDropDown.getByKey = function( key ) {
    return DSDropDown.lists[key];
}
/*
 * Populate the dropdown
 */
DSDropDown.prototype.addHeaderItem = function( text ) {
    var d = DOMNode.create( this.listElem, text, 'dt' );
    var item = new DSDropDownItem( d, text, text, 'selectable', false, 'removable', false );
    this.listItems.push( item );
    return item;
}
DSDropDown.prototype.addListItem = function( elem, text, type ) {
    var d = DOMNode.create( this.listElem, '', 'dd' );
    d.appendChild( elem );
    var item = new DSDropDownItem( d, text, type );
    for( var i = 3; i < arguments.length; ++i ) {
        item.setProperty( arguments[i], arguments[++i] );
    }
    this.listItems.push( item );
    return item;
}
DSDropDown.prototype.addSelectableItem = function( text, type, sticky ) {
    var i = this.getLength();
    var o = this;
    var a = DOMNode.create( null, text, 'a', 'href', 'javascript:void(0)' );
    var item = this.addListItem( a, text, type, 'selectable', true, 'removable', ( ! sticky ) );

    DOMNode.editStyleValue( item.elem, 'cursor', 'pointer' );

    item.addEventListener( 'click', this.eventMethod( this.useSelection ) );
    item.addEventListener( 'mouseover', this.eventMethod( this.eventHighlight, i ) );
    item.addEventListener( 'mouseout', this.eventMethod( this.eventDehighlight, i ) );
    return item;
}
DSDropDown.prototype.addLink = function( text, callback, type ) {
    var href = ( typeof callback == 'function' ? 'javascript:void(0)' : callback );
    var a = DOMNode.create( null, text, 'a', 'href', href, 'class', 'link' );
    var item = this.addListItem( a, text, type, 'selectable', false );
    if( typeof callback == 'function' ) {
        item.addEventListener( 'click', callback );
    }
    return item;
}
DSDropDown.prototype.addRemoveAllLink = function( text, callback, type ) {
    if( typeof type == 'undefined' ) {
        type = '';
    }
    var o = this;
    var item = this.addLink( text, this.eventMethod( this.removeAll, type ), type );
    item.setProperty( 'removable', true );
    if( callback ) {
        item.addEventListener( 'click', callback );
    }
    return item;
}
DSDropDown.prototype.getItem = function( index ) {
    return this.listItems[index];
}
/*
 * de-populate the dropdown
 */
DSDropDown.prototype.removeItem = function( index ) {
    var i = this.getItem( index );
    i.elem.parentNode.removeChild( i.elem );
    this.listItems.splice( index, 1 );
}
DSDropDown.prototype.isRemovable = function( index ) {
    if (arguments.length < 1) {
        index = this.pos;
    }

    if (index >= 0 && index < this.getLength()) {
        return this.getItem( index ).getProperty( 'removable' );
    }
    return false;
}
DSDropDown.prototype.removeAll = function( e, type ) {
    for( var i = 0; i < this.getLength(); ++i ) {
        while( i < this.getLength() && this.getItem( i ).isType( type ) && this.isRemovable( i ) ) {
            this.removeItem( i );
        }
    }
}
/*
 * Visual effects
 */
DSDropDown.prototype.isShown = function() {
    return this.list.style.visibility == 'visible';
}
DSDropDown.prototype.show = function() {
    if( this.isShown() ) {
        return;
    }
    DSDropDown.HideLists();
    this.positionList();

    /* TODO: use effects
    if( this.useEffects ) {
        this.effect.shadeDown();
    } else {
    */
        this.list.style.visibility = 'visible';
        /*
    }
    */
    this.updateShim();
}
DSDropDown.prototype.hide = function() {
    if( this.isShown() ) {
        this.dehighlight();
        /* TODO: effects
        if( this.useEffects ) {
            this.effect.shadeUp();
        } else {
        */
            this.list.style.visibility = 'hidden';
            /*
        }
        */
        this.updateShim();
    }
}
DSDropDown.prototype.toggleVisibility = function() {
    if ( this.isShown() ) {
        this.hide();
    } else {
        this.show();
    }
}
/*
 * navigation/selection
 */
DSDropDown.prototype.isSelectable = function( index ) {
    if( arguments.length < 1 ) {
        index = this.pos;
    }
    if( index >= 0 && index < this.getLength() ) {
        return this.listItems[index].getProperty( 'selectable' );
    }
    return false;
}
DSDropDown.prototype.getValue = function( index ) {
    if( arguments.length < 1 ) {
        index = this.pos;
    }
    if( this.isSelectable( index ) ) {
        return this.listItems[index].getValue();
    }
    return '';
}
DSDropDown.prototype.useSelection = function() {
    this.setTextboxValue();
    this.hide();
}
DSDropDown.prototype.setTextboxValue = function( val ) {
    this.clearHintText();
    if( val ) {
        this.textbox.value = val;
    } else if( this.isSelectable() ) {
        this.textbox.value = this.getValue();
        this.textbox.focus();
        this.events.triggerEvent( 'select', this.listItems[this.pos], this );
    }
}

/* highlight/dehighlight change the objects position marker, and (de-)hilight the element at index */
DSDropDown.prototype.highlight = function( index ) {
    if( arguments.length < 1 ) {
        index = this.pos;
    }
    if( this.isSelectable( index ) ) {
        this.pos = index;
        DOMNode.addClass( this.listItems[index].elem, 'selected' );
    }
}
DSDropDown.prototype.eventHighlight = function( e, index ) {
    this.highlight( index );
}
DSDropDown.prototype.dehighlight = function( index ) {
    if (arguments.length < 1) {
        index = this.pos;
    }
    if( this.isSelectable( index ) ) {
        DOMNode.removeClass( this.listItems[index].elem, 'selected' );
    }
    this.pos = -1;
}
DSDropDown.prototype.eventDehighlight = function( e, index ) {
    this.dehighlight( index );
}

/* Next/Prev change which entry is selected in the drop down */
DSDropDown.prototype.previous = function() {
    if( this.getLength() == 0 ) return;

    var index = this.pos;
    if( index < 0 ) {
        index = 0;
    } else {
        --index;
    }
    while( index > 0 && !this.isSelectable( index ) ) {
        --index;
    }
    if( this.isSelectable( index ) ) {
        this.dehighlight();
        this.pos = index;
        this.highlight();
    }
}
DSDropDown.prototype.next = function() {
    if( this.getLength() == 0 ) return;

    var index = this.pos;
    if( index >= this.getLength() ) {
        index = this.getLength() - 1;
    } else if( index < 0 ) {
        index = 0;
    } else {
        ++index;
    }
    while( index < this.getLength() && !this.isSelectable( index ) ) {
        ++index;
    }
    if (this.isSelectable( index ) ) {
        this.dehighlight();
        this.pos = index;
        this.highlight();
    }
}

DSDropDown.prototype.last = function() {
    this.dehighlight();
    this.pos = this.getLength();
    this.previous ();
}
DSDropDown.prototype.first = function() {
    this.dehighlight();
    this.pos = -1;
    this.next ();
}
/*
 * Typing/autocompletion code
 */
DSDropDown.KEY_BACKSPACE = 8;
DSDropDown.KEY_TAB = 9;
DSDropDown.KEY_ENTER = 13;
DSDropDown.KEY_PGUP = 33;
DSDropDown.KEY_PGDN = 34;
DSDropDown.KEY_END = 35;
DSDropDown.KEY_HOME = 36;
DSDropDown.KEY_LEFT = 37;
DSDropDown.KEY_UP = 38;
DSDropDown.KEY_RIGHT= 39;
DSDropDown.KEY_DOWN = 40;

DSDropDown.canSelect = function( tb ) {
    return( tb.createTextRange || tb.setSelectionRange );
}
DSDropDown.textboxSelect = function( tb, iStart, iEnd ) {
    if (tb.createTextRange) { // IE
        var oRange = tb.createTextRange();
        oRange.moveStart( "character", iStart );
        oRange.moveEnd( "character", -tb.value.length + iEnd );
        oRange.select();
    } else if( tb.setSelectionRange ) { // moz
        tb.setSelectionRange( iStart, iEnd );
    }

    tb.focus();
}

DSDropDown.getTextboxValue = function( tb ) {
    var val;
    if( document.selection ) { // IE
        var oRange = document.selection.createRange();
        val = tb.value.substring( 0, tb.value.length - oRange.text.length );
    } else if( tb.setSelectionRange ) { // moz
        val =  tb.value.substring( 0, tb.selectionStart );
    } else {
        val = tb.value;
    }
    return val;
}
/* this is where it gets interesting.  they keypress event does not trap some keys (eg: arrow keys) in any IE.
   the keydown event does, but is not cancelable.  so some keys (eg keys dealing w/ navigation) are handled in the
   keydown event, others in the keypress event, then cancel all of them in the keypress event handler

   to further complicate things, the key code for 'up' is 38. the char code for '&' is also 38.
   IE also doesn't do keycode vs charcode so special handing is put in to handle that
*/
DSDropDown.getCharCode = function( e ) {
    // IE doesn't trigger the keyPress event for "special" keys (eg: arrows)
    // IE always uses keyCode
    // Safari always uses charCode but has keycodes of > 60000 for "special" keys
    // firefox sets e.charCode to 0 if it's a "special" char
    // we also need special handling for tab and enter and maybe others in safari and IE
    if( e.getType() == 'keydown'
       || e.getKeyCode() > 60000
       || ( typeof e.event.charCode != 'undefined' && e.event.charCode == 0 )
       || e.getKeyCode() == DSDropDown.KEY_ENTER
       || e.getKeyCode() == DSDropDown.KEY_TAB
       || e.getKeyCode() == DSDropDown.KEY_BACKSPACE ) {
        return null; // not a character
    } else {
        return( e.getCharCode() || e.getKeyCode() );
    }
}
DSDropDown.getKeyCode = function( e ) {
    var key = e.getKeyCode();
    if( key > 63000 ) {
        // for Safari
        switch (key) {
            case 63232: key=DSDropDown.KEY_UP; break;
            case 63273: key=DSDropDown.KEY_HOME; break;
            case 63233: key=DSDropDown.KEY_DOWN; break;
            case 63275: key=DSDropDown.KEY_END; break;
            case 63234: key=DSDropDown.KEY_LEFT; break;
            case 63276: key=DSDropDown.KEY_PGUP; break;
            case 63235: key=DSDropDown.KEY_UP; break;
            case 63277: key=DSDropDown.KEY_PGDN; break;
        }
    }
    return key;
}
DSDropDown.typing = function( evt ) {
    var e = new DSBrowserEventObject( evt, window.event, this );

    if( e.getAltKey() || e.getCtrlKey() ) {
        // don't interfere with browser commands
        return true;
    }
    var c = {
        'charCode':  DSDropDown.getCharCode( e ),
        'keyCode': DSDropDown.getKeyCode( e )
    };

    if( ! this.events.triggerEvent( 'typing', c, this ) ) {
        return true;
    }
    if( c.charCode ) {
        var inp = DSDropDown.getTextboxValue( this.textbox ) + String.fromCharCode( c.charCode );
        var t = new RegExp( '^'+quotemeta( inp ), 'i' );
        var iLen = inp.length;
        this.dehighlight();
        for( var i = 0; i < this.getLength(); ++i ) {
            var val = this.getValue( i );
            if( this.isSelectable( i ) && t.test( val ) ) {
                this.show();
                this.highlight( i );
                break;
            }
        }
        if( DSDropDown.canSelect( this.textbox ) && this.isSelectable() ) {
            if( this.isSelectable() ) {
                this.textbox.value = inp + this.getValue().substring( inp.length );
                DSDropDown.textboxSelect( this.textbox, iLen, this.textbox.value.length );
            }
        } else {
            // let the browser actually add the letter since the browser doesn't support selection
            // eg: safari && ie5/mac
            return true;
        }
    } else {
        switch( c.keyCode ) {
            case DSDropDown.KEY_TAB:
                if( this.isShown() ) {
                    this.useSelection();
                }
                this.hide();
                return true;
                break;

            case DSDropDown.KEY_UP:
                if( e.getType() == 'keydown' ) {
                    this.show();
                    this.previous();
                    this.setTextboxValue();
                    return true;
                }
                break;

            case DSDropDown.KEY_DOWN:
                if( e.getType() == 'keydown' ) {
                    this.show();
                    this.next();
                    this.setTextboxValue();
                    return true;
                }
                break;

            case DSDropDown.KEY_ENTER:
                if( e.getType() == 'keydown' ) {
                    this.textbox.blur();
                    this.textbox.form.submit();
                    return true;
                }
                if( ! this.isSelectable() || ! DSDropDown.canSelect( this.textbox ) ) {
                    /*
                     * Enter sumbits the form if there is nothing hilighted.
                     * that way they can use enter to select an item, but typing a new value
                     * and pressing enter will behave like a normal textbox
                     */
                    return true;
                } else {
                    DSDropDown.textboxSelect( this.textbox, this.textbox.value.length, this.textbox.value.length ); // unhilight
                    this.useSelection();
                    this.hide();
                }
                break;
            default:
                return true;
        }
    }
    e.preventDefault();
    return false;
};
DSDropDown.prototype.addEventListener = function( type, func ) {
    this.events.addListener( type, func );
};

/* Hint text is grey text that disappears when the user attempts to enter their own value */
DSDropDown.prototype.setHintText = function( txt ) {
    this.hintText = txt;
    if( ! this.hintTextInited ) {
        this.hintTextInited = true;
        var o = this;
        this.focus = function() { o.clearHintText() };
        this.blur = function() { o.showHintText() };
        DSBrowserEvent.addListener( this.textbox.form, 'submit', function() { o.clearHintText() } );
        this.showHintText();
    }
};
DSDropDown.prototype.showHintText = function( txt ) {
    if( this.hintTextInited && ( this.textbox.value == '' || this.textbox.value == this.hintText ) ) {
        DOMNode.addClass( this.textbox, 'hintText' );
        this.textbox.value = this.hintText;
        DSBrowserEvent.removeListener( this.textbox, 'blur', this.blur );
        DSBrowserEvent.addListener( this.textbox, 'focus', this.focus );
    }
};
DSDropDown.prototype.clearHintText = function() {
    if( DOMNode.isClass( this.textbox, 'hintText' ) ) {
        this.textbox.value = '';
        DOMNode.removeClass( this.textbox, 'hintText' );
        DSBrowserEvent.removeListener( this.textbox, 'focus', this.focus );
        DSBrowserEvent.addListener( this.textbox, 'blur', this.blur );
    }
};
