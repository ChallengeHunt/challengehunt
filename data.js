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
	active_tabs.innerText = JSON.parse(data)["active"];
}