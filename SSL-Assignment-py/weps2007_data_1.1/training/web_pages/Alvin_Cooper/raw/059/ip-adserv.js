//****************************************************************************************************************************
//* iProduction AdServer                                                                                                     *
//* Version 1.0                                                                                                              *
//* Created By: Chris Greuling                                                                                               *
//* Created: September 2002                                                                                                  *
//****************************************************************************************************************************

// initialize global variables
var debug = 0;
var test = 0;
var requested_adCode = '';

// This variable will let the adserver either
// 1 (on) - collapse the ad space when no ad is found to display
// 0 (off) - fill the ad space with a blank image
var allow_collapse = 1;

// This function setups the ad pool for the page
// making the request
function setupAdCode(SiteName, PoolName){
    // set debuging and test options
    if(window.location.search.indexOf("debugadcode") > -1) debug = 1;
    if(window.location.search.indexOf("testadcode") > -1) test = 1;

    // Create a new array to hold the ads for this page
    loaded_Ads = new Array();

    // Set the variables well need to get the ads for this page
    // from the runfile array
    var arg_PoolName = PoolName.split("=");
    var requested_PoolName = arg_PoolName[1];
    var adCounter = 0;

    // Build the page pool for the delivery function to read
    for (var this_Ad=0; this_Ad < defaultAds.length; this_Ad++) {
        var multi_Ad = defaultAds[this_Ad].split("^");
        if(multi_Ad.length > 1) {
           var current_Ad_M = defaultAds[this_Ad].split("|");
           var current_Ad_pool = current_Ad_M[0];
           var current_Ad_spot = current_Ad_M[1];
           var findAd = ((current_Ad_M.length - 2) / 2);
           var randomNumber = rand(findAd);
           var id_pos = randomNumber*2;
           var current_Ad_id = current_Ad_M[id_pos];
           var code_pos = (randomNumber*2)+1;
           var current_Ad_code = current_Ad_M[code_pos];
           var temp_current_Ad = current_Ad_pool+"|"+current_Ad_spot+"|"+current_Ad_id+"|"+current_Ad_code;
           temp_current_Ad = replace(temp_current_Ad,"^","");
           var current_Ad = temp_current_Ad.split("|");
        } else {
          var current_Ad = defaultAds[this_Ad].split("|");
        }
        var current_Pool = current_Ad[0];
        if(current_Pool == requested_PoolName) {
          loaded_Ads[adCounter] = current_Ad;
          adCounter++;
         }
    }

    // set random number here so that it is consistent throughout all the ad code snippets on the page.
    // var randomNumber = Math.random() + "";
    // defaultAdCode = replaceStr(defaultAdCode, "randomnumber", randomNumber);
    // defaultAdCodeLayers = replaceStr(defaultAdCodeLayers, "randomnumber", randomNumber);

}

// This function delivers the ad code to the
// requested ad spot
function getAdCode(SpotName,AdWidth,AdHeight){
  // getAdCode(["name=value"][,"name2=value2"]...)
  var requested_adCode = '';
  var args = getAdCode.arguments;
  if(args.toString().indexOf('<!--') != -1) return "Error In Ad Code Arguments: Found Comment Tags. Illegal Format.";

  var arg_Width = AdWidth.split("=");
  var arg_height = AdHeight.split("=");
  var Width = arg_Width[1];
  var Hgt = arg_height[1];

  // get the the ad for the requested spot
  var arg_SpotName = SpotName.split("=");
  var requested_SpotName = arg_SpotName[1];
  for (var this_Ad=0; this_Ad < loaded_Ads.length; this_Ad++)   {
      var current_Ad = loaded_Ads[this_Ad];
      var current_Spot = current_Ad[1];
      if(current_Spot == requested_SpotName) {
         requested_adCode = current_Ad[3];
       }
   }

  if ((requested_adCode == '') && (allow_collapse == 0)) {
     requested_adCode = '<IMG SRC=\"/images/clearpixel.gif\" WIDTH=\"'+Width+'\" HEIGHT=\"'+Hgt+'\" BORDER=\"0\">';
  }

  // return with the requested ad code
  if(debug) { return "<FORM><TEXTAREA COLS=40 ROWS=7 WRAP=OFF>" + requested_adCode + "</TEXTAREA></FORM>"; }
  else { return requested_adCode; }
}

function getAdCodeLayers() {
// this is just an empty function that was no longer needed
 return '';
}

function replace(string,text,by) {
// Replaces text with by in string
    var strLength = string.length, txtLength = text.length;
    if ((strLength == 0) || (txtLength == 0)) return string;
    var i = string.indexOf(text);
    if ((!i) && (text != string.substring(0,txtLength))) return string;
    if (i == -1) return string;
    var newstr = string.substring(0,i) + by;
    if (i+txtLength < strLength)
        newstr += replace(string.substring(i+txtLength,strLength),text,by);
    return newstr;
}


function rnd() {
       rnd.today=new Date();
       rnd.seed=rnd.today.getTime();
       rnd.seed = (rnd.seed*9301+49297) % 233280;
       return rnd.seed/(233280.0);
};

function rand(number) {
        return Math.ceil(rnd()*number);
};
