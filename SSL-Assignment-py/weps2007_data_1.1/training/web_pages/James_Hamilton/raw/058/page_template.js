// Page Template Code
var lang = "en";
var opt = "in";

var local = new Array();
local['back'] = "&#171; BACK";
local['home'] = "&#171; HOMEPAGE";

//Page Header

default_logo_title = "3Com Logo";
default_search_title = "Search";
default_login_title = "Login";
default_download_title = "Downloads";
default_pa_title = "Partner & Reseller Site";

function PageHeader(logo_title, search_title, login_title, download_title, pa_title) 
{ if (!logo_title)    {logo_title=default_logo_title}
  if (!search_title)  {search_title=default_search_title}
  if (!login_title)   {login_title=default_login_title}
  if (!download_title){download_title=default_download_title}
  if (!pa_title)      {pa_title=default_pa_title}

	document.write('<table width="100%" border="0" cellpadding="0" cellspacing="0">');
	document.write('<tr>');
	document.write('<td width="125" height="99" rowspan="3"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="125" height="99"></td>');
	document.write('<td width="141" height="99" rowspan="3" valign="top"><a href="http://www.3com.com/index2.html"><img src="http://www.3com.com/images/common/en_US/3com_logo.jpg" width="141" height="99" alt="' + logo_title + '" title="' + logo_title + '" border="0"></a></td>');
	document.write('<td width="1" bgcolor="#000000" rowspan="2"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="1" height="2"></td>');
	document.write('<td width="535" height="30">');
	document.write('<table border="0" cellpadding="0" cellspacing="0" >');
	document.write('<tr>');
	document.write('<td width="10"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="10" height="1"></td>');
	document.write('<td>');
	document.write('<form name="frmSearch" accept-charset="iso-8859-1" action="http://search.3com.com/search/en_US/query.html" method="get">');
	document.write('<input type="hidden" value="all" name="col">');
	document.write('<input maxLength="1991" size="12" name="qt" class="small"></td>');
	document.write('<td>');
/*				   
  	document.writeln('\
  		<table width="100%" border="0" cellpadding="0" cellspacing="0">\
			 <tr>\
			 	<td width="125" height="99" rowspan="3"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="125" height="99"></td>\
				<td width="141" height="99" rowspan="3" valign="top"><a href="http://www.3com.com/index2.html"><img src="http://www.3com.com/images/common/en_US/3com_logo.jpg" width="141" height="99" alt="3Com Logo" title="3Com Logo" border="0"></a></td>\
				<td width="1" bgcolor="#000000" rowspan="2"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="1" height="2"></td>\
				<td width="535" height="30">\
					 <table border="0" cellpadding="0" cellspacing="0" >\
						<tr>\
							<td width="10"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="10" height="1"></td>\
							<td>\
<form name="frmSearch" accept-charset="iso-8859-1" action="http://search.3com.com/search/en_US/query.html" method="get">\
<input type="hidden" value="all" name="col">\
<input maxLength="1991" size="12" name="qt" class="small"></td>\
							<td>\
	');						
*/
	rolloverbtn('http://emea.3com.com/assets/v5_search','javascript:document.frmSearch.submit();',search_title); 

	document.write('</td>');
	document.write('</form>');
	document.write('</tr>');
	document.write('</table>');
	document.write('</td>');
	document.write('</tr>');
	document.write('<tr>');
	document.write('<td width="535" height="18" background="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_rpt_top.gif" valign="middle" NOWRAP>');
	document.write('<a href="http://www.3com.com/corpinfo/en_US/login/index.html"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_login.gif" width="47" height="18" alt="' + login_title + '" title="' + login_title + '" border="0"></a><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_div.gif" width="1" height="18" alt="" border="0"><a href="http://www.3com.com/products/en_US/downloadsindex.jsp" target="us"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_downloads.gif" width="82" height="18" alt="' + download_title + '" title="' + download_title + '" border="0"></a><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_div.gif" width="1" height="18" alt="" border="0"><a href="http://www.3com.com/partners/index.html"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_partner.gif" width="160" height="18" alt="' + pa_title + '" title="' + pa_title + '" border="0"></a></td>');
	document.write('<td width="1000" height="18" background="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_rpt_top.gif">&nbsp;</td>');
	document.write('</tr>');
	document.write('<tr>');
	document.write('<td width="1" bgcolor="FFFFF"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="1" height="0"></td>');
	document.write('<td width="535" height="62"></td>');
	document.write('</tr>');
	document.write('</table>');
/*
	document.writeln('		</td>\
							</form>\
						</tr>\
					</table>\
				</td>\
			</tr>\
			<tr>\
				<td width="535" height="18" background="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_rpt_top.gif" valign="middle" >\
				<a href="http://www.3com.com/corpinfo/en_US/login/index.html"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_login.gif" width="47" height="18" alt="Login" title="Login" border="0"></a><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_div.gif" width="1" height="18" alt="" border="0"><a href="http://www.3com.com/products/en_US/downloadsindex.jsp" target="us"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_downloads.gif" width="82" height="18" alt="Downloads" title="Downloads" border="0"></a><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_div.gif" width="1" height="18" alt="" border="0"><a href="http://www.3com.com/partners/index.html"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_topnav_partner.gif" width="160" height="18" alt="Partner & Reseller Site" title="Partner & Reseller Site" border="0"></a></td>\
				<td width="1000" height="18" background="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_rpt_top.gif">&nbsp;</td>\
			</tr>\
			<tr>\
				<td width="1" bgcolor="FFFFF"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="1" height="0"></td>\
				<td width="535" height="62"></td>\
			</tr>\
		 </table>\
	');
*/
}

function bannerTable( bnr_bg_image, bnr_image, title )
{
	document.write(' <table width="100%" cellpadding="0" cellspacing="0" border="0">');
	document.write('   <tr>');
	document.write('     <td width="103" rowspan="3" align="right" valign="top">');
	document.write('       <img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="103" height="1" border="0"><br>');
	document.write('     </td>');
	document.write('     <td rowspan="3" width="5"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_bnr_left.gif" width="5" height="118" alt="" border="0"></td>');
	document.write('     <td height="1" bgcolor="Black" width="1000"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="1" height="1" alt="" border="0"></td>');
	document.write('  </tr>');
	document.write('   <tr>');
	document.write(' 	  <td width="100%" background="' + bnr_bg_image + '"><IMG src="' + bnr_image + '" title="' + title + '"  alt="' + title + '"  height=116 width=660 border=0 ><td>');
	document.write('   </tr>');
	document.write('   <tr><td height="1" bgcolor="Black" width="1000"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="1" height="1" alt="" border="0"></td></tr>');
	document.write(' </table>');
	
}

function subBannerNavBox()
{
	
	document.write(' 			<table cellSpacing=0 cellPadding=0 width="108" border=0>');
	document.write('			  	  <tr>');
	document.write('				    <td bgColor="#FFFFFF" width="107"><IMG height=24 src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width=107 ></td>');
	document.write('				    <td bgColor="#000000" width="1"><IMG height=24 src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width=1 border=0></td>');
	document.write('				  </tr>');
	document.write('			</table>');
	
	document.write(' 			<table cellSpacing=0 cellPadding=0 width="100%" border=0>');
	document.write('			  	  <tr>');
	document.write('				    <td bgColor="#000000" width="100%">');
	document.write(' 						<table cellSpacing=0 cellPadding=0 width="108" border=0>');
	document.write('			  	 			 <tr>');
	document.write('				  				 <td bgColor="#FFFFFF" width="107"><IMG height=1 src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width=107 ></td>');
	document.write('				   				 <td width="1"><IMG height=1 src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width=1 border=0></td>');
	document.write('				  			</tr>');
	document.write('						</table>');
	document.write('				 	 </td>');
	document.write('				  </tr>');
	document.write('			</table>');
}

function spacerCell() // space between banner and main page content
{
	document.write(' 			<table cellSpacing="0" cellPadding="0" width="100%" border="0">');
	document.write('  			 <tr><td height="25" width="1000"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="1" height="1" alt="" border="0"></td></tr>');
	document.write('			</table>');
	
}

//Page Footer
function PageFooter() {
  document.writeln('<br><br><table width="100%" cellpadding="0" cellspacing="0" border="0">');
  document.writeln('<tr>\
  	<td width="271" height="70" rowspan="2"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_botspace.gif" width="271" height="70"></td>\
	<td width="535" background="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_rpt_bot.gif" height="17" colspan="2"><a href="http://www.3com.com/corpinfo/en_US/pressbox/index.jsp"><img src="http://www.3com.com/images/solutions/en_US/ftr_pressbox.gif" width="74" height="17" alt="Newscenter"  title="Newscenter" border="0"></a><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_botnav_div.gif" width="1" height="17" alt="" border="0"><a href="http://www.3com.com/corpinfo/en_US/sitemap/index.html"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_botnav_sitemap.gif" width="66" height="17" alt="Site Map" title="Site Map" border="0"></a><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_botnav_div.gif" width="1" height="17" alt="" border="0"><a href="http://www.3com.com/corpinfo/en_US/index.html"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_botnav_corp.gif" width="155" height="17" alt="Corporate Information" title="Corporate Information" border="0"></a><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_botnav_div.gif" width="1" height="17" alt="" border="0"><a href="http://www.3com.com/corpinfo/en_US/contactus/index.html"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_botnav_contact_us.gif" width="85" height="17" alt="" border="0"></a></td>\
	<td width="1000" background="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_rpt_bot.gif" height="17"><img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/v5_rpt_bot.gif" width="1" height="17" alt="" border="0"></td>\
					</tr>');
  document.writeln('<tr><td width="535" height="53">');
  document.writeln('<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><form class="small" name="cntry_go"><td height="53" class="small">');
  document.writeln('<nobr>');
  document.writeln('<img src="http://www.3com.com/solutions/en_US/enterprise/emea_docs/spacer.gif" width="3" height="1" border="0">');
  document.writeln('<select class="small" name="URL" size="1" onChange="select_url(form.URL.options[selectedIndex].value)">');
  document.writeln('\
    <option value="http://www.3com.co.uk">Choose a Country</option>\
 <option value="http://ap.3com.com">Asia Pacific(English)</option>\
<option value="http://www.3com.be/">Benelux(Dutch)</option>\
<option value="http://www.3com.lu/">Benelux(French)</option>\
<option value="http://lat.3com.com/br/">Brazil(Portuguese)</option>\
<option value="http://ca.3com.com/">Canada(English)</option>\
<option value="http://ca.3com.com/fr">Canada(French)</option>\
<option value="http://www.3com.de">Central Europe(German)</option>\
<option value="http://www.3com.cz/">Czech Republic</option>\
<option value="http://www.3com.dk/">Denmark</option>\
<option value="http://emea.3com.com/">Europe(English)</option>\
<option value="http://www.3com.fi/">Finland</option>\
<option value="http://www.3com.fr/">France</option>\
<option value="http://www.3com.co.il/">Israel</option>\
<option value="http://www.3com.it/">Italy</option>\
<option value="http://www.3com.co.kr/">Korea</option>\
<option value="http://lat.3com.com/">Latin America (Spanish)</option>\
<option value="http://emea.3com.com/me/ar/">Middle East (Arabic)</option>\
<option value="http://emea.3com.com/me/">Middle East (English)</option>\
<option value="http://emea.3com.com/na/">North Africa</option>\
<option value="http://www.3com.no/">Norway</option>\
<option value="http://www.3com.pl/">Poland</option>\
<option value="http://www.3com.ru/">Russia</option>\
<option value="http://www.3com.es/">Spain&amp;Portugal</option>\
<option value="http://www.3com.se/">Sweden</option>\
<option value="http://www.tw.3com.com/">Taiwan</option>\
<option value="http://www.3com.co.uk/">United Kingdom&amp;Ireland</option>\
<option value="http://www.3com.com/index2.html" selected>United States</option>\
  ');
  document.writeln('</select>');
  document.writeln('</nobr>');
  document.writeln('</td><td width="291" height="53"><img src="http://www.3com.com/solutions/en_US/enterprise/assets/v5_legallinks.gif" width="291" height="53" usemap="#legal" border="0"><map name="legal"><area shape="rect" alt="Copyright © 2006 3Com Corporation. All rights reserved." title="Copyright © 2006 3Com Corporation. All rights reserved." coords="4,23,244,38" href="http://www.3com.com/corpinfo/en_US/legal/index.html" target="us"><area shape="rect" alt="Privacy" title="Privacy" coords="205,8,243,22" href="http://www.3com.com/corpinfo/en_US/legal/privacy.html" target="us"><area shape="rect" alt="Legal" title="Legal" coords="170,8,200,22" href="http://www.3com.com/corpinfo/en_US/legal/index.html" target="us"></map></td>');
  document.writeln('</form></tr></table></td></tr></table>');

// Write Omniture javascript calls within the body of the page - after the banner and navigation script load
   document.write('<script language="JavaScript" type="text/javascript" src="http://www.3com.com/scripts/common/en_US/s_code.js"><\/script>&nbsp;');
   document.write('<script language="JavaScript" type="text/javascript" src="http://www.3com.com/scripts/common/en_US/omni_variables.js"><\/script>');

}