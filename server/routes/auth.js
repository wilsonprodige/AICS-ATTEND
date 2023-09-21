const express = require('express')
const router = express.Router()
const { register, login,checkAuth,logout } = require('../controllers/authController.js')

router.post('/register',register)
router.post('/login',login)
router.get('/',checkAuth)
router.get('/logout',logout)

module.exports = router