
function loadTheaterList(panel_id, theaters_hldr_id, more_div_hldr_id, zip, theaterId, block_num, specific_day, reload) {
    var panel = getDiv(panel_id);
    var theaters = null;
    var more_div = null;
    theaters_hldr = getDiv(theaters_hldr_id);
    more_div_hldr = getDiv(more_div_hldr_id);
    if (theaters_hldr) {
        var tbls = theaters_hldr.getElementsByTagName("TABLE");
        if (tbls.length > 0) {
            theaters = tbls[0];
        }
    }
    if (more_div_hldr) {
        var divs = more_div_hldr.getElementsByTagName("DIV");
        if (divs.length > 0) {
            more_div = divs[0];
        }
    }
    if (panel) {
        //panel.className="dim";
        makeTheaterRequest(panel, theaters, more_div, zip, theaterId, block_num, specific_day, reload);
    }
}

function makeTheaterRequest(panel, theaters, more_div, zip, theaterId, block_num, specific_day, reload) {
    var startTime = "";
    //alert(date_fld.value);
    if (specific_day != null) {
        startTime = encodeHtml(specific_day);
    }
    if (theaters) {
    theaters.className = "layout thtr_lst dim";
    theaters.style.cursor = "wait";
    }
    panel.style.cursor = "wait";
    
    var url =  "";
    if (reload) {
        url =  getBaseURL() + "listings/jacks/theaterlisting.aspx?startTime=" + startTime + "&zipcode=" + zip + "&block=" + block_num + "&theaterId=" + theaterId;
    } else {
        url =  getBaseURL() + "listings/jacks/theaterlistingBlock.aspx?startTime=" + startTime + "&zipcode=" + zip + "&block=" + block_num + "&theaterId=" + theaterId;
    }
    //alert(url);
    var http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
//            theaters.className="layout thtr_lst dim";
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
        //setCableError(div);
        return false;
    }
	http_request.onreadystatechange = function() {writeTheaterPanel(http_request, panel, theaters, more_div, block_num, reload);};
    http_request.open('GET', url, true);
    http_request.send(null);
	//}
}

function writeTheaterPanel(http_request, panel, theaters, more_div, block_num, reload) {
    if (http_request.readyState == 4) {
        if (theaters) {
        theaters.style.cursor = "default";
        }
        panel.style.cursor = "default";
        //alert(http_request.responseText);
        if (http_request.status == 200) {
        //alert(reload);
            if (reload) {
	            var temp = document.createElement("div");
	            temp.innerHTML = http_request.responseText;
	            var forms = temp.getElementsByTagName("FORM");
	            if (forms.length == 0) { 
        //		        // error 
        //		        alert("error");
	                return;
	            }
                panel.innerHTML = forms[0].innerHTML;
                var scripts = panel.getElementsByTagName("SCRIPT");
                for (var i = 0; i < scripts.length; i++) {
                    if (scripts[i].id != null && (scripts[i].id.indexOf("rtswf_") == 0 || scripts[i].id.indexOf("reelz_") == 0)) {
                        eval(scripts[i].innerHTML);
                    }
                }
                //setTheaterDates(panel);
                if (is_ie) {
                    var x = getDiv("ft_hck");
                    if (x) {
                        x.className = x.className + "";
                    }
                    
                    panel.className = panel.className + "";
                    //rePosTitles("theater_jack");
                }
            } else {
                updateTheaterList(theaters, more_div, block_num);
			    var div = document.createElement("div");
                div.innerHTML = http_request.responseText;
                panel.appendChild(div);
                var scripts = div.getElementsByTagName("SCRIPT");
                for (var i = 0; i < scripts.length; i++) {
                    if (scripts[i].id != null && (scripts[i].id.indexOf("rtswf_") == 0 || scripts[i].id.indexOf("reelz_") == 0)) {
//                    if (scripts[i].id.indexOf("rtswf_") == 0) {
//                        alert(scripts[i].innerHTML);
//                    }
                        eval(scripts[i].innerHTML);
                    }
                }
//                var dls =div.getElementsByTagName("DL");
//                if (dls.length > 0) {
//                    trimTitlesDiv(dls[0]);
//                }
                // hack to get IE to redraw properly
                if (is_ie) {
                    var x = getDiv("ft_hck");
                    if (x) {
                        x.className = x.className + "";
                    }
                    
                    panel.className = panel.className + "";
                    rePosTitles("theater_jack");
                }
            }
        } else {
            //clearTheaterDate();
            //setCableError(panel);
        }
        //panel.className="";
    }
}

function updateTheaterList(tbl, more_div, block_num) {
    if (tbl == null) {
        return;
    }
    var rows = tbl.getElementsByTagName("TR");
    var max = (block_num+1) * 5;
    for (i = 0; i < rows.length; i++) {
        if (i < max && rows[i].className == "hide") {
            rows[i].className = "show";
        }
    }
    tbl.className = "layout thtr_lst";
    if (rows.length <= max && more_div) {
        // hide "more" div
        more_div.className = "thtr_crtl hide";
    } else {
        more_div.className = "thtr_crtl";
    }
}

function loadCablePanel(path, panel_id, genre_menu, sort_by_menu, per_pg_menu, range_to_get, time_change, specific_day) {
//    alert(panel_id + ":" + date_fld_id.replace(/\$/g,"_") + ":" + genre_menu_id + ":" + range_to_get + ":" + time_change + ":" + specific_day);
    var panel = getDiv(panel_id);
    if (panel && genre_menu && per_pg_menu) {
        //if (!panel.loading) {
            //setCableLoading(panel);
            panel.className="dim";
            panel.style.cursor = "wait";
            makeCableRequest(path, panel, genre_menu, sort_by_menu, per_pg_menu, range_to_get, time_change, specific_day);
            //element.loading = true;
        //}
    }
}

function writeCablePanel(http_request, panel, path) {
    if (http_request.readyState == 4) {
        panel.style.cursor = "default";
        if (http_request.status == 200) {
			var responseHTML = http_request.responseText;
			//alert(responseHTML);
            panel.innerHTML = responseHTML;
            //addToHash(storedPopups, movie_id, responseHTML);
            setCableDates(panel, path);
        } else {
            clearCableDates();
            setCableError(panel);
        }
        panel.className="";
    }
}

function makeCableRequest(path, div, genre_menu, sort_by_menu, per_pg_menu, range_to_get, time_change, specific_day) {
    var startTime = "";
    //alert(date_fld.value);
    if (specific_day != null) {
        startTime = encodeHtml(specific_day);
    } else {
        startTime = getCookie("__START_TIME"+path);
        if (startTime == null) { startTime = ""; }
    }
    var sortBy = "";
    if (sort_by_menu != null) {
        sortBy = sort_by_menu.value;
    }
    
    var url =  getBaseURL() + path + "?startTime=" + startTime + "&genre=" + genre_menu.value + "&sortBy=" + sortBy + "&perPage=" + per_pg_menu.value + "&range=" + range_to_get + "&change=" + time_change;
    //alert(url);
    //if (checkIfInHash(storedPopups, movie_id))
    //{
	//	div.innerHTML = storedPopups[movie_id];
    //}
    //else
    //{
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
        setCableError(div);
        return false;
    }
	http_request.onreadystatechange = function() {writeCablePanel(http_request, div, path);};
    http_request.open('GET', url, true);
    http_request.send(null);
	//}
}

function setCableError(div) {
    div.innerHTML = "<div class=\"error\"><p>There was an error getting the data.</p></div>";
}
function setCableLoading(div) {
    div.innerHTML = "<div class=\"load\"><p>Loading ...</p></div>";
}

function encodeHtml(str) {
    var encodedHtml = escape(str);
    encodedHtml = encodedHtml.replace(/\//g,"%2F");
    encodedHtml = encodedHtml.replace(/\?/g,"%3F");
    encodedHtml = encodedHtml.replace(/=/g,"%3D");
    encodedHtml = encodedHtml.replace(/&/g,"%26");
    encodedHtml = encodedHtml.replace(/@/g,"%40");
    return encodedHtml;
} 

function setCableDates(div, path) {    
    // try to update the "myratings" image by calling the inline script
    var scripts = div.getElementsByTagName("SCRIPT");
    for (var i = 0; i < scripts.length; i++) {
        eval(scripts[i].innerHTML);
    }
    
    var currentDate = getDiv("currentDate");
    var currentDateTop = getDiv("currentDateTop");
    var flds = div.getElementsByTagName("INPUT");
    //for (var i = 0; i < flds.length; i++) {
    //    flds[i]
    //}
    // the last two fields
    if (flds.length>2) {
        if (currentDate) {
            var regExp = /<img[^>]+>/i;
            var matches = regExp.exec(currentDate.innerHTML);
            //alert(matches);
            if (matches && matches.length > 0) {
                currentDate.innerHTML = matches[0] + flds[flds.length-2].value;
            }
        }
        if (currentDateTop) {
            var regExp = /<img[^>]+>/i;
            var matches = regExp.exec(currentDateTop.innerHTML);
            //alert(matches);
            if (matches && matches.length > 0) {
                currentDateTop.innerHTML = matches[0] + flds[flds.length-2].value;
            }
        }
    }
    if (flds.length>1) {
        setCookie("__START_TIME"+path, flds[flds.length-1].value);
    }
}

function setTheaterDates(div) {
    var currentDate = getDiv("currentDate");
    var currentDateTop = getDiv("currentDateTop");
    var flds = div.getElementsByTagName("INPUT");
    //for (var i = 0; i < flds.length; i++) {
    //    flds[i]
    //}
    // the last two fields
    if (flds.length>0) {
        if (currentDate != null) {
            var regExp = /<img[^>]+>/i;
            var matches = regExp.exec(currentDate.innerHTML);
            //alert(matches);
            if (matches && matches.length > 0) {
                currentDate.innerHTML = matches[0] + flds[flds.length-1].value;
            }
        }
        if (currentDateTop != null) {
            var regExp = /<img[^>]+>/i;
            var matches = regExp.exec(currentDateTop.innerHTML);
            //alert(matches);
            if (matches && matches.length > 0) {
                currentDateTop.innerHTML = matches[0] + flds[flds.length-1].value;
            }
        }
    }
}

function clearCableDates() {
    var currentDate = getDiv("currentDate");
    var currentDateTop = getDiv("currentDateTop");
    if (currentDate) {
        var regExp = /<img[^>]+>/i;
        var matches = regExp.exec(currentDate.innerHTML);
        //alert(matches);
        if (matches && matches.length > 0) {
            currentDate.innerHTML = matches[0] + "";
        }
    }
    if (currentDateTop) {
        var regExp = /<img[^>]+>/i;
        var matches = regExp.exec(currentDateTop.innerHTML);
        //alert(matches);
        if (matches && matches.length > 0) {
            currentDateTop.innerHTML = matches[0] + "";
        }
    }
}




function loadVODPanel(listing_type, panel_id, station_menu, genre_menu, sort_menu, per_pg_menu, current_pg, page_change, myRatingFromDB) {
    var panel = getDiv(panel_id);
    if (panel && sort_menu) {
        panel.className="dim";
            panel.style.cursor = "wait";
        makeVODRequest(listing_type, panel, station_menu, genre_menu, sort_menu, per_pg_menu, current_pg, page_change, myRatingFromDB);
    }
}

function writeVODPanel(http_request, panel) {
    if (http_request.readyState == 4) {
        panel.style.cursor = "default";
        //alert(http_request.responseText);
        if (http_request.status == 200) {
			var responseHTML = http_request.responseText;
            panel.innerHTML = responseHTML;
            var scripts = panel.getElementsByTagName("SCRIPT");
            for (var i = 0; i < scripts.length; i++) {
                eval(scripts[i].innerHTML);
            }
            // header in the reviews section
	        if (is_ie) {
		        var div = getDiv("hdr_my_rev");
		        if (div) {
			        div.className = div.className + "";
		        }
	        }
        } else {
            setVODError(panel);
        }
        panel.className="";
    }
}

function makeVODRequest(listing_type, div, station_menu, genre_menu, sort_menu, per_pg_menu, current_pg, page_change, myRatingFromDB) {
    var per_pg = 15;
    if (per_pg_menu != null) {
        per_pg = per_pg_menu.value
    }
    var station_id = "";
    if (station_menu != null) {
        station_id = station_menu.value
    }
    var genre = "";
    if (genre_menu != null) {
        genre = genre_menu.value
    }
    var url =  getBaseURL() + 
        "listings/jacks/vodtable.aspx?listingType=" + listing_type + 
        "&stationId=" + station_id + 
        "&genre=" + genre + 
        "&sortBy=" + sort_menu.value + 
        "&perPage=" + per_pg + 
        "&currentPage=" + current_pg + 
        "&pageChange=" + page_change + 
        "&myRatingFromDB=" + myRatingFromDB + 
        "&pepper=" + Math.floor(Math.random()*902349394);
        
    //alert(url);
    //if (checkIfInHash(storedPopups, movie_id))
    //{
	//	div.innerHTML = storedPopups[movie_id];
    //}
    //else
    //{
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
		http_request.onreadystatechange = function() {writeVODPanel(http_request, div);};
    http_request.open('GET', url, true);
    http_request.send(null);
	//}
}

function setVODError(div) {
    div.innerHTML = "<div class=\"bod\"><div class=\"vod_ld\"><div class=\"inner\"><p style=\"color:red\">There was an error getting the data</p></div></div></div>" +
	    "<div class=\"ft\"><div class=\"lf\"><div class=\"rt\"></div></div></div>"
}




function loadReviewsPanel(panel_id, per_pg_menu, current_pg, page_change) {
    var panel = getDiv(panel_id);
    if (panel) {
        panel.className="dim";
        panel.style.cursor = "wait";
        makeReviewsRequest(panel, per_pg_menu, current_pg, page_change);
    }
}

function writeReviewPanel(http_request, panel) {
    if (http_request.readyState == 4) {
        panel.style.cursor = "default";
        if (http_request.status == 200) {
			var responseHTML = http_request.responseText;
            panel.innerHTML = responseHTML;
        } else {
            setVODError(panel);
        }
        panel.className="";
    }
}

function makeReviewsRequest(div, per_pg_menu, current_pg, page_change) {
    var per_pg = 10;
    if (per_pg_menu != null) {
        per_pg = per_pg_menu.value
    }
    var url =  getBaseURL() + 
        "listings/jacks/myreviews.aspx?perPage=" + per_pg + 
        "&currentPage=" + current_pg + 
        "&pageChange=" + page_change + 
        "&pepper=" + Math.floor(Math.random()*902349394);
    //alert(url);
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
		http_request.onreadystatechange = function() {writeVODPanel(http_request, div);};
    http_request.open('GET', url, true);
    http_request.send(null);
	//}
}

function setDateHilite(cell, tbl_1_id, tbl_2_id) {
    var tbl_1_id =getDiv(tbl_1_id);
    var tbl_2_id =getDiv(tbl_2_id);
    realSetDateHilite(cell, tbl_1_id);
    realSetDateHilite(cell, tbl_2_id);
}

function realSetDateHilite(cell, tbl) {
    if (tbl) {
        var cells = tbl.getElementsByTagName("TD");
        for (var i = 0; i < cells.length; i++) {
		    cells[i].className = cells[i].className.replace(/curr/, "lv");
		    
            if (cells[i].className != "tdy" && cells[i].innerHTML == cell.innerHTML) {
		        cells[i].className = cells[i].className.replace(/lv/, "curr");
            }
        }
    }
}
