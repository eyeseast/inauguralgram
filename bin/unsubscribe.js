#!/usr/bin/env node

var Instagram = require('instagram-node-lib');

Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);

// clear out any old subscriptions
Instagram.subscriptions.unsubscribe_all({
    error: function(err) {
        console.error(err);
    },

    complete: function() {
        Instagram.subscriptions.list();
    }
});
