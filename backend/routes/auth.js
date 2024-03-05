const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'hello!ndia';

const genToken = (user)=>{
    const data={
        user:{
            id:user.id
        }
    }
    return jwt.sign(data, JWT_SECRET);
}

//CreateUser
router.post('/createuser',[
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
    body('name', 'Enter a valid Name').isLength({min: 3})
], async (req,res)=>{
    let success=false;
    const result = validationResult(req);
    if (result.isEmpty()) {

        try{       
            let user = await User.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({success: success, error: 'Email already exists!'})
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })
            
            // const data={
            //     user:{
            //         id:user.id
            //     }
            // }
            // .then((user)=>{res.json(user)})
            // .catch((error)=>{console.log(error); res.json({error: 'Email already exists', message: error.message})});
            // const authToken = jwt.sign(data, JWT_SECRET);
            const authToken = genToken(user);
            // console.log(jwtdata);
            success = true;

            return res.json({success: success, authToken: authToken});
            // res.send(`Hello, ${req.body.name}!`);
        }
        
        catch(error){
            console.log(error.message);
            res.status(500).send("Internal Server Error");
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
    let success=false;
    
    if (result.isEmpty()){
        const {email, password} = req.body;

        try{
            let user = await User.findOne({email:email});
            if(!user){
                return res.status(400).json({success: success, error: "Enter correct credentials"});
            }

            const passComp = await bcrypt.compare(password, user.password);

            if(!passComp){
                return res.status(400).json({success: success, error: "Enter correct credentials"});
            }

            const data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            return res.json({success: success, authToken: authToken});


        }

        catch(error){
            console.log(error.message);
            res.status(500).send("Internal Server Error");
        }

        return ;
    }

    res.status(400).send({ errors: result.array() });
});

//ROUTE 3 : GET USER DETAILS

router.post('/getuser', fetchUser, async (req,res) =>{
    try {
        let userID=req.user.id;
        const user = await User.findById(userID).select('-password');
        
        res.send(user);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/changepassword', fetchUser, async(req, res)=>{
    let success = false;
    try{
        const {oldPass, newPass} = req.body;
        let userID=req.user.id;

        let user = await User.findById(userID).select('+password');

        const passComp = await bcrypt.compare(oldPass, user.password);

        if(!passComp){
            return res.status(400).json({success: success, error: "Old password is incorrect"});
        }
        console.log(user);
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(newPass, salt);

        user = await User.findByIdAndUpdate(userID, {$set: {password: secPass}}, {new:true});

        const authToken = genToken(user);
        success = true;        
        return res.json({success: success, authToken: authToken});

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})


module.exports=router;