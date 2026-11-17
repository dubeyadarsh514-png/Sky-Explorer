// ============================================
// server.js - This is the main server file
// It starts the Express web server
// ============================================

// Step 1: Load the packages we need
const express = require('express');  // Express helps us create a web server easily
const path = require('path');        // Path helps us work with folder/file paths

// Step 2: Load our own route file (we made this separately to keep things organized)
const apiRoutes = require('./routes/api');

// Step 3: Create the Express application
const app = express();

// Step 4: Choose a port number (3000 is a common choice for development)
const PORT = 3000;

// ============================================
// MIDDLEWARE (These run for every request)
// ============================================

// This lets Express read JSON data sent from the frontend (for our contact form)
app.use(express.json());

// This tells Express to serve all the files inside the 'public' folder
// So if someone visits our website, they get index.html from public/
app.use(express.static(path.join(__dirname, 'public')));

// This also serves image files from the root folder (where our .png images are)
// Because our images are in the root directory, not inside public/
app.use(express.static(__dirname));

// ============================================
// ROUTES
// ============================================

// Any request that starts with /api will be handled by our api.js routes file
app.use('/api', apiRoutes);

// ============================================
// START THE SERVER
// ============================================

// This starts the server and listens on port 3000
app.listen(PORT, () => {
    console.log('====================================');
    console.log('  SkyExplorer Server is Running!');
    console.log(`  Open: http://localhost:${PORT}`);
    console.log('====================================');
});
