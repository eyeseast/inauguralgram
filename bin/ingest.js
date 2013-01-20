#!/usr/bin/env node

var Instagram = require('../instagram')
  , db = require('../db')
  , redis = require('redis');

function complete(data) {
    var images = data.reduce(function(memo, image) {
        memo[image.id] = JSON.stringify(image);
        return memo;
    }, {});

    db.hmset(Instagram.key, images, redis.print);
}

function fetch() {

    // US Capitol, the defaul
    Instagram.fetch({
        complete: complete,

        error: function(err) {
            console.log(err);
        }
    });

    // a little farther down the mall
    Instagram.fetch({
        lat: 38.8897,
        lng: -77.0238,
        complete: complete,
        error: function(err) {
            console.log(err);
        }
    });
}

setInterval(fetch, 30 * 1000);