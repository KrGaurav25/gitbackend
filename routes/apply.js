const express=require('express')
const router=express.Router()
const Jobs=require('../models/jobs')
const jwt=require('jsonwebtoken')
const User = require('../models/user')
//const authorize=require("../middleware/autho")
router.post('/',(req,res)=>
{
    const itemid=req.body.itemid
    const userid=req.body.userId
    console.log('inside /apply')
    Jobs.find({_id:itemid}).then((res)=>
    {
        User.updateOne({_id:userid},{
            
            $push:{applied:res[0]}
            // $set:{applied:[]}
        }).then((res)=>console.log(res))
    }).catch((e)=>console.log(e))
    // User.updateOne({_id:userid},{
    //     // $push:{applied:itemid}
    //     $set:{applied:[]}
    // }).then((res)=>console.log(res)).catch((e)=>console.log(e))
})




    module.exports=router
