const jwtDecode = require('jwt-decode');

const { User } = require('../../../src/app/models');
const utils = require('../../utils');

describe('User model tests', () => {

    beforeEach(async () => {
        utils.truncate();
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

    // it('should find user passing username as unique identifier', async () => {
    //     const user = await utils.createUser();
    //     const findedUser = await User.findOneByStringIdentifier(user.name);
    //     expect(user.id).toBe(findedUser.id);
    // })

    it('should find user passing email as unique identifier', async () => {
        const user = await utils.createUser();
        const findedUser = await User.findOneByStringIdentifier(user.email);
        expect(user.id).toBe(findedUser.id);
    })

    it('should hash user password', async () => {
        const user = await utils.createUser({ password: '12345' });
        expect(user.password).not.toBe('12345');
    });

    it('should verify user password', async () => {
        const user = await utils.createUser({ name: 'John Doe', email: 'john.doe@gmail.com', password: '12345' });
        const firstTry = await user.verifyPassword('12345');
        const secondTry = await user.verifyPassword('12345!');
        expect(firstTry.email).toBe(user.email);
        expect(firstTry.id).toBe(user.id);
        expect(firstTry).not.toBeNull();
        expect(secondTry).toBe(null);
    });

    it('should verify credentials', async () => {
        const user = await utils.createUser({password: '12345' });
        const firstTry = await User.verifyCredentials(user.email, '12345');
        const secondTry = await User.verifyCredentials(user.email, '!12345');
        const thirdTry = await User.verifyCredentials('!'+user.email, '12345');
        const fourthTry = await User.verifyCredentials('!'+user.email, '!12345');
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

    // it('should  validate password', async () => {
    //     const user = User.build({ password: '12345' });
    //     await user.hashPassword();
    //     await user.save();
    //     const firstTry = await User.verifyCredentials(user, userParams.password);
    //     const secondTry = await User.verifyCredentials(user, userParams.password+"!");
    //     expect(firstTry).toBe(user);
    //     expect(secondTry).toBe(null);
    // });


});