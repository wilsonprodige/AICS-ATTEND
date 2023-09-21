const Sequelize = require('sequelize')

const sequelize = new Sequelize("aics_attend","root","",{
    host:'127.0.0.1',
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