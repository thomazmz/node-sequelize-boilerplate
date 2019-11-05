var arraySort = require('array-sort');
const utils = require('../../../utils');
const authenticationService = require('../../../../src/domain/authentication/AuthenticationService');

describe('Authentication tests', () => {

	it('should find user by email', async () => {
		const user = await utils.user.create();
		const findedUser = await userRepository.findOneByEmail(user.email);
		expect(user).not.toBe(findedUser);
	});

});