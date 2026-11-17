// ============================================
// routes/api.js - All API endpoints
// ============================================

const express = require('express');
const router  = express.Router();

const { flightRoutes, destinations, airlines, contactMessages } = require('../data/flights');

// ---- Helper: Format price number as ₹ string ----
// e.g., 14900 → "₹14,900"
function formatPrice(num) {
    return '₹' + num.toLocaleString('en-IN');
}


// ============================================================
// ROUTE 1: GET /api/flights
// Returns ALL flights in the database
// ============================================================
router.get('/flights', (req, res) => {
    res.json({
        success: true,
        count: flightRoutes.length,
        data: flightRoutes
    });
});


// ============================================================
// ROUTE 2: GET /api/search?from=Delhi&to=Dubai
//
// Returns ALL airline options for that route, sorted cheapest first.
// Each airline has a DIFFERENT price, duration, and stops.
// ============================================================
router.get('/search', (req, res) => {

    const from = req.query.from;
    const to   = req.query.to;

    // Validate input
    if (!from || !to) {
        return res.json({ success: false, message: "Please provide both 'from' and 'to' cities." });
    }

    if (from === to) {
        return res.json({ success: false, message: "Origin and Destination cannot be the same!" });
    }

    // Find ALL flights matching this route
    const results = flightRoutes.filter(route => route.from === from && route.to === to);

    if (results.length > 0) {
        // Sort by price: cheapest first
        results.sort((a, b) => a.price - b.price);

        // Format the price as ₹ string before sending to frontend
        const formattedResults = results.map(r => ({
            ...r,
            priceNum: r.price,            // Keep original number for calculations
            price: formatPrice(r.price)   // Add formatted ₹ string
        }));

        res.json({
            success: true,
            count: formattedResults.length,
            from: from,
            to: to,
            data: formattedResults
        });

    } else {
        // No flights found for this route — show a generic fallback
        res.json({
            success: true,
            count: 1,
            from: from,
            to: to,
            data: [{
                from:     from,
                to:       to,
                airline:  "Sky Airlines",
                price:    "₹45,000",
                priceNum: 45000,
                duration: "8h 00m",
                stops:    "1 Stop",
                dep:      "10:00 AM",
                arr:      "06:00 PM",
                rating:   3.8
            }]
        });
    }
});


// ============================================================
// ROUTE 3: GET /api/comparison?from=Delhi&to=Dubai
//
// Returns comparison data for a specific route.
// If no route is given, returns a popular default set.
// ============================================================
router.get('/comparison', (req, res) => {

    const from = req.query.from;
    const to   = req.query.to;

    if (from && to && from !== to) {
        // Route-specific comparison: find all flights for this route
        const results = flightRoutes.filter(r => r.from === from && r.to === to);

        if (results.length > 0) {
            results.sort((a, b) => a.price - b.price);

            const formatted = results.map(r => ({
                airline:  r.airline,
                price:    formatPrice(r.price),
                duration: r.duration,
                stops:    r.stops,
                rating:   r.rating
            }));

            return res.json({ success: true, route: `${from} → ${to}`, data: formatted });
        }
    }

    // Default comparison: popular Delhi → Dubai flights
    const defaultRoute = flightRoutes.filter(r => r.from === "Delhi" && r.to === "Dubai");
    defaultRoute.sort((a, b) => a.price - b.price);

    const defaultFormatted = defaultRoute.map(r => ({
        airline:  r.airline,
        price:    formatPrice(r.price),
        duration: r.duration,
        stops:    r.stops,
        rating:   r.rating
    }));

    res.json({
        success: true,
        route: "Delhi → Dubai (Default)",
        data: defaultFormatted
    });
});


// ============================================================
// ROUTE 4: GET /api/destinations
// ============================================================
router.get('/destinations', (req, res) => {
    res.json({ success: true, count: destinations.length, data: destinations });
});


// ============================================================
// ROUTE 5: GET /api/airlines
// ============================================================
router.get('/airlines', (req, res) => {
    res.json({ success: true, count: airlines.length, data: airlines });
});


// ============================================================
// ROUTE 6: POST /api/contact
// ============================================================
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.json({ success: false, message: "All fields are required." });
    }

    if (!email.includes('@')) {
        return res.json({ success: false, message: "Please enter a valid email address." });
    }

    const newMessage = {
        id:        contactMessages.length + 1,
        name:      name,
        email:     email,
        message:   message,
        createdAt: new Date().toLocaleString()
    };

    contactMessages.push(newMessage);

    console.log('\n📧 New Contact Message!');
    console.log('Name:', name, '| Email:', email);
    console.log('Message:', message);

    res.json({ success: true, message: "Message received! We'll get back to you soon." });
});


// ============================================================
// ROUTE 7: GET /api/messages
// ============================================================
router.get('/messages', (req, res) => {
    res.json({ success: true, count: contactMessages.length, data: contactMessages });
});


module.exports = router;
