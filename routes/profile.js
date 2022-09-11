var express = require('express');
var router = express.Router();
const User = require('../models/user');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

router.post('/',(req,res,next)=>{
    // we can use find one
    console.log("profile router");
    console.log(req.body);
    // console.log("user = ",User);
    User.find({_id:req.body.userid})
    .exec()
    .then(user=>{
        // console.log("user",user);
        if(user.length<1){
            //got no user
            console.log("first if");
            return res.status(401).json({message:'Auth failed'});
        }
        else{
            console.log("else in profile");
            console.log("user",user);
            return res.status(200).json({
                message:"Profile Successfull",
                // token:token,
                // userId:user[0]._id,
                // admin:user[0].admin,
                name:user[0].name,
                admin:user[0].admin,
                email:user[0].email,
                });
        }
        

        
    })
    .catch(err=> {
        console.log("error");
        res.status(500).json({error : err});
        });
});


router.post('/update',async(req,res,next)=>{
    console.log("..................");
    console.log("reqbody",req.body);
    console.log("..................");
    let user = req.body.user;
    console.log("user.name",user.name);
    const UpdateUser = await User.findById(user.id)
    UpdateUser.name = user.name;
    await UpdateUser.save();
    console.log("oooooooooooo");
    // User.findByIdAndUpdate(user.id,{
    //     'name':user.name,
    //     'resume':user.resume
    // })
    // .then((res)=>{
    //     console.log("/////////////");
    //     console.log(res);
    // })
    // .catch((err)=>{
    //     console.log("...errr",err);
    // })
})


module.exports = router;