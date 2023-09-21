const express = require('express')
const router = express.Router()
const { getRoles,createRole,updateRole,deleteRole,addPriv,removePriv,getPrivs } = require('../controllers/roleController.js')


router.get('/',getRoles)
router.post('/add',createRole)
router.put('/edit',updateRole)
router.delete('/delete',deleteRole)
router.post('/addpriv/:id',addPriv)
router.post('/removepriv/:id',removePriv)
router.get("/getprivs/:id",getPrivs)

module.exports = router