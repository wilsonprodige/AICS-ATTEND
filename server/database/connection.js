require('dotenv').config()
const Sequelize = require('sequelize')
const dbname=process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const sequelize = new Sequelize(dbname,username,password,{
    port:process.env.DB_PORT,
    host:host,
    dialect:'mysql',
    operatorAliases:false
})

sequelize.authenticate()
.then(res=>{
    console.log('connected...')
    console.log(process.env.DB_HOST)
})
.catch(error=>{
    console.log(process.env.DB_HOST)
    console.log(process.env.DB_USERNAME)
    console.log(process.env.DB_PASSWORD)
    console.log(process.env.DB_NAME)
    console.log(error)
})

module.exports=sequelize
global.sequelize=sequelize