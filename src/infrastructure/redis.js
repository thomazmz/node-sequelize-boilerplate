const config = require('../../config/redis.js');

const redis = require("redis");
const client = redis.createClient(config[process.env.NODE_ENVIRONMENT]);

module.exports = client;