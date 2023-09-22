const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const app = express()

//all routes
const roleRoutes = require('./routes/roles.js')
const userRoutes = require('./routes/users.js')
const authRoutes = require('./routes/auth.js')
const recordRoutes = require('./routes/records.js')
const privilgeRoutes = require('./routes/privilege.js')


//middlewares
app.use(cors({
    origin:"https://aics-attend.onrender.com",
    credentials:true
}))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//upload 
const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'./uploads/')
    },
    filename: function (req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({ storage:storage })

app.post("/api/upload",upload.single("file"),(req,res)=>{
    const file = req.file;
    res.status(200).json({file_name:file.filename});
})

//require database connection
require('./database/connection.js')


app.use("/api/roles",roleRoutes)
app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/privs",privilgeRoutes)
app.use("/api/records",recordRoutes)


app.listen(8000,()=>{
    console.log("server listening at port 8000")
})