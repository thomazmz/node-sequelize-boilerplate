module.exports = {
	development : {
		host : '127.0.0.1',
		port : '6379',
		password : 'docker',
	},
	test : {
		host : '127.0.0.1',
		port : '6379',
		password : 'docker',
	},
	production : {
		host : process.env.REDIS_HOST,
		port : process.env.REDIS_PORT,
		password : process.env.REDIS_PASSWORD
	}
}