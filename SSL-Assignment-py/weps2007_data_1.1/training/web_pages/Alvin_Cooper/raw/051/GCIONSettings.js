/*
******************************************************************************
     File: GCIONSettings.js
  Version: 1.0.0
Copyright: Copyright (c) 2006, Gannett Inc. All rights reserved.    
******************************************************************************
*/

// required definitions - DO NOT EDIT
var gcion_local_exceptions = new Array();
var gcion_external_exceptions = new Array();
var gcion_supported_browsers = new Array();
var gcion_zago_form_messages = new Array(2);
for (var t = 0; t < gcion_zago_form_messages.length; t++) gcion_zago_form_messages[t] = new Array(11);

/* ==================================================================== */
/* Defines global settings for GCION                                    */
/* ==================================================================== */

var gcion_enable_division     = true;
var gcion_zago_sessions       = 2;
var gcion_zago_page_views     = 3;
var gcion_zago_days           = 30;
var gcion_zago_start_year     = 1901;
var gcion_zago_end_year       = 2000;
var gcion_validate_occupation = false;
var gcion_occupation_required = false;
var gcion_zago_form_timeout   = 10;

/* ==================================================================== */
/* Defines supported Web browsers for ZAG/O                             */
/* ==================================================================== */

gcion_supported_browsers[0] = "Explorer|>=|6.0|Windows";
gcion_supported_browsers[1] = "Firefox|>=|1.0|Windows";
gcion_supported_browsers[2] = "Firefox|>=|1.0|Mac";
	
/* ==================================================================== */
/* Defines ZAGO form messages in multiple languages                     */
/* ==================================================================== */

// english
gcion_zago_form_messages[0][0]  = "The following errors occurred in each required field:";
gcion_zago_form_messages[0][1]  = "You must select your Gender";
gcion_zago_form_messages[0][2]  = "Your Year of Birth is invalid (Ex: 1975)";
gcion_zago_form_messages[0][3]  = "Your Year of Birth must be between " + gcion_zago_start_year + " and " + gcion_zago_end_year;
gcion_zago_form_messages[0][4]  = "You must enter your Year of Birth";
gcion_zago_form_messages[0][5]  = "Your Zip Code is invalid (Ex: 47012)";
gcion_zago_form_messages[0][6]  = "Your Zip Code must be 5 characters or less in length";
gcion_zago_form_messages[0][7]  = "You must enter your Zip Code";
gcion_zago_form_messages[0][8]  = "You must select Job Title";
gcion_zago_form_messages[0][9]  = "You must select Industry";
gcion_zago_form_messages[0][10] = "You must select Company Size";

// spanish
/*gcion_zago_form_messages[1][0]  = "Los errores siguientes ocurrieron en cada campo requerido:";
gcion_zago_form_messages[1][1]  = "Usted debe seleccionar su género";
gcion_zago_form_messages[1][2]  = "Su año del nacimiento es invalid (ex: 1975)";
gcion_zago_form_messages[1][3]  = "Su año del nacimiento debe estar en medio " + gcion_zago_start_year + " y " + gcion_zago_end_year;
gcion_zago_form_messages[1][4]  = "Usted debe incorporar su año del nacimiento";
gcion_zago_form_messages[1][5]  = "Su código postal es invalid (ex: 47012)";
gcion_zago_form_messages[1][6]  = "Su código postal debe estar 5 caracteres o menos en longitud";
gcion_zago_form_messages[1][7]  = "Usted debe introducir su código postal";
gcion_zago_form_messages[1][8]  = "Usted debe seleccionar título del trabajo";
gcion_zago_form_messages[1][9]  = "Usted debe seleccionar industria";
gcion_zago_form_messages[1][10] = "Usted debe seleccionar tamaño de la compañía";*/
