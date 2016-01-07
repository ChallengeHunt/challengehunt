var CONTESTS = {}

var cards = function (data) {

	challengeData = data['contests']['active'];
	console.log(challengeData);
	for (var i = 0; i < challengeData.length; i++) {
		$('#accordion').append(
		  $('<div/>',{
			class: 'panel panel-default',
		  }).append(
				$('<div/>', {
					class: 'panel-heading',
					role: 'tab',
					id: 'heading' + i, 
					style: 'background-color:white;',
			  }).append(
			  	$('<h4/>', {
			  		class: 'panel-title',
			  	}).append(
			  		$('<a/>', {
			  			'data-toggle': 'collapse',
			  			'data-parent': '#accordion',
			  			'href': '#collapse' + i,
			  			'aria-expanded': 'true',
			  			'aria-controls': 'collapse' + i,
			  			'text': challengeData[i]['contest_name']
			  		})
			  	)
			  )
			).append(
				$('<div/>', {
					'class': 'panel-collapse collapse',
					'role': 'tabpanel',
					'id': 'collapse' + i, 
					'aria-labelledby': 'heading' + i,
			  }).append(
			  	$('<ul/>', {
			  		class: 'list-group list-group-flush',
			  	}).append(
			  		$('<li/>', {
			  			'class': 'list-group-item',
			  			'text': 'Ends: saturday, bla blah time'
			  		}),
			  		$('<li/>', {
			  			'class': 'list-group-item',
			  			'text': 'Duration: 4h'
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
    	cards(challengeData);
    	console.log('bo');
    },
    error: function(jq, status, message) {
    }
	});
}

$(document).ready(function(){
	challengeData();
});