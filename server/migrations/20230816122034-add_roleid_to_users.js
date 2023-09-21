'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.addColumn('Users','roleId',{
      type: Sequelize.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users','roleId')
  }
};
