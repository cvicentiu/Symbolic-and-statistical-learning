var top_menu_item_text = new Array()
var top_menu_item_link = new Array()
var sub_menu_item = new Array()

top_menu_item_text[0] = "Home"
top_menu_item_link[0] = "http://www.nationalreview.com/"

top_menu_item_text[1] = "Blog Row"
top_menu_item_text[2] = "Subscribe"
top_menu_item_text[3] = "Search"
top_menu_item_text[4] = "NR / Digital"

top_menu_item_text[5] = "Classifieds"
top_menu_item_link[5] = "http://store.nationalreview.com/classifieds/"

top_menu_item_text[6] = "Shop!"

top_menu_item_text[7] = "Donate"
top_menu_item_link[7] = "https://store.nationalreview.com/donate/"

top_menu_item_text[8] = "Media Kit"
top_menu_item_link[8] = "http://www.nationalreview.com/mediakit/"

top_menu_item_text[9] = "Contact"
top_menu_item_link[9] = "http://www.nationalreview.com/contact/"

sub_menu_item[0] = 	new Array(
				new Array("At War", "http://atwar.nationalreview.com/"),
				new Array("Books", "http://books.nationalreview.com/"),
				new Array("Culture", "http://culture.nationalreview.com/"),
				new Array("Financial", "http://financial.nationalreview.com/"),
				new Array("Politics", "http://politics.nationalreview.com/")
			)



sub_menu_item[1] = 	new Array(
				new Array("Bench Memos", "http://bench.nationalreview.com/"),
				new Array("The Corner", "http://corner.nationalreview.com/"),
				new Array("David Frum", "http://frum.nationalreview.com/"),
				new Array("The Hillary Spot", "http://hillaryspot.nationalreview.com/"),
				new Array("Mark Levin", "http://levin.nationalreview.com/"),
				new Array("Media Blog", "http://media.nationalreview.com/"),
				new Array("Phi Beta Cons", "http://phibetacons.nationalreview.com/"),
				new Array("Planet Gore", "http://planetgore.nationalreview.com/"),
				new Array("David Pryce-Jones", "http://pryce-jones.nationalreview.com/")
			)

sub_menu_item[2] = 	new Array(
				new Array("NR Magazine", "https://www.kable.com/pub/ntrv/subUpdate.asp?where=1&theStyle=COABETA"),
				new Array("NR Digital", "https://www.kable.com/pub/onnr/subupdate.asp?where=1&theStyle=COABETA"),
				new Array("Gift Subscription", "http://beta.nationalreview.com/subscribe/"),
				new Array("Renew NR Print", "https://www.kable.com/pub/ntrv/renew.asp?theStyle=COABETA"),
				new Array("Renew NR Digital", "https://www.kable.com/pub/onnr/renew.asp?theStyle=COABETA"),
				new Array("Change Address - NR Print", "https://www.kable.com/pub/ntrv/coa.asp?theStyle=COABETA"),
				new Array("Change Address - NR Digital", "https://www.kable.com/pub/onnr/coa.asp?theStyle=COABETA"),
				new Array("Account Status - NR Print", "https://www.kable.com/pub/ntrv/status.asp?theStyle=COABETA")
			)

sub_menu_item[3] = 	new Array(
				new Array("National Review Online", "http://search.nationalreview.com/"),
				new Array("NRO Authors", "http://author.nationalreview.com/"),
				new Array("Syndicated Columnists", "http://syndicated.nationalreview.com/"),
				new Array("NR Magazine (pre-2003)", "http://store.nationalreview.com/archives/"),
				new Array("NR Magazine (post-2003)", "http://search.nationalreview.com/?s=NQ==")
			)

sub_menu_item[4] = 	new Array(
				new Array("NR / Digital Home", "http://nrd.nationalreview.com/"),
				new Array("NR / Digital Login", "http://nrd.nationalreview.com/login/"),
				new Array("Search", "http://search.nationalreview.com/")
			)

sub_menu_item[6] = 	new Array(
				new Array("NRO Store Home", "http://store.nationalreview.com/"),
				new Array("Accessories", "http://store.nationalreview.com/?ic=Mw=="),
				new Array("Books", "http://store.nationalreview.com/?ic=Mg=="),
				new Array("Clothing", "http://store.nationalreview.com/?ic=MQ=="),
				new Array("Specials", "http://store.nationalreview.com/?ic=NQ=="),
				new Array("Stationery", "http://store.nationalreview.com/?ic=Ng==")
			)


function show_menu(menu_number)
{
	var topHTML = ""
	var subHTML = ""
	var allHTML = ""

	allHTML  = top_menu(menu_number)
	allHTML += sub_menu(menu_number)

	if (!document.getElementById('menu'))
	{
		document.write('<div id="menu" style="margin: 0px; border:0px; padding:0px;">')
		document.write('</div>')
	}

	document.getElementById('menu').innerHTML = allHTML
}

function top_menu(menu_number)
{
	var topHTML = ""
	var style_class = ""
	topHTML  = '<table cellpadding=0 cellspacing=0 width=100%><tr><td class="off_fill">'
	topHTML += '<table cellpadding=0 cellspacing=0><tr>'
	for(i=0;i<top_menu_item_text.length;i++)
	{
		if (i == menu_number)
		{
			style_class = "on"
		} else {
			style_class = "off"
		}
		topHTML += '<td class="'+style_class+'">'
		topHTML += '&nbsp;&nbsp;&nbsp;&nbsp;'
		if (top_menu_item_link[i])
		{
			topHTML += '<a href="'+top_menu_item_link[i]+'" class="link_'+style_class+'">'+top_menu_item_text[i]+'</a>'
		} else {
			topHTML += '<a href="javascript:void(0)" onClick="javascript: show_menu('+i+');" class="link_'+style_class+'">'+top_menu_item_text[i]+'</a>'
		}
		topHTML += '&nbsp;&nbsp;&nbsp;&nbsp;'
		topHTML += '</td>'
		topHTML += '<td class="off_divider" width=1> </td>'
	}
	topHTML += '</table>'
	topHTML += '</td></tr></table>'
	return topHTML
}

function sub_menu(menu_number)
{
	var subHTML = ""
	var subber = ""
	subHTML  = '<table cellpadding=0 cellspacing=0 width=100%><tr><td class="on_sub">'
	subHTML += '<table cellpadding=0 cellspacing=0><tr>'
	if (sub_menu_item[menu_number])
	{
		for(i=0;i<sub_menu_item[menu_number].length;i++)
		{
			if (i == 6)
			{
				subber = "_sub"
				subHTML += '</tr></table>\r\n'
				subHTML += '</td></tr></table>\r\n'
				subHTML += '<table cellpadding=0 cellspacing=0 width=100%><tr><td name="sub_sub" class="on_sub_sub">\r\n'
				subHTML += '<table cellpadding=0 cellspacing=0><tr>\r\n'
			}
			subHTML += '<td class="on_sub'+subber+'">'
			subHTML += '&nbsp;&nbsp;&nbsp;&nbsp;'
			subHTML += '<a href="'+sub_menu_item[menu_number][i][1]+'" class="link_sub">'+sub_menu_item[menu_number][i][0]+'</a>'
			subHTML += '&nbsp;&nbsp;&nbsp;&nbsp;'
			subHTML += '</td>'
			subHTML += '<td class="sub_divider" width=1> </td>'
		}
	}
	subHTML += '</table>'
	subHTML += '</td></tr></table>'
	return subHTML
}

function replaceAll( str, from, to )
{
	var idx = str.indexOf( from );

	while ( idx > -1 )
	{
        	str = str.replace( from, to )
	        idx = str.indexOf( from )
	}

	return str
}
