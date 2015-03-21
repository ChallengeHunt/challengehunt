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
	var timeAndTimeZone = dateTimeTimezone[1].split("T")
	var time = timeAndTimeZone[0].split(":");
	var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0)
	var offset = -(d.getTimezoneOffset());
	var newD = new Date(d.getTime() + offset*60000);
    return newD.toLocaleString()
}

function dateFormatted(date){
	var start = date.split("/");

	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep","Oct", "Nov", "Dec"];

	var dd = start[1];
	if(dd.length == 1){
		dd = "0" + dd;
	}
	var mm = months[start[0]-1];
	var yyyy = start[2];

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