menunum=0;menus=new Array();_d=document;function addmenu(){menunum++;menus[menunum]=menu;}function dumpmenus(){mt="<script language=javascript>";for(a=1;a<menus.length;a++){mt+=" menu"+a+"=menus["+a+"];"}mt+="<\/script>";_d.write(mt)}

effect = "Fade(duration=0);Alpha(style=0,opacity=88);Shadow(color='#003366', Direction=135, Strength=10)"

timegap=500
followspeed=5
followrate=40
suboffset_top=4;
suboffset_left=6;
closeOnClick = true

style1=[
"white","","white","","000000",10,"normal",
"bold","verdana,arial,helvetica,sans-serif",0,"",
,"66ffff","000099","","","","ffffff","000099","navy",
]

style2=[
"black",
"white",
"black",
"gold",
"",
10,
"normal","bold","verdana,arial,helvetica,sans-serif",2,"/nincludes/arrow.jpg",
,"66ffff","000099","","","","ffffff","000099","",
]

addmenu(menu=["mainmenu"
,97,0,130,,,style1,1,"left",,,1,,,32,,,,,,,
,"&nbsp;","show-menu=artsSearch","http://www.wwar.com/browse.html","Search the Arts",0
,"&nbsp;","","","",0
,"&nbsp;","show-menu=artistPortfolios","http://www.absolutearts.com/portfolios/","Artist Portfolios",0
,"&nbsp;","show-menu=artsNews","http://www.absolutearts.com","Arts News",0
,"&nbsp;","show-menu=marketplace","http://www.wwar.com/artslocator/","Marketplace",0
,"&nbsp;","show-menu=services","http://www.wwar.com/services.html","Services",0
])

addmenu(menu=["artsSearch",
,20,170,1,"",style2,,"left",effect,,,,,,,,,,,,
,"Art History","http://wwar.com/arthistory/",,,0
,"Discussion Forums","http://christo.wwar.com/cgi-bin/artsforum/discus.cgi",,,0
,"Visual Artists","http://www.wwar.com/categories/Artists/",,,0
,"22,000+ Artists in History","http://www.wwar.com/artists/",,,0
,"Artists Portfolios","http://www.absolutearts.com/portfolios/",,,0
,"Museums","http://www.wwar.com/categories/Museums/",,,0
,"Galleries, Agents, Dealers","http://www.wwar.com/categories/Commercial/",,,0
,"Online Exhibitions","http://www.wwar.com/categories/Online_Exhibitions/",,,0
,"Funding, Grants, Workshops","http://www.wwar.com/categories/Agencies/",,,0
,"Publications","http://www.wwar.com/categories/Publications/",,,0
,"Education, Academia","http://www.wwar.com/categories/Academic/",,,0
,"Art Supplies","http://www.wwar.com/categories/Commercial/Art_Supplies/",,,0
,"Employment Websites","http://www.wwar.com/employment/",,,0
,"","",,"",0
,"Performance Arts","http://www.wwar.com/categories/Dance/",,,0
,"Antiques","http://www.wwar.com/categories/Antiques/",,,0
,"Architecture","http://www.wwar.com/categories/Architecture/",,,0
,"","",,"",0
,"SEARCH BY KEYWORDS","http://www.wwar.com/search.html",,,0
,"SEARCH BY LOCATION","http://www.wwar.com/artslocator/index-locator.html",,,0
])

addmenu(menu=["artistPortfolios",
,,170,1,"",style2,,"left",effect,,,,,,,,,,,,
,"Premiere Artist Portfolios","show-menu=premiere",,"",0
,"Artist Portfolios","show-menu=portfolios",,"",0
,"","",,"",0
,"Sign In for Members","http://wwar.com",,,0
,"SIGN UP FOR A PORTFOLIO","http://www.wwar.com/portfolio.html",,,0
,"Testimonials From Artists","http://www.wwar.com/ads/testimonials.html",,,0
,"Direct Portfolio Address","http://www.absolutearts.com/yourlogin/",,,0
])

addmenu(menu=["premiere",
,,200,1,"",style2,,"left",effect,,,,,,,,,,,,
,"SIGN UP: PREMIERE PORTFOLIO","http://www.wwar.com/premiere_portfolio.html",,,0
,"","",,"",0
,"Advanced Search", "http://www.absolutearts.com/cgi-bin/portfolio/art/search-by-all.cgi",,,0
,"Newest Artwork","http://www.absolutearts.com/portfolio/newest/index.html",,,0
,"Alphabetical","http://www.absolutearts.com/portfolio/premiere-portfolios/",,,0
,"Medium - Sorted A - Z","http://www.absolutearts.com/portfolio/medium.html",,,0
,"Medium - Sorted by Theme","http://www.absolutearts.com/portfolio/media/",,,0
,"Price","http://www.absolutearts.com/portfolio/price.html",,,0
,"Size","http://www.absolutearts.com/portfolio/size.html",,,0
,"Theme","http://www.absolutearts.com/portfolio/themes/premiere-portfolios/",,,0
,"Subject Matter","http://www.absolutearts.com/portfolio/themes/premiere-portfolios/",,,0
,"Country","http://www.absolutearts.com/portfolio/countries/",,,0
,"SEARCH BY KEYWORDS","http://www.wwar.com/search.html",,,0
])

addmenu(menu=["portfolios",
,,200,1,"",style2,,"left",effect,,,,,,,,,,,,
,"SIGN UP: ARTIST PORTFOLIO","http://www.wwar.com/portfolio.html",,,0
,"","",,"",0
,"Advanced Search", "http://www.absolutearts.com/cgi-bin/portfolio/art/search-by-all.cgi",,,0
,"Newest Artwork","http://www.absolutearts.com/portfolio/newest/index.html",,,0
,"Alphabetical","http://www.absolutearts.com/portfolio/alphabetized.html",,,0
,"Medium - Sorted A - Z","http://www.absolutearts.com/portfolio/medium.html",,,0
,"Medium - Sorted by Theme","http://www.absolutearts.com/portfolio/media/",,,0
,"Price","http://www.absolutearts.com/portfolio/price.html",,,0
,"Size","http://www.absolutearts.com/portfolio/size.html",,,0
,"Theme","http://www.absolutearts.com/portfolio/themes/",,,0
,"Subject Matter","http://www.absolutearts.com/portfolio/themes/",,,0
,"Country","http://www.absolutearts.com/portfolio/countries/",,,0
,"SEARCH BY KEYWORDS","http://www.wwar.com/search.html",,,0
])

addmenu(menu=["artsNews",
,,170,1,"",style2,,"left",effect,,,,,,,,,,,,
,"ABSOLUTEARTS.COM","http://www.absolutearts.com",,,0
,"International Arts News","http://www.absolutearts.com",,,0
,"Archive 1999 - 2006","http://www.absolutearts.com/artsnews/archive/",,,0
,"Artblogs - 2004 - 2006","http://blog.absolutearts.com/",,,0
,"Subscription Center","http://www.wwar.com/news/subscription1.html",,,0
,"Live Feed of Headlines on Your Site","http://www.absolutearts.com/news-generator-form.html",,,0
])

addmenu(menu=["marketplace",
,,170,1,,style2,0,"left",effect,0,,,,,,,,,,,
,"Mailing Lists for Sale","https://richter.wwar.com/orders/",,,0
,"Art Books for Sale","https://richter.wwar.com/orders/books/",,,0
,"Premiere Artist Portfolios","show-menu=marketPremiere",,"",0
,"Artist Portfolios","show-menu=marketPortfolios",,"",0
,"Arts for Sale","show-menu=artForSale",,"",0
,"Arts Locator","http://www.wwar.com/artslocator/",,,0
])

addmenu(menu=["marketPremiere",
,,200,1,"",style2,,"left",effect,,,,,,,,,,,,
,"Alphabetical","http://www.absolutearts.com/portfolio/premiere-portfolios/",,,0
,"Medium - Sorted A - Z","http://www.absolutearts.com/portfolio/medium.html",,,0
,"Medium - Sorted by Theme","http://www.absolutearts.com/portfolio/media/",,,0
,"Price","http://www.absolutearts.com/portfolio/price.html",,,0
,"Size","http://www.absolutearts.com/portfolio/size.html",,,0
,"Theme","http://www.absolutearts.com/portfolio/themes/premiere-portfolios/",,,0
,"Subject Matter","http://www.absolutearts.com/portfolio/themes/premiere-portfolios/",,,0
,"Country","http://www.absolutearts.com/portfolio/countries/",,,0
,"SEARCH BY KEYWORDS","http://www.wwar.com/search.html",,,0
])

addmenu(menu=["marketPortfolios",
,,200,1,"",style2,,"left",effect,,,,,,,,,,,,
,"Alphabetical","http://www.absolutearts.com/portfolio/alphabetized.html",,,0
,"Medium - Sorted A - Z","http://www.absolutearts.com/portfolio/medium.html",,,0
,"Medium - Sorted by Theme","http://www.absolutearts.com/portfolio/media/",,,0
,"Price","http://www.absolutearts.com/portfolio/price.html",,,0
,"Size","http://www.absolutearts.com/portfolio/size.html",,,0
,"Theme","http://www.absolutearts.com/portfolio/themes/",,,0
,"Subject Matter","http://www.absolutearts.com/portfolio/themes/",,,0
,"Country","http://www.absolutearts.com/portfolio/countries/",,,0
,"SEARCH BY KEYWORDS","http://www.wwar.com/search.html",,,0
])

addmenu(menu=["artForSale",
,,200,1,"",style2,,"left",effect,,,,,,,,,,,,
,"Alphabetical","http://www.absolutearts.com/portfolio/alphabetized.html",,,0
,"Medium - Sorted A - Z","http://www.absolutearts.com/portfolio/medium.html",,,0
,"Medium - Sorted by Theme","http://www.absolutearts.com/portfolio/media/",,,0
,"Price","http://www.absolutearts.com/portfolio/price.html",,,0
,"Size","http://www.absolutearts.com/portfolio/size.html",,,0
,"Theme","http://www.absolutearts.com/portfolio/themes/",,,0
,"Subject Matter","http://www.absolutearts.com/portfolio/themes/",,,0
,"Country","http://www.absolutearts.com/portfolio/countries/",,,0
,"SEARCH BY KEYWORDS","http://www.wwar.com/search.html",,,0
])

addmenu(menu=["services",
,,140,1,"",style2,,"",effect,,,,,,,,,,,,
,"Privacy Policy", "http://wwar.com/privacy_policy.html",,,0
,"Add Your Website", "show-menu=addWebsite",,"",0
,"Advertising Opportunities", "show-menu=advertising",,"",0
,"Press Information", "http://wwar.com/press/",,,0
,"Employment Opportunities", "http://wwar.com/about/jobs.html",,,0
,"Discussion Forums", "http://wwar.com/cgi-bin/bbs/BBS/bbs_entrance.cgi",,,0
,"Classified Ads", "http://wwar.com/classpro/viewads.html",,,0
,"Arts Resumes", "http://wwar.com/employment-resume/",,,0
,"Art E-Cards", "http://wwar.com/postcard/",,,0
])

addmenu(menu=["addWebsite",
,,200,1,"",style2,,"",effect,,,,,,,,,,,,
,"Add Your Website", "http://wwar.com/register.html",,,0
,"Check Submission Status", "http://wwar.com/check-submissions.html",,,0
])

addmenu(menu=["advertising",
,,200,1,"",style2,,"",effect,,,,,,,,,,,,
,"Reviews & Clients", "http://wwar.com/ads/reviews.html",,,0
,"Rates & Payments", "http://wwar.com/ads/rates.html",,,0
,"Technical Specifications", "http://wwar.com/ads/technical.html",,,0
,"Terms and Conditions", "http://wwar.com/ads/terms.html",,,0
,"Contact Details", "http://wwar.com/ads/contacts.html",,,0
,"People at wwar.com", "http://wwar.com/ads/about.html",,,0
])

dumpmenus()
