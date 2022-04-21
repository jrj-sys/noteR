const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const notes = require('../db/db.json');
const { v4 : uuidv4 } = require('uuid');

// GET request for all notes
router.get('/notes', (req, res) => {
    let results = notes
    res.json(results);
})

// POST a new note
router.post('/notes', (req, res) => {
   let toJson = path.join(__dirname, '../db/db.json');
   let newNote = req.body
   // Sets an id for all new notes
   newNote.id = uuidv4();
    
   // Push the new note with an ID to the notes database 
   notes.push(newNote);

   fs.writeFile(toJson, JSON.stringify(notes), err => {
       if (err) {
           return console.log(err);
       }
       console.log('Note saved successfully');
   })
   // return the updated new Note
   return res.json(newNote);
})

// DELETE a note
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const toJson = path.join(__dirname, '../db/db.json');

    // loop through database and delete note with the same id
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == noteId) {
            notes.splice(i, 1);
            break;
        }
    }

    // Write to the file again to update
    fs.writeFile(toJson, JSON.stringify(notes), err => {
        if (err) {
            return console.log(err);
        }
        console.log('Your note was deleted.');
    });
    return res.json(notes);
})

module.exports = router;