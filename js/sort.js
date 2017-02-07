// Author : Shashank Singh (github.com/shashankatgit)
// Contributed code for ChallengeHunt Extension

	$('#sort-toggle').click(function()
	{
		console.log('sort baby');

		selectedCategory = $(".selected")[0].text;
		selectedCategoryLowerCase = selectedCategory.toLowerCase();

		dataObject = JSON.parse(localStorage.getItem('data'));
		data = dataObject[''+selectedCategoryLowerCase];
		console.log(data);

		console.log(data['contests']);
		var element=$("#sort-toggle").prop("checked");

		if(element==true){
			sortEventArrayOnDuration(data['active']);
			sortEventArrayOnDuration(data['upcoming']);
		}

		var activeContainer = document.getElementById(''+selectedCategory+'_Active');
		var upcomingContainer = document.getElementById(''+selectedCategory+'_Upcoming');

		activeContainer.parentNode.removeChild(activeContainer);
		upcomingContainer.parentNode.removeChild(upcomingContainer);

		console.log(data['contests']);
		callCardsFunction(data,selectedCategory);
	});


function sortEventArrayOnDuration(array)
{
	array.sort(function (elem1, elem2) {
		var dur1 = elem1.duration;
		var dur2 = elem2.duration;

		// elem1.contest_name='aaa';
		// elem2.contest_name='aaa';

		var durInt1;
		var durInt2;
		if(dur1.includes('hour'))
		{
				durInt1=dur1.split(' ')[0] * 1;
				//console.log(durInt1);
		}
		else if(dur1.includes('day')){
			durInt1=dur1.split(' ')[0] * 24;
			//console.log(durInt1);
		}
		else if(dur1.includes('year')){
			durInt1=dur1.split(' ')[0] * 8764;
			//console.log(durInt1);
		}
		else if(dur1.includes(':')){  //Converting hh:mm type to comparable integer
			var split = dur1.split(':');
			durInt1 = split[0]*1+split[1]*0.016666667;
		}
		else durInt1=9999999;

		if(dur2.includes('hour'))
		{
				durInt2=dur2.split(' ')[0] * 1;
				//console.log(durInt2);
		}
		else if(dur2.includes('day')){
			durInt2=dur2.split(' ')[0] * 24;
			//console.log(durInt2);
		}
		else if(dur2.includes('year')){
			durInt2=dur2.split(' ')[0] * 8764;
			//console.log(durInt2);
		}
		else if(dur2.includes(':')){  //Converting hh:mm type to comparable integer
			var split = dur1.split(':');
			durInt2 = split[0]*1+split[1]*0.016666667;
		}
	  else durInt2=999999;

		 elem1.calculated=durInt1;
		 elem2.calculated=durInt2;

		if (durInt1<=durInt2) return -1;
		else return 1;
	})
}
