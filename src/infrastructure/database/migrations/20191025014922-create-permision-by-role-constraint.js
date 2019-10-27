'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('PermisionByRole', ['role_id', 'permision_id'], {
      type: 'unique'
    })
  }
};
