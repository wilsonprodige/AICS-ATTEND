'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addConstraint('records', {
      fields: ['userId', 'date'],
      type: 'unique',
      name: 'userId_date_unique_constraint',
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('records', 'userId_date_unique_constraint');
   
  }
};
