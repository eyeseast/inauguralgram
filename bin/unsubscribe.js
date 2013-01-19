#!/usr/bin/env node

var Instagram = require('instagram-node-lib');

Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);

// constants
var US_CAPITOL = {
    lat: 38.8899202,
    lng: -77.0092321
};

// clear out any old subscriptions
Instagram.subscriptions.unsubscribe_all();
