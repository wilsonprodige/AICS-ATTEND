'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Records','userId',{
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Records','userId')
  }
};
