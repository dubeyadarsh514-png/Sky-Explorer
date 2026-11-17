// ============================================
// data/flights.js
// Now each route has MULTIPLE airlines with DIFFERENT prices.
// Prices are stored as plain numbers (e.g., 14900) so we can
// sort, compare, and multiply them easily in code.
// ============================================


// --- Flight Routes Data ---
// Each object = one airline's flight on one route.
// Multiple airlines can fly the same route with different prices!
const flightRoutes = [

    // ====== Delhi → Dubai ======
    { from: "Delhi", to: "Dubai", airline: "SpiceJet",  price: 12800, duration: "5h 20m", stops: "1 Stop",   dep: "05:30 AM", arr: "10:50 AM", rating: 3.6 },
    { from: "Delhi", to: "Dubai", airline: "IndiGo",    price: 14900, duration: "3h 30m", stops: "Non-stop", dep: "06:00 AM", arr: "08:30 AM", rating: 4.2 },
    { from: "Delhi", to: "Dubai", airline: "Air India",  price: 18500, duration: "3h 45m", stops: "Non-stop", dep: "09:30 AM", arr: "01:15 PM", rating: 4.0 },
    { from: "Delhi", to: "Dubai", airline: "Emirates",   price: 25800, duration: "3h 55m", stops: "Non-stop", dep: "01:00 PM", arr: "04:55 PM", rating: 4.8 },

    // ====== Delhi → London ======
    { from: "Delhi", to: "London", airline: "IndiGo",          price: 42000, duration: "10h 45m", stops: "1 Stop",   dep: "04:00 AM", arr: "03:45 PM", rating: 4.1 },
    { from: "Delhi", to: "London", airline: "Air India",        price: 55200, duration: "9h 20m",  stops: "Non-stop", dep: "01:30 PM", arr: "06:15 PM", rating: 4.0 },
    { from: "Delhi", to: "London", airline: "British Airways",  price: 68000, duration: "9h 05m",  stops: "Non-stop", dep: "09:00 AM", arr: "02:05 PM", rating: 4.5 },

    // ====== Delhi → Singapore ======
    { from: "Delhi", to: "Singapore", airline: "IndiGo",            price: 18500, duration: "5h 45m", stops: "Non-stop", dep: "07:00 AM", arr: "12:45 PM", rating: 4.2 },
    { from: "Delhi", to: "Singapore", airline: "Vistara",            price: 21500, duration: "5h 50m", stops: "Non-stop", dep: "09:30 AM", arr: "03:20 PM", rating: 4.5 },
    { from: "Delhi", to: "Singapore", airline: "Singapore Airlines", price: 24800, duration: "5h 30m", stops: "Non-stop", dep: "11:00 AM", arr: "04:30 PM", rating: 4.9 },

    // ====== Delhi → Tokyo ======
    { from: "Delhi", to: "Tokyo", airline: "IndiGo",    price: 39800, duration: "10h 15m", stops: "1 Stop",   dep: "05:00 AM", arr: "03:15 PM", rating: 4.0 },
    { from: "Delhi", to: "Tokyo", airline: "Air India",  price: 48500, duration: "8h 30m",  stops: "Non-stop", dep: "11:00 AM", arr: "07:30 PM", rating: 4.1 },
    { from: "Delhi", to: "Tokyo", airline: "JAL",        price: 54200, duration: "9h 00m",  stops: "1 Stop",   dep: "07:00 AM", arr: "04:00 PM", rating: 4.7 },

    // ====== Delhi → Paris ======
    { from: "Delhi", to: "Paris", airline: "IndiGo",     price: 44500, duration: "9h 30m",  stops: "1 Stop",   dep: "08:00 AM", arr: "05:30 PM", rating: 4.0 },
    { from: "Delhi", to: "Paris", airline: "Air France",  price: 56000, duration: "8h 50m",  stops: "Non-stop", dep: "11:30 AM", arr: "08:20 PM", rating: 4.4 },
    { from: "Delhi", to: "Paris", airline: "Air India",   price: 51800, duration: "9h 10m",  stops: "Non-stop", dep: "02:00 PM", arr: "11:10 PM", rating: 4.0 },

    // ====== Mumbai → London ======
    { from: "Mumbai", to: "London", airline: "Air India",       price: 48500, duration: "9h 45m",  stops: "Non-stop", dep: "11:00 PM", arr: "07:45 AM", rating: 4.0 },
    { from: "Mumbai", to: "London", airline: "British Airways",  price: 55200, duration: "9h 20m",  stops: "Non-stop", dep: "02:10 AM", arr: "07:30 AM", rating: 4.5 },
    { from: "Mumbai", to: "London", airline: "Emirates",         price: 62000, duration: "10h 05m", stops: "1 Stop",   dep: "08:00 PM", arr: "06:05 AM", rating: 4.8 },

    // ====== Mumbai → Dubai ======
    { from: "Mumbai", to: "Dubai", airline: "SpiceJet",  price: 9800,  duration: "4h 45m", stops: "1 Stop",   dep: "05:00 AM", arr: "09:45 AM", rating: 3.5 },
    { from: "Mumbai", to: "Dubai", airline: "IndiGo",    price: 11500, duration: "3h 20m", stops: "Non-stop", dep: "07:45 AM", arr: "11:05 AM", rating: 4.2 },
    { from: "Mumbai", to: "Dubai", airline: "Air India",  price: 12800, duration: "3h 15m", stops: "Non-stop", dep: "10:00 AM", arr: "01:15 PM", rating: 4.0 },
    { from: "Mumbai", to: "Dubai", airline: "Emirates",   price: 15200, duration: "3h 05m", stops: "Non-stop", dep: "06:20 AM", arr: "08:25 AM", rating: 4.8 },

    // ====== Mumbai → Singapore ======
    { from: "Mumbai", to: "Singapore", airline: "IndiGo",            price: 17500, duration: "5h 45m", stops: "Non-stop", dep: "06:30 AM", arr: "12:15 PM", rating: 4.2 },
    { from: "Mumbai", to: "Singapore", airline: "Air India",          price: 19800, duration: "6h 00m", stops: "Non-stop", dep: "09:00 AM", arr: "03:00 PM", rating: 4.0 },
    { from: "Mumbai", to: "Singapore", airline: "Singapore Airlines", price: 22100, duration: "5h 30m", stops: "Non-stop", dep: "11:45 PM", arr: "07:45 AM", rating: 4.9 },

    // ====== Mumbai → Tokyo ======
    { from: "Mumbai", to: "Tokyo", airline: "Air India",   price: 52000, duration: "9h 45m",  stops: "Non-stop", dep: "10:00 AM", arr: "07:45 PM", rating: 4.0 },
    { from: "Mumbai", to: "Tokyo", airline: "JAL",          price: 58500, duration: "10h 10m", stops: "1 Stop",   dep: "08:00 AM", arr: "06:10 PM", rating: 4.7 },
    { from: "Mumbai", to: "Tokyo", airline: "Emirates",     price: 68000, duration: "11h 30m", stops: "1 Stop",   dep: "06:00 AM", arr: "05:30 PM", rating: 4.8 },

    // ====== New York → Paris ======
    { from: "New York", to: "Paris", airline: "United Airlines", price: 28500, duration: "8h 00m", stops: "Non-stop", dep: "08:30 PM", arr: "10:30 AM", rating: 4.0 },
    { from: "New York", to: "Paris", airline: "Delta Airlines",  price: 32800, duration: "7h 45m", stops: "Non-stop", dep: "06:00 PM", arr: "07:45 AM", rating: 4.2 },
    { from: "New York", to: "Paris", airline: "Air France",      price: 37500, duration: "7h 30m", stops: "Non-stop", dep: "10:00 PM", arr: "11:30 AM", rating: 4.4 },

    // ====== New York → London ======
    { from: "New York", to: "London", airline: "American Airlines", price: 30200, duration: "7h 20m", stops: "Non-stop", dep: "08:00 PM", arr: "08:20 AM", rating: 3.9 },
    { from: "New York", to: "London", airline: "Virgin Atlantic",   price: 35600, duration: "7h 10m", stops: "Non-stop", dep: "10:30 PM", arr: "10:40 AM", rating: 4.3 },
    { from: "New York", to: "London", airline: "British Airways",   price: 41200, duration: "7h 00m", stops: "Non-stop", dep: "09:00 PM", arr: "09:00 AM", rating: 4.5 },

    // ====== Singapore → Tokyo ======
    { from: "Singapore", to: "Tokyo", airline: "ANA",                price: 22500, duration: "6h 45m", stops: "Non-stop", dep: "08:30 AM", arr: "03:15 PM", rating: 4.6 },
    { from: "Singapore", to: "Tokyo", airline: "JAL",                price: 24800, duration: "6h 30m", stops: "Non-stop", dep: "10:00 AM", arr: "06:30 PM", rating: 4.7 },
    { from: "Singapore", to: "Tokyo", airline: "Singapore Airlines", price: 26600, duration: "6h 15m", stops: "Non-stop", dep: "08:45 AM", arr: "04:00 PM", rating: 4.9 },

    // ====== Singapore → Dubai ======
    { from: "Singapore", to: "Dubai", airline: "Singapore Airlines", price: 28500, duration: "7h 25m", stops: "Non-stop", dep: "11:30 PM", arr: "05:55 AM", rating: 4.9 },
    { from: "Singapore", to: "Dubai", airline: "Emirates",           price: 32000, duration: "7h 10m", stops: "Non-stop", dep: "01:15 AM", arr: "04:25 AM", rating: 4.8 },

    // ====== Singapore → London ======
    { from: "Singapore", to: "London", airline: "Singapore Airlines", price: 52000, duration: "13h 10m", stops: "Non-stop", dep: "11:00 PM", arr: "05:10 AM", rating: 4.9 },
    { from: "Singapore", to: "London", airline: "British Airways",    price: 46500, duration: "13h 30m", stops: "Non-stop", dep: "09:00 AM", arr: "10:30 PM", rating: 4.5 },

    // ====== Dubai → New York ======
    { from: "Dubai", to: "New York", airline: "Etihad",   price: 65000, duration: "15h 00m", stops: "1 Stop",   dep: "11:00 PM", arr: "02:00 PM", rating: 4.6 },
    { from: "Dubai", to: "New York", airline: "Emirates",  price: 70700, duration: "14h 20m", stops: "Non-stop", dep: "08:00 AM", arr: "02:20 PM", rating: 4.8 },

    // ====== Dubai → London ======
    { from: "Dubai", to: "London", airline: "Flydubai",       price: 28500, duration: "9h 10m", stops: "1 Stop",   dep: "06:00 AM", arr: "03:10 PM", rating: 3.8 },
    { from: "Dubai", to: "London", airline: "British Airways",  price: 38800, duration: "7h 25m", stops: "Non-stop", dep: "03:20 PM", arr: "11:45 PM", rating: 4.5 },
    { from: "Dubai", to: "London", airline: "Emirates",         price: 44500, duration: "7h 20m", stops: "Non-stop", dep: "03:00 AM", arr: "07:20 AM", rating: 4.8 },

    // ====== Dubai → Paris ======
    { from: "Dubai", to: "Paris", airline: "Air France",    price: 34500, duration: "7h 00m", stops: "Non-stop", dep: "10:00 AM", arr: "05:00 PM", rating: 4.4 },
    { from: "Dubai", to: "Paris", airline: "Emirates",      price: 41200, duration: "6h 55m", stops: "Non-stop", dep: "07:00 PM", arr: "01:55 AM", rating: 4.8 },
    { from: "Dubai", to: "Paris", airline: "Qatar Airways", price: 38000, duration: "6h 50m", stops: "Non-stop", dep: "08:30 PM", arr: "03:20 AM", rating: 4.8 },

    // ====== London → Dubai ======
    { from: "London", to: "Dubai", airline: "Flydubai",       price: 28500, duration: "9h 10m", stops: "1 Stop",   dep: "06:00 AM", arr: "03:10 PM", rating: 3.8 },
    { from: "London", to: "Dubai", airline: "British Airways",  price: 38800, duration: "7h 25m", stops: "Non-stop", dep: "03:20 PM", arr: "11:45 PM", rating: 4.5 },
    { from: "London", to: "Dubai", airline: "Emirates",         price: 44500, duration: "7h 05m", stops: "Non-stop", dep: "09:10 PM", arr: "07:15 AM", rating: 4.8 },

    // ====== London → Singapore ======
    { from: "London", to: "Singapore", airline: "British Airways",    price: 48800, duration: "13h 00m", stops: "Non-stop", dep: "09:00 PM", arr: "10:00 AM", rating: 4.5 },
    { from: "London", to: "Singapore", airline: "Singapore Airlines", price: 55000, duration: "12h 45m", stops: "Non-stop", dep: "10:30 AM", arr: "07:15 AM", rating: 4.9 },

    // ====== Paris → Tokyo ======
    { from: "Paris", to: "Tokyo", airline: "Air France",  price: 58500, duration: "13h 30m", stops: "Non-stop", dep: "01:45 PM", arr: "10:15 AM", rating: 4.4 },
    { from: "Paris", to: "Tokyo", airline: "JAL",          price: 64900, duration: "13h 10m", stops: "Non-stop", dep: "11:20 AM", arr: "07:30 AM", rating: 4.7 },

    // ====== Paris → Dubai ======
    { from: "Paris", to: "Dubai", airline: "Air France",    price: 34500, duration: "7h 00m", stops: "Non-stop", dep: "10:00 AM", arr: "05:00 PM", rating: 4.4 },
    { from: "Paris", to: "Dubai", airline: "Qatar Airways", price: 38000, duration: "6h 50m", stops: "Non-stop", dep: "08:30 PM", arr: "03:20 AM", rating: 4.8 },
    { from: "Paris", to: "Dubai", airline: "Emirates",      price: 41200, duration: "6h 55m", stops: "Non-stop", dep: "07:00 PM", arr: "01:55 AM", rating: 4.8 },

    // ====== Tokyo → New York ======
    { from: "Tokyo", to: "New York", airline: "United Airlines", price: 68500, duration: "14h 00m", stops: "1 Stop",   dep: "09:00 AM", arr: "10:00 AM", rating: 4.0 },
    { from: "Tokyo", to: "New York", airline: "JAL",              price: 75800, duration: "13h 20m", stops: "Non-stop", dep: "11:00 AM", arr: "10:20 AM", rating: 4.7 },
    { from: "Tokyo", to: "New York", airline: "ANA",              price: 81500, duration: "13h 00m", stops: "Non-stop", dep: "04:30 PM", arr: "04:30 PM", rating: 4.6 },

    // ====== Tokyo → Singapore ======
    { from: "Tokyo", to: "Singapore", airline: "ANA",                price: 22500, duration: "6h 45m", stops: "Non-stop", dep: "08:30 AM", arr: "03:15 PM", rating: 4.6 },
    { from: "Tokyo", to: "Singapore", airline: "Singapore Airlines", price: 24800, duration: "6h 15m", stops: "Non-stop", dep: "11:00 AM", arr: "05:15 PM", rating: 4.9 },
    { from: "Tokyo", to: "Singapore", airline: "Japan Airlines",     price: 26600, duration: "6h 30m", stops: "Non-stop", dep: "09:00 AM", arr: "03:30 PM", rating: 4.7 },

    // ====== Tokyo → London ======
    { from: "Tokyo", to: "London", airline: "JAL",             price: 72000, duration: "13h 50m", stops: "Non-stop", dep: "10:00 AM", arr: "04:50 PM", rating: 4.7 },
    { from: "Tokyo", to: "London", airline: "British Airways", price: 68000, duration: "14h 10m", stops: "1 Stop",   dep: "08:00 AM", arr: "10:10 PM", rating: 4.5 },
];


// --- Destinations Data ---
const destinations = [
    { id: 1, city: "Paris",     country: "France",    price: "₹34,500",  desc: "The city of light, love, and iconic landmarks.",        image: "paris_destination_1784049789787.png" },
    { id: 2, city: "Dubai",     country: "UAE",       price: "₹9,800",   desc: "Modern architecture and luxury shopping.",              image: "dubai_destination_1784049807707.png" },
    { id: 3, city: "London",    country: "UK",        price: "₹28,500",  desc: "Historic sites mixed with modern culture.",             image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
    { id: 4, city: "Tokyo",     country: "Japan",     price: "₹22,500",  desc: "A bustling metropolis balancing tradition and tech.",   image: "tokyo_destination_1784049831236.png" },
    { id: 5, city: "Singapore", country: "Singapore", price: "₹17,500",  desc: "A pristine island city-state of the future.",          image: "singapore_destination.png" },
    { id: 6, city: "Bali",      country: "Indonesia", price: "₹18,200",  desc: "Beautiful beaches and spiritual retreats.",            image: "bali_destination.png" },
    { id: 7, city: "New York",  country: "USA",       price: "₹28,500",  desc: "The city that never sleeps. Arts, food, and culture.", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80" },
    { id: 8, city: "Sydney",    country: "Australia", price: "₹52,000",  desc: "Stunning harbor, beaches, and vibrant lifestyle.",     image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" }
];


// --- Airlines Data ---
const airlines = [
    { id: 1, name: "Emirates",           rating: 4.8, routes: 150, priceRange: "High",   icon: "fa-solid fa-plane" },
    { id: 2, name: "Singapore Airlines", rating: 4.9, routes: 130, priceRange: "High",   icon: "fa-solid fa-plane-up" },
    { id: 3, name: "Qatar Airways",      rating: 4.8, routes: 160, priceRange: "High",   icon: "fa-solid fa-plane-circle-check" },
    { id: 4, name: "IndiGo",             rating: 4.2, routes: 100, priceRange: "Low",    icon: "fa-solid fa-plane-departure" },
    { id: 5, name: "Air India",          rating: 4.0, routes: 90,  priceRange: "Medium", icon: "fa-solid fa-plane-arrival" },
    { id: 6, name: "British Airways",    rating: 4.5, routes: 180, priceRange: "Medium", icon: "fa-solid fa-plane" }
];


// --- Contact Messages ---
const contactMessages = [];


// Export everything
module.exports = { flightRoutes, destinations, airlines, contactMessages };
