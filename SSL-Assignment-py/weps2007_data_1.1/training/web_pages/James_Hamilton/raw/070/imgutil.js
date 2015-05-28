//-----------------------------------------------------------------------------
// Image utilities.
//-----------------------------------------------------------------------------

function getImageHeight(img) {

  if (is_nav4up)
   {
    return eval(img).height;
   }
  if (is_ie4up)
   {
    return eval(img).height;
   }
  return -1;
}

function getImageWidth(img) {

  if (is_nav4up)
   {
    return eval(img).width;
   }
  if (is_ie4up)
   {
    return eval(img).width;
   }
  return -1;
}

function getImagePageLeft(img) {

  var x, obj;

  if (is_nav4up) {
    if (img.container != null)
      return eval(img).container.pageX + img.x;
    else
      return eval(img).x;
  }
  if (is_ie4up) {
    x = 0;
    obj = eval(img);
    while (obj.offsetParent != null) {
      x += obj.offsetLeft;
      obj = obj.offsetParent;
    }
    x += obj.offsetLeft;
    return x;
  }
  return -1;
}

function getImagePageTop(img) {

  var y, obj;

  if (is_nav4up) {
    if (img.container != null)
      return eval(img).container.pageY + img.y;
    else
      return eval(img).y;
  }
  if (is_ie4up) {
    y = 0;
    obj = eval(img);
    while (obj.offsetParent != null) {
      y += obj.offsetTop;
      obj = obj.offsetParent;
    }
    y += obj.offsetTop;
    return y;
  }
  return -1;
}