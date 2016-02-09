$.material.init();
$.material.ripples();

if (!localStorage.init) {
	introJs().setOption('showProgress', true).start();
	introJs().addHints();
	localStorage.init = 1;
}

$("#help").click(function(){
	introJs().setOption('showProgress', true).start();
});

function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}

function checkVersion(){
  
  var currVersion = getVersion();
  console.log(currVersion);
  var prevVersion = localStorage.version;
   // Check if the version has changed.
  if (currVersion != prevVersion) {
  	chrome.tabs.create({ url: "http://challengehunt.github.io/" });
    localStorage.version = currVersion;
  }
}

checkVersion();