// Firebase Messaging Service Worker — Casarico
// This file must be served from the root of the site

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCkBhMmFVblDVLIwAfBDE_RQ6_FO-TH5vA',
  authDomain: 'casarico-1e057.firebaseapp.com',
  databaseURL: 'https://casarico-1e057-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'casarico-1e057',
  appId: '1:56749328502:web:d879238d19ceef05333757',
  messagingSenderId: '56749328502'
});

var messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  var notification = payload.notification || {};
  var title = notification.title || 'Casarico';
  var body = notification.body || '';

  return self.registration.showNotification(title, {
    body: body,
    icon: '/casarico/icon-192.png',
    tag: 'casarico-' + Date.now(),
    requireInteraction: false,
    silent: false,
    vibrate: [200, 100, 200]
  });
});

// Click on notification — open the app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({type: 'window', includeUncontrolled: true}).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes('magerstrom.github.io/casarico') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('https://magerstrom.github.io/casarico/');
      }
    })
  );
});
