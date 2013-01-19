
/*
 * GET home page.
 */

var Instagram = require('instagram-node-lib');

Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);

// constants
var US_CAPITOL = {
    lat: 38.8899202,
    lng: -77.0092321
};

exports.index = function(req, res){
    Instagram.media.search({
        lat: US_CAPITOL.lat,
        lng: US_CAPITOL.lng,
        distance: 2000,
        complete: function(data, pagination) {
            if (req.xhr) {
                res.json({ data: data, pagination: pagination});
            } else {
                res.render('index', { 
                    data: data, 
                    pagination: pagination,
                    title: "Hello, photos!"
                });
            }
        }
    });
};

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
