// centralizing instagram stuff

var Instagram = require('instagram-node-lib')
  , _ = require('underscore');

Instagram.set('client_id', process.env.INSTAGRAM_CLIENT_ID);
Instagram.set('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);

// constants
var US_CAPITOL = {
    lat: 38.8899202,
    lng: -77.0092321
};

Instagram.fetch = function(params) {
    params = (params || {});
    _.defaults(params, {
        lat: US_CAPITOL.lat,
        lng: US_CAPITOL.lng,
        distance: 2000
    });

    Instagram.media.search(params);
}

Instagram.key = "instagram:photos";

module.exports = Instagram;