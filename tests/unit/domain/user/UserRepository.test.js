var arraySort = require('array-sort');
const utils = require('../../../utils');
const userRepository = require('../../../../src/domain/user/UserRepository')('Test');

describe('UserService tests', () => {

	// it('should find users ordered by email', async () => {

	// 	const unorderedUsers = await utils.user.createMany(10);
		
	// 	const orderedUsers = unorderedUsers.slice();
	// 	arraySort(orderedUsers, 'email');

	// 	const users = await userRepository.findAll();

	// 	console.log('result', users.length);
	// 	console.log('unordered', unorderedUsers.map(user => user.email));
	// 	console.log('ordered', orderedUsers.map(user => user.email));
	// 	// console.log('users', users.rows.map(user => user.email));
		
	// });

	it('should find user by email', async () => {
		const user = await utils.user.create();
		const findedUser = await userRepository.findOneByEmail(user.email);
		expect(user).not.toBe(findedUser);
	});

	it('should find user by username', async () => {
		const user = await utils.user.create();
		const findedUser = await userRepository.findOneByEmail(user.username);
		expect(user).not.toBe(findedUser);
	});

	it('should find user by string identifiers', async () => {
		const user = await utils.user.create();
		const findedByEmailUser = await userRepository.findOneByStringIdentifier(user.username);
		const findedByUsernameUser = await userRepository.findOneByStringIdentifier(user.username);
		expect(user).not.toBe(findedByEmailUser);
		expect(user).not.toBe(findedByUsernameUser);
	});

});