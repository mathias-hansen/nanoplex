(function(){
	"use strict";

	function changeView() {
		var ajax = document.createElement("core-ajax"),
			state = window.location.hash.replace(/^#\//, ""),
			views = document.querySelector("#views"),
			loading = views.querySelector("[view=loading]"),
			missing = views.querySelector("[view=not-found]"),
			page = views.querySelector("[view=page]"),
			title = document.querySelector("title");

		title.innerHTML = "nanoplex - " + state.replace(/-/g," ");

		page.setAttribute("hidden", "");
		missing.setAttribute("hidden", "");

		loading.removeAttribute("hidden");

		ajax.url = "/views/" + state + ".html";
		ajax.handleAs = "text";
		ajax.generateRequest();

		ajax.addEventListener("response", function(event) {
			loading.setAttribute("hidden", "");

			if (event.detail == "Not found\n")
				missing.removeAttribute("hidden");
			else {
				page.removeAttribute("hidden");
				page.innerHTML = event.detail;
			}
		});
	};

	window.addEventListener('hashchange', function(event) { 
		changeView(); 
	});
	
	if (window.location.hash === "")
		window.location.href = "#/home";
	else
		changeView();
})();