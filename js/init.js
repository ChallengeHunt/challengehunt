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