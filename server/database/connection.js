require('dotenv').config()
const Sequelize = require('sequelize')
const dbname=process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new Sequelize(dbname,username,password,{
    host:host,
    dialect:'mysql',
    operatorAliases:false
})

sequelize.authenticate()
.then(res=>{
    console.log('connected...')
})
.catch(error=>{
    console.log(error)
})

module.exports=sequelize
global.sequelize=sequelize