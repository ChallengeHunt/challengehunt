var CHALLENGEHUNT = {}

CHALLENGEHUNT.contests = {
	HACKATHONS: 'Hackathons',
	CONTESTS: 'Contests',
	HIRING: 'Hiring',
	DATASCIENCE: 'DataScience',
};

var selectedHost= [
	{"name":"HackerEarth","host":"hackerearth.com"},
	{"name":"CodeForces","host":"codeforces.com"},
	{"name":"CftTime","host":"ctftime.org"},
	{"name":"CodeChef","host":"codechef.com"},
	{"name":"CodeJam","host":"google.com/codejam"},
	{"name":"HackerCup","host":"facebook.com/hackercup"},
	{"name":"HackerRank","host":"hackerrank.com"},
	{"name":"Kaggle","host":"kaggle.com"},
	{"name":"TopCoder","host":"topcoder.com"},
	{"name":"Spoj","host":"spoj.com"}
];

var hosts=[
	
	{"host_name": "hackerearth.com","style":"margin: 8px 8px 3px 18px;","color":"#175e7c","image":"img/hackerearth.com.png"},
	{"host_name": "codeforces.com","style":"width:67px;box-shadow: 1px 1px 5px #288bc9;","color":"#288bc9","image":"img/codeforces.com.png"},
	{"host_name": "ctftime.org","style":"width: 46px;box-shadow: 1px 1px 5px #fc0f3c;margin: 8px 8px 3px 9px;","color":"#fc0f3c","image":"img/ctftime.org.png"},
	{"host_name": "kaggle.com","style":"box-shadow: 1px 1px 5px #40bae5;margin: 8px 8px 3px 19px;","color":"#40bae5","image":"img/kaggle.com.png"},
	{"host_name": "hashcode.withgoogle.com","style":"width: 93px;box-shadow: 1px 1px 5px #4285f4;margin: 8px 5px 0px 0px;","color":"#4285f4","image":"img/hashcode_google.png"},
	{"host_name": "hackerrank.com","style":"box-shadow: 1px 1px 5px #1bb663;margin: 8px 8px 3px 19px;","color":"#1bb663","image":"img/hackerrank.com.png"},
	{"host_name": "topcoder.com","style":"width:58px;box-shadow: 1px 1px 5px #FF9800;","color":"#FF9800","image":"img/topcoder.com.png"},
	{"host_name": "codechef.com","style":"width:58px;box-shadow: 1px 1px 5px #745a46;","color":"#745a46","image":"img/codechef.com.png"},
	{"host_name": "facebook.com/hackercup","style":"width:65px;box-shadow: 1px 1px 5px #3e5d95;","color":"#3e5d95","image":"img/hackercup.jpg"},
	{"host_name": "google.com/codejam","style":"width:65px;box-shadow: 1px 1px 5px #161213;","color":"#161213","image":"img/codejam.png"},
	{"host_name": "spoj.com","style":"box-shadow: 1px 1px 5px #303F9F;margin: 8px 8px 3px 19px;","color":"#303F9F","image":"img/spoj.png"},
	{"host_name": "marathon24.com","style":"box-shadow: 1px 1px 5px #1a99fc;margin: 8px 8px 3px 19px;","color":"#1a99fc","image":"img/marathon24.com.png"},

];

var cards = function (data, type) {

	var currentTime = new Date();

	var activeCategories = data['active'];
	var upcomingCategories = data['upcoming'];

	var activeContainer=('#'+type+"_Active");
	var upcomingContainer=('#'+type+"_Upcoming");

	for(var i=0; i < activeCategories.length ; i++){

		var object = activeCategories[i];
		var contest_name = object['contest_name'];
		var contest_url = object['contest_url']; 
		var host_url = object['host_url']; 
		var host_name = object['host_name'];
		var duration = object['duration']; 

		if(type!="Hackathons"){

			var a=0;
			for(var k=0;k<selectedHost.length;k++){

				if(host_name==selectedHost[k]['host']){

					a=1;
					break;
				}
			}
			if(a==0){

				continue;
			}
			a=0;
		}
		
		if(type=="Hackathons"){

			var val1 = object['start_date'];
			var val2 = object['end_date'];	

			var startdate= val1.split("-");
			var enddate= val2.split("-");

			var startDate = new Date(parseInt(startdate[0]), parseInt(startdate[1]) - 1, parseInt(startdate[2]));
			var endDate = new Date(parseInt(enddate[0]), parseInt(enddate[1]) - 1, parseInt(enddate[2]));	

			var duration= (parseInt(endDate - startDate)/(1000*60*60));
			duration= (duration).toString() + ":00";
			
			var diff = endDate - currentTime;
			var durationInMs = parseInt(endDate - startDate);
			var timeLeft = diff / durationInMs;
			var progress = Math.floor((1-timeLeft)*100);
			if(parseInt(progress)>=100){progress=100;}
			val1='';
		}
		else{

			var val1 = object['end'].split('T')[0];
			var val2 = object['end'].split('T')[1];
			var datetime1= toTimeZone1(object['end']);
			
			var timeZone= toTimeZone(object['end']);
			timeZone=timeZone.split(',');

			val1=dateFormatted(timeZone[0],timeZone[1]); 
			val2=(timeZone[1]).trim();

			var date= val1.split("-");
			var time= val2.split(":");
			var d1 = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0); 
			var diff = datetime1 - currentTime;

			var dur1=duration;
			var a= dur1.split(":");
			var b= dur1.split(" ");

			if(b.length==2){

				if(b[1]=="days"){

					var dur2=parseInt(duration)*24;
				}
				if(b[1]=="years"){

					var dur2=parseInt(duration)*365*24;
				}
			}
			if(a.length==2){

				var dur2=parseInt(a[0]);
			}

			var durationInMs = dur2*60*60*1000; // duration in milliseconds
			var timeLeft = diff / durationInMs;
			var progress = Math.floor((1-timeLeft)*100);
			if((parseInt(progress))>=100){progress=100;}
		}
		
		var host_color="";
		var host_style="";
		var host_image="";

		for(var j=0;j<hosts.length;j++){

			if(hosts[j]['host_name'] == host_name){

				host_color=hosts[j]['color'];
				host_style=hosts[j]['style'];	
				host_image=hosts[j]['image'];	
			}
		}

		if(host_color.length ==0){

			host_color="#292929";
			host_style="box-shadow: 1px 1px 5px #292929;margin: 8px 8px 3px 19px;";
			host_image="img/default.jpg";		
		}
		
		$('' + activeContainer).append(
		  $('<div/>',{
			class: 'card',
			id:''+contest_url,
		  }).append(
				$('<div/>', {
					class: 'cardHeader',
			  }).append(
			  	$('<div/>', {
			  		class: 'titleBlock',	
			  	}).append(
			  		$('<div/>', {
			  			class: 'cardTitle',
			  			'style': ''+host_color,	
			  			'text': ''+contest_name
			  		})
			  	)
			  	.append(
			  		$('<img>', {
			  			class: 'cardOrganiserPic',
			  			style: ''+host_style,
			  			'src': ''+host_image,
			  			'alt':''+host_name	
			  		})
			  	)		
			  ).append(
			  	$('<div/>', {
			  		class: 'cardOrganiser',
			  		text: ''+host_name		
			  	})
			  ).append(
			  	$('<div/>', {
			  		class: 'cardDate',	
			  	}).append(
			  		$('<div/>', {

			  			class: 'timeTile',	
			  		}).append(
			  			$('<div/>', {

			  				class: 'durationTile',	
			  			}).append(
			  				$('<i/>', {

				  				class: 'fa fa-hourglass-half durationIcon',	
				  			})
			  			).append(
			  				$('<div/>', {

				  				class: 'durationLabel',
				  				'text': duration, 	
				  			})
			  			)
			  		).append(
			  			$('<div/>', {

			  				class: 'timeStamp',	
			  			}).append(
			  				$('<i/>', {

				  				class: 'fa fa-clock-o timeIcon',	
				  			})
			  			).append(
			  				$('<div/>', {

				  				class: 'time',
				  				'text': ''+val1+' '+val2, 	
				  			})
			  			)
			  		)
			  	).append(
			  		$('<div/>', {

			  			class: 'date',	
			  		}).append(
			  			$('<div/>', {

			  				class:'dateTitle',
			  				'text':progress+'% Complete',
			  			})
			  		)
			  	).append(
			  		$('<div/>', {

			  			class: 'dateSlider',	
			  		}).append(
			  			$('<div/>', {

			  				class: 'cardprogress',
			  			}).append(
			  				$('<div/>', {

				  				class: 'progressCss progress',
				  				id:'myProgressbar1',
				  				'style': 'height:10px;width: 100%;'
				  			}).append(
				  				$('<div/>', {

					  				class: 'progress-bar',
					  				role: 'progressbar',
					  				'aria-valuenow': "0",
					  				'aria-valuemi':"0", 
					  				'aria-valuemax':"100",
					  				'style':'height:10px;width: '+progress+"%"+';background-color:#70B230'
					  			}).append(
					  				$('<span/>', {

						  				class: 'sr-only',
						  				'text': progress+'% Complete', 
					  				})
					  			)
					  		)
				  		).append(
				  			$('<div/>',{

				  				class:'circle',
				  				'style':'left:'+(progress-1)+"%",
				  			})
				  		)
			  		)
			  	)
			  )
			).append(
				$('<div/>', {
					class: 'cardFooter',
					'style': 'height:30px',
			  })
			)
		);
		
	}

	for(var i=0; i < upcomingCategories.length ; i++){

		var object = upcomingCategories[i];
		var contest_name = object['contest_name'];
		var contest_url = object['contest_url']; 
		var host_url = object['host_url']; 
		var host_name = object['host_name'];
		var duration = object['duration']; 

		if(type!="Hackathons"){

			var a=0;
			for(var k=0;k<selectedHost.length;k++){

				if(host_name==selectedHost[k]['host']){

					a=1;
					break;
				}
			}
			if(a==0){

				continue;
			}
			a=0;
		}

		var location='';
		var startDuration="";
		if(type=="Hackathons"){

			var val1 = object['start_date'];
			var val2 = object['end_date'];
			var startdate= val1.split("-");
			var enddate= val2.split("-");

			var startDate = new Date(parseInt(startdate[0]), parseInt(startdate[1]) - 1, parseInt(startdate[2]));
			var endDate = new Date(parseInt(enddate[0]), parseInt(enddate[1]) - 1, parseInt(enddate[2]));	

			var duration= (parseInt(endDate - startDate)/(1000*60*60));
			duration= (duration).toString() + ":00";
			
			val2=dateCreated(val1);
			val1='';

			var beginTime= (parseInt(startDate-currentTime)/(1000*60*60));	
			beginTime=Math.round(beginTime);
			beginTimeString = beginTime + ' hours';

			if (beginTime > 24) {
				beginTime = Math.floor(beginTime/24);
				beginTimeString = beginTime + ' day(s)';
			}

			var location = object['location']; 	
		}
		else{

			var val1 = object['start'].split('T')[0];
			var val2 = object['start'].split('T')[1];
			var datetime1= toTimeZone1(object['start']);
			
			var timeZone= toTimeZone(object['start']);
			timeZone=timeZone.split(',');

			val1=dateFormatted(timeZone[0],timeZone[1]); 
			val2=(timeZone[1]).trim();

			var date= val1.split("-");
			var time= val2.split(":");
			var d1 = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]), 0); 
			var beginTime = (parseInt(datetime1 - currentTime) / (1000*60*60));
			beginTime=Math.round(beginTime);
			beginTimeString = beginTime + ' hours';

			if (beginTime > 24) {
				beginTime = Math.floor(beginTime/24);
				beginTimeString = beginTime + ' day(s)';
			}


		}

		var host_color="";
		var host_style="";
		var host_image="";
		
		for(var j=0;j<hosts.length;j++){

			if(hosts[j]['host_name'] == host_name){

				host_color=hosts[j]['color'];
				host_style=hosts[j]['style'];	
				host_image=hosts[j]['image'];	
			}
		}

		if(host_color.length ==0){

			host_color="#292929";
			host_style="box-shadow: 1px 1px 5px #292929;margin: 8px 8px 3px 19px;";
			host_image="img/default.jpg";	
		}
		
		$('' + upcomingContainer).append(
		  $('<div/>',{
			class: 'card',
			id:''+contest_url,
		  }).append(
				$('<div/>', {
					class: 'cardHeader',
			  }).append(
			  	$('<div/>', {
			  		class: 'titleBlock',	
			  	}).append(
			  		$('<div/>', {
			  			class: 'cardTitle',
			  			'style': ''+host_color,	
			  			'text': ''+contest_name
			  		})
			  	)
			  	.append(
			  		$('<img>', {
			  			class: 'cardOrganiserPic',
			  			style: ''+host_style,
			  			'src': ''+host_image,
			  			'alt':''+host_name	
			  		})
			  	)		
			  ).append(
			  	$('<div/>', {
			  		class: 'cardOrganiser',
			  		text: ''+host_name		
			  	})
			  ).append(
			  	$('<div/>', {
			  		class: 'cardDate',	
			  	}).append(
			  		$('<div/>', {

			  			class: 'timeTile',	
			  		}).append(
			  			$('<div/>', {

			  				class: 'durationTile',	
			  			}).append(
			  				$('<i/>', {

				  				class: 'fa fa-hourglass-half durationIcon',	
				  			})
			  			).append(
			  				$('<div/>', {

				  				class: 'durationLabel',
				  				'text': duration, 	
				  			})
			  			)
			  		).append(
			  			$('<div/>', {

			  				class: 'timeStamp',	
			  			}).append(
			  				$('<i/>', {

				  				class: 'fa fa-clock-o timeIcon',	
				  			})
			  			).append(
			  				$('<div/>', {

				  				class: 'time',
				  				'text': ''+val1+' '+val2, 	
				  			})
			  			)
			  		)
			  	).append(
			  		$('<div/>', {

			  			class: 'date',	
			  		}).append(
			  			$('<div/>', {

			  				class:'dateLabel',
			  				'text':'Begins in '+beginTimeString,
			  			})
			  		).append(
			  			$('<div/>', {

			  				class:'location',
			  				'style': 'display:flex;'

			  			}).append(
			  				$('<i/>', {

			  					class:"fa fa-map-marker fa-locate"
			  				})
			  			).append(
			  				$('<div/>', {

			  					class:'locationText',
			  					'text':''+location,
			  				})
			  			)
			  		)
			  	).append(
			  		$('<div/>', {

			  			class: 'dateSlider',	
			  		}).append(
			  			$('<div/>', {

			  				class: 'cardprogress',
			  			}).append(
			  				$('<div/>', {

				  				class: 'progressCss progress',
				  				id:'myProgressbar1',
				  				'style': 'height:10px;width: 100%;'
				  			}).append(
				  				$('<div/>', {

					  				class: 'progress-bar',
					  				role: 'progressbar',
					  				'aria-valuenow': "0",
					  				'aria-valuemi':"0", 
					  				'aria-valuemax':"100",
					  				'style':'width: 0%;height:10px;width:0%;background-color:#70B230'
					  			}).append(
					  				$('<span/>', {

						  				class: 'sr-only',
						  				'text': '45% Complete', 
					  				})
					  			)
					  		)
				  		).append(
				  			$('<div/>',{

				  				class:'circle',
				  			})
				  		)
			  		)
			  	)
			  )
			).append(
				$('<div/>', {

					class: 'cardFooter',
			  	}).append(
					$('<i/>', {

						class: 'fa fa-calendar-check-o',
						'style': 'color:#fff'
					})
			  	).append(
			  		$('<p/>', {

			  			class:'calenderTitle',
			  			'text':'Add To Calender'
			  		})
			  	)
			)
		);
		
	}	

}

var selectedHosts = function () {

	for(var i=0 ;i< selectedHost.length; i++){

		$('input[value="'+selectedHost[i]['host']+'"]').prop("checked",true);
	}

};

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
	    	localStorage.DATASCIENCE = JSON.stringify(challengeData['ds_q']);
	    	
	    	contestsData = challengeData['contests'];
	    	hiringData = challengeData['hiring'];
	    	hackathonData = challengeData['hackathons'];
	    	datascienceData = challengeData['ds_q'];
			
			cards(contestsData, CHALLENGEHUNT.contests.CONTESTS);
			cards(hiringData, CHALLENGEHUNT.contests.HIRING);
			cards(hackathonData, CHALLENGEHUNT.contests.HACKATHONS);
			cards(datascienceData, CHALLENGEHUNT.contests.DATASCIENCE);
	    },
	    error: function(jq, status, message) {
	    }
	});
};

$(document).ready(function(){
	challengeData();
	selectedHosts();

	$('.dropdown-toggle').dropdown();

	$("#cmn-toggle-4").click(function(){

		var element=$("#cmn-toggle-4").prop("checked");
		var category=$(".selected")[0].text;
		if(element==true){

			$(".activeCategory").css("display","none");
			$(".upcomingCategory").css("display","block");
			$("#"+category+"_Active").css("display","none");
			$("#"+category+"_Upcoming").css("display","block");
		}
		if(element==false){

			$(".upcomingCategory").css("display","none");	
			$(".activeCategory").css("display","block");
			$("#"+category+"_Upcoming").css("display","none");
			$("#"+category+"_Active").css("display","block");
		}
	});

	$('#saveButton').click(function(){

		var checkedUsers=[];
		$('input:checkbox[name="hosts"]:checked').each(function(){

			checkedUsers.push($(this).attr("id"));
		});

		console.log(checkedUsers);
	});

	$('.navItem').click(function(){

		var element=$("#cmn-toggle-4").prop("checked");
		$('.navItem').parent().css("border-bottom","");	
		$('.navItem').removeClass("selected");	
		$(this).parent().css("border-bottom","3px solid #fff");
		$(this).addClass("selected");
		$('.cards').css("display","none");
		$('.categoryCards').css("display","none");
		var category=$(".selected")[0].text;
		$("#"+category).css("display","block");

		if(element==false){
			$("#"+category+"_Upcoming").css("display","none");
			$("#"+category+"_Active").css("display","block");
		}else{
			$("#"+category+"_Active").css("display","none");
			$("#"+category+"_Upcoming").css("display","block");
		}
		
	});

	$(".cards").on("click", "div.card", function(){
		var url = $(this).attr("id");
		window.open(url);
	});



});