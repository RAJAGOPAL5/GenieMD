importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');
firebase.initializeApp({
  'messagingSenderId': '1067108638529',
  'projectId': 'ivisit-8b2b4',
  'apiKey': 'AIzaSyBxiKmszisvsmboIFucQWeFAu4kqXIXSXg',
  'appId': '1:1067108638529:web:2b0cbbfedb63bc506e8bc0',
});
const messaging = firebase.messaging();


function goTo(event) {
  var _data = event.notification.data.FCM_MSG.data;
  var destination_url = urlParser();
  var payload = {};
  try {
    payload = JSON.parse(_data.p);
  } catch (error) {
    console.log("Error: ", error);
  }
  var cmd = payload.cmd || 0;
  var encounterID = payload.encounterID;
  if (_data.p == "{}") { // default and notification
    var _url = `${destination_url}notifications`;
    console.log('notification_Url', _url)
    event.waitUntil(self.clients.openWindow(_url));

  } else if (!cmd && encounterID) {
    event.waitUntil(self.clients.openWindow(destination_url + 'meetings/video/' + encounterID));
  } else {
    event.waitUntil(self.clients.openWindow(`${destination_url}notifications`));
  }
}

function urlParser() {
  var base_url = location.href.split('/firebase-messaging-sw.js')[0];
  var oem_provider = '#'; // shoude be dynamic from the payload
  return `${base_url}/${oem_provider}/`;
}