const express=require('express')
const router=express.Router()

const toolbarroute=require('./toolbox.route.js')

router.use('/tools',toolbarroute);

module.exports=router