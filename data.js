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
	    	challengeData(data);
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
	    	$('#fasletokenize').hide();
	    	loadDropDownWithHosts(data);
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

getHosts();

function challengeData(data) {
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
		 	var endDateTime = active_contest_data[i].end.split("T");

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
	// console.log(hosts);
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

	// selectUserHosts();
	// whenReady();
	loadDropDown();
}