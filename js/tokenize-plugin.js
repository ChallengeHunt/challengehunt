function loadDropDown() {
	$('#tokenize').tokenize({
		placeholder: "Add more programming challenges platforms..",
		// displayDropdownOnFocus: true,
		onAddToken: function(value, text){
			if((typeof localStorage["hosts"]) === 'undefined') {
				var hosts = {}
				hosts[value] = true;
				localStorage.setItem('hosts', JSON.stringify(hosts));
			} else {
				var hosts = JSON.parse(localStorage.getItem('hosts'));
				console.log(hosts)
				if (hosts.hasOwnProperty(value)) {
					console.log("already there")
				} else {
					console.log("hello")
					hosts[value] = true;
					// span1.innerHTML = "";	
					localStorage.setItem('hosts', JSON.stringify(hosts));
					// }
				}
			}
			// store request data in local storage 
			// if data exists call challengeData
			// else call getChallengeData
			// if((typeof localStorage["data"]) === 'undefined') {
			// 	console.log("hello if");
			// 	getChallengeData();
			// } else {
				// console.log("hello else");
				// var data = JSON.parse(localStorage.getItem('hosts'));
				// generateCards(data);
			getChallengeData();
		},
		onRemoveToken: function(value){
			hosts = JSON.parse(localStorage.getItem('hosts'));
			console.log(hosts);
			if (!hosts.hasOwnProperty(value)) {
				console.log("not there")
			} else {
				console.log("hello")
				delete hosts[value];
				// span1.innerHTML = "";	
				localStorage.setItem('hosts', JSON.stringify(hosts));
				// }
			}
			getChallengeData();
		},
	});
	
}