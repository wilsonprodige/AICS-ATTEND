'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      return queryInterface.createTable("records",{
        id:{
          type:Sequelize.INTEGER(11),
          allowNull:false,
          autoIncrement:true,
          primaryKey:true
  
        },
        date:{
            type:Sequelize.DATEONLY,
            allowNull:false
        },
        arrivalTime:{
            type:Sequelize.TIME
        },
        departureTime:{
            type:Sequelize.TIME
        },
        createdAt:Sequelize.DATE,
        updatedAt:Sequelize.DATE,
        
      })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("records")
   
  }
};
