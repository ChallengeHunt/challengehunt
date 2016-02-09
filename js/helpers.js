// check if an image exists in the directory
function imageExists(image_url){
	try {
	    var http = new XMLHttpRequest();
	    http.open('GET', image_url, false);
	    http.send();
	    return http.status != 404;
	} catch (err) {
		return false;
	}
}

// convert utc to local time zone of browser
function toTimeZone(time) {
	var dateTimeTimezone = time.split("T");
	var date = dateTimeTimezone[0].split("-");
	var timeAndTimeZone = dateTimeTimezone[1].split("T");
	var time = timeAndTimeZone[0].split(":");
	var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0);
	var offset = -(d.getTimezoneOffset());
	var newD = new Date(d.getTime() + offset*60000);
  return newD.toLocaleString();
}

// converts the recieved date time object to a UTC date time object
function toUTCTimeZone(time) {
	var dateTimeTimezone = time.split("T");
	var date = dateTimeTimezone[0].split("-");
	var timeAndTimeZone = dateTimeTimezone[1].split("T");
	var time = timeAndTimeZone[0].split(":");
	var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0);
	return d;
}

// returns the date time object instead of locale string
function toTimeZone1(time) {
	var dateTimeTimezone = time.split("T");
	var date = dateTimeTimezone[0].split("-");
	var timeAndTimeZone = dateTimeTimezone[1].split("T");
	var time = timeAndTimeZone[0].split(":");
	var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0);
	var offset = -(d.getTimezoneOffset());
	var newD = new Date(d.getTime() + offset*60000);
  return newD;
}

function dateFormatted(date, time){
	// console.log(time);
	var timeOfDay = time.split(":");
	var start = date.split("/");
	// console.log(start);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];

	if (timeOfDay[2].split(" ").length == 2) { 
		var dd = start[1];
		if(dd.length == 1){
			dd = "0" + dd;
		}
		var mm =  months[start[0]-1];
		var yyyy = start[2];
	} else {
		var dd = start[0];
		var mm = months[start[1]-1];
		var yyyy = start[2];
	}
	// console.log(dd + " " + mm + " " + yyyy);
	return dd + " " + mm + " " + yyyy;
}

function dateCreated(date){
	// console.log(time);
	var start = date.split("-");
	// console.log(start);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];

	var dd = start[2];
	if(dd.length == 1){
		dd = "0" + dd;
	}
	var mm = months[start[1]-1];
	var yyyy = start[0];
	// console.log(dd + " " + mm + " " + yyyy);
	return dd + " " + mm + " " + yyyy;
}

function timeFormatted(time){
	var start = time.split(":");
	var hour = start[0];
	var min = start[1];
	
	if (start[2].split(" ").length == 2) { 
		var checkTimeOfDay = start[2].split(" ");
		if(checkTimeOfDay[1]=="PM"){
			var timeOfDay = "pm";
		}else if(checkTimeOfDay[1]=="AM"){
			var timeOfDay = "am";
		}
		return hour + ":" + min + timeOfDay ;
	} else {
		return " " + hour + ":" + min; //+ start[2] ;
	}
}

function timeForCalendar(time) {
	// console.log(time);
	try {
		var formattedTime = time.split(' ');
		var hours = 0;
		if (formattedTime[2] == "PM") {
			hours = 12;
		}
		var timeOfDay = formattedTime[1].split(':');
		hours += parseInt(timeOfDay[0]);
		minutes = timeOfDay[1];
		seconds = timeOfDay[2];

		if (hours < 10) {
			hours = "0" + hours; 
		}
	} catch(err) {
		var formattedTime = time.split(':');
		var hours = formattedTime[0];
		var minutes = formattedTime[1];
		var seconds = formattedTime[2];
	}
	// console.log("" + hours + minutes + seconds);
	return "" + hours + minutes + seconds;
}

function dateForCalendar(date, time) {
	var start = date.split("/");
	var timeOfDay = time.split(":");
	// console.log(start);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
	var formattedDate = date.split('/');
	// console.log('formattedDate '+ formattedDate);
	// again an edge case
	// time is different for different systems
	if (timeOfDay[2].split(" ").length == 2) {
		// Eg if month is 5 then make it `05`
		if(parseInt(formattedDate[0]) < 10) {
			formattedDate[0] = "0" + formattedDate[0];
		}
		// Eg if date is 5 the make it `05`
		if(parseInt(formattedDate[1]) < 10) {
			formattedDate[1] = "0" + formattedDate[1];
		}
		// console.log("" + formattedDate[2] + formattedDate[0] + formattedDate[1]);
		return "" + formattedDate[2] + formattedDate[0] + formattedDate[1];
	} else {
		return "" + formattedDate[2] + formattedDate[0] + formattedDate[1];
	}
}


function dateForCalendarHackathons(date) {
	// Eg if date is 5 the make it `05`
	if(parseInt(date[2]) < 10) {
		date[2] = "0" + date[2];
	}
	// return
	// console.log("" + date[0] + date[1] + date[2]);
	return "" + date[0] + date[1] + date[2];

}

function verboseDuration(duration) {
	// TODO: make the code tidy
  if (!(duration.indexOf('days') > -1)) {
  	var hrs = parseInt(duration.split(':')[0]);
  	var days = Math.floor(hrs / 24);
  	var hrs = hrs % 24;
  	var minutes = parseInt(duration.split(':')[1]);
  	if (minutes == 0) {
	  	if (days > 0 && hrs > 0) 
	  		duration = days + ' days, ' + hrs + ' hrs';
	  	else if (days > 0 && hrs == 0)
	  		duration = days + ' days';
	  	else
	  		duration = hrs + ' hrs';
	  } else {
	  	if (days > 0 && hrs > 0) 
	  		duration = days + ' days, ' + hrs + ' hrs ' + minutes + ' mins';
	  	else if (days > 0 && hrs == 0)
	  		duration = days + ' days'+ minutes + ' mins';
	  	else
	  		duration = hrs + ' hrs'+ minutes + ' mins';
	  }
  }
  return duration;
}