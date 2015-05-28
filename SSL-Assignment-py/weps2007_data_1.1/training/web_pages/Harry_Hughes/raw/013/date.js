/* */
// showCalendar without requirements for unique id's
//	@me	DOMNode context node
//	@calId	String	id of calendar node
//	@dt	String	'checkin' or 'checkout' prefix
function showCalendar(me, calId, dt){
	getDimensions(me);
    if (document.getElementById){
        var c = document.getElementById(calId);
        //var i = document.getElementById(img);
        //var f = document.getElementById(frm);
		var i = getChildImage(me);
		var f = DOM.getParentOrSelf(me, 'form');
        //calendar.calfrm = frm;
        calendar.cal = c;
        calendar.caldt = dt;
        calendar.calf = f;
        var my = f[dt + '_year_month'].value.split("-");
        y=my[0];m=my[1];d=f[ dt + '_monthday'].value;
        buildCal(y,m,d);
//        var l=0; var t=0;
//        aTag = i;
//        do {
//            aTag = aTag.offsetParent;
//            l += aTag.offsetLeft;
//            t += aTag.offsetTop;
//        } while (aTag.offsetParent && aTag.tagName != 'BODY');
//        var left =  i.offsetLeft + l;
//        var top = i.offsetTop + t + i.offsetHeight + 2;
		var box = getDimensions(i);
		var left = box.x, top = (box.y + i.offsetHeight);
        c.style.left = left+'px';
        c.style.top = top+'px';
        c.style.display="block";
	}
}

function closeCal() {
    calendar.cal.style.display='none';
}

function buildCal(y,m,d){
    var daysInMonth=[31,0,31,30,31,30,31,31,30,31,30,31];
    td=new Date();
    if (!y) y = td.getFullYear();
    if (!m) m = td.getMonth()+1;
    if (!d) d = td.getDate;
	//var frm = calendar.calfrm;
    var dt = calendar.caldt;

    var mDate = new Date(y, m-1, 1);
    var firstMonthDay = mDate.getDay();
    daysInMonth[1]=(((mDate.getFullYear()%100!=0)
        &&(mDate.getFullYear()%4==0)) || (mDate.getFullYear()%400==0))?29:28;

    var t='<table class="caltable" cellspacing="0"><tr>';
    t+='<td class="calheader" colspan="7" class="monthYear">';
    if (y==td.getFullYear() && m==td.getMonth()+1) {
        t+='<img class="calNoPrevMonth" src="' + tr.icons + '/transparent.png" width="24" height="24" alt="'+tr.prevMonth+'">';
    }
    else {
        t+='<a class="calPrevMonth" href="" onclick="prevMonth('+y+','+m+'); return false;" title="'+tr.prevMonth+'"><img src="' + tr.icons + '/transparent.png" width="24" height="24" alt="'+tr.prevMonth+'"></a>';
    }
    t+='&nbsp;<select name="ym" onchange="goYearMonth(this.options[this.selectedIndex].value)">';
    var mn=td.getMonth()+1;var yr=td.getFullYear();
    var last_month=0;
    for(n=0;n<=11;n++){
        t+='<option value="' + yr + '-' + mn + '"';
        if (mn == m && yr == y) {
            t+=' selected="selected"';
            last_month=1;
        } else {
            last_month=0;
        }
        t+='>' + months[mn-1] + ' ' + yr +'</option>';
        mn++; if (mn>12) { mn=1;yr++ }
    }
    t+= ' </select>&nbsp;';
    if (last_month==1) {
        t+='<img class="calNoNextMonth" src="' + tr.icons + '/transparent.png" width="24" height="24" alt="' + tr.nextMonth + '">';
    }
    else {
        t+='<a class="calNextMonth" href="" onclick="nextMonth('+y+','+m+'); return false;" title="' + tr.nextMonth +'"><img src="' + tr.icons + '/transparent.png" width="24" height="24" alt="' + tr.nextMonth + '"></a>';
    }
    t+='</td></tr>';
    t+='<tr class="dayNames">';
    for(dn=0;dn<7;dn++){
        var cl = '';
        if ((dn%7==5) || (dn%7 == 6)) cl += ' weekend';
        t+='<td class="'+cl+'">'+days[dn]+'</td>';
    }
    t+='</tr><tr class="days">';
    for(i=1;i<=42;i++){
        var x = i - (firstMonthDay+6)%7;
        if (x > daysInMonth[m-1] || x <1) x = '&nbsp;';
        var cl = '';
        var href = 0;
        if ((i%7==0) || (i%7 == 6)) cl += ' weekend';
        if (x>0){
            var xDay = new Date(y, m-1, x);
            if ((xDay.getFullYear() == y) && (xDay.getMonth()+1 == m)
                && (xDay.getDate() == d))
                { cl += ' selected' ; href=1}
            if ((xDay.getFullYear() == td.getFullYear())
                && (xDay.getMonth() == td.getMonth())
                && (xDay.getDate() == td.getDate()))
                { cl += ' today'; href=1;}
            else {
                if (xDay > td){ cl += ' future'; href=1; }
                else {
                    if (xDay < td) { cl += ' past'}
                }
            }
        };
        t+='<td class="'+cl+'">';
        if (href){
            t+='<a href="#" onclick="pickDate('+y+','+m+','+x+',\''+dt+'\'); return false;">'+x+'</a>';
        } else {
            t+=x;
        }
        t+='</td>';
        if(((i)%7==0)&&(i<36)) {
            t+='</tr><tr class="days">';
        }
    }
    t+='</tr><tr><td colspan="7"><a href="#" onclick="closeCal();return false;">' + tr.closeCalendar + '</a></td></tr></table>';
    document.getElementById("calendar").innerHTML= t;
}

function prevMonth(y,m) {
    if (new Date(y,m-1,1) < td) return;
    if (m > 1) {m--} else {m = 12; y--};
    buildCal(y,m);
}

//does this finction need to check for max month/year?
function nextMonth(y,m) {
    if (m<12){m++;} else {m=1;y++;}
    buildCal(y,m);
}

function goYearMonth(ym){
	var ymlist = ym.split("-");
    buildCal(ymlist[0],ymlist[1]);
}

function pickDate(y,m,d,dt){
    // set form values
    var f = calendar.calf;
    var dt = calendar.caldt;
    f[dt + '_year_month'].value = y + "-"  + m;
    f[dt + '_monthday'].value = d;
	tickCheckBox('availcheck');
	if (dt == "checkin"){
		checkDateOrder(f, 'checkin_monthday', 'checkin_year_month', 'checkout_monthday', 'checkout_year_month');
	}
    closeCal();
	updateDaySelect(f);
}

function initDaySelect() {
	var forms = document.getElementsByTagName('form');
	for(var i=0; i<forms.length; i++)
		if(forms[i]['checkin_monthday'])
			updateDaySelect(forms[i]);
}

// XXX: Hack
// TODO: Create generic event-adding
// XXX: Duplicate, see base.js
//window.onload = initDaySelect;

function updateDaySelect( me ) {

	// 1-2 testing
	if(!days3) return;
	
	// IE5/Mac not supported
	if(gClientIsIE5 && gClientIsMac)
		return;
	
	var frm = DOM.getParentOrSelf(me, 'form');
	
  // Check if we have all fields. If not, we are in the first stage
  // of the book process and should not auto-update selects since there
  // is only the check-in select and the amount of nights.
	if(!frm['checkin_monthday'] || !frm['checkout_monthday'] || !frm['checkin_year_month'] || !frm['checkout_year_month'])
    return;
  
  var ci_d = frm['checkin_monthday'];
	var co_d = frm['checkout_monthday'];
	var ci_my = frm['checkin_year_month'].value.split("-");
	var co_my = frm['checkout_year_month'].value.split("-");
	
	var ci_sel = ci_d.selectedIndex;
	var co_sel = co_d.selectedIndex;

	var monthDays = [], opt;
	
	// Checkin month
	monthDays = buildDaysForMonth(ci_my[0], ci_my[1]);
	ci_d.innerHTML = '';
	for(var i = 0; i < monthDays.length; i++) {
		opt = document.createElement('option');
		opt.innerHTML = (monthDays[i] + ' ' + (i+1));
		opt.value = (i+1);
		ci_d.appendChild(opt);
	}
	ci_d.options[ci_sel].defaultSelected = ci_d.options[ci_sel].selected = true;

	// Checkout month
	monthDays = buildDaysForMonth(co_my[0], co_my[1]);
	co_d.innerHTML = '';
	for(var i = 0; i < monthDays.length; i++) {
		opt = document.createElement('option');
		opt.innerHTML = (monthDays[i] + ' ' + (i+1));
		opt.value = (i+1);
		co_d.appendChild(opt);
	}
	co_d.options[co_sel].defaultSelected = co_d.options[co_sel].selected = true;
}

function buildDaysForMonth( year, month ) {
	// Month index starts on 0(-11) in Date()-object
	var monthDate = new Date(year, month-1);
	var orgMonth = monthDate.getMonth();
	var dayArray = [], weekDay;
	while(monthDate.getMonth() == orgMonth) {
		// Week starts on Sunday in Date()-object
		weekDay = (monthDate.getDay() == 0) ? 6 : (monthDate.getDay()-1);
		dayArray.push(days3[weekDay]);
		monthDate.setDate(monthDate.getDate()+1);
	}
	return dayArray;
}



function checkDateOrder(me, ci_day, ci_month_year, co_day, co_month_year) {
	if (document.getElementById) {
		//var frm = document.getElementById(frm);
		// Do findup to get form instead of fixed id
		var frm = DOM.getParentOrSelf(me, 'form');

		// create date object from checkin values
		// set date to 12:00 to avoid problems with one
		// date being wintertime and the other summertime
		var my = frm[ci_month_year].value.split("-");
	    var ci = new Date (my[0], my[1]-1, frm[ci_day].value, 12, 0, 0, 0);

        // create date object from checkout values
	    my = frm[co_month_year].value.split("-");
	    var co = new Date (my[0], my[1]-1, frm[co_day].value, 12, 0, 0, 0);


		// if checkin date is at or after checkout date,
		// add a day full of milliseconds, and set the
		// selectbox values for checkout date to new value
	    if (ci >= co){
    	    co.setTime(ci.getTime() + 1000 * 60 * 60 * 24);
	        frm[co_day].value =  co.getDate();
    	    var com = co.getMonth()+1;
	        frm[co_month_year].value = co.getFullYear() + "-" + com;
    	}
	}
}

// Hides "Available rooms" and shows date input for stay.
// This currently works without unique id's under the assumption that
// the two (or more) divs containing the different "views" are in the same container.
function switchDateStack(me, page) {
	var stackPage = DOM.getParentOrSelf(me, 'div');
	var stackCount = 0;
	while(stackPage) {
		if(stackPage.nodeName.toLowerCase() == 'div') {
			stackCount++
			if(stackCount == page) {
				stackPage.style.display = 'block';
				//break;
			}
			else
				stackPage.style.display = 'none';
		}
		stackPage = stackPage.nextSibling;
	}
}

// Searches children to find image
function getChildImage( contextElm ) {
	contextElm = contextElm.firstChild;
	while(contextElm.nodeName.toLowerCase() != 'img' && contextElm.nextSibling)
		contextElm = contextElm.nextSibling;
	return contextElm;
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// OBSOLETE - use DOM.getParentOrSelf in base.js instead
// Searches upwards from the current context element until it finds the specified tag
function getParentOrSelf( contextElm, nodeName ) {
	nodeName = nodeName.toLowerCase();
	while(contextElm.nodeName.toLowerCase() != nodeName && contextElm.parentNode)
		contextElm = contextElm.parentNode;
	return contextElm;
}
