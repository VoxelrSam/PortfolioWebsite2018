/**
 *
 */

let expandedExperience;
let isInFocus = true;

window.onblur = () => {
  isInFocus = false;
};

window.onfocus = () => {
  isInFocus = true;
};

$(document).ready(function(){
	setCss();
});

// sets css to accommodate for different resolutions and such
function setCss(){
	// margin left (used for horizontal alignment) is calculated based on width of the element
	$('#inner-loading').css('margin-left',"-" + $('#inner-loading').width() / 2 + "px");

	// If the browser is being viewed through a screen similar to a phone
	if (window.innerHeight > window.innerWidth) {
	    $("#landing-introduction").css({
            "top": "20%",
            "margin": "auto",
            "left": 0,
            "right": 0,
            "text-align": "center"
        });

        $("#landing-description").css({
            "margin": "auto",
            "left": 0,
            "right": 0,
            "text-align": "center"
        });
    }
}

// Removes the loading screen when the website has loaded and starts animations
function loaded () {
	// Bounces loading screen out of view
	$('#loading-cover').addClass("animated bounceOutUp");
	
	// Starts the animations after the loading screen is gone
	$('#loading-cover').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        typeText("landing-introduction", "Hi, I'm Sam", () => {
            setTimeout(() => {
                typeText("landing-description", "I'm a ", startDescriptionSwap);
            }, 500);
        });

        $("#landing-scroll-indicator").addClass("animated bounce").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            $("#landing-scroll-indicator").removeClass("animated bounce");
        });

        setInterval(() => {
            $("#landing-scroll-indicator").addClass("animated bounce").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
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
        "Computer Scientist",
        "Boilermaker"
    ];

    let index = 0;

    typeText("landing-description", descriptions[index] + "_");

    setInterval(() => {
        if (!isInFocus)
            return;

        deleteText("landing-description", descriptions[index].length, () => {
            index = (index + 1) % descriptions.length;

            setTimeout(() => {
                typeText("landing-description", descriptions[index] + "_");
            }, 250);
        });
    }, 3000);
}

function expandContent (name) {
    const element = document.getElementById("experiences-" + name);
    let didCloseContent = false;

    if (expandedExperience) {
        document.getElementById("experiences-" + expandedExperience).style.height = "0px";
        didCloseContent = true;
    }

    if (expandedExperience !== name) {
        element.style.height = element.scrollHeight + "px";
        expandedExperience = name;

        if (name === "boilermake6")
            name = "salesforce";
        else if (name === "boilermake")
            name = "qualcomm";

        if (!didCloseContent) {
            navigateTo("#experiences-" + name);
        } else {
            setTimeout(() => {
                navigateTo("#experiences-" + name);
            }, 500);
        }
    } else {
        expandedExperience = undefined;
    }
}

function navigateTo(element){
    $('html, body').animate({
        scrollTop: $(element).offset().top - 60
    }, 400);
}