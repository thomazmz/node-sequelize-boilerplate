const request = require('supertest');
const jwtDecode = require('jwt-decode');

const app = require('../../src/app/App').express;
const utils = require('../utils');

describe('User authentication tests', () => {

	beforeEach(async () => {
		await utils.truncate();
	});

    it('should pass', async () => {
        const a = 3;
        const b = 2;
        const c = a+b;
        expect(c).toBe(5);
    });

	// it('should return 200 when loging with valid credentials', async () => {
	// 	const user = await utils.createUser({ password: '12345'});
	// 	const response = await request(app).post('/user/signin').send({ 
	// 		email : user.email,
	// 		password : '12345'
	// 	});
	// 	expect(response.status).toBe(200);
	// });

	// it('should return 401 when loging with invalid email', async () => {
	// 	const user = await utils.createUser({ password: '12345'});
	// 	const response = await request(app).post('/user/signin').send({
	// 		email : user.email,
	// 		password : '123456'
	// 	});
	// 	expect(response.status).toBe(401);
	// });

	// it('should return 401 when loging with invalid password', async () => {
	// 	const user = await utils.createUser({ password: '12345'});
	// 	const response = await request(app).post('/user/signin').send({
	// 		username : user.username,
	// 		email : user.email,
	// 		password : '123456'
	// 	});
	// 	expect(response.status).toBe(401);
	// });


});