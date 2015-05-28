// Javascript specific to the wrapper elements in general

/////////////////////////////////////////////////////////////////////////
// Netscape 4 resize bugfix from Macromedia Dreamweaver
function MM_reloadPage(init) {  //reloads the window if Nav4 resized
   if (init==true) with (navigator) {if 
((appName=="Netscape")&&(parseInt(appVersion)==4)) {
     document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; 
onresize=MM_reloadPage; }}
   else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) 
location.reload();
}
MM_reloadPage(true);
// End resize bugfix
/////////////////////////////////////////////////////////////////////////
function onTrack(track)
{
  imgSrc = '/wrapper/img-header/tn_' + track + '_o.gif';
  imgName = 'headerNav_' + track;
  switchImage(imgSrc, imgName);
}
function offTrack(track)
{
  imgSrc = '/wrapper/img-header/tn_' + track + '.gif';
  imgName = 'headerNav_' + track;
  switchImage(imgSrc, imgName);
}

function onUtility(utility)
{
  imgSrc = '/wrapper/img-header/un_' + utility + '_o.gif';
  imgName = 'headerUtility_' + utility;
  switchImage(imgSrc, imgName);
}
function offUtility(utility)
{
  imgSrc = '/wrapper/img-header/un_' + utility + '.gif';
  imgName = 'headerUtility_' + utility;
  switchImage(imgSrc, imgName);
}


