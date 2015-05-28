

        if (document.images) {            // Active Images
            img1on = new Image();      
            img1on.src = "../../images/btn-about-on.gif"; 
            img2on = new Image(); 
            img2on.src = "../../images/btn-academics-on.gif";
            img3on = new Image(); 
            img3on.src = "../../images/btn-studentservices-on.gif";
            img4on = new Image(); 
            img4on.src = "../../images/btn-contactinfo-on.gif";
            img5on = new Image(); 
            img5on.src = "../../images/btn-news-on.gif";
            img6on = new Image(); 
            img6on.src = "../../images/btn-futurestudents-on.gif";
            img7on = new Image(); 
            img7on.src = "../../images/btn-currentstudents-on.gif";
            img8on = new Image(); 
            img8on.src = "../../images/btn-alumni-on.gif";
            img9on = new Image();      
            img9on.src = "../../images/btn-search-on.gif"; 
            img13on = new Image(); 
            img13on.src = "../../images/btn-ce-on.gif";
            img14on = new Image(); 
            img14on.src = "../../images/btn-library-on.gif";
            img15on = new Image(); 
            img15on.src = "../../images/btn-community-on.gif";

            img1off = new Image();      
            img1off.src = "../../images/btn-about.gif"; 
            img2off = new Image(); 
            img2off.src = "../../images/btn-academics.gif";
            img3off = new Image(); 
            img3off.src = "../../images/btn-studentservices.gif";
            img4off = new Image(); 
            img4off.src = "../../images/btn-contactinfo.gif";
            img5off = new Image(); 
            img5off.src = "../../images/btn-news.gif";
            img6off = new Image(); 
            img6off.src = "../../images/btn-futurestudents.gif";
            img7off = new Image(); 
            img7off.src = "../../images/btn-currentstudents.gif";
            img8off = new Image(); 
            img8off.src = "../../images/btn-alumni.gif";                
            img9off = new Image();      
            img9off.src = "../../images/btn-search.gif";
			img13off = new Image(); 
            img13off.src = "../../images/btn-ce.gif";           
            img14off = new Image(); 
            img14off.src = "../../images/btn-library.gif";                       
            img15off = new Image(); 
            img15off.src = "../../images/btn-community.gif";                       
        }

// Function to 'activate' images.
function imgOn(imgName) {
        if (document.images) {
            document[imgName].src = eval(imgName + "on.src");
        }
}

// Function to 'deactivate' images.
function imgOff(imgName) {
        if (document.images) {
            document[imgName].src = eval(imgName + "off.src");
        }
}