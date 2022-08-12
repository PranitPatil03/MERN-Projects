const express = require('express')
const router = express.Router()
const Notes = require('../Models/Notes')
const fetchuser = require('../middleware/fetchuser.js')
const { body, validationResult } = require('express-validator');

// Route 1 ==> Get all notes

router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        // const notes = await Notes.find({ user: req.user.id})
        // res.json(notes)
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


module.exports = router