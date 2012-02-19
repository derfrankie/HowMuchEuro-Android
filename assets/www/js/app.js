function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
     }
function onDeviceReady(){
          navigator.notification.alert("PhoneGap is working!!");
     }

var theScroll;
var valDollar = "10";
var valRate="0.75";
var valTax="12";
var strCurrency="CAN$";
var valEuro;
var valEuroTax;

$('#dollar p').html('$ '+ valDollar );
$('#tax').html(valTax + '%' );
$('#rate').html(valRate + ' €' );
$('#curr').html(strCurrency);

calculate();

function scroll(){
    //theScroll = new iScroll('wrapper');
}
	
function calculate() {
	window.valEuro=parseFloat(window.valDollar) * parseFloat(window.valRate);
	window.valEuroTax= parseFloat(window.valTax) / 100 * parseFloat(window.valDollar)+parseFloat(window.valDollar);
	window.valEuroTax=window.valEuroTax.toFixed(2)
	window.valEuro=window.valEuro.toFixed(2)
	$('#woteuro p').html(window.valEuro +" €");
	$('#wteuro p').html(window.valEuroTax+" €");
}


String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {       
    var reg = new RegExp("\\{" + i + "\\}", "gm");             
    s = s.replace(reg, arguments[i + 1]);
  }

  return s;
}
document.addEventListener('DOMContentLoaded', scroll, false);

$('#buttonwrapper a').on('click', function(e){
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

(function($) {
$.fn.swipe = function(options) {
    // Default thresholds & swipe functions
    var defaults = {
        threshold: {
            x: 30,
            y: 10
        },
        swipeLeft: function() { alert('swiped left') },
        swipeRight: function() { alert('swiped right') },
        preventDefaultEvents: true
    };

    var options = $.extend(defaults, options);

    if (!this) return false;

    return this.each(function() {

        var me = $(this)

        // Private variables for each element
        var originalCoord = { x: 0, y: 0 }
        var finalCoord = { x: 0, y: 0 }

        // Screen touched, store the original coordinate
        function touchStart(event) {
            console.log('Starting swipe gesture...')
            originalCoord.x = event.targetTouches[0].pageX
            originalCoord.y = event.targetTouches[0].pageY
        }

        // Store coordinates as finger is swiping
        function touchMove(event) {
            if (defaults.preventDefaultEvents)
                event.preventDefault();
            finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
            finalCoord.y = event.targetTouches[0].pageY
        }

        // Done Swiping
        // Swipe should only be on X axis, ignore if swipe on Y axis
        // Calculate if the swipe was left or right
        function touchEnd(event) {
            console.log('Ending swipe gesture...')
            var changeY = originalCoord.y - finalCoord.y
            if(changeY < defaults.threshold.y && changeY > (defaults.threshold.y*-1)) {
                changeX = originalCoord.x - finalCoord.x

                if(changeX > defaults.threshold.x) {
                    defaults.swipeLeft(changeX)
                }
                if(changeX < (defaults.threshold.x*-1)) {
                    defaults.swipeRight(changeX)
                }
            }
        }

        // Swipe was canceled
        function touchCancel(event) { 
            console.log('Canceling swipe gesture...')
        }

        // Add gestures to all swipable areas
        this.addEventListener("touchstart", touchStart, false);
        this.addEventListener("touchmove", touchMove, false);
        this.addEventListener("touchend", touchEnd, false);
        this.addEventListener("touchcancel", touchCancel, false);

    });
};
})(jQuery);

$('#catchswipe').swipe({
 swipeLeft: function(chx)  {
// alert (chx);
 chx = chx * -1
  if (parseFloat(window.valDollar) - (0.1 * chx) < 0) {
	window.valDollar = parseFloat(window.valDollar) - (0.1 * chx)
	window.valDollar=window.valDollar.toFixed(2)
 } else {
    window.valDollar = 0;
 }
 $('#dollar p').html('$ '+ valDollar );
 calculate();
 },
 swipeRight: function(chx)  { 
  //alert (chx);
 chx = chx * -1
 window.valDollar = parseFloat(window.valDollar) + 0.1 * chx
 window.valDollar=window.valDollar.toFixed(2)
 $('#dollar p').html('$ '+ valDollar );
 calculate();
 },
})