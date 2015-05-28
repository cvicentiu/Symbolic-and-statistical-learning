var MyDate = new Date()
MyDayWeek = (MyDate.getDay())
MyMonth = (MyDate.getMonth())
MyDay = (MyDate.getDate())
MyYear = "2007"
DayWord = new Array("Sunday,", "Monday,", "Tuesday,", "Wednesday,", "Thursday,", "Friday,", "Saturday,", 7)
MonthWord = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", 12);
document.write(""+(DayWord [MyDayWeek])+""+" "+(MonthWord [MyMonth])+" "+MyDay+", "+MyYear);