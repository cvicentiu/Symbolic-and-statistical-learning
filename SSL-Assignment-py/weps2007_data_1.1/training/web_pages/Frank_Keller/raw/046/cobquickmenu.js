//defines menu items					
mymenu1 = new Menu
mymenu1.startMenu()							
//defines the names of the links
mymenu1.addMenu("quicklink1","<a href='http://www.biz.colostate.edu/quicklinks.htm' class='topmenu'><img src='http://www.biz.colostate.edu/headerfiles/images/searchbutton.gif' alt='Quick Links' width='136' height='20' border='0'></a>")
mymenu1.showMainMenu()
				
					
			
//defines the drop down links category name - name to appear - URL
mymenu1.addSubMenu("quicklink1", "&nbsp;Undergraduate&nbsp;", "http://www.biz.colostate.edu/ugrad/default.htm")
mymenu1.addSubMenu("quicklink1", "&nbsp;Denver Executive MBA&nbsp;", "http://www.biz.colostate.edu/demba/")
mymenu1.addSubMenu("quicklink1", "&nbsp;Distance MBA&nbsp;", "http://www.biz.colostate.edu/mba/distance/distance.htm")
mymenu1.addSubMenu("quicklink1", "&nbsp;Evening MBA&nbsp;", "http://www.biz.colostate.edu/mba/evening/evening.htm")
mymenu1.addSubMenu("quicklink1", "&nbsp;MS-Accounting&nbsp;", "http://www.biz.colostate.edu/ms/Accounting/")
mymenu1.addSubMenu("quicklink1", "&nbsp;MS-GSSE&nbsp;", "http://www.biz.colostate.edu/ms/GSSE/")
mymenu1.addSubMenu("quicklink1", "&nbsp;MS-Info Systems&nbsp;", "http://www.biz.colostate.edu/ms/CIS/program.htm")
mymenu1.addSubMenu("quicklink1", "&nbsp;Certificate Programs&nbsp;", "http://www.biz.colostate.edu/certificateprog.htm")
mymenu1.addSubMenu("quicklink1", "&nbsp;Events&nbsp;", "http://www.biz.colostate.edu/events/")
mymenu1.addSubMenu("quicklink1", "&nbsp;Visit Rockwell Hall&nbsp;", "http://www.biz.colostate.edu/visit.htm")
mymenu1.showMenu()