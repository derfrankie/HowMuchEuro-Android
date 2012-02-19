function onLoad(){
          document.addEventListener("deviceready", onDeviceReady, true);
     }
function onDeviceReady(){
          navigator.notification.alert("PhoneGap is working!!");
     }

var theScroll;
var valDollar;
var valTax;
var strCurrency;
var valEuro;
var valEuroTax;
var originalDollar;
var currentDolllar;



//storage

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}



function saveState() {
	if (!supports_html5_storage()) { return false; }
    localStorage["convert2euro.base"] = fx.base;
	localStorage.setItem('convert2euro.rates', JSON.stringify(fx.rates));
    localStorage["convert2euro.lastDollar"] = window.valDollar;
	localStorage["convert2euro.lastTax"] = window.valTax;
	localStorage["convert2euro.lastCurrency"] = window.strCurrency;
    return true;
}

function loadState() {
	if (!supports_html5_storage()) { return false; }
	nfirstime = (localStorage["convert2euro.base"] == "USD");
    if (!nfirstime) { 
	return false; }
	fx.base = localStorage["convert2euro.base"];
	tmprates = localStorage.getItem('convert2euro.rates');
	console.log(tmprates);
	fx.rates = JSON.parse(tmprates);
    window.valDollar = localStorage["convert2euro.lastDollar"];
	window.valTax = localStorage["convert2euro.lastTax"];
	window.strCurrency = localStorage["convert2euro.lastCurrency"];
    return true;
}
// Use jQuery.ajax to get the latest exchange rates, with JSONP:
// Load exchange rates data via the cross-domain/AJAX proxy:
    $.getJSON(
        'http://openexchangerates.org/latest.json',
        function(data) {
            
			// Check money.js has finished loading:
            if ( typeof fx !== "undefined" && fx.rates ) {
                fx.rates = data.rates;
                fx.base = data.base;
            } else {
                // If not, apply to fxSetup global:
                var fxSetup = {
                    rates : data.rates,
                    base : data.base
                }
            }
        }
    );

if (!loadState()) { 
	fx.base = "USD";
	fx.rates = {
		"EUR" : 0.74510096, // eg. 1 USD === 0.74510096 EUR
		"GBP" : 0.64771034,
		"CAD" : 1.00402,
		"USD" : 1,          // always include the base rate (1:1)
	}
	valDollar = "12";
	valTax="12";
	strCurrency="CAD";	
	}
	// rates


	
console.log('ten dollar? ' + fx(10).from('USD').to('EUR').toFixed(2));

$('#dollar p').html('$ '+ valDollar );
$('#tax').html(valTax + '%' );
$('#rate').html((fx(1).from(strCurrency).to('EUR').toFixed(2)) + ' €' );
$('#curr').html(strCurrency);

calculate();

function scroll(){
    theScroll = new iScroll('wrapper');
}
	
function calculate() {
	//window.valEuro=parseFloat(window.valDollar) * parseFloat(window.valRate);
	//window.valEuroTax= parseFloat(window.valTax) / 100 * parseFloat(window.valDollar)+parseFloat(window.valDollar);
	window.valEuro = fx(window.valDollar).from(window.strCurrency).to('EUR');
	window.valEuroTax = fx(parseFloat(window.valTax) / 100 * parseFloat(window.valDollar)+parseFloat(window.valDollar)).from(window.strCurrency).to('EUR');
		
	window.valEuroTax=window.valEuroTax.toFixed(2)
	window.valEuro=window.valEuro.toFixed(2)
	$('#woteuro p').html(window.valEuro +" €");
	$('#wteuro p').html(window.valEuroTax+" €");
	if (window.currentDolllar != window.originalDollar) { saveState(); }

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
            x: 10,
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
			$("#catchswipe").addClass("swiping");
			window.originalDollar = window.valDollar;
			window.currentDolllar = window.valDollar;

        }

        // Store coordinates as finger is swiping
        function touchMove(event) {
            if (defaults.preventDefaultEvents)
                event.preventDefault();
            finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
            finalCoord.y = event.targetTouches[0].pageY
			
			WchangeX = originalCoord.x - finalCoord.x
			console.log(WchangeX);
			
			//swipe left
			if(WchangeX > defaults.threshold.x) {
			
			
				if (parseFloat(window.currentDolllar) - (0.1 * WchangeX) > 0) {
                    
						window.currentDolllar = parseFloat(window.originalDollar) - (0.1 * WchangeX)
						window.currentDolllar = window.currentDolllar.toFixed(2)
					} else {
						window.currentDolllar = 0;
					}
					$('#dollar p').html('$ '+ window.currentDolllar );
			
			}
				
			//swipe right
                if(WchangeX < (defaults.threshold.x*-1)) {
					WchangeX = WchangeX * -1
					window.currentDolllar = parseFloat(originalDollar) + 0.1 * WchangeX
					window.currentDolllar = window.currentDolllar.toFixed(2)
					$('#dollar p').html('$ '+ window.currentDolllar );
                }
        }

        // Done Swiping
        // Swipe should only be on X axis, ignore if swipe on Y axis
        // Calculate if the swipe was left or right
        function touchEnd(event) {
            console.log('Ending swipe gesture...')
			$("#catchswipe").removeClass("swiping");
			window.valDollar = window.currentDolllar;
			calculate();
			

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
			$("#catchswipe").removeClass("swiping");
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
 
 },
 swipeRight: function(chx)  { 
 
 },
})


