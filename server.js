
const express = require('express');
const path = require('path');

const apiRoutes = require('./routes/api');

const app = express();

app.use(express.json());

// Serve frontend files locally
app.use(express.static(path.join(__dirname, 'public')));

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
