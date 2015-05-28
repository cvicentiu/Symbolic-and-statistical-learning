<!--

/*#########################################################################################
  # Author : Khaled Elmougey        Email : khaled@futurecompany.com                      #
  # Website: www.futurecompany.com  Title  : Banner Rotator                               # 
  # Version : 1.0.0   Date : December,25,98                                               #  
  # Version : 1.1.0   Date : Febuaray,17,2000                                             #                                             
  # Bugs   : I did not encounter any.                                                     #
  # compatibility: It has been tested with MSIE 4.0, 5.0 and Netscape 3.0, 4.0, 4.6.      #
  # Copyrights: you can copy and paste it in to your website as along as this copyright   #
  #             is intact, copyrights99,2000 arabflex.com all rights are reserved.        #
  # Comments:                                                                             #
  #    1) do not forget to put the <IMG SRC=""> tags in the body.                         #
  #    2) all images suppose to have the same length and width                            #                                
  #    3)Please do email me for any bugs you encounter.                                   #                                 
  #    4)You can set these variables:                                                     #                                  
  #      a) numberOfBanners: number of banners.                                           #                                  
  #      b) displaytime    : how long the banner will be displayed                        # 
  #      c) getBanner      : name of each banner                                          #
  #      d) getSiteUrl     : The site url, when you click the banner                      #                      
  #      e) imageWidth     : The width of the image                                       #
  #      f) imageHeight    : The height of the image                                      #
  #      g) dir            : the location of the images, if their is no dir leave it as ""#
  #      h) pages          : The pages that a specific banners will be displayed on       #
  #      i) banners0       : The banners that will be displayed on a specific page.       #
  #      j) rotate         : Set it to true to rotate all banners or false to display     #
  #                          a random banner.                                             #
  ##########################################################################################*/

var numberOfBanners = 2;
var pause       = 5000; 
var imageWidth  = 400;
var imageHeight = 50;
var dir         = "";
var rotate      = "true";
//var getBanner  = new Array("/images_nehgs/heritagequest_banner.jpg","/images_nehgs/librarycat_new.jpg","/images_nehgs/ean_banner.jpg","/images_nehgs/nea_banner.jpg");
var getBanner  = new Array("/images_nehgs/beekman_banner.jpg","/images_nehgs/heritagequest_banner.jpg");
var getSiteUrl = new Array(numberOfBanners);  
getSiteUrl[0]  = "http://www.newenglandancestors.org/research/database/beekman/about_emthe_settlers_of_the_beekman_patent_1088_101.asp";
getSiteUrl[1]  = "http://www.newenglandancestors.org/research/Database/premium_databases.asp";
//getSiteUrl[2]  = "http://www.newenglandancestors.org/research/database/premium_databases_ean.asp";
//getSiteUrl[3]  = "http://www.newenglandancestors.org/education/articles/NEA/default.asp";


var pages   = new Array("index.htm","bpage2a.html","bpage3a.html","bpage4a.html","bpage5a.html");

var banners0 = new Array("0","1","2","3"); 
var banners1 = new Array("0"); 
var banners2 = new Array("3","4"); 
var banners3 = new Array("1","2","3");
var banners4 = new Array("0","2","4"); 
////////////////////////Nothing below this line need to be modified/////////////////////////////

var counter  = 0;
var nBanners = numberOfBanners;
var add      = "";
var b = new Banner(); 
b.desireBanners();

function Banner()
  {
  this.banner  = new Array(nBanners);  
  this.Url     = new Array(nBanners);                      
  this.banners = banners;
  this.address = address;
  this.desireBanners = desireBanners;
  this.setBanners = setBanners;
  }

function banners(tempBanner,i)
  {    
  this.banner[i]     = new Image(imageWidth,imageHeight);                 
  this.banner[i].src = dir + tempBanner; 
  }

function address(getUrl,i) 
  {this.Url[i] = getUrl;}

function desireBanners()
  {
  for (var i = 0; i < numberOfBanners; i++)
     {
     var loc    = location.pathname;
     var length = loc.length;
     var start  = loc.lastIndexOf('/') + 1;
     var desirPage = loc.substring(start,length);
     if (desirPage == pages[i])
       { 
       eval("nBanners = banners" + i +".length");
       for (var j = 0; j < nBanners; j++)
          {
          eval("this.banners(getBanner[banners" + i + "[" + j + "]]," + j + ")");
          eval("this.address(getSiteUrl[banners" + i + "[" + j + "]]," + j + ")");
          }
       return;
       }
     }
  for (var j = 0; j < nBanners; j++)
     {
     this.banners(getBanner[j],j);
     this.address(getSiteUrl[j],j);
     }
  }

function setBanners()  
  {
  document.img.src = this.banner[counter].src;   
  add = this.Url[counter];
  }

function displayBanners()
  {
  if (rotate == "false") {counter = Math.round(Math.random() * (nBanners - 1));}
  if (document.img==undefined)
  {	rotate="false";}
	else
	{ b.setBanners();}

  if (rotate == "true")
    {
    counter++;                                 
    if (counter > (nBanners - 1)) {counter = 0;}
    setTimeout("displayBanners()",pause);
    }  
  }

function goTo() {document.location.href = add;}

function showBanner() {window.status = add;}
// End -->