const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User=require('../models/User.js');
const { use } = require('../routes/auth.js');

const register=(req,res)=>{

    User.findOne({where:{email:req.body.email}})
    .then(data=>{
        if(data) res.json({Error:"email already exists"})

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password,salt);
        //creating user account
        User.create({username:req.body.username,name:req.body.name,email:req.body.email,password:hashedPassword,roleId:1,accountstatus:0})
        .then(result=>{
            if(result){
                res.json({message:"account created"})
            }else{
                res.json({Error:"something went wrong try again"})
            }
        })
        .catch(err=>{
            res.json({Error:"network error try again"})
            console.log(err)
        })
        
        
    })
    .catch(error=>{
        res.json({Error:"network error try again"})
        console.log(error)
    })
    
    
    //     const salt = bcrypt.genSaltSync(10);
    //     const hashedPassword = bcrypt.hashSync(req.body.PASSWORD,salt);

    //     const sql = "INSERT INTO USERS(USERNAME,EMAIL,PASSWORD,NAME) VALUES (?)";
    //     const values = [
    //         req.body.USERNAME,
    //         req.body.EMAIL,
    //         hashedPassword,
    //         req.body.NAME
    //     ];

        
    //     db.query(sql,[values],(error,response)=>{
    //         if(error) return res.json({Error:error})
    //         if(response){
    //             return res.json({status:"success"})
    //         }
    //         else{
    //             res.json({Error:"an error occured during user account creation"})
    //         }
    //     })
    // })
}
const login=(req,res)=>{
    User.findOne({where:{email:req.body.email}})
    .then(data=>{
        if(data){
            console.log(data.password)
            const checkPassword = bcrypt.compareSync(req.body.password,data.password);
            if(!checkPassword) return res.json({Error:"wrong email or password"})

            const token = jwt.sign({id:data.id},"secret-key")
            const {password, ...others}=data
            res.cookie("accessToken",token,{
                httpOnly:true
            }).json(data.id)

        }else{
            return res.json({Error:"user not found"})
        }
    })
    .catch(err=>{
        res.json({Error:"network error try again"})
        console.log(err)
    })

    
    //     const checkPassword = bcrypt.compareSync(req.body.PASSWORD,result[0].PASSWORD);
    //     if(!checkPassword) return res.json({Error:"wrong username or password"})

    //     const token = jwt.sign({ID:result[0].ID},"secret-key");

    //     if (res.headersSent) {
    //         return res.json({ Error: 'user alreday logged in' });
    //       }


    //     const {PASSWORD, ...others} = result[0]
    //     res.cookie("accessToken",token,{
    //         httpOnly:true
    //     })
    //     .json(others)

    // })

}
const checkAuth =(req,res)=>{
   
        const token = req.cookies.accessToken;
        console.log(req.cookies)
        if(!token){
            res.json({Error:"Not logged in"})
        }
        jwt.verify(token,"secret-key",(err,userInfo)=>{
            if(err) {
                return res.json({Error:"token is invalid"})
                
            }
            User.findOne({attributes:['id','email','name','username','profilepicture','accountstatus','matricule','roleId'],where:{id:userInfo.id}})
            .then(data=>{
                if(data){
                    console.log(data)
                    res.json(data)

                }else{
                    res.json({Error:"network error"})
                }

            }).catch(error=>{
                console.log(error);
                res.json({Error:"network error"})
            })
            //return res.json(userInfo)
        })
    
}

const logout =(req,res)=>{
    try{
        res.clearCookie("accessToken",{
            secure:true,
            sameSite:"none"
        }).status(200).json({message:"user has been logged out"})

    }
    catch(err){
        res.json({Error:"something went wrong, try again"})
        return res.json({Error:err})
    }

}

module.exports={
    register,login,checkAuth,logout
}