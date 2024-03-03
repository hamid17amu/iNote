const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


// ROUTE 1: get all notes 
router.get('/fetchallnotes',fetchUser, async (req,res)=>{
    const notes = await Notes.find({user: req.user.id});

    res.json(notes);
})

// ROUTE 1: add notes 
router.post('/addnote',fetchUser,[
    body('title', 'Enter a valid Title').isLength({min:3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),
], async (req,res)=>{
    const {title, description, tag} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    try {
        const note = new Notes({
            title, description, tag, user : req.user.id
        })
        const savedNote = await note.save()
        res.send(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})



module.exports=router;