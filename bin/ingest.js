#!/usr/bin/env node

var Instagram = require('../instagram')
  , db = require('../db')
  , redis = require('redis');

function fetch() {
    Instagram.fetch({
        complete: function(data) {
            var images = data.reduce(function(memo, image) {
                memo[image.id] = JSON.stringify(image);
                return memo;
            }, {});

            db.hmset(Instagram.key, images, redis.print);
        },

        error: function(err) {
            console.log(err);
        }
    });
}

setInterval(fetch, 15 * 1000);