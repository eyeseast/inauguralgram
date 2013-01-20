
/*
 * GET home page.
 */

var Instagram = require('../instagram')
  , _ = require('underscore')
  , db = require('../db');


// constants
var US_CAPITOL = {
    lat: 38.8899202,
    lng: -77.0092321
};


exports.index = function(req, res){
    db.hvals(Instagram.key, function(err, data) {
        if (err) { throw err; };
        data = data.map(JSON.parse);
        if (req.xhr) {
            res.json(data);
        } else {
            res.render('index', {
                photos: data,
                center: US_CAPITOL
            });
        }
    });
};


// show map of logged photos
exports.photo_map = function(req, res) {
    db.hvals(Instagram.key, function(err, data) {
        if (err) { throw err; };
        data = data.map(JSON.parse);
        res.render('map', {
            photos: JSON.stringify(data),
            center: US_CAPITOL
        });
    })
}


// GET handler to verify subscriptions
exports.subscribe_GET = function(req, res) {
    if (req.query['hub.mode'] === 'subscribe') {
        res.send(req.query['hub.challenge']);
        console.log('Subscribe: ' + req.query['hub.challenge']);
    } else {
        res.send(400);
    }
};


// POST handler to process new images
exports.subscribe_POST = function(req, res) {
    console.log(req.get('X-Hub-Signature'));
    console.log(req.get('Content-Type'));
    console.dir(req.body);
    res.send(200);
};
