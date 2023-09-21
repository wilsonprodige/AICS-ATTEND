const User = require('../models/User.js')
const bcrypt = require('bcrypt')

const getUsers=(req,res)=>{
    User.findAll({attributes:['id','email','name','username','profilepicture','accountstatus','matricule','roleId','createdAt']})
    .then(data=>{
        if(data){
            res.json(data)
        }else{
            res.json({Error:"could not get users"})
        }
        
    })
    .catch(err=>{
        console.log(err)
    })

}
const createUser=(req,res)=>{

    //check if user exists
try{
    User.findOne({where:{email:req.body.email}})
    .then(data=>{
        if(data)return res.json({Error:"email already exists"})
        
        //hash password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password,salt);
            User.create({
                name:req.body.name,
                accountstatus:req.body.accountstatus,
                username:req.body.username,
                email:req.body.email,
                password:hashedPassword,
                roleId:req.body.roleId,
                matricule:req.body.matricule})
            .then(data=>{
                if(data){
                    res.json(data)
                }
            
            })
            .catch(err=>{
                res.json({Error:"Could,not create user account matricule must be unique"})
                console.log(err)
            })
        })
        .catch(error=>{
            console.log(error);
            res.json({Error:"Network Error"})
        })
    }catch(error){
        console.log(error)
        //res.status(500).json({Error:"network error"})
    }
    
    
}
const updateUser=(req,res)=>{
    let id=req.params.id;
    User.update({
        roleId:req.body.roleId,
        matricule:req.body.matricule,
        accountstatus:req.body.accountstatus

    },{where:{id:id}})
    .then(data=>{
        if(data){
            //get all users and return 
            User.findAll({attributes:['id','email','name','username','profilepicture','accountstatus','matricule','roleId','createdAt']})
            .then(result=>{
                if(result){
                    res.json(result)
                }else{
                    res.json({Error:"could not get users"})
                }
                
            })
            .catch(error=>{
                console.log(error)
                res.json({Error:"Get users error"})
            })
            

        }else{
            res.json({Error:"could not update user"})
            res.json({Error:"update error"})
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
}
const deleteUser=(req,res)=>{
    //get the user id
    let id=req.params.id;
    User.destroy({where:{id:id}})
    .then(result=>{
        if(result){
            //fetch user list 
            User.findAll({attributes:['id','email','name','username','profilepicture','accountstatus','matricule','roleId','createdAt']})
            .then(data=>{
                if(data){
                    res.json(data)
                }else{
                    res.json({Error:"could not refetch users"})
                }
                
            })
            .catch(error=>{
                console.log(error)
                res.json({Error:"Get users error"})
            })
            
        }else{
            res.json({Error:"could not delete user"})
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
}
const getCount = (req,res)=>{
    User.count({})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        console.log(err);
        res.json({Error:"could not count users"})
    })

}
const getCountActive = (req,res)=>{
    User.count({where:{accountstatus:true}})
    .then(data=>{
        res.json(data)

    })
    .catch(err=>{
        console.log(err);
        res.json({Error:"could not count users"})
    })
}
const updateProfile = (req,res)=>{
    const id = req.params.id;
    User.update({
        username:req.body.username,
        email:req.body.email,
        name:req.body.name,
        profilepicture:req.body.profilepicture
    },{where:{id:id}})
    .then(result=>{
        if(result){
            console.log(req.body.profilepicture)
            return res.json({message:"profile updated"})
        }else{
            return res.json({Error:"Network error try again"})
        }
    })
    .catch(err=>{
        console.log(err)
        return res.json({Error:"Network error try again"})
    })
}



module.exports={
    getUsers,createUser,updateUser,deleteUser,getCount,getCountActive,updateProfile
}