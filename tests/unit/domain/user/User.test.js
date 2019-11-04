const utils = require('../../../utils');
const jwtDecode = require('jwt-decode');

describe('UserService tests', () => {

	it('should hash user password', async () => {
		const password = '12345';
		const user = await utils.user.build({ password });
		user.hashPassword();
		expect(user.password).not.toBe(password);
	});

	it('should verify token', async () => {
		const user = await utils.user.build();
		const token = await user.getBarearToken();
		const verifiedUser = await user.verifyToken(token);
		expect(verifiedUser.id).toBe(user.id);
	});

	it('should include proper data on JWT token', async () => {
		const user = await utils.user.create();
		const jwtToken = user.getBarearToken();
		const jwtTokenDecoded = jwtDecode(jwtToken);
		expect(jwtTokenDecoded.id).toBe(user.id);
		expect(jwtTokenDecoded.iat).toBeDefined();
		expect(jwtTokenDecoded.iat).not.toBeNull();
	});

	it('should verify user password', async () => {
		const passwordLiteral = "123456";
		const user = await utils.user.create({ passwordLiteral });
		const firstTry = await user.verifyPassword(passwordLiteral);
		const secondTry = await user.verifyPassword(`!${passwordLiteral}`);
		expect(firstTry.email).toBe(user.email);
		expect(firstTry.id).toBe(user.id);
		expect(firstTry).not.toBeNull();
		expect(secondTry).toBe(null);
	});

});