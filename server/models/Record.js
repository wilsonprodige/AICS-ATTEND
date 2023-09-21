const Sequelize = require('sequelize')
const sequelize= require('../database/connection.js')
const User = require('./User.js')

const Record = sequelize.define("Record",{
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
    }
    
})
User.hasMany(Record,{
    as:'Records',
    foreignKey:'userId'
})
Record.belongsTo(User,{
    as:'User',
    foreignKey:'userId'
})
module.exports=Record