const express = require('express')
const router = express.Router()
const { getPrivs,addPriv,updatePriv,deletePriv } = require('../controllers/privilegeController.js')

router.get('/',getPrivs)
router.post('/add',addPriv)
router.put('/update/:id',updatePriv)
router.delete("/delete/:id",deletePriv)

module.exports = router