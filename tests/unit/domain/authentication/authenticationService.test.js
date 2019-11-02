const authenticationService = require('../../../../src/domain/authentication/authenticationService');

describe('User model tests', () => {

	it('should create sign up temporary record', async () => {
		
		const username = 'johndoe';
		const passwordLiteral = '12345';
		const email = 'john.doe@gmail.com'
	
		const result = authenticationService.createSignUpReference(username, email, passwordLiteral);
		expect(result).toBe('OK');

	});
});