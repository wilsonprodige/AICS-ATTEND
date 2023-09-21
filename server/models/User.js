const Sequelize = require('sequelize')
const sequelize= require('../database/connection.js')
const Role = require('./Role.js')

const User = sequelize.define("User",{
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
    }
    

})
Role.hasMany(User,{
    as:'Users',
    foreignKey:'roleId'
})
User.belongsTo(Role,{
    as:'Role',
    foreignKey:'roleId'
})
module.exports=User