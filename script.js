document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Predefined Data ---
    // Predefined routes for the flight search functionality
    const flightRoutes = [
        { from: "Delhi", to: "Dubai", price: "₹18,500", duration: "3h 45m", airline: "IndiGo", stops: "Non-stop", dep: "09:30 AM", arr: "01:15 PM" },
        { from: "Mumbai", to: "London", price: "₹55,200", duration: "9h 20m", airline: "British Airways", stops: "Non-stop", dep: "02:10 AM", arr: "07:30 AM" },
        { from: "New York", to: "Paris", price: "$450", duration: "7h 30m", airline: "Air France", stops: "Non-stop", dep: "10:00 PM", arr: "11:30 AM" },
        { from: "Singapore", to: "Tokyo", price: "$320", duration: "6h 15m", airline: "Singapore Airlines", stops: "Non-stop", dep: "08:45 AM", arr: "04:00 PM" },
        { from: "Delhi", to: "London", price: "₹62,000", duration: "9h 45m", airline: "Air India", stops: "Non-stop", dep: "01:30 PM", arr: "06:15 PM" },
        { from: "Dubai", to: "New York", price: "$850", duration: "14h 20m", airline: "Emirates", stops: "Non-stop", dep: "08:00 AM", arr: "02:20 PM" },
        { from: "Paris", to: "Tokyo", price: "€780", duration: "13h 10m", airline: "JAL", stops: "1 Stop", dep: "11:20 AM", arr: "07:30 AM" },
        { from: "Mumbai", to: "Singapore", price: "₹22,100", duration: "5h 30m", airline: "Singapore Airlines", stops: "Non-stop", dep: "11:45 PM", arr: "07:45 AM" },
        { from: "London", to: "Dubai", price: "£420", duration: "7h 05m", airline: "Emirates", stops: "Non-stop", dep: "09:10 PM", arr: "07:15 AM" },
        { from: "Tokyo", to: "New York", price: "$980", duration: "13h 00m", airline: "ANA", stops: "Non-stop", dep: "04:30 PM", arr: "04:30 PM" }
    ];

    // --- 2. Interactive Logic ---

    // Flight Search Form Submission
    const searchForm = document.getElementById('searchForm');
    const searchResult = document.getElementById('searchResult');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const from = document.getElementById('searchFrom').value;
        const to = document.getElementById('searchTo').value;

        if(from === to) {
            alert("Origin and Destination cannot be the same!");
            return;
        }

        const route = flightRoutes.find(r => r.from === from && r.to === to);
        searchResult.classList.remove('hidden');

        if(route) {
            searchResult.innerHTML = `
                <div class="flight-result-card">
                    <div class="flight-info">
                        <i class="fa-solid fa-plane-tail airline-logo"></i>
                        <div class="flight-route">
                            <h3>${route.from} <i class="fa-solid fa-arrow-right"></i> ${route.to}</h3>
                            <p>${route.airline} • ${route.stops}</p>
                        </div>
                    </div>
                    <div class="flight-details">
                        <div class="detail-item">
                            <h4>${route.dep}</h4>
                            <p>Departure</p>
                        </div>
                        <div class="detail-item">
                            <h4>${route.duration}</h4>
                            <p>Duration</p>
                        </div>
                        <div class="detail-item">
                            <h4>${route.arr}</h4>
                            <p>Arrival</p>
                        </div>
                    </div>
                    <div class="flight-price">
                        <h2>${route.price}</h2>
                        <button class="btn btn-primary">Book Now</button>
                    </div>
                </div>
            `;
        } else {
            searchResult.innerHTML = `
                <div class="flight-result-card">
                    <div class="flight-info">
                        <i class="fa-solid fa-plane-tail airline-logo"></i>
                        <div class="flight-route">
                            <h3>${from} <i class="fa-solid fa-arrow-right"></i> ${to}</h3>
                            <p>Sky Airlines • 1 Stop</p>
                        </div>
                    </div>
                    <div class="flight-price">
                        <h2>$550</h2>
                        <button class="btn btn-primary">Book Now</button>
                    </div>
                </div>
            `;
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactSuccess.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => {
            contactSuccess.classList.add('hidden');
        }, 4000);
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    backToTopBtn.style.display = 'none';

});
