var CONTESTS = {}

var challengeData = function () {
	$.ajax({
		type:'GET',
		url: 'http://testchallengehunt.appspot.com/v1/all',
		beforeSend: function () {
	    // $("#target").loadingOverlay();
		},
    success: function (data) {
    	challengeData = JSON.parse(data);
    	localStorage.cache = data;
    	localStorage.HACKATHONS = JSON.stringify(challengeData['hackathons']);
    	localStorage.HIRING = JSON.stringify(challengeData['hiring']);
    	localStorage.CONTESTS = JSON.stringify(challengeData['contests']);
    },
    error: function(jq, status, message) {
    }
	});
}

$(document).ready(function(){
	getChallengeData();
});