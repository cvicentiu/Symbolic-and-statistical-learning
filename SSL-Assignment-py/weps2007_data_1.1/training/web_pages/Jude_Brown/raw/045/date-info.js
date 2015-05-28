

	function show_date()
{
	var today = new Date();
	document.write("<font face=arial size=-2 color=gray>" + 
	today.getCalendarDay() + " " + today.getDate() 
	+ " " + today.getCalendarMonth() +  "</font>");
}

Date.prototype.getFullYear = getFullYear
	Date.prototype.getActualMonth = getActualMonth
	Date.prototype.getActualDay = getActualDay
	Date.prototype.getCalendarDay = getCalendarDay
	Date.prototype.getCalendarMonth = getCalendarMonth

		function getFullYear() { 
			var n = this.getYear()
			n += 1900 
			return n 
		} 

		function getActualMonth() { 
			var n = this.getMonth()
			n += 1 
			return n 
		} 

		function getActualDay() { 
			var n = this.getDay()
			n += 1 
			return n 
		} 
	
		function getCalendarDay() { 
			var n = this.getDay()
			var dow = new Array(7)
			dow[0] = "Sunday" 
			dow[1] = "Monday" 
			dow[2] = "Tuesday" 
			dow[3] = "Wednesday" 
			dow[4] = "Thursday" 
			dow[5] = "Friday" 
			dow[6] = "Saturday" 
			return dow[n] 
		} 

		function getCalendarMonth() { 
			var n = this.getMonth()
			var moy = new Array(12)
			moy[0] = "January" 
			moy[1] = "February" 
			moy[2] = "March" 
			moy[3] = "April" 
			moy[4] = "May" 
			moy[5] = "June" 
			moy[6] = "July" 
			moy[7] = "August" 
			moy[8] = "September" 
			moy[9] = "October" 
			moy[10] = "November" 
			moy[11] = "December" 
			return moy[n] 
		} 
