if(!Array.prototype.push){Array.prototype.push=function(){for(var i=0;i<arguments.length;i++)this[this.length]=arguments[i];};};function name_values($a){var $b=new Array();var rc="\235";var $a=$a.replace(/\\\;/g,rc);var $z=new RegExp("[a-zA-Z0-9]+\=[\<\>\/:#a-zA-Z0-9\-\+\., \235]+","gi");var y=$a.match($z);for(i=0;i<y.length;i++){var s=y[i].split("=");s[1]=s[1].replace(rc,";");$b[i]="v_"+s[0];eval($b[i]+" = '"+s[1]+"'");};return $b;};function chkVar($d){if(typeof(eval($d))=="number")return true;if(eval($d)&&eval($d)!="")return true;else return false;};function chkArg($e){if($e=="undefined"||$e==null||$e=="")return false;else return true;};function arrayElt($f,$g){var j=0;for(j=0;j<$f.length;j++){if($f[j].toUpperCase()==$g.toUpperCase())return j;};return "-1";};function pad2($e){if(typeof $e=="number")return($e.toString().length<2)?"0"+$e:$e;else if(typeof $e=="string")return($e.length<2)?("0"+$e):(""+$e);else return($e.toString().length<2)?"0"+$e:$e;};var $h="";var $i="";function onClickFn($j){var re=/pday/;$h=$i;$h=$h.replace(re,"'"+$j+"'");eval($h);};function kdwn($k){if(event.keyCode==13)$k.onchange();else return false;};function Today(){var d=new Date();return((d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear());};function dateAdd($l,$m,$n){var d=new Date($l);var dv=d.valueOf();var $o;if($n=="+")$o=dv+($m*(1000*60*60*24));else $o=dv-($m*(1000*60*60*24));var nd=new Date($o);return((nd.getMonth()+1)+"/"+nd.getDate()+"/"+nd.getFullYear());};function IESplit(re,st){var $p;var $q=new Array();var $r;while((x=re.exec(st))!=null){$q.push(st.substring(0,st.indexOf(x[1])));$q.push(x[1]);st=st.substr(st.indexOf(x[1])+x[1].length);};return $q;};var v_CloseOnSelect,v_AppendOrReplace,v_AppendChar,v_ReturnData;var v_InlineX,v_InlineY,v_Title,v_CurrentDate,v_AllowWeekends;var v_Resizable,v_Width,v_Height,v_SelectAfter,v_NSHierarchy;var v_SelectBefore,v_CallFunction,v_PopupX,v_PopupY,v_Holidays;var v_Nav,v_SmartNav,v_Fix,v_ShowFix,v_WeekStart,v_Weekends;var va_Holidays,v_ShortNames,v_AllowHolidays,v_Language,v_Stylesheet;var $s=new Array();var $t=new Date();var $u;var $v;var $w;var $x,$y;var cx,cy;var x,y;var $z,$A;var $B,$Z;$D=(navigator.appName.indexOf("Netscape")!=-1)?true:false;$E=(navigator.appName.indexOf("Microsoft")!=-1)?true:false;$F=(document.getElementById)?true:false;Calendar.EMonths=["January","February","March","April","May","June","July","August","September","October","November","December"];Calendar.SEMonths=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Calendar.EDOW=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];Calendar.DOMonth=[31,28,31,30,31,30,31,31,30,31,30,31];Calendar.lDOMonth=[31,29,31,30,31,30,31,31,30,31,30,31];Calendar.gInitText="Softricks.com Calendar";function Calendar($G,$H,$I,$J,$K){if(($H==null)&&($I==null))return;if($H==null){this.gMonthName=null;this.gMonth=null;this.gYearly=true;}else{this.gMonthName=Calendar.getMonthArray()[$H];this.gMonth=new Number($H);this.gYearly=false;};if($K==null)this.gType="POPUP";else this.gType=$K;this.CODE="";if(this.gType=="INLINE"){this.WHO="";this.INLINE="Calendar";}else this.WHO="window.opener.";this.gYear=$I;this.gFormat=$J;this.gReturnItem=$G;this.gTitle="Softricks.com Calendar";};Calendar.getMonthArray=Calendar_getMonthArray;Calendar.getSMonthArray=Calendar_getSMonthArray;Calendar.getDOWArray=Calendar_getDOWArray;Calendar.get_daysofmonth=Calendar_get_daysofmonth;Calendar.calc_month_year=Calendar_calc_month_year;Calendar.print=Calendar_print;Calendar.CreateCalendarLayer=Calendar_CreateCalendarLayer;Calendar.Close=Calendar_Close;Calendar.Lwwrite=Calendar_Lwwrite;Calendar.MoveTo=Calendar_MoveTo;Calendar.isWeekend=Calendar_isWeekend;Calendar.isHoliday=Calendar_isHoliday;Calendar.processDateData=Calendar_processDateData;Calendar.readDate=Calendar_readDate;function Calendar_getMonthArray(){if(!v_Language||v_Language=='E')return Calendar.EMonths;else return Calendar.Months;};function Calendar_getSMonthArray(){if(!v_Language||v_Language=='E')return Calendar.SEMonths;else return Calendar.SMonths;};function Calendar_getDOWArray(){if(!v_Language||v_Language=='E')return Calendar.EDOW;else return Calendar.DOW;};function Calendar_get_daysofmonth($L,$I){if(($I%4)==0){if(($I%100)==0&&($I%400)!=0)return Calendar.DOMonth[$L];return Calendar.lDOMonth[$L];}else return Calendar.DOMonth[$L];};function Calendar_calc_month_year($M,$N,$O){var $P=new Array();if($O==-1){if($M==0){$P[0]=11;$P[1]=parseInt($N,10)-1;}else{$P[0]=parseInt($M,10)-1;$P[1]=parseInt($N,10);}}else if($O==1){if($M==11){$P[0]=0;$P[1]=parseInt($N,10)+1;}else{$P[0]=parseInt($M,10)+1;$P[1]=parseInt($N,10);}};return $P;};function Calendar_print(){$u.print();};function Calendar_isWeekend($j){var i;for(i=0;i<$s.length;i++){if(parseInt($j)==parseInt($s[i]))return true;};return false;};function Calendar_isHoliday($j){var i=arrayElt(va_Holidays,$j);if(parseInt(i)>-1)return true;return false;};function Calendar_processDateData($Q,$R){var m;var td=Today();var $S=new RegExp("(Today)(([\\+\\-])([0-9]+))?","i");if((m=$Q.match($S))!=null){if(m[1].toUpperCase()=="TODAY"&&m[0].length>5)return dateAdd(td,m[4],m[3]);else if(m[1].toUpperCase()=="TODAY")return td;}else{return Calendar.readDate($Q,$R);}};function Calendar_readDate($l,$T){var re="";var $U=new Array();$U.push("Dummy");var $V="";var $W="";var $X="";for(i=0;i<12;i++){$X+=Calendar.getMonthArray()[i]+((i<11)?"|":"");$W+=Calendar.getSMonthArray()[i]+((i<11)?"|":"");};for(i=0;i<7;i++)$V+=Calendar.getDOWArray()[i]+((i<7)?"|":"");var $Y=IESplit(new RegExp("(DD|MM|MONTH|MON|YYYY|YY|DOW)"),$T.toUpperCase());for(i=0;i<$Y.length;i++){switch($Y[i].toUpperCase()){case "DD":re+="(\\d{1,2})";$U.push($Y[i]);break;case "DOW":re+="("+$V+")";$U.push($Y[i]);break;case "MM":re+="(\\d{1,2})";$U.push($Y[i]);break;case "MON":re+="("+$W+")";$U.push($Y[i]);break;case "MONTH":re+="("+$X+")";$U.push($Y[i]);break;case "YY":re+="(\\d{1,2})";$U.push($Y[i]);break;case "YYYY":re+="(\\d{4})";$U.push($Y[i]);break;default:re+=$Y[i];}};var $Z,$00,$01;var $02=new RegExp(re,"i");if($02.test($l)){var ma=$l.match($02);for(i=0;i<ma.length;i++){switch($U[i]){case "DD":$Z=parseInt(ma[i],10);break;case "MM":$00=parseInt(ma[i],10);break;case "MON":$00=parseInt(arrayElt(Calendar.getSMonthArray(),ma[i]),10)+1;break;case "MONTH":$00=parseInt(arrayElt(Calendar.getMonthArray(),ma[i]),10)+1;break;case "YY":$03=parseInt(ma[i],10);$01=(($03>50)?($03+1900):($03+2000));break;case "YYYY":$01=parseInt(ma[i],10);break;}}};if(!($Z||$00||$01))return null;else return(new Date($00+"/"+$Z+"/"+$01));};function Calendar_Close($04,$05){if($04=="POPUP")$u.close();if($04=="INLINE")Calendar.Lwwrite(Calendar.gInitText,$05);$u=null;};new Calendar();Calendar.prototype.getMonthlyCalendarCode=function(){var $06="";var $07="";var $08="";$06=$06+"<TABLE WIDTH='"+(v_Width-30)+"' BORDER=0>";$07=this.cal_header();$08=this.cal_data();$06=$06+$07+$08;$06=$06+"</TABLE>";return $06;};Calendar.prototype.onclickfn=function(){var $09=this.WHO+((this.gType=="POPUP")?"document."+v_NSHierarchy:"window.document."+v_NSHierarchy)+this.gReturnItem+".value";var $0a=(this.returnMode=="Replace")?" = ":" += ";var $0b="apchar = ''"+((this.returnMode=="Replace")?";":" + ")+"(("+$09+" == '') ? '' : '"+this.appendChar+"');\n"+$09+$0a+"apchar + pday;\n";return $0b;};Calendar.prototype.showSmartNavBar=function(){var $0z="<table border=0 class='innerColor'><tr><td rowspan=2>";$0z+="<select name='selMonth' class='monthEntryStyle' onchange=\""+this.WHO+"Build("+"'"+this.gReturnItem+"', document.frmCal.selMonth.selectedIndex, '"+this.gYear+"', '"+this.gFormat+"', '"+this.gType+"');\">\n";for(i=0;i<12;i++){$0z+="<option value=\"" + i + "\" ";if(parseInt(this.gMonth)==i)$0z+="selected";$0z+=" CLASS='monthEntryStyle'>"+Calendar.getMonthArray()[i]+"</option>\n";};$0z+="<\/select>\n</td><td rowspan=2>";$0z+="<input name=\"cy\" size=4 maxlength=4 value=\""+this.gYear+"\" onchange=\""+"javascript:"+this.WHO+"Build("+"'"+this.gReturnItem+"', '"+this.gMonth+"', document.frmCal.cy.value, '"+this.gFormat+"', '"+this.gType+"');\" "+"onkeydown=\"javascript:kdwn(this);\" "+"class='yearEntryStyle'>\n";$0z+="</td><td>"+"<A HREF=\"javascript:void(0);\" onClick=\"document.frmCal.cy.value++;document.frmCal.cy.onchange();return false;\" "+"class='yearArrowStyle'>^</A>"+"</td></tr><tr><td>"+"<A HREF=\"javascript:void(0);\" onClick=\"document.frmCal.cy.value--;document.frmCal.cy.onchange();return false;\" "+"class='yearArrowStyle'>v</A>"+"</td></tr></table>";this.wwrite($0z);};Calendar.prototype.show=function(){var $06="";this.wwrite("<html>");this.wwrite("<head><title>Calendar:"+this.gTitle+"</title>");if(this.gType=="POPUP"){this.wwrite("<LINK REL=stylesheet TYPE=\"text/css\" HREF=\""+v_Stylesheet+"\"><LINK REL=stylesheet TYPE=\"text/css\" HREF=\"../ssi/borage/jsCalendar.css\">");this.wwrite("<script language='javascript'>"+"function onClickFn(pday) {\n"+this.onclickfn()+"}\n<\/script>");}else $i=this.onclickfn();if(v_SmartNav=="Yes"&&this.gType=="POPUP")this.wwrite("<script language='javascript1.2'>\n"+"function kdwn(pthis) {"+"if (event.keyCode == 13) pthis.onchange(); else return false;};\n"+"</script>");this.wwrite("</head>");this.wwrite("<body onload=\"window.focus();\">");this.wwrite("<form name=\"frmCal\" onsubmit=\"return false;\">");this.wwrite("<TABLE WIDTH='"+(v_Width-30)+"' BORDER=0 CELLPADDING=0 CELLSPACING=2 CLASS='borderColor'><TR><TD>"+"<TABLE BORDER=0 WIDTH='100%' CELLPADDING=1 CELLSPACING=0 CLASS='innerColor'>"+"<TR><TD CLASS='titleStyle'>"+this.gTitle+"</TD><TD CLASS='titleStyle' ALIGN=RIGHT>"+"<A HREF='javascript:"+this.WHO+"Calendar.Close(\"" + this.gType + "\", \"" + this.INLINE + "\");' "+"CLASS='titleStyle'>"+"x</A></TD></TR><TR>");this.wwrite("<TD CLASS='headerStyle'><div id=footer></div><div id=headline class=headerStyleMonth>"+this.gMonthName+" "+this.gYear+"</div></TD>");this.wwrite("<TD CLASS='headerStyle' ALIGN=RIGHT>"+((v_ShowFix=="No")?"":("Fix"+"<INPUT TYPE=CHECKBOX NAME=fixCheck "+((v_Fix=="Yes")?"CHECKED ":"")+"onClick=\""+((this.gType=="POPUP")?"alert('Fixing Window')":"fixCal(this.checked);")+"\">"))+"</TD></TR><TR><TD COLSPAN=2 CLASS='headerStyle'>");if(v_SmartNav=="Yes")this.showSmartNavBar();var $0d=Calendar.calc_month_year(this.gMonth,this.gYear,-1);var $0e=$0d[0];var $0f=$0d[1];var $0g=Calendar.calc_month_year(this.gMonth,this.gYear,1);var $0h=$0g[0];var $0i=$0g[1];if(v_Nav=="Yes"){this.wwrite("<TABLE WIDTH='"+(v_Width-30)+"' BORDER=0 CELLSPACING=2 CELLPADDING=0 CLASS='navStyle'><TR><TD class=flickButton ALIGN=center>");this.wwrite("[<A HREF=\""+"javascript:"+this.WHO+"Build("+"'"+this.gReturnItem+"', '"+this.gMonth+"', '"+(parseInt(this.gYear,10)-1)+"', '"+this.gFormat+"', '"+this.gType+"'"+");\"><<<\/A>]</TD><TD class=flickButton ALIGN=center>");this.wwrite("[<A HREF=\""+"javascript:"+this.WHO+"Build("+"'"+this.gReturnItem+"', '"+$0e+"', '"+$0f+"', '"+this.gFormat+"', '"+this.gType+"'"+");\"><<\/A>]</TD><TD class=flickButton ALIGN=center>");this.wwrite("[<A HREF=\"javascript:window.print();\">"+((v_ShortNames=="Yes")?"P":"Print")+"</A>]</TD><TD  class=flickButton ALIGN=center>");this.wwrite("[<A HREF=\""+"javascript:"+this.WHO+"Build("+"'"+this.gReturnItem+"', '"+$t.getMonth()+"', '"+$t.getFullYear()+"', '"+this.gFormat+"', '"+this.gType+"'"+");\">"+((v_ShortNames=="Yes")?"*":"Today")+"<\/A>]</TD><TD class=flickButton ALIGN=center>");this.wwrite("[<A HREF=\""+"javascript:"+this.WHO+"Build("+"'"+this.gReturnItem+"', '"+$0h+"', '"+$0i+"', '"+this.gFormat+"', '"+this.gType+"'"+");\">><\/A>]</TD><TD  class=flickButton  ALIGN=center>");this.wwrite("[<A HREF=\""+"javascript:"+this.WHO+"Build("+"'"+this.gReturnItem+"', '"+this.gMonth+"', '"+(parseInt(this.gYear,10)+1)+"', '"+this.gFormat+"', '"+this.gType+"'"+");\">>><\/A>]</TD></TR></TABLE>");}$06=this.getMonthlyCalendarCode();this.wwrite($06);this.wwrite("</TD></TR></TABLE></TD></TR></TABLE>");this.wwrite("</form>");this.wwrite("</body></html>");if(this.gType=="POPUP"){$u.document.open("text/html","replace");$u.document.writeln(this.CODE);$u.document.close();}if(this.gType=="INLINE")Calendar.Lwwrite(this.CODE,this.INLINE);};Calendar.prototype.cal_header=function(){var $06="";var i=0,j=0;$06=$06+"<TR>";for(i=v_WeekStart,j=0;j<7;i++,j++,i=i%7)$06=$06+"<TD WIDTH='"+((i==6)?16:14)+"%' CLASS='weekdayHeaderStyle'>"+((v_ShortNames=="Yes")?Calendar.getDOWArray()[i].substring(0,1):Calendar.getDOWArray()[i].substring(0,3))+"</TD>";$06=$06+"</TR>";return $06;};Calendar.prototype.cal_data=function(){var $0j=new Date();$0j.setDate(1);$0j.setMonth(this.gMonth);$0j.setFullYear(this.gYear);var $0k=$0j.getDay();var $0l=1;var $0m=Calendar.get_daysofmonth(this.gMonth,this.gYear);var $0n=0,j=0;var $06="";if(this.closeable){$0o=((this.gType=="POPUP")?"window.close();":"");$0p="Calendar.Close(\"" + this.gType + "\", \"" + this.INLINE + "\"); ";}else{$0o="";$0p="void(0);' ";}var $09=this.WHO+((this.gType=="POPUP")?"document.":"window.document.")+this.gReturnItem+".value";$06=$06+"<TR>";for(j=v_WeekStart,i=0;j!=$0k;j++,i++,j=j%7){$06=$06+"<TD WIDTH='14%' "+this.applySpecialStyle(0,j,"9999")+">&nbsp;</TD>";}for(j=$0k;i<7;j++,i++,j=j%7){$06=this.createDates($06,$0j,$0l,j);$0l=$0l+1;}$06=$06+"</TR>";for(k=2;k<7;k++){$06=$06+"<TR>";for(j=v_WeekStart,i=0;i<7;j++,i++,j=j%7){$06=this.createDates($06,$0j,$0l,j);$0l=$0l+1;if($0l>$0m){$0n=1;break;}}if(i==6)$06=$06+"</TR>";if($0n==1)break;}for(m=1;m<(7-i);m++){j=(j+1)%7;if(this.gYearly)$06=$06+"<TD WIDTH='14%'"+this.applySpecialStyle(0,j,"9999",1)+">&nbsp;</TD>";else $06=$06+"<TD WIDTH='14%' "+this.applySpecialStyle(0,j,"9999",1)+">"+m+"</TD>";}return $06;};

Calendar.prototype.createDates=function($0q,$0r,$0s,pj)
{
    var date_txt = $0r+" ";
    var date_array = date_txt.split(" ");
    var date_all = date_array[0] + " " + date_array[1] + " " + date_array[2] + " " + date_array[3];
    var $0t="";var $0u="";var $0v="";$0r.setDate($0s);$0v=String(pad2(this.gMonth+1))+String(pad2($0s));if((this.gAllowWeekends=="No"&&Calendar.isWeekend(pj))||($0r<v_SelectAfter||$0r>v_SelectBefore)||(this.gAllowHolidays=="No"&&Calendar.isHoliday($0v))){$0t="";$0u="";}else{$0t="<A HREF='javascript:"+((this.CallFunction!="")?(this.WHO+this.CallFunction+"();"):"")+$0p+"' "+" onmouseover=\"document.getElementById('footer').innerHTML='"+date_all+"';\" onmouseout=\"document.getElementById('footer').innerHTML='';\" onclick=\"onClickFn('"+((this.returnData=="Date")?this.format_data($0s):this.format_dow($0s))+"');"+((this.CallFunction!="")?(this.WHO+this.CallFunction+"();"):"")+$0o+"return true;"+"\" "+(Calendar.isHoliday($0v)?"CLASS='holidayLinkStyle'":"CLASS='linkStyle'")+">";$0u="<\/A>";}$0q=$0q+"<TD WIDTH='14%' "+this.applySpecialStyle($0s,pj,$0v)+">"+$0t+$0s+$0u+"</TD>";return $0q;};Calendar.prototype.applySpecialStyle=function($0w,$0x,$0y,$0z){var $0A;if(this.gCurrentDate!="NONE")$0A=this.gCurrentDate;else $0A=$t;var $0B=$0A.getDate();var $0Z=$0A.getMonth();var $0D=$0A.getFullYear();if($0y!="9999"&&Calendar.isHoliday($0y))return("CLASS='holidayStyle'");if(parseInt($0w)==$0B&&parseInt(this.gMonth)==$0Z&&parseInt(this.gYear)==$0D)return "CLASS='todayStyle'";if(Calendar.isWeekend($0x))return($0z==1?"CLASS='dimWeekendStyle'":"CLASS='weekendStyle'");if($0z==1)return "CLASS='dimStyle'";else return "CLASS='normalStyle'";};Calendar.prototype.format_data=function($0E){var $0F=this.gFormat;var $0G=1+this.gMonth;$0G=($0G.toString().length<2)?"0"+$0G:$0G;var $0H=Calendar.getMonthArray()[this.gMonth].substr(0,3).toUpperCase();var $0I=Calendar.getMonthArray()[this.gMonth].toUpperCase();var $0J=new String(this.gYear);var $0K=new String(this.gYear.substr(2,2));var $0L=($0E.toString().length<2)?"0"+$0E:$0E;var $0M=Calendar.getDOWArray()[new Date($0G+"/"+$0L+"/"+$0J).getDay()];if((new RegExp("YYYY","ig")).test($0F))$0F=$0F.replace(/YYYY/ig,$0J);else if((new RegExp("YY","ig")).test($0F))$0F=$0F.replace(/YY/ig,$0K);if((new RegExp("DD","ig")).test($0F))$0F=$0F.replace(/DD/ig,$0L);if((new RegExp("MM","ig")).test($0F))$0F=$0F.replace(/MM/ig,$0G);if((new RegExp("MONTH","ig")).test($0F))$0F=$0F.replace(/MONTH/ig,$0I);else if((new RegExp("MON","ig")).test($0F))$0F=$0F.replace(/MON/ig,$0H);if((new RegExp("DOW","ig")).test($0F))$0F=$0F.replace(/DOW/ig,$0M);return $0F;};Calendar.prototype.format_dow=function($0E){var $0F;var $0G=1+this.gMonth;$0G=($0G.toString().length<2)?"0"+$0G:$0G;var $0H=Calendar.getMonthArray()[this.gMonth].substr(0,3).toUpperCase();var $0I=Calendar.getMonthArray()[this.gMonth].toUpperCase();var $0J=new String(this.gYear);var $0L=($0E.toString().length<2)?"0"+$0E:$0E;var $0j=new Date($0G+"\/"+$0L+"\/"+$0J);$0F=Calendar.getDOWArray()[$0j.getDay()];return $0F;};Calendar.prototype.wwrite=function($0N){this.CODE+=$0N;};function Calendar_CreateCalendarLayer($0O,$0P,pInitText){if(pInitText==null)pInitText=Calendar.gInitText;else Calendar.gInitText=pInitText;v_InlineX=$0O;v_InlineY=$0P;var Calendar_ID="Calendar";if($E){document.writeln("<DIV ID=\"" + Calendar_ID + "\" STYLE=\""+"position:absolute;zIndex:300;top:"+$0P+"px;left:"+$0O+"px;"+"\">" + pInitText + "<\/DIV>");}else if($F){document.writeln("<DIV ID=\"" + Calendar_ID + "\" STYLE=\""+"position:absolute;zIndex:300;top:"+$0P+"px;left:"+$0O+"px;"+"\">" + pInitText + "<\/DIV>");}else if($D){document.writeln("<DIV ID=\"" + Calendar_ID + "\" STYLE=\""+"position:absolute;zIndex:300;top:"+$0P+"px;left:"+$0O+"px;"+"\">" + pInitText + "<\/DIV>");}}function Calendar_Lwwrite($0Q,$05){if($E){document.all[$05].innerHTML=$0Q;}else if($F){$0R=document.createRange();el=document.getElementById($05);$0R.setStartBefore(el);$0S=$0R.createContextualFragment($0Q);while(el.hasChildNodes())el.removeChild(el.lastChild);el.appendChild($0S);}else if($D){var $0T=document.layers[$05].document;$0T.open();$0T.write($0Q);$0T.close();}}function Calendar_MoveTo(pX,pY,$05){if($E){document.all[$05].style.top=pY;document.all[$05].style.left=pX;}else if($F){document.getElementById($05).style.top=pY;document.getElementById($05).style.left=pX;}else if($D){document.layers[$05].top=pY;document.layers[$05].left=pX;}}$B=false;$Z=false;function fixCal($0U){if($0U)initEvents(0);else initEvents(1);}function click(e){x=($E)?(event.x+document.body.scrollLeft):e.pageX;y=($E)?(event.y+document.body.scrollTop):e.pageY;cx=($E)?(x-parseInt($0V.left)):(($F)?(x-parseInt($0V.left)):(x-$v.x));cy=($E)?(y-parseInt($0V.top)):(($F)?(y-parseInt($0V.top)):(y-$v.y));$Z=false;$B=true;}function unclick(e){$Z=true;$B=false;}function handleMove(e){$x=($E)?(event.x+document.body.scrollLeft):e.pageX;$y=($E)?(event.y+document.body.scrollTop):e.pageY;if($B){v_InlineX=$x-cx;v_InlineY=$y-cy;MoveLayer($x-cx,$y-cy,"myLayer");}}function initEvents($0W){if($0W==1){if($D&&!$F)$v.captureEvents(Event.MOUSEDOWN|Event.MOUSEUP|Event.MOUSEMOVE);if($F&&$D){$v.addEventListener("mousemove",handleMove,true);$v.addEventListener("mousedown",click,true);$v.addEventListener("mouseup",unclick,true);}else{$v.onmousemove=handleMove;$v.onmousedown=click;$v.onmouseup=unclick;}}else{if($D&&!$F)$v.releaseEvents(Event.MOUSEDOWN|Event.MOUSEUP|Event.MOUSEMOVE);if($F&&$D){$v.removeEventListener("mousemove",handleMove,true);$v.removeEventListener("mousedown",click,true);$v.removeEventListener("mouseup",unclick,true);}else{$v.onmousemove="";$v.onmousedown="";$v.onmouseup="";}}}function MoveLayer(pX,pY){$0V.top=pY;$0V.left=pX;}function drag_init($0X){if($E){$0V=document.all[$0X].style;$v=document.all[$0X];}else if($F){$0V=document.getElementById($0X).style;$v=document.getElementById($0X);}else if($D){$0V=document.layers[$0X];$v=document.layers[$0X];}if(v_ShowFix=="Yes"&&v_Fix=="Yes")initEvents(0);else initEvents(1);}function CalResize(){v_Height=$u.innerHeight;v_Width=$u.innerWidth;}function Build($G,$H,$I,$J,$K,$0Y,$0Z){if($0Z&&$0Z!=""){v_Resizable=undefined;v_SelectAfter=undefined;v_SelectBefore=undefined;v_NSHierarchy=undefined;v_CallFunction=undefined;v_Nav=undefined;v_ShowFix=undefined;v_SmartNav=undefined;v_Fix=undefined;v_WeekStart=undefined;v_Width=undefined;v_Height=undefined;v_ShortNames=undefined;v_Holidays=undefined;v_Language=undefined;v_Stylesheet=undefined;}if($I==""||($I!=""&&isNaN($I))){window.status="Invalid Year";return true;}else window.status="";if($0Y&&$0Y!=""){v_CurrentDate="";var $10=name_values($0Y);var $09="document."+$G+".value";var $11=eval($09);if($11!="")v_CurrentDate=$11;v_Weekends=chkVar("v_Weekends")?v_Weekends:"06";for(i=0;i<v_Weekends.length;i++)$s.push(parseInt(v_Weekends.charAt(i)));}else v_CurrentDate="";var $12;if(chkVar("v_CurrentDate")){if(v_CurrentDate.charAt(0)=='<'&&v_CurrentDate.charAt(v_CurrentDate.length-1)=='>'){var $13="document."+v_CurrentDate.substring(1,v_CurrentDate.length-1)+".value";v_CurrentDate=eval($13);}if(Calendar.processDateData(v_CurrentDate,$J)==null)$12=new Date();else $12=new Date(Calendar.processDateData(v_CurrentDate,$J));$H=$12.getMonth();$I=$12.getFullYear().toString();}else $12="NONE";v_Resizable=chkVar("v_Resizable")?v_Resizable:"No";v_SelectAfter=(typeof v_SelectAfter=="string")?new Date(Calendar.processDateData(v_SelectAfter,$J)):v_SelectAfter;v_SelectBefore=(typeof v_SelectBefore=="string")?new Date(Calendar.processDateData(v_SelectBefore,$J)):v_SelectBefore;v_NSHierarchy=$D?(chkVar("v_NSHierarchy")?(v_NSHierarchy+".document."):""):"";v_CallFunction=chkVar("v_CallFunction")?v_CallFunction:"";v_Nav=chkVar("v_Nav")?v_Nav:"Yes";v_SmartNav=chkVar("v_SmartNav")?v_SmartNav:"No";v_Fix=chkVar("v_Fix")?v_Fix:"Yes";v_ShowFix=chkVar("v_ShowFix")?v_ShowFix:"No";v_ShortNames=chkVar("v_ShortNames")?v_ShortNames:"No";v_WeekStart=chkVar("v_WeekStart")?parseInt(v_WeekStart):1;va_Holidays=chkVar("v_Holidays")?v_Holidays.split(","):"";v_Language=chkVar("v_Language")?v_Language:'E';v_Stylesheet=chkVar("v_Stylesheet")?v_Stylesheet:'Calendar.css';var $14,$15;v_Width=chkVar("v_Width")?v_Width:260;v_Height=chkVar("v_Height")?v_Height:250;if($K=="POPUP"){$15=chkVar("v_Width")?v_Width:260;if($E)$14=chkVar("v_Height")?v_Height:250;else if($D)$14=chkVar("v_Height")?v_Height:250;if(v_SmartNav=="Yes")$14+=30;
$14 = 230;
$15 = 260;
v_PopupX=chkVar("v_PopupX")?v_PopupX:-1;v_PopupY=chkVar("v_PopupY")?v_PopupY:-1;if(v_PopupX>=0&&v_PopupY>=0){if(!$u||$u.closed)$u=window.open("","Calendar","width="+$15+",height="+$14+",status=no,dependent=yes,resizable="+v_Resizable+",screenX="+v_PopupX+",screenY="+v_PopupY+",left="+v_PopupX+",top="+v_PopupY);}else{if(!$u||$u.closed)$u=window.open("","Calendar","width="+$15+",height="+$14+",status=no,dependent=yes,resizable="+v_Resizable);}$u.opener=self;if($D&&!$F){$u.captureEvents(Event.RESIZE);}$u.onResize=CalResize;}$16=new Calendar($G,$H,$I,$J,$K);$16.gCurrentDate=$12;$16.gAllowWeekends=(chkVar("v_AllowWeekends")&&v_AllowWeekends=="Yes")?"Yes":"No";$16.gAllowHolidays=(chkVar("v_AllowHolidays")&&v_AllowHolidays=="No")?"No":"Yes";$16.closeable=chkVar("v_CloseOnSelect")?((v_CloseOnSelect=="Yes")?true:false):true;$16.returnMode=chkVar("v_AppendOrReplace")?v_AppendOrReplace:"Replace";$16.returnData=chkVar("v_ReturnData")?v_ReturnData:"Date";$16.appendChar=($16.returnMode=="Append")?chkVar("v_AppendChar")?v_AppendChar:";":"";$16.CallFunction=chkVar("v_CallFunction")?v_CallFunction:"";$16.InlineX=chkVar("v_InlineX")?v_InlineX:100;$16.InlineY=chkVar("v_InlineY")?v_InlineY:100;if($16.gType=="INLINE"){Calendar.MoveTo($16.InlineX,$16.InlineY,$16.INLINE);}$16.gTitle=v_Title?v_Title:$16.gMonthName+"/"+$16.gYear;$16.fontface="Arial";if($16.gYearly)$16.showY();else $16.show();if($16.gType=="INLINE"){drag_init($16.INLINE);}}function show_calendar(){
    
    $G=document.getElementById(arguments[0]).form.name + "." + arguments[0];
    if(!chkArg(arguments[1]))$H=new String($t.getMonth());else $H=(typeof(arguments[1])=="number")?arguments[1].toString():((arguments[1]=="")?new String($t.getMonth()):arguments[1]);if(!chkArg(arguments[2]))$I=new String($t.getFullYear().toString());else $I=(typeof(arguments[2])=="number")?arguments[2].toString():arguments[2];if(!chkArg(arguments[3]))$J="MM/DD/YYYY";else $J=(typeof(arguments[3])=="string")?arguments[3]:"MM/DD/YYYY";if(!chkArg(arguments[4]))$K="POPUP";else $K=(typeof(arguments[4])=="string"&&(arguments[4]=="POPUP"||arguments[4]=="INLINE"))?arguments[4]:"POPUP";if(!chkArg(arguments[5]))$0Y="CloseOnSelect=Yes;AppendOrReplace=Replace;AppendChar=';';ReturnData=Date;Title=Popup Date Picker;AllowWeekends=Yes;Resizable=No;Language=E;Stylesheet=Calendar.css;";else $0Y=((typeof(arguments[5])=="string")?arguments[5]:"CloseOnSelect=Yes;AppendOrReplace=Replace;AppendChar=';';ReturnData=Date;Title=Popup Date Picker;AllowWeekends=Yes;Resizable=No;Language=E;Stylesheet=Calendar.css;");Build($G,$H,$I,$J,$K,$0Y,1);}Calendar.prototype.showY=function(){var $06="";var i;var vr,vc,vx,vy;var $17=285;var $18=200;var $19=10;var $1a;if($E)$1a=75;else if($F)$1a=25;else if($D)$1a=25;this.wwrite("<html>");this.wwrite("<head><title>Calendar</title>");this.wwrite("<style type='text/css'>\n<!--");for(i=0;i<12;i++){vc=i%3;if(i>=0&&i<=2)vr=0;if(i>=3&&i<=5)vr=1;if(i>=6&&i<=8)vr=2;if(i>=9&&i<=11)vr=3;vx=parseInt($17*vc)+$19;vy=parseInt($18*vr)+$1a;this.wwrite(".lclass"+i+" {position:absolute;top:"+vy+";left:"+vx+";}");}this.wwrite("-->\n</style>");if(this.gType=="POPUP")this.wwrite("<script language='javascript'>"+"function onClickFn(pday) {\n"+this.onclickfn()+"}\n<\/script>");else $i=this.onclickfn();this.wwrite("</head>");this.wwrite("<FONT FACE='"+this.fontface+"' SIZE=2><B>");this.wwrite("Year : "+this.gYear);this.wwrite("</B><BR>");var $0f=parseInt(this.gYear,10)-1;var $0i=parseInt(this.gYear,10)+1;this.wwrite("<TABLE WIDTH='"+(v_Width-30)+"' BORDER=1 CELLSPACING=0 CELLPADDING=0 BGCOLOR='#e0e0e0'><TR><TD ALIGN=center>");this.wwrite("[<A HREF=\""+"javascript:window.opener.Build("+"'"+this.gReturnItem+"', null, '"+$0f+"', '"+this.gFormat+"'"+");"+"\" alt='Prev Year'><<<\/A>]</TD><TD ALIGN=center>");this.wwrite("[<A HREF=\"javascript:window.print();\">Print</A>]</TD><TD ALIGN=center>");this.wwrite("[<A HREF=\""+"javascript:window.opener.Build("+"'"+this.gReturnItem+"', null, '"+$0i+"', '"+this.gFormat+"'"+");"+"\">>><\/A>]</TD></TR></TABLE><BR>");var j;for(i=11;i>=0;i--){if($E)this.wwrite("<DIV ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");else if($F)this.wwrite("<DIV ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");else if($D)this.wwrite("<LAYER ID=\"layer" + i + "\" CLASS=\"lclass" + i + "\">");this.gMonth=i;this.gMonthName=Calendar.getMonthArray()[this.gMonth];$06=this.getMonthlyCalendarCode();this.wwrite(this.gMonthName+"/"+this.gYear+"<BR>");this.wwrite($06);if($E)this.wwrite("</DIV>");else if($F)this.wwrite("</DIV>");else if($D)this.wwrite("</LAYER>");};this.wwrite("</font><BR></body></html>");$u.document.open();$u.document.writeln(this.CODE);$u.document.close();};function show_yearly_calendar($G,$I,$J){if($I==null||$I=="")$I=new String($t.getFullYear().toString());else $I=(typeof($I)=="number")?$I.toString():$I;if($J==null||$J=="")$J="MM/DD/YYYY";var $u=window.open("","Calendar","scrollbars=yes");$u.opener=self;Build($G,null,$I,$J,"POPUP");}
