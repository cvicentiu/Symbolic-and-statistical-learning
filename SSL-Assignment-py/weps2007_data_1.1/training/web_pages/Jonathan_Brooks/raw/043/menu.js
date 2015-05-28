/*****************************************************************************
Copyright (c) 2001 Thomas Brattli (webmaster@dhtmlcentral.com)

DHTML coolMenus - Get it at coolmenus.dhtmlcentral.com
Version 4.0_beta
This script can be used freely as long as all copyright messages are
intact.

Extra info - Coolmenus reference/help - Extra links to help files ****
CSS help: http://192.168.1.31/projects/coolmenus/reference.asp?m=37
General: http://coolmenus.dhtmlcentral.com/reference.asp?m=35
Menu properties: http://coolmenus.dhtmlcentral.com/properties.asp?m=47
Level properties: http://coolmenus.dhtmlcentral.com/properties.asp?m=48
Background bar properties: http://coolmenus.dhtmlcentral.com/properties.asp?m=49
Item properties: http://coolmenus.dhtmlcentral.com/properties.asp?m=50
******************************************************************************/
//Menu object creation
oCMenu=new makeCM("oCMenu") //Making the menu object. Argument: menuname

oCMenu.frames = 1

//Menu properties
oCMenu.pxBetween=10
oCMenu.fromLeft=20
oCMenu.fromTop=175
oCMenu.rows=1
oCMenu.menuPlacement="center"

oCMenu.offlineRoot=""
oCMenu.onlineRoot=""
oCMenu.resizeCheck=1
oCMenu.wait=1000
oCMenu.fillImg="images/cm_fill.gif"
oCMenu.zIndex=0

//Background bar properties
oCMenu.useBar=1
oCMenu.barWidth="100%"
oCMenu.barHeight="menu"
oCMenu.barClass="clBar"
oCMenu.barX=0
oCMenu.barY=175
oCMenu.barBorderX=0
oCMenu.barBorderY=0
oCMenu.barBorderClass=""

//Level properties - ALL properties have to be specified in level 0
oCMenu.level[0]=new cm_makeLevel() //Add this for each new level
oCMenu.level[0].width=130
oCMenu.level[0].height=25
oCMenu.level[0].regClass="clLevel0"
oCMenu.level[0].overClass="clLevel0over"
oCMenu.level[0].borderX=0
oCMenu.level[0].borderY=0
oCMenu.level[0].borderClass="clLevel0border"
oCMenu.level[0].offsetX=0
oCMenu.level[0].offsetY=0
oCMenu.level[0].rows=0
oCMenu.level[0].arrow=0
oCMenu.level[0].arrowWidth=0
oCMenu.level[0].arrowHeight=0
oCMenu.level[0].align="bottom"


//EXAMPLE SUB LEVEL[1] PROPERTIES - You have to specify the properties you want different from LEVEL[0] - If you want all items to look the same just remove this
oCMenu.level[1]=new cm_makeLevel() //Add this for each new level (adding one to the number)
oCMenu.level[1].width=oCMenu.level[0].width-2
oCMenu.level[1].height=22
oCMenu.level[1].regClass="clLevel1"
oCMenu.level[1].overClass="clLevel1over"
oCMenu.level[1].borderX=1
oCMenu.level[1].borderY=1
oCMenu.level[1].align="right"
oCMenu.level[1].offsetX=-(oCMenu.level[0].width-2)/2+20
oCMenu.level[1].offsetY=0
oCMenu.level[1].borderClass="clLevel1border"


//EXAMPLE SUB LEVEL[2] PROPERTIES - You have to specify the properties you want different from LEVEL[1] OR LEVEL[0] - If you want all items to look the same just remove this
oCMenu.level[2]=new cm_makeLevel() //Add this for each new level (adding one to the number)
oCMenu.level[2].width=150
oCMenu.level[2].height=20
oCMenu.level[2].offsetX=0
oCMenu.level[2].offsetY=0
oCMenu.level[2].regClass="clLevel2"
oCMenu.level[2].overClass="clLevel2over"
oCMenu.level[2].borderClass="clLevel2border"


/******************************************
Menu item creation:
myCoolMenu.makeMenu(name, parent_name, text, link, target, width, height, regImage, overImage, regClass, overClass , align, rows, nolink, onclick, onmouseover, onmouseout)
*************************************/
oCMenu.makeMenu('top0','','&nbsp;ENTER','index.htm')


oCMenu.makeMenu('subA','top0','ONLINE STORE','onls.htm')
oCMenu.makeMenu('sub001','subA','TDI MANUALS','book_tdi.htm')
oCMenu.makeMenu('sub002','subA','SDI MANUALS','book_sdi.htm')
oCMenu.makeMenu('sub003','subA','CLOTHING','clb.htm')
oCMenu.makeMenu('sub004','subA','DIVING BOOKS','book.htm')
oCMenu.makeMenu('sub005','subA','FILL STATION','fse.htm')
oCMenu.makeMenu('sub006','subA','ABYSMAL','http://www.abysmal.com/Merchant2/merchant.mv?Screen=SFNT&amp;Store_Code=ADR&amp;Affiliate=oteee')

oCMenu.makeMenu('subB','top0','PHOTO GALLERY','photos.htm')
oCMenu.makeMenu('sub01020','subB','PHOTO&acute;S 2005','photo05.htm')
oCMenu.makeMenu('sub01021','subB','PHOTO&acute;S 2004','photo04.htm')
oCMenu.makeMenu('sub01022','subB','PHOTO&acute;S 2003','photo03.htm')
oCMenu.makeMenu('sub01023','subB','PHOTO&acute;S 2002','photo02.htm')
oCMenu.makeMenu('sub01024','subB','PHOTO&acute;S 2001','photo01.htm')
oCMenu.makeMenu('sub01025','subB','PHOTO&acute;S 2000','photo00.htm')
oCMenu.makeMenu('sub01026','subB','PHOTO&acute;S 1999','photo99.htm')
oCMenu.makeMenu('sub01027','subB','PHOTO&acute;S 1998','photo98.htm')
oCMenu.makeMenu('sub01028','subB','PHOTO&acute;S 1997','photo97.htm')
oCMenu.makeMenu('sub01029','subB','PHOTO&acute;S 1996','photo96.htm')

oCMenu.makeMenu('subC','top0','&nbsp;CONTACT US','contact.htm')
oCMenu.makeMenu('subD','top0','&nbsp;LEGAL','legal.htm')
oCMenu.makeMenu('subE','top0','LINKS','links.htm')

oCMenu.makeMenu('top1','','&nbsp;BASE&nbsp;CAMP','basecamp.htm')
oCMenu.makeMenu('sub00','top1','MISSION','basecamp.htm')

oCMenu.makeMenu('sub01','top1','INSTRUCTOR TRAINERS','explead.htm')
oCMenu.makeMenu('sub011','sub01','JONATHAN BROOKS','jbrooks.htm')
oCMenu.makeMenu('sub012','sub01','MICHAEL ROBERTSON','mrobert.htm')

oCMenu.makeMenu('sub02','top1','INSTRUCTORS','explead.htm')
oCMenu.makeMenu('sub021','sub02','GERARD GAUDET','gaudet.htm')
oCMenu.makeMenu('sub022','sub02','JONATHAN PILKINGTON','jpilkin.htm')
oCMenu.makeMenu('sub023','sub02','KEVIN YAROSH','yarosh.htm')
oCMenu.makeMenu('sub024','sub02','MORIS MARKARIAN','moris.htm')

oCMenu.makeMenu('sub03','top1','DIVEMASTERS','explead.htm')
oCMenu.makeMenu('sub031','sub03','ERIC MC GEORGE','emcgorg.htm')
oCMenu.makeMenu('sub032','sub03','LISA BASARABA','lisab.htm')

oCMenu.makeMenu('sub04','top1','CREW MEMBERS','explead.htm')
oCMenu.makeMenu('sub041','sub04','GEORGE BROOKS','gbrooks.htm')
oCMenu.makeMenu('sub042','sub04','JONATHAN KUCKYT','jkuckyt.htm')
oCMenu.makeMenu('sub043','sub04','IAN KUCKYT','ikuckyt.htm')
oCMenu.makeMenu('sub044','sub04','DAN PETERSON','dpeter.htm')
oCMenu.makeMenu('sub045','sub04','KATIE K','kkuckyt.htm')

oCMenu.makeMenu('sub05','top1','AFILLIATES','explead.htm')
oCMenu.makeMenu('sub051','sub05','JOE ODOM','jodom.htm')
oCMenu.makeMenu('sub052','sub05','ROB PUGH','rpugh.htm') 
oCMenu.makeMenu('sub053','sub05','KIMBERLY MONK','kmonk.htm')


oCMenu.makeMenu('top2','','&nbsp;SCUBA','scuba.htm')
oCMenu.makeMenu('sub10','top2','RECREATIONAL','scuba.htm')
oCMenu.makeMenu('sub101','sub10','FUTURE BUDDIES','futurbud.htm')
oCMenu.makeMenu('sub102','sub10','OPEN WATER','openw.htm')
oCMenu.makeMenu('sub103','sub10','ADVANCED OPEN WATER','advopwtr.htm')

oCMenu.makeMenu('sub104','sub103','BOAT DIVER','undercon.htm')
oCMenu.makeMenu('sub105','sub103','COMPUTER DIVER','undercon.htm')
oCMenu.makeMenu('sub106','sub103','COMPUTER NITROX DIVER','undercon.htm')
oCMenu.makeMenu('sub107','sub103','DEEP DIVER','undercon.htm')
oCMenu.makeMenu('sub108','sub103','WRECK DIVER','undercon.htm')
oCMenu.makeMenu('sub109','sub103','DRYSUIT DIVER','drysuit.htm')
oCMenu.makeMenu('sub1010','sub103','DPV DIVER','dpv.htm')
oCMenu.makeMenu('sub1011','sub103','EQUIPMENT SPECIALIST','undercon.htm')
oCMenu.makeMenu('sub1012','sub103','RESEARCH DIVER','undercon.htm')
oCMenu.makeMenu('sub1013','sub103','ICE DIVER','undercon.htm')
oCMenu.makeMenu('sub1014','sub103','NIGHT-LIMITED VIS','undercon.htm')
oCMenu.makeMenu('sub1015','sub103','SEARCH AND RECOVERY','undercon.htm')
oCMenu.makeMenu('sub1016','sub103','MARINE ECOSYSTEMS','undercon.htm')
oCMenu.makeMenu('sub1017','sub103','SHORE-BEACH DIVER','undercon.htm')
oCMenu.makeMenu('sub1018','sub103','HUNTER AND COLLECTOR','undercon.htm')
oCMenu.makeMenu('sub1019','sub103','NAVIGATION DIVER','undercon.htm')
oCMenu.makeMenu('sub1020','sub103','PHOTOGRAPHY DIVER','undercon.htm')
oCMenu.makeMenu('sub1021','sub103','VIDEOGRAPHY DIVER','undercon.htm')
oCMenu.makeMenu('sub1022','sub103','CPR 1ST','cpr1stad.htm')
oCMenu.makeMenu('sub1023','sub103','CPROX','cproxadm.htm')
oCMenu.makeMenu('sub1024','sub103','ARCHEOLOGICAL SURVEY','undercon.htm')
oCMenu.makeMenu('sub1025','sub103','DRIFT DIVER','undercon.htm')
oCMenu.makeMenu('sub1026','sub103','VIP INSPECTOR','undercon.htm')

oCMenu.makeMenu('sub1027','sub10','RESCUE DIVER','rescue.htm')
oCMenu.makeMenu('sub1028','sub10','REC.DIVE MASTER','recdm.htm')
oCMenu.makeMenu('sub1029','sub10','ASS&acute;T INSTR.','assins.htm')


oCMenu.makeMenu('sub11','top2','&nbsp;TECHNICAL','scuba.htm')
oCMenu.makeMenu('sub111','sub11','NITROX','nitrox.htm')
oCMenu.makeMenu('sub112','sub11','ADVANCED NITROX','advnitr.htm')
oCMenu.makeMenu('sub113','sub11','DECO.PROCEDURES','decomp.htm')
oCMenu.makeMenu('sub114','sub11','EXTENDED RANGE','extrang.htm')
oCMenu.makeMenu('sub115','sub11','ENTRY TRIMIX','entrtri.htm')
oCMenu.makeMenu('sub116','sub11','ADVANCED TRIMIX','advtrim.htm')
oCMenu.makeMenu('sub117','sub11','ADVANCED WRECK','advwreck.htm')
oCMenu.makeMenu('sub118','sub11','DRAEGER DOLPHIN','rebreher.htm')
oCMenu.makeMenu('sub119','sub11','BUDDY INSPIRATION','rebrherb.htm')
oCMenu.makeMenu('sub1110','sub11','DRAEGER RAY','rebrray.htm')
oCMenu.makeMenu('sub1111','sub11','CAVERN','cavern.htm')
oCMenu.makeMenu('sub1112','sub11','INTRO TO CAVE','introcav.htm')
oCMenu.makeMenu('sub1113','sub11','CAVE DIVER','cave.htm')
oCMenu.makeMenu('sub1114','sub11','NITROX GAS BLENDER','nitrogbi.htm')
oCMenu.makeMenu('sub1115','sub11','ADVANCED GAS BLENDER','undercon.htm')
oCMenu.makeMenu('sub1116','sub11','SERVICE TECHNICIAN','servtech.htm')
oCMenu.makeMenu('sub1117','sub11','TECHNICAL DIVEMASTER','techdm.htm')

oCMenu.makeMenu('sub12','top2','&nbsp;PUBLIC SAFETY','scuba.htm')
oCMenu.makeMenu('sub1211','sub12','APPRENTICE','undercon.htm')
oCMenu.makeMenu('sub1222','sub12','ERDI LEVEL 1','undercon.htm')
oCMenu.makeMenu('sub1233','sub12','ERDI LEVEL 2','undercon.htm')
oCMenu.makeMenu('sub1244','sub12','ERDI TENDER','undercon.htm')
oCMenu.makeMenu('sub1255','sub12','SURFACE ICE RESCUER','undercon.htm')
oCMenu.makeMenu('sub1266','sub12','COURSE STANDARDS','erdistan.htm')


oCMenu.makeMenu('sub13','top2','&nbsp;MEDICAL ASSISSTANCE','scuba.htm')
oCMenu.makeMenu('sub131','sub13','CPROX ADMINISTRATOR','cproxadm.htm')
oCMenu.makeMenu('sub132','sub13','CPR 1ST ADMINISTRATOR','cpr1stad.htm')
oCMenu.makeMenu('sub133','sub13','DAN O2 PROVIDER','undercon.htm')
oCMenu.makeMenu('sub134','sub13','DAN REMO2 PROVIDER','undercon.htm')
oCMenu.makeMenu('sub135','sub13','DAN BLS PRO','undercon.htm')
oCMenu.makeMenu('sub136','sub13','DAN ADV O2','undercon.htm')
oCMenu.makeMenu('sub137','sub13','DAN AED','undercon.htm')
oCMenu.makeMenu('sub138','sub13','HAZARDOUS MARINE LIFE','undercon..htm')
oCMenu.makeMenu('sub139','sub13','DAN AQUATICS O2','undercon.htm')

oCMenu.makeMenu('sub14','top2','&nbsp;TDI CAREERS','scuba.htm')
oCMenu.makeMenu('sub141','sub14','NITROX INSTRUCTOR','nitroist.htm')
oCMenu.makeMenu('sub142','sub14','ADVANCED NITROX INSTR.','advniti.htm')
oCMenu.makeMenu('sub143','sub14','DECO PROCEDURES INSTR.','decompi.htm')
oCMenu.makeMenu('sub144','sub14','EXTENDED RANGE INSTR.','extrangi.htm')
oCMenu.makeMenu('sub145','sub14','TRIMIX INSTRUCTOR','advtirmi.htm')
oCMenu.makeMenu('sub146','sub14','ADVANCED WRECK INSTR.','advwreki.htm')
oCMenu.makeMenu('sub147','sub14','SERVICE TECH.INSTR.','servteci.htm')
oCMenu.makeMenu('sub148','sub14','NITROX GAS BLEND.INSTR.','nitrogbi.htm')
oCMenu.makeMenu('sub149','sub14','ADVANCED BLEND.INSTR.','advbleni.htm')
oCMenu.makeMenu('sub150','sub14','REBREATHER INSTR.','undercon.htm')

oCMenu.makeMenu('sub15','top2','&nbsp;SDI CAREERS','scuba.htm')
oCMenu.makeMenu('sub1151','sub15','DIVE MASTER','recdm.htm')
oCMenu.makeMenu('sub1152','sub15','ASSISTANT INSTR.','assins.htm')
oCMenu.makeMenu('sub1153','sub15','OPEN WATER INSTR.','undercon.htm')
oCMenu.makeMenu('sub1154','sub15','CPROX INSTRUCTOR','cproinst.htm')
oCMenu.makeMenu('sub1155','sub15','CPR 1ST INSTRUCTOR','cpr1stin.htm')
oCMenu.makeMenu('sub1156','sub15','VIP INSTRUCTOR','undercon.htm')

oCMenu.makeMenu('sub16','top2','&nbsp;DAN CAREERS','scuba.htm')
oCMenu.makeMenu('sub161','sub16','DAN O2 INSTR.','undercon.htm')
oCMenu.makeMenu('sub162','sub16','DAN REMO2 INSTR.','undercon.htm')
oCMenu.makeMenu('sub163','sub16','DAN BLS PRO INSTR.','undercon.htm')
oCMenu.makeMenu('sub164','sub16','DAN ADV. O2 INSTR.','undercon.htm')
oCMenu.makeMenu('sub165','sub16','DAN AED INSTR.','undercon.htm')
oCMenu.makeMenu('sub166','sub16','HAZARDOUS MARINE LIFE','undercon..htm')
oCMenu.makeMenu('sub167','sub16','DAN AQUATICS O2 INSTR.','undercon.htm')


oCMenu.makeMenu('sub17','top2','TRAINING SCHEDULES','trainskd.htm')        
oCMenu.makeMenu('sub171','sub17','2005 SCHEDULE','trainskd.htm#2005')
oCMenu.makeMenu('sub172','sub17','2006 SCHEDULE','trainskd.htm#2006')

oCMenu.makeMenu('sub18','top2','&nbsp;TUITION FEES','tuition.htm')
oCMenu.makeMenu('sub181','sub18','TDI DIVER LEVEL','tuit2002.htm#dlp')
oCMenu.makeMenu('sub182','sub18','TDI DIVER COMBO','tuit2002.htm#combo')
oCMenu.makeMenu('sub183','sub18','TDI CAREER DEVEL.','tuit2002.htm#career')
oCMenu.makeMenu('sub184','sub18','TDI INSTRUCT.COMBO','tuit2002.htm#icc')
oCMenu.makeMenu('sub185','sub18','SDI REC. PROGRAMS','tuit2002.htm#sdi')
oCMenu.makeMenu('sub186','sub18','SDI ADV. O/W SERIES ','tuit2002.htm#specop')
oCMenu.makeMenu('sub187','sub18','SDI ADV. O/W INSTRUCT','tuit2002.htm#sdiowil')
oCMenu.makeMenu('sub188','sub18','MEDICAL ASS&acute;T','tuit2002.htm#map')
oCMenu.makeMenu('sub1891','sub18','MEDICAL ASS&acute;T COMBO','tuit2002.htm#macp')
oCMenu.makeMenu('sub1892','sub18','ERDI DIVER LEVEL','tuit2002.htm#psp')
oCMenu.makeMenu('sub1893','sub18','ADDITIONAL PROGRAMS','tuit2002.htm#ap')
oCMenu.makeMenu('sub1894','sub18','ADDITIONAL INFORMATION','tuit2002.htm#adinfo')

oCMenu.makeMenu('top3','','&nbsp;ADVENTURE&nbsp;TRAVEL','advntrel.htm')
oCMenu.makeMenu('sub31','top3','CHARTER SCHEDULE','charter.htm')
oCMenu.makeMenu('sub311','sub31','ST. CATHARINES','charters.htm')
oCMenu.makeMenu('sub312','sub31','ROCKPORT','charterr.htm')
oCMenu.makeMenu('sub313','sub31','BROCKVILLE','charterb.htm')


oCMenu.makeMenu('sub32','top3','CHARTER BOATS','boats.htm')
oCMenu.makeMenu('sub321','sub32','ROY E.','roye.htm')



oCMenu.makeMenu('sub33','top3','EXCURSIONS','advntrel.htm')

oCMenu.makeMenu('sub34','top3','WRECK SITES','wrecks.htm')

oCMenu.makeMenu('sub040','sub34','ST. CATHARINES','undercon.htm')
oCMenu.makeMenu('sub050','sub34','ROCKPORT','undercon.htm')
oCMenu.makeMenu('sub060','sub34','BROCKVILLE','undercon.htm')



oCMenu.makeMenu('sub35','top3','DIRECTIONS','direc.htm')
oCMenu.makeMenu('sub351','sub35','ST. CATHARINES','portd.htm')
oCMenu.makeMenu('sub352','sub35','ROCKPORT','rockd.htm')
oCMenu.makeMenu('sub353','sub35','BROCKVILLE','brockd.htm')



//Leave this line - it constructs the menu
oCMenu.construct()
