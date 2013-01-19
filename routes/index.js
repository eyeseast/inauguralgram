
/*
 * GET home page.
 */

var Instagram = require('instagram-node-lib');

Instagram.set('client_id', process.ENV.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.ENV.INSTAGRAM_CLIENT_SECRET);

// constants
var US_CAPITOL = {
    lat: 38.8899202,
    lng: -77.0092321
};

exports.index = function(req, res){
    Instagram.media.search({
        lat: US_CAPITOL.lat,
        lng: US_CAPITOL.lng,
        complete: function(data, pagination) {
            if (req.xhr) {
                res.json(data);
            } else {
                res.render('index', { data: data, pagination: pagination });
            }
        }
    });
};