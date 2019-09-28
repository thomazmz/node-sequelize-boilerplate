const uniqid = require('uniqid');

const { sequelize } = require('../../src/app/models');
const { User } = require('../../src/app/models');

module.exports = {

  getUniqueUserParams : () => {
    const identifier = uniqid();
    return {
      name: `John Doe ${identifier}`,
      email: `john.doe.${identifier}@email.com`,
      password: identifier
    }
  },

  createUser : async (userData) => {
    const identifier = uniqid();
    const user = await User.build({
      name: userData && userData.name ? userData.name : `John Doe ${identifier}`,
      email: userData && userData.email ? userData.email : `john.doe.${identifier}@email.com`,
      password: userData && userData.password ? userData.password : identifier
    });
    await user.hashPassword();
    await user.save();
    return user;
  },

  buildUser : (userData) => {
    const identifier = uniqid();
    return User.build({
      name: userData && userData.name ? userData.name : `John Doe ${identifier}`,
      email: userData && userData.email ? userData.email : `john.doe.${identifier}@email.com`,
      password: userData && userData.password ? userData.password : identifier
    });
  },
  
  truncate : () => {
    return Promise.all(Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    }))
  }
}