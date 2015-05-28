document.write('<scr' + 'ipt type="text/javascript" src="http://adsys.townnews.com/global/capped.js"></scr' + 'ipt>'); // KEEP THIS LINE AS THE FIRST LINE

function adsys_getAdCount(nAdID)
{
   var sAllCookies = document.cookie;
   var nAdCount = 0;
   var sIndexString = "tnadsys_adcount_" + nAdID + "=";

   var nPos = sAllCookies.indexOf(sIndexString);

   if (nPos != -1)
   {
      var nStart = nPos + sIndexString.length;
      var nEnd = sAllCookies.indexOf(";", nStart);

      if (nEnd == -1)
      {
         nEnd = sAllCookies.length;
      }

      var sDataString = sAllCookies.substring(nStart, nEnd);

      var aAdData = sDataString.split("&");

      nAdCount = parseInt(aAdData[0], 10);
      if (isNaN(nAdCount))
      {
         nAdCount = 0;
      }
   }

   return nAdCount;
}

function adsys_hasReachedFreqCap(nAdID, nLimit)
{
   var nAdCount = adsys_getAdCount(nAdID);

   if (nAdCount >= nLimit)
   {
      return true;
   }

   return false;
}

function adsys_incrementAdView(nAdID, nMinutes)
{
   var sAllCookies = document.cookie;
   var sIndexString = "tnadsys_adcount_" + nAdID + "=";
   var nPos = sAllCookies.indexOf(sIndexString);

   if (nPos == -1)
   {
      var expdate = new Date((new Date()).getTime() + nMinutes * 60000);
      document.cookie = sIndexString + "1&" + escape(expdate.toGMTString()) + "; expires=" + expdate.toGMTString();
   }
   else
   {
      var sCookieData = sAllCookies.substring(nPos + sIndexString.length);
      var aCookieData = sCookieData.split(";");

      var sDataString = aCookieData[0];

      var aData = sDataString.split("&");

      nAdCount = parseInt(aData[0], 10) + 1;
      document.cookie = sIndexString + nAdCount + "&" + aData[1] + "; expires=" + unescape(aData[1]);
   }
}


/**
 * Display ads from Adsys
 *
 * @param string sAdsURL The base URL from Adsys to pull ad data from
 * @param string sDomain The domain name for the given suite of ads
 * @param array aAdSet The ads to be displayed
 *
 * @access public
 */
function adsys_displayAd(sAdsURL, sDomain, aAdSet, aCampaigns)
{
   var adNumber = null;
   var adLink = "";
   var aAds = new Array();
   var sAdUniqueURL = sSubURL = sAdsURL;
   var sAdsBaseURL = ""
   var sFlashVars = ""
   var nTotalWeight = 0;
   var aCampaignTotals = new Array();
   var nHighestCampaign = 0;
   var nCampaignID = 0;

   // Create the "superglobal" adsys array

   if (!document.adsys)
   {
      document.adsys = new Array();
   }

   // Remove "duplicate" or "capped" ads

   for (var i = 0; i < aAdSet.length; i++)
   {
      if (!document.adsys[aAdSet[i][1]])
      {
         aAds[aAds.length] = aAdSet[i];
      }
   }

   // Randomly find an ad

   if (aAds.length == 0)
   {
      return;
   }
   else if (aAds.length == 1)
   {
      adNumber = 0;
   }
   else
   {
      // Loop through the campaigns and get the total weights of each,
      // multiplying each by 100. Determine the appropriate adjusted
      // weight for each campaign to even them out. Then multiply the
      // adjusted weights by the percentage of each campaign.

      aCampaignTotals[0] = 0;

      for (var i = 0; i < aAds.length; i++)
      {
         nCampaignID = aAds[i][9];

         if (!aCampaignTotals[nCampaignID])
         {
            aCampaignTotals[nCampaignID] = 0;
         }

         aAds[i][7] = aAds[i][7] * 100;

         aCampaignTotals[nCampaignID] = aCampaignTotals[nCampaignID] + aAds[i][7];

         if (aCampaignTotals[nCampaignID] >= aCampaignTotals[nHighestCampaign])
         {
            nHighestCampaign = nCampaignID;
         }
      }

      for (var i = 0; i < aAds.length; i++)
      {
         nCampaignID = aAds[i][9];
         nMultiplier = aCampaignTotals[nHighestCampaign] / aCampaignTotals[nCampaignID];
         nPercentage = aCampaigns[nCampaignID] / 100;
         aAds[i][7] = Math.ceil(aAds[i][7] * nMultiplier * nPercentage);

         aAds[i][8] = nTotalWeight; // the lowest weight number for this ad
         nTotalWeight += aAds[i][7];
      }

      randomWeight = Math.floor(Math.random() * nTotalWeight);

      for (var i = 0; i < aAds.length; i++)
      {
         if (randomWeight >= aAds[i][8])
         {
            adNumber = i;
         }
         else
         {
            break;
         }
      }
   }

   // Ad the adNumber to the list of ads we've seen

   document.adsys[aAds[adNumber][1]] = 1;

   // If the ad is a frequency-capped ad, increment its count in the
   // viewer's cookie.

   if (aAds[adNumber][11] && (aAds[adNumber][11] > 0))
   {
      adsys_incrementAdView(aAds[adNumber][1], aAds[adNumber][11]);
   }

   // Assign the "base" URI for all operations

   sAdsBaseURL = "/creative/" + sDomain + "/" + aAds[adNumber][0];
   sAdsBaseURL += "/" + aAds[adNumber][1] + "." + aAds[adNumber][2];

   sAdUniqueURL += "/" + Math.floor(Math.random()*100000000) + sAdsBaseURL;
   sAdClickURL = "/c" + Math.floor(Math.random()*100000000);

   // Determine which "type" of ad we are going to render

   switch(aAds[adNumber][2])
   {
       // For Flash files, build the following <object> tags

       case "swf":
          if (aAds[adNumber][5][0] != '')
          {
              // Build the URL for retrieving the ad element

              sSubURL += sAdClickURL;
              sSubURL += "/creative/" + sDomain + "/" + aAds[adNumber][6];
              sSubURL += "/" + aAds[adNumber][1] + "." + aAds[adNumber][2];

              // Add a Flash variable to

              sFlashVars = "clickTAG=" + sSubURL + "%3Fr%3D" + aAds[adNumber][5][0];
              for(var x = 1; x < aAds[adNumber][5].length; x++)
              {
                 sFlashVars += "&clickTAG"+(x+1)+"=" + sSubURL + "%3Fr%3D" + aAds[adNumber][5][x];
              }

              sAdUniqueURL += "?" + sFlashVars;
          }

          adLink = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
          adLink += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" ';
          adLink += 'width="' + aAds[adNumber][3] + '" height="' + aAds[adNumber][4];
          adLink += '" name="' + aAds[adNumber][1] + '" id="' + aAds[adNumber][1] + '">';
          adLink += '<param name="play" value="true">';
          adLink += '<param name="movie" value="' + sAdUniqueURL + '" />';
          adLink += '<param name="quality" value="high" />';
          adLink += '<param name="wmode" value="opaque" />';
          adLink += '<param name="FlashVars" value="' + sFlashVars + '" />';
          adLink += '<embed src="' + sAdUniqueURL + '" quality="high" ';
          adLink += 'FlashVars="' + sFlashVars + '" ';
          adLink += 'wmode="opaque" ';
          adLink += 'width="' + aAds[adNumber][3] + '" height="' + aAds[adNumber][4];
          adLink += '" name="' + aAds[adNumber][1];
          adLink += '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">';
          adLink += '</embed>';
          adLink += '</object>';
          break;

      // Format a javascript file URL for text-based ads

      case "js":
          adLink = '<scr'+'ipt type="text/javascript" src="' + sAdUniqueURL + '">';
          adLink += '</scr'+'ipt>';
          break;

      // The default is to assume image-style servering

      default:
         if (aAds[adNumber][3] != "")
         {
            if (aAds[adNumber][3].substring(0,7) == "mailto:")
            {
               adLink = '<a href="' + aAds[adNumber][3] + '">';
            }
            else
            {
               adLink = '<a href="' + sAdsURL + sAdClickURL + sAdsBaseURL + '?r=' + aAds[adNumber][3] + '"';
               if (aAds[adNumber][4] == "1")
               {
                  adLink += ' target="_blank"';
               }
               adLink += '>';
            }
         }

         adLink += '<img alt="*" border="0" src="' + sAdUniqueURL + '" />';

         if (aAds[adNumber][3] != "")
         {
            adLink += '</a>';
         }
   }

   document.write(adLink);
}