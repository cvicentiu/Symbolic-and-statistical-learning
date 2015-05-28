<!--
		function outputframe(the_dir)
		{
			document.write("<div id=\"lucent\" name=\"lucent\" style=\"PADDING:0px; DISPLAY:none; FILTER:progid:dximagetransform.microsoft.alpha(opacity=60); LEFT:0px; POSITION:absolute; TOP:0px; BACKGROUND-COLOR:#ffffff; moz-opacity:0.60; khtml-opacity:.6; opacity:.6\"></div>");
			document.write("<div id=\"divpopbox_fakepopbox\" name=\"divpopbox_fakepopbox\" style=\"DISPLAY: none; Z-INDEX: 1000000; FILTER: progid: dximagetransform.microsoft.alpha(opacity=100); TOP: 50px; LEFT: 50px; WIDTH: 50px; HEIGHT: 50px; POSITION: absolute; moz-opacity: 1.0; khtml-opacity: 1.0; opacity: 100\">");
				document.write("<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" bgcolor=\"#D9D6C0\" style=\"border:1px solid #000000;\">");
					document.write("<tr>");
						document.write("<td width=\"46\" background=\"" + the_dir + "images/fp_01.gif\"><img src=\"" + the_dir + "images/s.gif\" width=\"46\" height=\"1\"></td>");
						document.write("<td width=\"100%\" align=\"center\" background=\"" + the_dir + "images/fp_01.gif\"><img src=\"" + the_dir + "images/fp_02.gif\" width=\"212\" height=\"53\"></td>");
						document.write("<td width=\"46\" align=\"right\" valign=\"top\" background=\"" + the_dir + "images/fp_01.gif\" style=\"padding:15px 1px 0px 0px;\"><a href=\"#\" onclick=\"cancel('divpopbox_fakepopbox', false); return false;\"><img src=\"" + the_dir + "images/fp_btn_close.gif\" width=\"45\" height=\"12\" border=\"0\"></a></td>");
					document.write("</tr>");
					document.write("<tr>");
						document.write("<td width=\"46\">&nbsp;</td>");
						document.write("<td align=\"center\" valign=\"top\" style=\"padding:10px 0px 10px 0px;font:bold 14px arial;color:#603811;\">");
						document.write("<iframe id=\"fakepop\" name=\"fakepop\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" src=\"\" frameborder=\"0\"></iframe>");
						document.write("</td>");
						document.write("<td width=\"46\">&nbsp;</td>");
					document.write("</tr>");
					document.write("<tr>");
						document.write("<td background=\"" + the_dir + "images/fp_03.gif\">&nbsp;</td>");
						document.write("<td background=\"" + the_dir + "images/fp_03.gif\">&nbsp;</td>");
						document.write("<td background=\"" + the_dir + "images/fp_03.gif\">&nbsp;</td>");
					document.write("</tr>");
				document.write("</table>");
			document.write("</div>");
		}
		
        function divpop(boxwidth, boxheight, name)
        {
			divpopOffset(boxwidth, boxheight, 0, name);
        }
        function divpopOffset(boxwidth, boxheight, offsetY, name) {
            if (!boxwidth) boxwidth = 500;
            // else boxwidth = boxwidth + 80;
            if (!boxheight) boxheight = 435;
            
            if (!name) name = '';
            
            if (document.getElementById){
                 if (!document.documentElement || !document.documentElement.clientHeight) {
                      var width = (document.all) ? document.body.clientWidth : window.innerWidth;
                      var height = (document.all) ? document.body.clientHeight : window.innerHeight;
                 } else {
                      var width = document.documentElement.clientWidth;
                      var height = document.documentElement.clientHeight;
                 } 
            } else if (document.layers) {
                 var width = window.innerWidth;
                 var height = window.innerHeight;
            }
            
            if (!width || !height) {
                var height = screen.availHeight;
                var width = screen.availWidth;
            }
            
            var left = (width - boxwidth) / 2;
            var top = ((height - boxheight) / 2) + offsetY;
            if (document.documentElement && document.documentElement.scrollTop) {
                top = top + document.documentElement.scrollTop;
			} else if (document.body.scrollTop) {
                top = top + document.body.scrollTop;
            } else if (window.pageYOffset) {
                top = top + window.pageYOffset;
            } else {
                top = top;
            }
          
          	/* if Firefox, then offset the fake pop */
			var agt=navigator.userAgent.toLowerCase();
			if ((agt.indexOf("msie") == -1) && (agt.indexOf("opera") == -1)) {
				if (top < 168) top = 168;
			}

            
            var lucent = UPC_GetElement('lucent');
            lucent.style.width = width + "px";
            lucent.style.height = (height + top) + "px";
            lucent.style.display = 'block';
            hideAds();
            
            if (name) {
                var divpopbox_name = 'divpopbox_' + name;
            } else {
                var divpopbox_name = 'divpopbox';
            }
            
            var divpopbox = UPC_GetElement(divpopbox_name);

            top = Math.floor(top);
            left = Math.floor(left);
            setStyleById(divpopbox_name, 'display', 'block');
            //setStyleById(divpopbox_name, 'height', boxheight + "px");
            setStyleById(divpopbox_name, 'top', top + "px");
            setStyleById(divpopbox_name, 'left', left + "px");
			UPC_GetElement('fakepop').width = boxwidth-10;
			UPC_GetElement('fakepop').height = boxheight-10;
        }
        
        function cancel(name, reload) {
            if (name && name != 'divpopbox') {
                var divpopbox_name = name;
            } else {
                var divpopbox_name = 'divpopbox';
            }

            var lucent = UPC_GetElement('lucent');
            var divpopbox = UPC_GetElement(divpopbox_name);
            
            if (divpopbox == null) {
                divpopbox_name = 'divpopbox_' + name;
                var divpopbox = UPC_GetElement(divpopbox_name);
            }
            
            divpopbox.style.display = 'none';
            lucent.style.display = 'none';
            showAds();
            if (reload)
				window.location.reload();
        }
        
        function hideAds() {
            sky = UPC_GetElement('skydiv');
            skyg = UPC_GetElement('skydivg');
            if (sky) {
                sky.style.display = 'none';
                skyg.style.display = 'block';
            }
            
            leader = UPC_GetElement('leaderdiv');
            leaderg = UPC_GetElement('leaderdivg');
            if (leader) {
                leader.style.display = 'none';
                leaderg.style.display = 'block';
            }
            
            hub = UPC_GetElement('hubaddiv');
            hubg = UPC_GetElement('hubaddivg');
            if (hub) {
                hub.style.display = 'none';
                hubg.style.display = 'block';
            }
            
            game = UPC_GetElement('gamediv');
            gameg = UPC_GetElement('gamedivg');
            if (game) {
                game.style.position = 'absolute';
                game.style.top = '-800';
                gameg.style.display = 'block';
            }
            
            chat = UPC_GetElement('chatcontainer');
            chatg = UPC_GetElement('chatcontainerg');
            if (chat) {
                chat.style.position = 'absolute';
                chat.style.top = '-800';
                chatg.style.display = 'block';
            }
            
            if (document.all) extra = document.all["extrablock"];
            else extra = UPC_GetElement('extrablock');
            if (extra && extra[0]) {
                for (x=0; x<extra.length; x++) {
                    extra[x].style.display = 'none';
                }
            } else if (extra) {
                    extra.style.display = 'none';
            }
        }
        
        function showAds() {
            sky = UPC_GetElement('skydiv');
            skyg = UPC_GetElement('skydivg');
            if (sky) {
                skyg.style.display = 'none';
                sky.style.display = 'block';
            }
            
            leader = UPC_GetElement('leaderdiv');
            leaderg = UPC_GetElement('leaderdivg');
            if (leader) {
                leaderg.style.display = 'none';
                leader.style.display = 'block';
            }
            
            hub = UPC_GetElement('hubaddiv');
            hubg = UPC_GetElement('hubaddivg');
            if (hub) {
                hubg.style.display = 'none';
                hub.style.display = 'block';
            }
            
            game = UPC_GetElement('gamediv');
            gameg = UPC_GetElement('gamedivg');
            if (game) {
                gameg.style.display = 'none';
                game.style.position = '';
            }
            
            chat = UPC_GetElement('chatcontainer');
            chatg = UPC_GetElement('chatcontainerg');
            if (chat) {
                chatg.style.display = 'none';
                chat.style.position = '';
            }
            
            if (document.all) extra = document.all["extrablock"];
            else extra = UPC_GetElement('extrablock');
            if (extra && extra[0]) {
                for (x=0; x<extra.length; x++) {
                    extra[x].style.display = 'block';
                }
            } else if (extra) {
                    extra.style.display = 'block';
            }
        }
        
        -->