'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('privileges', 'name', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('privileges', 'icon', {
        type: Sequelize.STRING
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('privileges', 'name'),
      queryInterface.removeColumn('privileges', 'icon')
    ]);
  }
};
