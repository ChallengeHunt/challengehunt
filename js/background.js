function getData(callback) {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com",
	    success: function (data) {
	    	console.log("success");
	    	var active_contest_data = JSON.parse(data)["active"];
			var hosts = JSON.parse(localStorage.getItem('hosts'));
			var activeContestCount = 0;
			if(!((typeof localStorage["data"]) === 'undefined')) {
				localStorage.removeItem('data');
			}
	    	localStorage.setItem('data', data);
			
			for (var i = 0; i < active_contest_data.length; i++) {
				if ((typeof localStorage["hosts"]) === 'undefined') {
					// document.getElementById("active-contests").appendChild(newDiv);
					activeContestCount = activeContestCount + 1;
				}
				else if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {
					// document.getElementById("active-contests").appendChild(newDiv);
					activeContestCount = activeContestCount + 1;
				}
			}

			console.log(activeContestCount);
			callback(activeContestCount)
	    },
	});
}

function getHosts(callback) {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com/hosts",
	    success: function (data) {
	    	if(!((typeof localStorage["hosts_data"]) === 'undefined')) {
				localStorage.removeItem('hosts_data');
			}
	    	localStorage.setItem('hosts_data', data);
	    	callback(data);
	    	console.log(data);
	    },
	});
}

function isFirstInstall() {

	if(!localStorage.settings) {
	   settings = {};
	   settings["firstuse"] = 1;     
	   localStorage.settings = JSON.stringify(settings);
	   console.log("yo install");	
	   return true;
	}
	return false;
}

function initialize() {

	getData(function(data) {
		chrome.browserAction.setBadgeText({text:data.toString()});
	});

	if (isFirstInstall()) {
		getHosts(function(data){});
		chrome.tabs.create({ url: "https://google.com" });
	}
}

var pollInterval = 1000 * 60 * 15; // 15 minutes, in milliseconds

function startRequest() {
	initialize();
	console.log(pollInterval);
	window.setTimeout(startRequest, pollInterval);
} 

startRequest();