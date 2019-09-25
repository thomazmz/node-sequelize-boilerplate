const jwtDecode = require('jwt-decode');

const { User } = require('../../../src/app/models');
const utils = require('../../utils');

describe('User model tests', () => {

    beforeEach(async () => {
        await utils.truncate();
    });

    it('should create a user', async () => {
        const user = await utils.createUser();
        const findedUser = await User.findOne({ where: { email: user.email } });
        expect(findedUser.name).toBe(user.name);
        expect(findedUser.email).toBe(user.email);
    });

    it('should find user by id', async () => {
        const user = await utils.createUser();
        const findedUser = await User.findOneById(user.id);
        expect(user.id).toBe(findedUser.id);
    });

    it('should find user by email', async () => {
        const user = await utils.createUser();
        const findedUser = await User.findOneByEmail(user.email);
        expect(user.email).toBe(findedUser.email);
    })

    it('should find user passing email as unique identifier', async () => {
        const user = await utils.createUser();
        const findedUser = await User.findOneByStringIdentifier(user.email);
        expect(user.id).toBe(findedUser.id);
    })

    it('should hash user password', async () => {
        const password = '12345';
        const user = await utils.createUser({ password });
        expect(user.password).not.toBe(password);
    });

    it('should verify user password', async () => {
        const password = '12345';
        const user = await utils.createUser({ password });
        const firstTry = await user.verifyPassword(password);
        const secondTry = await user.verifyPassword(`!${password}`);
        expect(firstTry.email).toBe(user.email);
        expect(firstTry.id).toBe(user.id);
        expect(firstTry).not.toBeNull();
        expect(secondTry).toBe(null);
    });

    it('should verify credentials', async () => {
        const password = '12345';
        const user = await utils.createUser({ password });
        const firstTry = await User.verifyCredentials(user.email, password);
        const secondTry = await User.verifyCredentials(user.email, `!${password}`);
        const thirdTry = await User.verifyCredentials(`!+${user.email}`, password);
        const fourthTry = await User.verifyCredentials(`!+${user.email}`, `!${password}`);
        expect(firstTry.email).toBe(user.email);
        expect(firstTry.id).toBe(user.id);
        expect(firstTry).not.toBeNull();
        expect(secondTry).toBe(null);
        expect(thirdTry).toBe(null);
        expect(fourthTry).toBe(null);
    });

    it('should include proper data on JWT token', async () => {
        const user = await utils.createUser();
        const jwtToken = await user.getBarearToken();
        const jwtTokenDecoded = jwtDecode(jwtToken);
        expect(jwtTokenDecoded.email).toBe(user.email);
        expect(jwtTokenDecoded.iat).toBeDefined();
        expect(jwtTokenDecoded.iat).not.toBeNull();
    });
});