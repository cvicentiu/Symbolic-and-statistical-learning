function RegionalsText(region)
{
   if (region == null || region == undefined || region == 'undefined') {
      this.region = 'wcw';
   } else {
     this.region = region;
   }
   this.setRegionalText(this.region);
}

RegionalsText.prototype.setRegionalText = setRegionalText;
RegionalsText.prototype.setWorldWide    = setWorldWide;
RegionalsText.prototype.setAustrian     = setAustrian;
RegionalsText.prototype.setEMEA         = setEMEA;
RegionalsText.prototype.setGerman       = setGerman;
RegionalsText.prototype.setItalian      = setItalian;
RegionalsText.prototype.getRegion       = getRegion;

RegionalsText.prototype.getAboutGartnerText  = getAboutGartnerText;
RegionalsText.prototype.getEventsText  = getEventsText;
RegionalsText.prototype.getAdvancedSearchText = getAdvancedSearchText;
RegionalsText.prototype.getPreferencesText = getPreferencesText;
RegionalsText.prototype.getTryBetaSearchText = getTryBetaSearchText;
RegionalsText.prototype.getAnalystsAndConsultantsText = getAnalystsAndConsultantsText;
RegionalsText.prototype.getBrowseText = getBrowseText;
RegionalsText.prototype.getClientServicesText = getClientServicesText;
RegionalsText.prototype.getCurrentUsersText = getCurrentUsersText;
RegionalsText.prototype.getGartnerLogo = getGartnerLogo;
RegionalsText.prototype.getNewUsersText = getNewUsersText;
RegionalsText.prototype.getProductsAndServicesText = getProductsAndServicesText;
RegionalsText.prototype.getRegisterText = getRegisterText;
RegionalsText.prototype.getSearchHelpText = getSearchHelpText;
RegionalsText.prototype.getSearchTextBox = getSearchTextBox;
RegionalsText.prototype.getSearchResearchText = getSearchResearchText;
RegionalsText.prototype.getSignInText = getSignInText;
RegionalsText.prototype.getSignOffText = getSignOffText;
RegionalsText.prototype.getWhyUseGartnerText = getWhyUseGartnerText;
RegionalsText.prototype.getYourProfileText = getYourProfileText;
RegionalsText.prototype.getAskAnAnalystText = getAskAnAnalystText;
RegionalsText.prototype.getYourEventsText = getYourEventsText;
RegionalsText.prototype.getAdministrationText = getAdministrationText;
RegionalsText.prototype.getProjectSetupText = getProjectSetupText;
RegionalsText.prototype.getYourAlertsText = getYourAlertsText;
RegionalsText.prototype.getCreateAlertsText = getCreateAlertsText;
RegionalsText.prototype.getManageAlertsText = getManageAlertsText;
RegionalsText.prototype.getProjectSettings = getProjectSettings;



function setRegionalText(region) {
   this.region = region;
   if (region == null || region == 'wcw') {
    this.setWorldWide();
   }
   else if (region == 'emea') {
      this.setEMEA();
   }
   else if (region == 'de') {
      this.setGerman();
   }
   else if (region == 'at') {
      this.setAustrian();
   }
   else if (region == 'it') {
      this.setItalian();
   }
}

function getRegion() { return this.region; }

function setWorldWide() {
   this.AboutGartner       = "About";
   this.Events             = "Events";
   this.Administration     = "Administration";
   this.AdvancedSearch     = "Advanced";
   this.AnalystsAndConsultants = "Analysts &amp; Consultants";
   this.AskAnAnalyst       = "Contact Gartner";
   this.Browse             = "Browse";
   this.ClientServices     = "Client Services";
   this.CreateAlerts       = "Create Alerts";
   this.CurrentUsers       = "Current Users";
   this.GartnerLogo        = "/it/images/homepage/gartner136.gif";
   this.ManageAlerts       = "Manage Alerts";
   this.NewUsers           = "New Users";
   this.ProductsAndServices= "Products &amp; Services";
   this.ProjectSetup       = "Project Setup";
   this.ProjectSettings    = "Project Settings";
   this.Register           = "Register";
   this.SearchResearch     = "SEARCH RESEARCH";
   this.SearchHelp         = "Help";
   this.SearchTextBox      = "value=\"\"";
   this.SignIn             = "Sign In";
   this.SignOff            = "Sign-Off";
   this.WhyUseGartner      = "Why Use Gartner";   
   this.YourAlerts         = "Your Alerts";
   this.YourEvents         = "Your Events";
   this.YourProfile        = "Your Profile";   
   this.Preferences        = "Preferences";
   this.TryBetaSearch      = "Try Search Beta";
}

function setEMEA() {
   this.setWorldWide();
   this.GartnerLogo = "/it/images/homepage/gartner_logo_europe.gif";
}

function setGerman() {
   this.AboutGartner        = "&Uuml;ber";
   this.Events              = "Events";
   this.Administration      = "Administration";
   this.AdvancedSearch      = "Erweiterte Suche";
   this.AnalystsAndConsultants = "Analysten &amp; Consultants";
   this.AskAnAnalyst        = "Fragen Sie einen Analysten";
   this.Browse              = "Browse";
   this.ClientServices      = "Kundenservice";
   this.CreateAlerts        = "Create Alerts";
   this.CurrentUsers        = "Kunden";
   this.GartnerLogo         = "/it/images/homepage/gartner_logo_deutsch.gif";
   this.SearchHelp          = "Hilfe";
   this.ManageAlerts        = "verwalten Alerts";
   this.NewUsers            = "Neu bei Gartner?";
   this.ProductsAndServices = "Produkte &amp; Services";
   this.ProjectSetup        = "Project Setup";
   this.ProjectSettings    = "Project Settings";
   this.Register            = "Registrieren";
   this.SearchResearch      = "RESEARCH DURCHSUCHEN";
   this.SearchTextBox       = "value=\"auf Englisch\" onFocus=document.frmSearch.txtSearch.value=\"\"";
   this.SignIn              = "Anmelden";
   this.SignOff             = "Abmelden";
   this.WhyUseGartner       = "Wieso Gartner?";
   this.YourAlerts          = "Ihre Alerts";
   this.YourEvents          = "Ihre Sitzungen";
   this.YourProfile         = "Ihr Profil";
   this.Preferences        = "Preferences";
   this.TryBetaSearch      = "Try Search Beta";  
}

function setAustrian() {
   this.setGerman();
   this.GartnerLogo         = "/it/images/homepage/gartner_logo_austria.gif";
}

function setItalian() {
   this.AboutGartner        = "Chi siamo";
   this.Events              = "Events";
   this.Administration      = "Administration";
   this.AdvancedSearch      = "Ricerca avanzata";
   this.AnalystsAndConsultants = "Analisti e consulenti";
   this.AskAnAnalyst        = "Consulta un analista";
   this.Browse              = "Sfoglia";
   this.ClientServices      = "Assistenza clienti";
   this.CreateAlerts        = "Create Alerts";
   this.CurrentUsers        = "Utente";
   this.GartnerLogo         = "/it/images/homepage/gartner_logo_italy.gif";
   this.SearchHelp          = "Aiuto";
   this.ManageAlerts        = "Manage Alerts";
   this.NewUsers            = "Nuovo utente";
   this.ProductsAndServices = "Prodotti e servizi";
   this.ProjectSetup        = "Come impostare un progetto";
   this.ProjectSettings    = "Project Settings";
   this.Register            = "Registrati";
   this.SearchResearch      = "CERCA IN RESEARCH";
   this.SearchTextBox       = "value=\"in English\" onFocus=document.frmSearch.txtSearch.value=\"\"";
   this.SignIn              = "Login";
   this.SignOff             = "Esci";
   this.WhyUseGartner       = "Perch&eacute; Gartner";
   this.YourAlerts          = "Your Alerts";
   this.YourEvents          = "I miei eventi";
   this.YourProfile         = "Il mio profilo";
   this.Preferences        = "Preferences";
   this.TryBetaSearch      = "Try Search Beta";
}

function getAboutGartnerText() { return this.AboutGartner; }
function getEventsText() { return this.Events; }
function getAdvancedSearchText() { return this.AdvancedSearch; }
function getPreferencesText() { return this.Preferences; }
function getTryBetaSearchText() { return this.TryBetaSearch; }
function getAnalystsAndConsultantsText() { return this.AnalystsAndConsultants; }
function getBrowseText() { return this.Browse; }
function getClientServicesText() { return this.ClientServices; }
function getCurrentUsersText() { return this.CurrentUsers; }
function getGartnerLogo() { return this.GartnerLogo; }
function getSearchHelpText() { return this.SearchHelp; }
function getSearchTextBox() { return this.SearchTextBox; }
function getNewUsersText() { return this.NewUsers; }
function getProductsAndServicesText() { return this.ProductsAndServices; }
function getRegisterText() { return this.Register; }
function getSearchResearchText() { return this.SearchResearch; }
function getSignInText() { return this.SignIn; }
function getSignOffText() { return this.SignOff; }
function getWhyUseGartnerText() { return this.WhyUseGartner; }
function getYourProfileText() { return this.YourProfile; }
function getAskAnAnalystText() { return this.AskAnAnalyst; }
function getYourEventsText() { return this.YourEvents; }


function getAdministrationText() { return this.Administration; }
function getProjectSetupText() { return this.ProjectSetup; }
function getYourAlertsText() { return this.YourAlerts; }
function getCreateAlertsText() { return this.CreateAlerts; }
function getManageAlertsText() { return this.ManageAlerts; }
function getProjectSettings() { return this.ProjectSettings; }

