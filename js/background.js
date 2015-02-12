// var i = 0;

// function initialize()
// 	window.setInterval(function() {
// 		$.ajax({
// 			type:'GET',
// 			url: "http://challengehuntapp.appspot.com",
// 			beforeSend: function () {
// 		      	// $("#target").loadingOverlay();
// 			},
// 		    success: function (data) {
// 		    	setCounter(data);
// 		    },
// 		    error: function(jq, status, message) {
// 	            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
// 	        }
// 		});
// 	}, 1000 * 60);
// }

// function setCounter(data) {

// 	var active_contest_data = JSON.parse(data)["active"];
// 	var hosts = JSON.parse(localStorage.getItem('hosts'));
// 	var activeContestCount = 0;
	
// 	for (var i = 0; i < active_contest_data.length; i++) {
// 		if ((typeof localStorage["hosts"]) === 'undefined') {
// 			document.getElementById("active-contests").appendChild(newDiv);
// 			activeContestCount = activeContestCount + 1;
// 		}
// 		else if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {
// 			document.getElementById("active-contests").appendChild(newDiv);
// 			activeContestCount = activeContestCount + 1;
// 		}
// 	}

// 	if (activeContestCount > 10) {
// 		chrome.browserAction.setBadgeText({text: "10+"});
// 	} else {
// 		chrome.browserAction.setBadgeText({text: ""+activeContestCount});
// 	}
// }


function getUnreadItems(callback) {
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com",
	    success: function (data) {
	    	console.log("success");
	    	var active_contest_data = JSON.parse(data)["active"];
			var hosts = JSON.parse(localStorage.getItem('hosts'));
			var activeContestCount = 0;
			
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

function updateBadge() {
	getUnreadItems(function(data) {
		chrome.browserAction.setBadgeText({text:data.toString()});
	});
}

var pollInterval = 1000 * 60 * 2; // 1 minute, in milliseconds

function startRequest() {
	updateBadge();
	console.log(pollInterval);
	window.setTimeout(startRequest, pollInterval);
}

startRequest();