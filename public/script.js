// ============================================================
// public/script.js - Frontend JavaScript for SkyExplorer
//
// This file runs in the BROWSER.
// Connects UI with Express API endpoints:
// - GET  /api/destinations
// - GET  /api/airlines
// - GET  /api/search?from=...&to=...
// - GET  /api/comparison?from=...&to=...
// - POST /api/contact
// Includes resilient offline/static fallback if server is unreachable!
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- State Storage ---
    let currentSearchResults = null;
    let selectedFlightForBooking = null;

    // --- Predefined Fallback Data (Ensures app works even if offline or opened as file://) ---
    const fallbackFlights = [
        // Delhi → Dubai
        { from: "Delhi", to: "Dubai", airline: "SpiceJet",  priceNum: 12800, price: "₹12,800", duration: "5h 20m", stops: "1 Stop",   dep: "05:30 AM", arr: "10:50 AM", rating: 3.6 },
        { from: "Delhi", to: "Dubai", airline: "IndiGo",    priceNum: 14900, price: "₹14,900", duration: "3h 30m", stops: "Non-stop", dep: "06:00 AM", arr: "08:30 AM", rating: 4.2 },
        { from: "Delhi", to: "Dubai", airline: "Air India",  priceNum: 18500, price: "₹18,500", duration: "3h 45m", stops: "Non-stop", dep: "09:30 AM", arr: "01:15 PM", rating: 4.0 },
        { from: "Delhi", to: "Dubai", airline: "Emirates",   priceNum: 25800, price: "₹25,800", duration: "3h 55m", stops: "Non-stop", dep: "01:00 PM", arr: "04:55 PM", rating: 4.8 },
        // Delhi → London
        { from: "Delhi", to: "London", airline: "IndiGo",          priceNum: 42000, price: "₹42,000", duration: "10h 45m", stops: "1 Stop",   dep: "04:00 AM", arr: "03:45 PM", rating: 4.1 },
        { from: "Delhi", to: "London", airline: "Air India",        priceNum: 55200, price: "₹55,200", duration: "9h 20m",  stops: "Non-stop", dep: "01:30 PM", arr: "06:15 PM", rating: 4.0 },
        { from: "Delhi", to: "London", airline: "British Airways",  priceNum: 68000, price: "₹68,000", duration: "9h 05m",  stops: "Non-stop", dep: "09:00 AM", arr: "02:05 PM", rating: 4.5 },
        // Delhi → Singapore
        { from: "Delhi", to: "Singapore", airline: "IndiGo",            priceNum: 18500, price: "₹18,500", duration: "5h 45m", stops: "Non-stop", dep: "07:00 AM", arr: "12:45 PM", rating: 4.2 },
        { from: "Delhi", to: "Singapore", airline: "Vistara",            priceNum: 21500, price: "₹21,500", duration: "5h 50m", stops: "Non-stop", dep: "09:30 AM", arr: "03:20 PM", rating: 4.5 },
        { from: "Delhi", to: "Singapore", airline: "Singapore Airlines", priceNum: 24800, price: "₹24,800", duration: "5h 30m", stops: "Non-stop", dep: "11:00 AM", arr: "04:30 PM", rating: 4.9 },
        // Mumbai → London
        { from: "Mumbai", to: "London", airline: "Air India",       priceNum: 48500, price: "₹48,500", duration: "9h 45m",  stops: "Non-stop", dep: "11:00 PM", arr: "07:45 AM", rating: 4.0 },
        { from: "Mumbai", to: "London", airline: "British Airways",  priceNum: 55200, price: "₹55,200", duration: "9h 20m",  stops: "Non-stop", dep: "02:10 AM", arr: "07:30 AM", rating: 4.5 },
        { from: "Mumbai", to: "London", airline: "Emirates",         priceNum: 62000, price: "₹62,000", duration: "10h 05m", stops: "1 Stop",   dep: "08:00 PM", arr: "06:05 AM", rating: 4.8 },
        // Mumbai → Dubai
        { from: "Mumbai", to: "Dubai", airline: "SpiceJet",  priceNum: 9800,  price: "₹9,800",  duration: "4h 45m", stops: "1 Stop",   dep: "05:00 AM", arr: "09:45 AM", rating: 3.5 },
        { from: "Mumbai", to: "Dubai", airline: "IndiGo",    priceNum: 11500, price: "₹11,500", duration: "3h 20m", stops: "Non-stop", dep: "07:45 AM", arr: "11:05 AM", rating: 4.2 },
        { from: "Mumbai", to: "Dubai", airline: "Air India",  priceNum: 12800, price: "₹12,800", duration: "3h 15m", stops: "Non-stop", dep: "10:00 AM", arr: "01:15 PM", rating: 4.0 },
        { from: "Mumbai", to: "Dubai", airline: "Emirates",   priceNum: 15200, price: "₹15,200", duration: "3h 05m", stops: "Non-stop", dep: "06:20 AM", arr: "08:25 AM", rating: 4.8 },
        // New York → Paris
        { from: "New York", to: "Paris", airline: "United Airlines", priceNum: 28500, price: "₹28,500", duration: "8h 00m", stops: "Non-stop", dep: "08:30 PM", arr: "10:30 AM", rating: 4.0 },
        { from: "New York", to: "Paris", airline: "Delta Airlines",  priceNum: 32800, price: "₹32,800", duration: "7h 45m", stops: "Non-stop", dep: "06:00 PM", arr: "07:45 AM", rating: 4.2 },
        { from: "New York", to: "Paris", airline: "Air France",      priceNum: 37500, price: "₹37,500", duration: "7h 30m", stops: "Non-stop", dep: "10:00 PM", arr: "11:30 AM", rating: 4.4 },
        // Singapore → Tokyo
        { from: "Singapore", to: "Tokyo", airline: "ANA",                priceNum: 22500, price: "₹22,500", duration: "6h 45m", stops: "Non-stop", dep: "08:30 AM", arr: "03:15 PM", rating: 4.6 },
        { from: "Singapore", to: "Tokyo", airline: "JAL",                priceNum: 24800, price: "₹24,800", duration: "6h 30m", stops: "Non-stop", dep: "10:00 AM", arr: "06:30 PM", rating: 4.7 },
        { from: "Singapore", to: "Tokyo", airline: "Singapore Airlines", priceNum: 26600, price: "₹26,600", duration: "6h 15m", stops: "Non-stop", dep: "08:45 AM", arr: "04:00 PM", rating: 4.9 }
    ];

    const fallbackDestinations = [
        { id: 1, city: "Paris",     country: "France",    price: "₹34,500", desc: "The city of light, love, and iconic landmarks.", image: "paris_destination_1784049789787.png" },
        { id: 2, city: "Dubai",     country: "UAE",       price: "₹9,800",  desc: "Modern architecture and luxury shopping.", image: "dubai_destination_1784049807707.png" },
        { id: 3, city: "London",    country: "UK",        price: "₹28,500", desc: "Historic sites mixed with modern culture.", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" },
        { id: 4, city: "Tokyo",     country: "Japan",     price: "₹22,500", desc: "A bustling metropolis balancing tradition and tech.", image: "tokyo_destination_1784049831236.png" },
        { id: 5, city: "Singapore", country: "Singapore", price: "₹17,500", desc: "A pristine island city-state of the future.", image: "singapore_destination.png" },
        { id: 6, city: "Bali",      country: "Indonesia", price: "₹18,200", desc: "Beautiful beaches and spiritual retreats.", image: "bali_destination.png" },
        { id: 7, city: "New York",  country: "USA",       price: "₹28,500", desc: "The city that never sleeps. Arts, food, and culture.", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80" },
        { id: 8, city: "Sydney",    country: "Australia", price: "₹52,000", desc: "Stunning harbor, beaches, and vibrant lifestyle.", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80" }
    ];

    const fallbackAirlines = [
        { id: 1, name: "Emirates",           rating: 4.8, routes: 150, priceRange: "High",   icon: "fa-solid fa-plane" },
        { id: 2, name: "Singapore Airlines", rating: 4.9, routes: 130, priceRange: "High",   icon: "fa-solid fa-plane-up" },
        { id: 3, name: "Qatar Airways",      rating: 4.8, routes: 160, priceRange: "High",   icon: "fa-solid fa-plane-circle-check" },
        { id: 4, name: "IndiGo",             rating: 4.2, routes: 100, priceRange: "Low",    icon: "fa-solid fa-plane-departure" },
        { id: 5, name: "Air India",          rating: 4.0, routes: 90,  priceRange: "Medium", icon: "fa-solid fa-plane-arrival" },
        { id: 6, name: "British Airways",    rating: 4.5, routes: 180, priceRange: "Medium", icon: "fa-solid fa-plane" }
    ];

    // --- Initialize Default Dates ---
    const dateInput = document.getElementById('searchDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    // ========================================================
    // INITIAL DATA LOADING
    // ========================================================
    loadDestinations();
    loadAirlines();
    loadComparisonData('Delhi', 'Dubai');
    setupComparisonRoutePills();
    setupModals();
    setupAuth();

    // ========================================================
    // SECTION 1: FLIGHT SEARCH
    // ========================================================
    const searchForm   = document.getElementById('searchForm');
    const searchResult = document.getElementById('searchResult');
    const searchBtn    = document.getElementById('searchBtn');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const from       = document.getElementById('searchFrom').value;
        const to         = document.getElementById('searchTo').value;
        const date       = document.getElementById('searchDate').value;
        const passengers = parseInt(document.getElementById('searchPassengers').value, 10) || 1;

        if (from === to) {
            searchResult.classList.remove('hidden');
            searchResult.innerHTML = `
                <div class="error-card">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <p>Origin and Destination cannot be the same city. Please select different cities.</p>
                </div>
            `;
            return;
        }

        // Show loading state
        searchResult.classList.remove('hidden');
        searchResult.innerHTML = `
            <div class="loading-state">
                <i class="fa-solid fa-plane fa-bounce"></i>
                <p>Searching best flight deals for <strong>${from} → ${to}</strong>...</p>
            </div>
        `;

        searchBtn.disabled = true;
        searchBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Searching...';

        try {
            let flights = null;
            try {
                const response = await fetch(`/api/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
                const data = await response.json();
                if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                    flights = data.data;
                }
            } catch (netErr) {
                console.warn('API search failed, falling back to local database:', netErr);
            }

            // Fallback search in local data if server was unreachable
            if (!flights) {
                flights = fallbackFlights.filter(f => f.from === from && f.to === to);
                if (flights.length === 0) {
                    flights = [{
                        from,
                        to,
                        airline: "Sky Airlines",
                        priceNum: 42000,
                        price: "₹42,000",
                        duration: "8h 00m",
                        stops: "1 Stop",
                        dep: "10:00 AM",
                        arr: "06:00 PM",
                        rating: 4.0
                    }];
                }
            }

            // Store results in state for sorting & booking
            currentSearchResults = {
                from,
                to,
                date,
                passengers,
                flights
            };

            renderSearchResults('cheapest');

            // Also sync the comparison table to this searched route!
            loadComparisonData(from, to);

        } catch (error) {
            console.error('Search Error:', error);
            searchResult.innerHTML = `
                <div class="error-card">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <p>Something went wrong searching for flights. Please try again.</p>
                </div>
            `;
        } finally {
            searchBtn.disabled = false;
            searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Search';
        }
    });

    // Helper: Map airline names to icons
    function getAirlineIcon(airline) {
        if (/emirates/i.test(airline)) return 'fa-solid fa-plane-up';
        if (/singapore/i.test(airline)) return 'fa-solid fa-plane';
        if (/indigo/i.test(airline)) return 'fa-solid fa-plane-departure';
        if (/air india/i.test(airline)) return 'fa-solid fa-plane-arrival';
        if (/british/i.test(airline)) return 'fa-solid fa-plane';
        if (/france/i.test(airline)) return 'fa-solid fa-plane-up';
        if (/jal|japan|ana/i.test(airline)) return 'fa-solid fa-plane-departure';
        return 'fa-solid fa-plane';
    }

    // Helper: Parse duration string "8h 30m" to total minutes
    function parseDuration(durationStr) {
        if (!durationStr) return 9999;
        const hMatch = durationStr.match(/(\d+)\s*h/);
        const mMatch = durationStr.match(/(\d+)\s*m/);
        const hours = hMatch ? parseInt(hMatch[1], 10) : 0;
        const mins  = mMatch ? parseInt(mMatch[1], 10) : 0;
        return (hours * 60) + mins;
    }

    // Render search results based on active sort
    function renderSearchResults(activeSort = 'cheapest') {
        if (!currentSearchResults || !currentSearchResults.flights) return;

        const { from, to, date, passengers, flights } = currentSearchResults;

        // Clone and sort array
        const sortedFlights = [...flights].sort((a, b) => {
            const pA = a.priceNum || parseInt(String(a.price).replace(/[^\d]/g, ''), 10) || 0;
            const pB = b.priceNum || parseInt(String(b.price).replace(/[^\d]/g, ''), 10) || 0;
            if (activeSort === 'cheapest') {
                return pA - pB;
            } else if (activeSort === 'fastest') {
                return parseDuration(a.duration) - parseDuration(b.duration);
            } else if (activeSort === 'rating') {
                return (b.rating || 0) - (a.rating || 0);
            }
            return 0;
        });

        // Determine min price for best deal badge
        const prices = sortedFlights.map(f => f.priceNum || parseInt(String(f.price).replace(/[^\d]/g, ''), 10) || 9999999);
        const lowestPrice = Math.min(...prices);

        // Format travel date nicely
        let formattedDate = date || 'Flexible Date';
        try {
            if (date) {
                const d = new Date(date);
                formattedDate = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            }
        } catch (_) {}

        // Build HTML
        let html = `
            <div class="results-header">
                <div class="results-header-info">
                    <h3><i class="fa-solid fa-plane-circle-check text-primary"></i> ${from} → ${to}</h3>
                    <p>${sortedFlights.length} flight option${sortedFlights.length > 1 ? 's' : ''} available &bull; ${formattedDate} &bull; ${passengers} Passenger${passengers > 1 ? 's' : ''}</p>
                </div>
                <div class="sort-pills">
                    <span class="sort-label">Sort by:</span>
                    <button class="sort-btn ${activeSort === 'cheapest' ? 'active' : ''}" data-sort="cheapest">Cheapest</button>
                    <button class="sort-btn ${activeSort === 'fastest' ? 'active' : ''}" data-sort="fastest">Fastest</button>
                    <button class="sort-btn ${activeSort === 'rating' ? 'active' : ''}" data-sort="rating">Top Rated</button>
                </div>
            </div>
            <div class="flight-cards-list" style="display: flex; flex-direction: column; gap: 15px;">
        `;

        sortedFlights.forEach((flight, idx) => {
            const singlePrice = flight.priceNum || parseInt(String(flight.price).replace(/[^\d]/g, ''), 10) || 0;
            const isBestDeal = singlePrice === lowestPrice;
            const totalPrice = (singlePrice * passengers).toLocaleString('en-IN');
            const isNonStop = /non-stop/i.test(flight.stops);
            const stopsBadgeClass = isNonStop ? 'badge-nonstop' : 'badge-stops';
            const iconClass = getAirlineIcon(flight.airline);

            html += `
                <div class="flight-result-card ${isBestDeal ? 'best-deal' : ''}">
                    ${isBestDeal ? '<span class="badge-best-deal"><i class="fa-solid fa-tag"></i> Best Value</span>' : ''}
                    <div class="flight-info">
                        <i class="${iconClass} airline-logo"></i>
                        <div class="flight-route">
                            <h3>${flight.airline} <span class="badge-rating"><i class="fa-solid fa-star"></i> ${flight.rating}</span></h3>
                            <p>${flight.from} <i class="fa-solid fa-arrow-right"></i> ${flight.to} 
                               <span class="flight-meta-badge ${stopsBadgeClass}">${flight.stops}</span>
                            </p>
                        </div>
                    </div>
                    <div class="flight-details">
                        <div class="detail-item">
                            <h4>${flight.dep}</h4>
                            <p>${flight.from}</p>
                        </div>
                        <div class="detail-item">
                            <h4>${flight.duration}</h4>
                            <p style="color: #2563eb;"><i class="fa-solid fa-plane"></i></p>
                        </div>
                        <div class="detail-item">
                            <h4>${flight.arr}</h4>
                            <p>${flight.to}</p>
                        </div>
                    </div>
                    <div class="flight-price">
                        <p class="pax-total-label">Total for ${passengers} passenger${passengers > 1 ? 's' : ''}</p>
                        <h2>₹${totalPrice}</h2>
                        <p class="per-pax-price">₹${singlePrice.toLocaleString('en-IN')} / person</p>
                        <div class="flight-action-buttons">
                            <button class="btn btn-primary btn-sm book-btn" data-flight-index="${idx}">
                                <i class="fa-solid fa-ticket"></i> Book Now
                            </button>
                            <a href="#comparison" class="btn btn-outline btn-sm compare-link-btn" data-from="${flight.from}" data-to="${flight.to}">
                                Compare Airlines
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        searchResult.innerHTML = html;

        // Attach sort buttons event listeners
        searchResult.querySelectorAll('.sort-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sortType = btn.getAttribute('data-sort');
                renderSearchResults(sortType);
            });
        });

        // Attach Book Now buttons
        searchResult.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-flight-index'), 10);
                openBookingModal(sortedFlights[index]);
            });
        });

        // Attach Compare Airlines button
        searchResult.querySelectorAll('.compare-link-btn').forEach(link => {
            link.addEventListener('click', () => {
                const fFrom = link.getAttribute('data-from');
                const fTo   = link.getAttribute('data-to');
                loadComparisonData(fFrom, fTo);
            });
        });
    }

    // ========================================================
    // SECTION 2: LOAD DESTINATIONS
    // ========================================================
    async function loadDestinations() {
        const grid = document.getElementById('destinationsGrid');
        if (!grid) return;

        let dests = null;
        try {
            const response = await fetch('/api/destinations');
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                dests = data.data;
            }
        } catch (_) {}

        if (!dests) {
            dests = fallbackDestinations;
        }

        grid.innerHTML = '';
        dests.forEach(dest => {
            const card = `
                <div class="dest-card" data-city="${dest.city}">
                    <img src="${dest.image}" alt="${dest.city}" class="dest-img" loading="lazy">
                    <div class="dest-info">
                        <span class="dest-country">${dest.country}</span>
                        <h3 class="dest-title">${dest.city}</h3>
                        <p class="dest-desc">${dest.desc}</p>
                        <div class="dest-meta">
                            <span class="dest-price">From ${dest.price}</span>
                            <button class="btn btn-primary dest-btn" data-city="${dest.city}">Explore</button>
                        </div>
                    </div>
                </div>
            `;
            grid.innerHTML += card;
        });

        // Attach Explore click handlers
        grid.querySelectorAll('.dest-btn, .dest-card').forEach(elem => {
            elem.addEventListener('click', () => {
                const targetCity = elem.getAttribute('data-city');
                if (!targetCity) return;

                const searchTo = document.getElementById('searchTo');
                if (searchTo) {
                    searchTo.value = targetCity;
                }

                const searchSection = document.getElementById('flight-search');
                if (searchSection) {
                    searchSection.scrollIntoView({ behavior: 'smooth' });
                    const formCard = document.querySelector('.search-card');
                    if (formCard) {
                        formCard.style.outline = '3px solid #2563eb';
                        setTimeout(() => { formCard.style.outline = 'none'; }, 1500);
                    }
                }
            });
        });
    }

    // ========================================================
    // SECTION 3: LOAD AIRLINES
    // ========================================================
    async function loadAirlines() {
        const grid = document.getElementById('airlinesGrid');
        if (!grid) return;

        let airList = null;
        try {
            const response = await fetch('/api/airlines');
            const data = await response.json();
            if (data.success && Array.isArray(data.data)) {
                airList = data.data;
            }
        } catch (_) {}

        if (!airList) {
            airList = fallbackAirlines;
        }

        function getStars(rating) {
            let stars = '';
            const full = Math.floor(rating);
            const half = rating % 1 >= 0.5;
            for (let i = 0; i < full; i++) {
                stars += '<i class="fa-solid fa-star"></i>';
            }
            if (half) {
                stars += '<i class="fa-solid fa-star-half-stroke"></i>';
            }
            return stars;
        }

        grid.innerHTML = '';
        airList.forEach(airline => {
            const card = `
                <div class="airline-card">
                    <i class="${airline.icon || 'fa-solid fa-plane'} airline-icon"></i>
                    <h3 class="airline-name">${airline.name}</h3>
                    <div class="airline-rating">
                        ${getStars(airline.rating)}
                        <span>${airline.rating}</span>
                    </div>
                    <div class="airline-details">
                        <p>Popular Routes: ${airline.routes}+</p>
                        <p>Avg Price: <strong>${airline.priceRange}</strong></p>
                    </div>
                </div>
            `;
            grid.innerHTML += card;
        });
    }

    // ========================================================
    // SECTION 4: FLIGHT COMPARISON TABLE
    // ========================================================
    async function loadComparisonData(from = 'Delhi', to = 'Dubai') {
        const tbody = document.getElementById('comparisonBody');
        const titleElem = document.getElementById('comparisonRouteTitle');
        if (!tbody) return;

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding: 25px; color: #6b7280;">
                    <i class="fa-solid fa-spinner fa-spin"></i> Loading comparison data for ${from} → ${to}...
                </td>
            </tr>
        `;

        let compData = null;
        let routeName = `${from} → ${to}`;

        try {
            const response = await fetch(`/api/comparison?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
            const data = await response.json();
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                compData = data.data;
                routeName = data.route || routeName;
            }
        } catch (_) {}

        // Fallback comparison data
        if (!compData) {
            const matched = fallbackFlights.filter(f => f.from === from && f.to === to);
            if (matched.length > 0) {
                matched.sort((a, b) => a.priceNum - b.priceNum);
                compData = matched.map(f => ({
                    airline: f.airline,
                    price: f.price,
                    duration: f.duration,
                    stops: f.stops,
                    rating: f.rating
                }));
            } else {
                compData = [
                    { airline: "IndiGo", price: "₹18,500", duration: "3h 45m", stops: "Non-stop", rating: 4.2 },
                    { airline: "Air India", price: "₹21,000", duration: "4h 10m", stops: "1 Stop", rating: 4.0 },
                    { airline: "Emirates", price: "₹25,800", duration: "3h 55m", stops: "Non-stop", rating: 4.8 }
                ];
            }
        }

        if (titleElem) {
            titleElem.innerHTML = `<i class="fa-solid fa-route text-primary"></i> Comparing: <strong>${routeName}</strong>`;
        }

        tbody.innerHTML = '';
        compData.forEach((flight, i) => {
            const isCheapest = i === 0;
            const row = `
                <tr>
                    <td>
                        <strong>${flight.airline}</strong>
                        ${isCheapest ? '<span class="flight-meta-badge badge-nonstop" style="margin-left: 6px;">Lowest Price</span>' : ''}
                    </td>
                    <td class="table-price">${flight.price}</td>
                    <td>${flight.duration}</td>
                    <td>${flight.stops}</td>
                    <td class="table-rating">
                        <i class="fa-solid fa-star"></i> ${flight.rating}
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

        // Update active route pill
        document.querySelectorAll('.route-pill').forEach(pill => {
            const pFrom = pill.getAttribute('data-from');
            const pTo   = pill.getAttribute('data-to');
            if (pFrom === from && pTo === to) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
        });
    }

    function setupComparisonRoutePills() {
        const pills = document.querySelectorAll('.route-pill');
        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const from = pill.getAttribute('data-from');
                const to   = pill.getAttribute('data-to');
                loadComparisonData(from, to);
            });
        });
    }

    // ========================================================
    // SECTION 5: BOOKING MODAL & TICKET ISSUANCE
    // ========================================================
    const bookingModal   = document.getElementById('bookingModal');
    const ticketModal    = document.getElementById('ticketModal');
    const bookingForm    = document.getElementById('bookingForm');
    const passengerClass = document.getElementById('passengerClass');
    const bookingTotal   = document.getElementById('bookingTotalPrice');

    function openBookingModal(flight) {
        selectedFlightForBooking = flight;
        const paxCount = currentSearchResults ? currentSearchResults.passengers : 1;
        const dateStr  = currentSearchResults ? currentSearchResults.date : 'Tomorrow';

        const summaryContainer = document.getElementById('bookingFlightSummary');
        summaryContainer.innerHTML = `
            <div class="summary-route">
                <span>${flight.from} <i class="fa-solid fa-arrow-right text-primary"></i> ${flight.to}</span>
                <span style="color: #2563eb;">${flight.airline}</span>
            </div>
            <div class="summary-meta">
                <span><i class="fa-solid fa-calendar"></i> ${dateStr}</span>
                <span><i class="fa-solid fa-clock"></i> ${flight.dep} - ${flight.arr} (${flight.duration})</span>
                <span><i class="fa-solid fa-shield-halved"></i> ${flight.stops}</span>
                <span><i class="fa-solid fa-users"></i> ${paxCount} Passenger${paxCount > 1 ? 's' : ''}</span>
            </div>
        `;

        if (passengerClass) passengerClass.value = 'Economy';
        updateBookingTotal();

        bookingModal.classList.remove('hidden');
    }

    function updateBookingTotal() {
        if (!selectedFlightForBooking) return;
        const paxCount = currentSearchResults ? currentSearchResults.passengers : 1;
        const basePrice = selectedFlightForBooking.priceNum || parseInt(String(selectedFlightForBooking.price).replace(/[^\d]/g, ''), 10) || 0;

        let extraPerPax = 0;
        const selectedClass = passengerClass ? passengerClass.value : 'Economy';
        if (selectedClass === 'Premium Economy') extraPerPax = 4500;
        if (selectedClass === 'Business') extraPerPax = 12000;

        const totalPayable = (basePrice + extraPerPax) * paxCount;
        if (bookingTotal) {
            bookingTotal.textContent = `₹${totalPayable.toLocaleString('en-IN')}`;
        }
    }

    if (passengerClass) {
        passengerClass.addEventListener('change', updateBookingTotal);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name  = document.getElementById('passengerName').value.trim();
            const email = document.getElementById('passengerEmail').value.trim();
            const cabinClass = passengerClass ? passengerClass.value : 'Economy';
            const paxCount = currentSearchResults ? currentSearchResults.passengers : 1;
            const dateStr  = currentSearchResults ? currentSearchResults.date : 'Confirmed Date';
            const flight = selectedFlightForBooking;

            // Generate Booking Ref & Seat Numbers
            const pnr = 'SKY' + Math.floor(100000 + Math.random() * 900000);
            const randomSeatRow = Math.floor(10 + Math.random() * 25);
            const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
            const randomSeatLetter = seatLetters[Math.floor(Math.random() * seatLetters.length)];
            const seatNumber = `${randomSeatRow}${randomSeatLetter}`;

            const basePrice = flight.priceNum || parseInt(String(flight.price).replace(/[^\d]/g, ''), 10) || 0;
            let extraPerPax = 0;
            if (cabinClass === 'Premium Economy') extraPerPax = 4500;
            if (cabinClass === 'Business') extraPerPax = 12000;
            const finalTotal = ((basePrice + extraPerPax) * paxCount).toLocaleString('en-IN');

            // Render Boarding Pass in ticket modal
            const ticketContent = document.getElementById('ticketContent');
            ticketContent.innerHTML = `
                <div class="ticket-card">
                    <div class="ticket-top">
                        <div class="ticket-airline-info">
                            <i class="${getAirlineIcon(flight.airline)} text-primary"></i>
                            <span>${flight.airline}</span>
                        </div>
                        <div class="ticket-ref">PNR: <strong>${pnr}</strong></div>
                        <span class="ticket-badge"><i class="fa-solid fa-check"></i> CONFIRMED</span>
                    </div>

                    <div class="ticket-route">
                        <div class="point">
                            <h3>${flight.from}</h3>
                            <p>${flight.dep}</p>
                        </div>
                        <div class="ticket-plane-icon">
                            <i class="fa-solid fa-plane-departure"></i>
                            <div style="font-size: 0.75rem; color: #94a3b8; font-weight: 500;">${flight.duration}</div>
                        </div>
                        <div class="point">
                            <h3>${flight.to}</h3>
                            <p>${flight.arr}</p>
                        </div>
                    </div>

                    <div class="ticket-grid">
                        <div class="ticket-grid-item">
                            <span>Passenger</span>
                            <strong>${name}</strong>
                        </div>
                        <div class="ticket-grid-item">
                            <span>Flight Date</span>
                            <strong>${dateStr}</strong>
                        </div>
                        <div class="ticket-grid-item">
                            <span>Seat(s)</span>
                            <strong>${seatNumber} (${paxCount} Pax)</strong>
                        </div>
                        <div class="ticket-grid-item">
                            <span>Class</span>
                            <strong>${cabinClass}</strong>
                        </div>
                        <div class="ticket-grid-item">
                            <span>Stops</span>
                            <strong>${flight.stops}</strong>
                        </div>
                        <div class="ticket-grid-item">
                            <span>Total Paid</span>
                            <strong style="color: #2563eb;">₹${finalTotal}</strong>
                        </div>
                    </div>
                </div>
                <p style="text-align: center; color: #64748b; font-size: 0.85rem; margin-top: 15px;">
                    <i class="fa-solid fa-envelope"></i> Confirmation &amp; e-ticket sent to <strong>${email}</strong>
                </p>
            `;

            // Close booking modal, open ticket modal
            bookingModal.classList.add('hidden');
            ticketModal.classList.remove('hidden');
            bookingForm.reset();
        });
    }

    // Print ticket
    const printBtn = document.getElementById('printTicketBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    const doneTicketBtn = document.getElementById('doneTicketBtn');
    if (doneTicketBtn) {
        doneTicketBtn.addEventListener('click', () => {
            ticketModal.classList.add('hidden');
        });
    }

    // Modal Close Helper
    function setupModals() {
        document.getElementById('closeBookingModal')?.addEventListener('click', () => {
            bookingModal.classList.add('hidden');
        });
        document.getElementById('closeTicketModal')?.addEventListener('click', () => {
            ticketModal.classList.add('hidden');
        });
        document.getElementById('closeAuthModal')?.addEventListener('click', () => {
            document.getElementById('authModal').classList.add('hidden');
        });

        // Close on background click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                e.target.classList.add('hidden');
            }
        });

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
            }
        });
    }

    // ========================================================
    // SECTION 6: AUTH MODAL (SIGN IN / SIGN UP)
    // ========================================================
    function setupAuth() {
        const authModal  = document.getElementById('authModal');
        const signInBtn  = document.getElementById('signInBtn');
        const signUpBtn  = document.getElementById('signUpBtn');
        const tabSignIn  = document.getElementById('tabSignIn');
        const tabSignUp  = document.getElementById('tabSignUp');
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const feedback   = document.getElementById('authFeedback');

        if (!authModal) return;

        function showAuth(mode = 'signin') {
            feedback.classList.add('hidden');
            authModal.classList.remove('hidden');
            if (mode === 'signup') {
                tabSignUp.classList.add('active');
                tabSignIn.classList.remove('active');
                signUpForm.classList.remove('hidden');
                signInForm.classList.add('hidden');
            } else {
                tabSignIn.classList.add('active');
                tabSignUp.classList.remove('active');
                signInForm.classList.remove('hidden');
                signUpForm.classList.add('hidden');
            }
        }

        signInBtn?.addEventListener('click', () => showAuth('signin'));
        signUpBtn?.addEventListener('click', () => showAuth('signup'));
        tabSignIn?.addEventListener('click', () => showAuth('signin'));
        tabSignUp?.addEventListener('click', () => showAuth('signup'));

        signInForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            feedback.textContent = 'Welcome back! You have signed in successfully.';
            feedback.classList.remove('hidden');
            setTimeout(() => {
                authModal.classList.add('hidden');
                signInBtn.textContent = 'My Account';
                signUpBtn.style.display = 'none';
            }, 1200);
        });

        signUpForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            feedback.textContent = 'Account created successfully! Welcome to SkyExplorer.';
            feedback.classList.remove('hidden');
            setTimeout(() => {
                authModal.classList.add('hidden');
                signInBtn.textContent = 'My Account';
                signUpBtn.style.display = 'none';
            }, 1200);
        });
    }

    // ========================================================
    // SECTION 7: CONTACT FORM
    // ========================================================
    const contactForm      = document.getElementById('contactForm');
    const contactSuccess   = document.getElementById('contactSuccess');
    const contactError     = document.getElementById('contactError');
    const contactSubmitBtn = document.getElementById('contactSubmitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name    = document.getElementById('contactName').value.trim();
            const email   = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            contactSubmitBtn.disabled = true;
            contactSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await response.json();

                if (data.success) {
                    contactSuccess.classList.remove('hidden');
                    contactError.classList.add('hidden');
                    contactForm.reset();

                    setTimeout(() => {
                        contactSuccess.classList.add('hidden');
                    }, 5000);
                } else {
                    contactError.textContent = data.message || 'Something went wrong.';
                    contactError.classList.remove('hidden');
                    contactSuccess.classList.add('hidden');
                }

            } catch (error) {
                // If offline, still provide friendly feedback
                contactSuccess.classList.remove('hidden');
                contactError.classList.add('hidden');
                contactForm.reset();
                setTimeout(() => {
                    contactSuccess.classList.add('hidden');
                }, 5000);
            } finally {
                contactSubmitBtn.disabled = false;
                contactSubmitBtn.innerHTML = 'Send Message';
            }
        });
    }

    // ========================================================
    // SECTION 8: BACK TO TOP BUTTON
    // ========================================================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.style.display = 'none';
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
