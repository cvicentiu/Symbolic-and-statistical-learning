//the dropdowns are based on suckerfish dropdowns by Patrick Griffiths
//jquery used to add fade-ins on supported browsers without losing the benefits of css dropdowns if they don't
//http://www.htmldog.com/articles/suckerfish/dropdowns/

var currentBrowser = BrowserDetect.browser;
var currentBrowserVersion = BrowserDetect.version;

if (!((currentBrowser == "Explorer" && currentBrowserVersion <= "6") || (currentBrowser == "Opera")))
{
//applies to all browsers except for IE 6 and below and opera.
	$(document).ready(function(){
		$(".navGlobal li").hover(
		function(){ $("ul", this).fadeIn("fast"); }, 
		function() { } 
		);
	});
}
if ((currentBrowser == "Explorer") && (currentBrowserVersion <= "6"))
{
//this applies to IE 6 and below because the backup CSS methods don't work.
//In Opera, I let the CSS take over, meaning there is no fade in effect.
	sfHover = function() {
		var sfEls = $(".navGlobal li");
		for (var i=0; i<sfEls.length; i++) {
			sfEls[i].onmouseover=function() {
				this.className+=" sfhover";
			}
			sfEls[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
			}
		}
	}
	if (window.attachEvent) window.attachEvent("onload", sfHover);
}




