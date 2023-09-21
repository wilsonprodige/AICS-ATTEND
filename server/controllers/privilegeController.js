const Privilege = require('../models/Privilege.js')

const getPrivs = (req,res)=>{

   Privilege.findAll({})
   .then(result=>{
        if(result){
            res.json(result)
        }else{
            res.json({message:"an error occured"})
        }
   })
   .catch(error=>{
    console.log(error)
    res.json({message:"an error occured"})
   })

}
const addPriv = (req,res)=>{

    Privilege.create({title:req.body.title,routeName:req.body.routeName})
    .then(result=>{
        res.json(result)
    })
    .catch(error=>{
        console.log(error)
        res.json({Error:"network error try again"})
    })

}
const updatePriv= (req,res)=>{
    const id = req.params.id;
    Privilege.update({title:req.body.title,routeName:req.body.routeName},{where:{id:id}})
    .then(result=>{
        res.json({message:"privilege updated successfully"})

    })
    .catch(error=>{
        console.log(error);
        res.json({Error:"network error try again"})
    })

}

const deletePriv = (req,res)=>{
    const id= req.params.id
    Privilege.destroy({where:{id:id}})
    .then(data=>{
        res.json({message:"privilege delete successfully"})
    })
    .catch(error=>{
        console.log(error)
        res.json({Error:"Network error try again"})
    })

}

module.exports={
    getPrivs,addPriv,updatePriv,deletePriv
}