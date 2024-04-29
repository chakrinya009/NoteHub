const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//creating a endpoint for getting all the notes previously present  of old and verified user
router.get('/getnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    } catch (err) {
        console.log({ "error": err.message });
        return res.status(500).send("Some error occur");
    }

})

//creating a endpoint for adding a new notes of old and verified user
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('discription', 'Enter a valid discription').isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let { title, discription, tag } = req.body;
            let note = new Notes({
                title, discription, tag, user: req.user.id
            })
            let savenotes = await note.save();
            res.send(savenotes);
        } catch (err) {
            console.log({ "error": err.message });
            return res.status(500).send("Some error occur");
        }

    })

//updating a already existing note made by that specific user
//we can use post but generally put is used
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        let { title, discription, tag } = req.body;
        let newnote = {}; //a object that is going to send as parameter
        if (title)
            newnote.title = title;
        if (discription)
            newnote.discription = discription;
        if (tag)
            newnote.tag = tag;

        //find the note
        let note = await Notes.findById(req.params.id);
        // let note =await Notes.find({_id:req.params.id});   //for this getting { error: "Cannot read properties of undefined (reading 'toString')" }
        if (!note) {
            return res.status(404).send("Not found");
        }
        //checking if it is the specific user
        if (note.user.toString() !== req.user.id)           //toString is to convert id to string
            return res.status(401).send("Not Allowed");

        //so now note exist

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });    // {new:true} ->if any new content comes it will end it (it and newnote is passed in object)
        // res.send(note);
        res.json({ note });


    } catch (err) {
        console.log({ "error": err.message });
        return res.status(500).send("Some error occur");
    }
})

//deleting a note is very silimar to update note
//deleting a already existing note made by that specific user
//we can use post but generally delete is used
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        
        //find the note
        let note = await Notes.findById(req.params.id);
        // let note =await Notes.find({_id:req.params.id});   //for this getting { error: "Cannot read properties of undefined (reading 'toString')" }
        if (!note) {
            return res.status(404).send("Not found");
        }
        //checking if it is the specific user
        if (note.user.toString() !== req.user.id)           //toString is to convert id to string
            return res.status(401).send("Not Allowed");

        //so now note exist

        note= await Notes.findByIdAndDelete(req.params.id);
        // res.send(note);
        res.json({"Success":"the note is deleted","note":note });


    } catch (err) {
        console.log({ "error": err.message });
        return res.status(500).send("Some error occur");
    }
})


module.exports = router;