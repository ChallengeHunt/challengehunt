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

	var randomNumber = 0;

	for (var i = 0; i <= active_contest_data.length; i++) {
	
	var newDiv = document.createElement('div');
	newDiv.style.width = "360px";
 	newDiv.style.height = "130px"; 
 	newDiv.style.borderStyle = "solid"; 
 	newDiv.style.borderWidth = "2px";
 	newDiv.style.borderColor = "black";
 	newDiv.style.borderRadius = "8px 8px 8px 8px";
 	newDiv.style.borderColor = "black";
 	newDiv.style.marginBottom = "15px";
 

 	if(randomNumber<9){
 		randomNumber = randomNumber+1;
	}else{
		randomNumber = 1;
	}


 	if(randomNumber==1){
		newDiv.style.background = "#66FF33"; 
 	}else if(randomNumber==4){
		newDiv.style.background = "#FFFF4D"; 
 	}else if(randomNumber==6){
		newDiv.style.background = "#FF8533"; 
 	}else if(randomNumber==2){
		newDiv.style.background = "#FF85AD"; 
 	}else if(randomNumber==8){
		newDiv.style.background = "#DB94FF"; 
 	}else if(randomNumber==3){
		newDiv.style.background = "#70B8FF"; 
 	}else if(randomNumber==5){
		newDiv.style.background = "#82FFFF"; 
 	}else if(randomNumber==7){
		newDiv.style.background = "#CCFF33"; 
 	}else if(randomNumber==9){
		newDiv.style.background = "#47DAB5"; 
 	}

 	var startDateTime = active_contest_data[i].start.split("T");
 	var endDateTime = active_contest_data[i].end.split("T");
 	var startTime = startDateTime[1].split("+");
	var endTime = endDateTime[1].split("+");

	var lengthOfContestname = active_contest_data[i].contest_name.length;

	if(lengthOfContestname < 30)
 	{
 		 	newDiv.innerHTML ="<img src='/img/codechef.com.png' style='width:98px;height:48px'>"+
 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startDateTime[0] +"<br>"+
 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[0] +"</div>" +"<br>"+ 
 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"  "+ active_contest_data[i].contest_name+ "</div>" +
 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+ active_contest_data[i].host_name +"</div>" +"<br>"+
 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endDateTime[0] +"<br>"+  
 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[0] +"</div>"+ "<br>"+  
 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

 	}else{
			newDiv.innerHTML ="<img src='/img/codechef.com.png' style='width:98px;height:48px'>"+
 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startDateTime[0] +"<br>"+
 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[0] +"</div>" +"<br>"+ 
 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-20px; '>"+"  "+ "<marquee>"+active_contest_data[i].contest_name+ "</marquee></div>" +
 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+ active_contest_data[i].host_name +"</div>" +"<br>"+
 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endDateTime[0] +"<br>"+  
 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[0] +"</div>"+ "<br>"+  
 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

 	}

 	document.getElementById("active-contests").appendChild(newDiv);

};

// stopMarqueeOnHover();

}

// function stopMarqueeOnHover () {
// 		$("marquee").hover(function () { 
//    			 this.stop();
// 		}, function () { 
//     		this.start();
// 		});		
// 	}