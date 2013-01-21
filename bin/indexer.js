#!/usr/bin/env node

var Instagram = require('../instagram')
  , db = require('../db')
  , redis = require('redis')
  , _ = require('underscore');

function buildIndex(cb) {
    // build a sorted set from the hash values
    db.hvals(Instagram.key, function(err, data) {
        // data = data.map(JSON.parse);
        var multi = db.multi();
        data.forEach(function(d, i) {
            d = JSON.parse(d);
            multi.zadd(Instagram.index_key, +d.created_time, JSON.stringify(d));
        });

        multi.exec(function(err, replies) {
            if (err) { console.error(err); };
            console.log('Updated index: ' + replies.length + ' records');

            if (_.isFunction(cb)) { cb(err, replies); };
        });
    })
}

if (require.main === module) {
    buildIndex(function(err, replies) {
        db.quit();
        process.exit();
    });
} else {
    module.exports = buildIndex;
};
