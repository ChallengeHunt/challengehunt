// get all the challenge data
function getChallengeData() {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com",
		beforeSend: function () {
	      	// $("#target").loadingOverlay();
		},
	    success: function (data) {
	    	// $('#target').loadingOverlay('remove');
	    	// localStorage.removeItem('data');
	    	// localStorage.setItem('data', data);
	    	generateCards(data);
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

getChallengeData();

// get all the hosts
function getHosts() {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com/hosts",
		beforeSend: function () {
	      	// $("#target").loadingOverlay();
		},
	    success: function (data) {
	    	// $('#target').loadingOverlay('remove');
	    	loadDropDownWithHosts(data);
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

getHosts();

function toTimeZone(time) {

	var dateTimeTimezone = time.split("T");
	var date = dateTimeTimezone[0].split("-");
	var timeAndTimeZone = dateTimeTimezone[1].split("T")
	var time = timeAndTimeZone[0].split(":");
	// var d = new Date();
	var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0)
	var offset = -(d.getTimezoneOffset());
	console.log(d);
	console.log(offset);
	var newD = new Date(d.getTime() + offset*60000);
	console.log(newD);
	console.log(newD.toLocaleString());
	// var format = 'YYYY-MM-DD HH:mm:ss Z.Z';
	// console.log(time);
	// var moment = require('moment-timezone');
	// console.log(moment(1369266934311).zone('+0100').format('YYYY-MM-DD HH:mm'));
    // return moment(time, format).tz(zone).format(format);
}
// dynamically create all the cards
function generateCards(data) {
	var active_tabs = document.getElementById("active-contests");
	active_tabs.innerHTML = "";
	console.log(JSON.parse(data));
	// active_tabs.innerText = JSON.parse(data)["active"];

	var active_contest_data = JSON.parse(data)["active"];

	for (var i = 0; i < active_contest_data.length; i++) {

		hosts = JSON.parse(localStorage.getItem('hosts'));
		if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {

			var newDiv = document.createElement('div');
			newDiv.style.width = "360px";
		 	newDiv.style.height = "130px"; 
		 	newDiv.style.background = "#5CE62E"; 
		 	newDiv.style.borderStyle = "solid"; 
		 	newDiv.style.borderWidth = "2px";
		 	newDiv.style.borderColor = "black";
		 	newDiv.style.borderRadius = "10px 10px 10px 10px";
		 	newDiv.style.borderColor = "black";
		 	newDiv.style.marginBottom = "15px";
		// 
		 	var startDateTime = active_contest_data[i].start.split("T");
		 	var startTimeAndZone = startDateTime[1].split("+");
		 	var endDateTime = active_contest_data[i].end.split("T");
		 	console.log(toTimeZone(active_contest_data[i].start));

		 	newDiv.innerHTML ="<span style='color:black; font-size:25px'>"+"<div style='text-align:center'>"+"  "+ active_contest_data[i].contest_name+ "</div>" +
		 					  "<span style='color:black; font-size:12px'>"+"<div style='text-align:center; margin-top:2px'>"+ active_contest_data[i].host_name +"</div>" +"<br>"+ 
		 					  "<span style='color:black; font-size:15px'>"+"  "+"<div style=' float:left'>"+ startDateTime[0] +"<br>"+
		 					  "  "+ startDateTime[1] +"</div>" +"<br>"+ 
		 					  "<span style='color:black; font-size:15px'>"+"  "+"<div style='float:right; margin-top:-30px'>"+ endDateTime[0] +"<br>"+  
		 					  +"  "+ endDateTime[1] +"</div>"+ "<br>"+ 
		 					  "<span style='color:black; font-size:20px'>"+"  "+ active_contest_data[i].duration +"</span>";
		 	document.getElementById("active-contests").appendChild(newDiv);
		}

	}
}

// select all the options from drop down which are already in the local storage
function loadDropDownWithHosts(data) {

	var dropDown = document.getElementById("tokenize");
	var hosts = (JSON.parse(data))["hosts"]
	selected_hosts = JSON.parse(localStorage.getItem('hosts'));

	for (var i = 0; i < hosts.length; i++) {
		var newOption = document.createElement('option');
		newOption.value = hosts[i];

		if (selected_hosts.hasOwnProperty(hosts[i])) {
			console.log("yo");
			newOption.selected = true;
		}
		newOption.innerText = hosts[i];
		dropDown.appendChild(newOption);
	}

	loadDropDown();
}