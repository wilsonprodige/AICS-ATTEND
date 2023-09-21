'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("users",{

      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    username:{
        type:Sequelize.STRING(50),
        allowNull:false,
    },
    email:{ 
        type:Sequelize.STRING(60),
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    profilepicture:{
        type:Sequelize.STRING
    },
    name:{
        type:Sequelize.STRING,
    },
    accountstatus:{
        type:Sequelize.BOOLEAN
    },
    template:{
        type:Sequelize.STRING,
        unique:true
    },
    matricule:{
        type:Sequelize.STRING,
        unique:true
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,

    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("users")
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
