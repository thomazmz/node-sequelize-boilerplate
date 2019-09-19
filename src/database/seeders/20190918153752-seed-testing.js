'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      email : 'thomaz.zandonotto@test.com',
      name : 'Thomaz Zandonotto',
      password : '1234567',
      created_at : new Date(),
      updated_at : new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', [{
      email : 'thomaz.zandonotto@test.com'
    }])
  }
};