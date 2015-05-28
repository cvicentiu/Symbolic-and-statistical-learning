
 var NS4 = (document.layers);   
 var IE4 = (document.all);

 //widths
 var main_part = aw*.65;
 var main_w = div(main_part,1);
 var main_w0 = nav_w + 5;

 //height
 var main_h = div(height_part,1);

 //misc
 var theparms = "toolbar=yes,location=yes,menubar=yes,status=yes,scrollbars=yes,resizable=yes,width="+main_w+",height="+main_h+",top=0,left="+main_w0;
 var themainpage = "beinecke." + openwhat + ".con.html";
 var themainname = openwhat + "content";
 //mainitem = window.open(themainpage,"brblfamain",theparms);
 mainitem = window.open(themainpage,themainname,theparms);

 function closemain() {
         mainitem.close();  
  }

