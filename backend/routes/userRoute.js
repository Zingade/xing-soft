const express = require('express');
const User = require('../models/userModel')
const {getToken} = require('../util');

const router = express.Router();

router.post('/signin', async (req, res) => {
    

    const signinUser = await User.findOne({
        email:req.body.email,
        password:req.body.password
    });

    if(signinUser){
        res.send({
            _id:signinUser._id,
            name:signinUser.name,
            email:signinUser.email,
            isAdmin:signinUser.isAdmin,
            token: getToken(signinUser)
        })
    }
    else {
        res.status(401).send({msg: 'Invalid e-mail or password'})
    }
})

router.post('/register', async (req, res) => {
    
    const user = User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            isAdmin:newUser.isAdmin,
            token: getToken(newUser)
        })
    }
    else {
        res.status(401).send({msg: 'Invalid User Data'})
    }
})

router.post('/createadmin', async (req, res) => {
    try{
            const adminUser = await User.findOne({
                isAdmin:true,
            });
    
            if (adminUser){
                res.status(401).send({msg:'Admin already exists'});    
            }
            else {
                const user = new User({
                    name:req.body.name,
                    email:req.body.email,
                    password: req.body.password,
                    isAdmin: true,
                });
                const newUSer = await user.save();
                res.send(newUSer);
            }
        } catch(error) {
            res.send({msg:error.message});
        }
})

module.exports = router;