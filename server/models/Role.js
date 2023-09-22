const Sequelize = require('sequelize')
const sequelize= require('../database/connection.js')

const Role = sequelize.define("role",{
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