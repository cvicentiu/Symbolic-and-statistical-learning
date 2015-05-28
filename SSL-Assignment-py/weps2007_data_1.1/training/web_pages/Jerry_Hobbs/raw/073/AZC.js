/*
******************************************************************************
     File: AZC.js                                                                                                                                                                                                             
  Version: 1.0.1
Copyright: Copyright (c) 2006, Gannett Inc. All rights reserved.    
******************************************************************************
*/

/* ==================================================================== */
/* Defines the AZC site object                                          */
/* ==================================================================== */

/// <summary>
/// Provides a class for handling events for AZC. 
/// </summary>
GCION.Sites.AZC =
{
  /// <summary>
  /// Handles the onload event for AZC.
  /// </summary>
  Page_Load : function()
  {
    // handle page throttling
    if (GCION.Sites.Site.ThrottlePage() == 1)
    {
      // convert existing AZC ZAG data to GCION
      GCION.Sites.AZC.ConvertToGCION();
    }
  },

  /// <summary>
  /// Converts a AZC cookie to a GCION cookie.
  /// </summary>
  ConvertToGCION : function()
  {
    if (GCION.Cookies.Cookie.Exists(gcion_local_cookie))
    {
      // get the local cookie
      var localCookie = GCION.Cookies.GCION.GetData(gcion_local_cookie);
      
      if (localCookie.RegistrationStatus == 1)
      {
        // get the AZC cookie
        var cookie = GCION.Sites.AZC.GetZag();
          
        if (!GCION.Utils.Data.IsNullOrEmpty(cookie))
        {
          // set the required query string parameters
          var querystring = "q=2&GCIONID=" + cookie.GcionId +
            "&Zip=" + cookie.ZipCode +
            "&YOB=" + cookie.YearOfBirth +
            "&Gender=" + cookie.Gender +
            "&Country=" + cookie.Country +
            "&OriginatingSite=" + escape(gcion_site_code)
            
          // set optional values
          if (!GCION.Utils.Data.IsNullOrEmpty(cookie.Occupation)) querystring += "&Occupation=" + cookie.Occupation;
          if (!GCION.Utils.Data.IsNullOrEmpty(cookie.Industry)) querystring += "&Industry=" + cookie.Industry;
          if (!GCION.Utils.Data.IsNullOrEmpty(cookie.CompanySize)) querystring += "&CompanySize=" + cookie.CompanySize;

          // ZAG the user   
          GCION.Utils.Include.Once(GCION.Utils.Data.GetGcionUrl(querystring));
        }
      }
    }
  },
  
  /// <summary>
  /// Gets a GCION cookie filled with AZC ZAG data.
  /// </summary>
  GetZag : function()
  {
    if (GCION.Cookies.Cookie.Exists(gcion_rdb_cookie))
    {
      // initialize GCION data object
      var cookie = GCION.Cookies.GCION.GetData(gcion_local_cookie);
      
      // initialize GCION data object
      var rdbCookie = GCION.Cookies.RDB.GetData(gcion_rdb_cookie);
      
      // set properties
      if (rdbCookie.Gender == 1)
        cookie.Gender = 2;
      else if (rdbCookie.Gender == 2)
        cookie.Gender = 1;
      else
        cookie.Gender = 3;
      
      if (!GCION.Utils.Data.IsNullOrEmpty(rdbCookie.Country))
        cookie.Country = rdbCookie.Country.toString().toLowerCase();
      else
        cookie.Country = "us";

      cookie.ZipCode = rdbCookie.ZipCode;
      cookie.YearOfBirth = GCION.Utils.Data.GetYob(rdbCookie.AgeHigh);
      
      return cookie;
    }
    else
      return null;
  }
};

/* ==================================================================== */
/* Add the conversion handler to onload event                           */
/* ==================================================================== */

// execute if enabled by division
if (gcion_enable_division)
{
  // execute if enabled by site and section front and browser is supported
  if (gcion_enable_site && GCION.Utils.SectionFrontSupport.IsSupported() &&
    GCION.Utils.BrowserSupport.IsSupported())
  {
    window.setTimeout("GCION.Sites.AZC.Page_Load()", 500);
  }
}
