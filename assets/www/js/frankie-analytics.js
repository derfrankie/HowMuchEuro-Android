// Function collected for Google Analytics ... for Android and iOS

function startAnalytics(os,ua) {
	if (os == "Android") {
	//alert(ua);
	window.plugins.analytics.start (ua,       //UA-account ID         
	function(){ console.log("started")},             //successCallBack         
	function(){ console.log("didn't start")});         //failureCallBack);	
	} else {
	window.plugins.googleAnalyticsPlugin.startTrackerWithAccountID(ua);
	}
}

function trackPage (os,page) {
	if (os == "Android") {
	window.plugins.analytics.trackPageView (          //**NB**: NOTE CAPITAL 'V'               
	"/"+page,                                    //Page  (include /)               
	function(){console.log("tracked page view: /" + page)},           //successCallBack                  
	function(){console.log("didn't track page view:/" + page)});       //failureCallBack);
	} else {
	window.plugins.googleAnalyticsPlugin.trackPageview(page);
	}
}

function trackEvent (os,category, action, label, value) {
	if (os == "Android") {
	window.plugins.analytics.trackEvent ( 
	category,  //Category            
	action,    //Action            
	label,//Label            
	value,          //Value            
	function(){ console.log("tracked event: " + category +" "+ action  +" "+ label  +" "+ value)},        //successCallBack            
	function(){ console.log("didn't track event: "+ category +" "+ action  +" "+ label  +" "+ value)});    //failureCallBack);
	} else {
 	window.plugins.googleAnalyticsPlugin. googleAnalytics.trackEvent(    
	category,  //Category            
	action,    //Action            
	label,//Label            
	value,          //Value     
 	function(){ console.log("tracked event: " + category +" "+ action  +" "+ label  +" "+ value)},            //successCallBack    
 	function(){ console.log("didn't track event: " + category +" "+ action  +" "+ label  +" "+ value)});        //failureCallBack);
 }
}
	