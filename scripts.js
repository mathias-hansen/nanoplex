(function () {
    "use strict";

    function changeView(hash) {
        var view = hash.replace(/^#\//, "");

        document.querySelector("title").innerHTML = "nanoplex - " + view.replace(/-/g," ");

        getView(view);
    };

    function getView(view) {
        var ajax = document.createElement("core-ajax"),
            views = document.querySelector("#views").querySelectorAll("article"),
            loading = views[0],
            page = views[1];

        page.setAttribute("hidden", "");
        loading.removeAttribute("hidden");

        ajax.url = "/views/" + view + ".html";
        ajax.handleAs = "text";
        ajax.generateRequest();

        ajax.addEventListener("response", function(event) {
            var response = event.detail;

            loading.setAttribute("hidden", "");
            page.removeAttribute("hidden");
            
            if (response === "Not found\n") 
                getView("missing");
            else 
                page.innerHTML = response;
        });
    };

    window.onhashchange = function(event) { 
        changeView(window.location.hash); 
    };
    
    if (!window.location.hash) 
        window.location.href = "#/home";
    else 
        changeView(window.location.hash);

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-47730446-1', 'auto');
    ga('send', 'pageview');

})();