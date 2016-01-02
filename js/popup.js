function getChallengeData() {
	$.ajax({
		type:'GET',
		url: 'http://testchallengehunt.appspot.com/v1/all',
		beforeSend: function () {
	    // $("#target").loadingOverlay();
		},
    success: function (data) {
    	console.log(data);
    },
    error: function(jq, status, message) {
    }
	});
}

$(document).ready(function(){
	getChallengeData();
});