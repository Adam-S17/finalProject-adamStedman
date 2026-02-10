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

    // get place name
    // function getPlaceName(lat, lon) {
    //     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
    //     return fetch(url)
    //         .then(response => response.json())
    //         .then(data => {
    //             return data.address.city || data.address.town || data.address.village || data.address.state || 'Unknown Location';
    //         })
    //         .catch(error => {
    //             console.error('Error fetching place name:', error);
    //             return 'Unknown Location';
    //         });
    //     }

    //get weather
    //     function getWeather(lat, lon) {
    //         const apiKey = "00cad81850be91cc53869e295fb55b5b"; //API key from OpenWeatherMap
    //         const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    //         fetch(url)
    //             .then(response => response.json())
    //             .then(data => {
    //                 if (data.cod != 200) {
    //                     document.getElementById('weatherDescription').textContent = 'Unable to load weather data.';
    //                     document.getElementById('weatherTemp').textContent = '';
    //                     document.getElementById('weatherIcon').src = 'https://via.placeholder.com/50';
    //                     return;
    //                 }
    //                 const description = data.weather[0].description;
    //                 const temp = data.main.temp;
    //                 const icon = data.weather[0].icon;

    //                 document.getElementById('weatherDescription').textContent = description;
    //                 document.getElementById('weatherTemp').textContent = `${temp} °C`;
    //                 document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${icon}.png`;
    //             })
    //             .catch(error => {
    //                 document.getElementById('weatherDescription').textContent = 'Unable to load weather data.';
    //                 document.getElementById('weatherTemp').textContent = '';
    //                 document.getElementById('weatherIcon').src = 'https://via.placeholder.com/50';
    //                 console.error('Error fetching weather data:', error);
    //             })
    //     };
    // });

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
    { "name": "Bangkok", lat: 15.8700, lon: 100.9925 },
    { "name": "Barcelona", lat: 41.3851, lon: 2.1734 },
    { "name": "Buenos Aires", lat: -34.6037, lon: -58.3816 },
    { "name": "Cape Town", lat: -33.9249, lon: 18.4241 },
    { "name": "Hanoi", lat: 21.0285, lon: 105.8542 },
    { "name": "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
    { "name": "Istanbul", lat: 41.0151, lon: 28.9795 },
    { "name": "Prague", lat: 50.0755, lon: 14.4378 },
    { "name": "Marrakech", lat: 31.6253, lon: -7.9848 },
    { "name": "Sydney", lat: -33.8651, lon: 151.2099 },
    { "name": "London", lat: 51.5074, lon: -0.1278 },
    { "name": "New York City", lat: 40.7128, lon: -74.0060 },
    { "name": "Tokyo", lat: 35.6762, lon: 139.6503 },
    { "name": "Mexico City", lat: 19.4326, lon: -99.1332 },
    { "name": "Bali", lat: -8.3405, lon: 115.0920 },
    { "name": "Beijing", lat: 39.9042, lon: 116.4074 },
    { "name": "Cairo", lat: 30.0444, lon: 31.2357 },
    { "name": "Lisbon", lat: 38.7223, lon: -9.1393 },
    { "name": "Athens", lat: 37.9838, lon: 23.7275 },
    { "name": "Seoul", lat: 37.5665, lon: 126.9780 },
    { "name": "Manila", lat: 14.5995, lon: 120.9842 },
    { "name": "Lima", lat: -12.0464, lon: -77.0428 },
    { "name": "Kuala Lumpur", lat: 3.1390, lon: 101.6869 },
    { "name": "Moscow", lat: 55.7558, lon: 37.6173 },
    { "name": "Dublin", lat: 53.3498, lon: -6.2603 },
    { "name": "Dubai", lat: 25.2048, lon: 55.2708 },
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