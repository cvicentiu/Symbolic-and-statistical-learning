menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}


////////////////////////////////////
// Editable properties START here //
////////////////////////////////////


timegap=100					// The time delay for menus to remain visible
followspeed=5				// Follow Scrolling speed
followrate=40				// Follow Scrolling Rate
suboffset_top=0;			// Sub menu offset Top position 
suboffset_left=0;			// Sub menu offset Left position


style1=[					// Menu Properties Array
"000000",					// Off Font Color
"ffffcc",					// Off Back Color
"000000",					// On Font Color
"6699ff",					// On Back Color
"000000",					// Border Color
10,							// Font Size
"normal",					// Font Style
"normal",					// Font Weight
"Arial",					// Font
3,							// Padding
"/images/arrow.gif",			// Sub Menu Image
0,						// 3D Border & Separator
"ffffff",					// 3D High Color
"000000"					// 3D Low Color
]

style2=[					// blank
"000000",					// Off Font Color
"ffffff",					// Off Back Color
"000000",					// On Font Color
"6699ff",					// On Back Color
"000000",					// Border Color
10,							// Font Size
"normal",					// Font Style
"normal",					// Font Weight
"Arial",					// Font
3,							// Padding
"/images/arrow.gif",			// Sub Menu Image
0,						// 3D Border & Separator
"ffffff",					// 3D High Color
"000000"					// 3D Low Color
]



addmenu(menu=["profile",181,124,150,1,"",style1,,,,,,,,,,,,,,,
,"About the Firm","/profile/firmprofile.cfm",,"About the Firm",1
,"Firm Role in Asbestos Litigation","/profile/asbestoslit.cfm",,"Firm Role in Asbestos Litigation",1
,"In the News","/profile/news.cfm",,"In the News",1
,"Asbestos Lawsuit FAQs","/profile/lawsuitfaqs.cfm","/","Asbestos Lawsuit FAQs",1
,"The Foundation","/profile/foundation.cfm","/","The Foundation",1
,"What People Say About Us","/profile/whatpeoplesay.cfm","/","What People Say About Us",1
])

addmenu(menu=["attorneys",219,124,150,1,"",style1,,,,,,,,,,,,,,,
,"Partners","/attorneys/partners.cfm","/","Partners",1
,"Associates","/attorneys/associates.cfm","/","Associates",1
,"Of Counsel","/attorneys/ofcounsel.cfm","/","Associates",1
])

addmenu(menu=["practice",215,124,150,1,"",style1,,,,,,,,,,,,,,,
,"Asbestos Claims","/practice/claims.cfm",,"Asbestos Claims",1
,"Firm Role in Asbestos Litigation","/practice/asbestoslit.cfm",,"Firm Role in Asbestos Litigation",1
,"Occupational Areas","show-menu=OCCUPATIONAL","/practice/occupational.cfm","Occupational Areas",1
,"Other Practice Areas","show-menu=OTHER","/practice/otherareas.cfm","Other Practice Areas",1
,"Filing Asbestos Lawsuit","show-menu=FILING","/practice/lawsuit.cfm","Filing Asbestos Lawsuit",1
])

	addmenu(menu=["OCCUPATIONAL","offset=3",,150,1,"",style2,,,,,,,,,,,,,,,
	,"Occupational Safety","/practice/occ_safety.cfm",,"Occupational Safety",1	
	,"Impact Litigation","/practice/impact_lit.cfm",,"Impact Litigation",1		
	,"Construction Accidents","/practice/accidents.cfm",,"Construction Accidents",1
	,"OSH Website Link","/practice/osh_link.cfm",,"OSH Website Link",1
	])
	
	addmenu(menu=["OTHER","offset=3",,150,1,"",style2,,,,,,,,,,,,,,,
	,"Catastrophic Personal Injury","/practice/catastrophic.cfm",,"Catastrophic Personal Injury",1	
	,"Lead Poisoning","/practice/lead.cfm",,"Lead Poisoning",1		
	,"Toxic Substances","/practice/toxic.cfm",,"Toxic Substances",1
	])
	
	addmenu(menu=["FILING","offset=3",,150,1,"",style2,,,,,,,,,,,,,,,
	,"Anatomy of Asbestos Lawsuit","/practice/lawsuit_anatomy.cfm",,"Anatomy of Asbestos Lawsuit",1	
	,"Jeanette Franklin v. USX Corporation","/practice/usx_corporation.cfm",,"Jeanette Franklin v. USX Corporation",1
	,"Lawsuit FAQs","/profile/lawsuitfaqs.cfm",,"Lawsuit FAQs",1		
	,"Personal Matters During Lawsuit","/practice/matters.cfm",,"Personal Matters During Lawsuit",1
	,"Personal Medical Research Help","/practice/research.cfm",,"Personal Medical Research Help",1
	])
	
	
addmenu(menu=["verdicts",257,124,150,1,"",style1,,,,,,,,,,,,,,,
,"Verdicts","/verdicts/verdicts.cfm",,"Verdicts",1
,"Asbestos News","/verdicts/news.cfm",,"Asbestos News",1
,"Feature Articles","/verdicts/articles.cfm",,"Feature Articles",1
])


addmenu(menu=["faq",205,124,150,1,"",style1,,,,,,,,,,,,,,,
,"What is Asbestos","/faq/whatis.cfm","/","What is Asbestos",1
,"Asbestos Related Disease","show-menu=RELATED","/faq/diseases.cfm","Asbestos Related Disease",1
,"How to Screen & Diagnose Disease","/faq/screening.cfm","","How to Screen & Diagnose Disease",1
,"How to Research Your Condition","/faq/research.cfm","","How to Research Your Condition",1
,"What is Mesothelioma Cancer","/faq/mesothelioma.cfm","","What is Mesothelioma Cancer",1
,"What are types of Mesothelioma","show-menu=TYPES","/faq/types.cfm","What are types of Mesothelioma",1
,"What are Mesothelioma Treatment Options?","show-menu=OPTIONS","/faq/mesotheliomatreatments.cfm","What are Mesothelioma Treatment Options?",1
,"Asbestos Exposure On-the-Job","/faq/atrisk.cfm","","Asbestos Exposure On-the-Job",1
,"Asbestos Exposure at Home & School","/faq/inhome.cfm","","Asbestos Exposure at Home & School",1
,"Anatomy of Asbestos Lawsuit","show-menu=ANATOMY","/practice/lawsuit_anatomy.cfm","Anatomy of Asbestos Lawsuit",1
])

	
    addmenu(menu=["RELATED","offset=3",,150,1,"",style2,,,,,,,,,,,,,,,
	,"What happens when we breathe?","/faq/whathappens.cfm",,"What happens when we breathe?",1	
	,"What is asbestos?","/faq/whatisasbestos.cfm",,"What is asbestos?",1
	,"What happens when asbestos is in the air we breathe?","faq/whathappens2.cfm",,"What happens when asbestos is in the air we breathe?",1
	,"What are asbestos related diseases?","/faq/whatare2.cfm",,"What are asbestos related diseases?",1		
	,"What is SV-40?","/faq/sv40.cfm",,"What is SV-40?",1
	,"Lung cancer","/faq/lungcancer.cfm",,"Lung cancer",1
	,"What is asbestosis?","/faq/asbestosis.cfm",,"What is asbestosis?",1
	,"Other asbestos related diseases","/faq/otherasbestos.cfm",,"Other asbestos related diseases",1
	,"Asbestos and smoking","/faq/smoking.cfm",,"Asbestos and smoking",1
    ,"More Information","/faq/moreinfo.cfm",,"More Information",1
	])
	
	addmenu(menu=["TYPES","offset=3",,150,1,"",style2,,,,,,,,,,,,,,,
	,"Peritoneal mesothelioma","/faq/peritoneal.cfm",,"Peritoneal mesothelioma",1	
	,"Pleural mesothelioma","/faq/pleural.cfm",,"Pleural mesothelioma",1		
	,"Other mesotheliomas","/faq/other.cfm",,"Other mesotheliomas",1
	,"Benign pleural diseases","/faq/benign.cfm",,"Benign pleural diseases",1
	])

	addmenu(menu=["OPTIONS","offset=3",,150,1,"",style2,,,,,,,,,,,,,,,
	,"Multimodal Therapy","/faq/multimodal.cfm",,"Multimodal Therapy",1	
	,"Angiogenesis","/faq/mesothelioma_angiogenesis.cfm",,"Angiogenesis",1		
	,"Drugs/Chemotherapy","/faq/drugtherapy.cfm",,"Drugs/Chemotherapy",1
	,"Gene/Immunotherapy","/faq/immunotherapy.cfm",,"Gene/Immunotherapy",1
	,"Photodynamic","/faq/photodynamic.cfm",,"Photodynamic",1
	,"Radiation","/faq/radiation.cfm",,"Radiation",1
	,"Surgery","/faq/surgery.cfm",,"Surgery",1
	,"Treatment Centers","/faq/treatmentcenters.cfm",,"Treatment Centers",1
	,"Unconventional Treatments","/faq/unconventional.cfm",,"Unconventional Treatments",1
	,"Patient Medical Research","/faq/research.cfm",,"Patient Medical Research",1
	,"Shark Cartilage and Cancer","/faq/shark_cartilage.cfm",,"Shark Cartilage and Cancer",1
	])
	
	addmenu(menu=["ANATOMY","offset=3",,150,1,"",style2,,,,,,,,,,,,,,,
	,"Anatomy of Asbestos Lawsuit","/practice/lawsuit_anatomy.cfm",,"Anatomy of Asbestos Lawsuit",1	
	,"Lawsuit FAQs","/profile/lawsuitfaqs.cfm",,"Lawsuit FAQs",1		
	,"Personal Matters During Lawsuit","/practice/matters.cfm",,"Personal Matters During Lawsuit",1
	,"Personal Medical Research Help","/practice/research.cfm",,"Personal Medical Research Help",1
	])


addmenu(menu=["careers",280,124,150,1,"",style1,,,,,,,,,,,,,,,
,"Employment Opportunities","/careers/overview.cfm",,"Employment Opportunities",1
,"Attorneys","/careers/attorney.cfm",,"Attorneys",1
,"Law-Clerk Positions","/careers/lawclerk.cfm",,"Law-Clerk Positions",1
,"Staff","/careers/staff.cfm","/","Staff",1
])

addmenu(menu=["contact",318,124,150,1,"",style1,,,,,,,,,,,,,,,
,"Contact Form","/contact/contact.cfm",,"Contact Form",1
,"Address/Directions","/contact/directions.cfm",,"Address/Directions",1
])

addmenu(menu=["blank",35,0,15,1,"",style2,,,,,,,,,,,,,,,
," ","/",,,1
])


	



//////////////////////////////////
// Editable properties END here //
//////////////////////////////////
dumpmenus() // This must be the last line in this file
