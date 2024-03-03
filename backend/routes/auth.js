const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


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
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        // .then((user)=>{res.json(user)})
        // .catch((error)=>{console.log(error); res.json({error: 'Email already exists', message: error.message})});
        
        return res.json(user);
        // res.send(`Hello, ${req.body.name}!`);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("some error occured");
    }
    }

    res.send({ errors: result.array() });

    
})

module.exports=router;