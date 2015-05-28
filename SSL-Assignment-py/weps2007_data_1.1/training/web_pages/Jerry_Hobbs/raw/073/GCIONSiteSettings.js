/*
******************************************************************************
     File: GCIONSettings.js
  Version: 1.0.0
Copyright: Copyright (c) 2006, Gannett Inc. All rights reserved.    
******************************************************************************
*/

/* ==================================================================== */
/* Defines site settings for GCION                                      */
/* ==================================================================== */

var gcion_enable_site        = true;
var gcion_site_code          = "gpaper158";
var gcion_url                = "http://azcentra.app.ur.gcion.com/";
var gcion_zago_form_url      = "https://www.azcentral.com/my/zage.php";
var gcion_sign_up_form_url   = "https://www.azcentral.com/my/zage.php";
var gcion_zago_language      = "English";
var gcion_throttle_max_range = 100;
var gcion_throttle_rate      = -1;
var gcion_use_inclusion      = true;

var gcion_zago_sessions = 100;
var gcion_zago_page_views = 100;

/* ==================================================================== */
/* Defines ZAGO exceptions for local site URLs                          */
/* ==================================================================== */

gcion_local_exceptions[0] = "/.*[0-9][0-9][0-9][0-9][^0-9].*.html$";
gcion_local_exceptions[1] = "/spanish/.*articles/.*.html$";

/* ==================================================================== */
/* Defines ZAGO exceptions for external site URLs                       */
/* ==================================================================== */

gcion_external_exceptions[0] = "";
