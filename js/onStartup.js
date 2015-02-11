function selectDropDownHosts() {
	// var dropDown = document.document.createElement('select');
	content = '<select id="tokenize" multiple="multiple" class="tokenize-sample">';
	hosts = JSON.parse(localStorage.getItem('hosts'));

	for (var i = 0; i < hosts.length; i++) {
		content += '<option value="' + hosts[i] + '" selected="selected">'+ hosts[i] +'</option>';
		// var newOption = document.createElement('option');
		// newOption.value = hosts[i];
		// newOption.selected = "selected";
		// console.log(hosts[i]);
		// newOption.innerText = hosts[i];
		// dropDown.appendChild(newOption);
	}
	// document.body.appendChild(dropDown);
	content += "</select>";
	document.body.innerHTML = content;
}

// selectDropDownHosts();