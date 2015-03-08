function getData(callback) {
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 ) {
	        if(xmlhttp.status == 200){
	           	var data = xmlhttp.responseText;
	           	console.log(data);
	           	var active_contest_data = JSON.parse(data)["active"];
				var hosts = JSON.parse(localStorage.getItem('hosts'));
				var activeContestCount = 0;
				
				if(!((typeof localStorage["data"]) === 'undefined')) {
					localStorage.removeItem('data');
				}
		    	localStorage.setItem('data', data);
				
				var prevContestName = "";

				for (var i = 0; i < active_contest_data.length; i++) {
					if(prevContestName != active_contest_data[i].contest_name){
						if ((typeof localStorage["hosts"]) === 'undefined') {
							activeContestCount = activeContestCount + 1;
						}
						else if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {
							activeContestCount = activeContestCount + 1;
						}
					}
					prevContestName = active_contest_data[i].contest_name;
	           	}
	           	console.log(activeContestCount);
				callback(activeContestCount);
	       	}
	       	else {
	           
	       	}
	    }
	}

    xmlhttp.open("GET", "http://challengehuntapp.appspot.com", true);
    xmlhttp.send();
}

function getHosts(callback) {
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	    if (xmlhttp.readyState == 4 ) {
	        if(xmlhttp.status == 200){
	           	var data = xmlhttp.responseText;
	           	if(!((typeof localStorage["hosts_data"]) === 'undefined')) {
					localStorage.removeItem('hosts_data');
				}
		    	localStorage.setItem('hosts_data', data);
		    	callback(data);
		    	console.log(data);
		    }
	       	else {
	           
	       	}
	    }
	}
	xmlhttp.open("GET", "http://challengehuntapp.appspot.com/hosts", true);
    xmlhttp.send();
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
		chrome.tabs.create({ url: "http://challengehunt.github.io/challengehunt/help.html" });
	}
}

var pollInterval = 1000 * 60 * 15; // 15 minutes, in milliseconds

function startRequest() {
	initialize();
	console.log(pollInterval);
	window.setTimeout(startRequest, pollInterval);
} 

startRequest();