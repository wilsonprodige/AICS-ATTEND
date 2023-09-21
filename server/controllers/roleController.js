const Privilege = require('../models/Privilege.js')
const Role = require('../models/Role.js')
const RolePrivilege = require ('../models/RolePrivilege.js')
const getRoles =(req,res)=>{
    Role.findAll({})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })

}

const createRole = (req,res)=>{
    Role.create({title:req.body.title})
    .then(data=>[
        res.json(data)
    ])
    .catch(err=>{
        console.log(err)
    })
}

const updateRole = (req,res)=>{
    let id= req.params.id;
    Role.update({title:req.body.title},{where:{id:id}})
    .then(data=>[
        console.log(data)
    ])
    .catch(err=>{
        console.log(err)
    })
}

const deleteRole=(req,res)=>{
    let id= req.params.id;
    Role.destroy({where:{id:id}})
    .then(data=>{
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
}

//adding and removing privileges to role

 const addPriv =async (req,res)=>{
    try{
        let roleid= req.params.id;
        const role = await Role.findOne({where:{id:roleid}})
        const priv = await Privilege.findOne({where:{id:req.body.privilegeId}})
        if(role && priv){
            
            RolePrivilege.create({roleId:role.id,privilegeId:priv.id})
            .then(result=>{
                res.json(result)
            })
            .catch(error=>{
                console.log(error)
                res.json({Error:"can not add privilege"})
            })
        }else{
            res.json({Error:"role or privilege does not exist"})
        }
    }catch(err){
        console.log(err)
        res.json({Error:"network wrong"})
    }
   

}

const removePriv = async (req,res)=>{
    try{
        let roleid= req.params.id;
        let privid=req.body.privilegeId;
        //check if role has the priv
        const role_priv = await RolePrivilege.findOne({where:{roleId:roleid,privilegeId:privid}})
        if(role_priv){
            
            RolePrivilege.destroy({where:{roleId:roleid,privilegeId:privid}})
            .then(result=>{
                if(result){
                    res.json({message:"privilege removed"})
                }
            })
            .catch(error=>{
                console.log(error)
                res.json({Error:"network error"})
            })
        }else{
            res.json({Error:"role does not have this privilege"})
        }
    }catch(err){
        console.log(err)
        res.json({Error:"Network error"})
    }
    
}

const getPrivs = async(req,res)=>{
    let id= req.params.id;
    Role.findOne({where:{id:id},include:[{model:Privilege,through:{model:RolePrivilege}}]})
    .then(data=>{
        console.log(data)
        res.json(data)
        

    })
    .catch(error=>{
        console.log(error)
        res.json({Error:"Network error"})
    })

}

module.exports={
    getRoles,createRole,updateRole,deleteRole,addPriv,removePriv,getPrivs
}