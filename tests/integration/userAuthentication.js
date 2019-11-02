const request = require('supertest');
const jwtDecode = require('jwt-decode');

const app = require('../../src/app/App').express;
const utils = require('../utils');

describe('User authentication tests', () => {

	// beforeEach(async () => {
	// 	await utils.truncate();
	// });

	it('should return 422 when signing up with unavailable email', async () => {
		const user = await utils.createUser();
		const response = await request(app).post('/user/signup').send({
			email : user.email,
			username : user.username,
			password : '12345'
		});
		expect(response.status).toBe(422);
	});

	it('should return 200 and access token when signing up with available email', async () => {
		const userParams = utils.getUniqueUserParams();
		const response = await request(app).post('/user/signup').send(userParams);
		expect(response.body).toHaveProperty("token");
		expect(response.status).toBe(200);
	});

	it('should return 401 when signing in with invalid email', async () => {
		const user = await utils.createUser({ password: '12345'});
		const response = await request(app).post('/user/signin').send({ 
			identifier : `!${user.email}`, 
			password : '12345' 
		});
		expect(response.status).toBe(401);
	});

	it('should return 401 when signing in  with invalid password', async () => {
		const user = await utils.createUser({ password: '12345'});
		const response = await request(app).post('/user/signin').send({ 
			identifier : user.email, 
			password : '123456' 
		});
		expect(response.status).toBe(401);
	});

	it('should return 200 status and access token when signing in with valid credentials', async () => {
		const user = await utils.createUser({ password: '12345'});
		const response = await request(app).post('/user/signin').send({ 
			identifier : user.email, 
			password : '12345' 
		});
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("token");
	});


});