var redis = require('redis')
  , url   = require('url');

var REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379/0"
  , params = url.parse(REDIS_URL);

var db = module.exports = redis.createClient(parseInt(params.port), params.hostname)

if (params.auth) {
    db.auth(params.auth.split(':')[1]);
}