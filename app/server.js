// Import modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for serving static files
app.use(express.static('views'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and mount routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.get('*', (req, res) => {
    // Catch-all route to handle user requests to an unknown route
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});