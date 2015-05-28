  function RandomNumber() 
{
  var today = new Date();
  var num= today.getTime()/1000;
num=num-Math.floor(num);
  return num;
}
function RandomGraphics() 
{
  var x = RandomNumber();
   if (x > .96)   {document.write("<A HREF=http://www.ivu.org/banners/index.html><img src=/banners/advert.gif align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .92)   {document.write("<A HREF=http://www.ristorantiverdi.it/index.php?lingua=2><img src=/banners/ristoverdi.gif align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .88) {document.write("<A HREF=http://www.dhanyaa.com><img src=/banners/dhanyaa.gif align=center  WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .84) {document.write("<A HREF=http://www.foodsforlife.org.uk/nutritionist/><img src=/banners/food-for-life.jpg align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .80) {document.write("<A HREF=http://wwww.vegetarianstore.com><img src=/banners/vegstore.gif align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .75) {document.write("<A HREF=http://www.cloudlands.com.au/><img src=/banners/cloudlands.jpg align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .70) {document.write("<A HREF=http://www.vegitalianstyle.it/><img src=/banners/veg-italian.gif align=center WIDTH=468 HEIGHT=60></a>"); return; }   
   if (x > .65) {document.write("<A HREF=http://www.veganoflight.com/><img src=/banners/veganoflight.gif align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .60) {document.write("<A HREF=http://www.vegdining.com><img src=/banners/veg-dining.gif align=center  WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .55) {document.write("<A HREF=http://www.thelodgegrenada.com><img src=/banners/thelodge.jpg align=center  WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .50) {document.write("<A HREF=http://www.vegetarianvisitor.co.uk><img src=/banners/vegetarian-visitor.gif align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .45) {document.write("<A HREF=/congress/2008/><img src=/congress/2008/banner.jpg align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .40) {document.write("<A HREF=http://www.supernatural.cl><img src=/banners/supernatural.gif align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .35) {document.write("<A HREF=http://www.veggieplaces.co.uk><img src=/banners/veggie-places.jpg align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .30) {document.write("<A HREF=http://www.fastfoodcraze.com/><img src=/banners/fastfoodcraze.gif  align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .25) {document.write("<A HREF=http://www.vegvoyages.com/><img src=/banners/vegvoyages.gif  align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .20) {document.write("<A HREF=http://www.alternativesoles.com/><img src=/banners/alternativesoles.gif  align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .15) {document.write("<A HREF=http://www.veggiedate.com/><img src=/banners/veggiedate.gif align=center  WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .10) {document.write("<A HREF=http://www.vegsource.com><img src=/banners/vegsource.gif align=center  WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > .05) {document.write("<A HREF=http://www.vegtravel.com/><img src=/banners/greenearth.jpg align=center WIDTH=468 HEIGHT=60></a>"); return; }
   if (x > 0) {document.write("<A HREF=http://www.veganline.com><img src=/banners/veganline.gif align=center  WIDTH=468 HEIGHT=60></a>"); return; } 
}
RandomGraphics(); 