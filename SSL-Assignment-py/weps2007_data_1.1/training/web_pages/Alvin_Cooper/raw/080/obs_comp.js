// TemplateName=obs_comp.js
// $Header: /home/cvs/cvsroot/site_data/001/00000001/static_data/js/obs_comp.js,v 1.12.16.1 2006/11/30 22:27:39 kcollett Exp $

// DEPENDS ON CSimpleObservable.js
// DEPENDS ON CList.js
// DEPENDS ON CCallWrapper.js
// DEPENDS ON utils.js

var oc_components = new Array();

/**
 * Construct a class for a component that is observable.
 * @constructor
 * @extends CSimpleObservable
 */
function ObservableComponent (_prefix, _mainElementSuffix)
{
	this.prefix = _prefix;
	this.mainElementSuffix = _mainElementSuffix;
	this.value = ''; // Used for OCs that do not map to an HTML input.
	subclass (this, new CSimpleObservable());
	oc_components[_prefix] = this;
}

/**
 * The default implementation of the "hide" method for an ObservableComponent.
 * Does nothing.
 */
ObservableComponent.prototype.hide = function (_hide)
{
}

/**
 * The default implementation of the "disable" method for an ObservableComponent.
 */
ObservableComponent.prototype.disable = function (_disable)
{
	this.disable_submit_flag (_disable);
	disable_element (this.prefix + this.mainElementSuffix, _disable);

	if (parse_boolean (_disable))
		this.clear();
	else if (!this.get())
		this.reset();
}

/**
 * The default implementation of the "disable_submit_flag" method
 * for an ObservableComponent.  Note that this implementation replies on an
 * element id being present that is identical to the element name in order
 * for the enable / disable behavior to work idempotently.
 */
ObservableComponent.prototype.disable_submit_flag = function (_disable)
{
	// IE6: getElementById() apparently returns an element by name if no id is present
	// so we have to check for existence of a valid id before changing the name
	var _el = document.getElementById (this.prefix + 'submit');

	if (_el && _el.id)
		_el.name = (parse_boolean (_disable) == true) ? _el.id + '_skip' : _el.id;
}

/**
 * The default implementation of the "clear" method for an ObservableComponent.
 */
ObservableComponent.prototype.clear = function()
{
	var	el = this.defaultElement();

	if (el && (el.tagName == 'INPUT')) {
		if ((el.type == 'text') || (el.type == 'password') || (el.type == 'file') || (el.type == 'hidden')) {
			this.set ('');
		}
		else if (el.type == 'radio')
			this.set (false);
		else if (el.type == 'checkbox')
			this.set (false);
	}
	else if (el && (el.tagName == 'TEXTAREA')) {
		this.set ('');
	}
	else if (!el) {
		this.set ('');
	}
}

/**
 * The default implementation of the "reset" method for an ObservableComponent.
 */
ObservableComponent.prototype.reset = function()
{
	var	el = this.defaultElement();

	if (el && ((el.tagName == 'INPUT') || (el.tagName == 'TEXTAREA')))
		this.set (get_input_default_value (el));
}

/**
 * The default implementation of the "set" method for an ObservableComponent.
 */
ObservableComponent.prototype.set = function (_value)
{
	var	el = this.defaultElement();
	var changed = false;

	if (el && (el.tagName == 'INPUT')) {
		if ((el.type == 'text') || (el.type == 'password') || (el.type == 'file') || (el.type == 'hidden')) {
			if (el.value != _value) {
				el.value = _value;
				changed = true;
			}
		}
		else if (el.type == 'radio') {
			if (el.checked != (el.value == _value)) {
				el.checked = (el.value == _value);
				changed = true;
			}
		}
		else if (el.type == 'checkbox') {
			if (el.checked != parseBoolean (_value)) {
				el.checked = parseBoolean (_value);
				changed = true;
			}
		}
	}
	else if (el && (el.tagName == 'TEXTAREA')) {
		if (el.value != _value) {
			el.value = _value;
			changed = true;
		}
	}
	else if (el && (el.tagName == 'SELECT')) {
		if (el.value != _value) {
			set_input_value (el, _value)
		}
	}
	else if (!el) {
		if (this.value != _value) {
			this.value = _value;
			changed = true;
		}
	}

	if (changed)
		this.fireEvent();
}

/**
 * The default implementation of the "get" method for an ObservableComponent.
 */
ObservableComponent.prototype.get = function()
{
	var	el = this.defaultElement();

	if (el && (el.tagName == 'INPUT')) {
		if ((el.type == 'text') || (el.type == 'password') || (el.type == 'file') || (el.type == 'hidden')) {
			return el.value;
		}
		else if ((el.type == 'radio') || (el.type == 'checkbox'))
			return el.checked;
	}
	else if (el && (el.tagName == 'SELECT')) {
		return el.value;
	}
	else if (el && (el.tagName == 'TEXTAREA')) {
		return el.value;
	}
	else if (!el) {
		return this.value;
	}
}

/**
 * The default implementation of the "fireEvent" method
 * for an ObservableComponent, which fires an event to observers.
 */
ObservableComponent.prototype.fireEvent = function (_src, _evt)
{
	if (!_src)
		_src = this.defaultElement();

	this.notify (new ObservableComponentEvent (_src, this, _evt));
}

/**
 * The default implementation of the "fireEvent" method
 * for an ObservableComponent.
 * Default element within the component.
 */
ObservableComponent.prototype.defaultElement = function()
{
	return document.getElementById (this.prefix + this.mainElementSuffix);
}

/**
 * Construct a component that is observable and that has a radio button group
 * as the primary element.
 * @constructor
 * @extends ObservableComponent
 */
function ObservableRadioComponent (_prefix, _mainElementSuffix)
{
	subclass (this, new ObservableComponent (_prefix, _mainElementSuffix));
	oc_components[_prefix] = this;

	this.getButtons = function() {
		return document.getElementsByName (this.prefix);
	}

	/**
	 * Override "clear" to uncheck all buttons.
	 */
	this.clear = function() {
		var btns = this.getButtons();
		var val;

		for (var b = 0; (!val && (b < btns.length)); b++) {
			if (btns.item(b).defaultChecked)
				val = btns.item(b).value;
		}

		if (val)
			this.set ('NADA'); //(val);
	};

	/**
	 * Override "reset" to reset to the initial state.
	 */
	this.reset = function() {
		var btns = this.getButtons();
		var val;

		for (var b = 0; (!val && (b < btns.length)); b++) {
			if (btns.item(b).defaultChecked)
				val = btns.item(b).value;
		}

		if (val)
			this.set (val);
	};

	/**
	 * Override "set" to check and uncheck appropriate radio buttons.
	 */
	this.set = function (_value) {
		var btns = this.getButtons();
		var changed = false;

		for (var b = 0; (b < btns.length); b++) {
			var btn = btns.item(b);

			if (btn) {
				var check = (btn.value == _value);

				if (btn.checked != check) {
					btn.checked = check;
					changed = true;
				}
			}
		}

		if (changed)
			this.fireEvent();
	};

	/**
	 * Override "get" to return the value of the checked radio button.
	 */
	this.get = function() {
		var val;
		var btns = this.getButtons();

		for (var b = 0; (!val && (b < btns.length)); b++) {
			if (btns.item(b) && btns.item(b).checked)
				val = btns.item (b).value;
		}

		return val;
	};

	/**
	 * Override the "disable" method.
	 */
	this.disable = function (_disable) {
		var btns = this.getButtons();

		for (var b = 0; (b < btns.length); b++)
			btns.item(b).disabled = parse_boolean (_disable);

		if (parse_boolean (_disable))
			this.clear();
		else
			this.reset();
	}

	/*
	 * Override "fireEvent" to only fire for the checked button.
	this.fireEvent = function (_src)
	{
		if (_src && _src.checked)
			this.notify (new ObservableComponentEvent (_src, this));
	};
	*/
}

/*
 * Subclass the ObservableComponent so we can add a display_list
 * field to it. The display_list is the list of all cells that
 * are interested in observing the same observable. I.e. all the
 * cells are controlled by the observable
 * @constructor
 * @extends ObservableComponent
*/
function ObservableGridComponent (_prefix, _mainElementSuffix)
{
	this.compList = new Array();
	subclass (this, new ObservableComponent (_prefix, _mainElementSuffix));
	oc_components[_prefix] = this;
	
	/*
	* Override the default implementation to enable or disable
	* all cells in the compList
	*/
	this.disable = function (_disable)
	{
		for (var i=0; i<this.compList.length; i++) {
			disable_element(this.compList[i], _disable);
		}
		this.disable_submit_flag (_disable);
		disable_element (this.prefix + this.mainElementSuffix, _disable);
	
		if (parse_boolean (_disable))
			this.clear();
		else if (!this.get())
			this.reset();
	}
}
			
function get_observable_component (_name)
{
	return oc_components[_name] ? oc_components[_name] : null;
}

function fire_obs_comp_event (_name, _el, _evt)
{
	var comp = get_observable_component(_name);

	if (comp)
		comp.fireEvent (_el, _evt);
}

function observe_component (_observable, _observer)
{
	if (!_observable || !_observer)
		return;

	// Name could be <comp_name>.<value>, so that only certain values
	// should be observed.
	if ((typeof _observable) == 'string') {
		var splits = _observable.split ('.');
		_observable = splits[0];
		var filter_val = splits[1];
		_observable = get_observable_component (_observable);
	}

	if (_observable && _observable.addObserver) {
		if (filter_val && _observer.set_filter) {
			if (filter_val == 'true')
				filter_val = true;
		  else if (filter_val == 'false')
				filter_val = false;

			_observer.set_filter (filter_val);
		}

		_observable.addObserver (_observer);
		_observable.fireEvent();
	}
}


/**
 * Function used to compare a filter value with a component value.
 */
function filter_values_equal (_obj1, _obj2)
{
	var obj1type = typeof (_obj1);
	var obj2type = typeof (_obj2);

	if (obj1type == obj2type)
		return _obj1 == _obj2;
	else if (obj1type == 'boolean')
	  return _obj1 == parse_boolean (_obj2);
	else if (obj2type == 'boolean')
		return parse_boolean (_obj1) == _obj2;
	else
		return _obj1 == _obj2;
}


/**
 * Construct an observer of an observable component that enables or disables
 * another component in response to observed events.
 */
function ComponentEnabler (_component)
{
	if (typeof (_component) == 'string')
		_component = get_observable_component (_component);

	this.comp_to_enable = _component;
}

ComponentEnabler.prototype.set_filter = function (_f)
{
	this.filter = _f;
}

ComponentEnabler.prototype.observe = function (_event)
{
	if (this.comp_to_enable && _event.component && this.filter) {
		var haveMatch = filter_values_equal (this.filter, _event.component.get());
		this.comp_to_enable.disable (!haveMatch);
	}
}

/**
 * Construct an observer of an observable component that enables or disables
 * another component in response to observed events.
 */
function ComponentDisabler (_component)
{
	if (typeof (_component) == 'string')
		_component = get_observable_component (_component);

	this.comp_to_enable = _component;
}

ComponentDisabler.prototype.set_filter = function (_f)
{
	this.filter = _f;
}

ComponentDisabler.prototype.observe = function (_event)
{
	if (this.comp_to_enable && _event.component && this.filter) {
		var haveMatch = filter_values_equal (this.filter, _event.component.get());
		this.comp_to_enable.disable (haveMatch);
	}
}

/**
 * Construct an observer of an observable component that shows or hides
 * another component in response to observed events.  If _hideInstead
 * is true, then the behavior of this observer will be inverted.
 */
function ComponentDisplayer (_component, _hideInstead)
{
	if (typeof (_component) == 'string')
		_component = get_observable_component (_component);

	this.comp_to_show = _component;
	this.hideInstead = _hideInstead;
}

ComponentDisplayer.prototype.set_filter = function (_f)
{
	this.filter = _f;
}

ComponentDisplayer.prototype.observe = function (_event)
{
	if (this.comp_to_show && _event.component) {
		var haveMatch = filter_values_equal (this.filter, _event.component.get());
		this.comp_to_show.hide (this.hideInstead ? haveMatch : !haveMatch);
	}
}

/**
 * Construct an event sent by an observable component to its observers.
 * @param _evt optional parameter specifying the JavaScript event
 */
function ObservableComponentEvent (_src, _component, _evt)
{
	this.source = _src;
	this.component = _component;
	this.evt = _evt;
}

