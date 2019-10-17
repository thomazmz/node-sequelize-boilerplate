const uniqid = require('uniqid');

const { sequelize } = require('../../src/app/models');
const { User } = require('../../src/app/models');

module.exports = {

  getUniqueUserParams : () => {
    const identifier = uniqid();
    return {
      username: `Mary Doe ${identifier}`,
      email: `Mary.doe.${identifier}@email.com`,
      password: identifier
    }
  },

  createUser : async (userData) => {
    const identifier = uniqid();
    const user = await User.build({
      username: userData && userData.username ? userData.username : `Mary Doe ${identifier}`,
      email: userData && userData.email ? userData.email : `mary.doe.${identifier}@email.com`,
      password: userData && userData.password ? userData.password : identifier
    });
    await user.hashPassword();
    await user.save();
    return user;
  },

  buildUser : (userData) => {
    const identifier = uniqid();
    return User.build({
      username: userData && userData.username ? userData.username : `Mary Doe ${identifier}`,
      email: userData && userData.email ? userData.email : `mary.doe.${identifier}@email.com`,
      password: userData && userData.password ? userData.password : identifier
    });
  },
  
  truncate : () => {
    return Promise.all(Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    }))
  }
}