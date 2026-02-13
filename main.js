document.addEventListener('DOMContentLoaded', () => {

    // This code makes each tips card clickable. 
    // Clicking a card will automatically switch to the corresponding tab pane
    document.querySelectorAll('.tips-categories .col-md-4').forEach(card => {
        card.addEventListener('click', () => {
            const tabId = card.getAttribute('data-target');
            const tabTriggerEl = document.querySelector(`.nav-tabs button[data-bs-target="${tabId}"]`);

            if (tabTriggerEl) {
                new bootstrap.Tab(tabTriggerEl).show();

                document.querySelector('.tips-details')
                    .scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    //Default tips to appear on page - Update tips for better ones
    const defaultTips = [
        { category: 'budget', text: 'Create a daily budget and stick to it to manage your expenses effectively.' },
        { category: 'packing', text: 'Pack light and only bring essentials to make your travel easier.' },
        { category: 'health', text: 'Always carry a basic first-aid kit and stay hydrated.' },
        { category: 'transport', text: 'Use local transportation options to save money and experience the culture.' }
    ];

    //check if localStorage is empty, if so load default tips - double check this is working
    if (!localStorage.getItem('backpackerTips')) {
        localStorage.setItem('backpackerTips', JSON.stringify(defaultTips));
    }

    //Load tips from localStorage when the page loads
    const tipContainer = document.getElementById('userTips');
    const savedTips = JSON.parse(localStorage.getItem('backpackerTips')) || [];
    savedTips.forEach(tip => addTipToDOM(tip.category, tip.text));

    // Form submission event - Add tip to DOM and save to localStorage and clear form

    const tipForm = document.getElementById('tipForm');

    tipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById('tipCategory').value;
        const text = document.getElementById('tipContent').value.trim();

        if (!category || !text) return;

        addTipToDOM(category, text);

        savedTips.push({ category, text });
        localStorage.setItem('backpackerTips', JSON.stringify(savedTips));

        tipForm.reset();
    });

    //add tip to page
    function addTipToDOM(category, text) {
        const newTip = document.createElement('div');
        newTip.className = 'col-md-4';

        newTip.innerHTML = `
        <div class="card h-100 shadow-sm">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                <p class="card-text">${text}</p>
            </div>
        </div>
    `;
        tipContainer.appendChild(newTip);
    }
});

// Map functionality for the destinations page.
document.addEventListener('DOMContentLoaded', () => {
    //Open map on center of world view
    const map = L.map('map').setView([20, 0], 2);

    // Load map tiles from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', function (e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        document.getElementById('weatherDescription').textContent = 'Loading...';
        document.getElementById('weatherTemp').textContent = '';
        document.getElementById('weatherIcon').src = 'https://via.placeholder.com/50';
        document.getElementById('weatherLocation').textContent = 'Loading...';

        getWeather(lat, lon);
    });

    //async weather and destination name function
    async function getWeather(lat, lon) {
        const apiKey = "00cad81850be91cc53869e295fb55b5b"; //API key from OpenWeatherMap
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const placeUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

        try {
            const placeResponse = await fetch(placeUrl);
            const placeData = await placeResponse.json();
            const placeName = placeData.address.city || placeData.address.town || placeData.address.village || placeData.address.state || 'Unknown Location';
            document.getElementById('weatherLocation').textContent = placeName;

            const weatherResponse = await fetch(weatherUrl);
            const date = await weatherResponse.json();

            if (date.cod != 200) {
                document.getElementById('weatherDescription').textContent = 'Unable to load weather data.';
                document.getElementById('weatherTemp').textContent = '';
                document.getElementById('weatherIcon').src = 'https://via.placeholder.com/50';
                return;
            }

            const description = date.weather[0].description;
            const temp = date.main.temp;
            const icon = date.weather[0].icon;

            document.getElementById('weatherDescription').textContent = description;
            document.getElementById('weatherTemp').textContent = `${temp} °C`;
            document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${icon}.png`;
        }
        catch (error) {
            document.getElementById('weatherDescription').textContent = 'Unable to load weather data.';
            document.getElementById('weatherTemp').textContent = '';
            document.getElementById('weatherLocation').textContent = 'Unknown Location';
            document.getElementById('weatherIcon').src = 'https://via.placeholder.com/50';
            console.error('Error fetching weather or place data:', error);
        }
    }
});

// Random destination generator for the destinations page.
const destinations = [
    { region: "Asia", name: "Bangkok", lat: 15.8700, lon: 100.9925, type: "Food & Drink", image: "https://images.unsplash.com/photo-1583491470869-ca0b9fa90216?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhbmdrb2t8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Barcelona", lat: 41.3851, lon: 2.1734, type: "Cultural", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww" },
    { region: "South America", name: "Buenos Aires", lat: -34.6037, lon: -58.3816, type: "Urban", image: "https://plus.unsplash.com/premium_photo-1697729901052-fe8900e24993?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVlbm9zJTIwYWlyZXN8ZW58MHx8MHx8fDA%3D" },
    { region: "Africa", name: "Cape Town", lat: -33.9249, lon: 18.4241, type: "Adventure", image: "https://images.unsplash.com/photo-1580060860978-d479ebf95a53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcGUlMjB0b3dufGVufDB8fDB8fHww" },
    { region: "Asia", name: "Hanoi", lat: 21.0285, lon: 105.8542, type: "Cultural", image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFub2l8ZW58MHx8MHx8fDA%3D" },
    { region: "South America", name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, type: "Beach", image: "https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpbyUyMGRlJTIwamFuZWlyb3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Europe", name: "Istanbul", lat: 41.0151, lon: 28.9795, type: "Cultural", image: "https://plus.unsplash.com/premium_photo-1691338312403-e9f7f7984eeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXN0YW5idWx8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Prague", lat: 50.0755, lon: 14.4378, type: "Cultural", image: "https://plus.unsplash.com/premium_photo-1661963067279-2f7bf970c49c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJhZ3VlfGVufDB8fDB8fHww" },
    { region: "Africa", name: "Marrakech", lat: 31.6253, lon: -7.9848, type: "Adventure", image: "https://plus.unsplash.com/premium_photo-1674156433236-2338418ec4d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hcnJha2VjaHxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Oceania", name: "Sydney", lat: -33.8651, lon: 151.2099, type: "Beach", image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3lkbmV5fGVufDB8fDB8fHww" },
    { region: "Europe", name: "London", lat: 51.5074, lon: -0.1278, type: "Urban", image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9uZG9ufGVufDB8fDB8fHww" },
    { region: "North America", name: "New York City", lat: 40.7128, lon: -74.0060, type: "Urban", image: "https://images.unsplash.com/photo-1543716091-a840c05249ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Tokyo", lat: 35.6762, lon: 139.6503, type: "Urban", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8fDA%3D" },
    { region: "North America", name: "Mexico City", lat: 19.4326, lon: -99.1332, type: "Cultural", image: "https://images.unsplash.com/photo-1570663899874-a049e53007d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1leGljbyUyMGNpdHl8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Bali", lat: -8.3405, lon: 115.0920, type: "Beach", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmFsaXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Beijing", lat: 39.9042, lon: 116.4074, type: "Cultural", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVpamluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Africa", name: "Cairo", lat: 30.0444, lon: 31.2357, type: "Cultural", image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fpcm98ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Lisbon", lat: 38.7223, lon: -9.1393, type: "Food & Drink", image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlzYm9ufGVufDB8fDB8fHww" },
    { region: "Europe", name: "Athens", lat: 37.9838, lon: 23.7275, type: "Cultural", image: "https://images.unsplash.com/photo-1636589034541-c46fe8f2c3ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXRoZW5zfGVufDB8fDB8fHww" },
    { region: "Asia", name: "Seoul", lat: 37.5665, lon: 126.9780, type: "Urban", image: "https://images.unsplash.com/photo-1586274677440-231405a4c74c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VvdWx8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Manila", lat: 14.5995, lon: 120.9842, type: "Urban", image: "https://images.unsplash.com/photo-1655016268120-383558788b37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuaWxhfGVufDB8fDB8fHww" },
    { region: "South America", name: "Lima", lat: -12.0464, lon: -77.0428, type: "Food & Drink", image: "https://plus.unsplash.com/premium_photo-1733342523406-43ad5578305e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGltYXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869, type: "Urban", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3VhbGElMjBsdW1wdXJ8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Moscow", lat: 55.7558, lon: 37.6173, type: "Cultural", image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9zY293fGVufDB8fDB8fHww" },
    { region: "Europe", name: "Dublin", lat: 53.3498, lon: -6.2603, type: "Food & Drink", image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHVibGlufGVufDB8fDB8fHww" },
    { region: "Asia", name: "Dubai", lat: 25.2048, lon: 55.2708, type: "Urban", image: "https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHViYWl8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Vang Vieng", lat: 18.9189, lon: 102.4478, type: "Adventure", image: "https://images.unsplash.com/photo-1739591816074-3dfde2faf16b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmFuZyUyMHZpZW5nfGVufDB8fDB8fHww" },
];

// Function to get random destinations from the list
function getRandomDestinations(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Function to get times from destinations using API
function getTimes(getTimezoneOffset) {
    const nowUTC = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const localTime = new Date(nowUTC + (getTimezoneOffset * 1000));
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const randomDestinations = getRandomDestinations(destinations, 10);

// Function to fetch weather data for random destinations
function randomDestinationsWeather(destinations) {
    const apiKey = "00cad81850be91cc53869e295fb55b5b"; //API key from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${destinations.lat}&lon=${destinations.lon}&units=metric&appid=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {

            const localTime = getTimes(data.timezone);

            return {
                name: destinations.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                localTime: localTime
            };
        });
};

// Display random destinations and their weather in table
function displayRandomDestinations(destinations) {
    const tableBody = document.querySelector('#topPlacesTable tbody');

    const rowCount = tableBody.rows.length;
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${rowCount + 1}</td>
        <td>${destinations.name}</td>
        <td>${destinations.localTime}</td>
        <td>${destinations.temp} °C</td>
        <td>${destinations.description}</td>
        <td><img src="https://openweathermap.org/img/wn/${destinations.icon}.png" alt="${destinations.description}"></td>
    `;
    tableBody.appendChild(row);
}

document.addEventListener('DOMContentLoaded', () => {
    const randomDestinations = getRandomDestinations(destinations, 10);
    randomDestinations.forEach(destinations => {
        randomDestinationsWeather(destinations)
            .then(displayRandomDestinations);
    });
});

// Dsiplay destination cards based on user filters
function filterDestinations() {
    const selectedRegion = document.getElementById('regionFilter').value;
    const selectedType = document.getElementById('typeFilter').value;

    const filtered = displayFeaturedDestinations.filter(dest => {
        return (selectedRegion === 'All' || dest.region === selectedRegion) &&
            (selectedType === 'All' || dest.type === selectedType);
    });

    displayFeaturedDestinations(filtered);
}

// Add event listeners to filters
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedDestinations(featuredDestinations);

    document.getElementById('typeFilter').addEventListener('change', filterDestinations);
    document.getElementById('regionFilter').addEventListener('change', filterDestinations);
});

// Featured destinations cards
function displayFeaturedDestinations(destinations) {
    const container = document.getElementById('featuredDestinations');

    destinations.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.dataset.type = dest.type;
        card.dataset.region = dest.region;

        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${dest.image}" class="card-img-top" alt="${dest.name}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${dest.name}</h5>
                    <p class="card-text">${dest.country} • ${dest.type} • ${dest.description}</p>
                    <button class="btn btn-primary btn-sm mt-auto view-map">View on Map</button>
                </div>
            </div>
        `;

        cardCol.querySelector('.view-map').addEventListener('click', () => {
            if (typeof map !== 'undefined') {
                map.setView([dest.lat, dest.lon], 8);
                getWeather(dest.lat, dest.lon);
            }
        });

        container.appendChild(card);
    });
}