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

//Open map on center of world view
const map = L.map('map').setView([20, 0], 2);

// Load map tiles from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

map.on('click', function (e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    console.log(`Clicked at Latitude: ${lat}, Longitude: ${lon}`);
});

//get weather
function getWeather(lat, lon) {
    const apiKey = "00cad81850be91cc53869e295fb55b5b"; //API key from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        })
};