function initialize() {
	if (!localStorage.data || !localStorage.hosts_data) {
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

// get all the challenge data from server
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
        }
	});
}

// get all the hosts from the server
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
        }
	});
}

// creates a new card and applies all the style to it. returns the created card
function applyStyle(data) {

	var newDiv = document.createElement('div');
 	newDiv.className = "cards grow";
 	
 	var startDateTime = toTimeZone(data.start).split(",");
	var endDateTime = toTimeZone(data.end).split(",");
	
	if(startDateTime.length == 1 && endDateTime.length == 1) {
		startDateTime = toTimeZone(data.start).split(" ");
		endDateTime = toTimeZone(data.end).split(" ");
	}

	var startDate = dateFormatted(startDateTime[0]);
	var startTime = timeFormatted(startDateTime[1]);
	var startDateTimeDiv = document.createElement('div');
	var lengthOfContestname = data.contest_name.length;

	if(imageExists("/img/"+data.host_name+".png")) {
		
		var logoDiv = document.createElement('img');
		logoDiv.setAttribute('src', '/img/'+ data.host_name  +'.png');
		logoDiv.className = "logo";
		newDiv.appendChild(logoDiv);
	}
	// special case for hackercup 
	else if(data.host_name == "facebook.com/hackercup") {
		var logoDiv = document.createElement('img');
		logoDiv.setAttribute('src', '/img/hackercup.jpg');
		logoDiv.className = "logo";
		newDiv.appendChild(logoDiv);
	} else {
		var logoDiv = document.createElement('img');
		logoDiv.setAttribute('src', '/img/default.jpg');
		logoDiv.className = "logo";
		newDiv.appendChild(logoDiv);
	}

	startDateTimeDiv.className = "time start-time";
	startDateTimeDiv.innerHTML = "<i class='fa fa-play' style=' margin-right:5px;'></i>" + startDate + startTime ;
	newDiv.appendChild(startDateTimeDiv);


	if(lengthOfContestname < 28) {

		var contestNameDiv = document.createElement('div');
		contestNameDiv.className =  "contest-name-short"	
		contestNameDiv.innerHTML = "<a href='"+data.contest_url +"' target='_blank'>" +data.contest_name+ "</a>";
		newDiv.appendChild(contestNameDiv);
	} else {

		var contestNameDiv = document.createElement('div');
		contestNameDiv.className =  "contest-name-long";
		contestNameDiv.innerHTML = "<a href='"+data.contest_url +"' target='_blank'>" +data.contest_name+ "</div>";
		newDiv.appendChild(contestNameDiv);			
	}

	var contestUrlDiv = document.createElement('div');
	contestUrlDiv.className =  "contest-url";
	
	var contestUrlLink = document.createElement('a');
	contestUrlLink.href = data.host_url;
	contestUrlLink.target = "blank";
	contestUrlLink.innerHTML =  data.host_name ;
	contestUrlDiv.appendChild(contestUrlLink);
	newDiv.appendChild(contestUrlDiv);


	var durationDiv = document.createElement('div');
	durationDiv.className = "duration";
	durationDiv.innerHTML = "Duration: " + data.duration;
	newDiv.appendChild(durationDiv);

	var endDate = dateFormatted(endDateTime[0]);
	var endTime = timeFormatted(endDateTime[1]);

	var endDateTimeDiv = document.createElement('div');
	endDateTimeDiv.className = "time end-time"
	endDateTimeDiv.innerHTML = "<i class='fa fa-stop' style=' margin-right:5px'	></i>"+ endDate + endTime  ;
	newDiv.appendChild(endDateTimeDiv);

	return newDiv;
}

// generates card for active contest
function generateCards(data) {

	var active_tabs = document.getElementById("active-contests");
	active_tabs.innerHTML = "";

	var active_contests = JSON.parse(data);
	var active_contest_data = active_contests["active"];
	var numberOfActiveContests = 0;
	
	var prevContestName = "";

	hosts = JSON.parse(localStorage.getItem('hosts'));
	
	for (var i = 0; i < active_contest_data.length; i++) {
		if(prevContestName != active_contest_data[i].contest_name){
			active_card = applyStyle(active_contest_data[i]);

	 		if ((typeof localStorage["hosts"]) === 'undefined') {
				document.getElementById("active-contests").appendChild(active_card);
				numberOfActiveContests += 1;
			}
			else if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {
				document.getElementById("active-contests").appendChild(active_card);
				numberOfActiveContests += 1;
			}
		}
		prevContestName = active_contest_data[i].contest_name;
	}

	chrome.browserAction.setBadgeText({text:numberOfActiveContests.toString()});
}

// generates card for upcoming contest
function generateCardsPending(data) {

	var pending_tabs = document.getElementById("pending-contests");
	pending_tabs.innerHTML = "";

	var pending_contest_data = JSON.parse(data)["pending"];
	hosts = JSON.parse(localStorage.getItem('hosts'));

	var prevContestName = "";


	for (var i = 0; i < pending_contest_data.length; i++) {

		if(prevContestName != pending_contest_data[i].contest_name){
		
			upcomingDiv = applyStyle(pending_contest_data[i]);
		 	if ((typeof localStorage["hosts"]) === 'undefined') {
				document.getElementById("pending-contests").appendChild(upcomingDiv);
			}
			else if (hosts.hasOwnProperty(pending_contest_data[i].host_name)) {
				document.getElementById("pending-contests").appendChild(upcomingDiv);
			}

			prevContestName = pending_contest_data[i].contest_name;
		}
	}
}

// generates card for archived contest
function generateCardsArchive(data) {

	var archived_tabs = document.getElementById("archived-contests");
	archived_tabs.innerHTML = "";

	var archived_contest_data = JSON.parse(data)["archived"];
	hosts = JSON.parse(localStorage.getItem('hosts'));
	
	var prevContestName = "";

	for (var i = 0; i < archived_contest_data.length; i++) {

		if(prevContestName != archived_contest_data[i].contest_name){
		
			archived_card = applyStyle(archived_contest_data[i]);
		 	if ((typeof localStorage["hosts"]) === 'undefined') {
				document.getElementById("archived-contests").appendChild(archived_card);
			}
			else if (hosts.hasOwnProperty(archived_contest_data[i].host_name)) {
				document.getElementById("archived-contests").appendChild(archived_card);
			}

			prevContestName = archived_contest_data[i].contest_name;
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