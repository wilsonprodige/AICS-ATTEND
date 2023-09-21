const Sequelize = require('sequelize')
const sequelize= require('../database/connection.js')

const Role = sequelize.define("Role",{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }

})
module.exports=Role