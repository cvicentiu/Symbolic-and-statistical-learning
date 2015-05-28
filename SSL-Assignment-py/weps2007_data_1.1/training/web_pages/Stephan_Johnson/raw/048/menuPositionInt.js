 /* youngpup.net */
	var menus = [
		new ypSlideOutMenu("menu1", "down", 25, 90, 144, 800), /* id, direction, left, top, width, height */
		new ypSlideOutMenu("menu2", "down", 84, 90, 144, 800),
		new ypSlideOutMenu("menu3", "down", 148, 90, 144, 800),
		new ypSlideOutMenu("menu4", "down", 213, 90, 144, 800),
		new ypSlideOutMenu("menu5", "down", 269, 90, 144, 800),
		new ypSlideOutMenu("menu6", "down", 367, 90, 144, 800),
		new ypSlideOutMenu("menu7", "down", 440, 90, 144, 800),
		new ypSlideOutMenu("menu8", "down", 489, 90, 144, 800)
		
	]

	for (var i = 0; i < menus.length; i++) {
		menus[i].onactivate = new Function("document.getElementById('act" + i + "').className='active';");
		menus[i].ondeactivate = new Function("document.getElementById('act" + i + "').className='';");
	}

  ypSlideOutMenu.writeCSS();