<!--

// Three functions to build side nav, cookie crumbs and
// determine directory depth

// the BuildCookieCrumbs and BuildSideNav function are passed
// arrays from second level pages, those arrays are 
// defined normally in a file called sitedata.html which lives
// in second level sites and in turn is included in all of 
// the pages in the second leve site
// these arrays include the pages titles and page urls for 
// the second level sites
// looks like this
// durls[0] = 'index.html'
// durls[1] = 'arts.html'
// dts[0] = 'Around Austin'
// dts[1] = 'Arts &amp; Entertainment'

// The DirectoryDepth function below determines the number of / characters
// in the passed file names to determine how much up the directory
//  hierarchy to link to with cookie crumbs and side navigation
// this function was needed to support second level side navigation
// that might be one level deeper (i.e. /austin/dining/index.html
// as opposed to /austin/dining.html

function DirectoryDepth(x,ns) {

// x is the name of the file being processed
// for example index.html or dining/index.html
// for each / in the file name an additional ../ gets added to ns variable

// first handle case where file name is absolute (leading /)
if (x.charAt(0) == "/") {
   return ns;
}

// next handle case where the URL is off site on another server
// i.e (contains http:)

if (x.indexOf("http://") != -1) {
   return ns;
}

// If if did not begin with / or if it's not off site
// then we need to determine how far down it is relative to the starting path

for (j=0; j<=x.length; j++) {
    if (x.charAt(j) == "/") {
       ns = ns + "../";
    }
  }
return ns;
}


function BuildCookieCrumbs(fn,titles,path) {

// The home variable is set to include a link back to the home page
// and the words UT Home, this is static

var home = "&nbsp;&nbsp;<a href='http://www.utexas.edu/'>UT Home</a> -&gt;&nbsp;";

// fn is an array of filenames for the site
// titles is an array of titles for the site
// p is the directory path for the site
// all three of these are passed from second level pages
// and the arrays are specified in sitedata.html in the second
// level site


// the pathname of the current page
var CurrentPage = window.location.pathname

// go through all of the elements of the filenames array

// the pathname of the current page
var CurrentPage = window.location.pathname

for (var j=0; j<fn.length; j++) {

// if the path + filename is the same as the currentpage url  or the 
// url ends in / then we know we are looking at the index of the second
// level site and we can write the cookie crumb 

     if (((path + fn[j]) == CurrentPage && j==0) || (j == 0 && CurrentPage.lastIndexOf("/")+1 == CurrentPage.length)) {
          document.write(home + titles[j]);
      }

      // now we need to test to see if the path + filename equals the current
// page url and we know we are no longer at the main page because we are
// beyond the first level of the array j >=1
     
     if ((path + fn[j]) == CurrentPage && j>=1) {
           
// now we need to test to see if the page we are matching
// is one directory deeper, if so we need to make some
// adjustments with the URLs by calling the DirectoryDepth 
// function and adding the appropriate number of .. in the url

       if (CurrentPage.lastIndexOf("/") > path.lastIndexOf("/")) {
             uol = DirectoryDepth(fn[j],"") + fn[0];
             
             // write cookie crumb, uol variable contains
             // proper number of ..
             document.write(home + '<a href="' + uol + '">' + titles[0] + '</a> -&gt;&nbsp;' + titles[j]);
         } else {
             // we are not one directory deeper so we can write
             // cookie crumb normally
             document.write(home + '<a href="' + fn[0] + '">' + titles[0] + '</a> -&gt;&nbsp;' + titles[j]);
         }
      }

  
  }

}

function BuildSideNav(fn,titles,path) {

// this function basically builds the sidenav bar in
// multiple pages within a second level site

// Within the sidenav the current page will be bold, gray and not linked
// All other pages in side nav will be linked

// fn is an array of URLs for the site
// titles is an array of titles for the site
// path is the directory path for the site
// all three of these are passed from second level pages
// and the arrays are specified in sitedata.html in the second
// level site

// need line feed on side nav to create some space
// this should probably be in second level html doc
// rather than in Javascript function

document.write('<br />'); 

var CurrentPage = window.location.pathname;

for (var j=0; j<fn.length; j++) {
   if ((path + fn[j]) == CurrentPage) {
     
      // CurrenPage matches current filename in array 
      // so just write document title with no links
      document.write('<p class="currentmenu">' + titles[j] + '</p>');
        
    } else {
        // the filename does not match the CurrentPage so we 
        // will want to write the filename in the sidenav and make it a link

        if (CurrentPage.lastIndexOf("/")+1 == CurrentPage.length && fn[j] == 'index.html') {
             
          // Match directory index 
       document.write('<p class="currentmenu">' + titles[j] + '</p>');
     } else {
     
      // No match so write document title and link to document
      // But first we have to handle directory depth

       if (CurrentPage.lastIndexOf("/") > path.lastIndexOf("/") ) {
          uol = DirectoryDepth(fn[j],"") + fn[j];
          document.write('<p><a href="' + uol + '">' + titles[j] + '</a></p>');
      } else {
     
        document.write('<p><a href="' + fn[j] + '">' + titles[j] + '</a></p>');

      }
   }
  }
}   // end for loop

   document.write('<img height="10" src="/graphics/transparent.gif" width="1" alt="" />');
   document.write('<img height="1" src="/graphics/small_black_line_horz.gif" width="100" alt="" />');

}  // end BuildSideNav Function

function quicknav (form) {

itemNo = form.navMenu.selectedIndex; // get the index number from the select array
 url = form.navMenu.options[itemNo].value; // the value of the selected element

 if ( url == "invalid") {  // check the value
   return false;  // if its a bad url, cancel form submission
  exit;
 }

 else {
   form.submit();
   return true;
 }

}

// -->
 


