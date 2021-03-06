module.exports = {
	development : {
		host : '127.0.0.1',
		port : '5432',
		database : 'docker',
		username : 'docker',
		password : 'docker',
		dialect: 'postgres',
		logging : false,
		define : {
			timestamps : true,
			underscored : true,
			underscoreAll : true,
			freezeTableName: true
		}
	},
	test : {
		host : '127.0.0.1',
		port : '5432',
		database : 'docker-test',
		username : 'docker',
		password : 'docker',
		dialect: 'postgres',
		logging : false,
		define : {
			timestamps : true,
			underscored : true,
			underscoreAll : true,
			freezeTableName: true
		}
	},
	production : {
		host : process.env.POSTGRES_HOST,
		port : process.env.POSTGRES_PORT,
		database : process.env.POSTGRES_DATABASE,
		username : process.env.POSTGRES_USERNAME,
		password : process.env.POSTGRES_PASSWORD,
		dialect: 'postgres',
		logging : false,
		define : {
			timestamps : true,
			underscored : true,
			underscoreAll : true,
			freezeTableName: true
		}
	}
}