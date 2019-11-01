const config = require('./config');
const redis = require("redis");

const client = redis.createClient(config[process.env.NODE_ENVIRONMENT]);

module.exports = {

	set: (key, value) => {
		return new Promise((resolve, reject) => {
			client.set(key, JSON.stringify(value), (err) => { 
				if (err) reject();
				resolve();
			})
		});
	},

	setex: (key, value, time) => {
		return new Promise((resolve, reject) => {
			client.set(key, JSON.stringify(value), 'EX', time, (err) => { 
				if (err) reject();
				resolve();
			})
		});
	},
	
	get: (key) => {
		return new Promise((resolve, reject) => {
			client.get(key, (err, value) => {
				if (err) reject();
				resolve(JSON.parse(value));
			})
		});
	},

	delete: (key) => {
		return new Promise((resolve, reject) => {
			client.del(key, (err, value) => {
				if (err) reject();
				resolve();
			})
		})
	}
};