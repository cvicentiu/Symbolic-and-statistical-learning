//Banner Javascript for MWG Pages
//written by Gabriel Caunt for Paul Birkholz
//November 1999
//
//To use this library, include this script file in the <HEAD> section
//of the HTML document, like this:  
//
//<SCRIPT SRC="banner.js" LANGUAGE="Javascript">
//
//Then call the initialization routine from the <BODY> tag, like this:
//
// <BODY onload="window.setTimeout('preload(5,4000)',1000);">
//
// The above line indicates that there are 5 banner images in the same directory as the
// file, and that the pause between images should be 4 seconds.
//
//For the library to work, your web server must be set up to map the .js extension
//to the mime type "application/x-javascript".  Most web servers do this by default


var images;
var pauseBetweenImages = 1000;
var currentImage = 0;


//////////////////
//PRELOAD function
//preloads images while first image is displayed.

function preload(n,pause,pathname)   //pass the number of images from the web page as argument
   {
    //Set the delay between images
    pauseBetweenImages = pause;
    //Remember which image is displayed for next time
    currentImage = 1;

    //create the array of n image elements
    images = new Array();
    images.length = n;

    //initialize the array for as many images as you like.
    //include one of the following lines for each image
    for (var i=1;i<=n;i++)
       {images[i] = new Image(); 
       }

    //and assign the filename for each image here
    //images are names [pathname]1.jpg, [pathname]2.jpg, ...   
    for (var i=1;i<=n;i++)
       { images[i].src = pathname + i + ".jpg";
       }


    // waits a few seconds for above images to load, then show the next image.
    window.setTimeout('nextImage()',pauseBetweenImages);
   }

////////////////////
//NEXTIMAGE function
//shows the next image in the list.

function nextImage()
   {
    //advance our image counter
    currentImage++;

    //and loop back to the start if we're at the end
    if (currentImage >= images.length) {currentImage=1;}

    //change the image
    document ['banner'].src = images[currentImage].src;
    document ['banner2'].src = images[currentImage].src;

    //tell the browser to call this routine again in a few seconds
    window.setTimeout('nextImage()',pauseBetweenImages); 
  }