function getDiv(id) {
	if (document.getElementById) {
		return document.getElementById(id);
	}
	
	if (document.all) {
		return document.all[id];
	}
	
	if (document.layers) {
		return document.all[id];
	}
	
	return null;
}

function addEvent(obj, evType, fn, opt_flag) { 
	var flag = false;
	if (opt_flag != null) {
		flag = opt_flag;
	}
		
	if (obj.addEventListener){ 
		obj.addEventListener(evType, fn, flag); 
		return true; 
	} else if (obj.attachEvent){ 
		var r = obj.attachEvent("on"+evType, fn); 
		return r; 
	} else { 
		return false; 
	} 
}

function hilite(element) {
	if (element) {
		if (element.className) {
			// this has been firing more than once in IE on complex
			// elements. 
			// might be faster to use a regex here
			//if (is_ie && element.className.indexOf("on") < 0) {
			if (element.className.indexOf("on") < 0) {
				element.className  = element.className + " on";
			}
		} else {
			element.className  = "on";
		}
	}
}

function lolite(element) {
	if (element && element.className) {
		element.className = element.className.replace(/ on$/, "");
		element.className = element.className.replace(/on$/, "");
	}
}

function hackback(element) {
    element.parentNode.childNodes[0].className = "hack";
}

function dehack(element) {
    element.parentNode.childNodes[0].className = "";
}

function condHilite(element) {
    if (!is_safari) {
        hilite(element);
    }
}

function condLolite(element) {
    if (!is_safari) {
        lolite(element);
    }
}

function findParent(node, name) {
    // the "toUpperCase" should be unnecessary. but just in case ...
    if (node.parentNode == null || node.parentNode.nodeName.toUpperCase() == name) {
        return node.parentNode;
    } else {
        return findParent(node.parentNode, name);
    }
}

function adjustSubMenuWidth(id) {
    var div = getDiv(id);
    if (div) {
        var child = div.getElementsByTagName("UL");
        if (child.length > 0) {
            child[0].style.width = (div.offsetWidth - 1) + "px";
        }
    }
}

function openLink(node) {
    if (node == null) {
        return false;
    }
    var lnk = findParent(node, "LI");
    if (lnk == null || lnk.className.indexOf("open") > -1) {
        return false;
    }
    
    //if (node.timer) {
    //    clearTimeout(node.timer);
    //    node.timer = null;
    //}
    //node.timer = setTimeout(function() {setOpenItem(lnk); node.timer = null;}, 500);
    setOpenItem(lnk);
    
}

function setOpenItem(lnk) {
    var ul = lnk.parentNode;
    // the "toUpperCase" should be unnecessary. but just in case ...
    if (ul != null && ul.nodeName.toUpperCase() == "UL") {
	    for (var i = 0; i < ul.childNodes.length; i++) {
	        var element = ul.childNodes[i];
		    if (element.nodeName.toUpperCase() == "LI") {
		        unsetOpen(element);
		    }
	    }
	}
	setOpen(lnk);
}

function clearOpen(node) {
    if (node.timer) {
        clearTimeout(node.timer);
        node.timer = null;
    }
}

function openDLLink(node) {
    if (node == null) {
        return false;
    }
    var dt = findParent(node, "DT");
    if (dt == null || dt.className.indexOf("open") > -1) {
        return false;
    }
    
    //if (node.timer) {
    //    clearTimeout(node.timer);
      //  node.timer = null;
    //}
    //node.timer = setTimeout(function() {setOpenDLItem(dt); node.timer = null;}, 500);
    setOpenDLItem(dt);
}

function setOpenDLItem(dt) {
    var dl = dt.parentNode;
    // the "toUpperCase" should be unnecessary. but just in case ...
    if (dl != null && dl.nodeName.toUpperCase() == "DL") {
        var flag = false;
	    for (var i = 0; i < dl.childNodes.length; i++) {
	        var element = dl.childNodes[i];
		    if (element.nodeName.toUpperCase() == "DT") {
		        if (element == dt) {
		            setOpen(element);
		            flag = true;
		        } else {
		            unsetOpen(element);
		        }
		    } else if (element.nodeName.toUpperCase() == "DD") {
		        if (flag) {
		            setOpen(element);
		            flag = false;
		        } else {
		            unsetOpen(element);
		        }
		    }
	    }
	}
}

function setOpen(element) {
	if (element.className) {
		element.className  = element.className + " open";
	} else {
		element.className  = "open";
	}
}
function unsetOpen(element) {
    element.className = element.className.replace(/ open$/, "");
    element.className = element.className.replace(/open$/, "");
}

/****************************** theater listings page **********************************/
function showMVInfo2(lnk, movie_id) {
    node = findParent(lnk, "DIV");
    showMVInfo(node, movie_id);
}
function showMVInfo(node, movie_id) {
    if (node.timer) {
        clearTimeout(node.timer);
        node.timer = null;
    }
    node.style.cursor = "wait";
    node.timer = setTimeout(function() {hilitePop(node); node.timer = null;}, POPUP_DELAY);
    if (movie_id) {
        loadPopup(node, movie_id);
    }
}

function hideMVInfo2(lnk) {
    node = findParent(lnk, "DIV");
    if (node == null) { return; }
    hideMVInfo(node);
}
    
function hideMVInfo(node) {
    if (node.timer) {
        clearTimeout(node.timer);
        node.timer = null;
    }
    node.style.cursor = "default";
    // shouldn't have to do this if timer hasn't fired
    // but just to be safe, do it all the time
	node.timer = setTimeout(function() {lolitePop(node); node.timer = null;}, 250);
}

function hideMVInfoNow2(lnk) {
    node = findParent(lnk, "DIV");
    if (node == null) { return; }
    hideMVInfoNow(node);
}

function hideMVInfoNow(node) {
    if (node.timer) {
        clearTimeout(node.timer);
        node.timer = null;
    }
    node.style.cursor = "default";
	lolitePop(node);
}

function hiliteHide(node) {
    var div = getPopup(node);
    setPosition(node, div);
    hilite(node);
    if (div) {
        var menus = document.getElementsByTagName("SELECT");
        for (i = 0; i < menus.length; i++) {
            if (intersects(menus[i], div)) {
               // menus[i].oldVis = menus[i].style.visibility;
                menus[i].style.visibility = "hidden";
            }
        }
        
    }
    
}

function intersects(e1, e2) {
    var pos1 = findPos(e1);
    var pos2 = findPos(e2);
    return xIntersects(pos1[0], e1.offsetWidth, pos2[0], e2.offsetWidth) && yIntersects(pos1[1], e1.offsetHeight, pos2[1], e2.offsetHeight);
}
function xIntersects(x1, w1, x2, w2) {
    return (x2 > x1 && (x2  < (x1 + w1))) || (x1 > x2 && (x1 < (x2 + w2)));
}
function yIntersects(y1, h1, y2, h2) {
    return (y2 > y1 && (y2 < (y1 + h1))) ||  (y1 > y2 && (y1 < (y2 + h2)));
}

function loliteHide(node) {
    var menus = document.getElementsByTagName("SELECT");
    for (i = 0; i < menus.length; i++) {
        //if (menus[i].oldVis) {
        //    menus[i].style.visibility = menus[i].oldVis;
        //}
        menus[i].style.visibility = "visible";
    }
    lolite(node);
}

function hiliteAndPosition(node) {
    //var div = getPopup(node)
    setPosition(node);
    hilite(node);
}

function getPopup(node) {
    var divs = node.getElementsByTagName("DIV");
    for (var i = 0; i < divs.length; i++) {
        //var element = node.childNodes[i];
	    if (divs[i].className == "pop") {
            return divs[i];
	    }
    }
    return null;
}

function setPosition(node) {
    if (node) {
        var divs = node.getElementsByTagName("DIV");
        var h4s = node.getElementsByTagName("H4");
        
        var title = null;
        var pop = null;
        var pntr = null;
        for (var i = 0; i < divs.length; i++) {
            var element = node.childNodes[i];
	        if (divs[i].className == "pop") {
                pop = divs[i];
	        }
	        if (divs[i].className.indexOf("pntr") == 0) {
                pntr = divs[i];
	        }
        }
        if (h4s.length > 0 && (h4s[0].className == "trim" || h4s[0].className == "mark")) {
            var as = node.getElementsByTagName("A");
            if (as.length > 0) {
                title = as[0];
            } else {
                title = h4s[0];
            }
        }
        
        if (pop == null || pntr == null || title == null) {
            return;
        }
        
        
        var scroll = getScrollXY();
        var pos = findPos(node);
        var win = getWindowDims();
        
        var values = getMeasurments(pos, scroll, win, title, pop, pntr);
        
        if (positionRightLeft(values, pop, pntr)) {
            return;
        } else if (positionTopBottom(values, pop, pntr)) {
            return;
        } else {
            positionCenter(values, pop, pntr);
        }

        
    }
}

if (is_ie) {
    lolitePop = loliteHide;
    hilitePop = hiliteHide;
} else {
    lolitePop = lolite;
    hilitePop = hiliteAndPosition;
}

function getMeasurments(pos, scroll, win, title, pop, pntr) {
    
    var values = new Object();
    values.pop_height = 163;
    values.pop_width = 479;
    values.pntr_height = 26;
    values.pntr_width = 30;
    
    values.total_width = values.pop_width + values.pntr_width;
    values.total_height = values.pop_height + values.pntr_height;
    
    values.title_width = title.offsetWidth;
    //values.title_height = title.offsetHeight;
    values.title_height = 20;
    values.title_half_width = Math.floor(values.title_width/2);
    values.title_half_height = Math.floor(values.title_height/2);
    
    values.space_top = pos[1] - scroll[1];
    values.space_bottom = win[1] - (values.space_top + values.title_height);
    values.space_left = pos[0] - scroll[0];
    values.space_right = win[0] - (values.space_left + values.title_width);
    
    var pg_body = getDiv("m_pg_body");
    // try to keep things from going off the right and top of the body region
    // (weird things happen)
    if (pg_body) {
        var pg_body_pos = findPos(pg_body);
        values.space_top = Math.min(values.space_top, pos[1] - pg_body_pos[1] - 10);
        var x_extent = pg_body_pos[0] + pg_body.offsetWidth;
        values.space_right = Math.min(values.space_right, x_extent - pos[0] - values.title_width - 10);
    }
    
    return values;
}
        
function positionRightLeft(v, pop, pntr) {
    var x = v.pop_height - v.space_top - v.title_height;
    if (v.space_top > 110) {
        if (v.space_bottom > 30) {
            pop.style.top = "-110px";
        //} else if (v.space_bottom > 30) {
        //    pop.style.top = -(v.pop_height - (v.title_height + v.space_bottom + 30)) + "px";
        } else {
            return false;
        }
    } else if (v.space_top > 30) {
        pop.style.top = -v.space_top + "px";
    } else {
        return false;
    }
    
    if (v.space_right > v.total_width) {
        // on the right
        pop.style.left = (v.title_width + v.pntr_width) + "px";
        pntr.style.left = (v.title_width + 2) + "px";
        pntr.className = "pntr on_rt";
        return true;
    } else if (v.space_left > v.total_width){
        // on the left;
        pop.style.left = -(v.total_width) + "px";
        pntr.style.left = -(v.pntr_width + 2) + "px";
        pntr.className = "pntr on_lf";
        return true;
    } 
    return false;
}

function positionTopBottom(v, pop, pntr) {
    pntr.style.left = (v.title_half_width - 22) + "px";

    var x = v.title_width + v.space_right;
    var y = v.pop_width - x;
    var z = v.space_left - 10;
    if (v.space_left >= 40) {
        if (y <= 40) {
            pop.style.left = "-40px";
        } else if (v.space_right >= 0 && y <= v.space_left) {
            pop.style.left = -Math.max(y+10, 40) + "px";
        } else {
			pop.style.left = -(v.pop_width - 60) + "px";
			pntr.style.left = "-10px";
        }
    } else if (v.space_left < 40 && z >= 0) {
        pop.style.left = -z + "px";
    } else {
		pop.style.left = "-40px";
		pntr.style.left = "10px";
    }
    
    if (v.space_top > v.total_height) {
        pop.style.top = -v.total_height + "px";
        pntr.style.top = -(v.pntr_height + 2)+ "px";
        pntr.className = "pntr on_tp";
        return true;
    } else if (v.space_bottom > v.total_height) {
        pop.style.top = (v.title_height + v.pntr_height) + "px";
        pntr.style.top = (v.title_height + 2)+ "px";
        pntr.className = "pntr on_bt";
        return true;
    } 
    return false;
}

function positionCenter(values, pop, pntr) {
    pntr.className = "pntr";
}
        
// from http://www.quirksmode.org/js/findpos.html
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return [curleft,curtop];
}

//http://www.quirksmode.org/viewport/compatibility.html
function getScrollXY() {
    var x,y;
    if (self.pageYOffset) // all except Explorer
    {
        x = self.pageXOffset;
        y = self.pageYOffset;
    }
    else if (document.documentElement && document.documentElement.scrollTop)
    // Explorer 6 Strict
    {
        x = document.documentElement.scrollLeft;
        y = document.documentElement.scrollTop;
    }
    else if (document.body) // all other Explorers
    {
        x = document.body.scrollLeft;
        y = document.body.scrollTop;
    }
    return [ x, y ];
}

function getWindowDims() {
    var x,y;
    if (self.innerHeight) // all except Explorer
    {
        x = self.innerWidth;
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    // Explorer 6 Strict Mode
    {
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    }
    else if (document.body) // other Explorers
    {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    return [ x, y ];
}

function loadPopup(node, movie_id) {
    var element = getPopup(node);
    if (element) {
        if (!element.loading) {
            setLoading(element);
            makePopupRequest(movie_id, element);
            element.loading = true;
        } else {
            refreshMyRating(element, movie_id);
        }
    }
}

var storedPopups = {};

function checkIfInHash(hashTableToCheck, key)
{	
	if (hashTableToCheck[key] != null && hashTableToCheck[key].length > 0)
	{
		return true;
	} else {
		return false;
	}	
}

function addToHash(hashTableToAddTo, key, value) {
	if (!checkIfInHash(hashTableToAddTo, key))
	{
		hashTableToAddTo[key] = value;
	}
}


function writePopup(http_request, div, movie_id) {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
			var responseHTML = http_request.responseText;
            div.innerHTML = responseHTML;
            trimPopup(div);
            refreshMyRating(div, movie_id);
            //addToHash(storedPopups, movie_id, responseHTML);
        } else {
            setError(div);
        }
    }
}

function makePopupRequest(movie_id, div) {
    var url =  getBaseURL() + "data/getrollover.aspx?movieid=" + movie_id + "&showposter=true";
    //alert(url);
    // this doesn't seem to be working consitently
    // at least not in ff
    //if (checkIfInHash(storedPopups, movie_id))
    if (false)
    {
		div.innerHTML = storedPopups[movie_id];
		// in theory we should be able to store the processed 
		// html, but that doesn't seem to be working very well in 
		// firefox
        trimPopup(div);
        refreshMyRating(div, movie_id);
    }
    else
    {
        var http_request = false;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (!http_request) {
            setError(div);
            return false;
        }
	    http_request.onreadystatechange = function() {writePopup(http_request, div, movie_id);};
        http_request.open('GET', url, true);
        http_request.send(null);
	}
}

function setError(div) {
    div.innerHTML = "<div class=\"err\">There was an error getting the movie data.</div>";
}
function setLoading(div) {
    div.innerHTML = "<div class=\"img_ld\"><img src=\"" + getBaseURL() + "assets/global/reelzLoading.gif" + "\" /></div>";
    //alert(div.innerHTML);
}

function refreshMyRating(div, movie_id) {
//    var scripts = div.getElementsByTagName("SCRIPT");
//    for (var i = 0; i < scripts.length; i++) {
//        eval(scripts[i].innerHTML);
//    }
//    // not sure if this kick is really necessary
//    if (is_ie) {
//        div.className = div.className + "";
//        var li = div.getElementsByTagName("li");
//        var imgs = li[0].getElementsByTagName("IMG");
//        imgs[0].src = imgs[0].src + "";
//        alert(imgs[0].src);
//    }
	    var rating = getMovieRating(movie_id);
	    //alert(movie_id + ":" + rating);
        if (rating == null || rating < 1 || rating > 10)
        {
            rating = "unset";
        }
        var li = div.getElementsByTagName("LI");
        if (li.length > 0) {
            var imgs = li[0].getElementsByTagName("IMG");
            if (imgs.length > 0) {
                imgs[0].src = getBaseURL() + "assets/global/ratings/" + rating + ".gif";
            }
        }
        //alert(imgs[0].src);
        //div.className = div.className + "";
}


function setTab(node, ul_id, index) {
    var target_ul = getDiv(ul_id);
    var tabs_ul = findParent(node, "UL");
    if (target_ul == null || tabs_ul == null) {
        return;
    }
    // TODO skip loop if already on
    var target = target_ul.childNodes;
    var tabs = tabs_ul.childNodes;
    var max = Math.max(target.length, tabs.length);
    var count = 0;
    for (i = 0; i < max; i++) {
       var element = target[i];
	    if (element.nodeName.toUpperCase() == "LI") {
	        if (count == index) {
	            element.className = "tab_on";
	        } else {
	            element.className = "tab";
	        }
	        count++;
	    }
        var tab = tabs[i];
	    if (tab.nodeName.toUpperCase() == "LI") {
	        if (tab == node) {
	            hilite(tab);
	        } else {
	            lolite(tab);
	        }
	    }
    }
    // hach to get IE to redraw things properly
    var p1 = findParent(target_ul, "DIV");
    if (p1 != null) {
        var p2 = findParent(p1, "DIV");
        if (p2 != null) {
            p2.className = p2.className + "";
        }
    }
}


function trimTitles(id) {
    //alert(">>=> " + id);
    //if (is_ie) {
    //    return;
    //}
    var container = getDiv(id);
    if (container == null) {
        //alert("error in trimTitles(" + id + ")");
        return;
    }
    trimTitlesDiv(container);
}

function trimTitlesDiv(container) {
    var tags = container.getElementsByTagName("H4");
    //alert("=> " + tags.length);
    for (i = 0; i < tags.length; i++) {
        if (tags[i].className == "trim" || tags[i].className == "mark") {
            // hack for the theater listings page in IE
            // it seems to need a "reminder"
            if (is_ie) {
                tags[i].style.position = "relative";
                tags[i].style.top = "0px";
                tags[i].style.visibility = "visible";
            }
            var links = tags[i].getElementsByTagName("A");
            if (links.length > 0) {
                trimTitle(tags[i].offsetWidth, links[0]);
            }
        }
    }
}

function trimTitle(width, tag) {
    var html = tag.innerHTML;
    var n = html.length;
    var new_html = html;
    while(tag.offsetWidth > width) {
        n = n - 1;
        tag.innerHTML = html.substring(0,n) + "...";
    }
}

function trimProvider(span_id) {
    var span = getDiv(span_id);
    if (span) {
        var inner = span.getElementsByTagName("SPAN");
        if (inner.length > 0) {
            trimTitle(span.offsetWidth, inner[0]);
        }
    }
}

function rePosTitles(id) {
    var container = getDiv(id);
    if (container == null) {
        return;
    }
    var tags = container.getElementsByTagName("H4");
    for (i = 0; i < tags.length; i++) {
        if (tags[i].className == "trim" || tags[i].className == "mark") {
            tags[i].style.position = "relative";
            tags[i].style.top = "0px";
        }
    }
}

function hideMe(elt) {
    if (elt != null) {
        elt.style.display = "none";
        elt.style.visibility = "hidden";
    }
}

function showMe(elt) {
    if (elt != null) {
        elt.style.display = "block";
        elt.style.visibility = "visible";
    }
}
function showElement(id) {
    var elt = getDiv(id);
    if (elt != null) {
        elt.style.display = "block";
        elt.style.visibility = "visible";
    }
}

function resizeMask() {
    var holder = getDiv("mask_pos");
    var mask = getDiv("login_mask");
    
    if (holder != null && mask != null) {
        var pos = findPos(holder);
        mask.style.top = pos[1] + "px";
        //mask.style.left = pos[0] + "px";
        
        //mask.style.top = holder.offsetTop + "px";
        if (is_ie) {
            mask.style.left = (holder.offsetLeft + 5) + "px";
        } else {
            mask.style.left = holder.offsetLeft + "px";
        }
        mask.style.width = holder.offsetWidth + "px";
        mask.style.height = holder.offsetHeight + "px";
    }
}

function disableAndAlert(div) {
    return false;
}


function trimPopup(div) {
    var title = div.getElementsByTagName("H3");
    if (title.length > 0) {
        var span = title[0].getElementsByTagName("SPAN");
        if (span.length > 0) {
            trimTitle(title[0].offsetWidth, span[0]);
        }
    }
    
    var tags = div.getElementsByTagName("P");
    for (i = 0; i < tags.length; i++) {
        if (tags[i].className == "ovr") {
            //var h = Math.floor(tags[i].style["line-height"] * 2.5);
            trimHeight(30, tags[i]);
            break;
        }
    }
}


function trimHeight(height, tag) {
    var html = tag.innerHTML;
    while(tag.offsetHeight > height) {
        html = html.substring(0,html.lastIndexOf(" "));
        tag.innerHTML = html + " ...";
    }
}

function clearHide(id) {
    var div = getDiv(id);
    if (div) {
        div.className = "show_inner";
    }
}

// stolen from somewhere online
function pause(numberMillis)
{
var now = new Date();
var exitTime = now.getTime() + numberMillis;
while (true)
{
now = new Date();
if (now.getTime() > exitTime)
return;
}
} 