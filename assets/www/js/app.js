function onLoad() {

document.addEventListener("deviceready", onDeviceReady, true);
//then add this (for safari

/*if(! window.device) {
    onDeviceReady();
}*/
}
     
function onDeviceReady() {
//         navigator.notification.alert("PhoneGap is working!!");
Setlanguage();
ShowDeviceElements();

	if (!loadState()) { 
		fx.base = "USD";
		fx.rates = {
			"EUR" : 0.74510096, // eg. 1 USD === 0.74510096 EUR
			"GBP" : 0.64771034,
			"CAD" : 1.00402,
			"USD" : 1          // always include the base rate (1:1)
		};
		valDollar = "12";
		valTax="12";
		strCurrency="CAD";	
		}

	if (strCurrency === "USD") {
			$('#CurrUSD').addClass("buttondown");
			//$('#CurrUSD').toggleClass("gradient2");
			
		} else {
			//$('#CurrCAD').toggleClass("gradient2");
			$('#CurrCAD').addClass("buttondown");
		}


	console.log('ten dollar? ' + fx(10).from('USD').to('EUR').toFixed(2));

	$('#dollar p').html('$ '+ valDollar );
	$('#tax').html(valTax + '%' );
	$('#taxsetting p').html(valTax + '%' );
	$('#rate').html((fx(1).from(strCurrency).to('EUR').toFixed(2)) + ' €' );
	$('#curr').html(strCurrency);

	$('#catchswipe').swipe({
		swipeLeft: function(chx)  {
				if (parseFloat(window.currentDolllar) - (0.1 * chx) > 0) {
                    
						window.currentDolllar = parseFloat(window.originalDollar) - (0.1 * chx);
						window.currentDolllar = window.currentDolllar.toFixed(2);
					} else {
						window.currentDolllar = 0;
					}
					$('#dollar p').html('$ '+ window.currentDolllar );
 
		},
		swipeRight: function(chx)  { 
 					chx = chx * -1;
					window.currentDolllar = parseFloat(originalDollar) + 0.1 * chx;
					window.currentDolllar = window.currentDolllar.toFixed(2);
					$('#dollar p').html('$ '+ window.currentDolllar );
 
		},
		swipeEnd: function()  { 
 					window.valDollar = window.currentDolllar;
				    trackEvent ("App","SetValue","Dollar", window.currentDolllar);
					calculate();	
 
		},
		swipeStart: function()  { 
			window.originalDollar = window.valDollar;
			window.currentDolllar = window.valDollar;
 
		}
	});
	

	$('#swipetax').swipe({
		swipeLeft: function(chx)  {
				if (parseFloat(window.currenttax) - (0.025 * chx) > 0) {
                    
						window.currenttax = parseFloat(window.originalTax) - (0.025 * chx);
						window.currenttax = window.currenttax.toFixed(1);
					} else {
						window.currenttax = 0;
					}
					$('#taxsetting p').html(window.currenttax+' %' );
 
		},
		swipeRight: function(chx)  { 
 					chx = chx * -1;
					window.currenttax = parseFloat(originalTax) + 0.025 * chx
					window.currenttax = window.currenttax.toFixed(1)
					$('#taxsetting p').html(window.currenttax+' %' );
 
		},
		swipeEnd: function()  { 
 					window.valTax = window.currenttax;
				    trackEvent ("App","SetValue","Tax", window.currenttax);

 					$('#tax').html(valTax + '%' );
					calculate();	

 
		},
		swipeStart: function()  { 
			window.originalTax = window.valTax;
			window.currenttax = window.valTax;
 
		}
	});

	$('#buttonwrapper a').on('click', function(e){
		var pageState = {};
		e.preventDefault();
		changePage(this.hash, 'push');
		trackEvent ("App","Button","Settings", 0);

	});

	$('#wrench a').on('click', function(e){
							 var pageState = {};
							 e.preventDefault();
							 trackEvent ("App","Button","Settings", 0);
							 changePage(this.hash, 'push');
							 });
	
	$('#CurrUSD').on('click', function(e){
		if (strCurrency === "CAD") {
			strCurrency="USD";
			$('#CurrCAD').toggleClass("buttondown");
			$('#CurrUSD').toggleClass("buttondown");
			//$('#CurrUSD').toggleClass("gradient2");
			//$('#CurrCAD').toggleClass("gradient2");
			$('#curr').html(strCurrency);
			trackEvent ("App","Button","US Dollar", 0);
			calculate();
		}
	});

	$('#CurrCAD').on('click', function(e){
		if (strCurrency === "USD") {
			strCurrency="CAD";
			$('#CurrCAD').toggleClass("buttondown");
			$('#CurrUSD').toggleClass("buttondown");
			//$('#CurrUSD').toggleClass("gradient2");
			//$('#CurrCAD').toggleClass("gradient2");
			trackEvent ("App","Button","CAD Dollar", 0);
			$('#curr').html(strCurrency);
			calculate();
		}
	});

	$('#updaterates').on('click', function(e){
						 //alert("update rates");
						 trackEvent ("App","Button","Get Rates", 0);
						 getrates();
						 calculate();
						 });

	$(".back").live("click",function(e){
					e.preventDefault();
					window.history.back();
					});

	calculate();
	//alert ("show page");
	changePage("#home", "show");
	

	startAnalytics("UA-29336779-1");
	trackEvent ("App","Started","Version" + appVersion, appVersion);
	watchForShake(5);	



//end loaded
     }

var theScroll;
var valDollar;
var valTax;
var strCurrency;
var valEuro;
var valEuroTax;
var originalDollar;
var currentDolllar;
var originalTax;
var currentTax;
var pageState = {};
var valtimestamp;
var mmToMonth = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
var prevX;
var appVersion = "1.0";

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
	nfirstime = (localStorage["convert2euro.base"] === "USD");
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
function getrates() {
    $("#ratestimestamp").html("Requesting rates...");
	$.getJSON(
        'http://openexchangerates.org/latest.json',
        function(data) {
			// Check money.js has finished loading:
            if ( typeof fx !== "undefined" && fx.rates ) {
                fx.rates = data.rates;
                fx.base = data.base;
                window.valtimestamp = data.timestamp;
				$("#ratestimestamp").html("Latest rates: " + showLocalDate(window.valtimestamp));
				$('#currentrates').html('1 USD = ' + fx(1).from('USD').to('EUR').toFixed(2) + ' €'+"<br/>"+'1 CAD = ' + fx(1).from('CAD').to('EUR').toFixed(2) + ' €' );

            } else {
                // If not, apply to fxSetup global:
                var fxSetup = {
                    rates : data.rates,
                    base : data.base
                };
                 window.valtimestamp = data.timestamp;
 			     $("#ratestimestamp").html("Latest rates: " + showLocalDate(window.valtimestamp));

            }
        }
    );
    trackEvent ("API","Request","OpenExchange", 0);
}

//getrates();





// FUNCTIONS ##########################################################


var myScroll;
function loaded() {
    myScroll = new iScroll('wrapper', {
        useTransform: false,
        onBeforeScrollStart: function (e) {
            var target = e.target;
            while (target.nodeType != 1) target = target.parentNode;

            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                e.preventDefault();
        }
    });
		setTimeout(function () {
		myScroll.refresh();
	}, 0);

}


// Don't need iScroll
var theScroll;
function scroll(){
    theScroll = new iScroll('wrapper');
}

//document.addEventListener('DOMContentLoaded', scroll, false);
//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//document.addEventListener('DOMContentLoaded', loaded, false);




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






function page(toPage) {
    var toPage = $(toPage),
    fromPage = $("#pages .current");
    if(toPage.hasClass("current") || toPage === fromPage) {
        return;
    }
    toPage.addClass("current fade in").one("webkitAnimationEnd", function(){
        fromPage.removeClass("current fade out");
        toPage.removeClass("fade in")
    });
    fromPage.addClass("fade out");
    trackPage (toPage);
}

(function($) {
$.fn.swipe = function(options) {
    // Default thresholds & swipe functions
    var defaults = {
        threshold: {
            x: 5,
            y: 5
        },
        swipeLeft: function() { alert('swiped left') },
        swipeRight: function() { alert('swiped right') },
        swipeEnd: function() { alert('swipe end') },
        swipeStart: function() { alert('swipe start') },
        preventDefaultEvents: true
    }

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
			defaults.swipeStart();
			$(this).addClass("swiping");


        }

        // Store coordinates as finger is swiping
        function touchMove(event) {
            if (defaults.preventDefaultEvents)
                event.preventDefault();
            finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
            finalCoord.y = event.targetTouches[0].pageY

            var changeY = originalCoord.y - finalCoord.y
//            if(changeY < defaults.threshold.y && changeY > (defaults.threshold.y*-1)) {
                changeX = originalCoord.x - finalCoord.x

                if(changeX > defaults.threshold.x) {
                    defaults.swipeLeft(changeX);
                }
                if(changeX < (defaults.threshold.x*-1)) {
                    defaults.swipeRight(changeX);
                }
 //           }

      }

        // Done Swiping
        // Swipe should only be on X axis, ignore if swipe on Y axis
        // Calculate if the swipe was left or right
        function touchEnd(event) {
            console.log('Ending swipe gesture...')
			$(this).removeClass("swiping");
			defaults.swipeEnd();
        }

        // Swipe was canceled
        function touchCancel(event) { 
            console.log('Canceling swipe gesture...')
			$(this).removeClass("swiping fade in");
			$(this).addClass("swiping fade out");
        }

        // Add gestures to all swipable areas
        this.addEventListener("touchstart", touchStart, false);
        this.addEventListener("touchmove", touchMove, false);
        this.addEventListener("touchend", touchEnd, false);
        this.addEventListener("touchcancel", touchCancel, false);

    });
}
})(jQuery);


window.addEventListener("popstate", function(event) {
  if(!event.state){ 
    return;
  }
  // Transition back - but in reverse.
  transition(
    event.state.page, 
    event.state.transition, 
    !event.state.reverse
  );
  pageState = {
    state: {
      page: event.state.page,
      transition: event.state.transition,
      reverse: event.state.reverse
    },
    title: "",
    url: event.state.page
  };
}, false);

function changePage(page, type, reverse) {
  
  //alert('Changepage invoked: " + page+" "+type+" "+reverse');
  trackPage (page);
  // Store the transition with the state
  if(pageState.url){
    // Update the previous transition to be the NEXT transition
    pageState.state.transition = type;
    window.history.replaceState(
      pageState.state,
      pageState.title,
      pageState.url);
  }
  // Keep the state details for next time!
  pageState = {
    state: {
      page: page,
      transition: type,
      reverse: reverse
    },
    title: "",
    url: page
  };
  //alert("History Push " + pageState.url);
  window.history.pushState(pageState.state, pageState.title, pageState.url);  
  // Do the real transition
  transition(page, type, reverse);
}

function transition(toPage, type, reverse){
  var toPage = $(toPage),
    fromPage = $("#pages .current"),
    reverse = reverse ? "reverse" : "";

	if( window.device) {
	switch (device.platform) 
	{
	case "iPhone":
	toPage.find(".back").toggle(true);
	break;
	
	default:
	break;
	
	}
	}
	
  if(toPage.hasClass("current") || toPage === fromPage) { 
    return; 
  };

  // For non-animatey browsers
  if(!("WebKitTransitionEvent" in window)){
      toPage.addClass("current");
      fromPage.removeClass("current");
      return;
  }
  
  toPage
    .addClass("current " + type + " in " + reverse)
    .one("webkitAnimationEnd", function(){
      fromPage.removeClass("current " + type + " out " + reverse);
      toPage.removeClass(type + " in " + reverse);	
    });
  fromPage.addClass(type + " out " + reverse);
}

function showLocalDate(timestamp)
{
  var dt = new Date(timestamp * 1000);
  var mm = mmToMonth[dt.getMonth()];
  return dt.getDate() + "-"+  mm +  "-" + dt.getFullYear() +" "+dt.getHours()+":"+dt.getMinutes();
}

function watchForShake(threshold)
{
   var axl = new Accelerometer(); 
   axl.watchAcceleration(
       function (Accel)
       {
           if (true === Accel.is_updating){
               return;
           }
           var diffX = Math.abs(Accel.x) - prevX;
		   
						 
           if (diffX >= threshold)
           {
               trackEvent ("App","Shake","Reset Dollar", valDollar);
			   valDollar = "0";
			   $('#dollar p').html('$ '+ valDollar );
               calculate();
           }
          prevX = Math.abs(Accel.x);
       }
     , function(){}
     , {frequency : 100}
   );
}

function Setlanguage() {

var lang;
var workstring;

// PhoneGap on Android would always return EN in navigator.*language.
// Parse userAgent instead
// Mozilla/5.0 (Linux; U; Android 2.2; de-ch; HTC Desire Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
if ( navigator && navigator.userAgent
        && (lang = navigator.userAgent.match(/android.*\W(\w\w)-(\w\w)\W/i))
) {
        lang = lang[1];
}

if (!lang && navigator) {
        if (navigator.language) {
                lang = navigator.language;
        } else if (navigator.browserLanguage) {
                lang = navigator.browserLanguage;
        } else if (navigator.systemLanguage) {
                lang = navigator.systemLanguage;
        } else if (navigator.userLanguage) {
                lang = navigator.userLanguage;
        }
        lang = lang.substr(0, 2);
}

switch(lang)
{
	case "en":
	workstring = strings_en;
	break;
	
	case "de":
	workstring = strings_de;
	break;
	
	default:
	workstring = strings_en;
	break;

}

$.each(workstring,function(key, value) {
$('#'+key).html(value);
console.log('#'+key+ " " + value);
});

}

function ShowDeviceElements() {
if( window.device) {
	switch (device.platform) 
	{
	case "Android":
	$(".triangle").toggle(true);
	break;
	
	default:
	break;
	
	}
	}
}

function backKeyDown() { 
    // do something here if you wish
     alert('go back!');
	 window.history.back();
}