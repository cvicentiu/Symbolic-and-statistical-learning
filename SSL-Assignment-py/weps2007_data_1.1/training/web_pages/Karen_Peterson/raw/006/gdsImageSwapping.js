<!--
//////////////////////////////////////////////////////////////////////////////
//
// JavaScript Image Rollover Script - 
//
// This file provides for multiple image states including image rollover 
// functionality (onMouseover,onMouseout) along with persistent states (onClick). 
// To use, declare each of the images that will have multiple states using the 
// gdsObjImg function. This function takes four parameters: image tag name, url of
// the image's off state, url of the image's over state, and url of the image's
// on state. Insert each of the declared images into the imageArray array. In
// the HTML, make sure to include the 'NAME' attribute for the image tags that
// correspond to the declared images.
//
// Usage:
//  ( in the <HEAD> )
//  <script language="JavaScript" src="imageSwapping.js"></script>
//  <script language="JavaScript">
//  imgOne = new objImg('imageOneName','images/imageoneoff.gif','images/imageoneover.gif','images/imageoneon.gif');
//  imgTwo = new objImg('imageTwoName','images/imagetwooff.gif','images/imagetwoover.gif','images/imagetwoon.gif');
//
//  imageArray = new Array(imgOne,imgTwo);
//  </script>
//
//  ( in the <BODY> )
//  <a href="#" onClick="gdsSwapImg(imgOne,'on');"><img name="imageOneName" src="images/imageoneoff.gif"></a>
//
//////////////////////////////////////////////////////////////////////////////

function gdsLoadImg(URL)
{
  if (document.images) 
  {
    newImg = new Image();
    newImg.src = URL;
    return newImg;
  }
}

function gdsObjImg(imgName,offImgURL,overImgURL,onImgURL)
{
  this.name = imgName
  this.state = "off";
  if (offImgURL) {this.offImg = gdsLoadImg(offImgURL);}
  if (overImgURL) {this.overImg = gdsLoadImg(overImgURL);}
  if (onImgURL) {this.onImg = gdsLoadImg(onImgURL);}
}

function gdsSwapImg(imgArray,imgName,newState)
{
  if (imgArray[imgName])
  {
    var thisState = imgArray[imgName].state;
    if(newState=="over" && thisState != "on" && imgArray[imgName].overImg)
    {
      document.images[imgName].src = imgArray[imgName].overImg.src;
      imgArray[imgName].state = "over";
    }

    if(newState=="off" && thisState != "on" && imgArray[imgName].offImg)
    {
      document.images[imgName].src = imgArray[imgName].offImg.src;
      imgArray[imgName].state = "off";
    }

    if(newState=="on")
    {
      for(i=0;i<imgArray.length;i++)
      {
        thisImage = imgArray[i].name;
        thisState = imgArray[i].state;
        if(thisImage == imgName.name)
        {
          document.images[thisImage].src = imgArray[i].onImg.src;
          imgArray[i].state = "on";
        }
        else
        {
          document.images[thisImage].src = imgArray[i].offImg.src;
          imgArray[i].state = "off";
        }
      }
    }
  }
}

function gdsMakeImgArray(n)
{
	this.length = n;
	for (var i = 1; i <= n; i++)
	{
		this[i] = 0
	}
	return this
}
//-->

