jQuery.noConflict()(function($) {
	
	'use strict';

	$(document).ready(function(){
		
		setTimeout(function(){
			$(".vl-preloader-holder").fadeOut(300);
			$("body").addClass("loaded");
		}, 1000);

		$(".vl-example-ranfolio").ranfolio();

		// DEMO
		$(".vl-example-ranfolio a").on('click', function(e){
			e.preventDefault();
		});

	});

});
