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
	    	if(!((typeof localStorage["data"]) === 'undefined')) {
				localStorage.removeItem('data');
			}
	    	localStorage.setItem('data', data);
	    	$("#loader-drop-down").hide();
	    	// $("#cd-tabs").show();
	    	document.getElementById("c-tabs").style.visibility = "visible";
	    	generateCards(data);
	    	generateCardsArchive(data);
	    	generateCardsPending(data);
	    		
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
	      	
		},
	    success: function (data) {
	    	$("#loader-select-menu").hide();
	    	loadDropDownWithHosts(data);
	    },
	    error: function(jq, status, message) {
            // alert('A jQuery error has occurred. Status: ' + status + ' - Message: ' + message);
        }
	});
}

getHosts();

function toTimeZone(time) {

	var dateTimeTimezone = time.split("T");
	var date = dateTimeTimezone[0].split("-");
	var timeAndTimeZone = dateTimeTimezone[1].split("T")
	var time = timeAndTimeZone[0].split(":");
	var d = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0)
	var offset = -(d.getTimezoneOffset());
	var newD = new Date(d.getTime() + offset*60000);
    return newD.toLocaleString()
}

function generateCards(data) {

	var active_tabs = document.getElementById("active-contests");
	active_tabs.innerHTML = "";
	console.log(JSON.parse(data));
	// active_tabs.innerText = JSON.parse(data)["active"];

	var active_contest_data = JSON.parse(data)["active"];

	var randomNumber = 0;
	hosts = JSON.parse(localStorage.getItem('hosts'));
	
	for (var i = 0; i < active_contest_data.length; i++) {

	
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

		var startTime = toTimeZone(active_contest_data[i].start).split(",");
		var endTime = toTimeZone(active_contest_data[i].end).split(",");

		var lengthOfContestname = active_contest_data[i].contest_name.length;
		
		if(imageExists("/img/"+active_contest_data[i].host_name+".png")){
			if(lengthOfContestname < 30) {

	 		 	newDiv.innerHTML ="<img src='/img/"+ active_contest_data[i].host_name  +".png' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"	+startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px;'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"<a href='"+active_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +active_contest_data[i].contest_name+ "</a></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+"<a href='"+active_contest_data[i].host_url +"' target='_blank' style='color:black'>" + active_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

				
	 	}else{
				newDiv.innerHTML ="<img src='/img/"+ active_contest_data[i].host_name +".png' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-23px; '>"+"  "+ "<marquee>" + "<a href='"+active_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +active_contest_data[i].contest_name+ "</marquee></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>" +"<a href='"+active_contest_data[i].host_url +"' target='_blank' style='color:black'>" +active_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

	 	}

		}else{


					if(lengthOfContestname < 30) {

	 		 	newDiv.innerHTML ="<img src='/img/default.jpg' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"	+startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px;'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"<a href='"+active_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +active_contest_data[i].contest_name+ "</a></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+"<a href='"+active_contest_data[i].host_url +"' target='_blank' style='color:black'>" + active_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

				
	 	}else{
				newDiv.innerHTML ="<img src='/img/default.jpg' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-23px; '>"+"  "+ "<marquee>" + "<a href='"+active_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +active_contest_data[i].contest_name+ "</marquee></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>" +"<a href='"+active_contest_data[i].host_url +"' target='_blank' style='color:black'>" +active_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ active_contest_data[i].duration +"</span>";

	 	}

		}



	 	if ((typeof localStorage["hosts"]) === 'undefined') {
			document.getElementById("active-contests").appendChild(newDiv);
		}
		else if (hosts.hasOwnProperty(active_contest_data[i].host_name)) {
			document.getElementById("active-contests").appendChild(newDiv);
		}
	}
}

function generateCardsPending(data) {

	var pending_tabs = document.getElementById("pending-contests");
	pending_tabs.innerHTML = "";
	console.log(JSON.parse(data));
	// pending_tabs.innerText = JSON.parse(data)["pending"];

	var pending_contest_data = JSON.parse(data)["pending"];

	var randomNumber = 0;
	hosts = JSON.parse(localStorage.getItem('hosts'));
	
	for (var i = 0; i < pending_contest_data.length; i++) {

	
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

		var startTime = toTimeZone(pending_contest_data[i].start).split(",");
		var endTime = toTimeZone(pending_contest_data[i].end).split(",");

		var lengthOfContestname = pending_contest_data[i].contest_name.length;
		
		if(imageExists("/img/"+pending_contest_data[i].host_name+".png")){
			if(lengthOfContestname < 30) {

	 		 	newDiv.innerHTML ="<img src='/img/"+ pending_contest_data[i].host_name  +".png' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"	+startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px;'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"<a href='"+pending_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +pending_contest_data[i].contest_name+ "</a></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+"<a href='"+pending_contest_data[i].host_url +"' target='_blank' style='color:black'>" + pending_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ pending_contest_data[i].duration +"</span>";

				
	 	}else{
				newDiv.innerHTML ="<img src='/img/"+ pending_contest_data[i].host_name +".png' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-23px; '>"+"  "+ "<marquee>" + "<a href='"+pending_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +pending_contest_data[i].contest_name+ "</marquee></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>" +"<a href='"+pending_contest_data[i].host_url +"' target='_blank' style='color:black'>" +pending_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ pending_contest_data[i].duration +"</span>";

	 	}

		}else{


					if(lengthOfContestname < 30) {

	 		 	newDiv.innerHTML ="<img src='/img/default.jpg' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"	+startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px;'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"<a href='"+pending_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +pending_contest_data[i].contest_name+ "</a></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+"<a href='"+pending_contest_data[i].host_url +"' target='_blank' style='color:black'>" + pending_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ pending_contest_data[i].duration +"</span>";

				
	 	}else{
				newDiv.innerHTML ="<img src='/img/default.jpg' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-23px; '>"+"  "+ "<marquee>" + "<a href='"+pending_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +pending_contest_data[i].contest_name+ "</marquee></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>" +"<a href='"+pending_contest_data[i].host_url +"' target='_blank' style='color:black'>" +pending_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ pending_contest_data[i].duration +"</span>";

	 	}

		}



	 	if ((typeof localStorage["hosts"]) === 'undefined') {
			document.getElementById("pending-contests").appendChild(newDiv);
		}
		else if (hosts.hasOwnProperty(pending_contest_data[i].host_name)) {
			document.getElementById("pending-contests").appendChild(newDiv);
		}
	}
}




function generateCardsArchive(data) {

	var archived_tabs = document.getElementById("archived-contests");
	archived_tabs.innerHTML = "";
	console.log(JSON.parse(data));
	// archived_tabs.innerText = JSON.parse(data)["archived"];

	var archived_contest_data = JSON.parse(data)["archived"];

	var randomNumber = 0;
	hosts = JSON.parse(localStorage.getItem('hosts'));
	
	for (var i = 0; i < archived_contest_data.length; i++) {

	
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

		var startTime = toTimeZone(archived_contest_data[i].start).split(",");
		var endTime = toTimeZone(archived_contest_data[i].end).split(",");

		var lengthOfContestname = archived_contest_data[i].contest_name.length;
		
		if(imageExists("/img/"+archived_contest_data[i].host_name+".png")){
			if(lengthOfContestname < 30) {

	 		 	newDiv.innerHTML ="<img src='/img/"+ archived_contest_data[i].host_name  +".png' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"	+startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px;'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"<a href='"+archived_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +archived_contest_data[i].contest_name+ "</a></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+"<a href='"+archived_contest_data[i].host_url +"' target='_blank' style='color:black'>" + archived_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ archived_contest_data[i].duration +"</span>";

				
	 	}else{
				newDiv.innerHTML ="<img src='/img/"+ archived_contest_data[i].host_name +".png' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-23px; '>"+"  "+ "<marquee>" + "<a href='"+archived_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +archived_contest_data[i].contest_name+ "</marquee></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>" +"<a href='"+archived_contest_data[i].host_url +"' target='_blank' style='color:black'>" +archived_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ archived_contest_data[i].duration +"</span>";

	 	}

		}else{


					if(lengthOfContestname < 30) {

	 		 	newDiv.innerHTML ="<img src='/img/default.jpg' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 						"<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"	+startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px;'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:5px; '>"+"<a href='"+archived_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +archived_contest_data[i].contest_name+ "</a></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>"+"<a href='"+archived_contest_data[i].host_url +"' target='_blank' style='color:black'>" + archived_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ archived_contest_data[i].duration +"</span>";

				
	 	}else{
				newDiv.innerHTML ="<img src='/img/default.jpg' style='border:2px solid black; border-radius: 10px; margin-top:1px; margin-left:1px;height:30%;width30%;margin-bottom:12px;'>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style=' float:right; margin-top:5px; margin-right:3px'>"+ startTime[0] +"<br>"+
	 					  "<i class='fa fa-play' style=' margin-right:5px'></i>"+startTime[1] +"</div>" +"<br>"+ 
	 					  "<span style='color:black; font-size:24px;  font-family: Courgette, cursive;'>"+"<div style='text-align:center; margin-top:-23px; '>"+"  "+ "<marquee>" + "<a href='"+archived_contest_data[i].contest_url +"' target='_blank' style='color:black'>" +archived_contest_data[i].contest_name+ "</marquee></div>" +
	 					  "<span style='color:black; font-size:14px; font-family: Inconsolata, ;'>"+"<div style='text-align:center; margin-top:0px; '>" +"<a href='"+archived_contest_data[i].host_url +"' target='_blank' style='color:black'>" +archived_contest_data[i].host_name +"</a></div>" +"<br>"+
	 					  "<span style='color:black; font-size:12px; font-family: Roboto, sans-serif;'>"+"  "+"<div style='float:right; margin-top:-20px; margin-right:3px; margin-bottom:3px'>"+ endTime[0] +"<br>"+  
	 					  "<i class='fa fa-stop' style=' margin-right:5px'></i>"+ endTime[1] +"</div>"+ "<br>"+  
	 					  "<span style='color:black; font-size:18px; margin-top:5px'>"+"<div style='text-align:left; margin-top:-35px'>"+"  "+ archived_contest_data[i].duration +"</span>";

	 	}

		}



	 	if ((typeof localStorage["hosts"]) === 'undefined') {
			document.getElementById("archived-contests").appendChild(newDiv);
		}
		else if (hosts.hasOwnProperty(archived_contest_data[i].host_name)) {
			document.getElementById("archived-contests").appendChild(newDiv);
		}
	}
}

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('GET', image_url, false);
    http.send();

    return http.status != 404;
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
					console.log("already there")
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
			}
		},
	});
	
}