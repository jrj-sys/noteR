const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const notes = require('../db/db.json');
const { v4 : uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
    let results = notes
    res.json(results);
})

router.post('/notes', (req, res) => {
   let toJson = path.join(__dirname, '../db/db.json');
   let newNote = req.body
   newNote.id = uuidv4();

   notes.push(newNote);

   fs.writeFile(toJson, JSON.stringify(notes), err => {
       if (err) {
           return console.log(err);
       }
       console.log('Note saved successfully');
   })
   res.json(newNote);
})

router.delete('/notes', (req, res) => {
    
})

module.exports = router;