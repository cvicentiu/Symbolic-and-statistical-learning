// login panel animation
var anim;
init = function() {   
	   anim = new YAHOO.util.Anim('login', {top: {from: -73, to: 0}}, 0.15, YAHOO.util.Easing.easeIn);
	   YAHOO.util.Event.on('login-link', 'click', showLoginPanel);
	};

function showLoginPanel(ev){
	anim.animate();
	YAHOO.util.Event.preventDefault(ev);
}
	
YAHOO.util.Event.onAvailable('login', init);
