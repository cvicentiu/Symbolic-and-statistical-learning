// included	in 1.6.4
Event.KEY_PAGEUP = 33;
Event.KEY_PAGEDOWN = 34;
Event.KEY_HOME = 36;
Event.KEY_END =	35;

Element.childrenWithClassName = function(element, className, findFirst) {
  var classNameRegExp = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var results;
  if (findFirst) {
	  var result = $A($(element).getElementsByTagName('*')).detect( function(c) { 
		  return (c.className && c.className.match(classNameRegExp));
	  });
	  if (result) {
		  results = [result];
	  }
  }
  else {
	  results = $A($(element).getElementsByTagName('*')).select( function(c) { 
		  return (c.className && c.className.match(classNameRegExp));
	  });
  }
  if(!results) results = [];
  return results;
}

Function.prototype.bindAsEventListener = function(object, element) {
  var __method = this;
  element =	$(element);
  return function(event) {
	return __method.call(object, event || window.event,	element);
  }
}

Form.Element.Serializers.button	=
	function(element) {
		return [element.name, element.value];
	};

Form.Element.Serializers.textarea =
	function(element) {
		var value;
		if (element.name && element.form && element.form.id && FormManagers[element.form.id]) {
			value = FormManagers[element.form.id].getValue(element.name);
		}
		else {
			value = element.value;
		}
		return [element.name, value];
	};

// bug in effects.js
Element.setOpacity = function(element, value){
  element= $(element);
  if (value	== 1){
	Element.setStyle(element, {	opacity:
	  (/Gecko/.test(navigator.userAgent) &&	!/Konqueror|Safari|KHTML/.test(navigator.userAgent)) ?
	  0.999999 : 1 });
	if(/MSIE/.test(navigator.userAgent))
	  Element.setStyle(element,	{filter: Element.getStyle(element,'filter').replace(/alpha\([^\)]*\)/gi,'')});
  }	else {
	if(value < 0.00001)	value =	0;
	Element.setStyle(element, {opacity:	value});
	if(/MSIE/.test(navigator.userAgent))
	 Element.setStyle(element,
	   { filter: Element.getStyle(element,'filter').replace(/alpha\([^\)]*\)/gi,'')	+
				 'alpha(opacity='+value*100+')'	});
  }
};

Event.observe =
	function(element,name,observer,useCapture){
		var element = $(element);
		useCapture = useCapture	|| false;

		this._observeAndCache(element, name, observer, useCapture);
	};

Event.stopObserving	=
	function(element, name,	observer, useCapture){
		var	element	= $(element);
		useCapture = useCapture	|| false;

		if (element.removeEventListener) {
			element.removeEventListener(name, observer,	useCapture);
		} else if (element.detachEvent)	{
			element.detachEvent('on' + name, observer);
		}
	};

Form.serialize =
	function(form, submit) {
	submit = $(submit);
	var	elements = Form.getElements($(form));
	var	queryComponents	= new Array();

	for	(var i = 0;	i <	elements.length; i++) {
		if (!submit	|| elements[i].type	!= 'submit'	|| elements[i] == submit) {
		var	queryComponent = Form.Element.serialize(elements[i]);
		if (queryComponent)
			queryComponents.push(queryComponent);
		}
	}

	return queryComponents.join('&');
	};


Position.getViewPortBounds =
	function() {
	var	left;
	var	top;
	var	width;
	var	height;

	if (UserAgent.OPERA || UserAgent.WEBKIT) {
		left = self.pageXOffset;
		top	= self.pageYOffset;
		width = window.innerWidth;
		height = window.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight) {
		left = document.documentElement.scrollLeft;
		top	= document.documentElement.scrollTop;
		width =	document.documentElement.clientWidth;
		height = document.documentElement.clientHeight;
	}
	else if (document.body) {
		left = document.body.scrollLeft;
		top = document.body.scrollTop;
		width = document.body.clientWidth;
		height = document.body.clientHeight;
	}

	return { left: left, top: top, width: width, height: height	};
	};

// Inheritance
Class.subclass =
	function(subClass, superClass, properties) {
		function inheritance() {};
		inheritance.prototype =	superClass.prototype;
		subClass.prototype = new inheritance();
		if (properties)	{
			for	(property in properties) {
				subClass.prototype[property] = properties[property];
			}
		}
	};

// BASE
var	UserAgent =	{};

if (navigator.userAgent.indexOf('AppleWebKit') > -1) {
	UserAgent.WEBKIT = true;
}
else if	(navigator.userAgent.indexOf('Opera') >	-1)	{
	UserAgent.OPERA	= true;
	UserAgent.VERSION =	navigator.userAgent.match(/Opera.(\d)/)[1];
}
else if	(navigator.userAgent.indexOf('KHTML') >	-1)	{
	UserAgent.KHTML	= true;
}
else if	(navigator.userAgent.indexOf("Gecko") >	-1)	{
	UserAgent.GECKO	= true;
}
else if	(navigator.userAgent.indexOf("MSIE") > -1) {
	UserAgent.MSIE = true;
}

Event.mapMacKeypressKeyCode	=
	function(macKeyCode) {
		var	keyCode;
		switch(macKeyCode) {
		case 63232:
			keyCode	= Event.KEY_UP;
			break;
		case 63233:
			keyCode	= Event.KEY_DOWN;
			break;
		case 63276:
			keyCode	= Event.KEY_PAGEUP;
			break;
		case 63277:
			keyCode	= Event.KEY_PAGEDOWN;
			break;
		case 63273:
			keyCode	= Event.KEY_HOME;
			break;
		case 63275:
			keyCode	= Event.KEY_END;
			break;
		default:
			keyCode	= macKeyCode;
		}
	return keyCode;
	};

Form.Element.value =
	function(input)	{
		input =	$(input);
		var	value;
		if (!UserAgent.MSIE) {
			value =	input.value;
		}
		else {
			value =	input.value.replace(/\r\n/g, '\n');
		}
		return value;
	}

Form.Element.setSelectionRange =
	function(input,	start, end)	{
		input =	$(input);
		if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(start, end);
		}
		else if	(input.createTextRange)	{
			var	range =	input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', start);
			range.moveStart('character', end);
			range.select();
		}
	};

Form.Element.selectionStart	=
	function(input)	{
		input =	$(input);
		if (input.selectionStart !=	undefined) {
			return input.selectionStart;
		}
		else if	(document.selection	&& input.createTextRange) {
			var	s =	document.selection.createRange();
			var	r =	input.createTextRange();
			var	pos	= s.getBookmark().charCodeAt(2)	- r.getBookmark().charCodeAt(2);
			return pos;
		}
		else {
			return input.value.length;
		}
	};

Form.Element.selectionEnd =
	function(input)	{
		input =	$(input);
		if (input.selectionEnd != undefined) {
			return input.selectionEnd;
		}
		else if	(document.selection	&& input.createTextRange) {
			var	s =	document.selection.createRange();
			var	r =	input.createTextRange();
			var	pos	= (s.getBookmark().charCodeAt(2) + s.text.length) -	r.getBookmark().charCodeAt(2);
			return pos;
		}
		else {
			return input.value.length;
		}
	};

Form.Element.setCaretToStart =
	function(input)	{
		input =	$(input);
		if (input.setSelectionRange) {
			input.setSelectionRange(0,0);
		}
		else if	(input.createTextRange)	{
			var	range =	input.createTextRange();
			range.collapse(true);
			range.select();
		}
	};

Form.Element.setCaretToEnd =
	function(input)	{
		input =	$(input);
		if (input.setSelectionRange) {
			var	pos	= input.value.length;
			input.setSelectionRange(pos,pos);
		}
		else if	(input.createTextRange)	{
			var	range =	input.createTextRange();
			range.collapse(false);
			range.select();
		}
	};

Form.Element.scrollToEnd =
	function(input)	{
		input =	$(input);
		if (input.scrollTop	!= undefined &&	input.scrollHeight != undefined) input.scrollTop = input.scrollHeight - input.clientHeight;
	};

Form.Element.getRangeBounds	=
	function(element, rangeStart, rangeEnd)	{
		element	= $(element);
		var	value =	Form.Element.value(element);
		var	prefix = value.substr(0, rangeStart);
		var	range =	value.slice(rangeStart,	rangeEnd);
		var	postfix	= value.substr(rangeEnd);

		var	rLeft, rTop, rWidth, rHeight;

		var	r;
		if (element.createTextRange	&& (r =	element.createTextRange()).offsetLeft != undefined)	{
			r.moveStart('character', prefix.length);
			r.moveEnd('character', -postfix.length);
			rLeft =	r.offsetLeft + 2;
			rTop = r.offsetTop - 2;
			rWidth = r.boundingWidth;
			rHeight	= r.boundingHeight + 4;
		}
		if (rLeft == undefined)	{
			var	tfs;
			var	tfs_prefix;
			var	tfs_range;
			var	tfs_postfix;

			if (!Form.Element.tfs) {
				tfs	= document.createElement('div');
				tfs.style.position = 'absolute';
				tfs.style.left = '0px';
				tfs.style.top =	'0px';
				tfs.style.visibility = 'hidden';
				tfs.style.overflow = 'auto';
				tfs.style.border = 'solid black	1px';
				tfs.style.padding =	element.style.padding;
				tfs.style.background = 'red';
				document.body.appendChild(tfs);

				tfs_prefix = document.createElement('span');
				tfs_range =	document.createElement('span');
				tfs_range.style.background = 'green';
				tfs_postfix	= document.createElement('span');

				tfs.appendChild(tfs_prefix);
				tfs.appendChild(tfs_range);
				tfs.appendChild(tfs_postfix);
				Form.Element.tfs = tfs;
				Form.Element.tfs_prefix	= tfs_prefix;
				Form.Element.tfs_range = tfs_range;
				Form.Element.tfs_postfix = tfs_postfix;
			}
			else {
				tfs	= Form.Element.tfs;
				tfs_prefix = Form.Element.tfs_prefix;
				tfs_range =	Form.Element.tfs_range;
				tfs_postfix	= Form.Element.tfs_postfix;
			}

			tfs.style.display =	'';

			if (range.replace(/\s*/, '') ==	'')	range += '|';
			var	elDims = Element.getDimensions(element);

			tfs.style.width	= (elDims.width	- 4) + 'px';
			tfs.style.height = (elDims.height -	2) + 'px';
			tfs.style.fontSize = Element.getStyle(element, 'font-size');
			tfs.style.fontFamily = Element.getStyle(element, 'font-family');
			tfs.style.whiteSpace = 'pre';
			tfs.style.textAlign	= Element.getStyle(element,	'text-align') || 'left';

			tfs_prefix.innerHTML = prefix.replace(/\n/g,'<br/>');
			tfs_range.innerHTML	= range.replace(/\n/g,'<br/>');
			tfs_postfix.innerHTML =	postfix.replace(/\r\n/g,'<br />');
			tfs.scrollLeft = element.scrollLeft;
			tfs.scrollTop =	element.scrollTop;

			rLeft =	(tfs_range.offsetLeft -	tfs.scrollLeft)	+ 4;
			if (rLeft >	elDims.width) rLeft	= elDims.width - (tfs_range.offsetWidth	+ 4);
			rTop = tfs_range.offsetTop - tfs.scrollTop;
			rWidth = tfs_range.offsetWidth;
			rHeight	= tfs_range.offsetHeight + 4;
			tfs.style.display =	'none';
		}
		return { left: rLeft, top: rTop, width:	rWidth,	height:	rHeight	};
	};

var	OBC_TOOLKIT	= {};

OBC_TOOLKIT.tagsNormalize =
    function(value) { return value
		      .strip()
		      .replace(/[\r\n\t\"\'\\]/g, '')
		      .replace(new RegExp('[;' + String.fromCharCode(255 * 256 + 12) + String.fromCharCode(48 *	256 + 1) + ']', 'g'), ',')
		      .replace(/\s+/g, ' ')
		      .replace(/\,\ +/g, ',')
		      .replace(/\,/g, ', ')
		      .replace(/\,(\ ?\,)*/g, ',')
		      .replace(/\,\ ?$/, '')
		      .replace(/\<.*?\>/g, '')
		      .replace(/\</g,'')
		      .replace(/\>/g,'')
		      .replace(/\'/g,'');
    };

OBC_TOOLKIT.annotationNormalize	=
    function(value)	{ return value
			  .strip()
			  .replace(/\n*\s*$/g, '')
    };

Element.deepRemoveIds =
function(element) {
	if (element.nodeType ==	1) {
		element.removeAttribute('id');
		var	elements = element.getElementsByTagName('*');
		for	(var i = 0;	i != elements.length; i++) {
			elements[i].removeAttribute('id');
		}
	}
};

Element.deepVisible	=
function(element) {
	var	visible	= true;
	while (visible && element && element.style)	{
		visible	= (element.style.display !=	'none');
		element	= element.parentNode;
	}
	return visible && element == document;
};

Element.updateAnimated =
	function(element, innerHTML, options) {
		element	= $(element);
		options	= options || {};
		options.afterFinish	= function() { Element.remove(element);	};
		//		var	newElement = document.createElement(element.tagName);
		//		newElement.id =	element.id;
		//		Element.setStyle(newElement, { display:	'none',	width: '100%' });
		// TEST	IE
		var	newElement = element.cloneNode(false);
		Element.setStyle(newElement, { display:	'none' });
		newElement.innerHTML = innerHTML;
		Element.deepRemoveIds(element);
		element.parentNode.insertBefore(newElement,	element);
		return Transition.Morph(element, newElement, options);
	};

Element.replaceAnimated	=
	function(element, html,	options) {
		element	= $(element);
		var	cc = document.createElement('div');
		cc.innerHTML = html.strip();
		while(cc.firstChild	&& cc.firstChild.nodeType != 1)	{
			cc.removeChild(cc.firstChild);
		}
		var	newElement = cc.firstChild;
		if (!newElement) return;

		options	= options || {};
		options.afterFinish	= function() { Element.remove(element);	};

		Element.setStyle(newElement, { display:	'none' });
		if (!element.style.width) {	element.style.width	= '100%'; }
		Element.deepRemoveIds(element);
		element.parentNode.insertBefore(newElement,	element);
		return Transition.Morph(element, newElement, options);
	};

var	Transition = {};

Transition.Morph = function(element1, element2, options) {
	options = Object.extend({}, options || {});
	afterFinish = options.afterFinish || Prototype.emptyFunction;
	element1 = $(element1); element2 = $(element2);
	var oldStyle1 = {
		position: element1.style.position,
		visibility: element1.style.visibility,
		display: 'none',
		overflow: element1.style.overflow,
		width: element1.style.width,
		height:	element1.style.height
	};
	var oldStyle2 = {
		position: element2.style.position,
		visibility: element2.style.visibility,
		display: '',
		overflow: element2.style.overflow,
		width: element2.style.width,
		height:	element2.style.height
	};
	var dim1 = { width: element1.offsetWidth, height: element1.offsetHeight };
	Element.setStyle(element2, { position: 'absolute', visibility: 'hidden', display: '', width: dim1.width + 'px' });
	var	dim2 = { height: element2.offsetHeight };
	var	newStyle1 =	{ position:	'absolute',	visibility:	'',	overflow: 'hidden', width: dim1.width + 'px', height: dim1.height + 'px' };
	var	newStyle2 =	{ position:	'relative',	visibility:	'', overflow: 'hidden', height: dim1.height + 'px' };
	Element.setStyle(element1, newStyle1);
	Element.setOpacity(element2, 0.0);
	Element.setStyle(element2, newStyle2);
	options.afterFinish = 
	function() { 
		Element.setStyle(element1, oldStyle1);
		Element.setStyle(element2, oldStyle2);
		afterFinish(); 
	}.bind(this);
	var	effects	= [	new	Effect.Opacity(element1, { sync: true, from: 1.0, to: 0.0 }),
			new	Effect.Resize(element1,	{ sync:	true, scaleX: false, scaleY: true, newHeight: dim2.height }),
			new	Effect.Opacity(element2, { sync: true, from: 0.0, to: 1.0 }),
			new	Effect.Resize(element2,	{ sync:	true, scaleX: false, scaleY: true, newHeight: dim2.height })];
	return new Effect.Parallel(effects, options);
}

Effect.Resize =	Class.create();
Object.extend(Object.extend(Effect.Resize.prototype, Effect.Base.prototype), {
	initialize:
	function(element) {
		this.element = $(element);
		var	options	= Object.extend({ newWidth:	0, newHeight: 0, scaleX: true, scaleY: true	}, arguments[1]	|| {});
		this.start(options);
	},
		setup:
	function() {
		this.dims =	[this.element.offsetHeight,	this.element.offsetWidth];
		this.delta = [this.options.newHeight - this.dims[0], this.options.newWidth - this.dims[1]];
	},
		update:
	function(position) {
		this.setDimensions(this.dims[0]	+ this.delta[0]	* position,	this.dims[1] + this.delta[1] * position);
	},
		finish:
	function(position) {
	},
		setDimensions:
	function(height, width)	{
		var	d =	{};
		if(this.options.scaleX)	d.width	= width	+ 'px';
		if(this.options.scaleY)	d.height = height +	'px';

		Element.setStyle(this.element, d);
	}
});
// layeredpane.js
function LayeredPane(pane) {
	this.pane =	$(pane);
	this.options = Object.extend( {	transition:	Transition.Morph, duration:	1.0, prefix: ''	}, arguments[1]	|| {});
	this.visibleLayer =	$A(this.pane.childNodes).findAll(function(e) { return e.nodeType ==	1; }).detect(function(l) { return Element.visible(l); });
	this.switching = false;
}

LayeredPane.prototype =	{
	getLayers:
	function() {
		return $A(this.pane.childNodes).findAll(function(e)	{ return e.nodeType	== 1; });
	},

	getVisibleLayer:
	function() {
		return this.visibleLayer;
	},

	addLayer:
	function(layer)	{
		this.pane.appendChild(layer);
	},

	showLayer:
	function(layer,	options) {
	    var	transition;
	    if (layer && typeof layer == 'string') layer = this.options.prefix + layer;
		layer =	$(layer);
		if (!this.switching && layer != this.visibleLayer) {
		    this.switching = true;
		    options = options || {};
		    var	visibleLayer = this.visibleLayer;
		    this.visibleLayer =	layer;
		    transition = this.options.transition(visibleLayer, layer, {	duration: options.duration || this.options.duration, afterFinishInternal: this.afterSwitch.bind(this), afterFinish: options.afterFinish, sync: options.sync });
		}
	    return transition;
	},

	afterSwitch:
	function() {
		this.switching = false;
	}
}

// inplaceEditor.js
function InplaceEditor(instanceId, options)	{
	/* options */
	this.options = Object.extend({ insertStringEmpty: '',
														  insertStringNonEmpty:	'',
														  normalizeValue: function(value) {	return value; }
	}, options || {});

	this.normalizeValue	= this.options.normalizeValue;
	this.insertStringEmpty = this.options.insertStringEmpty;
	this.insertStringNonEmpty =	this.options.insertStringNonEmpty;
	this.insertedString	= '';

	/* get main	element	*/
	this.main		  =	document.getElementById('inplace_' + instanceId);

	/* get buttons */
	this.editButton	  =	document.getElementById('editButton_' +	instanceId);
	this.saveButton	  =	document.getElementById('saveButton_' +	instanceId);
	this.cancelButton =	document.getElementById('cancelButton_'	+ instanceId);

	/* get save	indicator */
	this.saveIndicator = document.getElementById('saveIndicator_' +	instanceId);

	/* get input and display fields	*/
	this.inputField	  =	document.getElementById('inputField_' +	instanceId);
	this.displayField =	document.getElementById('displayField_'	+ instanceId);

	/* get current value */
	this.value	 = this.normalizeValue(this.inputField.value);

	/* set display value */
	this.setDisplayValue(this.value);
	Event.observe(window, 'load', this.scrollDisplay.bind(this));

	/* add hover for display field and edit	button*/
	if (this.displayField) {
		Event.observe( this.displayField,
					   'mouseover',
					   function() {	Element.addClassName( this.displayField, 'hover'); }.bindAsEventListener(this) );

		Event.observe( this.displayField,
					   'mouseout',
					   function() {	Element.removeClassName(this.displayField, 'hover'); }.bindAsEventListener(this) );

		/* add on-click	to display field */
		Event.observe( this.displayField, 'click', this.onClickDisplayPane.bindAsEventListener(this) );

		if (this.editButton) {
			Event.observe( this.editButton,
						   'mouseover',
						   function() {	Element.addClassName( this.displayField, 'hover'); }.bindAsEventListener(this) );

			Event.observe( this.editButton,
						   'mouseout',
						   function() {	Element.removeClassName(this.displayField, 'hover'); }.bindAsEventListener(this) );
		}
	}
	/* add on-clicks to	buttons	*/
	if (this.editButton) {
		Event.observe( this.editButton,	'click', this.onClickDisplayPane.bindAsEventListener(this) );
	}
	if (this.saveButton) {
		Event.observe( this.saveButton,	'click', this.onClickSaveButton.bindAsEventListener(this) );
		/* add key listener	*/
		Event.observe(this.saveButton, (UserAgent.MSIE || UserAgent.KHTML) ? 'keydown' : 'keypress', this.onKeyPressSaveButton.bindAsEventListener(this));
	}
	if (this.cancelButton) {
		Event.observe( this.cancelButton, 'click', this.onClickCancelButton.bindAsEventListener(this) );
	}

	/* add key listener	*/
	Event.observe(this.main, (UserAgent.MSIE ||	UserAgent.KHTML) ? 'keydown' : 'keypress', this.onKeyPressInputField.bindAsEventListener(this));

	/* make	layers */
	this.layeredPane = new LayeredPane(this.main, {	duration: 0.3 });
	var	layers = this.layeredPane.getLayers();
	this.showLayer	 = layers[0];
	this.editLayer	 = layers[1];

	/* flags */
	this.editing = false;
	this.blocked = false;
}

InplaceEditor.prototype	= {
	getInput:
	function() {
	return this.inputField;
	},

	onClickDisplayPane:
	function(event)	{
	Event.stop(event);
	this.edit(event.shiftKey ? 2 : undefined);
	},

	onClickSaveButton:
	function(event)	{
	Event.stop(event);
	this.save(event.shiftKey ? 2 : undefined);
	},

	onClickCancelButton:
	function(event)	{
	Event.stop(event);
	this.cancel(event.shiftKey ? 2 : undefined);
	},

	onKeyPressInputField:
	function(event)	{
	var	keyCode;
	if (UserAgent.WEBKIT) {
		keyCode	= Event.mapMacKeypressKeyCode(event.keyCode);
	}
	else {
		keyCode	= event.keyCode;
	}
	switch(keyCode)	{
		case Event.KEY_RETURN:
		if (!this.options.textareamode)	{
		this.save();
		}
		break;
		case Event.KEY_ESC:
		this.cancel();
		break;
	}
	},

	onKeyPressSaveButton:
	function(event)	{
	var	keyCode;
	if (UserAgent.WEBKIT) {
		keyCode	= Event.mapMacKeypressKeyCode(event.keyCode);
	}
	else {
		keyCode	= event.keyCode;
	}
	switch(keyCode)	{
		case Event.KEY_RETURN:
		this.save();
		break;
	}
	},

	edit:
	function(switchDuration) {
	    if (!this.editing && !this.blocked)	{
		this.editing = true;
		if (this.value == '') {
		    this.inputField.value =	this.value + this.insertStringEmpty;
		    this.insertedString	= this.normalizeValue(this.insertStringEmpty);
		}
		else {
		    this.inputField.value =	this.value + this.insertStringNonEmpty;
		    this.insertedString	= this.normalizeValue(this.insertStringNonEmpty);
		}
		this.layeredPane.showLayer(this.editLayer,
		    { afterFinish: function() {
			if (this.options.textareamode) {
			    Form.Element.setCaretToEnd(this.inputField);
			    Form.Element.scrollToEnd(this.inputField);
			}
			else {
			    Form.Element.setSelectionRange(this.inputField,
							   this.inputField.value.length,
							   this.inputField.value.length	);
			}
			this.inputField.focus();
			if (this.displayField) { Element.removeClassName(this.displayField, 'hover'); }
		    }.bind(this),
		      duration:	switchDuration
		    } );
	    }
	},

	save:
	function(switchDuration) {
		if (this.editing) {
			var	tmpValue = this.normalizeValue(this.inputField.value);
			if (tmpValue.slice(-this.insertedString.length)	== this.insertedString)	{
				tmpValue = tmpValue.slice(0, -this.insertedString.length);
				tmpValue = this.normalizeValue(tmpValue);
			}
			if (tmpValue !=	this.value)	this.setDisplayValue(tmpValue);
			this.layeredPane.showLayer(this.showLayer, { duration: switchDuration, afterFinish: this.afterSwitch.bind(this) });
			if (tmpValue !=	this.value)	{
				this.blocked = true;
				this.value = tmpValue;
				this.editButton.style.display =	'none';
				this.saveIndicator.style.display = 'block';
				var	tmp	= this.options.saveParameters +	'&'	+ encodeURIComponent(this.options.fieldName) + '=' + encodeURIComponent(this.value);
				new	Ajax.Request( this.options.saveAction, { method: 'post', parameters: tmp, onComplete: this.onCompleteSave.bind(this) });
			}
			else {
				this.editing = false;
			}
		}
	},
	
	afterSwitch:
	function() {
		if (!this.blocked) this.editButton.focus();
		this.scrollDisplay();
	},

	onCompleteSave:
	function(transport)	{
		setTimeout(function(transport) {
			this.saveIndicator.style.display = 'none';
			this.editButton.style.display =	'block';
			this.editButton.focus();
			this.editing = false;
			this.blocked = false;
			var	responseObj;
			try	{
				responseObj	= eval(transport.responseText);
			} catch(e) {}
			if (!responseObj ||	responseObj.confirm	!= 'OK') {
				this.displayField.innerHTML	= 'ERROR';
			}
			if (responseObj.exec) {
				eval(responseObj.exec);
			}
		}.bind(this, transport), 500);
	},
	
	cancel:
	function(switchDuration) {
		if (this.editing) {
			this.editing = false;
			this.layeredPane.showLayer(this.showLayer, { duration: switchDuration, afterFinish: this.afterSwitch.bind(this) });
		}
	},
	
	setDisplayValue:
	function(value) {
		var style;
		var displayValue;
		if (value == '') {
			displayValue = this.options.createText;
			style = ' style="color: grey;"';
		}
		else {
			displayValue = value;
			style = '';
		}
		displayValue = displayValue
		.replace(/\</g, '&lt;')
		.replace(/\>/g, '&gt;')
		.replace(/\"/g, '&quot;')
		.replace(/\$/g, '&#x0024;')
		.replace(/\n/g, '<br>');
		this.displayField.innerHTML = '<div class="inlineedit-display"' + style + '>' + displayValue + '</div>';
	},
	
	scrollDisplay:
	function() {
		Form.Element.scrollToEnd(this.displayField.childNodes[0]);
	}
}

// suggestor.js
function SimpleSuggestor(suggestions, options) {
	this.suggestions = suggestions || [];
	this.options = Object.extend({ suggestionClass: SimpleSelectItem }, options || {});
}

SimpleSuggestor.prototype =	{
	setSuggestions:
	function(suggestions) {
		this.suggestions = suggestions || [];
	},

	getSuggestions:
	function(token,	callback) {
		var	normalizedToken	= this.options.normalize ? this.options.normalize(token) : token;
		var	filteredSuggestions	= [];
		for	(var i = 0;	i <	this.suggestions.length; i++) {
			var	normalizedSuggestion = this.options.normalize ?	this.options.normalize(this.suggestions[i])	: this.suggestions[i];
			if (normalizedSuggestion.slice(0, normalizedToken.length) == normalizedToken) {
				var	selectItem;
				if (this.options.suggestionClass) {
					selectItem = new this.options.suggestionClass(this.suggestions[i]);
				}
				else if	(this.options.transformFunction) {
					selectItem = this.options.transformFunction(this.suggestions[i]);
				}
				else {
					selectItem = this.suggestions[i];
				}
				filteredSuggestions.push(selectItem);
			}
		}
		callback(token,	filteredSuggestions);
	}
};

var	Suggestor =	{
	normalize:
	function(token)	{
		var	normalizedToken	= token.replace(/[\	\-\_\&\/]/g, '').toUpperCase();
		return normalizedToken;
	}
}

// popup.js
function PopUp(position, options) {
	this.position =	position;
	this.active	= false;

	this.options = Object.extend({ style: {}, className: '', selects: [] }, options || {});
	var	style =	Object.extend({	display: 'none', position: 'absolute' }, this.options.style);

	this.element = document.createElement('div');
	this.element.className = this.options.className;
	Element.setStyle(this.element, style);
}

PopUp.prototype	= {
	getElement:
	function() {
		return this.element;
	},

	setContent:
	function(content) {
		if (this.content) {
			this.element.replaceChild(content, this.content);
			this.content = content;
		}
		else {
			this.element.appendChild(content);
			this.content = content;
		}
	},

	show:
	function(bounds) {
		if (UserAgent.MSIE) {
			for (var i = 0; i < this.options.selects.length; i++) {
				$(this.options.selects[i]).style.visibility = 'hidden';
			}
		}
		if (this.element.parentNode	!= document.body) {
			document.body.appendChild(this.element);
		}
		if (bounds)	{
			this.position(this.element,	bounds);
		}
		Element.setStyle(this.element, { display: '' });

		this.active	= true;
	},

	hide:
	function() {
		if (UserAgent.MSIE) {
			for (var i = 0; i < this.options.selects.length; i++) {
				$(this.options.selects[i]).style.visibility = '';
			}
		}
	    this.active	= false;
	    Element.setStyle(this.element, { display: 'none', left: '0', top: '0' });
	}
}

PopUp.position =
	function(element, bounds) {
		var	left, top;
		var	elDims = Element.getDimensions(element);
		elDims.width +=	2;

		var	vB = Position.getViewPortBounds();

		var	scrollX	= vB.left; // window.pageXOffset ||	document.documentElement.scrollLeft;
		var	scrollY	= vB.top; // window.pageYOffset	|| document.documentElement.scrollTop;
		var	innerWidth = vB.width; // window.innerWidth	|| document.documentElement.clientWidth;
		var	innerHeight	= vB.height; //	window.innerHeight || document.documentElement.clientHeight;

		if (UserAgent.GECKO) {
			innerWidth = document.body.clientWidth;
			innerHeight	= window.innerHeight;
		}

		else if	(UserAgent.MSIE) {
			innerWidth = document.documentElement.clientWidth;
			innerHeight	= document.documentElement.clientHeight;
			scrollX	= document.documentElement.scrollLeft;
			scrollY	= document.documentElement.scrollTop;
		}

		else if	(UserAgent.WEBKIT) {
			innerWidth = window.innerWidth;
			innerHeight	= window.innerHeight - 1;
		}

		if (innerWidth + scrollX > bounds.left + elDims.width) {
			left = bounds.left + 'px';
		}
		else {
			left = ((innerWidth	- elDims.width)	+ scrollX) + 'px';
		}

		if (innerHeight	+ scrollY >	bounds.top + bounds.height + elDims.height)	{
			top	= (bounds.top +	bounds.height) + 'px';
		}
		else {
			top	= (bounds.top -	elDims.height) + 'px';
		}

		element.style.left = left;
		element.style.top =	top;
	}

// select.js
function Select(options) {
	this.options = Object.extend({ choices:	10, className: '', selectedClassName: 'selected' }, options ||	{});

	this.element = document.createElement('div');
	this.element.className = this.options.className;
	Element.setStyle(this.element, { display: '', position:	'relative', top: '0', left: '0' });

	this.arrowUp = document.createElement('img');
	this.arrowUp.className = 'up-arrow';
	this.arrowUp.src = '/img/xing/arrow_up.gif';
	this.arrowUp.alt = 'up';
	this.arrowUp.display = 'none';
	this.element.appendChild(this.arrowUp);

	this.arrowDown = document.createElement('img');
	this.arrowDown.className = 'down-arrow';
	this.arrowDown.src = '/img/xing/arrow_down.gif';
	this.arrowDown.alt = 'down';
	this.arrowDown.display = 'none';
	this.element.appendChild(this.arrowDown);

	this.list = document.createElement('ul');
	this.element.appendChild(this.list);

	this.active	= false;
	this.index = undefined;
	this.sO	= undefined;
	this.vRS = undefined;
	this.vRE = undefined;

	this.onMouseMoveListener = this.onMouseMove.bind(this);
	this.onClickListener = this.onClick.bind(this);

	if (UserAgent.MSIE || UserAgent.WEBKIT)	Event.observe(this.element,	"mousewheel", this.onScrollA.bind(this));
	else if	(UserAgent.GECKO) Event.observe(this.element, "DOMMouseScroll",	this.onScrollB.bind(this));
}

Select.prototype = {
	setCallback:
	function(callback) {
		this.callback =	callback;
	},

	getElement:
	function() {
		return this.element;
	},

	setVisibleRange:
	function(vRS) {
		if (this.options.choices < this.sO.length) {
			if (vRS	< 0) {
				vRS	= 0;
			}
			else if	(vRS > this.sO.length -	this.options.choices) {
				vRS	= this.sO.length - this.options.choices;
			}
			if (vRS	== this.vRS	- 1) {
				this.removeSelectItem(this.sO[this.vRE - 1].getDOMElement());
				this.addSelectItem(this.sO[vRS].getDOMElement(), this.sO[this.vRS].getDOMElement());
			}
			else if	(vRS ==	this.vRS + 1) {
				this.removeSelectItem(this.sO[this.vRS].getDOMElement());
				this.addSelectItem(this.sO[this.vRE].getDOMElement());
			}
			else if	(vRS < this.vRS) {
				for	(var i = vRS, j	= this.vRS;	j <	this.vRE; i++, j++)	{
					Event.stopObserving(this.sO[j].getDOMElement(),	"mousemove", this.onMouseMoveListener);
					Event.stopObserving(this.sO[j].getDOMElement(),	"click", this.onClickListener);
					this.list.replaceChild(this.sO[i].getDOMElement(), this.sO[j].getDOMElement());
					Event.observe(this.sO[i].getDOMElement(), "mousemove", this.onMouseMoveListener);
					Event.observe(this.sO[i].getDOMElement(), "click", this.onClickListener);
				}
			}
			else if	(vRS > this.vRS) {
				for	(var i = (vRS +	this.options.choices) -	1, j = this.vRE	- 1; j >= this.vRS;	i--, j--) {
					Event.stopObserving(this.sO[j].getDOMElement(),	"mousemove", this.onMouseMoveListener);
					Event.stopObserving(this.sO[j].getDOMElement(),	"click", this.onClickListener);
					this.list.replaceChild(this.sO[i].getDOMElement(), this.sO[j].getDOMElement());
					Event.observe(this.sO[i].getDOMElement(), "mousemove", this.onMouseMoveListener);
					Event.observe(this.sO[i].getDOMElement(), "click", this.onClickListener);
				}
			}
			this.vRS = vRS;
			this.vRE = vRS + this.options.choices;
			this.setArrows();
		}
	},

	addSelectItem:
	function(element, nextSibiling)	{
		Event.observe(element, "mousemove", this.onMouseMoveListener);
		Event.observe(element, "click", this.onClickListener);
		if (nextSibiling !=	undefined) {
			this.list.insertBefore(element, nextSibiling);
		}
		else {
			this.list.appendChild(element);
		}
	},

	removeSelectItem:
	function(element) {
		this.list.removeChild(element);
		Event.stopObserving(element, "mousemove", this.onMouseMoveListener);
		Event.stopObserving(element, "click", this.onClickListener);
	},

	isActive:
	function() {
		return this.active;
	},

	onKeyPress:
	function(event)	{
		if (this.isActive()) {
			var	keyCode;
			if (UserAgent.WEBKIT) {
				keyCode	= Event.mapMacKeypressKeyCode(event.keyCode);
			}
			else {
				keyCode	= event.keyCode;
			}
			switch(keyCode)	{
				case Event.KEY_UP:
				Event.stop(event);
				this.markPrevious();
				break;
				case Event.KEY_DOWN:
				Event.stop(event);
				this.markNext();
				break;
				case Event.KEY_PAGEUP:
				Event.stop(event);
				this.pageUp();
				break;
				case Event.KEY_PAGEDOWN:
				Event.stop(event);
				this.pageDown();
				break;
				case Event.KEY_HOME:
				Event.stop(event);
				this.posFirst();
				break;
				case Event.KEY_END:
				Event.stop(event);
				this.posLast();
				break;
				case Event.KEY_ESC:
				Event.stop(event);
				this.callback();
				break;
				case Event.KEY_RETURN:
				case Event.KEY_TAB:
				if (this.selectEntry())	{
					Event.stop(event);
				}
				break;
			}
		}
	},

	markPrevious:
	function() {
		if (this.sO) {
			if (this.index != undefined) {
				Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
			}
			if (this.index == undefined) {
				this.index = this.sO.length	- 1;
			}
			else if	(this.index	> 0) {
				this.index = this.index	- 1;
			}
			if (this.index < this.vRS) {
				this.setVisibleRange(this.index);
			}
			else if	(this.index	> this.vRE - 1)	{
				this.setVisibleRange((this.index - this.options.choices) + 1);
			}
			if (this.sO[this.index].getValue() != undefined) {
				Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
			}
		}
	},

	markNext:
	function() {
		if (this.sO) {
			if (this.index != undefined) {
				Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
			}
			if (this.index == undefined) {
				this.index = 0;
			}
			else if	(this.index	< this.sO.length - 1) {
				this.index = this.index	+ 1;
			}
			if (this.index < this.vRS) {
				this.setVisibleRange(this.index);
			}
			else if	(this.index	> this.vRE - 1)	{
				this.setVisibleRange((this.index - this.options.choices) + 1);
			}
			if (this.sO[this.index].getValue() != undefined) {
				Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
			}
		}
	},

	pageUp:
	function() {
		if (this.index != undefined) {
			Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		else {
			this.index = this.sO.length	- 1;
		}
		this.index -= this.options.choices;
		if (this.index < 0)	this.index = 0;
		if (this.sO[this.index].getValue() != undefined) {
			Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.setVisibleRange(this.vRS -	this.options.choices);
	},

	pageDown:
	function() {
		if (this.index != undefined) {
			Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		else {
			this.index = 0;
		}
		this.index += this.options.choices;
		if (this.index > this.sO.length	- 1) this.index	= this.sO.length - 1;
		if (this.sO[this.index].getValue() != undefined) {
			Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.setVisibleRange(this.vRS +	this.options.choices);
	},

	posFirst:
	function() {
		if (this.index != undefined) {
			Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.index = 0;
		if (this.sO[this.index].getValue() != undefined) {
			Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.setVisibleRange(0);
	},

	posLast:
	function() {
		if (this.index != undefined) {
			Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.index = this.sO.length	- 1;
		if (this.sO[this.index].getValue() != undefined) {
			Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.setVisibleRange(this.sO.length	- this.options.choices);
	},

	selectEntry:
	function() {
		if (this.index != undefined) {
			this.callback(this.sO[this.index]);
			return true;
		}
		else {
			this.callback();
			return false;
		}
	},

	setSelectOptions:
	function(sO, vRS) {
	    if (this.sO) {
		for (; this.vRS	< this.vRE; this.vRS++)	{
		    this.removeSelectItem(this.sO[this.vRS].getDOMElement());
		}
	    }

	    var	maxWidth = 0;
	    for	(var i = 0;	i <	sO.length; i++)	{
		var curWidth = sO[i].getMinWidth();
		if (curWidth > maxWidth) maxWidth = curWidth;
		sO[i].getDOMElement().autocompleteIndex	= i;
	    }

	    for	(var i = 0; i < sO.length; i++) {
		sO[i].setWidth(maxWidth);
	    }

	    if (!vRS ||	vRS	< 0) {
		vRS	= 0;
	    }
	    else if	(vRS > this.sO.length -	this.options.choices) {
		vRS	= this.sO.length - this.options.choices;
	    }

	    this.index = undefined;
	    this.sO	= sO;
	    this.vRS = vRS;
	    this.vRE = this.vRS;

	    for	(; this.vRE	< this.vRS + this.options.choices && this.vRE <	this.vRS + this.sO.length; this.vRE++) {
		this.addSelectItem(sO[this.vRE].getDOMElement());
	    }

	    this.setArrows();
	},

	selectValue:
	function(value)	{
		if (this.index != undefined) {
			Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.index = undefined;
		if (value && this.sO) {
			for	(var i = 0;	this.index == undefined	&& i < this.sO.length; i++)	{
				if (this.sO[i].getValue() == value)	{
					this.index = i;
					Element.addClassName(this.sO[i].getDOMElement(), this.options.selectedClassName);
				}
			}
		}
	},

	getSelectedValue:
	function() {
		return (this.index != undefined) ? this.sO[this.index].getValue() :	undefined;
	},

	setArrows:
	function() {
		if (this.vRS ==	0) {
			this.arrowUp.style.display =	'none';
		}
		else {
			this.arrowUp.style.display =	'';
		}
		if (this.vRE ==	this.sO.length)	{
			this.arrowDown.style.display	= 'none';
		}
		else {
			this.arrowDown.style.display	= '';
		}
	},

	onMouseMove:
	function(event)	{
	    if (this.isActive()) {
		if (this.index >= 0) {
		    Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
		this.index = Event.findElement(event, 'LI').autocompleteIndex;
		if (this.sO[this.index].getValue() != undefined) {
		    Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
		}
	    }
	},

	onClick:
	function(event)	{
		if (this.isActive()) {
			if (this.index >= 0) {
				Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
			}
			this.index = Event.findElement(event, 'LI').autocompleteIndex;
			if (this.sO[this.index].getValue() != undefined) {
				Element.addClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
				this.selectEntry();
			}
		}
	},

	onScrollA:
	function(event)	{
		if (this.isActive()) {
			if(event.wheelDelta	> 0) {
				this.setVisibleRange(this.vRS -	1);
			}
			else  {
				this.setVisibleRange(this.vRS +	1);
			}
			Event.stop(event);
		}
	},

	onScrollB:
	function(event)	{
		if (this.isActive()) {
			if(event.detail	< 0) {
				this.setVisibleRange(this.vRS -	1);
			}
			else  {
				this.setVisibleRange(this.vRS +	1);
			}
			Event.stop(event);
		}
	},

	activate:
	function() {
		this.active	= true;
	},

	deactivate:
	function() {
	    this.active	= false;
	    if (this.index != undefined) {
		Element.removeClassName(this.sO[this.index].getDOMElement(), this.options.selectedClassName);
	    }
	    this.index = undefined;
	}
}

function SimpleSelectItem(text)	{
	this.text =	text;
}

SimpleSelectItem.prototype = {
	getDOMElement:
	function() {
		if (this.DOMElement	== undefined) {
			this.DOMElement	= document.createElement('li');
			this.DOMElement.appendChild(document.createTextNode(this.text));
			if (!SimpleSelectItem.wtc) {
				var div = document.createElement('div');
				div.className = 'auto-complete';
				Element.setStyle(div, { position: 'absolute', left: '0', top: '0' });
				document.body.appendChild(div);
				SimpleSelectItem.wtc = document.createElement('ul');
				div.appendChild(SimpleSelectItem.wtc);
			}
			SimpleSelectItem.wtc.appendChild(this.DOMElement);
			this.minWidth =	this.DOMElement.offsetWidth - 33;
			SimpleSelectItem.wtc.removeChild(this.DOMElement);
		}
		return this.DOMElement;
	},

	getMinWidth:
	function() {
		if (this.DOMElement	== undefined) {
			this.getDOMElement();
		}
		return this.minWidth;
	},

	setWidth:
	function(width)	{
		if (this.DOMElement	== undefined) {
			this.getDOMElement();
		}
		Element.setStyle(this.DOMElement, {	width: width + 'px'	});
	},

	getValue:
	function() {
		return this.text;
	}
}


// autocompleter.js
function Autocompleter(element,	options) {
    this.options = Object.extend({ minTokenLength: 1, delimiters: [',',	';', String.fromCharCode(255 * 256 + 12), String.fromCharCode(48 * 256 + 1), '\n'],	insertString: ', ',	delay: 50 }, options ||	{});
    this.ignoreMinTokenLengthOn	= $A(this.options.ignoreMinTokenLengthOn);

    this.element = $(element);
    this.isTextfield = this.element.tagName == 'INPUT';

    Event.observe(this.element,	'blur',	this.onBlur.bindAsEventListener(this), true);
    Event.observe(this.element,	(UserAgent.MSIE	|| UserAgent.KHTML)	? 'keydown'	: 'keypress', this.onKeyPress.bindAsEventListener(this));
    Event.observe(this.element,	'keyup', this.onKeyUp.bindAsEventListener(this));

    this.suggestor = this.options.suggestor;

    this.select = this.options.select;
    this.select.setCallback(this.insert.bind(this));
    Event.observe(this.select.getElement(), 'mousedown', this.blockBlur.bindAsEventListener(this), true);

    this.popup = this.options.popup;
    if (this.popup)	{
	this.popup.setContent(this.select.getElement());
    }

    this.active	= false;
    this.blurBlocked = false;
    this.currentToken =	undefined;
    this.requestedToken	= undefined;
    this.triggerTimeout	= undefined;
}

Autocompleter.prototype	= {
	isActive:
	function() {
		return this.active;
	},

	onKeyPress:
	function(event)	{
		if (this.isActive()) {
			this.select.onKeyPress(event);
		}
		else {
			var	keyCode;
			if (UserAgent.WEBKIT) {
				keyCode	= Event.mapMacKeypressKeyCode(event.keyCode);
			}
			else {
				keyCode	= event.keyCode;
			}
			switch(keyCode)	{
				case Event.KEY_PAGEUP:
				case Event.KEY_PAGEDOWN:
				Event.stop(event);
				this.triggerUpdate(this.ignoreMinTokenLengthOn.detect(function(o) {	return o ==	keyCode; })	!= undefined);
				break;
				case Event.KEY_UP:
				case Event.KEY_DOWN:
				if (this.isTextfield) {
					Event.stop(event);
					this.triggerUpdate(this.ignoreMinTokenLengthOn.detect(function(o) {	return o ==	keyCode; })	!= undefined);
				}
				break;
				default:
				this.select.onKeyPress(event);
			}
		}
	},

	onKeyUp:
	function(event)	{
		if (this.isActive()) {
			switch(event.keyCode) {
				case Event.KEY_UP:
				case Event.KEY_DOWN:
				case Event.KEY_PAGEUP:
				case Event.KEY_PAGEDOWN:
				case Event.KEY_HOME:
				case Event.KEY_END:
				case Event.KEY_RETURN:
				case Event.KEY_TAB:
				case Event.KEY_ESC:
				break;
				default:
				this.triggerUpdate();
				break;
			}
		}
		else {
			switch(event.keyCode) {
				case Event.KEY_LEFT:
				case Event.KEY_RIGHT:
				case Event.KEY_UP:
				case Event.KEY_DOWN:
				case Event.KEY_PAGEUP:
				case Event.KEY_PAGEDOWN:
				case Event.KEY_RETURN:
				case Event.KEY_TAB:
				case Event.KEY_ESC:
				break;
				default:
				this.triggerUpdate(this.ignoreMinTokenLengthOn.detect(function(o) {	return o ==	event.keyCode; }) != undefined);
				break;
			}
		}
	},

	triggerUpdate:
	function(force)	{
		if (this.triggerTimeout) clearTimeout(this.triggerTimeout);
		this.triggerTimeout	= setTimeout(this.updateSuggestions.bind(this, force), this.options.delay);
	},

	updateSuggestions:
	function(force)	{
	    var	token =	this.getToken();
	    if (token.end == token.caretPos && (token.end - token.start >= this.options.minTokenLength || force)) {
		var newToken = token.value.slice(token.start, token.caretPos);
		if (newToken !=	this.requestedToken	&& newToken	!= this.currentToken) {
		    this.requestedToken	= newToken;
		    this.suggestor.getSuggestions(this.requestedToken, this.receiveSuggestions.bind(this));
		}
	    }
	    else if (this.isActive()) {
		this.deactivate();
	    }
	},

	receiveSuggestions:
	function(token,	suggestions) {
		if (token == this.requestedToken &&	suggestions.length > 0)	{
			var	selectedValue;
			if (this.isActive()) {
				selectedValue =	this.select.getSelectedValue();
				this.deactivate();
			}
			this.select.setSelectOptions(suggestions, 0);
			this.select.selectValue(selectedValue);
			this.activate();
			this.requestedToken	= '';
			this.currentToken =	token;
		}
		else if	(this.isActive()) {
			this.deactivate();
		}
	},

	onBlur:
	function(event)	{
		if (this.blurBlocked) {
			Event.stop(event);
			this.blurBlocked = false;
			this.element.focus();
		}
		else {
			this.deactivate();
		}
	},

	blockBlur:
	function(event)	{
		Event.stop(event);
		this.blurBlocked = true;
	},

	insert:
	function(selectItem) {
	    var text;
	    if (selectItem) {
		text = selectItem.getValue();
	    }
	    this.deactivate();
	    if (text !=	undefined) {
		var token = this.getToken(true);
		var prefix = token.value.slice(0, token.start);
		var postfix = token.value.slice(token.end);
		var insertDelimiter = !this.options.insertDelimiterOnlyAtEnd ||	postfix.replace(/\s*/, '').length == 0;
		this.element.value = prefix + text + (insertDelimiter ?	this.options.insertString : '') + postfix;
		var caretPos = token.start + text.length + (insertDelimiter ? this.options.insertString.length : 0);
		Form.Element.setSelectionRange(this.element, caretPos, caretPos);
	    }
	    this.element.focus();
	},

	getToken:
	function(last) {
		var	newValue = Form.Element.value(this.element);
		if (!last && (this.value !=	newValue ||	this.selectionStart	!= Form.Element.selectionStart(this.element) ||	this.selectionEnd != Form.Element.selectionEnd(this.element))) {
			this.value = newValue;
			this.selectionStart	= Form.Element.selectionStart(this.element);
			this.selectionEnd =	Form.Element.selectionEnd(this.element);

			var	prefix = this.value.slice(0, this.selectionStart);
			var	postfix	= this.value.slice(this.selectionEnd);

			var	delimPosPrefix = -1;
			for	(var i = 0;	i <	this.options.delimiters.length;	i++) {
				var	pos	= prefix.lastIndexOf(this.options.delimiters[i]);
				if (pos	> delimPosPrefix) delimPosPrefix = pos;
			}

			var	delimPosPostfix	= postfix.length;
			for	(var i = 0;	i <	this.options.delimiters.length;	i++) {
				var	pos	= postfix.indexOf(this.options.delimiters[i]);
				if (pos	>= 0 &&	pos	< delimPosPostfix) delimPosPostfix = pos;
			}

			this.token = { changed:	true, start: this.selectionStart - prefix.slice(delimPosPrefix + 1).replace(/^\s*/,'').length,
						   end:	this.selectionEnd +	postfix.slice(0, delimPosPostfix).replace(/\s*$/,'').length,
						   caretPos: this.selectionStart,
						   value: this.value };
		}
		else {
			this.token.changed = false;
		}
		return this.token;
	},

	activate:
	function() {
		this.select.activate();
		if (this.popup)	{
			var	token =	this.getToken();
			var	bounds = Form.Element.getRangeBounds(this.element, token.start,	token.caretPos);
			var	iPos = Position.cumulativeOffset(this.element);
			bounds.left	+= iPos[0] - 1;
			bounds.top += iPos[1];
			this.popup.show(bounds);
		}
		this.active	= true;
	},

	deactivate:
	function() {
		this.active	= false;
		this.blurBlocked = false;
		this.currentToken =	undefined;
		this.requestedToken	= undefined;

		if (this.triggerTimeout) clearTimeout(this.triggerTimeout);
		if (this.popup)	this.popup.hide();
		this.select.deactivate();
	}
}

function DependentSelect(args) {
	this.map			= args['map'];
	this.mapKeys		= args['mapKeys'];

	this.masterSelect		= document.getElementById(args['masterSelect']);
	this.initialInput		= document.getElementById(args['dependentSelect']);
	this.container		= this.initialInput.parentNode;
	this.currentInput		= this.initialInput;
	this.inputs			= {};
	this.labels			= [];
	if (args['labels'])	{
		for	(var i = 0;	i <	args['labels'].length; i++)	{
			var	label_id = args['labels'][i];
			var	label =	document.getElementById(label_id);
			if (label) this.labels.push(label);
		}
	}
	this.noKeyOption	= args['noKeyOption'] || {};
	this.undefinedOption	= args['undefinedOption'] || {};
	this.noOption		= args['noOption'] || {};
	this.singleOption		= args['singleOption'] || {};
	this.multipleOptions	= args['multipleOptions'] || {};
	this.onChangeListener = args['onChange'];

	this.onchange();
	Event.observe(this.masterSelect, 'change', this.onchange.bind(this));
};

DependentSelect.prototype.onchange =
	function(event)	{
		var	value = this.masterSelect.value;
		var key = 'key:' + value;
		var	nextInput;
		var	hideLabel;

		if (!value) {
			if (!this.inputs[key]) {
				if (this.noKeyOption.hidden) this.inputs[key] = this.createHiddenInput();
				else this.inputs[key] = this.initialInput;
			}
			hideLabel = this.noKeyOption.hidden;
		}
		else if (!this.map[value]) {
			if (!this.inputs[key]) {
				if (this.undefinedOption.hidden) this.inputs[key] = this.createHiddenInput();
				else this.inputs[key] = this.initialInput;
			}
			hideLabel = this.undefinedOption.hidden;
		}
		else if	(this.map[value].length == 0) {
			if (!this.inputs[key]) {
				this.inputs[key] = this.createHiddenInput();
			}
			hideLabel =	true;
		}
		else if	(this.map[value].length == 1)	{
			if (!this.inputs[key]) {
				if (this.singleOption.hidden) this.inputs[key] = this.createHiddenInput(this.mapKeys ? this.map[value][0][this.mapKeys.value] : this.map[value][0]);
				else this.inputs[key] = this.createSelect(value, this.singleOption);
			}
			hideLabel =	this.singleOption.hidden;
		}
		else if (this.map[value].length > 1) {
			if (!this.inputs[key]) {
				this.inputs[key] = this.createSelect(value, this.multipleOptions);
			}
			hideLabel =	false;
		}
		if (this.currentInput != this.inputs[key])	{
			var	visibilityAttribute	= hideLabel	? 'hidden' : '';
			for	(var i = 0;	i <	this.labels.length;	i++) {
				this.labels[i].style.visibility	= visibilityAttribute;
			}
			this.container.replaceChild(this.inputs[key], this.currentInput);
			this.currentInput =	this.inputs[key];
		}
		if (this.onChangeListener) this.onChangeListener(value);
	};

DependentSelect.prototype.createHiddenInput =
	function(value) {
		var input = document.createElement('input');
		input.type = 'hidden';
		input.id = this.initialInput.id;
		input.name = this.initialInput.name;
		input.value = value;
		return input;
	};

DependentSelect.prototype.createSelect =
	function(key, selectOptions) {
	var	currentValue	= this.currentInput.value;
	var	select		= document.createElement('select');
	select.id		= this.initialInput.id;
	select.name		= this.initialInput.name;
	select.className	= this.initialInput.className;
	select.style.width	= this.initialInput.style.width;
	var	i =	0;
	if (selectOptions.emptyOption) {
		select.options[i] =	new	Option(selectOptions.emptyOption, '');
		i++;
	}
	var	selectedIndex =	0;
	for	(var j = 0;	j <	this.map[key].length; j++, i++)	{
		var	value;
		var	label;
		if (this.mapKeys) {
		value =	this.map[key][j][this.mapKeys.value];
		label =	this.map[key][j][this.mapKeys.label];
		}
		else {
		value =	this.map[key][j];
		label =	this.map[key][j];
		}
		// we cant use the selected	paramter of	the	constructor, since IE magically	selects	previous option
		select.options[i] =	new	Option(label, value, false,	false);
		if (value == currentValue) {
		selectedIndex =	i;
		}
	}
	select.selectedIndex = selectedIndex;
	return select;
	};

var Overlay = {
	start:
	function(options) {
		this.options = options || {};
		if (UserAgent.MSIE)	{
			var	selects	= document.getElementsByTagName('select');
			for	(i = 0;	i <	selects.length;	i++) {
				selects[i].style.visibility	= 'hidden';
			}
		}
		if (!this.overlay) {
			this.refreshDisplayEL = this.refreshDisplay.bind(this);
			this.overlay = document.createElement('div');
			this.overlay.id = 'modal-background';
			this.overlay.className = 'modal-background';
			document.body.appendChild(this.overlay);
		}
		Element.setStyle(this.overlay, { visibility: 'hidden', width: '0', height: '0', display: '' });

		this.refreshDisplay();
		Element.setStyle(this.overlay, { visibility: '' });		

		Event.observe(window, 'resize', this.refreshDisplayEL);
		Event.observe(window, 'scroll', this.refreshDisplayEL);
	},
	
	stop:
	function() {
		Event.stopObserving(window, 'resize', this.refreshDisplayEL);
		Event.stopObserving(window, 'scroll', this.refreshDisplayEL);
		Element.hide(this.overlay);
		if (UserAgent.MSIE)	{
			var	selects	= document.getElementsByTagName('select');
			for	(i = 0;	i <	selects.length;	i++) {
				selects[i].style.visibility	= '';
			}
		}
	},

	refreshDisplay:
	function() {
		var	vB = Position.getViewPortBounds();
		Element.setStyle(this.overlay, { width: (vB.left + vB.width) + 'px', height: (vB.top + vB.height) + 'px' });
		if (this.options.dialog) {
			var left = (vB.left + ((vB.width - this.options.dialog.offsetWidth) / 2));
			var top = (vB.top + ((vB.height - this.options.dialog.offsetHeight) / 2));
			if (left < 0) left = 0;
			if (top < 0) top = 0;
			Element.setStyle(this.options.dialog, { left:  left + 'px', top: top + 'px' });
		}
	}
};

/*
Created	By:	Chris Campbell
Website: http://particletree.com
Date: 2/1/2006

Inspired by	the	lightbox implementation	found at http://www.huddletogether.com/projects/lightbox/

Stripped and adapted by	Michael	Otto.
http://www.epublica.de

Rewritten by Lorenz	Knies.
http://www.epublica.de
*/

// callback
var	do_confirm;

function cool_confirm(args)	{
	if (!args['id']) {
		if (!cool_confirm.initalized) {
			cool_confirm.initalized = true;
			cool_confirm.okLabel = document.getElementById('modal-window:ok_label').innerHTML;
			cool_confirm.cancelLabel = document.getElementById('modal-window:cancel_label').innerHTML;
		}
		else {
			document.getElementById('modal-window:title').innerHTML = '';
			document.getElementById('modal-window:text').innerHTML = '';
			document.getElementById('modal-window:ok_label').innerHTML = cool_confirm.okLabel;
			document.getElementById('modal-window:cancel_label').innerHTML = cool_confirm.cancelLabel;
			document.getElementById('modal-window:title').style.backgroundImage = 'url(/img/xing/icn_help.gif)';
		}
	}
	var	id		= args['id'] ||	'modal-window';
	var	element	= args['element'];
	var	op		= args['op'];
	var	href		= args['href'];
	var	callback	= args['callback'];

	do_confirm = _do_confirm;

	var	modalWindow	= document.getElementById(id);
	modalWindow.className =	'modal-window';
	Element.setStyle(modalWindow, {	visibility:	'hidden', position:	'absolute',	left: '0', top:	'0', display: '' });
	if (modalWindow.parentNode != document.body) document.body.appendChild(modalWindow);

	if (args['icon']) {
		var	div	= document.getElementById(id + ':title');
		if (div) {
			div.style.backgroundImage =	'url(' + args['icon'] +	')';
		}
	}
	for	(var k in {	title: true, text: true, ok_label: true, cancel_label: true	}) {
		if (args[k]) {
			var	div	= document.getElementById(id + ':' + k);
			if (div) {
				div.innerHTML =	args[k];
			}
		}
	}

	Overlay.start({ dialog: modalWindow });
	Element.setStyle(modalWindow, {	visibility:	'' });

	var firstButton = modalWindow.getElementsByTagName('button')[0];
	if (firstButton) firstButton.focus();

	return false;

	function _do_confirm(returncode) {
		Element.hide(modalWindow);
		Overlay.stop();

		if (returncode)	{
			if (callback) {
				callback(returncode);
			}
			else if	(element) {
				if (element.tagName	== 'A')	{
					var	uriComponent;
					var	form = modalWindow.getElementsByTagName('form')[0];
					if (form) {
						uriComponent = Form.serialize(form);
					}
					else {
						uriComponent = '';
					}
					location.href = element.href + '&' + uriComponent;
				}
				else if	(element.tagName == 'BUTTON' || element.tagName == 'INPUT') {
					if (element.type == 'submit') {
						if (op)	element.form.op.value = op;
						element.form.submit();
					}
					else if	(element.type == 'button' && href) {
						location.href = href;
					}
				}
			}
		}
	}
}

function Preview(args) {
	this.callback = args['callback'];
	this.dialog = $(args['dialog']);
	this.container = $(this.dialog.id + ':container');

	if (Preview.innerHTML[this.container.id]) this.container.innerHTML = Preview.innerHTML[this.container.id];

	this.cancelEL = this.cancel.bind(this);
	this.sendEL = this.send.bind(this);
	Event.observe(this.dialog.id + ':cancel', 'click', this.cancelEL);
	Event.observe(this.dialog.id + ':send', 'click', this.sendEL);

	document.body.appendChild(this.dialog);
	new Ajax.Request(args.url, { parameters: args.parameters, onComplete: this.onComplete.bind(this) });
	Element.setStyle(this.dialog, { display: '', visibility: 'hidden' });
	Overlay.start({ dialog: this.dialog });
	Element.setStyle(this.dialog, { visibility: '' });	
}

Preview.innerHTML = {};

Preview.prototype = {
	cancel:
	function() {
		Element.hide(this.dialog);
		Overlay.stop();
		Event.stopObserving(this.dialog.id + ':cancel', 'click', this.cancelEL);
		Event.stopObserving(this.dialog.id + ':send', 'click', this.sendEL);
	},
	
	send:
	function() {
		if (this.loaded) {
			this.cancel();
			this.callback();
		}
	},

	onComplete:
	function(transport) {
		if (!Preview.innerHTML[this.container.id]) Preview.innerHTML[this.container.id] = this.container.innerHTML;
		this.container.innerHTML = transport.responseText;
		Overlay.refreshDisplay();
		this.loaded = true;
	}
}

function SharedData(args) {
	this.prefix	= args['prefix'];
	this.defaults =	args['defaults'];

	this.cbAll = document.getElementById(this.prefix + ':all');
	this.f = this.cbAll.form;
	
	var saveButton = document.getElementById(this.prefix + ':save_button');
	if (saveButton) {
		Event.observe(saveButton, 'click', this.onSubmit.bind(this));
	}

	this.boxRefreshListener	= this.boxRefresh.bindAsEventListener(this);
	this.toggles = {};
	this.expanders = {};
	this.divs =	{};

	Event.observe(this.cbAll, 'click', this.checkAll.bind(this));
	for (var i = 0;	i < this.groups.length;	i++) {
	    var	group =	this.groups[i];
	    this.toggles[group]	= document.getElementById(this.prefix +	':toggle_' + group);
	    this.expanders[group] = document.getElementById(this.prefix	+ ':expander_' + group);
	    this.divs[group] = document.getElementById(this.prefix + ':div_' + group);

	    Event.observe(this.f[group], 'click', this.checkGroup.bind(this, group));
	    Event.observe(this.toggles[group], 'click',	this.toggle.bind(this, group));
	}
	Event.observe(this.f.birth_date, 'click', this.checkBday.bind(this));
	Event.observe(this.f.birth_year, 'click', this.checkByear.bind(this));

	for (var group in this.inputs) {
	    for	(var j = 0; j <	this.inputs[group].length; j++)	{
		Event.observe(this.f[this.inputs[group][j]], 'click', this.boxRefreshListener);
	    }
	}

	var saveDefaultsButton = document.getElementById(this.prefix + ':save_as_defaults');
	if (saveDefaultsButton)	Event.observe(saveDefaultsButton, 'click', this.saveAsDefaults.bindAsEventListener(this));
	var useDefaultsButton =	document.getElementById(this.prefix + ':use_defaults');
	if (useDefaultsButton) Event.observe(useDefaultsButton,	'click', this.useDefaults.bindAsEventListener(this));

	this.boxRefresh();
}

SharedData.prototype = {
	groups:	["business","private","im"],
	inputs:	{"private":	["email_p","city_p","province_p","country_p","address_p","phone_private","fax_p"],
		 "business":	["email","address_business","phone_business","fax_business"],
		 "im":		["im_icq","im_msn","im_aim","im_yahoo","im_skype"],
		 "various":	["birth_date","birth_year","phone_mobile","allow_message"]},

	checkAll:
	function() {
	    var onoff = this.cbAll.checked;
	    for (var group in this.inputs) {
		for (var i = 0;	i < this.inputs[group].length; i++) {
		    this.f[this.inputs[group][i]].checked = onoff;
		}
	    }
	    this.boxRefresh();
	},

	checkGroup:
	function(group)	{
	    var onoff = this.f[group].checked
	    for (var i = 0; i < this.inputs[group].length; i++) {
		this.f[this.inputs[group][i]].checked =	onoff;
	    }
	    this.boxRefresh();
	},

	checkBday:
	function() {
	    if (this.f.birth_year.checked) {
		this.f.birth_year.checked = this.f.birth_date.checked;
	    }
	},

	checkByear:
	function() {
	if (this.f.birth_year.checked == 1)
	this.f.birth_date.checked =	1;
	},

	boxRefresh:
	function() {
	    var allChecked = true;
	    for	(var i = 0;	i <	this.groups.length;	i++) {
		var	group =	this.groups[i];
		var	status = this.mayToggle(group);
		var allChecked = allChecked && status[1];
		this.f[group].checked =	status[1];
		if (status[0]) {
		    this.toggles[group].style.cursor = 'pointer';
		    this.set_expander(this.expanders[group], Element.visible(this.divs[group]));
		}
		else {
		    if (!Element.visible(this.divs[group]))	{
			this.blindDown(this.divs[group]);
		    }
		    this.toggles[group].style.cursor = 'auto';
		    this.unset_expander(this.expanders[group]);
		}
	    }
	    var	status = this.mayToggle('various');
	    allChecked = allChecked && status[1];
	    this.cbAll.checked = allChecked;
	    this.set_ajax_state_none();
	},

	toggle:
	function(group)	{
	if (Element.visible(this.divs[group])) {
		if (this.mayToggle(group)[0]) {
		this.blindUp(this.divs[group]);
		this.set_expander(this.expanders[group], false);
		}
	}
	else {
		this.blindDown(this.divs[group]);
		this.set_expander(this.expanders[group], true);
	}
	},

	mayToggle:
	function(group)	{
	var	allChecked = true;
	var	allUnchecked = true;
	for	(var j = 0;	j <	this.inputs[group].length; j++)	{
		allChecked = allChecked	&& this.f[this.inputs[group][j]].checked;
		allUnchecked = allUnchecked	&& !this.f[this.inputs[group][j]].checked;
	}
	return [(allChecked	|| allUnchecked), allChecked, allUnchecked];
	},

	blindUp:
	function(element) {
	Effect.BlindUp(element,	{ duration:	0.3, afterFinish: function() { this.blocked	= false; }.bind(this) });
	},

	blindDown:
	function(element) {
	Effect.BlindDown(element, {	duration: 0.3, afterFinish:	function() { this.blocked =	false; }.bind(this)	});
	},

	onSubmit:
	function(event)	{
	    Event.stop(event);
	    if (document.getElementById(this.prefix	+ ':global_settings_warning')) Effect.BlindUp(this.prefix +	':global_settings_warning',	{ duration:	0.3	});
	    this.set_ajax_state_waiting();
	    var	parameters = Form.serialize(this.f);
	    new	Ajax.Request('/app/profile/ajax.js',
	    { method: 'post',
			  parameters: parameters,
			  onComplete: function() { this.set_ajax_state_done(); }.bind(this)
										     } );
	},

	saveAsDefaults:
	function (event) {
	Event.stop(event);
	this.set_ajax_state_waiting('ajax_state_save_as_defaults');
	this.defaults =	{};
	var	parameters = 'op=add.save_as_defaults';
	for	(var group in this.inputs) {
		for	(var i = 0;	i <	this.inputs[group].length; i++)	{
		if (this.f[this.inputs[group][i]].checked) {
			parameters += '&' +	this.inputs[group][i] +	'=1';
			this.defaults[this.inputs[group][i]] = 1;
		}
		}
	}
	new	Ajax.Request('/app/contact/ajax.js',
		{ method:	  'post',
		  parameters: parameters,
		  onComplete: function() { this.set_ajax_state_none('ajax_state_save_as_defaults');	}.bind(this)
	});
	},

	useDefaults:
	function(event)	{
	Event.stop(event);
	this.set_ajax_state_waiting('ajax_state_use_defaults');
	for	(var group in this.inputs) {
		for	(var i = 0;	i <	this.inputs[group].length; i++)	{
		this.f[this.inputs[group][i]].checked =	this.defaults[this.inputs[group][i]] ? true	: false;
		}
	}
	this.boxRefresh();
	this.set_ajax_state_none('ajax_state_use_defaults');
	},

	set_ajax_state_none:
	function(ajaxStateId) {
	var	ajaxState =	document.getElementById(this.prefix	+ ':' +	(ajaxStateId ||	'ajax_state'));
	if (ajaxState) {
		setTimeout(function() {
		ajaxState.src =	'/img/no.gif';
		}, 800);
	}
	if (ajaxState) {
		//		ajaxState.src =	'/img/no.gif';
	}
	},

	set_ajax_state_done:
	function(ajaxStateId) {
	var	ajaxState =	document.getElementById(this.prefix	+ ':' +	(ajaxStateId ||	'ajax_state'));
	if (ajaxState) {
		setTimeout(function() {
		ajaxState.src =	'/img/saved_icon.png';
		}, 800);
	}
	},


	set_ajax_state_waiting:
	function(ajaxStateId) {
	var	ajaxState =	document.getElementById(this.prefix	+ ':' +	(ajaxStateId ||	'ajax_state'));
	if (ajaxState) {
		ajaxState.src="/img/ajax_waiting.gif";
	}
	},

	set_expander:
	function(expander, expanded) {
	if (expanded) {
		expander.src='/img/list_minus.png';
	}
	else {
		expander.src='/img/list_plus.png';
	}
	},

	unset_expander:
	function(expander) {
	expander.src="/img/no.gif";
	}
}

function ContextHelp(args) {
	Element.setStyle(args['triggerId'], { cursor: 'help' });
	Event.observe(args['triggerId'], 'click', function(e) {
		Event.stop(e);
		document.getElementById('context-window-help:help-html').innerHTML = args['helpHTML'];
		ContextWindow({ id: 'context-window-help', alignTo: args['triggerId'], xOffset: 8, yOffset: document.getElementById(args['triggerId']).offsetHeight + 8 });
		}.bindAsEventListener(this));
}

function ContextWindow(args) {
	var	id		= args['id'] ||	'context-window';
	var alignTo = $(args['alignTo']);

	if (ContextWindow.alignTo && ContextWindow.alignTo == alignTo) { ContextWindow.hide(); return; }
	if (ContextWindow.alignTo && ContextWindow.alignTo != alignTo) { ContextWindow.hide(); }
	ContextWindow.alignTo = alignTo;
	
	var cw = document.getElementById(id);
	if (cw.parentNode != document.body) {
	    document.body.appendChild(cw);
	    Element.setStyle(cw, { position: 'absolute'	});
	}

	if (!ContextWindow.windowObserver) {
		Event.observe(document, 'click', ContextWindow.hide);
		ContextWindow.windowObserver = true;
	}
	if (!ContextWindow.observers[id]) {
		Event.observe(cw, 'click', function(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			else {
				e.cancelBubble = true;
			}
		}.bindAsEventListener(this));
	    ContextWindow.observers[id] = true;
	}

	if (args['update_function']) {
	    args['update_function'](cw,	args);
	}

	var pos = Position.cumulativeOffset(ContextWindow.alignTo);
	pos[0] += args['xOffset'] || 0;
	pos[1] += args['yOffset'] || 0;
	ContextWindow.visibleWindow = cw;
	Element.setStyle(cw, { left: (pos[0] - 10) + 'px', top: (pos[1] - 10) + 'px' });
	Effect.Appear(cw, {	duration: 0.3 });
}

ContextWindow.observers = {};

ContextWindow.hide = function() {
    if (ContextWindow.visibleWindow) {
		ContextWindow.visibleWindow.style.display = 'none';
		ContextWindow.visibleWindow = null;
		ContextWindow.alignTo = null;
    }
};

ContextWindow.updateSkypeWindow	= function(cw, args) {
	var as = cw.getElementsByTagName('a');
	for (var i = 0;	i < as.length; i++) {
	    var href = as[i].href;
	    as[i].href = 'skype:' + args['im_skype'] + href.slice(href.lastIndexOf('?'));
	}
}

var FormManagers = {};

function FormManager(args) {
	this.onFocusEL		= this.onFocus.bindAsEventListener(this);
	this.onBlurEL		= this.onBlur.bindAsEventListener(this);

	FormManagers[args['form_id']] = this;
	this.form = document.getElementById(args['form_id']);

	this.checks = [];
	this.hints = {};
	this.observedInputs = {};

	this.addChecks(args['checks'] || []);
	this.addHints(args['hints'] || {});

	this.globalErrorMsg = document.getElementById(args['globalErrorMsg']);

    Event.observe(this.form, 'reset', this.onReset.bindAsEventListener(this));
    Event.observe(this.form, 'submit', this.onSubmit.bindAsEventListener(this));
}

FormManager.prototype = {
	addChecks:
	function(checks) {
		for (var i = 0; i <  checks.length; i++) {
			this.checks.push(checks[i]);
			if (checks[i].inputName) {
				if (!this.observedInputs[checks[i].inputName]) {
					this.observedInputs[checks[i].inputName] = true;
					var input = this.form[checks[i].inputName];
					Event.observe(input, 'focus', this.onFocusEL);
					Event.observe(input, 'blur', this.onBlurEL);
				}
			}
		}
	},

	addHints:
	function(hints) {
		for (var name in hints) {
			this.hints[name] = hints[name];
			if (!this.observedInputs[name]) {
				this.observedInputs[name] = true;
				var input = this.form[name];
				Event.observe(input, 'focus', this.onFocusEL);
				Event.observe(input, 'blur', this.onBlurEL);
			}
			this.setInput(name);
		}
	},

	removeInputs:
	function(names) {
		for (var i = 0; i < names.length; i++) {
			var name = names[i];
			var filteredChecks = [];
			for (var j = 0; j < this.checks.length; j++) {
				if (!this.checks[i].inputName || this.checks[i].inputName != name) filteredChecks.push(this.checks[i]);
			}
			this.checks = filteredChecks;
			delete(this.hints[name]);
			delete(this.observedInputs[name]);
			var input = this.form[name];
			if (input) {
				Event.stopObserving(input, 'focus', this.onFocusEL);
				Event.stopObserving(input, 'blur', this.onBlurEL);
			}
		}
	},

	getValue:
	function(name) {
		var input = this.form[name];

		if (!this.hints[name]) return input.value;
		var hint = this.hints[input.name].replace(/[\r\n]/g, '');
		var value = input.value.replace(/[\r\n]/g, '');
		if (value == hint.substr(0, value.length)) {
			return '';
		}
		else {
			return input.value;
		}
	},

	reset:
	function() {
		this.form.reset();
		this.onReset();
	},

	submit:
	function() {
		if (this.onSubmit()) {
			this.form.submit();
		}
	},
	
    onFocus:
    function(e) {
		var name = Event.element(e).name;
		if (name) this.resetInput(name);
    },
	
    onBlur:
    function(e)	{
		var name = Event.element(e).name;
		if (name) this.setInput(Event.element(e).name);
    },

	onReset:
	function(e) {
		for (var name in this.hints) {
			this.setInput(name);
		}
	},

	onSubmit:
	function(e) {
		if (this.globalErrorMsg) {
			Element.hide(this.globalErrorMsg);
		}
		for (var i = 0; i < this.checks.length; i++) {
			var input = this.checks[i].inputName ? this.form[this.checks[i].inputName] : null;
			var errorClass = this.checks[i].errorClass || 'error-form-field';
			var errorMsg = document.getElementById(this.checks[i].errorMsg || 'error-' + this.checks[i].inputName);
			if (input) Element.removeClassName(input, errorClass);
			if (errorMsg) Element.hide(errorMsg);
		}
		var submit = true;
		for (var i = 0; i < this.checks.length; i++) {
			if (!this.checks[i].onBlur && !this.checks[i].check(this, this.checks[i].inputName)) {
				submit = false;
				var input = this.checks[i].inputName ? this.form[this.checks[i].inputName] : null;
				var errorClass = this.checks[i].errorClass || 'error-form-field';
				var errorMsg = document.getElementById(this.checks[i].errorMsg || 'error-' + this.checks[i].inputName);
				if (input) Element.addClassName(input, errorClass);
				if (errorMsg) Element.show(errorMsg);
			}
		}
		if (submit) {
			for (var name in this.hints) {
				this.resetInput(name);
			}
			if (e) {
				return;
			}
			else {
				return true;
			}
		}
		else {
			if (this.globalErrorMsg) {
				Element.show(this.globalErrorMsg);
				new Effect.ScrollTo(document.body, { duration: 0.5 });
			}
			if (e) {
				Event.stop(e);
				return;
			}
			else {
				return false;
			}
		}
	},

	setInput:
	function(name) {
		var i = this.form[name];
		if (this.hints[name] && this.getValue(name) == '') {
			i.style.color = '#808080';
			i.value = this.hints[name];
		}
		else {
			i.style.color = '#000';
		}
	},

    resetInput:
    function(name) {
		var i = this.form[name];
		i.value = this.getValue(name);
		i.style.color = '#000';
	}
};

var FormValidation = {};

FormValidation.combineAnd = function(checks) {
	return function(formManager, name) {		
		for (var i = 0; i < checks.length; i++) {
			if (!checks[i](formManager, name)) return false;
		}
		return true;
	}
}

FormValidation.combineOr = function(checks) {
	return function(formManager, name) {		
		for (var i = 0; i < checks.length; i++) {
			if (checks[i](formManager, name)) return true;
		}
		return false;
	}
}

FormValidation.valid = function() {
	return function() {
		return true;
	}
}

FormValidation.inValid = function() {
	return function() {
		return false;
	}
}

FormValidation._validEmailAddress = function(formManager, name) {
	return /^[^@ ]+\@([^@ .]+\.)+[^@ .]+$/.test(formManager.getValue(name).strip()); 
};

FormValidation.validEmailAddress = function() {
	return FormValidation._validEmailAddress;
};

FormValidation.strippedMinLength = function(length) {
	return function(formManager, name) {
		return formManager.getValue(name).strip().length >= length;
	}
};

FormValidation.strippedMaxLength = function(length) {
	return function(formManager, name) {
		return formManager.getValue(name).strip().length <= length;
	}
};

FormValidation.matches = function(regexp) {
	return function(formManager, name) {
		return regexp.test(formManager.getValue(name));
	}
}

Form.InlineHints = function(form, hints) {
    this.form = $(form);
	this.hints = {};

    this.onFocusEL	= this.onFocus.bindAsEventListener(this);
    this.onBlurEL	= this.onBlur.bindAsEventListener(this);
    this.setInputsEL	= this.setInputs.bindAsEventListener(this);
    this.resetInputsEL	= this.resetInputs.bindAsEventListener(this)
	
	this.addHints(hints);
    Event.observe(this.form, 'reset', this.setInputsEL);
    Event.observe(this.form, 'submit', this.resetInputsEL);
};

Form.InlineHints.prototype = {
	addHints:
	function(hints) {
		for (var name in hints) {
			this.hints[name] = hints[name];
			var i = this.form[name];
			Event.observe(i, 'focus', this.onFocusEL);
			Event.observe(i, 'blur', this.onBlurEL);
		}
		this.setInputs();
	},

	removeHints:
	function(names) {
		for (var i = 0; i < names.length; i++) {
			delete(this.hints[names[i]]);
		}
	},

    onFocus:
    function(e) {
		var i = Event.element(e);
		var hint = this.hints[i.name].replace(/[\r\n]/g, '');
		var value = i.value.replace(/[\r\n]/g, '');
		if (value == hint.substr(0, value.length)) {
			i.style.color = '#000';
			i.value	= '';
		}
    },
	
    onBlur:
    function(e)	{
		var i = Event.element(e);
		if (i.value	== '') {
			i.style.color =	'#808080';
			i.value	= this.hints[i.name];
		}
    },
	
    setInputs:
    function() {
		for (var name in this.hints) {
			var i = this.form[name];
			var hint = this.hints[i.name].replace(/[\r\n]/g, '');
			var value = i.value.replace(/[\r\n]/g, '');
			if (value == '' || value == hint.substr(0, value.length)) {
				i.style.color = '#808080';
				i.value = this.hints[name];
			}
			else {
				i.style.color = '#000';
			}
		}
    },
	
    resetInputs:
    function() {
		for (var name in this.hints) {
			var i = this.form[name];
			var hint = this.hints[i.name].replace(/[\r\n]/g, '');
			var value = i.value.replace(/[\r\n]/g, '');
			if (value == hint.substr(0, value.length)) {
				i.style.color = '#000';
				i.value = '';
			}
		}
    }
};

function CurrencyConverter(select, amounts, currency) {
	this.select = $(select);
	this.amounts = amounts;
	this.currency = currency;
	Event.observe(this.select, 'change', this.convert.bind(this));
}

CurrencyConverter.prototype = {
	convert:
	function() {
		if (this.select.value == this.currency) {
			this.clearAmounts();
		}
		else {
			var parameters = 'op=convert_amounts&source_currency=' + this.currency + '&target_currency=' + this.select.value + '&amounts=' + this.amounts.join(' ');
			new Ajax.Request('/app/upgrade', { parameters: parameters,
															   onSuccess: this.onSuccess.bind(this),
															   onFailure: this.onFailure.bind(this) });
		}
    },

	onSuccess:
	function(transport) {
		var result;
		try {
			result = eval(transport.responseText);
		} catch(e) {}
		if (result) {
			this.setAmounts(result);
		}
		else {
			this.clearAmounts();
		}
    },

	onFailure:
	function(transport) {
		this.clearAmounts();
    },

	setAmounts:
	function(amounts) {
		for (var i = 0; i < this.amounts.length; i++) {
			$('AM_' + this.amounts[i]).innerHTML = amounts[this.amounts[i]];
		}
    },

	clearAmounts:
	function(amounts) {
		for (var i = 0; i < this.amounts.length; i++) {
			$('AM_' + this.amounts[i]).innerHTML = '';
		}
    }

}

// language_selection.js
var LanguageSelection = {
	initialize: function() {
		this.headerLanguageSelector = document.getElementById('header-language-selector');
		if (!this.headerLanguageSelector) return;
		document.body.appendChild(this.headerLanguageSelector);
		this.languageLink = document.getElementById('language-value');
		this.languageLinkMin = document.getElementById('language-value-min');
		this.languageSelectIframe = document.getElementById('language-select-iframe');
		Event.observe(this.languageLink, 'click', this.showLanguages.bindAsEventListener(this));
		Event.observe(this.languageLink, 'mouseout', this.delayedHideLanguages.bindAsEventListener(this));
		if (this.languageLinkMin) {
			Event.observe(this.languageLinkMin, 'click', this.showLanguages.bindAsEventListener(this));
			Event.observe(this.languageLinkMin, 'mouseout', this.delayedHideLanguages.bindAsEventListener(this));
		}
		Event.observe(this.headerLanguageSelector, 'mouseout', this.delayedHideLanguages.bindAsEventListener(this));
		Event.observe(this.headerLanguageSelector, 'mouseover', this.clearHideLanguages.bindAsEventListener(this));
		if (this.languageSelectIframe) {
			Element.setStyle(this.headerLanguageSelector, { visibility: 'hidden', display: '' });
			this.languageSelectIframe.style.width = this.headerLanguageSelector.offsetWidth + 'px';
			this.languageSelectIframe.style.height = this.headerLanguageSelector.offsetHeight +'px';
			Element.setStyle(this.headerLanguageSelector, { visibility: '', display: 'none' });
		}

	},

	showLanguages: function(e) {
		Event.stop(e);
		var languageLink = Event.element(e);
		languageLink.blur();
		this.clearHideLanguages();
		if (this.visible) {
			this.hideLanguages();
		}
		else {
			var leftBorder = Position.cumulativeOffset(languageLink)[0] + languageLink.offsetWidth;
			this.headerLanguageSelector.style.left = (leftBorder - 168) + 'px';
			this.headerLanguageSelector.style.top  = '20px';
			try {
				Effect.Appear(this.headerLanguageSelector, {duration:0.3});
			} catch(e) {
				Element.show(this.headerLanguageSelector);
			}
			this.visible = true;
		}
	},

	hideLanguages: function(){
		if (this.visible) {
			try {
				Effect.Fade(this.headerLanguageSelector, {duration:0.3});
			} catch(e) {
				Element.hide(this.headerLanguageSelector);
			}
			this.visible = false;
		}
	},

	delayedHideLanguages: function(e) {
		if (this.visible){
			this.clearHideLanguages();
			this.delayID = setTimeout(this.hideLanguages.bind(this), 250);
		}
	},

	clearHideLanguages: function(){
		if (this.delayID) {
			clearTimeout(this.delayID);
			this.delayID = null;
		}
	}
};

var Header = {
	toggle: function(){
		if (!this.visible){
			this.header_min = document.getElementById('header-navigation-min');
			this.header_max = document.getElementById('header-navigation-max');
			this.minimize_link = document.getElementById('minimize-link');
			this.maximize_link = document.getElementById('maximize-link');
			this.visible = this.header_min.style.display == 'none' ? this.header_max : this.header_min;
		}
		if (this.visible.id == 'header-navigation-max'){
			new Ajax.Request('/app/network',{parameters:'op=save_header_state.minimize' } );
			this.minimize_link.style.display = 'none';
			this.maximize_link.style.display = '';
			Transition.Morph(this.header_max, this.header_min, { duration: 0.5 });
			this.visible = this.header_min;
		}
		else {
			new Ajax.Request('/app/network',{parameters:'op=save_header_state.maximize' } );
			this.maximize_link.style.display = 'none';
			this.minimize_link.style.display = '';
			Transition.Morph(this.header_min, this.header_max, { duration: 0.5 });
			this.visible						= this.header_max;
		}
	}
}

Event.observe(window, 'load', LanguageSelection.initialize.bind(LanguageSelection));
