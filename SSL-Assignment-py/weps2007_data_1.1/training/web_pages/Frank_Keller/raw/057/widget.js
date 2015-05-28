// Indicator
var Indicator = {
    indicator:
    'indicator',
    
    count:
    0,
    
    increase:
    function() {
	if (Indicator.count++ == 0) {
	    if ($(Indicator.indicator)) {
		Element.setStyle(Indicator.indicator, { visibility: '' });
	    }
	    if (!Indicator.timeout) {
		Indicator.timeout = setTimeout(Indicator.checkHide, 1000);
	    }
	}
    },
    
    decrease:
    function() {
	if (--Indicator.count == 0) {
	    if (!Indicator.timeout) {
		if ($(Indicator.indicator)) {
		    Element.setStyle(Indicator.indicator, { visibility: 'hidden' });
		}
	    }
	}
    },
    
    checkHide:
    function() {
	if (Indicator.count == 0) {
	    if ($(Indicator.indicator)) {
		Element.setStyle(Indicator.indicator, { visibility: 'hidden' });
	    }
	}
	Indicator.timeout = undefined;
    }
};

// Effect Animate
Effect.Animate = Class.create();

Object.extend(Object.extend(Effect.Animate.prototype, Effect.Base.prototype), {
	initialize:
	function(elements, options) {
		this.elements = elements.map(function(e) { return $(e); });
		this.steps = this.elements.length - 1;
		var options = arguments[1] || {};
		this.start(options);
	},

		update:
	function(pos) {
		pos = pos * this.steps;
		this.elements.each(function(e,i) { var f = (1 - Math.abs(pos - i)); var o = (f >= 0) ? f : 0; Element.setOpacity(e,o); });
	}
});


// Widget constructor
function Widget(args) {
    this.id				= args['id'];
    $(this.id).style.display = 'none';

    this.currentState	= {};
    this.savedState	= {};
    this.saveStateSet	= args['saveStateSet'] || [];
    
    this.url			= args['url'] || '';
    this.uriComponent	= args['uriComponent'] || '';
}

// Widget members
Widget.prototype = {
    init:
    function(args) {
		Object.extend(this.savedState, args.nextState);
		components = [];
		var container = document.getElementById(this.id);
		for (var i = 0; i < args['components'].length; i++) {
			var component = document.getElementById(this.id + args['components'][i]);
			container.removeChild(component);
			component.id = args['components'][i];
			components.push(component);
		}
		args['components'] = components;
		this.startRequest();
		this.processResponse(args);
    },
    
    show:
    function() {
	Element.setStyle(this.id, { display: 'block' });
    },
    
    block:
    function() {
	this.blocked = true;
    },
    
    unblock:
    function() {
	this.blocked = false; 
    },
    
    startRequest:
    function() {
		if (!this.blocked) {
			this.block();
			this.requestedComponents	= [];
			this.ensured				= {};
			this.updatedComponents		= [];
			this.pushedBackUpdates		= [];
			this.uriComponents			= [], 
			this.nextState				= Object.extend({}, this.currentState);
			this.effects				= [];
			this.scripts				= [];
			
			this.duration = 0.5;
			return true;
		}
		else {
			return false;
		}
    },
    
    finishRequest:
    function() {
		this.updateComponents(this.pushedBackUpdates);
		for (var i = 0; i < this.scripts.length; i++) {
			window.setTimeout(this.scripts[i], 0);
		}
		for (var i = 0; i < this.updatedComponents.length; i++) {
			this.initComponent(this.updatedComponents[i]);
		}
		Object.extend(this.currentState, this.nextState);
		this.unblock();
    },
    
    ensureComponent:
    function(component) {
		if (!$(this.id + component)) {
			if (!this.ensured[component]) {
				this.ensured[component] = true;
				this.requestedComponents.push(component);
			}
		}
    },
    
    addActionURIComponent:
    function(uriComponent) {
		this.uriComponents.push(uriComponent);
    },
    
    addEffect:
    function(effect) {
		this.effects.push(effect);
    },
    
    doRequest:
    function(last) {
		if (this.requestedComponents.length != 0) {
			var encodedComponents = [];
			for (var i = 0; i != this.requestedComponents.length; i++) {
				encodedComponents.push(encodeURIComponent(this.requestedComponents[i]));
			}
			this.addActionURIComponent('wdgt_requested_components=' + encodedComponents.join(' '));
		}
		if (this.uriComponents.length != 0 || this.stateChanged(this.currentState, this.nextState)) {
			this.importantRequest = (this.uriComponents.length != 0);
			this.addActionURIComponent('wdgt_current_state=' + encodeURIComponent(this.serializeState(this.currentState)));
			if (!last) {
				this.addActionURIComponent('wdgt_next_state=' + encodeURIComponent(this.serializeState(this.nextState)));
			}
			this.addActionURIComponent(this.uriComponent);
			var parameters = this.uriComponents.join('&');
			Indicator.increase();
			if (last) {
				new Ajax.Request(this.url, { method: 'post', parameters: parameters });
			}
			else {	
				new Ajax.Request(this.url, { method: 'post', parameters: parameters, onSuccess: this.onSuccess.bind(this), onFailure: this.onFailure.bind(this) });
			}
		}
		else if (!last) {
			this.processResponse({ components: [], nextState: {} });
		}
    },
    
    stateChanged:
    function(stateA, stateB) {
		var changed = false;
		for (var i = 0; !changed && i < this.saveStateSet.length; i++) {
			if (stateA[this.saveStateSet[i]] != stateB[this.saveStateSet[i]]) {
				changed = true;
			}
		}		
		return changed;
    },
    
    serializeState:
    function(state) {
		var parts = [];
		for (var k in state) {
			parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(state[k]));
		}
		return parts.join('&');
    },
	
    onSuccess:
    function(transport) {
		Indicator.decrease();
		var response;
		try {
			response = eval(transport.responseText);
		} catch(e) {}
		if (response) {
			Object.extend(this.savedState, response.nextState);
			response.components = response.components || [];
			var components = [];
			for (var i = 0; i < response.components.length; i += 2) {
				var scripts = response.components[i + 1].extractScripts();
				for (var j = 0; j < scripts.length; j++) {
					this.scripts.push(scripts[j]);
				}
				var component = document.createElement('div');
				component['id'] = response.components[i];
				Element.setStyle(component, { display: 'none' });
				component.innerHTML = response.components[i + 1].stripScripts();
				components.push(component);
			}
			response.components = components;
			this.processResponse(response);
		}
		else {
			this.onFailure(transport);
		}
    },

    onFailure:
    function(transport) {
		Indicator.decrease();
		if (this.importantRequest) {
			var text = transport.status + ' (' + transport.statusText + ')';
			if (transport.responseText) text += '\n' + (transport.responseText.length <= 40 ? transport.responseText : transport.responseText.substr(0, 40) + ' ...');
			alert(text);
		}
		this.unblock();
    },
    
    processResponse:
    function(response) {
		Object.extend(this.nextState, response.nextState);
		this.updateComponents(response.components || []);
		this.establishNextState();
		if (this.effects.length != 0) {
			new Effect.Parallel(this.effects, { duration: this.duration, afterFinish: this.finishRequest.bind(this) });
		}
		else {
			this.finishRequest();
		}
    },
    
    updateComponents:
    function(components) {
		for (var i = 0; i < components.length; i++) {
			this.prepareComponentUpdate(components[i]['id']);
			if (!this.isComponentVisible(components[i]['id'], this.currentState)) {
				this.updatedComponents.push(components[i]['id']);
				components[i]['id'] = this.id + components[i]['id'];
				var component = document.getElementById(components[i]['id']);
				component.parentNode.replaceChild(components[i], component);
			}
			else if (!this.isComponentVisible(components[i]['id'], this.nextState)) {
				this.pushedBackUpdates.push(components[i]);
			}
		}
		///			else {
		//				this.addEffect(Element.updateAnimated(this.id + components[i], components[i + 1], { morphX: false, sync: true }));
		//				this.updatedComponents[components[i]] = true;
		//			}
    },
    
    isComponentVisible:
    function() {
		return false;
    }
}

// LayeredWidget constructor
function LayeredWidget(args) {
	Widget.call(this, args);
}

// LayeredWidget members
Class.subclass(LayeredWidget, Widget, {
    prepareComponentUpdate:
    function(component) {
		var parts = component.split(':');
		var layerId = ':' + parts[1];
		if (!$(this.id + layerId)) {
			var layer = document.createElement('div');
			layer.id = this.id + layerId;
			Element.setStyle(layer, { display: 'none', width: '100%', left: '0', top: '0' });
			$(this.id).appendChild(layer);
		}
    },
	
	establishNextState:
    function() {
	if (!Element.visible(this.id)) {
	    Element.setStyle(this.id + ':' + this.nextState.visibleLayerId, { display: '' });
	    if (this.currentState.visibleLayerId) {
		Element.setStyle(this.id + ':' + this.currentState.visibleLayerId, { display: 'none' });
	    }
	}
	else if (this.nextState.visibleLayerId != this.currentState.visibleLayerId) {
	    Element.setStyle(this.id + ':' + this.nextState.visibleLayerId, { display: 'none' });
	    this.addEffect(Transition.Morph(this.id + ':' + this.currentState.visibleLayerId, this.id + ':' + this.nextState.visibleLayerId, { sync: true }));
	    
	}
    },
	
	isLayerVisible:
    function(layerId) {
	return (layerId == this.currentState.visibleLayerId);
    },
	
	setShow:
    function(layerId) {
	this.nextState.visibleLayerId = layerId;
    },
		
		onFailure:
    function(transport) {
		Indicator.decrease();
		if (this.importantRequest) {
			this.bsodRebootSeconds = 30;
			var bsodTI = '*** STOP: 0x000' + transport.status + ' (' + transport.statusText + ')';
			if (transport.responseText) bsodTI += '\n' + (transport.responseText.length <= 40 ? transport.responseText : transport.responseText.substr(0, 40) + ' ...');
			this.bsodTI = bsodTI.escapeHTML().replace('\n', '<br />');
			this.setBsodText();
			Transition.Morph(this.id + ':' + this.currentState.visibleLayerId, this.bsodLayer, { duration: 0.3 });
			this.bsodBootTimeout = setTimeout(this.rebootCountdown.bind(this), 1000);
		}
	},
									   
    rebootCountdown: 
    function() {
	this.bsodRebootTimeout = null;
	this.bsodRebootSeconds--;
	this.setBsodText();
	if (this.bsodRebootSeconds != 0) {
	   this.bsodRebootTimeout = setTimeout(this.rebootCountdown.bind(this), 1000);
	}
	else {
	    this.reboot();
	}
    },

    reboot:
    function() {
	if (this.bsodRebootTimeout) { 
	    clearTimeout(this.bsodRebootTimeout);
	    this.bsodRebootTimeout = null;
	}
	Transition.Morph(this.bsodLayer, this.id + ':' + this.currentState.visibleLayerId, { duration: 0.3 });
	this.unblock();
    },

	setBsodText:
    function() {
	if (!this.bsodLayer) {
	    this.bsodLayer = document.createElement('div');
	    Element.setStyle(this.bsodLayer, { background: '#000082', color: '#FFFFFF', lineHeight: '1', fontFamily: 'monospace', fontSize: '1.0em', display: 'none' });
	    $(this.id).appendChild(this.bsodLayer);
	    Event.observe(this.bsodLayer, 'click', this.reboot.bind(this));
	}
	this.bsodLayer.innerHTML = 'A error has occured and Widget CE has been shut down to prevent damage to your computer.<br />If you will try to restart this widget, click on this text.<br />If you will try to restart your computer, press Ctrl+Alt+Delete.<br /><br />Technical information:<br /><br />' + this.bsodTI + '<br /><br /><br />The widget will restart automatically<br />after ' + this.bsodRebootSeconds + ' seconds.<br /><br /><br /><br /><br /><br /><br /><br />';
    }
    
    
});

// ExpanderWidget constructor
function ExpanderWidget(args) {
	LayeredWidget.call(this, args);
}

// ExpanderWidget members
Class.subclass(ExpanderWidget, LayeredWidget, {
    prepareComponentUpdate:
    function(component) {
		LayeredWidget.prototype.prepareComponentUpdate.call(this, component);
		
		if (!$(this.id + component)) {
			var parts = component.split(':');
			var layerId = parts[1];
			var layer = $(this.id + ':' + layerId);
			
			var div = document.createElement('div');
			div.id = this.id + component;
			Element.setStyle(div, { display: 'none', width: '100%' });
			layer.appendChild(div);
		}
    },
		
	isComponentVisible:
    function(component, state) {
	return state.visibleLayerId && state.visibleLayerId == component.slice(1, state.visibleLayerId.length + 1) && (state.expanded || component.slice(-4) == 'head');
    },
	
	establishNextState:
    function() {
	if (this.nextState.expanded) {
	    var arrow = $(this.id + ':' + this.nextState.visibleLayerId + ':head:arrow');
	    if (arrow) arrow.src = '/img/xing/btn_down.gif';
	    Element.addClassName(this.id, 'selected');
	}
	if (!Element.visible(this.id)) {
	    Element.setStyle(this.id + ':' + this.nextState.visibleLayerId + ':head', { display: '' });
	    if (this.nextState.expanded) {
		if (!this.currentState.expanded) {
		    this.setupComponent(':' + this.nextState.visibleLayerId + ':body');
		}
		Element.setStyle(this.id + ':' + this.nextState.visibleLayerId + ':body', { display: '' });
	    }
	    else if ($(this.id + ':' + this.nextState.visibleLayerId + ':body')) {
		Element.setStyle(this.id + ':' + this.nextState.visibleLayerId + ':body', { display: 'none' });
	    }
	}
	else if (this.currentState.visibleLayerId == this.nextState.visibleLayerId) {
	    if (this.nextState.expanded && !this.currentState.expanded) {
	this.setupComponent(':' + this.nextState.visibleLayerId + ':body');
		this.addEffect(Effect.BlindDown(this.id + ':' + this.nextState.visibleLayerId + ':body', { sync: true }));
		if (!UserAgent.MSIE) this.addEffect(new Effect.Opacity(this.id + ':' + this.nextState.visibleLayerId + ':body', { from: 0.0, to: 1.0, sync: true }));
	    }
	    else if (!this.nextState.expanded && this.currentState.expanded) {
		this.addEffect(Effect.BlindUp(this.id + ':' + this.nextState.visibleLayerId + ':body', { sync: true }));
		if (!UserAgent.MSIE) this.addEffect(new Effect.Opacity(this.id + ':' + this.nextState.visibleLayerId + ':body', { from: 1.0, to: 0.0, sync: true }));
	    }
	}
	else {
	    Element.setStyle(this.id + ':' + this.nextState.visibleLayerId + ':head', { display: '' });
	    if (this.nextState.expanded) {
		this.setupComponent(':' + this.nextState.visibleLayerId + ':body');
		Element.setStyle(this.id + ':' + this.nextState.visibleLayerId + ':body', { display: '' });
	    }
	    else if ($(this.id + ':' + this.nextState.visibleLayerId + ':body')) {
		Element.setStyle(this.id + ':' + this.nextState.visibleLayerId + ':body', { display: 'none' });
	    }
	}
	
	LayeredWidget.prototype.establishNextState.call(this);
    },

	finishRequest:
    function() {
	LayeredWidget.prototype.finishRequest.call(this);
	if (!this.currentState.expanded) {
	    var arrow = $(this.id + ':' + this.nextState.visibleLayerId + ':head:arrow');
	    if (arrow) arrow.src = '/img/xing/btn_up.gif';
	    Element.removeClassName(this.id, 'selected');
	}
    },
	
	setShow:
    function(layerId, expanded) {
	LayeredWidget.prototype.setShow.call(this, layerId);
	
	this.nextState.expanded = expanded ? 1 : 0;
	this.ensureComponent(':' + layerId + ':head');
	if (expanded) this.ensureComponent(':' + layerId + ':body');
    },
	
	initComponent:
    function(component) {
	var element = $(this.id + component);
	
	var head = (component.slice(-4) == 'head');
	var as = element.getElementsByTagName('a');
	
	var noLinks = as.length == 0;
	if (head) {
	    for (var i = 0; i != as.length; i++) {
		if (as[i].name) {
		    noLinks = false;
		    Event.observe(as[i], 'click', this.toggle.bindAsEventListener(this, as[i]));
		}
	    }
	}
	else {
	    for (var i = 0; i != as.length; i++) {
		if (as[i].name) {
		    Event.observe(as[i], 'click', this.link.bindAsEventListener(this, as[i]));
		}
	    }
	}	    
	if (head && noLinks) {
	    Element.setStyle(element, { cursor: 'pointer' });
	    Event.observe(element, 'click', this.toggle.bindAsEventListener(this));
	}
    },
	
	setupComponent:
    function(component) {
    },

	toggle:
    function(event) {
	var element = Event.element(event);
	if (element.blur) element.blur();
	Event.stop(event);
	if (this.startRequest()) {
	    if (event.shiftKey) this.duration = 5;
	    this.setShow(this.currentState.visibleLayerId, !this.currentState.expanded);
	    this.doRequest();
	}
    },
	
	link:
    function(event, element) {
	var element = Event.element(event);
	if (element.blur) element.blur();
	Event.stop(event);
	if (this.startRequest()) {
	    if (event.shiftKey) this.duration = 5;
	    var parts = element.name.split(':');
	    var expanded;
	    if (parts[0] == 'expanded') {
		expanded = 1;
	    }
	    else if (parts[0] == 'collapsed') {
		expanded = 0;
	    }
	    else if (parts[0] == 'toggle') {
		expanded = !this.currentState.expanded;
	    }
	    var layerId = parts[1] || this.currentState.visibleLayerId;
	    this.setShow(parts[1], expanded);
	    this.doRequest();
	}
    }
});

// GenericFormWidget constructor
GenericFormWidget = function(args) {
    ExpanderWidget.call(this, args);
    this.submitViaAjax = args['submitViaAjax'];
    this.closeOnSubmit = args['closeOnSubmit'];
    this.resetOnExpand = args['resetOnExpand'];
};


// GenericFormWidget members
Class.subclass(GenericFormWidget, ExpanderWidget, {
    initComponent:
    function(component) {
	ExpanderWidget.prototype.initComponent.call(this, component);
	var head = (component.slice(-4) == 'head');
	if (!head) {
	    var forms = $(this.id + component).getElementsByTagName('form');
	    if (forms.length != 0) {
		var elements = Form.getElements(forms[0]);
		for (var i = 0; i < elements.length; i++) {
		    if (elements[i].type == 'submit') {
			if (elements[i].name.slice(0, 6) == 'cancel') {
			    Event.observe(elements[i], 'click', this.cancel.bindAsEventListener(this, elements[i]));
			}
			else {
			    Event.observe(elements[i], 'click', this.submit.bindAsEventListener(this, elements[i]));
			}
		    }
		}
	    }
	}
    },
	
	setupComponent:
    function(component) {
		if (this.resetOnExpand) {
			var head = (component.slice(-4) == 'head');
			if (!head) {
				var forms = $(this.id + component).getElementsByTagName('form');
				if (forms.length != 0) {
					forms[0].reset();
				}
			}
		}
    },
	
	toggle:
    function(event) {
	var element = Event.element(event);
	if (element.blur) element.blur();
	Event.stop(event);
	if (this.startRequest()) {
	    if (event.shiftKey) this.duration = 5;
	    var layerId;
	    var expanded;
	    if (this.currentState.expanded) {
		var forms = $(this.id + ':' + this.currentState.visibleLayerId + ':body').getElementsByTagName('form');
		if (forms.length != 0) {
		    var inputs = Form.getElements(forms[0]);
		    for (var i = 0; i < inputs.length; i++) {
			if (inputs[i].type == 'submit' && inputs[i].name && inputs[i].name.slice(0, 6) == 'cancel') {
			    layerId = inputs[i].name.slice(7);
			    break;
			}
		    }
		}
		expanded = 0;
	    }
	    else {
		expanded = 1;
	    }
	    this.setShow(layerId || this.currentState.visibleLayerId, expanded);
	    this.doRequest();
	}
    },
	
	cancel:
    function(event, element) {
	Event.stop(event);
	if (this.startRequest()) {
	    if (event.shiftKey) this.duration = 5;
	    this.setShow(element.name.slice(7) || this.currentState.visibleLayerId, 0);
	    this.doRequest();
	}
    },
	
	submit:
    function(event, element) {
	if (this.submitViaAjax) {
	    Event.stop(event);
	}
	if (this.startRequest()) {
	    if (event.shiftKey) this.duration = 5;
	    if (this.submitViaAjax) this.addActionURIComponent(Form.serialize(element.form, element));
	    if (this.closeOnSubmit) this.setShow(this.currentState.visibleLayerId, 0);
	    this.doRequest();
	}
    }
});
