const { request } = require('express')
const Record = require('../models/Record.js')
const User = require('../models/User.js')
const {Op,fn,col} = require('sequelize')

const getRecords = (req,res)=>{
    Record.findAll({include:[{
        model:User,
        as:'User',
        attributes: ['id', 'username', 'profilepicture']
}]})
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>{
        console.log(err)
        res.json({Error:"Could not get records"})
    })
}
const countRecords = (req,res)=>{
    Record.count({})
    .then(result=>{
        if(result){
            return res.json(result)
        }
    })
    .catch(err=>{
        console.log(err)
        return res.json({Error:"an error occured"})
    })
}

const  createRecord = async (req,res)=>{
    const id = req.params.id
    Record.create({
        date:req.body.date,
        arrivalTime:req.body.arrivalTime,
        departureTime :req.body.departureTime,
        userId:id
    })
    .then(result=>{
        if(result){
                //fetch new list and return 
                Record.findAll({})
                .then(data=>{
                    return res.json(data)
                })
                .catch(error=>{
                    console.log(error)
                    return res.json({Error:"error while getting record list"})
                })
            
        }else{
            return res.json({Error:"could not create a record for this user, already exists"})
        }
        
    })
    .catch(err=>{
        console.log(err)
        return res.json({Error:"cannot create new record, record exists!"})
    })
}

const deleteRecord= (req,res)=>{
    const id = req.params.id;
    Record.destroy({where:{id:id}})
    .then(result=>{
        //fetch new list and return 
                Record.findAll({include:[{
                    model:User,
                    as:'User',
                    attributes: ['id', 'username', 'profilepicture']
                    }]})
                .then(data=>{
                    return res.json(data)
                })
                .catch(err=>{
                    console.log(err)
                    res.json({Error:"Could not get records"})
                })
        })
        .catch(err0r=>{
            console.log(error)
            res.json({Error:"could not delete record"})
        })
        }

const updateRecord = (req,res) =>{
    const id = req.params.id;
    Record.update({
        arrivalTime:req.body.arrivalTime,
        departureTime:req.body.departureTime
    },{where:{id:id}})
    .then(result=>{
        if(result){
            //fetch new list and return 
            Record.findAll({})
            .then(data=>{
                return res.json(data)
            })
            .catch(error=>{
                console.log(error)
                return res.json({Error:"error while getting user list"})
            })


        }else{
            return res.json({Error:"could not update"})
        }

    })
    .catch(error=>{
        console.log(error)
        return res.json({Error:"could not update record"})
    })
}

const countToday= (req,res)=>{
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    Record.count({where:{date:formattedDate}})
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>{
        console.log(err);
        return res.json({Error:"could not count today's records"})
    })
    //return res.json({date:formattedDate})
}

const deleteAll =(req,res)=>{
    Record.destroy({where:{}})
    .then(result=>{
            //fetch all records and return 
            Record.findAll({})
            .then(data=>{
                return res.json(data)
            })
            .catch(error=>{
                console.log(error)
                return res.json({Error:"error while getting record list"})
            })
    })
    .catch(error=>{
        console.log(error)
        return result.json({Error:"could not delete these records"})
    })
}
const getMyRecords = (req,res)=>{
    const id = req.params.id;
    Record.count({where:{userId:id}})
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>{
        console.log(err)
        return res.json({Errorp:"Network error"})
    })
}
const getPresentToday = (req,res)=>{
    const userId = req.params.id;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    Record.count({where:{userId:userId,date:formattedDate}})
    .then(result=>{
        if(result ===1){
            return res.json(true)
        }else{
            return res.json(false)
        }

    })
    .catch(err=>{
        console.log(err)
        return res.json({Error:"Network error"})
    })
}
const getMonthPrence = (req,res)=>{
    const userId = req.params.id;
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
    const enfOfMonth = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0)
    Record.count({where:{
        userId:userId,
        date:{
            [Op.between]:[startOfMonth,enfOfMonth]
        }
    }})
    .then(result=>{
        return res.json(result)
    })
    .catch(error=>{
        console.log(error)
        return res.json({Error:"Network Error"})
    })

}
const MyRecords = (req,res)=>{
    const id = req.params.id;
    Record.findAll({where:{userId:id}})
    .then(result=>{
        if(result){
            return res.json(result)
        }else{
            return res.json({Error:"network error, please try again"})
        }
    })
    .catch(error=>{
        console.log(error)
        return res.json({Error:'could not get records'})
    })
}
const getTodayOnTime = (req,res)=>{
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    Record.count({where:{
        date:formattedDate,
        arrivalTime:{
            [Op.lte]:'08:00:00'
        }
    }})
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>{
        console.log(err);
        return res.json({Error:"could not count today's records"})
    })

}
const getTodayLate = (req,res) =>{
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    Record.count({where:{
        date:formattedDate,
        arrivalTime:{
            [Op.gt]:'08:00:00'
        }
    }})
    .then(result=>{
        return res.json(result)
    })
    .catch(err=>{
        console.log(err);
        return res.json({Error:"could not count today's records"})
    })

}
 const getRecordDataCollection = async(req,res)=>{
        const currentYear = new Date().getFullYear()
        
        try{
            const one =await Record.count({
                where: {
                  date: {
                    [Op.between]: [
                      new Date(currentYear, 0, 1),
                      new Date(currentYear, 11, 31, 23, 59, 59, 999),
                    ],
                  },
                },
              })

              const two = await Record.count({
                where: {
                  date: {
                    [Op.between]: [
                      new Date(currentYear-1, 0, 1),
                      new Date(currentYear-1, 11, 31, 23, 59, 59, 999),
                    ],
                  },
                },
              })

              const three = await Record.count({
                where: {
                  date: {
                    [Op.between]: [
                      new Date(currentYear-2, 0, 1),
                      new Date(currentYear-2, 11, 31, 23, 59, 59, 999),
                    ],
                  },
                },
              })
              const four = await Record.count({
                where: {
                  date: {
                    [Op.between]: [
                      new Date(currentYear-3, 0, 1),
                      new Date(currentYear-3, 11, 31, 23, 59, 59, 999),
                    ],
                  },
                },
              })
              const five = await Record.count({
                where: {
                  date: {
                    [Op.between]: [
                      new Date(currentYear-4, 0, 1),
                      new Date(currentYear-4, 11, 31, 23, 59, 59, 999),
                    ],
                  },
                },
              })

              const collection = [one,two,three,four,five]
              return res.json(collection)

        }
        catch(error){
            console.log(error)
            return res.json({Error:"something went wrong"})
        }
        

}
const getRecordDataCollectionTime = async(req,res)=>{
    const currentYear = new Date().getFullYear()
    
    try{
        const one =await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear, 0, 1),
                  new Date(currentYear, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.lte]:'08:00:00'
              }
            },
          })

          const two = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-1, 0, 1),
                  new Date(currentYear-1, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.lte]:'08:00:00'
              }
            },
          })

          const three = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-2, 0, 1),
                  new Date(currentYear-2, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.lte]:'08:00:00'
              }
            },
          })
          const four = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-3, 0, 1),
                  new Date(currentYear-3, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.lte]:'08:00:00'
              }
            },
          })
          const five = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-4, 0, 1),
                  new Date(currentYear-4, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.lte]:'08:00:00'
              }
            },
          })

          const collection = [one,two,three,four,five]
          return res.json(collection)

    }
    catch(error){
        console.log(error)
        return res.json({Error:"something went wrong"})
    }
    

}
const getRecordDataCollectionLate = async(req,res)=>{
    const currentYear = new Date().getFullYear()
    
    try{
        const one =await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear, 0, 1),
                  new Date(currentYear, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.gt]:'08:00:00'
              }
            },
          })

          const two = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-1, 0, 1),
                  new Date(currentYear-1, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.gt]:'08:00:00'
              }
            },
          })

          const three = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-2, 0, 1),
                  new Date(currentYear-2, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.gt]:'08:00:00'
              }
            },
          })
          const four = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-3, 0, 1),
                  new Date(currentYear-3, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.gt]:'08:00:00'
              }
            },
          })
          const five = await Record.count({
            where: {
              date: {
                [Op.between]: [
                  new Date(currentYear-4, 0, 1),
                  new Date(currentYear-4, 11, 31, 23, 59, 59, 999),
                ],
              },
              arrivalTime:{
                [Op.gt]:'08:00:00'
              }
            },
          })

          const collection = [one,two,three,four,five]
          return res.json(collection)

    }
    catch(error){
        console.log(error)
        return res.json({Error:"something went wrong"})
    }
    

}
module.exports={
    getRecords,countRecords,createRecord,deleteRecord,updateRecord,countToday,deleteAll,getMyRecords,getPresentToday,getMonthPrence,MyRecords,getTodayOnTime,getTodayLate,getRecordDataCollection,getRecordDataCollectionTime,getRecordDataCollectionLate
}