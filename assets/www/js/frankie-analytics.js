// Function collected for Google Analytics ... for Android and iOS

function startAnalytics(ua) {

if( window.device) {
	switch (device.platform) 
	{
	case "Android":
	//alert(ua);
	window.plugins.analytics.start (ua,       //UA-account ID         
	function(){ console.log("started")},             //successCallBack         
	function(){ console.log("didn't start")});         //failureCallBack);	
	break;
	
	case "iPhone":
	console.log("started logging with " + ua)
	window.plugins.googleAnalyticsPlugin.startTrackerWithAccountID(ua);
	break;
	
	default:
	break;
	
	}
}	
}

function trackPage (page) {
if( window.device) {
	switch (device.platform) 
	{
	case "Android":
	window.plugins.analytics.trackPageView (          //**NB**: NOTE CAPITAL 'V'               
	"/"+page,                                    //Page  (include /)               
	function(){console.log("tracked page view: /" + page)},           //successCallBack                  
	function(){console.log("didn't track page view:/" + page)});       //failureCallBack);
	break;
	
	case "iPhone":
	console.log("tracked page view: /" + page)
	window.plugins.googleAnalyticsPlugin.trackPageview(page);
	break;
	
	default:
	break;
	
	}
}
}

function trackEvent (category, action, label, value) {
if( window.device) {
	switch (device.platform) 
	{
	case "Android":
	window.plugins.analytics.trackEvent ( 
	category,  //Category            
	action,    //Action            
	label,//Label            
	value,          //Value            
	function(){ console.log("tracked event: " + category +" "+ action  +" "+ label  +" "+ value)},        //successCallBack            
	function(){ console.log("didn't track event: "+ category +" "+ action  +" "+ label  +" "+ value)});    //failureCallBack);
	break;
	
	case "iPhone":
	window.plugins.googleAnalyticsPlugin.trackEvent(category, action, label, value);
	console.log("tracked event: " + category +" "+ action  +" "+ label  +" "+ value);
	break;
	
	default:
	break;
	
 }
 }
}
	