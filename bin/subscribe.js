#!/usr/bin/env node

var Instagram = require('instagram-node-lib')
  , url = require('url');

Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);

// constants
var US_CAPITOL = {
    lat: 38.8899202,
    lng: -77.0092321
};

var HOST = process.env.HOST || "http://localhost:3000";

// subscribe to images near the Capitol
Instagram.subscriptions.subscribe({
    object: "geography",
    aspect: "media",
    lat: US_CAPITOL.lat,
    lng: US_CAPITOL.lng,
    radius: 3000,
    callback_url: url.resolve(HOST, 'subscribe'),
    complete: function(data) {
        console.dir(data);
        // finally, list all subscriptions
        Instagram.subscriptions.list();
    }
});
