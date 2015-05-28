<!--
function randomInt(max) {
  var val = -1;
  if (Math.random)
    val = Math.round(Math.random() * (max - 1));
  else {
    var now = new Date();
    val =  (now.getTime() / 1000) % max;
  }
  return val;
}
function randomPic(imgSrcArray) {
  var val = randomInt(imgSrcArray.length);
  var imgSrc = imgSrcArray[val];
  document.write('<img src="' + imgSrc + '" width="200">');
  return 1;
}
function randomMug(imgSrcArray, hrefArray) {
  var val = randomInt(imgSrcArray.length);
  var imgSrc = imgSrcArray[val];
  var href = hrefArray[val];
  document.write('<center>');
  if (href) document.write('<a href="' + href + '">');
  document.write('<img src="' + imgSrc + '" width="200">');
  if (href) document.write('</a>');
  document.write('<p><b>Exhibit ' + (val + 1) + ':</b>');
  document.write('<br><i>a natural language processor</i></p>');
  document.write('</center>');
  return 1;
}
-->
