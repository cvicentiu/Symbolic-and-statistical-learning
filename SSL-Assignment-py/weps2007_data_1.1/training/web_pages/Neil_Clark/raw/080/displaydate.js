function dispDate(dateVal) {
DaystoAdd=dateVal
TodaysDate = new Date();
TodaysDay = new Array('Sun', 'Mon', 'Tues','Wed', 'Thu', 'Fri', 'Sat');
TodaysMonth = new Array('Jan', 'Feb', 'Mar','Apr', 'May','Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec');
DaysinMonth = new Array('31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31');
function LeapYearTest (Year) {
if (((Year % 400)==0) || (((Year % 100)!=0) && (Year % 4)==0)) {
return true;
}
else {
return false;
}
}
CurrentYear = TodaysDate.getYear();
if (CurrentYear < 2000) 
CurrentYear = CurrentYear + 1900;
currentMonth = TodaysDate.getMonth();
DayOffset = TodaysDate.getDay();
currentDay = TodaysDate.getDate();
month = TodaysMonth[currentMonth];
if (month == 'February') {
if (((CurrentYear % 4)==0) && ((CurrentYear % 100)!=0) || ((CurrentYear % 400)==0)) {
DaysinMonth[1] = 29;
}
else {
DaysinMonth[1] = 28;
}
}
days = DaysinMonth[currentMonth];
currentDay += DaystoAdd;
if (currentDay > days) {
if (currentMonth == 11) {
currentMonth = 0;
month = TodaysMonth[currentMonth];
CurrentYear = CurrentYear + 1
}
else {
month =
TodaysMonth[currentMonth+1];
}
currentDay = currentDay - days;
}
DayOffset += DaystoAdd;
function offsettheDate (offsetCurrentDay) {
if (offsetCurrentDay > 6) {
offsetCurrentDay -= 6;
DayOffset = TodaysDay[offsetCurrentDay-1];
offsettheDate(offsetCurrentDay-1);
}
else {
DayOffset = TodaysDay[offsetCurrentDay];
return true;
}
}
offsettheDate(DayOffset);
TheDate  = DayOffset + ' ';
TheDate += month + ' ';
TheDate += currentDay + ', '; 
if (CurrentYear<100) CurrentYear="19" + CurrentYear;
TheDate += CurrentYear;
document.write(' '+TheDate);
}

function clearBox(box) {
	if (box.value==box.defaultValue) {
	box.value = "";
}
}
