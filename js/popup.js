var CHALLENGEHUNT = {}

CHALLENGEHUNT.contests = {
	HACKATHONS: 'Hackathons',
	CONTESTS: 'Contests',
	HIRING: 'Hiring',
	DATASCIENCE: 'DS',
}

var cards = function (data, type) {

	// console.log(data);
	console.log(type);
	challengeData = data['upcoming'];
	// console.log(challengeData);
	for (var i = 0; i < challengeData.length; i++) {
		$('#accordion' + type).append(
		  $('<div/>',{
			class: 'panel panel-default',
		  }).append(
				$('<div/>', {
					class: 'panel-heading',
					role: 'tab',
					id: 'heading' + type + i, 
					style: 'background-color:white;',
			  }).append(
			  	$('<h4/>', {
			  		class: 'panel-title',
			  	}).append(
			  		$('<a/>', {
			  			'data-toggle': 'collapse',
			  			'data-parent': '#accordion' + type,
			  			'href': '#collapse' + type + i,
			  			'aria-expanded': 'true',
			  			'aria-controls': 'collapse' + type + i,
			  			'text': challengeData[i]['contest_name']
			  		})
			  	)
			  )
			).append(
				$('<div/>', {
					'class': 'panel-collapse collapse',
					'role': 'tabpanel',
					'id': 'collapse' + type + i, 
					'aria-labelledby': 'heading' + type + i,
			  }).append(
			  	$('<ul/>', {
			  		class: 'list-group list-group-flush',
			  	}).append(
			  		$('<li/>', {
			  			'class': 'list-group-item',
			  			'text': 'Starts: ' + challengeData[i]['start']
			  		}),
			  		$('<li/>', {
			  			'class': 'list-group-item',
			  			'text': 'Duration:' + challengeData[i]['duration']
			  		}),
			  		$('<li/>', {
			  			'class': 'list-group-item',
			  			'text': 'Add to calendar'
			  		})
			  	)
			  )
			).append(
				$('<p/>', {
					'class': 'card-text',
				}).append(
					$('<small/>', {
						class: 'text-muted',
						text: 'ends in 2 days',
					})
				)
			)
		);
	}
}

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
    	console.log('yo');
    	contestsData = challengeData['contests'];
    	hiringData = challengeData['hiring'];
    	hackathonData = challengeData['hackathons'];
    	cards(contestsData, CHALLENGEHUNT.contests.CONTESTS);
    	cards(hackathonData, CHALLENGEHUNT.contests.HACKATHONS);
    	cards(hiringData, CHALLENGEHUNT.contests.HIRING);
    	console.log('bo');
    },
    error: function(jq, status, message) {
    }
	});
}

$(document).ready(function(){
	challengeData();
});