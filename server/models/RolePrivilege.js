const Sequelize = require('sequelize')
const sequelize= require('../database/connection.js')
const Role = require('./Role.js')
const Privilege = require('./Privilege.js')

const RolePrivilege = sequelize.define("RolePrivilege",{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    roleId:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey:true
    },
    privilegeId:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey:true
    }

})

// Define the association between RolePrivilege and Privilege
RolePrivilege.belongsTo(Privilege, { foreignKey: 'privilegeId' });

// Define the association between RolePrivilege and Role
RolePrivilege.belongsTo(Role, { foreignKey: 'roleId' });

Privilege.belongsToMany(Role, { through: 'RolePrivilege' });
Role.belongsToMany(Privilege, { through: 'RolePrivilege' });



module.exports=RolePrivilege