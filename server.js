
const express = require('express');
const path = require('path');

const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve root files as fallback
app.use(express.static(__dirname));

// API routes
app.use('/api', apiRoutes);

// Export Express app for Vercel
module.exports = app;

// Start local server only when running directly
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`SkyExplorer running at http://localhost:${PORT}`);
    });
}
