//-----( @BUBBLE )-------------------------------------------------
// DESCRIPTION: these functions provide code for the bubbles that appear from the show and channel players
var Bubble = {
	create : function(obj,id,parent)
		{
		var div = document.createElement('div');
		div.setAttribute('id',id);
		if (parent){obj.parentNode.appendChild(div);}
		else{obj.appendChild(div);}
		return div;
		},
	className : function(obj,classNme)
		{
		obj.className = classNme;
		},
	message : function(obj,msg)
		{
		obj.innerHTML = msg;
		},
	position : function(obj,offSet)
		{
		obj.style.visibility = 'hidden'; // fix FFMac
		obj.style.top = '-'+(obj.offsetHeight - offSet)+'px';
		var fff = obj.offsetHeight; // fif FFMac
		obj.style.visibility = 'visible';// fix FFMac
		},
	fadeVals : function(obj,speed,count)
		{
		obj.fadeSpeed = speed;
		if (count){obj.fadeCount = count}; 
		},
	fade : function(id)
		{
		var obj = document.getElementById(id); 
		if (obj)
			{
			if (timeouts[id]) {clearTimeout(timeouts[id]);}                          
			if (obj.fadeCount < 0)
				{
			  	removeElement(obj);
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
					//obj.style.zoom = 1; // bizarre ie fix
					//obj.style.filter = 'alpha(opacity:'+obj.fadeCount+')'; // IE/Win
					}
				timeouts[id] = setTimeout(function(){Bubble.fade(id)},(obj.fadeSpeed*10));   
				}    
			} 
		},
	pause : function(id)
		{
	   if (document.getElementById(id))
			{
			if (timeouts[id]) {clearTimeout(timeouts[id]);}
			} 
		},
	restart : function(id)
		{
		if (document.getElementById(id))
			{
			var obj = document.getElementById(id);
			obj.fadeSpeed = 3;                                                                  
	   	timeouts[id] = setTimeout(function(){Bubble.fade(id)},(obj.fadeSpeed*10));
			} 
		}
	};
//-----( END )-------------------------------------------------


//-----( @FeedbackPlayer )-------------------------------------------------
// DESCRIPTION: feedback from the flash player
var FeedbackPlayer = {
	init : function(targetId,displayMessage)
		{
		var b = Bubble;
		var bubObj = document.getElementById('bubble-flash-'+targetId);
		if (!bubObj)
			{
			bubObj = b.create(document.getElementById('play-'+targetId),'bubble-flash-'+targetId);
			b.className(bubObj,'bubble-flash');
			b.message(bubObj,'<div class="top"><span>'+displayMessage+'</span></div><div class="bot"></div>');
			b.position(bubObj,12);
			b.fadeVals(bubObj,5,900);
		  	b.fade('bubble-flash-'+targetId);
		  	addEventToObject(bubObj,'onmouseover',function(){b.pause('bubble-flash-'+targetId)});
		  	addEventToObject(bubObj,'onmouseout',function(){b.restart('bubble-flash-'+targetId)});
			}
		},
	update : function(targetId,displayMessage)
		{
		var b = Bubble;
		var bubObj = document.getElementById('bubble-flash-'+targetId);
		if (!bubObj) {bubObj = b.create(document.getElementById('play-'+targetId),'bubble-flash-'+targetId);}
		b.className(bubObj,'bubble-flash');
		b.message(bubObj,'<div class="top"><span>'+displayMessage+'</span></div><div class="bot"></div>');
		b.position(bubObj,12);
		b.fadeVals(bubObj,5,800);
		b.fade('bubble-flash-'+targetId);
		addEventToObject(bubObj,'onmouseover',function(){b.pause('bubble-flash-'+targetId)});
		addEventToObject(bubObj,'onmouseout',function(){b.restart('bubble-flash-'+targetId)});
		}
	};
//-----( END )-------------------------------------------------


//-----( @SubscribeQueue )-------------------------------------------------
// DESCRIPTION: these functions allow people to subscribe or unsubscribe from a channel and add or remove shows from their queue
var SubscribeQueue = {
	init : function()
		{
		var s = SubscribeQueue;
		if (!document.getElementById) return false;
		if (!document.getElementsByTagName) return false;
		if (!setTimeout) return false;
		var ahrefs = document.getElementsByTagName('a');
		for (var i=0;i<ahrefs.length;i++)
			{
			if (/subs-channel/.test(ahrefs[i].className) || /subs-show/.test(ahrefs[i].className))
		  		{
				addEventToObject(ahrefs[i],'onclick',s.click);
				addEventToObject(ahrefs[i],'onmouseout',s.out);
				}
			}
		},
	swapImage : function(obj,img)
		{
		obj.src = img;
		},
	swapTitle : function(obj,title)
		{
		if (obj.parentNode) {obj.parentNode.title = title;}
		},
	click : function(ev)
		{
		var s = SubscribeQueue;
		var b = Bubble;
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;    
		var trigObj = eventElement;
		var trigLnk = eventElement.parentNode;                                           
		var trigLnkId = trigLnk.getAttribute('id').substring(1);
		var bLoggedIn = (document.getElementById('user-is-logged-in')) ? 1 : 0;
		var sSubsPage = (document.getElementsByTagName('body')[0].id == 'subscriptions') ? 1 : 0;
		// if channel
		if (trigLnk.className.indexOf('channel') != -1)
			{
			// if logged in
			if (bLoggedIn)
				{
				
				if (trigObj.src.indexOf('remove') != -1)
					{
					img = '/img/btn-subs-add.gif';
					title = 'Add to subscriptions';
					msg = (sSubsPage) ? '<div class="top"><span>You have <em>unsubscribed</em> from this Channel. It will be <em>removed</em> from this list when the page refreshes.</span></div><div class="bot"></div>' : '<div class="top"><span>You have <em>unsubscribed</em> from this Channel. It has been <em>removed</em> from <a href="/account/subscriptions" title="View your subscriptions">your subscriptions</a>.</span></div><div class="bot"></div>';
					url = '/channel/'+trigLnkId+'/unsubscribe/ajax/';
					trigObj.action = 'remove';
					}
				else
					{
					img = '/img/btn-subs-remove.gif';
					title = 'Remove from subscriptions';
					msg = (sSubsPage) ? '<div class="top"><span>You have <em>re-subscribed</em> to this Channel.</span></div><div class="bot"></div>' : '<div class="top"><span>You have <em>subscribed</em> to this Channel. It has been <em>added</em> to <a href="/account/subscriptions" title="View your subscriptions">your subscriptions</a>.</span></div><div class="bot"></div>';
					url = '/channel/'+trigLnkId+'/subscribe/ajax/';
					trigObj.action = 'add';
					var latestShow = document.getElementById('audio1');
					if (latestShow)
						{
						var imgs = latestShow.getElementsByTagName('img');
						if (imgs[0].src.indexOf('add') != -1){s.swapImage(imgs[0],'/img/btn-queue-remove.gif');}
						}
					}
				}
			// if not logged in
			else
				{
				msg = '<div class="top"><span><strong>Whoa there, cowboy!</strong> You must be <a href="/channel/'+trigLnkId+'/subscribe">logged in</a> to subscribe to Channels. If you\'re not already an Odeo member then <a href="/account/signup">sign up now!</a></span></div><div class="bot"></div>';
				}
			}
		// if show
		else
			{
			// if logged in
			if (bLoggedIn)
				{
				if (trigObj.src.indexOf('remove') != -1)
					{
					if (trigObj.src.indexOf("small") != -1) img = '/img/add-to-playlist-small.png';
					else img = '/img/playlist-add.gif';
					title = 'Re-add to Playlist';
					msg = '<div class="top"><span>You have <em>removed</em> this audio from <a href="/sync/queue" title="View your inbox">your playlist</a>.</span></div><div class="bot"></div>';
					url = '/show/'+trigLnkId+'/queue-remove/ajax/';
					trigObj.action = 'remove';
					}
				else if (trigObj.src.indexOf('readd') != -1)
					{
					if (trigObj.src.indexOf("small") != -1) img = '/img/remove-from-playlist-small.png';
					img = '/img/playlist-remove.gif';
					title = 'Remove from Playlist';
					msg = '<div class="top"><span>You have <em>re-added</em> this audio to <a href="/sync/queue" title="View your playlist">your playlist</a>.</span></div><div class="bot"></div>';
					url = '/show/'+trigLnkId+'/queue-add/ajax/';
					trigObj.action = 'readd';
					}
				else
					{
					if (trigObj.src.indexOf("small") != -1) img = '/img/remove-from-playlist-small.png';
					else img = '/img/playlist-remove.gif';
					title = 'Remove from Playlist';
					msg = '<div class="top"><span>You have <em>added</em> this audio to <a href="/sync/queue" title="View your playlist">your playlist</a>.</span></div><div class="bot"></div>';
					url = '/show/'+trigLnkId+'/queue-add/ajax/';
					trigObj.action = 'add';
					}
				}
			// if not logged in
			else
				{
				msg = '<div class="top"><span><strong>Whoa there, cowboy!</strong> You must be <a href="/show/'+trigLnkId+'/queue-add">logged in</a> to add audio to your playlist. If you\'re not already an Odeo member then <a href="/account/signup">sign up now!</a></span></div><div class="bot"></div>';
				}
			}
		if (bLoggedIn)
			{
			s.swapImage(trigObj,img);
			s.swapTitle(trigObj,title);
			ajaxRequest(url,s.clickReqChange,eventElement);
			}	
		if (trigLnk.className.indexOf('channel') != -1)	{
		var bubObj = document.getElementById('bubble-'+trigLnkId);
		if (!bubObj){bubObj = b.create(trigLnk,'bubble-'+trigLnkId,1);}
		b.className(bubObj,'bubble-click');
		b.message(bubObj,msg);
		b.position(bubObj,13);
		addEventToObject(bubObj,'onmouseover',function(){b.pause('bubble-'+trigLnkId)});
		addEventToObject(bubObj,'onmouseout',function(){b.restart('bubble-'+trigLnkId)});
		(bLoggedIn) ? b.fadeVals(bubObj,5,750) : b.fadeVals(bubObj,5,3000);
	  	b.fade('bubble-'+trigLnkId);
		}
		stopDefaultAction(ev);
		return false;
		},
	clickReqChange : function(req,obj)
		{
		var b = Bubble;
		var s = SubscribeQueue;
		if (req.readyState == 4)
			{
			// if the server has returned an error
			if (req.responseText.indexOf('error') != -1)
				{
				var trigObj = obj;
				var trigLnk = obj.parentNode;                                           
				var trigLnkId = trigLnk.getAttribute('id').substring(1);
				// if the user isn't logged in
				if (req.responseText == 'error:user:notLoggedIn')
					{
					// if channel
					if (trigLnk.className.indexOf('channel') != -1)
						{
						if (trigObj.action == 'add')
							{
							img = '/img/btn-subs-add.gif';
							title = 'Add to subscriptions';
							msg = '<div class="top"><span><strong>Whoops!</strong> Sorry, but you must be <a href="/channel/'+trigLnkId+'/subscribe">logged in</a> to subscribe to Channels. If you\'re not already an Odeo member then <a href="/account/signup">sign up now!</a></span></div><div class="bot"></div>';
							}
						else
							{
							img = '/img/btn-subs-remove.gif';
							title = 'Remove from subscriptions';
							msg = '<div class="top"><span><strong>Whoops!</strong> Sorry, but you must be <a href="/channel/'+trigLnkId+'/unsubscribe">logged in</a> to unsubscribe from Channels. If you\'re not already an Odeo member then <a href="/account/signup">sign up now!</a></span></div><div class="bot"></div>';
							}
						}
					// if show
					else
						{
						if (trigObj.action == 'add')
							{
							img = '/img/playlist-add.gif';
							title = 'Add to Playlist';
							msg = '<div class="top"><span><strong>Whoops!</strong> Sorry, but you must be <a href="/show/'+trigLnkId+'/queue-add">logged in</a> to add audio to your playlist. If you\'re not already an Odeo member then <a href="/account/signup">sign up now!</a></span></div><div class="bot"></div>';
							}
						else if (trigObj.action == 'readd')
							{
							img = '/img/playlist-add.gif';
							title = 'Re-add to Playlist';
							msg = '<div class="top"><span><strong>Whoops!</strong> Sorry, but you must be <a href="/show/'+trigLnkId+'/queue-add">logged in</a> to re-add audio to your playlist. If you\'re not already an Odeo member then <a href="/account/signup">sign up now!</a></span></div><div class="bot"></div>';
							}
						else
							{
							img = '/img/playlist-remove.gif';
							title = 'Remove from Playlist';
							msg = '<div class="top"><span><strong>Whoops!</strong> Sorry, but you must be <a href="/show/'+trigLnkId+'/queue-remove">logged in</a> to remove audio from your playlist. If you\'re not already an Odeo member then <a href="/account/signup">sign up now!</a></span></div><div class="bot"></div>';
							}
						}
					}
				// if unknown odeo error
				else if (req.responseText == 'error:odeo:unknown')
					{
					// if channel
					if (trigLnk.className.indexOf('channel') != -1)
						{
						if (trigObj.action == 'add')
							{						
							img = '/img/btn-subs-add.gif';
							title = '';
							msg = '<div class="top"><span><strong>Error:</strong> Something technical has gone wrong at our end. We can\'t subscribe you to this Channel at the present time. Sorry about that.</span></div><div class="bot"></div>';
							}
						else
							{						
							img = '/img/btn-subs-remove.gif';
							title = '';
							msg = '<div class="top"><span><strong>Error:</strong> Something technical has gone wrong at our end. We can\'t unsubscribe you from this Channel at the present time. Sorry about that.</span></div><div class="bot"></div>';
							}
						}
					// if show
					else
						{
						if (trigObj.action == 'add')
							{
							img = '/img/playlist-add.gif';
							title = '';
							msg = '<div class="top"><span><strong><strong>Error:</strong> Something technical has gone wrong at our end. We can\'t add this audio to your inbox at the present time. Sorry about that.</span></div><div class="bot"></div>';
							}
						else if (trigObj.action == 'readd')
							{
							img = '/img/playlist-add.gif';
							title = '';
							msg = '<div class="top"><span><strong><strong>Error:</strong> Something technical has gone wrong at our end. We can\'t re-add this audio to your inbox at the present time. Sorry about that.</span></div><div class="bot"></div>';
							}
						else
							{
							img = '/img/playlist-remove.gif';
							title = '';
							msg = '<div class="top"><span><strong><strong>Error:</strong> Something technical has gone wrong at our end. We can\'t remove this audio from your inbox at the present time. Sorry about that.</span></div><div class="bot"></div>';
							}
						}
					}
				var bubObj = document.getElementById('bubble-'+trigLnkId);
				if (!bubObj){bubObj = b.create(trigLnk,'bubble-'+trigLnkId,1);}
				b.className(bubObj,'bubble-click');
				s.swapImage(trigObj,img);
				s.swapTitle(trigObj,title);
				b.message(bubObj,msg);
				b.position(bubObj,13);
				addEventToObject(bubObj,'onmouseover',function(){b.pause('bubble-'+trigLnkId)});
				addEventToObject(bubObj,'onmouseout',function(){b.restart('bubble-'+trigLnkId)});
				b.fadeVals(bubObj,5,2000);
			  	b.fade('bubble-'+trigLnkId);
				}
			}
		},
	out : function(ev)
		{
		var b = Bubble;
		if (!ev) ev = window.event;
		var eventElement = (window.event) ? window.event.srcElement : ev.target;
		var trigLnkId = eventElement.parentNode.getAttribute('id').substring(1);
		var bubObj = document.getElementById('bubble-'+trigLnkId);
		if (bubObj)
			{
			b.fadeVals(bubObj,3);  
			b.fade('bubble-'+trigLnkId);
			}
		var foo = stopDefaultAction(ev);
		return false;
		}
	};
//-----( END )-------------------------------------------------


addEventToObject(window,'onload',SubscribeQueue.init);