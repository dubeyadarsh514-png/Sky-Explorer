# ✈️ SkyExplorer - Full-Stack Flight Price Explorer

SkyExplorer is a modern, responsive full-stack flight exploration and price comparison platform built with **Node.js**, **Express**, and vanilla **HTML5 / CSS3 / JavaScript**.

---

## 🚀 Key Features

1. **Multi-Airline Flight Search (`/api/search`)**:
   - Search across 68+ routes connecting global hubs (Delhi, Mumbai, London, Dubai, Paris, New York, Singapore, Tokyo).
   - Returns **multiple airlines** per route sorted cheapest first by default.
   - Interactive sorting options: **Cheapest First**, **Fastest**, and **Top Rated**.
   - Highlights the **Best Value** flight with a special tag.
   - Dynamic passenger multiplication: displays both per-passenger price and total fare.

2. **Interactive Flight Comparison (`/api/comparison`)**:
   - Compare airlines side-by-side with prices, flight durations, stops, and ratings.
   - Automatically synchronizes with the searched route.
   - Quick-select route pills to instantly compare popular international routes.

3. **Complete Booking Flow & E-Ticket Boarding Pass**:
   - Click "Book Now" on any flight card to open the booking modal.
   - Select cabin class (Economy, Premium Economy, Business) with real-time price updates.
   - Generates an instant e-ticket with PNR number, seat assignment, passenger name, and print/save functionality.

4. **Popular Destinations & Explore Shortcut (`/api/destinations`)**:
   - Fetches popular destinations with high-resolution imagery and starting fares.
   - Clicking "Explore" on any destination auto-fills the search form and smoothly scrolls into view.

5. **Featured Airlines (`/api/airlines`)**:
   - Dynamic ratings, star indicators, route counts, and price tiers.

6. **Contact Form & Messages API (`/api/contact`, `/api/messages`)**:
   - Validated asynchronous submission with instant feedback.

7. **Offline & Static Resilient**:
   - Fully integrated with the Express REST API, with fallback support for direct `file://` opening.

---

## 📁 Project Structure

```
SkyExplorer/
│
├── server.js               # Express application entry point
├── package.json            # Node.js dependencies & scripts
├── data/
│   └── flights.js          # Route datasets (68 routes), destinations, airlines, contacts
├── routes/
│   └── api.js              # REST API endpoints
├── public/                 # Client assets served by Express
│   ├── index.html          # Semantic HTML structure & modals
│   ├── style.css           # Glassmorphism, animations & responsive styling
│   └── script.js           # Client logic, fetch API, booking, sorting & comparison
├── index.html              # Root mirror for static deployment
├── style.css               # Root mirror
├── script.js               # Root mirror
└── Explanation.md          # Hinglish tutorial documentation
```

---

## 🛠️ API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/flights` | Retrieve all 68 flight routes |
| `GET` | `/api/search?from=X&to=Y` | Search flights between two cities, sorted cheapest first |
| `GET` | `/api/comparison?from=X&to=Y` | Side-by-side comparison for a route |
| `GET` | `/api/destinations` | List of popular tourist destinations |
| `GET` | `/api/airlines` | List of featured airlines and ratings |
| `POST`| `/api/contact` | Submit a contact form message (`name`, `email`, `message`) |
| `GET` | `/api/messages` | Retrieve submitted contact messages |

---

## 💻 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   # or
   npm start
   ```

3. **Open the browser**:
   ```
   http://localhost:3000
   ```