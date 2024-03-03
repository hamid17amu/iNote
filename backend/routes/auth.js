const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'hello!ndia';

//CreateUser
router.post('/createuser',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
    body('name', 'Enter a valid Name').isLength({min: 3})
], async (req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {

        try{       
            let user = await User.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({error: 'Email already exists!'})
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            
            const data={
                user:{
                    id:user.id
                }
            }
            // .then((user)=>{res.json(user)})
            // .catch((error)=>{console.log(error); res.json({error: 'Email already exists', message: error.message})});
            const authToken = jwt.sign(data, JWT_SECRET);
            // console.log(jwtdata);

            return res.json({authToken: authToken});
            // res.send(`Hello, ${req.body.name}!`);
        }
        
        catch(error){
            console.log(error.message);
            res.status(500).send("some error occured");
        }
    }

    res.send({ errors: result.array() });

    
})

//Login
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter the Password').exists()
], async (req,res) =>{
    const result = validationResult(req);
    if (result.isEmpty()){
        const {email, password} = req.body;

        try{
            let user = await User.findOne({email:email});
            if(!user){
                return res.status(400).json({error: "Enter correct credentials"});
            }

            const passComp = await bcrypt.compare(password, user.password);

            if(!passComp){
                return res.status(400).json({error: "Enter correct credentials"});
            }

            const data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);

            return res.json({authToken: authToken});


        }

        catch(error){
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }

        return ;
    }

    res.status(400).send({ errors: result.array() });
});

module.exports=router;