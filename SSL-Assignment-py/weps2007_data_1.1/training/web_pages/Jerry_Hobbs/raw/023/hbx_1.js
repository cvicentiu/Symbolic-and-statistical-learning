function _hbxStrip(a){
	a = a.split("|").join("");
	a = a.split("&").join("");
	a = a.split("'").join("");
	a = a.split("#").join("");
	a = a.split("$").join("");
	a = a.split("%").join("");
	a = a.split("^").join("");
	a = a.split("*").join("");
	a = a.split(":").join("");
	a = a.split("!").join("");
	a = a.split("<").join("");
	a = a.split(">").join("");
	a = a.split("~").join("");
	a = a.split(";").join("");
	a = a.split(" ").join("+");
	return a;
}

var this_segment = "";var date = new Date();
var hours = date.getHours();
if (hours == 5) { this_segment = "1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 6) { this_segment = "-1,2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 7) { this_segment = "-1,-2,3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 8) { this_segment = "-1,-2,-3,4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 9) { this_segment = "-1,-2,-3,-4,5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 10) { this_segment = "-1,-2,-3,-4,-5,6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 11) { this_segment = "-1,-2,-3,-4,-5,-6,7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 12) { this_segment = "-1,-2,-3,-4,-5,-6,-7,8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 13) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 14) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 15) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,11,-12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 16) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,12,-13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 17) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,13,-14,-15,-16,-17,-18,-19,-20"; }
if (hours == 18) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,14,-15,-16,-17,-18,-19,-20"; }
if (hours == 19) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,15,-16,-17,-18,-19,-20"; }
if (hours == 20) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,16,-17,-18,-19,-20"; }
if (hours == 21) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,17,-18,-19,-20"; }
if (hours == 22) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,18,-19,-20"; }
if (hours == 23) { this_segment = "-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,19,-20"; }

var _hbEC=0,_hbE=new Array;function _hbEvent(a,b){b=_hbE[_hbEC++]=new Object();b._N=a;b._C=0;return b;}
var hbx=_hbEvent("pv");hbx.vpc="HBX0100u";hbx.gn="tracking.foxnews.com";
hbx.fv="";hbx.lt="auto";hbx.dlf="n";hbx.dft="n";hbx.elf="n";hbx.seg=this_segment;hbx.acct="DM550608D8WV01EN3";hbx.pndef="title";hbx.ctdef="full";