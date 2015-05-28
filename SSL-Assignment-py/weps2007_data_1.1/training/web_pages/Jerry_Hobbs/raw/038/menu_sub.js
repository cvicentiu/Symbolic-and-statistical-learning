function mmLoadMenus() {
  if (window.mm_menu_0) return;
  window.mm_menu_0 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_0.addMenuItem("&#8250; About...","location='../department/index.html'");
  mm_menu_0.addMenuItem("&#8250; Admin Contacts","location='../people/contacts.html'");
  mm_menu_0.addMenuItem("&#8250; Directory of Personnel","location='../people/personnel.html'");
  mm_menu_0.addMenuItem("&#8250; Map &amp; Directions","location='../department/map.html'");
  mm_menu_0.addMenuItem("&#8250; OSU &amp; Community","location='../department/community.html'");
  mm_menu_0.addMenuItem("&#8250; Annual Report","location='../department/annualReport.html'");
  mm_menu_0.addMenuItem("&#8250; Available Positions","location='../department/positions.html'");
  mm_menu_0.addMenuItem("&#8250; Award Nominations","window.open('https://www.cse.ohio-state.edu/awards/', '_blank');
  mm_menu_0.addMenuItem("&#8250; Departmental Forms","location='../department/forms.html'");
  mm_menu_0.fontWeight="bold";
  mm_menu_0.hideOnMouseOut=true;
  window.mm_menu_1 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_1.addMenuItem("&#8250; Current Month","location='../calendar/calendar.php'");
  mm_menu_1.addMenuItem("&#8250; Upcoming Speakers","location='../speaker/speakerlist.php'");
  mm_menu_1.fontWeight="bold";
  mm_menu_1.hideOnMouseOut=true;
  window.mm_menu_news = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_news.addMenuItem("&#8250; CSE News","location='../news/news.php'");
  mm_menu_news.fontWeight="bold";
  mm_menu_news.hideOnMouseOut=true;  
  window.mm_menu_2 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_2.addMenuItem("&#8250; About...","location='../research/index.html'");
  mm_menu_2.addMenuItem("&#8250; Artificial Intelligence","location='../research/index.html#artint'");
  mm_menu_2.addMenuItem("&#8250; Computer Graphics","location='../research/index.html#compgraph'");
  mm_menu_2.addMenuItem("&#8250; Computer Networking","location='../research/index.html#compnet'");
  mm_menu_2.addMenuItem("&#8250; Software Engineering","location='../research/index.html#softeng'");
  mm_menu_2.addMenuItem("&#8250; Systems","location='../research/index.html#systems'");
  mm_menu_2.addMenuItem("&#8250; Technical Reports","location='../research/techReport.html'");
  mm_menu_2.fontWeight="bold";
  mm_menu_2.hideOnMouseOut=true;
  window.mm_menu_3 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_3.addMenuItem("&#8250; About ...","location='../ugrad/index.shtml'");
  mm_menu_3.addMenuItem("&#8250; Admissions","location='../ugrad/admissions.shtml'");
  mm_menu_3.addMenuItem("&#8250; BSCSE","location='../ugrad/bscse.shtml'");
  mm_menu_3.addMenuItem("&#8250; BSCIS","location='../ugrad/bscis.shtml'");
  mm_menu_3.addMenuItem("&#8250; BACIS","location='../ugrad/bacis.shtml'");
  mm_menu_3.addMenuItem("&#8250; CIS Minor","location='../ugrad/minor.shtml'");
  mm_menu_3.addMenuItem("&#8250; Courses","location='../ugrad/courses.shtml'");
  mm_menu_3.addMenuItem("&#8250; Undergrad Advising","location='../ugrad/advisingoffice.shtml'");
  mm_menu_3.addMenuItem("&#8250; Honors Program","location='../ugrad/honors.shtml'");
  mm_menu_3.addMenuItem("&#8250; Student Organizations","location='../ugrad/orgs.shtml'");
  mm_menu_3.fontWeight="bold";
  mm_menu_3.hideOnMouseOut=true;
  window.mm_menu_4 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_4.addMenuItem("&#8250; About ...","location='../grad/index.html'");
  mm_menu_4.addMenuItem("&#8250; Admissions","location='../grad/admissions.html'");
  mm_menu_4.addMenuItem("&#8250; Masters Program","location='../grad/ms.html'");
  mm_menu_4.addMenuItem("&#8250; PhD Program","location='../grad/phd.html'");
  mm_menu_4.addMenuItem("&#8250; Joint Programs","location='../grad/joint.html'");
  mm_menu_4.addMenuItem("&#8250; Fellowships/Financial Aid","location='../grad/financialAid.html'");
  mm_menu_4.addMenuItem("&#8250; Courses","location='../courses/index.html'");
  mm_menu_4.addMenuItem("&#8250; Graduate Life","location='../grad/life.html'");
  mm_menu_4.addMenuItem("&#8250; Student Organizations","location='../ugrad/orgs.shtml'");
  mm_menu_4.fontWeight="bold";
  mm_menu_4.hideOnMouseOut=true;
  window.mm_menu_5 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_5.addMenuItem("&#8250; Faculty","location='../people/faculty.html'");
  mm_menu_5.addMenuItem("&#8250; Grad Students","location='../people/grads.shtml'");
  mm_menu_5.addMenuItem("&#8250; Undergraduates","location='../people/ugrads.shtml'");
  mm_menu_5.addMenuItem("&#8250; Administrative Staff","location='../people/adminStaff.html'");
  mm_menu_5.addMenuItem("&#8250; Computing Staff","location='../people/staff.html'");
  mm_menu_5.addMenuItem("&#8250; Administrative Contacts","location='../people/contacts.html'");
  mm_menu_5.addMenuItem("&#8250; Directory of Personnel","location='../people/personnel.html'");
  mm_menu_5.fontWeight="bold";
  mm_menu_5.hideOnMouseOut=true;
  window.mm_menu_6 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_6.addMenuItem("&#8250; About ...","location='../courses/index.html'");
  mm_menu_6.addMenuItem("&#8250; Class Schedule","location='../courses/descSched.html'");
  mm_menu_6.addMenuItem("&#8250; Course Syllabi","location='http://www.cse.ohio-state.edu/cgi-bin/syllabus-view-new.cgi'");
  mm_menu_6.addMenuItem("&#8250; OSU Course Bulletin","location='http://www.ureg.ohio-state.edu/courses/'");
  mm_menu_6.addMenuItem("&#8250; University Registrar","location='http://www.ureg.ohio-state.edu'");
  mm_menu_6.fontWeight="bold";
  mm_menu_6.hideOnMouseOut=true;
  window.mm_menu_7 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_7.addMenuItem("&#8250; About...","location='../cs/index.html'");
  mm_menu_7.addMenuItem("&#8250; Policies","location='../help/uguide/node189.html'");
  mm_menu_7.addMenuItem("&#8250; Users Guide","location='../help/uguide/'");
  mm_menu_7.addMenuItem("&#8250; Help Desk (SOC)","location='../cs/operations'");
  mm_menu_7.addMenuItem("&#8250; CSE Labs","location='../cs/operations/labs.htm'");
  mm_menu_7.addMenuItem("&#8250; Staff Listing","location='../people/staff.html'");
  mm_menu_7.fontWeight="bold";
  mm_menu_7.hideOnMouseOut=true;
  window.mm_menu_8 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_8.addMenuItem("&#8250; Available Positions","location='../department/positions.html'");
  mm_menu_8.fontWeight="bold";
  mm_menu_8.hideOnMouseOut=true;
  window.mm_menu_9 = new Menu("root",160,20,"'trebuchet ms', Helvetica, Arial, sans-serif",14,"#333333","#000000","#ffffff","#ffecec","left","middle",3,0,1000,-5,7,true,true,true,0,true,true);
  mm_menu_9.addMenuItem("&#8250; About...","location='../diversity/index.html'");
  mm_menu_9.addMenuItem("&#8250; Tutoring Program","location='../diversity/tutoring.html'");
  mm_menu_9.addMenuItem("&#8250; Listservs","location='../diversity/listservs.html'");
  mm_menu_9.addMenuItem("&#8250; Links","location='../diversity/womenMinorityLinks.html'");
  mm_menu_9.fontWeight="bold";
  mm_menu_9.hideOnMouseOut=true;  

mm_menu_0.writeMenus();
} // mmLoadMenus()

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&id.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function setTextfield(objName,x,newText) { //v3.0
  var obj = MM_findObj(objName); if (obj) obj.value = newText;
}

function MM_startTimeout() {
	if( window.ActiveMenu ) {
		mmStart = new Date();
		mmDHFlag = true;
		mmHideMenuTimer = setTimeout("mmDoHide()", window.ActiveMenu.Menu.hideTimeout);
	}
}
