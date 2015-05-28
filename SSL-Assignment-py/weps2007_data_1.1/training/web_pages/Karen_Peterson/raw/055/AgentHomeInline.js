var Form1= new formDef('Form1',nullFunc,nullFunc);
/* client-side recordset */
var Agents = new Recordset("Agents", "MREM_web", "admin", "", "SELECT * FROM Agents ORDER BY Agents.Name ", "AgentID", true);
/* client-side recordset */
var Offices = new Recordset("Offices", "MREM_web", "admin", "", "SELECT * FROM Offices ORDER BY Offices.OfficeName", "MREMOfficeID", true);
/* client-side recordset */
var Visitors = new Recordset("Visitors", "mrem_web", "admin", "", "SELECT * FROM Visitor_Log ORDER BY Visitor_Log.Date", "VisitorID", true);
/* client-side recordset */
var AgentProps = new Recordset("AgentProps", "MREM_web", "admin", "", "SELECT * FROM AgentProperties ORDER BY AgentProperties.Order", "FeatureID", true);


var HiddenVisitorDate= new HiddenDef('HiddenVisitorDate');
var HiddenInterest= new HiddenDef('HiddenInterest');
var InterestSeeder= new HiddenDef('InterestSeeder');
var AgentName= new HiddenDef('AgentName');
var AgentNameSeeder= new HiddenDef('AgentNameSeeder');
var HiddenAgentEmail= new HiddenDef('HiddenAgentEmail');
var HiddenAgentID= new HiddenDef('HiddenAgentID');
var HiddenAgentIDVisitor= new HiddenDef('HiddenAgentIDVisitor');

moreImage = 'media/_more_.gif'
transImage= 'media/_trans_.gif'

var VisitorName= new editDef('VisitorName',20,1,nullFunc,nullFunc,nullFunc);
var VisitorEmail= new editDef('VisitorEmail',20,1,nullFunc,nullFunc,nullFunc);
var VisitorMessage= new editDef('VisitorMessage',31,4,nullFunc,nullFunc,nullFunc);

var ImageButton1 = new makeButton('media/homes_for_sale_off.gif,media/homes_for_sale_on.gif',
	'JavaScript:_ImageButton1_onClick()','ImageButton1','AgentHome','ImageButton1',ImageButton1_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 0] = ImageButton1;
var ImageButton2 = new makeButton('media/sell_your_home_off.gif,media/sell_your_home_on.gif',
	'JavaScript:_ImageButton2_onClick()','ImageButton2','AgentHome','ImageButton2',ImageButton2_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 1] = ImageButton2;
var ImageButton3 = new makeButton('media/buy_a_home_black_off.gif,media/buy_a_home_black_on.gif',
	'JavaScript:_ImageButton3_onClick()','ImageButton3','AgentHome','ImageButton3',ImageButton3_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 2] = ImageButton3;
var ImageButton4 = new makeButton('media/contact_me_off.gif,media/contact_me_on.gif',
	'JavaScript:_ImageButton4_onClick()','ImageButton4','AgentHome','ImageButton4',ImageButton4_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 3] = ImageButton4;
var ImageButton5 = new makeButton('media/areas_i_serve_off.gif,media/areas_i_serve_on.gif',
	'JavaScript:_ImageButton5_onClick()','ImageButton5','AgentHome','ImageButton5',ImageButton5_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 4] = ImageButton5;
var ImageButton6 = new makeButton('media/relocation_black_off.gif,media/relocation_black_on.gif',
	'JavaScript:_ImageButton6_onClick()','ImageButton6','AgentHome','ImageButton6',ImageButton6_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 5] = ImageButton6;
var ImageButton13 = new makeButton('media/what_can_i_borrow_off.gif,media/what_can_i_borrow_on.gif',
	'WhatCanIBorrow.asp','ImageButton13','AgentHome','ImageButton13',nullFunc,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 6] = ImageButton13;
var ImageButton14 = new makeButton('media/get_a_loan_green_off.gif,media/get_a_loan_green_on.gif',
	'GetALoan.asp','ImageButton14','AgentHome','ImageButton14',nullFunc,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 7] = ImageButton14;
var ImageButton15 = new makeButton('media/own_vs_rent_off.gif,media/own_vs_rent_on.gif',
	'OwnVsRent.asp','ImageButton15','AgentHome','ImageButton15',nullFunc,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 8] = ImageButton15;
var ImageButton16 = new makeButton('media/todays_loan_rates_off.gif,media/todays_loan_rates_on.gif',
	'JavaScript:_ImageButton16_onClick()','ImageButton16','AgentHome','ImageButton16',ImageButton16_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 9] = ImageButton16;
var ImageButton7 = new makeButton('media/my_links_off.gif,media/my_links_on.gif',
	'JavaScript:_ImageButton7_onClick()','ImageButton7','AgentHome','ImageButton7',ImageButton7_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 10] = ImageButton7;
var ImageButton8 = new makeButton('media/communities_off.gif,media/communities_on.gif',
	'JavaScript:_ImageButton8_onClick()','ImageButton8','AgentHome','ImageButton8',ImageButton8_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 11] = ImageButton8;
var ImageButton11 = new makeButton('media/experience_off.gif,media/experience_on.gif',
	'JavaScript:_ImageButton11_onClick()','ImageButton11','AgentHome','ImageButton11',ImageButton11_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 12] = ImageButton11;
var ImageButton9 = new makeButton('media/commitment_off.gif,media/commitment_on.gif',
	'JavaScript:_ImageButton9_onClick()','ImageButton9','AgentHome','ImageButton9',ImageButton9_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 13] = ImageButton9;
var ImageButton10 = new makeButton('media/testimonials_off.gif,media/testimonials_on.gif',
	'JavaScript:_ImageButton10_onClick()','ImageButton10','AgentHome','ImageButton10',ImageButton10_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 14] = ImageButton10;
var ImageButton17 = new makeButton('media/continue_off.gif,media/continue_on.gif',
	'JavaScript:_ImageButton17_onClick()','ImageButton17','AgentHome','ImageButton17',ImageButton17_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 15] = ImageButton17;

var ImageButton12 = new makeButton('media/loginagent_off.gif,media/loginagent_on.gif',
	'Javascript:_ImageButton12_onClick()','ImageButton12','AgentHome','ImageButton12',ImageButton12_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 16] = ImageButton12;

var link20 = new makeButton('media/more_fp_agenthome_off.gif,media/more_fp_agenthome_on.gif',
	'JavaScript:_link20_onClick()','link20','AgentFeature','link20',link20_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 18] = link20;

var ImageButton50 = new makeButton('media/privacy_off.gif,media/privacy_on.gif',
	'JavaScript:_ImageButton50_onClick()','ImageButton50','Header_AgentPage','ImageButton50',ImageButton50_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 50] = ImageButton50;

var ImageButton51 = new makeButton('media/suggestions_off.gif,media/suggestions_on.gif',
	'JavaScript:_ImageButton51_onClick()','ImageButton51','Header_AgentPage','ImageButton51',ImageButton51_onClick,nullFunc,nullFunc,nullFunc,nullFunc);
BTNArray[ 51] = ImageButton51;