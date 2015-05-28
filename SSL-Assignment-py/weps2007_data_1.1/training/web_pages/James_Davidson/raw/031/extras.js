// 
// Random images for the homepage
// v1.0 B.A. 23.02.06
//
//store the elements in arrays
images = new Array(10);					// Create array of images
pos = new Array(10);					// Create array of positions (crop from top or bottom)
var path = "/resources/homepage/"		// Path to folder of images used
// Images used
images[0] = "01.jpg";
images[1] = "02.jpg";
images[2] = "03.jpg";
images[3] = "04.jpg";
images[4] = "05.jpg";
images[5] = "06.jpg";
images[6] = "07.jpg";
images[7] = "08.jpg";
images[8] = "09.jpg";
images[9] = "10.jpg";
images[10] = "11.jpg";
images[11] = "12.jpg";

// Position - whether the background aligns to the bottom or the top
pos[0] = "top";
pos[1] = "top";
pos[2] = "top";
pos[3] = "top";
pos[4] = "bottom";
pos[5] = "top";
pos[6] = "bottom";
pos[7] = "bottom";
pos[8] = "bottom";
pos[9] = "bottom";
pos[10] = "bottom";
pos[11] = "bottom";

// Randomiser 
index = Math.floor(Math.random() * images.length);
//done
