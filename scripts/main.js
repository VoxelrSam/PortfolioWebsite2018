var currentPage = "home";   // Global variable declared for the nav function to keep track of current page
var lastPage = "home";

$(document).ready(function(){
	// removes javascript notice
	$('#javascriptNotice').css('display','none');
	
	setCss();
});

//sets css to accommodate for different resolutions and such
function setCss(){
	// margin left (used for horizontal alignment) is calculated based on width of the element
	$('#inner-loading').css('margin-left',"-" + $('#inner-loading').width() / 2 + "px");
	
	// checks to determine if the ratio of the window is greater than the background. if it is, the css height and width properties need to be switched. in short: keeps the background fullscreen and centered.
	setInterval(function(){
		if (window.innerHeight / window.innerWidth > $('#background').height() / $('#background').width()){
		
			$('#background, #backgroundOverlay').css({
				"width": "auto",
				"height": "105%"
			});
		} else {
			$('#background, #backgroundOverlay').css({
				"width": "105%",
				"height": "auto"
			});
		}
		
		$('#background, #backgroundOverlay').css("margin-left", "-" + ($('#background').width() / 2).toString() + "px");
		
		$('#HWContent').css("margin-top", ($('#cloudbuffer').height()/1.5 * -1) + "px");
	}, 1);
}

// Removes the loading screen when the website has loaded
function loaded () {
	// bounces screen out of view
	$('#loading-cover').addClass("animated bounceOutUp");
	
	// animates in the header and footer after the loading screen has finished bouncing out
	$('#loading-cover').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        typeText("landing-introduction", "Hi, I'm Sam", function () {
            setTimeout(() => {
                typeText("landing-description", "I'm a ", startDescriptionSwap);
            }, 500);
        });

        $("#landing-scroll-indicator").addClass("animated bounce").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $("#landing-scroll-indicator").removeClass("animated bounce");
        });

        setInterval(() => {
            $("#landing-scroll-indicator").addClass("animated bounce").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $("#landing-scroll-indicator").removeClass("animated bounce");
            });
        }, 3000);
	});
}

function typeText (id, text, callback) {
    const element = document.getElementById(id);

    if (text.length === 0) {
        element.innerHTML = element.innerHTML.substr(0, element.innerHTML.length - 1);

        if (callback)
            callback();
    } else {
        setTimeout(function () {
            if (element.innerHTML.charAt(element.innerHTML.length - 1) === "_")
                element.innerHTML = element.innerHTML.substr(0, element.innerHTML.length - 1);

            element.innerHTML += text.charAt(0) + "_";

            text = text.substr(1, text.length);

            typeText(id, text, callback);
        }, 25 + Math.random() * 50);
    }
}

function deleteText (id, amount, callback) {
    const element = document.getElementById(id);

    if (amount === 0) {
        if (callback)
            callback();
    } else {
        setTimeout(function () {
            element.innerHTML = element.innerHTML.substr(0, element.innerHTML.length - 2) + "_";
            deleteText(id, amount - 1, callback);
        }, 50);
    }
}

function startDescriptionSwap () {
    const descriptions = [
        "Developer",
        "Musician",
        "Creator",
        "Computer Scientist"
    ];

    let index = 0;

    typeText("landing-description", descriptions[index] + "_");

    setInterval(() => {
        deleteText("landing-description", descriptions[index].length, () => {
            index = (index + 1) % descriptions.length;

            setTimeout(() => {
                typeText("landing-description", descriptions[index] + "_");
            }, 250);
        });
    }, 3000);
}