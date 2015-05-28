<!--MENU SYSTEM-->
NS4 = (document.layers);
IE4 = (document.all);
ver4 = (NS4 || IE4);   
isMac = (navigator.appVersion.indexOf("Mac") != -1);
isMenu = (NS4 || (IE4 && !isMac));
function popUp(){return};
function popDown(){return};
function startIt(){return};
   var platform = navigator.appVersion;
isUNIX = (platform.indexOf("X11") != -1) ||
  (platform.indexOf("Linux") != -1) ||
  (platform.indexOf("SunOS") != -1) ||
  (platform.indexOf("IRIX") != -1) ||
   (platform.indexOf("HP-UX") != -1);

if (!ver4) event = null;

browser = (((navigator.appName == "Netscape") && (parseInt(navigator.appVersion) >= 3 )) || ((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4 )))

// preload universal images
if (browser) {

//FIRM PROFILE
	profile_off = new Image;
	profile_off.src = "/images/nav_profile.gif";
	profile_on = new Image;
	profile_on.src = "/images/nav_profileX.gif";

//ATTORNEYS
	attorneys_off = new Image;
	attorneys_off.src = "/images/nav_attorneys.gif";
	attorneys_on = new Image;
	attorneys_on.src = "/images/nav_attorneysX.gif";

//PRACTICE AREAS
	practice_off = new Image;
	practice_off.src = "/images/nav_practice.gif";
	practice_on = new Image;
	practice_on.src = "/images/nav_practiceX.gif";

//VERDICTS & NEWS
	verdicts_off = new Image;
	verdicts_off.src = "/images/nav_verdicts.gif";
	verdicts_on = new Image;
	verdicts_on.src = "/images/nav_verdictsX.gif";

//ASBESTOS FAQS
	faq_off = new Image;
	faq_off.src = "/images/nav_faq.gif";
	faq_on = new Image;
	faq_on.src = "/images/nav_faqX.gif";
	
//CAREERS
	careers_off = new Image;
	careers_off.src = "/images/nav_careers.gif";
	careers_on = new Image;
	careers_on.src = "/images/nav_careersX.gif";
	
//CONTACT
	contact_off = new Image;
	contact_off.src = "/images/nav_contact.gif";
	contact_on = new Image;
	contact_on.src = "/images/nav_contactX.gif";
	
//HOME
	home_off = new Image;
	home_off.src = "/images/nav_home.gif";
	home_on = new Image;
	home_on.src = "/images/nav_homeX.gif";
}

function putImage(imgDocID,imgObjName) {
if (browser) {
        document.images[imgDocID].src = eval(imgObjName + ".src")
	}
}
<!--END MENU SYSTEM-->
