
//-----( @StarredAudio )-------------------------------------------------
// DESCRIPTION: star and unstar an audio (ratings by user) 
var StarredAudio = {
	init : function()
		{
		var s = StarredAudio;
		if (!document.getElementById) return false;
		if (!document.getElementsByTagName) return false;
		if (!setTimeout) return false;
		if (!document.getElementById('star-link-div')) return false;
		var div = document.getElementById('star-link-div');
        var link = div.getElementsByTagName('a')[0];
        if (div && link) addEventToObject(link,'onclick',s.click);
		var imglink = div.getElementsByTagName('img')[0];
        if (div && imglink) addEventToObject(imglink,'onclick',s.click);
		},

    addToTotal : function(amt)
        {
          if (document.getElementById('star-total')) 
              {
              var total = document.getElementById('star-total').childNodes[0];
              total.nodeValue = parseInt(total.nodeValue) + amt;
              }
          else if (document.getElementById('star-heading'))
              {
                var head = document.getElementById('star-heading');
                head.appendChild(document.createTextNode("("));
                var span = document.createElement('span');
                span.appendChild(document.createTextNode("1"));
                span.setAttribute("id", "star-total");
                head.appendChild(span);
                head.appendChild(document.createTextNode(" Total)"));
              } 
        },    
    addToUserList : function(name, id)
        {
		  ajaxRequest("/audio/stars_ajax?id="+audio_id,StarredAudio.addReqChange);
		  return false;
        },
	addReqChange : function(req)
		{
			if (req.readyState == 4) {
				document.getElementById('stars-list').innerHTML = req.responseText;
			}	
		},
    removeFromUserList : function(id)
       {
         var li = document.getElementById('star-user-' + id);
         if (li && li.parentNode) li.parentNode.removeChild(li);
       },
	click : function(ev)
		{
		var s = StarredAudio;
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target; 
		if (eventElement.tagName == "IMG") eventElement = eventElement.parentNode;
		var trigObj = eventElement;
		var trigParent = eventElement.parentNode;

		var trigLnkId
        var result = window.location.href.match(/\w+\/(\d+)/);
		if (typeof currentAudioId != 'undefined') {
			result = window.location.href.match(/\w+\#(\d+)/);
			trigLnkId = currentAudioId;
		}
		else trigLnkId = result[1];


		var bLoggedIn = (document.getElementById('user-is-logged-in')) ? 1 : 0;
		var sSubsPage = (document.getElementsByTagName('body')[0].id == 'subscriptions') ? 1 : 0;

        // if logged in
        if (bLoggedIn)
            {
            if (trigObj.href.indexOf('unstar') != -1)
                {
                var msg = '<div class="top"><span>You have removed your <em>star</em> from this audio.</span></div><div class="bot"></div>';
                var url = '/audio/'+trigLnkId+'/unstar_ajax/';
                trigObj.action = 'unstar';
                }
            else
                {
                var msg = '<div class="top"><span>You have added your <em>star</em> to this audio.</span></div><div class="bot"></div>';
                var url = '/audio/'+trigLnkId+'/star_ajax/';
                trigObj.action = 'star';
                }
            }
		if (bLoggedIn)
			{
			ajaxRequest(url,s.clickReqChange,eventElement);
            var img = document.createElement("img");
            img.setAttribute("id", "star-saving");
			img.setAttribute("src", "/img/saving.gif");
//            span.appendChild(document.createTextNode("saving..."));
           	if (trigParent) trigParent.replaceChild(img, trigObj);
			}
		stopDefaultAction(ev);
		return false;
		},
	clickReqChange : function(req,obj)
		{
		var s = StarredAudio;
		if (req.readyState == 4)
	    {
	        var result = window.location.href.match(/\w+\/(\d+)/);
			playjax = false;
			var audioId;
			if (typeof currentAudioId != 'undefined') {
				result = window.location.href.match(/\w+\#(\d+)/);
				playjax = true;
				audioId = currentAudioId;
			}
			else audioId = result[1];

            var link = document.createElement('a');
            link.setAttribute('id', 'star-link');
            var parent = document.getElementById('star-link-div');
            var resp = req.responseXML;
            if (resp.getElementsByTagName('result')[0].firstChild.nodeValue == "Removed Star")
            {
                link.href = "/audio/" + audioId + "/star";
                var img = document.createElement("img");
                img.setAttribute("id", "star-image");
				if (playjax) img.setAttribute("align", "absmiddle");
                if (!playjax) img.setAttribute("src", "/img/star-this2.gif");
				else img.setAttribute("src", "/img/tinystar.gif");
                link.appendChild(img);
		        addEventToObject(link,'onclick',s.click);
                parent.replaceChild(link, document.getElementById('star-saving'));
                s.addToTotal(-1);
                s.removeFromUserList(resp.getElementsByTagName('id')[0].firstChild.nodeValue);
            }
            else if (resp.getElementsByTagName('result')[0].firstChild.nodeValue == "Added Star")
            {
                link.href = "/audio/" + audioId + "/unstar";
                var img = document.createElement("img");
                img.setAttribute("id", "star-image");
				if (playjax) img.setAttribute("align", "absmiddle");
                if (!playjax) img.setAttribute("src", "/img/unstar-this2.gif");
				else img.setAttribute("src", "/img/tinystar.gif");
				link.setAttribute("id", "starred/" + resp.getElementsByTagName('name')[0].firstChild.nodeValue)
                link.appendChild(img);
		        addEventToObject(link,'onclick',s.click);
                parent.replaceChild(link, document.getElementById('star-saving'));
                s.addToTotal(1);
                s.addToUserList(resp.getElementsByTagName('name')[0].firstChild.nodeValue, resp.getElementsByTagName('id')[0].firstChild.nodeValue);
				if (typeof Stars != 'undefined') Stars.init(); 
				if (document.getElementById('nostars')) document.getElementById('nostars').style.display = "none";
            }
			else 
	        {
                parent.replaceChild(document.createTextNode("Ooops, we had an error on our side. Sorry."), parent.childNodes[1]);
            }
        }
            return false;
        }
    };
//-----( END )-------------------------------------------------


addEventToObject(window,'onload',StarredAudio.init);


