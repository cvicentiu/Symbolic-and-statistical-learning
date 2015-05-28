 /* youngpup.net */
	var menus = [
		new ypSlideOutMenu("menu1", "down", 25, 120, 144, 800), /* id, direction, left, top, width, height */
		new ypSlideOutMenu("menu2", "down", 84, 120, 144, 800),
		new ypSlideOutMenu("menu3", "down", 148, 120, 144, 800),
		new ypSlideOutMenu("menu4", "down", 213, 120, 144, 800),
		new ypSlideOutMenu("menu5", "down", 269, 120, 144, 800),
		new ypSlideOutMenu("menu6", "down", 367, 120, 144, 800),
		new ypSlideOutMenu("menu7", "down", 440, 120, 144, 800),
		new ypSlideOutMenu("menu8", "down", 489, 120, 144, 800),
		new ypSlideOutMenu("menu9", "up", 114, 300, 144, 800), /* quicklinks on cover */
		new ypSlideOutMenu("menu10", "up", 114, 372, 144, 800) /* directories on cover */
		
	]

	for (var i = 0; i < menus.length; i++) {
		menus[i].onactivate = new Function("document.getElementById('act" + i + "').className='active';");
		menus[i].ondeactivate = new Function("document.getElementById('act" + i + "').className='';");
	}

  ypSlideOutMenu.writeCSS();