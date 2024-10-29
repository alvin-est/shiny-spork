const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// GET route for retrieving notes
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred!' });
        }
        // console.log(JSON.parse(data));
        res.json(JSON.parse(data));
    });
});

// POST route to save a new note
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred!' });
        }
        const notes = JSON.parse(data);
        const newNote = { ...req.body, id: uuidv4() }; // Generate a unique ID using uuidv4
        notes.push(newNote);
        // Includes "null, 2" for better readability
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred while writing to the file!' });
        }
        res.json(newNote);
        });
    });
});

// DELETE route to delete a note
router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred!' });
        }
        try {
            const notes = JSON.parse(data);
            const updatedNotes = notes.filter((note) => note.id !== req.params.id);
            // Includes "null, 2" for better readability
            fs.writeFile('./db/db.json', JSON.stringify(updatedNotes, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'An error occurred!' });
                }
                res.json({ message: 'Note deleted!' });
            });
        }
        catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ message: 'Error processing the delete operation!' });
        }     
    });
});

module.exports = router;