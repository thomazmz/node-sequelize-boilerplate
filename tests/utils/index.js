const { sequelize } = require('../../src/app/models');
const { User } = require('../../src/app/models');

module.exports = {

  createUser : (userData) => {
    return User.create({
      name: userData && userData.name ? userData.name : 'John Doe',
      email: userData && userData.email ? userData.email : 'john.doe@email.com',
      password: userData && userData.password ? userData.password : '12345'
    });
  },
  
  truncate : () => {
    return Promise.all(Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true });
    }));
  }
}