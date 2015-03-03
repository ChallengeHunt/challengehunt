function initialize() {
	if (((typeof localStorage["data"]) === 'undefined') && ((typeof localStorage["hosts_data"]) === 'undefined')){
		getChallengeData();
		getHosts();
	}
	else {
		data = localStorage.getItem('data');
		hosts_data = localStorage.getItem('hosts_data');
		generateCards(data);
	    generateCardsArchive(data);
	    generateCardsPending(data);
	    loadDropDownWithHosts(hosts_data);
	}
}

initialize();

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
	    	if(!((typeof localStorage["data"]) === 'undefined')) {
				localStorage.removeItem('data');
			}
	    	localStorage.setItem('data', data);
	    	// $("#loader-drop-down").hide();
	    	// // $("#cd-tabs").show();
	    	// document.getElementById("c-tabs").style.visibility = "visible";
	    	generateCards(data);
	    	generateCardsArchive(data);
	    	generateCardsPending(data);
	    		
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

// getChallengeData();

// get all the hosts
function getHosts() {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com/hosts",
		beforeSend: function () {
	      	
		},
	    success: function (data) {
	    	// $("#loader-select-menu").hide();
	    	loadDropDownWithHosts(data);
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

// getHosts();

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

function generateCards(data) {

	var active_tabs = document.getElementById("active-contests");
	active_tabs.innerHTML = "";
	console.log(JSON.parse(data));
	// active_tabs.innerText = JSON.parse(data)["active"];

	var active_contest_data = JSON.parse(data)["active"];
	var numberOfActiveContests = 0;
	
	hosts = JSON.parse(localStorage.getItem('hosts'));
	
	for (var i = 0; i < active_contest_data.length; i++) {

		var newDiv = document.createElement('div');
		newDiv.style.width = "330px";
	 	newDiv.style.height = "135px"; 
	 	newDiv.style.borderStyle = "solid"; 
	 	// newDiv.style.borderWidth = "1px";
	 	newDiv.style.borderColor = "#C8C8C8";
	 	newDiv.style.overflow = "hidden";
	 	// newDiv.style.borderRadius = "8px 8px 8px 8px";
	 	// newDiv.style.borderColor = "black";
	 	newDiv.style.paddingTop = "3px";
	 	newDiv.style.paddingBottom = "3px";
	 	newDiv.style.paddingLeft = "5px";
	 	newDiv.style.paddingRight = "5px";
	 	newDiv.style.marginBottom = "14px";
	 	// newDiv.style.webkitBoxShadow = "0 10px 6px -6px #777";
	 	
	 	newDiv.style.background = "#F8F8F8";
	 	newDiv.className = "cards grow";
	 	
	 	// newDiv.addEventListener('mouseover', changeBackgroundColorOnMouseOver, false);
	 	// newDiv.addEventListener('mouseout', changeBackgroundColorOnMouseOut, false);

		var startDateTime = toTimeZone(active_contest_data[i].start).split(",");
		var endDateTime = toTimeZone(active_contest_data[i].end).split(",");

		var lengthOfContestname = active_contest_data[i].contest_name.length;
		
		

		if(imageExists("/img/"+active_contest_data[i].host_name+".png")){
			
			var logoDiv = document.createElement('img');
			logoDiv.setAttribute('src', '/img/'+ active_contest_data[i].host_name  +'.png');
			logoDiv.style.cssText =  "border:1px solid #eee; border-radius: 2px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;"	
			newDiv.appendChild(logoDiv);
		} else {
			var logoDiv = document.createElement('img');
			logoDiv.setAttribute('src', '/img/default.jpg');
			logoDiv.style.cssText =  "border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;"	
			newDiv.appendChild(logoDiv);

		}

		var startDate = dateFormatted(startDateTime[0]);
		var startTime = timeFormatted(startDateTime[1]);

		var startDateTimeDiv = document.createElement('div');
		startDateTimeDiv.style.cssText =  "float:right; margin-top:5px; margin-right:3px;  font-size:14px; font-family: Roboto, sans-serif;"	
		startDateTimeDiv.innerHTML = "<i class='fa fa-play' style=' margin-right:5px;'></i>" + startDate + startTime ;
		newDiv.appendChild(startDateTimeDiv);


		if(lengthOfContestname < 28) {

			var contestNameDiv = document.createElement('div');
			contestNameDiv.style.cssText =  "font-size:24px;  font-family: Courgette, cursive; text-align:center;"	
			contestNameDiv.innerHTML = "<a href='"+active_contest_data[i].contest_url +"' target='_blank'>" +active_contest_data[i].contest_name+ "</a>";
			newDiv.appendChild(contestNameDiv);			

		} else {

			var contestNameDiv = document.createElement('div');
			contestNameDiv.style.cssText =  "font-size:24px;  font-family: Courgette, cursive; text-align:center; margin-top:-4px; "	
			// contestNameDiv.innerHTML = "<marquee behavior='scroll' id='link'><a href='"+active_contest_data[i].contest_url +"' target='_blank'>" +active_contest_data[i].contest_name+ "</a></marquee>";
			// contestNameDiv.className = "marquee";
			contestNameDiv.innerHTML = "<a href='"+active_contest_data[i].contest_url +"' target='_blank'>" +active_contest_data[i].contest_name+ "</div>";
			contestNameDiv.className = "marquee";
			newDiv.appendChild(contestNameDiv);			

		}
				

		var contestUrlDiv = document.createElement('div');
		contestUrlDiv.style.cssText =  " font-size:14px; font-family: Inconsolata, cursive ; text-align:center;  "	
		
		var contestUrlLink = document.createElement('a');
		contestUrlLink.href = active_contest_data[i].host_url;
		contestUrlLink.target = "blank";
		contestUrlLink.innerHTML =  active_contest_data[i].host_name ;
		contestUrlDiv.appendChild(contestUrlLink);
		newDiv.appendChild(contestUrlDiv);


		var durationDiv = document.createElement('div');
		durationDiv.style.cssText =  "float:left; font-size:16px; margin-top:18px;"	
		durationDiv.innerHTML = "Duration: " + active_contest_data[i].duration   ;
		newDiv.appendChild(durationDiv);
 


 		var endDate = dateFormatted(endDateTime[0]);
 		var endTime = timeFormatted(endDateTime[1]);

		var endDateTimeDiv = document.createElement('div');
		endDateTimeDiv.style.cssText =  "float:right; margin-top:20px; margin-right:3px; font-size:14px; font-family: Roboto, sans-serif;"	
		endDateTimeDiv.innerHTML = "<i class='fa fa-stop' style=' margin-right:5px'	></i>"+ endDate + endTime  ;
		newDiv.appendChild(endDateTimeDiv);
		// newDiv.style.cssText = "margin: 8px auto; -webkit-box-shadow: 0 5px 3px -3px #777;";



	 	if ((typeof localStorage["hosts"]) === 'undefined') {
			document.getElementById("active-contests").appendChild(newDiv);
			numberOfActiveContests += 1;
		}
		else if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {
			document.getElementById("active-contests").appendChild(newDiv);
			numberOfActiveContests += 1;
		}
	}

	chrome.browserAction.setBadgeText({text:numberOfActiveContests.toString()});
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

	return dd + " " + mm + " " + yyyy ;

}

function timeFormatted(time){

	var start = time.split(":");

	var hour = start[0];
	var min = start[1];

	var checkTimeOfDay = start[2].split(" ");
	if(checkTimeOfDay[1]=="PM"){
		var timeOfDay = "pm";
	}else if(checkTimeOfDay[1]=="AM"){
		var timeOfDay = "am";
	}
	return hour + ":" + min + timeOfDay ;
}



function changeBackgroundColorOnMouseOver(e) {
	console.log("on mouse over");
	// e.style.background = "green";
	var target = e.target || e.srcElement;
	console.log(target.style.width)
	console.log(e.srcElement)
	if (target.style.width == "320px") {
		target.style.background = "#563d7c";
	}
}

function changeBackgroundColorOnMouseOut(e) {
	console.log("on mouse out");
	// e.style.background = "green";
	var target = e.target || e.srcElement;
	// console.log(target);
	if (target.style.width == "320px") {
		target.style.background = "#F2F2F7";
	}
}

function generateCardsPending(data) {

	var pending_tabs = document.getElementById("pending-contests");
	pending_tabs.innerHTML = "";
	console.log(JSON.parse(data));
	// pending_tabs.innerText = JSON.parse(data)["pending"];

	var pending_contest_data = JSON.parse(data)["pending"];

	var randomNumber = 0;
	hosts = JSON.parse(localStorage.getItem('hosts'));

	for (var i = 0; i < pending_contest_data.length; i++) {

		var newDiv = document.createElement('div');
		newDiv.style.width = "330px";
	 	newDiv.style.height = "135px"; 
	 	newDiv.style.borderStyle = "solid"; 
	 	// newDiv.style.borderWidth = "1px";
	 	newDiv.style.borderColor = "#C8C8C8";
	 	newDiv.style.overflow = "hidden";
	 	// newDiv.style.borderRadius = "8px 8px 8px 8px";
	 	// newDiv.style.borderColor = "black";
	 	newDiv.style.paddingTop = "3px";
	 	newDiv.style.paddingBottom = "3px";
	 	newDiv.style.paddingLeft = "5px";
	 	newDiv.style.paddingRight = "5px";
	 	newDiv.style.marginBottom = "14px";
	 	// newDiv.style.webkitBoxShadow = "0 10px 6px -6px #777";
	 	
	 	newDiv.style.background = "#F8F8F8";
	 	newDiv.className = "cards grow";
	 	
	 	// newDiv.addEventListener('mouseover', changeBackgroundColorOnMouseOver, false);
	 	// newDiv.addEventListener('mouseout', changeBackgroundColorOnMouseOut, false);

		var startDateTime = toTimeZone(pending_contest_data[i].start).split(",");
		var endDateTime = toTimeZone(pending_contest_data[i].end).split(",");

		var lengthOfContestname = pending_contest_data[i].contest_name.length;
		
		

		if(imageExists("/img/"+pending_contest_data[i].host_name+".png")){
			
			var logoDiv = document.createElement('img');
			logoDiv.setAttribute('src', '/img/'+ pending_contest_data[i].host_name  +'.png');
			logoDiv.style.cssText =  "border:1px solid #eee; border-radius: 2px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;"	
			newDiv.appendChild(logoDiv);
		} else {
			var logoDiv = document.createElement('img');
			logoDiv.setAttribute('src', '/img/default.jpg');
			logoDiv.style.cssText =  "border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;"	
			newDiv.appendChild(logoDiv);

		}

		var startDate = dateFormatted(startDateTime[0]);
		var startTime = timeFormatted(startDateTime[1]);

		var startDateTimeDiv = document.createElement('div');
		startDateTimeDiv.style.cssText =  "float:right; margin-top:5px; margin-right:3px;  font-size:14px; font-family: Roboto, sans-serif;"	
		startDateTimeDiv.innerHTML = "<i class='fa fa-play' style=' margin-right:5px;'></i>" + startDate + startTime ;
		newDiv.appendChild(startDateTimeDiv);


		if(lengthOfContestname < 28) {

			var contestNameDiv = document.createElement('div');
			contestNameDiv.style.cssText =  "font-size:24px;  font-family: Courgette, cursive; text-align:center;"	
			contestNameDiv.innerHTML = "<a href='"+pending_contest_data[i].contest_url +"' target='_blank'>" +pending_contest_data[i].contest_name+ "</a>";
			newDiv.appendChild(contestNameDiv);			

		} else {

			var contestNameDiv = document.createElement('div');
			contestNameDiv.style.cssText =  "font-size:24px;  font-family: Courgette, cursive; text-align:center; margin-top:-4px; "	
			// contestNameDiv.innerHTML = "<marquee behavior='scroll' id='link'><a href='"+active_contest_data[i].contest_url +"' target='_blank'>" +active_contest_data[i].contest_name+ "</a></marquee>";
			// contestNameDiv.className = "marquee";
			contestNameDiv.innerHTML = "<a href='"+pending_contest_data[i].contest_url +"' target='_blank'>" +pending_contest_data[i].contest_name+ "</div>";
			contestNameDiv.className = "marquee";
			newDiv.appendChild(contestNameDiv);			

		}
				

		var contestUrlDiv = document.createElement('div');
		contestUrlDiv.style.cssText =  " font-size:14px; font-family: Inconsolata, cursive ; text-align:center;  "	
		
		var contestUrlLink = document.createElement('a');
		contestUrlLink.href = pending_contest_data[i].host_url;
		contestUrlLink.target = "blank";
		contestUrlLink.innerHTML =  pending_contest_data[i].host_name ;
		contestUrlDiv.appendChild(contestUrlLink);
		newDiv.appendChild(contestUrlDiv);


		var durationDiv = document.createElement('div');
		durationDiv.style.cssText =  "float:left; font-size:16px; margin-top:18px;"	
		durationDiv.innerHTML = "Duration: " + pending_contest_data[i].duration   ;
		newDiv.appendChild(durationDiv);
 


 		var endDate = dateFormatted(endDateTime[0]);
 		var endTime = timeFormatted(endDateTime[1]);

		var endDateTimeDiv = document.createElement('div');
		endDateTimeDiv.style.cssText =  "float:right; margin-top:20px; margin-right:3px; font-size:14px; font-family: Roboto, sans-serif;"	
		endDateTimeDiv.innerHTML = "<i class='fa fa-stop' style=' margin-right:5px'	></i>"+ endDate + endTime  ;
		newDiv.appendChild(endDateTimeDiv);
		// newDiv.style.cssText = "margin: 8px auto; -webkit-box-shadow: 0 5px 3px -3px #777;";



	 	if ((typeof localStorage["hosts"]) === 'undefined') {
			document.getElementById("pending-contests").appendChild(newDiv);
		}
		else if (hosts.hasOwnProperty(pending_contest_data[i].host_name)) {
			document.getElementById("pending-contests").appendChild(newDiv);
		}
	}
}

function generateCardsArchive(data) {

	var archived_tabs = document.getElementById("archived-contests");
	archived_tabs.innerHTML = "";
	// archived_tabs.innerText = JSON.parse(data)["archived"];

	var archived_contest_data = JSON.parse(data)["archived"];
	console.log(archived_contest_data);
	var randomNumber = 0;
	hosts = JSON.parse(localStorage.getItem('hosts'));
	
		for (var i = 0; i < archived_contest_data.length; i++) {

		var newDiv = document.createElement('div');
		newDiv.style.width = "330px";
	 	newDiv.style.height = "135px"; 
	 	newDiv.style.borderStyle = "solid"; 
	 	// newDiv.style.borderWidth = "1px";
	 	newDiv.style.borderColor = "#C8C8C8";
	 	newDiv.style.overflow = "hidden";
	 	// newDiv.style.borderRadius = "8px 8px 8px 8px";
	 	// newDiv.style.borderColor = "black";
	 	newDiv.style.paddingTop = "3px";
	 	newDiv.style.paddingBottom = "3px";
	 	newDiv.style.paddingLeft = "5px";
	 	newDiv.style.paddingRight = "5px";
	 	newDiv.style.marginBottom = "14px";
	 	// newDiv.style.webkitBoxShadow = "0 10px 6px -6px #777";
	 	
	 	newDiv.style.background = "#F8F8F8";
	 	newDiv.className = "cards grow";
	 	
	 	// newDiv.addEventListener('mouseover', changeBackgroundColorOnMouseOver, false);
	 	// newDiv.addEventListener('mouseout', changeBackgroundColorOnMouseOut, false);

		var startDateTime = toTimeZone(archived_contest_data[i].start).split(",");
		var endDateTime = toTimeZone(archived_contest_data[i].end).split(",");

		var lengthOfContestname = archived_contest_data[i].contest_name.length;
		
		

		if(imageExists("/img/"+archived_contest_data[i].host_name+".png")){
			
			var logoDiv = document.createElement('img');
			logoDiv.setAttribute('src', '/img/'+ archived_contest_data[i].host_name  +'.png');
			logoDiv.style.cssText =  "border:1px solid #eee; border-radius: 2px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;"	
			newDiv.appendChild(logoDiv);
		} else {
			var logoDiv = document.createElement('img');
			logoDiv.setAttribute('src', '/img/default.jpg');
			logoDiv.style.cssText =  "border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;"	
			newDiv.appendChild(logoDiv);

		}

		var startDate = dateFormatted(startDateTime[0]);
		var startTime = timeFormatted(startDateTime[1]);

		var startDateTimeDiv = document.createElement('div');
		startDateTimeDiv.style.cssText =  "float:right; margin-top:5px; margin-right:3px;  font-size:14px; font-family: Roboto, sans-serif;"	
		startDateTimeDiv.innerHTML = "<i class='fa fa-play' style=' margin-right:5px;'></i>" + startDate + startTime ;
		newDiv.appendChild(startDateTimeDiv);


		if(lengthOfContestname < 28) {

			var contestNameDiv = document.createElement('div');
			contestNameDiv.style.cssText =  "font-size:24px;  font-family: Courgette, cursive; text-align:center;"	
			contestNameDiv.innerHTML = "<a href='"+archived_contest_data[i].contest_url +"' target='_blank'>" +archived_contest_data[i].contest_name+ "</a>";
			newDiv.appendChild(contestNameDiv);			

		} else {

			var contestNameDiv = document.createElement('div');
			contestNameDiv.style.cssText =  "font-size:24px;  font-family: Courgette, cursive; text-align:center; margin-top:-4px; "	
			// contestNameDiv.innerHTML = "<marquee behavior='scroll' id='link'><a href='"+active_contest_data[i].contest_url +"' target='_blank'>" +active_contest_data[i].contest_name+ "</a></marquee>";
			// contestNameDiv.className = "marquee";
			contestNameDiv.innerHTML = "<a href='"+archived_contest_data[i].contest_url +"' target='_blank'>" +archived_contest_data[i].contest_name+ "</div>";
			contestNameDiv.className = "marquee";
			newDiv.appendChild(contestNameDiv);			

		}
				

		var contestUrlDiv = document.createElement('div');
		contestUrlDiv.style.cssText =  " font-size:14px; font-family: Inconsolata, cursive ; text-align:center;  "	
		
		var contestUrlLink = document.createElement('a');
		contestUrlLink.href = archived_contest_data[i].host_url;
		contestUrlLink.target = "blank";
		contestUrlLink.innerHTML =  archived_contest_data[i].host_name ;
		contestUrlDiv.appendChild(contestUrlLink);
		newDiv.appendChild(contestUrlDiv);


		var durationDiv = document.createElement('div');
		durationDiv.style.cssText =  "float:left; font-size:16px; margin-top:18px;"	
		durationDiv.innerHTML = "Duration: " + archived_contest_data[i].duration   ;
		newDiv.appendChild(durationDiv);
 


 		var endDate = dateFormatted(endDateTime[0]);
 		var endTime = timeFormatted(endDateTime[1]);

		var endDateTimeDiv = document.createElement('div');
		endDateTimeDiv.style.cssText =  "float:right; margin-top:20px; margin-right:3px; font-size:14px; font-family: Roboto, sans-serif;"	
		endDateTimeDiv.innerHTML = "<i class='fa fa-stop' style=' margin-right:5px'	></i>"+ endDate + endTime  ;
		newDiv.appendChild(endDateTimeDiv);
		// newDiv.style.cssText = "margin: 8px auto; -webkit-box-shadow: 0 5px 3px -3px #777;";



	 	if ((typeof localStorage["hosts"]) === 'undefined') {
			document.getElementById("archived-contests").appendChild(newDiv);
			console.log("hello" + i);
		}
		else if (hosts.hasOwnProperty(archived_contest_data[i].host_name)) {
			document.getElementById("archived-contests").appendChild(newDiv);
			console.log("hello" + i);
		}
	}
}

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

// select all the options from drop down which are already in the local storage
function loadDropDownWithHosts(data) {

	var dropDown = document.getElementById("tokenize");
	var hosts = (JSON.parse(data))["hosts"]
	selected_hosts = JSON.parse(localStorage.getItem('hosts'));

	for (var i = 0; i < hosts.length; i++) {
		var newOption = document.createElement('option');
		newOption.value = hosts[i];

		if (!((typeof localStorage["hosts"]) === 'undefined') && selected_hosts.hasOwnProperty(hosts[i])) {
			newOption.selected = true;
		}
		newOption.innerText = hosts[i];
		dropDown.appendChild(newOption);
	}
	loadDropDown();
}

function loadDropDown() {
	$('#tokenize').tokenize({
		placeholder: "Filter by platform names...",
		// displayDropdownOnFocus: true,
		onAddToken: function(value, text){
			if((typeof localStorage["hosts"]) === 'undefined') {
				var hosts = {}
				hosts[value] = true;
				localStorage.setItem('hosts', JSON.stringify(hosts));
			} else {
				var hosts = JSON.parse(localStorage.getItem('hosts'));
				if (hosts.hasOwnProperty(value)) {
					console.log("already there")
				} else {
					hosts[value] = true;
					localStorage.setItem('hosts', JSON.stringify(hosts));
				}
			}

			if((typeof localStorage["data"]) === 'undefined') {
				getChallengeData();
			} else {
				// if data already exists in localstorage, then call generateCards(data) else call getChallengeData()
				var data = localStorage.getItem('data');
				generateCards(data);
				generateCardsArchive(data);
				generateCardsPending(data);
			}
		},
		onRemoveToken: function(value){
			hosts = JSON.parse(localStorage.getItem('hosts'));
			
			// check if hosts contain that value. should not be the case
			if (!hosts.hasOwnProperty(value)) {
				console.log("not there")
			} else {
				delete hosts[value];
				var hostsLength = Object.keys(hosts).length;
				// if all the hosts have been removed, delete the host key
				if (hostsLength == 0) {
					localStorage.removeItem('hosts');
				} else {
					localStorage.setItem('hosts', JSON.stringify(hosts));
				}
			}

			// if data already exists in localstorage, then call generateCards(data) else call getChallengeData()
			if((typeof localStorage["data"]) === 'undefined') {
				getChallengeData();
			} else {
				var data = localStorage.getItem('data');
				generateCards(data);
				generateCardsArchive(data);
				generateCardsPending(data);
			}
		},
	});
	
}