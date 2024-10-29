const express = require('express');
const fs = require('fs');
const router = express.Router();

// GET route for retrieving notes
router.get('/notes', (req, res) => {
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred!' });
        }
        res.json(JSON.parse(data));
    });
});

// POST route to save a new note
router.post('/notes', (req, res) => {
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred!' });
        }
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = notes.length + 1;
        notes.push(newNote);
        fs.writeFile('../db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred!' });
        }
        res.json(newNote);
        });
    });
});

// DELETE route to delete a note
router.delete('/notes/:id', (req, res) => {
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred!' });
        }
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter((note) => note.id !== parseInt(req.params.id));
        fs.writeFile('../db/db.json', JSON.stringify(updatedNotes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'An error occurred!' });
        }
        res.json({ message: 'Note deleted!' });
        });
    });
});

module.exports = router;