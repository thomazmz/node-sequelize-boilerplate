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

    it('should find user passing username as unique identifier', async () => {
        const user = await utils.createUser();
        const findedUser = await User.findOneByStringIdentifier(user.name);
        expect(user.id).toBe(findedUser.id);
    })

    it('should find user passing email as unique identifier', async () => {
        const user = await utils.createUser();
        const findedUser = await User.findOneByStringIdentifier(user.email);
        expect(user.id).toBe(findedUser.id);
    })

    it('should hash user password', async () => {
        const user = User.build({ password: '12345' });
        await user.hashPassword();
        expect(user.password).not.toBe('12345');
    });

    it('should verify user password', async () => {
        const user = User.build({ name: 'John Doe', email: 'john.doe@gmail.com', password: '12345' });
        await user.hashPassword();
        await user.save();
        const firstTry = await user.verifyPassword('12345');
        const secondTry = await user.verifyPassword('12345!');
        expect(firstTry).toBe(true);
        expect(secondTry).toBe(false);
    });

    it('should verify credentials', async () => {
        const user = User.build({ name: 'John Doe', email: 'john.doe@gmail.com', password: '12345' });
        await user.hashPassword();
        await user.save();
        const firstTry = await user.verifyCredentials('john.doe@gmail.com', '12345');
        const secondTry = await user.verifyCredentials('john.doe@gmail.com', '12345!');
        const thirdTry = await user.verifyCredentials('john.doee@gmail.com', '12345');
        const fourthTry = await user.verifyCredentials('john.doee@gmail.com', '12345!');
        expect(firstTry).toBe(true);
        expect(secondTry).toBe(false);
        expect(thirdTry).toBe(false);
        expect(fourthTry).toBe(false);
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

    // it('should include user data on JWT token', async () => {
    //     const user = await User.create(userParams);
    //     const jwtToken = await user.getBarearToken();
    //     const jwtTokenDecoded = jwtDecode(jwtToken);
    //     expect(jwtTokenDecoded.email).toBe(userParams.email);
    //     expect(jwtTokenDecoded.iat).toBeDefined();
    // });

});