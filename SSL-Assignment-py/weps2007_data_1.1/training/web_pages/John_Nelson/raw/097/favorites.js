var Favorites = {
	 addEvent: function(elm, evType, fn, useCapture) {
		 if (elm.addEventListener) {
			 elm.addEventListener(evType, fn, useCapture);
			 return true;
		 } else if (elm.attachEvent) {
			 var r = elm.attachEvent('on' + evType, fn);
			 return r;
		 } else {
			 elm['on' + evType] = fn;
		 }
	 },

	setRecommendation: function(entry) {
		var url = '/mt/mt-RateIt.cgi?entry_id=' + entry + ';value=3';
		var myAjax = new Ajax.Updater( 'recommended' , url, {
			onLoading: function(request) { Favorites.recommendation_loading(entry) },
			onComplete: function(request) { Favorites.recommendation_added(entry) },
			asynchronous: true,
			method: 'get'} );
	},
	
	recommendation_loading: function(entry) {
		var prog = 'progress_recommend_' + entry;
		new Effect.Appear(prog);
	},
	
	recommendation_added: function(entry) {
		var prog = 'progress_recommend_' + entry;
		new Effect.Fade(prog);

		var div_rectext = 'rectext_' + entry;
		var div_recvotes = 'recvotes_' + entry;
		
		var cur_host = window.location.hostname;
		
		switch (cur_host.replace(/www./, "")) {
		case "sampaist.com":
			var rectext = 'Recomendado';
			break;
		
		default:
			var rectext = 'Recommended';
			break;
		}
		
		if (!document.getElementById(div_recvotes)) {
			rectext += ' (1)';
		} else {
			var votes = document.getElementById(div_recvotes).innerHTML;
			votes = parseInt(votes) + 1;
			document.getElementById(div_recvotes).innerHTML = votes;		
			new Effect.Highlight(div_recvotes);
		}
		
		document.getElementById(div_rectext).innerHTML = rectext;
		new Effect.Highlight(div_rectext);
	
	},
	
	getRecommendations: function() {
		var url = '/labs/includes/favorites.pages.recommends.php';
		var myAjax = new Ajax.Updater( 'recommended' , url, {
			onLoading: function(request) { new Effect.Appear('progress_recommended'); },
			onComplete: function(request) { new Effect.Fade('progress_recommended'); },
			asynchronous: true,
			method: 'get'} );
	},
	
	getCommented: function() {
		var url = '/labs/includes/favorites.pages.comments.php';
		var myAjax = new Ajax.Updater( 'commented' , url, {
			onLoading: function(request) { new Effect.Appear('progress_commented'); },
			onComplete: function(request) { new Effect.Fade('progress_commented'); },
			asynchronous: true,
			method: 'get'} );
	},	
	
	createCookie: function(name,value,days) {
        if (days)
        {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
	},

	readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++)
        {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
	},

	eraseCookie: function(name) {
        Favorites.createCookie(name,"",-1);
	},
	
	setInstructionPref: function() {
		var name = 'cprefscookie';
		var current_style = document.getElementById('instructions').style.display;
		var new_style;
		
		(current_style != "none") ? new_style = 'none' : new_style = '';
		Favorites.formatInstructions(new_style);
		if (Favorites.readCookie(name)) Favorites.eraseCookie(name);
		Favorites.createCookie(name, new_style, 14);
	},
	
	formatInstructions: function(style) {
		if (style == "none") {
			document.getElementById('toggle').innerHTML = 'Show';
		} else {
			document.getElementById('toggle').innerHTML = 'Hide';
		}
		document.getElementById('instructions').style.display = style;
		
	},

	init: function() {
		Favorites.getRecommendations();
		Favorites.getCommented();
		intervalID = window.setInterval('Favorites.getRecommendations()', 300000);
		intervalID = window.setInterval('Favorites.getCommented()', 300000);
	}
};
