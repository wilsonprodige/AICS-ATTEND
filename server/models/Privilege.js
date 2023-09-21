const Sequelize = require('sequelize')
const sequelize= require('../database/connection.js')
const Role = require('./Role.js')

const Privilege = sequelize.define("Privilege",{
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
    name:{
        type:Sequelize.STRING
    },
    icon:{
        type:Sequelize.STRING
    }
    

})

Privilege.belongsToMany(Role, { through: 'RolePrivilege' });
Role.belongsToMany(Privilege, { through: 'RolePrivilege' });


module.exports=Privilege