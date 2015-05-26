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
	var timeOfDay = time.split(":");
	var start = date.split("/");
	// console.log(start);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];
	var formattedDate = date.split('/');
	if (timeOfDay[2].split(" ").length == 2) { 
		if(parseInt(formattedDate[0]) < 10) {
			formattedDate[0] = "0" + formattedDate[0];
		}
		// console.log("" + formattedDate[2] + formattedDate[0] + formattedDate[1]);
		return "" + formattedDate[2] + formattedDate[0] + formattedDate[1];
	} else {
		// return
		// console.log("" + formattedDate[2] + formattedDate[1] + formattedDate[0]);
		return "" + formattedDate[2] + formattedDate[1] + formattedDate[0];
	}
}