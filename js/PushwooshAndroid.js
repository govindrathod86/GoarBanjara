 function initPushwoosh()
 {

  var pushNotification = window.plugins.pushNotification;
  pushNotification.onDeviceReady();

  pushNotification.registerDevice({ projectid: "698485000584 ", appid : "6251C-3457D" },
    function(status) {
        var pushToken = status;
        console.warn('push token: ' + pushToken);
    },
    function(status) {
        console.warn(JSON.stringify(['failed to register ', status]));
    }
);

    pushNotification.setMultiNotificationMode();
 
     pushNotification.setVibrateType(2);
	 
     pushNotification.setEnableLED(true);

//start this function gets called when push notifications (Alert) has been received
     //document.addEventListener('push-notification', function(event) {
     //var title = event.notification.title;
    // var userData = event.notification.userdata;

       // if(typeof(userData) != "undefined") {
        //console.warn('user data: ' + JSON.stringify(userData));
   // }

   // navigator.notification.alert(title);
//});
//end this function gets called when push notifications (Alert) has been received
}

function init() {
    document.addEventListener("deviceready", initPushwoosh, true);
 
    //rest of the code

}
