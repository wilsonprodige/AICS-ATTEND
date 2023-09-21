'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("privileges",{
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    title:{
      type:Sequelize.STRING,
      unique:true
    },
    routeName:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,


    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("privileges")
  }
};
