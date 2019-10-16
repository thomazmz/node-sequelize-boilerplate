const config = require('../config/redis');
const redis = require("redis");

const client = redis.createClient(config[process.env.NODE_ENVIRONMENT]);

console.log('Successfully connected to Redis');

module.exports = client;

