

function makeArray(len){
for(var i=0;i<len;i++)this[i]=null;
this.length=len;
}


bigimg= new makeArray(5);

bigimg[0]='<img src="images/main_pic.jpg" width="308" height="251">';
bigimg[1]='<img src="images/main_pic2.jpg" width="308" height="251">';
bigimg[2]='<img src="images/main_pic3.jpg" width="308" height="251">';
bigimg[3]='<img src="images/main_pic4.jpg" width="308" height="251">';
bigimg[4]='<img src="images/main_pic4.jpg" width="308" height="251">';


function rand(n){
seed=(0x015a4e35 * seed)%0x7fffffff;
return(seed>>16)%n;
}

var now = new Date()
var seed = now.getTime()%0xfffffff

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

if (document.images) {
				
//main nav images
		img1on  		= new Image();
		img1on.src  	= "/images/main_nav/about_on.gif";
		img1off 		= new Image();
		img1off.src  	= "/images/main_nav/about_off.gif";	
			
		img2on  		= new Image();
		img2on.src  	= "/images/main_nav/portfolio_on.gif";
		img2off 		= new Image();
		img2off.src  	= "/images/main_nav/portfolio_off.gif";		
		
		img3on  		= new Image();
		img3on.src  	= "./images/main_nav/just_on.gif";
		img3off 		= new Image();
		img3off.src  	= "/images/main_nav/just_off.gif";
		
		img4on  		= new Image();
		img4on.src  	= "/images/main_nav/team_on.gif";
		img4off 		= new Image();
		img4off.src  	= "/images/main_nav/team_off.gif";		
		
		img5on  		= new Image();
		img5on.src  	= "./images/main_nav/news_on.gif";
		img5off 		= new Image();
		img5off.src  	= "/images/main_nav/news_off.gif";
		
		img6on  		= new Image();
		img6on.src  	= "/images/main_nav/recruitment_on.gif";
		img6off 		= new Image();
		img6off.src  	= "/images/main_nav/recruitment_off.gif";		
		
		img7on  		= new Image();
		img7on.src  	= "/images/main_nav/contact_on.gif";
		img7off 		= new Image();
		img7off.src  	= "/images/main_nav/contact_off.gif";	
}

		
// Function to 'activate' images.
function imgOn(imgName) {
        if (document.images) {
            document[imgName].src = eval(imgName + "on.src");
	      //  document["holder"].src = eval(imgName + "ad.src");
			
        }
}

// Function to 'deactivate' images.
function imgOff(imgName) {
        if (document.images) {
            document[imgName].src = eval(imgName + "off.src");
	      //  document["holder"].src = "./home/roll_txt/people_off.jpg";
			 
        }
}
		
function openMap(){
newWindow=window.open('map.htm', 'newWin', 'toolbar=no,width=440,height=410,scrollbars=yes')
}

//Function 'popit' window

	<!--

		function isWin(){
			if (navigator.appVersion.indexOf("Win") != -1)	return true;
			else return false;
		}

		function isIE(){
			if (navigator.appName == "Microsoft Internet Explorer") return true;
			else return false;
		}

		function isIEPC(){
			if (isWin() && isIE()) return true;
			else return false;
		}

		function popit(page,winname,width,height,scrollbars){
    		winname = window.open(page,winname,'width=' + width + ',height=' + height + ',toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=yes');
			if (isIEPC() != 1) {
				winname.focus();
			}
		}

	//-->