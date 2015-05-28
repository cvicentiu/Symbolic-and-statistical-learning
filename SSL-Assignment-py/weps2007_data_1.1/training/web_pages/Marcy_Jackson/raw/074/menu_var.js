/***********************************************************************************
*	(c) Ger Versluis 2000 version 5.411 24 December 2001 (updated Jan 31st, 2003 by Dynamic Drive for Opera7)
*	For info write to menus@burmees.nl		          *
*	You may remove all comments for faster loading	          *		
***********************************************************************************/

	var NoOffFirstLineMenus=10;			// Number of first level items
	var LowBgColor='#C7C7C7';			// Background color when mouse is not over
	var LowSubBgColor='#006699';			// Background color when mouse is not over on subs
	var HighBgColor='#006699';			// Background color when mouse is over
	var HighSubBgColor='#C7C7C7';			// Background color when mouse is over on subs
	var FontLowColor='#004664';			// Font color when mouse is not over
	var FontSubLowColor='white';			// Font color subs when mouse is not over
	var FontHighColor='white';			// Font color when mouse is over
	var FontSubHighColor='#004664';			// Font color subs when mouse is over
	var BorderColor='white';			// Border color
	var BorderSubColor='white';			// Border color for subs
	var BorderWidth=1;				// Border width
	var BorderBtwnElmnts=1;			// Border between elements 1 or 0
	var FontFamily="verdana,arial,helvetica"	// Font family menu items
	var FontSize=8;				// Font size menu items
	var FontBold=0;				// Bold menu items 1 or 0
	var FontItalic=0;				// Italic menu items 1 or 0
	var MenuTextCentered='left';			// Item text position 'left', 'center' or 'right'
	var MenuCentered='left';			// Menu horizontal position 'left', 'center' or 'right'
	var MenuVerticalCentered='top';		// Menu vertical position 'top', 'middle','bottom' or static
	var ChildOverlap=0;				// horizontal overlap child/ parent
	var ChildVerticalOverlap=0;			// vertical overlap child/ parent
	var StartTop=80;				// Menu offset x coordinate
	var StartLeft=0;				// Menu offset y coordinate
	var VerCorrect=0;				// Multiple frames y correction
	var HorCorrect=0;				// Multiple frames x correction
	var LeftPaddng=3;				// Left padding
	var TopPaddng=2;				// Top padding
	var FirstLineHorizontal=0;			// SET TO 1 FOR HORIZONTAL MENU, 0 FOR VERTICAL
	var MenuFramesVertical=1;			// Frames in cols or rows 1 or 0
	var DissapearDelay=500;			// delay before menu folds in
	var TakeOverBgColor=1;			// Menu frame takes over background color subitem frame
	var FirstLineFrame='navig';			// Frame where first level appears
	var SecLineFrame='space';			// Frame where sub levels appear
	var DocTargetFrame='space';			// Frame where target documents appear
	var TargetLoc='';				// span id for relative positioning
	var HideTop=0;				// Hide first level when loading new document 1 or 0
	var MenuWrap=1;				// enables/ disables menu wrap 1 or 0
	var RightToLeft=0;				// enables/ disables right to left unfold 1 or 0
	var UnfoldsOnClick=0;			// Level 1 unfolds onclick/ onmouseover
	var WebMasterCheck=0;			// menu tree checking on or off 1 or 0
	var ShowArrow=0;				// Uses arrow gifs when 1
	var KeepHilite=1;				// Keep selected path highligthed
	var Arrws=['/images/tri2.gif',4,7,'/images/tridown.gif',10,5,'/images/trileft.gif',5,10];	// Arrow source, width and height

function BeforeStart(){return}
function AfterBuild(){return}
function BeforeFirstOpen(){return}
function AfterCloseAll(){return}


// Menu tree
//	MenuX=new Array(Text to show, Link, background image (optional), number of sub elements, height, width);
//	For rollover images set "Text to show" to:  "rollover:Image1.jpg:Image2.jpg"

Menu1=new Array("","","http://aspire.dfs.state.fl.us/images/top_cap2.gif",0,18,128);

Menu2=new Array("rollover:/images/menu_about.gif:/images/menu_about_over.gif","/About_Project_Aspire/","",7,18);
	Menu2_1=new Array("Overview","/About_Project_Aspire/Overview/","",0,18,124);	
		//Menu2_1_1=new Array("Benefits","/About_Project_Aspire/Overview/benefits.asp","",0,18,124);
		//Menu2_1_2=new Array("ERP 101 Presentation","/About_Project_Aspire/Overview/ERP_101_presentation.asp","",0,30);
		//Menu2_1_3=new Array("Overview of Project Aspire","/About_Project_Aspire/Overview/docs/Intro_to_Aspire_Overview_Presentation_083005_show.pps","",0,30);
	Menu2_2=new Array("Monthly Status Reports","/About_Project_Aspire/monthly_status_reports.asp","",0,30,124);
	Menu2_3=new Array("Operational Workplans","/About_Project_Aspire/operational_workplans.asp","",0,30);
	Menu2_4=new Array("Go/No Go Decisions","/About_Project_Aspire/go_no_go_decision_points.asp","",0,18);
	Menu2_5=new Array("Procurement","/About_Project_Aspire/Procurement/","",0,18);
	Menu2_6=new Array("Contract Documents","/About_Project_Aspire/final_contract_documents.asp","",0,18);
	Menu2_7=new Array("Governance and External Project Integration","/About_Project_Aspire/integration_procedures.asp","",0,45);
	//Menu2_8=new Array("Project Plan","/About_Project_Aspire/Overview/docs/Aspire_Project_Plan.pdf","",0,18)
	
Menu3=new Array("Agency Implementation Plans","/Agency_Implementation_Plans/","",0,30);

Menu4=new Array("Technical Corner","/Technical_Corner/","",0,18);
	
Menu5=new Array("rollover:/images/menu_meeting.gif:/images/menu_meeting_over.gif","/Meetings_and_Workshops/","",4,30);
	//Menu5_1=new Array("Conference Room Pilots","/Meetings_and_Workshops/conference_room_pilots.asp","",0,30,124);
	Menu5_1=new Array("Executive Committee","/Meetings_and_Workshops/executive_committee.asp","",0,30,124);
	Menu5_2=new Array("Integration Management Council","/Meetings_and_Workshops/integration_management_council.asp","",0,30,124);
	Menu5_3=new Array("Inter-Agency Workgroup","/Meetings_and_Workshops/inter-agency_workgroup.asp","",0,30);
	//Menu5_4=new Array("Other","/Meetings_and_Workshops/other.asp","",0,18);
	Menu5_4=new Array("Remediation Information eXchange","/Meetings_and_Workshops/remediation_information_exchange.asp","",0,42);
	//Menu5_5=new Array("System Acceptance Workgroup","/Meetings_and_Workshops/system_acceptance_workgroup.asp","",0,30);
	//Menu5_6=new Array("Technical Workgroup","/Meetings_and_Workshops/technical_workgroup.asp","",0,18);
	//Menu5_6=new Array("Workshops","/Meetings_and_Workshops/workshops.asp","",0,18);

Menu6=new Array("Draft DFS Enterprise Policies and Procedures","/Draft_DFS_Enterprise_Policies_and_Procedures/","",0,42);
	
//Menu7=new Array("rollover:/images/menu_training.gif:/images/menu_training_over.gif","/Training/","",2,18);
	//Menu7_1=new Array("Training FAQs","/FAQs.asp?section=Training","",0,18,124);
	//Menu7_2=new Array("Training Plan","/Training/training_plan.asp","",0);

//Menu7=new Array("Workforce Transformation","/Workforce_Transformation/","",0,30);

Menu7=new Array("Newsletter","/Newsletter/","",0,18);
	
Menu8=new Array("Resource Documents","/Resource_Documents/","",0,18);	

//Menu8=new Array("rollover:/images/menu_docs.gif:/images/menu_docs_over.gif","/Project_Documentation/","",0,30);
	//Menu8_1=new Array("Accepted Deliverables","/Project_Documentation/Accepted_Deliverables/","",0,30,124);
	//Menu8_2=new Array("Resource Documents","/Project_Documentation/resource_documents.asp","",0,18);
	//Menu8_3=new Array("Strategic Business Issues","/Project_Documentation/strategic_business_issues.asp","",0,30);
	
Menu9=new Array("rollover:/images/menu_contacts.gif:/images/menu_contacts_over.gif","/Contacts/","",2,18);
	Menu9_1=new Array("Agency Leaders","/Contacts/agency_leaders.asp","",0,18,124);
	Menu9_2=new Array("Project Team","/Contacts/Project_Team/","",0);

	
Menu10=new Array("rollover:/images/menu_links.gif:/images/menu_links_over.gif","/links.asp","",3,18);
	Menu10_1=new Array("DFS","http://www.fldfs.com/","",0,18,124);
	Menu10_2=new Array("MyFlorida.com","http://www.myflorida.com/","",0);
	Menu10_3=new Array("Get Acrobat Reader","http://www.adobe.com/products/acrobat/readstep2.html","",0);

//Menu12=new Array("FAQs","/FAQs.asp","",0,18);