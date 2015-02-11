function selectDropDownHosts() {
	var dropDown = document.getElementById("tokenize");
	selected_hosts = JSON.parse(localStorage.getItem('hosts'));

	for (var i = 0; i < selected_hosts.length; i++) {
		var newOption = document.createElement('option');
		newOption.value = selected_hosts[i];
		newOption.selected = true;
		newOption.innerText = selected_hosts[i];
		dropDown.appendChild(newOption);
	}
	loadDropDown();
}

// selectDropDownHosts();