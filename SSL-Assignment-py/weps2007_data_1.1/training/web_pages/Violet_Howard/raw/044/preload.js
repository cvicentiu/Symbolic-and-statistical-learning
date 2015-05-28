/*  there are in the popup and it looks stupid 
    if they're not there right away.
	(of course, the preloading doesn't seem to be
	working very well .... )
	background-image: url(../../assets/global/popup_bkg.gif);
	background-image: url(../../assets/global/now_bkg.gif);
	background-image: url(../../assets/global/pointer_1.gif);
	background-image: url(../../assets/global/pointer_2.gif);
	background-image: url(../../assets/global/pointer_3.gif);
	background-image: url(../../assets/global/pointer_4.gif); */

function preloadImages() {
    var img = new Image();
    var base = getBaseURL();
    img.src = base + "assets/global/popup_bkg.gif";
    img.src = base + "assets/global/now_bkg.gif";
    img.src = base + "assets/global/pointer_1.gif";
    img.src = base + "assets/global/pointer_2.gif";
    img.src = base + "assets/global/pointer_3.gif";
    img.src = base + "assets/global/pointer_4.gif";
    
    img.src = base + "assets/global/ratings/unset.gif";
    img.src = base + "assets/global/ratings/1.gif";
    img.src = base + "assets/global/ratings/2.gif";
    img.src = base + "assets/global/ratings/3.gif";
    img.src = base + "assets/global/ratings/4.gif";
    img.src = base + "assets/global/ratings/5.gif";
    img.src = base + "assets/global/ratings/6.gif";
    img.src = base + "assets/global/ratings/7.gif";
    img.src = base + "assets/global/ratings/8.gif";
    img.src = base + "assets/global/ratings/9.gif";
    img.src = base + "assets/global/ratings/10.gif";
    
    img.src = base + "assets/global/drop_bkg.gif";
    
    img.src = base + "assets/global/top_nav_lf.gif";
    img.src = base + "assets/global/top_nav_mid.gif";
    img.src = base + "assets/global/top_nav_rt.gif";
    img.src = base + "assets/global/top_nav_rt_on.gif";
    img.src = base + "assets/global/top_nav_mid_on.gif";
    img.src = base + "assets/global/top_nav_lf_on.gif";
    
    img.src = base + "assets/global/top_nav_div_lf.gif";
    img.src = base + "assets/global/top_nav_div_rt.gif";
    img.src = base + "assets/global/top_nav_div_lf_on.gif";
    img.src = base + "assets/global/top_nav_div_rt_on.gif";
}
