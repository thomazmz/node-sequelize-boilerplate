const request = require('supertest');

const app = require('../../src/app/App').express;
const utils = require('../utils');

const userData = {
	email: 'John Doe',
	password: '12345'

}

describe('User model tests', () => {

	beforeEach(async () => {
		utils.truncate();
	});

	it('should authenticate user', async () => {
		await utils.createUser(userData);
		const response = await request(app).post('/user/signin').send(userData);
		expect(response.status).toBe(200);
	});

	it('should return a JWT on the body', async () => {
		await utils.createUser(userData);
		const response = await request(app).post('/user/signin').send(userData);
		expect(response.status).toBe(200);
	});


});