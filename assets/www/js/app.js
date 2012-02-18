function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
     }
function onDeviceReady(){
          navigator.notification.alert("PhoneGap is working!!");
     }

var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}
 
document.addEventListener('DOMContentLoaded', scroll, false);

$('#tab-bar a').on('click', function(e){
    e.preventDefault();
    var nextPage = $(e.target.hash);
	page(nextPage); //You need to add this for it to work
    $("#pages .current").removeClass("current");
    nextPage.addClass("current");
});

function checkInput(textbox) {
 var textInput = document.getElementById(textbox).value;

 alert(textInput); 
}


function page(toPage) {
    var toPage = $(toPage),
    fromPage = $("#pages .current");
    if(toPage.hasClass("current") || toPage === fromPage) {
        return;
    };
    toPage.addClass("current fade in").one("webkitAnimationEnd", function(){
        fromPage.removeClass("current fade out");
        toPage.removeClass("fade in")
    });
    fromPage.addClass("fade out");
}