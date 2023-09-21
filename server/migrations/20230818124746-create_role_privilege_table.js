'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("roleprivileges",{
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

      },
      roleId:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey:true,
        references: {
          model: 'Roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      privilegeId:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey:true,
        references: {
          model: 'Privileges',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt:Sequelize.DATE,
       updatedAt:Sequelize.DATE,
    })
   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("roleprivileges")
   
  }
};
