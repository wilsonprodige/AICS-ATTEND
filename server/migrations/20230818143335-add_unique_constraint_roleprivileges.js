'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('roleprivileges', {
      fields: ['roleId', 'privilegeId'],
      type: 'unique',
      name: 'role_privilege_unique_constraint',
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('roleprivileges', 'role_privilege_unique_constraint');
    
  }
};
