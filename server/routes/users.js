const express = require('express')
const router = express.Router()
const { getUsers,createUser,updateUser,deleteUser, getCount, getCountActive, updateProfile } = require('../controllers/userController.js')

router.get('/',getUsers)
router.post('/add',createUser)
router.put('/edit/:id',updateUser)
router.delete('/delete/:id',deleteUser)
router.get('/count',getCount)
router.get('/countactive',getCountActive)
router.post('/updateProfile/:id',updateProfile)
module.exports = router