const { User } = require('../../../src/app/models');
const utils = require('../../utils');

userParams = {
    name : 'John Doe',
    email : 'john.doe@email.com',
    password : '12345'
}

describe('User model tests', () => {

    beforeEach(async () => {
        utils.truncate();
    });

    it('should pass', async () => {
        const a = 3;
        const b = 2;
        const c = a+b;
        expect(c).toBe(5);
    });

    it('should create a user', async () => {
        await utils.createUser(userParams);
        const findedUser = await User.findOne({ where: { email: userParams.email } });
        expect(findedUser.name).toBe(userParams.name);
    });

    it('should validate password', async () => {
        const user = User.build(userParams);
        await user.hashPassword();
        await user.save();
        const firstTry = await User.verifyCredentials(user, "12345");
        const secondTry = await User.verifyCredentials(user, "123456");
        expect(firstTry).toBe(true);
        expect(secondTry).toBe(false);
    });

});