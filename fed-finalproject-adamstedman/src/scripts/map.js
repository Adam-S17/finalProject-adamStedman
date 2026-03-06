/**
 * map.js
 * Initialises leaflet map centered on world view
 * Gets weather and geocodes place name on map click
 * Updates weather infor panel with current conditions
 * Allows for getWeather() to be used by destinations cards
 */

/** @type {L.Map|null} leaflet map shared with destinations.js*/
export let map = null;

/**
 * Gets weather and geocodes place name on map click
 * Updates weather panel in the DOM with returned data
 * @param {number} lat - Latitude coordinate
 * @param {number} lon - Longitude coordinate
 */
export async function getWeather(lat, lon) {
    const apiKey = "00cad81850be91cc53869e295fb55b5b"; //API key from OpenWeatherMap
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const placeUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`; //reverse geocode URL

    const iconElement = document.getElementById('weatherIcon');
    iconElement.style.display = 'none'; //hide idcon while new data loads

    try {
        //Fetch place name first so location updates before weather arrives
        const placeResponse = await fetch(placeUrl);
        const placeData = await placeResponse.json();

        //Fall through city > town > village > state until a name is found
        const placeName = placeData.address.city || placeData.address.town || placeData.address.village || placeData.address.state || 'Unknown Location';
        document.getElementById('weatherLocation').textContent = placeName;

        const weatherResponse = await fetch(weatherUrl);
        const data = await weatherResponse.json();

        //cod 200 means a succesful response from OpenWeatherMap
        if (data.cod != 200) {
            document.getElementById('weatherDescription').textContent = 'Unable to load weather data.';
            document.getElementById('weatherTemp').textContent = '';
            document.getElementById('weatherIcon').src = 'https://via.placeholder.com/50';
            return;
        }

        const description = data.weather[0].description;
        const temp = data.main.temp;
        const icon = data.weather[0].icon;

        //Update weather panel with fetched data
        document.getElementById('weatherDescription').textContent = description;
        document.getElementById('weatherTemp').textContent = `${temp} °C`;
        iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconElement.style.display = 'inline-block';
    }
    catch (error) {
        //Fallback values
        document.getElementById('weatherDescription').textContent = 'Unable to load weather data.';
        document.getElementById('weatherTemp').textContent = '';
        document.getElementById('weatherLocation').textContent = 'Unknown Location';
        document.getElementById('weatherIcon').src = 'https://via.placeholder.com/50';
        console.error('Error fetching weather or place data:', error);
    }
};

/**
 * Initialise the leaflet map on the destinations page
 * Has a click handler which fetches weather for the click coord's
 * Only runs if the map element exists
 */
export function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    //Open map on center of world view - lat 20, lon 0, zoom level 2
    map = L.map('map').setView([20, 0], 2);

    // Load map tiles from OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    //On click - show loading state in the panel then fetch wetaher for clicked coord's
    map.on('click', function (e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        //Show loading state in the weather pnale while the data is loading
        document.getElementById('weatherDescription').textContent = 'Loading...';
        document.getElementById('weatherTemp').textContent = '';
        const iconElement = document.getElementById('weatherIcon');
        iconElement.style.display = 'none';
        document.getElementById('weatherLocation').textContent = 'Loading...';

        getWeather(lat, lon);
    });
};
