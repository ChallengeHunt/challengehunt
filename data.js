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
	var hosts = "";
	$.ajax({
		type:'GET',
		url: "http://challengehuntapp.appspot.com/hosts",
		beforeSend: function () {
	      	var loading_screen = pleaseWait({
			  logo: "assets/images/pathgather.png",
			  backgroundColor: '#f46d3b',
			  loadingHtml: "<div class='sk-spinner sk-spinner-wave'><div class='sk-rect1'></div><div class='sk-rect2'></div><div class='sk-rect3'></div><div class='sk-rect4'></div><div class='sk-rect5'></div></div>"
			});
		},
	    success: function (data) {
	    	// $('#target').loadingOverlay('remove');
	    	hosts = data;
	    },
	    error: function(jq, status, message) {
            alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
	return contests;
}


function challengeData(data) {
	var active_tabs = document.getElementById("active-contests");
	console.log(JSON.parse(data));
	// active_tabs.innerText = JSON.parse(data)["active"];

	var active_contest_data = JSON.parse(data)["active"];

for (var i = 0; i <= active_contest_data.length; i++) {
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

};
	
}