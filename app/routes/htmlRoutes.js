const express = require('express');
const path = require('path');
const router = express.Router();

// GET routes for serving HTML files
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;