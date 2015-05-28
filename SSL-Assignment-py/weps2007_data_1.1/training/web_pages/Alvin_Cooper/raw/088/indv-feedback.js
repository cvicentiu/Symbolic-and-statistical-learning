//-----( @Feedback )-------------------------------------------------
// DESCRIPTION: fades out flashed feedback messages
var Feedback = {
	init : function()
		{
		if (!document.getElementById) return false;
		if (!document.getElementById('feedback-message-fade')) return false;
		var obj = document.getElementById('feedback-message-fade');
		var newDate = new Date();
		var uniqueId = newDate.getTime();
		obj.fadeCount = 700;
		Feedback.fade(uniqueId,obj);
		addEventToObject(obj,'onmouseover',function(){Feedback.pause(uniqueId,obj);});
		addEventToObject(obj,'onmouseout',function(){Feedback.restart(uniqueId,obj);});
		},
	fade : function(id,obj)
		{
		if (obj.fadeCount <= 0)
			{
			clearTimeout(timeouts[id]);
			var height = obj.offsetHeight;
			obj.style.visibility = 'hidden';
			obj.style.overflow = 'hidden';
			obj.style.border = 'none';
			obj.style.marginTop = (-15)+'px';
			obj.style.height = (height + 15)+'px';
			var duration = 100;
			var steps = 10;
			var stepDuration = Math.round(duration/steps);
			var stepSize = height/steps;
			Feedback.shrink(id,obj,stepDuration,stepSize);
			}
		else
			{
			obj.fadeCount -= 10;
			if (obj.fadeCount <= 100)
				{
				var opac = ((obj.fadeCount/100) > 0.999) ? 0.999 : (obj.fadeCount/100);
				obj.style.KHTMLOpacity = opac; // Safari<1.2, Konqueror
				obj.style.MozOpacity = opac; // Older Mozilla and Firefox
				obj.style.opacity = opac; // Safari 1.2, newer Firefox and Mozilla, CSS3
				}
			var delay = (obj.fadeCount == 0.999) ? 1000 : 65;
			timeouts[id] = setTimeout(function(){Feedback.fade(id,obj)},delay);
			}
		},
	pause : function(id,obj)
		{                                                                  
	   if (obj) {if (timeouts[id]) {clearTimeout(timeouts[id]);}} 
		},
	restart : function(id,obj)
		{
		if (obj) {timeouts[id] = setTimeout(function(){Feedback.fade(id,obj)},65);} 
		},
	shrink : function(id,obj,stepDuration,stepSize)
		{
		if ((obj.offsetHeight - stepSize) > 0)
			{
			obj.style.height = (obj.offsetHeight - stepSize)+'px';
			timeouts[id] = setTimeout(function(){Feedback.shrink(id,obj,stepDuration,stepSize)},stepDuration);
			}
		else
			{
			obj.style.display = 'none';
			clearTimeout(timeouts[id]);
			}
		}
	};
//-----( END )-------------------------------------------------

addEventToObject(window,'onload',Feedback.init);