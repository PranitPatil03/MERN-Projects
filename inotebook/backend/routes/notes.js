const express = require('express')
const router = express.Router()
const Notes = require('../Models/Notes')
const fetchuser = require('../middleware/fetchuser.js')
const { body, validationResult } = require('express-validator');

// Route 1 ==> Get all notes

router.get('/fetchallnotes',fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})

// Route 2 ==> Create Notes 

router.post('/createnotes', fetchuser,[
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();

        res.json(saveNote)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})


// Route 3 ==> Update Notes 

router.put('/updatenote/:id', fetchuser,async (req, res) => {

    const {title, description,tag}=req.body;

    try {
        
    const newNote={};
    
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    let note=await Notes.findById(req.params.id);

    if(!note){
        return res.status(404).send("Note not found")
    }

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not authorized")
    }

    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})

    res.json({note})
    } 

    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})


router.delete('/deletenote/:id', fetchuser,async (req, res) => {

    const {title, description,tag}=req.body;


    try {
        let note=await Notes.findById(req.params.id);

        if(!note){
            return res.status(404).send("Note not found")
        }
    
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not authorized")
        }
    
        note=await Notes.findByIdAndDelete(req.params.id)
    
        res.json({"success":"Note Deleted Successfully",note:note})
    } 

    catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }

})


module.exports = router





