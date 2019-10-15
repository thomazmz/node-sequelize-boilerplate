const config = require('../../config/redis.js');

const redis = require("redis");
const client = redis.createClient(config[process.env.NODE_ENVIRONMENT]);

console.log('Hello from Redis!');

module.exports = client;

