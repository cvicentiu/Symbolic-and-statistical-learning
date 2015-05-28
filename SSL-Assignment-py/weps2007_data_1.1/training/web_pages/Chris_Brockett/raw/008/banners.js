
<!-- Copyright 2000 - Galichon Enterprises, Inc.  rich@galichon.net  http://www.galichon.net
// Permission granted to SimplytheBest.net to list the script in the DHTML scripts library
// Courtesy of SimplytheBest.net (http://simplythebest.net/info/dhtml_scripts.html)
function banner(img_source,url,alt,chance) {
   this.img_source = img_source;
   this.url = url;
   this.alt = alt;
   this.chance = chance;
}
function display() {
   with (this) document.write("<A HREF=" + url + "><IMG SRC='" + img_source + "' WIDTH=468 HEIGHT=60 BORDER=0 ALT='" + alt + "'></A>");
}
banner.prototype.display = display;
banners = new Array();
banners[0] = new banner("/img/banners/accelrys.gif",
                        "http://www.accelrys.com/ target='_blank'",
                        "Learn more about Accelrys", 
                        10);
banners[1] = new banner("/img/banners/oxford.gif",
                        "http://www.chem.ox.ac.uk/ target='_blank'",
                        "Learn more about Chemistry at University of Oxford",
						10);
banners[2] = new banner("/img/banners/ud_ml.gif",
                        "http://www.ud.com/solutions/ target='_blank'",
                        "Learn more about United Devices", 
						10);
banners[3] = new banner("/img/banners/oxford2.gif",
                        "http://www.chem.ox.ac.uk/ target='_blank'",
                        "Learn more about Chemistry at University of Oxford",
						10); 
banners[4] = new banner("/img/banners/ud_accel.gif",
                        "http://www.ud.com/ target='_blank'",
                        "Learn more about United Devices and Grid computing",
						10); 
banners[5] = new banner("/img/banners/nfcr.gif",
                        "http://www.nfcr.org/ target='_blank'",
                        "Learn more about NFCR",
						10); 
banners[6] = new banner("/img/banners/graham.gif",
                        "http://www2.nfcr.org/site/PageServer?pagename=research_oxford target='_blank'",
                        "Meet Graham Richards",
						10); 
banners[7] = new banner("/img/banners/ud_ls.gif",
                        "http://www.ud.com/industries/lifesciences.htm target='_blank'",
                        "Learn more about United Devices", 
						10); 
						
						
sum_of_all_chances = 0;
for (i = 0; i < banners.length; i++) {
   sum_of_all_chances += banners[i].chance;
}
function display_banner() {
   chance_limit = 0;
   randomly_selected_chance = Math.round((sum_of_all_chances - 1) * Math.random()) + 1;
   for (i = 0; i < banners.length; i++) {
      chance_limit += banners[i].chance;
      if (randomly_selected_chance <= chance_limit) {
         document.write("<A HREF=" + banners[i].url + "><IMG SRC='" + banners[i].img_source + "' WIDTH=120 HEIGHT=60 BORDER=0 ALT='" + banners[i].alt + "'></A>");
         return banners[i];
         break;
      }
   }
}
//-->
