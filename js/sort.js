	$('#sort-toggle').click(function()
	{
		console.log('sort baby');
		//console.log(localStorage.getItem('data'));

		data = JSON.parse(localStorage.getItem('data'));
		console.log(data);
		console.log(data['contests']['active']);
		sortEventArrayOnDuration(data['contests']['active']);

		console.log(data['contests']['active']);
		var element=$("#sort-toggle-4").prop("checked");

		if(element==true){

		}
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
	  else durInt2=999999;

		 elem1.calculated=durInt1;
		 elem2.calculated=durInt2;

		if (durInt1<=durInt2) return -1;
		else return 1;
	})
}
