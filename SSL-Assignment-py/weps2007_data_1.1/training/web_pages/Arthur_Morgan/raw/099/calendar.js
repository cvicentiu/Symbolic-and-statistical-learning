	// months as they appear in the calendar's title
	var ARR_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	// week day titles as they appear on the calendar
	var ARR_WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
	// day week starts from (normally 0-Su or 1-Mo)
	var NUM_WEEKSTART = 1;
	// path to the directory where calendar images are stored. trailing slash req.
	
	var _t = new Date();
	var today = new Date(_t.getFullYear(), _t.getMonth(), _t.getDate());

	var re_url = /\/(\d{4})\/(\d{2})(\d{2})\//;
	var dt_current = (re_url.exec(String(window.location))? new Date(new Number(RegExp.$1), (new Number(RegExp.$2))-1, new Number(RegExp.$3)) : new Date());
	
	// get same date in the previous year
	var dt_prev_year, dt_next_year, dt_prev_month, dt_next_month;

	function renderCalendar(dt, onSelectFn, date_hilights)
	{
		dt = new Date(dt);
		dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
		
		// get same date in the previous year
		dt_prev_year = new Date(dt);
		dt_prev_year.setFullYear(dt_prev_year.getFullYear() - 1);
		if (dt_prev_year.getDate() != dt.getDate())
			dt_prev_year.setDate(0);
		
		// get same date in the next year
		dt_next_year = new Date(dt);
		dt_next_year.setFullYear(dt_next_year.getFullYear() + 1);
		if (dt_next_year.getDate() != dt.getDate())
			dt_next_year.setDate(0);
		
		// get same date in the previous month
		dt_prev_month = new Date(dt);
		dt_prev_month.setMonth(dt_prev_month.getMonth() - 1);
		if (dt_prev_month.getDate() != dt.getDate())
			dt_prev_month.setDate(0);
		
		// get same date in the next month
		dt_next_month = new Date(dt);
		dt_next_month.setMonth(dt_next_month.getMonth() + 1);
		if (dt_next_month.getDate() != dt.getDate())
			dt_next_month.setDate(0);
		
		// get first day to display in the grid for current month
		var dt_firstday = new Date(dt);
		dt_firstday.setDate(1);
		dt_firstday.setDate(1 - (7 + dt_firstday.getDay() - NUM_WEEKSTART) % 7);
		
		//get table 
		var tbl = document.getElementById("calTbl");
		
		//set header with month and year
		tbl.rows[0].cells[1].innerHTML = ARR_MONTHS[dt.getMonth()]+' '+dt.getFullYear();
		
		//print dates
		var dt_current_day = new Date(dt_firstday);

		if(dt_current_day.getDate() == 1 )
		{
			dt_current_day.setDate(dt_current_day.getDate()-7);
		}

		for (var row=2; row<8; row++) {
			for (var cell=0; cell<7; cell++) {
				el = tbl.rows[row].cells[cell];
				
				if (dt_current_day.getTime() == dt_current.getTime())
				{
					el.className = "sd";
				}
				else if (dt.getMonth() != dt_current_day.getMonth())
				{
					el.className = "om";
				}
				else
				{
					el.className = "";
				}


				if(dt_current_day.getTime() == today.getTime())
				{
					el.className = "td";
				}


				el.childNodes[0].innerHTML = dt_current_day.getDate();
				
				if(date_hilights != null)
				{
					if(el.className != "sd" && date_hilights.indexOf(dt_current_day.getFullYear() + "/" + (dt_current_day.getMonth() + 1) + "/" + dt_current_day.getDate() + " ") > -1)
					{
						el.className = "hd";
						el.childNodes[0].href = "javascript:" + onSelectFn +"("+ dt_current_day.getTime() + ")"; 
					}
					else
					{
						el.childNodes[0].href = "javascript:void(0)"; 
					}
				}
				else
				{
						el.childNodes[0].href = "javascript:" + onSelectFn + "("+ dt_current_day.getTime() + ")"; 
				}
				
				dt_current_day.setDate(dt_current_day.getDate()+1);
			}
		}
	}