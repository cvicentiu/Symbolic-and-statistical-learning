
Livesearch = Class.create();

Livesearch.prototype = {
	initialize: function(father, attachitem, target, hideitem, url, pars, searchform, loaditem, searchtext, resetbutton, buttonvalue) {
		var thisSearch = this;

		this.father = father;
		this.attachitem = attachitem;
		this.target = target;
		this.hideitem = hideitem;
		this.url = url;
		this.pars = pars;
		this.searchform = searchform;
		this.loaditem = loaditem;
		this.searchtext = searchtext;
		this.resetbutton = resetbutton;
		this.buttonvalue = buttonvalue;
		this.searchstring = '';
		this.t = null;  // Init timeout variable

		$(father).innerHTML = '<input type="text" id="s" name="s" class="livesearch" autocomplete="off" value="'+this.searchtext+'" /><span id="searchreset"></span><span id="searchload"></span><input type="submit" id="searchsubmit" value="'+this.buttonvalue+'" />';

		// Style the searchform for livesearch
		var inputs = $(searchform).getElementsByTagName('input');
		for (var i = 0; i < inputs.length; i++) {
			var input = inputs.item(i);
			if (input.type == 'submit') 
				input.style.display = "none";
		}

		Effect.Fade(this.resetbutton, { duration: 0, to: 0.3 });
		$(this.loaditem).style.display = 'none';

		Event.observe(thisSearch.attachitem, 'focus', function() {
			if ($(thisSearch.attachitem).value == thisSearch.searchtext)
				$(thisSearch.attachitem).setAttribute('value', '');
		});

		Event.observe(thisSearch.attachitem, 'blur', function() {
			if ($(thisSearch.attachitem).value == '')
				$(thisSearch.attachitem).setAttribute('value', thisSearch.searchtext);
		});

		// Bind the keys to the input
		Event.observe(this.attachitem, 'keyup', this.readyLivesearch.bindAsEventListener(this));
	},

	readyLivesearch: function(event) {
		var code = event.keyCode;
		if (code == Event.KEY_ESC || ((code == Event.KEY_DELETE || code == Event.KEY_BACKSPACE) && $F(this.attachitem) == '')) {
			this.resetLivesearch.bind(this);
		} else if (code != Event.KEY_RETURN) {
			if (this.t) clearTimeout(this.t);
	        this.t = setTimeout(this.doLivesearch.bind(this), 400);
		}
	},

    doLivesearch: function() {
		if ($F(this.attachitem) == this.searchstring) return;

		Effect.Fade(this.resetbutton, { duration: .1});
		Effect.Appear(this.loaditem, {duration: .1});

		new Ajax.Updater(
			this.target,
			this.url,
			{
				method: 'get',
				evalScripts: true,
				parameters: this.pars + encodeURIComponent($F(this.attachitem)) + '&rolling=1',
				onComplete: this.searchComplete.bind(this)
		});

		this.searchstring = $F(this.attachitem);
	},
	
	searchComplete: function() {
		$(this.hideitem).style.display = 'none';
		Effect.Fade(this.loaditem, {duration: .1});
		Effect.Appear(this.resetbutton, { duration: .1 });
		
		Event.observe(this.resetbutton, 'click', this.resetLivesearch.bindAsEventListener(this));
		$(this.resetbutton).style.cursor = 'pointer';

		// Support for Lightbox
		if (window.initLightbox) {
			initLightbox();
		}
	},

	resetLivesearch: function() {
		$(this.target).innerHTML = '';
		$(this.hideitem).style.display = 'block';

		$(this.attachitem).value = this.searchtext;
		Effect.Fade(this.resetbutton, { duration: .1, to: 0.3 });
		$(this.resetbutton).style.cursor = 'default';
	}
}
