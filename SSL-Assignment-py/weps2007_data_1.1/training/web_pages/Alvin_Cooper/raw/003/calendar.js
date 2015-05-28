 function makeArray() 
{
  var args = makeArray.arguments;
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
this.length = args.length;
}
function fixDate(date) 
{
  var base = new Date(0);
  var skew = base.getTime();
  if (skew > 0)
    date.setTime(date.getTime() - skew);
}
function getString(date) {
  var months = new makeArray("January","February", "March","April","May","June","July","August","September","October","November","December");
return months[date];
}

document.write("<table bgcolor=#999966 border=0 cellpadding=2 cellspacing=0 width=100 height=102 id=caltable align=center><tr><td colspan=7><center>");
var c = new Date();
fixDate(c);

var mdays = new makeArray (31,30,31,30,31,30,31,31,30,31,30,31), days= new Array(28);
var m=0, mm1=-1, mp1=-1,luna=0,lp=0;
var index=7+c.getDay()+1;
var value=c.getDate()+1;
var thisyear=c.getYear();
var lastyear=c.getYear()-1;
var nextyear=c.getYear()+1;
var color="#C0C085";
var offcolor="#999966";



m=c.getMonth();
for (var j = index; j >=0; j--) 
{
value--;
if (value<1) {mm1= (m==0)?11:(m-1);value=mdays[mm1];}
days[j]=value; 
}
 value=c.getDate();
for (var j = index+1; j<=28; j++) 
{
value++;
if (value>mdays[m]) {value=1;mp1= (m==11)?0:(m+1);}
days[j]=value; 
}
if (mp1==-1) {luna=mm1;lp=m}; else {luna=m;lp=mp1;}
if (mp1==-1) if (mm1==-1) {luna=m;lp=mp1;}
if (mp1==mm1) document.write(getString(luna)); 
else
document.write(getString(luna),"/", getString(lp)); 
// Debug vars
//  document.write("<br>m=",m ) ; 
//  document.write("<br>mm1=",mm1 ) ; 
//  document.write("<br>mp1=",mp1 ) ;
//  document.write("<br>luna=",luna ) ;
//  document.write("<br>lp=",lp ) ;
var a="</center> </td><td class=LNK><center>" ; 
document.write("</font></center></td></tr><tr><td><center> S",a," M",a," T",a," W",a," T",a," F",a," S</center> </td></tr>");
for (var j = 1; j <=4; j++) {
document.write("<tr>" ) ; 
for (var i = j*7-6; i <=j*7; i++) {
if (i>1) if (days[i]<days[i-1]) {luna=lp; color=offcolor};
var showyear = thisyear;
if (m==11) if (mp1==0) if (luna==0) {showyear=nextyear};
if (m==0) if (mm1==11) if (luna==11) {showyear=lastyear};
document.write(" <td bgcolor=",color,"><center><a  href=http://go.northbay.pressdemocrat.com/calendar/index.cfm?fuseaction=displayEvents.eventsByDate&date=",luna+1,"%2F",days[i],"%2F",showyear,"&ps=argus class=ink>",days[i],"</a></center></td>" ) ; 

 }
 document.write("</tr>" ) ; 
 }
 document.write("</table>" ) ; 
 

