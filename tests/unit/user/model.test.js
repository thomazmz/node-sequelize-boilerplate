const { User } = require('../../../src/app/models');
const truncate = require('../../utils/truncate');
userParams = { 
    name: 'John Doe', 
    email: 'john.doe@email.com', 
    password: '12345' 
}

describe('User model', () => {

    beforeAll(async () => {
        await truncate();        
    });

    it('should create a new user', async () => {
        await User.create(userParams);
        const user = await User.findOne({where: { email : userParams.email }});
        expect(user.name).toBe(userParams.name);
    });

});