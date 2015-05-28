/* embedControls.js */
/* This file contains Javascript functions for embedding sound and video files into Web pages */

function embedSound(attachID, domain, soundFolder, soundLoc, autoplay, loop, soundID, soundName, soundExt) {
	document.write('<embed src="/'+domain+soundFolder+'/sounds/'+soundLoc+'" autostart="'+autoplay+'" loop="'+loop+'" height="20" />');
}
