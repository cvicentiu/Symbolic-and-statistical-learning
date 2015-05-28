function swapover(n) {

	if (document.images) {
		document.images['nav' + n].src = eval("navon" + n + ".src");
		}
	}

function swapout(n) {

	if (document.images) {
		document.images['nav' + n].src = eval("nav" + n + ".src");
		}
	}


if (document.images) {

	nav0 = new Image(60,26);
	nav0.src = "/pics/nav/nav0.jpg";
	navon0 = new Image(60,26);
	navon0.src = "/pics/nav/navon0.jpg";
	
	nav1 = new Image(88,21);
	nav1.src = "/pics/nav/nav1.gif";
	navon1 = new Image(88,21);
	navon1.src = "/pics/nav/navon1.gif";
	
	nav2 = new Image(106,26);
	nav2.src = "/pics/nav/nav2.jpg";
	navon2 = new Image(106,26);
	navon2.src = "/pics/nav/navon2.jpg";
	
	nav3 = new Image(73,26);
	nav3.src = "/pics/nav/nav3.jpg";
	navon3 = new Image(73,26);
	navon3.src = "/pics/nav/navon3.jpg";
	
	nav4 = new Image(115,26);
	nav4.src = "/pics/nav/nav4.jpg";
	navon4 = new Image(115,26);
	navon4.src = "/pics/nav/navon4.jpg";
	
	nav5 = new Image(95,26);
	nav5.src = "/pics/nav/nav5.jpg";
	navon5 = new Image(95,26);
	navon5.src = "/pics/nav/navon5.jpg";
	
	nav6 = new Image(107,26);
	nav6.src = "/pics/nav/nav6.jpg";
	navon6 = new Image(107,26);
	navon6.src = "/pics/nav/navon6.jpg";
	
	nav7 = new Image(86,26);
	nav7.src = "/pics/nav/nav7.jpg";
	navon7 = new Image(86,26);
	navon7.src = "/pics/nav/navon7.jpg";
	
	nav8 = new Image(60,44);
	nav8.src = "/pics/icons/home_search.jpg";
	navon8 = new Image(60,44);
	navon8.src = "/pics/icons/home_searchon.jpg";
	
	nav9 = new Image(60,44);
	nav9.src = "/pics/icons/calculators.jpg";
	navon9 = new Image(60,44);
	navon9.src = "/pics/icons/calculatorson.jpg";
	
	nav10 = new Image(60,44);
	nav10.src = "/pics/icons/buying_tips.jpg";
	navon10 = new Image(60,44);
	navon10.src = "/pics/icons/buying_tipson.jpg";
	
	nav11 = new Image(60,44);
	nav11.src = "/pics/icons/selling_tips.jpg";
	navon11 = new Image(60,44);
	navon11.src = "/pics/icons/selling_tipson.jpg";
	
	nav12 = new Image(60,44);
	nav12.src = "/pics/icons/find_agent.jpg";
	navon12 = new Image(60,44);
	navon12.src = "/pics/icons/find_agenton.jpg";
	
	nav13 = new Image(171,26);
	nav13.src = "/pics/nav/nav8.jpg";
	navon13 = new Image(171,26);
	navon13.src = "/pics/nav/navon8.jpg";
	
	nav14 = new Image(106,26);
	nav14.src = "/pics/nav/nav9.jpg";
	navon14 = new Image(106,26);
	navon14.src = "/pics/nav/navon9.jpg";
	
	nav15 = new Image(132,26);
	nav15.src = "/pics/nav/nav10.jpg";
	navon15 = new Image(132,26);
	navon15.src = "/pics/nav/navon10.jpg";

}

function open_window1(url, width, height) {
	mywin1 = window.open(url,"win1",'alwaysRaised=1,toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=' + width + ',height=' + height);
	mywin1.resizeTo(width, height);
	mywin1.focus();
}

function in_array(needle, haystack) {
	for(var j = 0; j < haystack.length; j++) {
		if(needle == haystack[j]) {
			return true;
		}
	}
	return false;
}

function check_required_new(form, fields) {
	//alert(fields.length);
	
	for(var i = 0; i < form.elements.length; i++) {
		if(in_array(form.elements[i].name, fields)) {
			//alert(form.elements[i].type);
			if(form.elements[i].type == "text" || form.elements[i].type == "password") {
				if(form.elements[i].value == "") {
					alert(form.elements[i].name + " is a required field");
					form.elements[i].focus();
					return false;
				}
			} else if(form.elements[i].type == "select-one") {
				//alert(fields[i].name + " is a pull-down");
				if(form.elements[i].selectedIndex == 0) {
					alert(form.elements[i].name + " is a required field");
					form.elements[i].focus();
					return false;
				}
			} else if(form.elements[i].type == 'radio') {
				var radio = form.elements[i].name;
				//alert(form[radio].length);
				for(var j = 0; j < form[radio].length; j++) {
					if(form[radio][j].checked == true) {
						var checked = true;
					}
				}
				
				if(checked != true) {
					alert(form.elements[i].name + " is a required field");
					form.elements[i].focus();
					return false;
				}
			} else if(form.elements[i].type == 'textarea') {
				if(form.elements[i].value == "") {
					alert(form.elements[i].name + " is a required field");
					form.elements[i].focus();
					return false;
				}
			}
		}
	}
	return true;
}
	

function image_click(img) {
	document.images.mainimage.src = img;
}

function check_prices(theForm) {
	//alert('checking');
	if(theForm.mls_id) {
		if(theForm.mls_id.value != "") {
			return true;
		}
	}
	
	if((theForm.price_min.value == "" || theForm.price_max.value == "") && (theForm.street_number.value == "" && theForm.street_name.value == "") ) {
		alert('A price range is required.');
		return false;
	}
	return true;
}