	if (document.images) {
		// even number are ON and odd numbers are OFF
		but0		= new Image();
		but0.src	= "images/home/h_pic_0_on.gif";
		but1		= new Image();
		but1.src	= "images/nav_0_off.gif";
		but2		= new Image();
		but2.src	= "images/home/h_pic_1_on.gif";
		but3		= new Image();
		but3.src	= "images/nav_1_off.gif";
		but4		= new Image();
		but4.src	= "images/home/h_pic_2_on.gif";
		but5		= new Image();
		but5.src	= "images/nav_2_off.gif";
		but6		= new Image();
		but6.src	= "images/home/h_pic_3_on.gif";
		but7		= new Image();
		but7.src	= "images/nav_3_off.gif";
		but8		= new Image();
		but8.src	= "images/home/h_pic_4_on.gif";
		but9		= new Image();
		but9.src	= "images/nav_4_off.gif";
		but10		= new Image();
		but10.src	= "images/home/h_pic_5_on.gif";
		but11		= new Image();
		but11.src	= "images/nav_5_off.gif";
	}
	
	function rollover(imgName,imgChange) {
		if (document.images) { document.images[imgName].src = eval(imgChange + ".src"); }
	}
