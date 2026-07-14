# SkyExplorer - Code Explanation in Hinglish

Yeh document SkyExplorer project ke har ek important line ka Hinglish explanation deta hai. Ab humne **Flight Comparison** section ko pure HTML me convert kar diya hai aur JavaScript se uski saari complexity hata di hai. CSS ko bhi bilkul simple rakha gaya hai jisme har line ko explain kiya gaya hai.

---

## 1. index.html (HTML Structure)
Yeh file website ka dhancha (skeleton) banati hai.

```html
<!DOCTYPE html> <!-- Yeh browser ko batata hai ki page HTML5 standard ka hai -->
<html lang="en"> <!-- HTML document shuru hota hai, language (bhasha) English set hai -->
<head> <!-- Head section me meta data aur links hote hain, jo user ko page pe directly nahi dikhte -->
    <meta charset="UTF-8"> <!-- Character encoding UTF-8, isse saare text/characters sahi se display hote hain -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Mobile devices pe website ko responsive (fit) banane ke liye hota hai -->
    <title>Flight Price Explorer</title> <!-- Browser tab ke upar jo title dikhta hai -->
    
    <!-- Fonts aur Icons -->
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"> <!-- Google Fonts se fonts ko load karne ke liye link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"> <!-- FontAwesome icons (jaise plane ya star) use karne ke liye link -->
    
    <link rel="stylesheet" href="style.css"> <!-- Hamari style.css file jisme saare design properties hain, usko html se jodne ka link -->
</head>
<body> <!-- Body tag me woh sab hota hai jo website par user ko sach me dikhta hai -->

    <!-- Navbar -->
    <nav class="navbar"> <!-- Website ke top pe aane wala Navigation Bar -->
        <div class="logo">
            <i class="fa-solid fa-plane-departure"></i> <!-- Hawa me udte hue plane ka icon -->
            <span>SkyExplorer</span>
        </div>
        <!-- ... navigation links ... -->
    </nav>

    <!-- Slide 1: Hero Section (Main Area) -->
    <section id="hero"> <!-- Jab page khulta hai toh sabse pehle yeh bada area dikhta hai -->
        <div class="hero-overlay"></div> <!-- Image ke upar dark sheesha (layer) lagane ke liye -->
        <div class="hero-content"> <!-- Asli text aur buttons ka dabba (container) -->
            <h1 class="hero-title">Find the Best Flight Deals Worldwide</h1> <!-- Badi Heading -->
            <!-- ... buttons aur links ... -->
        </div>
    </section>

    <!-- ... Flight Search aur Destinations ... -->

    <!-- Slide 5: Flight Comparison (Ab 100% HTML me hai) -->
    <section id="comparison" class="section"> <!-- Compare section ka shuruaat -->
        <div class="container"> <!-- Content ko center aur limit me rakhne ke liye -->
            <h2 class="section-title">Flight Comparison</h2>
            
            <div class="table-container glassmorphism"> <!-- Table ko glass-jaisa (transparent/blur) border aur dabba dene ke liye -->
                <table class="comparison-table"> <!-- HTML ki Table banane ke liye -->
                    <thead> <!-- Table ka sabse upar wala hissa (Headings) -->
                        <tr> <!-- Table ki ek row (line) -->
                            <th>Airline</th> <!-- Table column ki heading: 'Airline' -->
                            <th>Price</th> <!-- Heading: 'Price' -->
                            <th>Duration</th> <!-- Heading: 'Duration' -->
                            <th>Stops</th> <!-- Heading: 'Stops' -->
                            <th>Rating</th> <!-- Heading: 'Rating' -->
                        </tr>
                    </thead>
                    <tbody id="comparisonBody"> <!-- Table ki Body (jisme data hota hai) -->
                        <tr> <!-- Pehli flight ki row (IndiGo) -->
                            <td><strong>IndiGo</strong></td> <!-- td ka matlab Table Data (Cell). Strong tag ise bold karta hai. -->
                            <td class="table-price">₹18,500</td>
                            <td>3h 45m</td>
                            <td>Non-stop</td>
                            <td class="table-rating"><i class="fa-solid fa-star"></i> 4.2</td>
                        </tr>
                        <tr> <!-- Doosri flight ki row (Air India) -->
                            <td><strong>Air India</strong></td>
                            <td class="table-price">₹21,000</td>
                            <td>4h 10m</td>
                            <td>1 Stop</td>
                            <td class="table-rating"><i class="fa-solid fa-star"></i> 4.0</td>
                        </tr>
                        <!-- Isi tarah saari flights (Emirates, Vistara, SpiceJet) hardcoded hain -->
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Page ke ant mein JS file -->
    <script src="script.js"></script> <!-- script.js ko load karne ke liye -->
</body>
</html>
```

---

## 2. script.js (JavaScript Logic)
JavaScript ka code ab sirf flight search ke liye reh gaya hai aur bohot chhota ho gaya hai, kyunki comparison table ab pure HTML mein hai.

```javascript
document.addEventListener('DOMContentLoaded', () => { 
    // Iska matlab hai ki HTML puri tarah se load hone ke baad hi JS ko chalana shuru karein.

    // 1. Flight Routes Data
    // Yeh array (list) hai jisme flight search ke data hain.
    const flightRoutes = [
        { from: "Delhi", to: "Dubai", price: "₹18,500", duration: "3h 45m", airline: "IndiGo", stops: "Non-stop", dep: "09:30 AM", arr: "01:15 PM" },
        // ... (aur bhi routes) ...
    ];

    // 2. Flight Search Logic
    const searchForm = document.getElementById('searchForm'); // Search form ko ID se dhundha
    const searchResult = document.getElementById('searchResult'); // Result dikhane wale dabbe ko dhundha

    searchForm.addEventListener('submit', (e) => { // Jab user 'Search' button dabaye
        e.preventDefault(); // Page ko load/refresh hone se roko
        
        // Form se From aur To ki values nikalna
        const from = document.getElementById('searchFrom').value;
        const to = document.getElementById('searchTo').value;

        if(from === to) { // Agar dono (From aur To) same hain toh message dikhao
            alert("Origin and Destination cannot be the same!");
            return;
        }

        // List mein se us route ko dhoondna jo select kiye gaye 'from' aur 'to' se match kare
        const route = flightRoutes.find(r => r.from === from && r.to === to);
        searchResult.classList.remove('hidden'); // Result ko chhupe (hidden) huye se hata kar visible karna

        if(route) { 
            // Agar exact route mil gaya toh HTML banakar result ke dabbe mein daal do
            searchResult.innerHTML = `
                <div class="flight-result-card">
                    <!-- Yahan JavaScript variables ($route.from) ko use karke result HTML mein show kiya jata hai -->
                </div>
            `;
        } else {
            // Agar route nahi mila toh dummy data (fake data) dikha do
        }
    });

    // 3. Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop'); // Top pe jaane wala button dhundha
    window.addEventListener('scroll', () => { // Jab user page ko upar/neeche scroll kare
        if (window.scrollY > 500) { 
            backToTopBtn.style.display = 'block'; // Agar 500 pixel se zyada scroll ho gaya hai toh button dikha do
        } else {
            backToTopBtn.style.display = 'none'; // Varna chhupa (hide) do
        }
    });
    
    backToTopBtn.addEventListener('click', () => { // Jab user us button pe click kare
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Page ke ekdum top pe smoothly slide karke le jao
    });
});
```

---

## 3. style.css (CSS Properties ki Har Line ka Explanation)
Yahan har ek basic CSS property ka kaam detail mein bataya gaya hai.

```css
* { 
    /* (*) Asterisk ka matlab hai 'Select All'. Ye rule poore webpage ke har element (box, text, button) pe apply hoga. */
    margin: 0; /* Elements ke bahar ki khaali jagah (spacing) ko zero (0) kar deta hai taaki sab border se shuru ho. */
    padding: 0; /* Elements ke andar ki khaali jagah ko zero (0) kar deta hai. */
    box-sizing: border-box; /* Iska fayda ye hai ki agar kisi dabbe ko border ya padding dein, toh dabbe ka size (width/height) nahi badhega, sab uske andar hi adjust hoga. */
}

html {
    scroll-behavior: smooth; /* Jab aap menu ke kisi link pe click karte hain, toh jhatke se jaane ke bajaye page halke-halke (smoothly) neechay sarak (scroll) kar jata hai. */
}

body {
    font-family: 'Inter', sans-serif; /* Page ka har text 'Inter' font me dikhega. Agar Inter load nahi hua toh computer ka normal 'sans-serif' font use hoga. */
    color: #1F2937; /* Text ka rang dark grey/black (#1F2937 hex code) set karta hai. */
    line-height: 1.6; /* Lines ke beech mein kitna gap (spacing) hoga. (Normal size ka 1.6 times). Isse padhne me aasani hoti hai. */
    background-color: #FFFFFF; /* Page ke background ka rang bilkul safed (white) kar diya hai. */
    overflow-x: hidden; /* Page ko dayein-bayein (left-right) scroll (horizontal scroll) hone se rokta hai, taaki content mobile se baahar na nikle. */
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Outfit', sans-serif; /* Saari headings ke liye alag thoda mota aur stylish font 'Outfit' lagaya gaya hai. */
    font-weight: 700; /* Font ki motayi (thickness). 700 ka matlab hota hai 'Bold'. */
}

a {
    text-decoration: none; /* Links ke neeche jo line (underline) aati hai, usko hata deta hai. */
    color: inherit; /* Link ka apna koi naya blue color na ho, wo wahi color lega jo uske parent (dabbay) ka color hoga. */
    transition: all 0.3s ease; /* Jab mouse link pe jaaye toh koi badlav (jaise color badalna) achanak se na ho balki 0.3 seconds me smoothly ho. */
}

.container {
    width: 90%; /* Dabba poori screen ka sirf 90% hissa lega (5% left, 5% right me chhod dega). */
    max-width: 1280px; /* Lekin agar TV ya badi screen hai, toh ye dabba kabhi bhi 1280 pixels se zyada bada (faila) nahi hoga. */
    margin: 0 auto; /* Upar-neeche margin '0', aaju-baaju (left-right) margin 'auto' hai. 'Auto' use karne se dabba screen ke bilkul center (beech) mein aa jata hai. */
}

.section {
    padding: 100px 0; /* Dabbe ke andar, upar (top) aur neeche (bottom) se 100px ki jagah. Left aur right se 0 jagah. */
    min-height: 100vh; /* Dabbe ki unchayi (height) kam se kam (minimum) poori screen (100 Viewport Height) ke barabar hogi. (Screen ke brabar dikhega). */
    display: flex; /* Elements ko aasani se align karne ke liye flexbox layout engine shuru kiya gaya hai. */
    flex-direction: column; /* Items dabbe mein line-se, yaani ek ke neeche ek (up to down column) lagenge, agal-bagal nahi. */
    justify-content: center; /* Items (text/images) ko dabbe ke vertically center (upar se neeche ke beech me) rakhne ke liye. */
}

.section-title {
    text-align: center; /* Heading ka text screen ke bilkul center mein aajayega. */
    font-size: 2.5rem; /* Heading ka text ka size. (1rem mostly 16px ke brabar hota hai, toh yeh 40px hai). */
    margin-bottom: 3rem; /* Heading ke theek neeche 3rem (lagbhag 48px) ki khaali jagah chhodna taaki doosra content thoda dur ho. */
    color: #1F2937; /* Heading ka rang dark grey hoga. */
}

/* Glassmorphism (Glass Effect) */
.glassmorphism {
    background: rgba(255, 255, 255, 0.7); /* Background white color (255,255,255) hai, aur 0.7 matlab ye 70% thos hai, 30% transparent (paar-darshi) hai. */
    backdrop-filter: blur(12px); /* Jo background is dabbe ke peeche hai, usay 12 pixels tak dhundhla (blur) kar deta hai, bilkul fogged glass ki tarah. */
    border: 1px solid rgba(255, 255, 255, 0.5); /* 1 pixel moti halki transparent safed border banata hai. */
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); /* Dabbe ke neeche ek halki si parchai (shadow) dalta hai taaki wo hawa mein utha hua lage. */
    border-radius: 20px; /* Dabbe ke chaaro kone (corners) 20 pixels tak gol (rounded) kar deta hai. */
}

/* Button Styling */
.btn {
    display: inline-block; /* Button apna jitna size banata hai wahi lega, puri line block nahi karega, par margins aur padding lene dega. */
    padding: 12px 24px; /* Text se upar/neeche 12px aur left/right 24px ki khaali jagah (taaki button bada lage). */
    border-radius: 50px; /* Button ke kone poore gol (pill shape) banenge. */
    font-weight: 600; /* Button ka text semi-bold (halka mota) hoga. */
    cursor: pointer; /* Jab mouse iske upar jayega, toh teer (arrow) ki jagah haath ka nishaan (pointing hand) ban jayega. */
    border: none; /* Button ke kinaare (border) jo by default hote hain, unhe hata dega. */
    transition: all 0.3s ease; /* Hover karne par jo bhi changes honge (jaise color ya size badalna), wo 0.3s mein dheere se honge. */
    text-align: center; /* Button ke andar ka text center me dikhega. */
    font-family: 'Inter', sans-serif; /* Font wahi Inter hoga. */
}

.btn-primary {
    background: linear-gradient(135deg, #2563EB, #0EA5E9); /* Do rangon (Dark Blue se Light Blue) ko 135 degree angle par mix (gradient) karta hai, isse premium look aata hai. */
    color: white; /* Button ke text ka rang safed. */
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3); /* Neele rang ki ek sundar aur chamakti (glowing) shadow banata hai button ke neeche. */
}

.btn-primary:hover {
    transform: translateY(-2px); /* Jab mouse upar aaye (hover ho), toh button 'Y' axis (upar/neeche axis) pe -2px move ho (yaani 2px upar uth jaye). */
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5); /* Mouse aane par shadow aur zyada badi (spread) aur dark ho jayegi, jaise button dabaane (press) ka ehsaas ho. */
}

/* Destinations aur Airlines Grid (Boxes) */
.destinations-grid {
    display: grid; /* Grid system on karta hai. Isme column aur rows banana asaan hai. */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    /* YEH BOHOT IMPORTANT HAI:
       auto-fit: Jitne box fit hosakte hain utne box fit karega.
       minmax(280px, 1fr): Ek box ki width kam se kam 280px hogi. 
       Agar jagah bachti hai toh wo 1fr (1 fraction/bachti jagah) le lega aur bada ho jayega. (Yeh automatically mobile responsive banata hai).
    */
    gap: 30px; /* Har dabbe (card) ke beech mein upar-neeche aur daaye-baye 30 pixels ka gap hoga. */
}

.dest-card {
    background: white; /* Har ek destination dabbe ka safed rang. */
    border-radius: 20px; /* Dabba gol (rounded). */
    overflow: hidden; /* Dabbe ke andar wali image agar corner se baahar nikle, toh usay kaat do (hide kardo) taaki gol corners dikhe. */
    box-shadow: 0 1px 3px rgba(0,0,0,0.1); /* Halki si shadow. */
    transition: all 0.3s ease; /* Hover effects smoothly chalenge. */
    position: relative; /* Agar koi cheez dabbe ke andar freely absolute place karni ho, toh wo position iske hisaab se lega. */
    cursor: pointer; /* Hover karne pe hath ka nishaan banega. */
}

.dest-card:hover {
    transform: translateY(-10px); /* Mouse laane pe poora card 10px hawa mein upar uthega (3D effect). */
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); /* Hawa mein aane ki wajah se shadow badi aur faili hui ho jayegi. */
}

.dest-img {
    width: 100%; /* Image poore dabbe ki width ko fill (bhar) karegi. */
    height: 200px; /* Image ki unchai hamesha exactly 200px (fix) rahegi. */
    object-fit: cover; /* Agar image lambi ya chaudi hai toh wo bigregi (stretch/squish) nahi, balki center se zoom (crop) hoke perfect box me fit hogi. */
    transition: transform 0.5s; /* Image par animation (zoom/transform) hone me aadha second (0.5s) lagega. */
}

.dest-card:hover .dest-img {
    transform: scale(1.05); /* Jab user dabbe ke upar mouse laye, tab dabbe ke andar ki image dhire-dhire 5% (1.05 times) badi (zoom in) ho jayegi. */
}
```

Upar di gayi explanation aapke code mein jo CSS properties use hui hain, unhe samajhne me bilkul asaan banati hai. Isme aap har property aur function ka kaam step-by-step hindi me samajh sakte hain.
