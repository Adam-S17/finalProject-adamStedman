/**
 * planner.js
 * This page handles all of the javascript functionality for the planner page
 * -Loads and displays saved planned items from local storage
 * -Handles add plan from form submisson and saves to local storage
 * -Handles delete button for plans through an event listener
 */

// const plannerForm = document.getElementById('plannerForm');
// const plannerContainer = document.getElementById('plannerItems');
// let plannerItems = JSON.parse(localStorage.getItem('plannerItems')) || [];

/**@type {Array<Object>} */
let plannerItems = [];

/**@type {HTMLElement|null} */
let plannerContainer = null;

/**
 * Creates and appends a planner item card to the planner container
 * @param {Object} item - The planner item to be displayed
 * @param {number} item.id - Unique timestamped id
 * @param {string} item.name - Plan name
 * @param {string} item.type - Plan type eg 'Trip'
 * @param {string} item.date - Plan date string
 * @param {string} [item.notes] - Optional plan notes
 */
function renderPlannerItem(item) {

    const div = document.createElement('div');
    div.className = 'col-md-4'

    div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${item.type}</span>
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.date ? `Date: ${item.date}` : ''}</p>
                    ${item.notes ? `<p class="card-text">Notes: ${item.notes}</p>` : ''}

                    <button class="btn btn-sm btn-danger mt-2 delete-btn" data-id="${item.id}">Delete</button>
                </div>
            </div>
        `;

    plannerContainer.appendChild(div);
}

/**
 * Displays saved destinations from local storage into #savedDestinaations
 */
function displayFeaturedDestinations(destinations) {
    const container = document.getElementById('featuredDestinations');
    if (!container) return;
    container.innerHTML = '';

    destinations.forEach(dest => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.dataset.type = dest.type;
        card.dataset.region = dest.region;

        card.innerHTML = `
            <div class="card travel-card h-100 shadow-sm border-0">
                <div class="image-wrapper position-relative">
                <img src="${dest.image}" class="card-img-top" alt="${dest.name}">
                <button type="button" class="btn btn-sm save-destination" aria-label="Save Destination" data-destination='{"name": "${dest.name}", "region": "${dest.region}", "type": "${dest.type}", "description": "${dest.description}", "image": "${dest.image}"}'>
                                <i class="bi bi-heart"></i>
                    </button>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${dest.name}</h5>
                    <p class="card-text">${dest.region} • ${dest.type}</p>
                    <p class="card-description">${dest.description}</p>
                    <button class="btn btn-primary btn-sm mt-auto view-map">View on Map</button>
                </div>
            </div>
        `;
    })
}

/**
 * Displays saved tours from local storage into #savedTours
 */
function displaySavedTours() {
    const plannedTours = document.getElementById('savedTours');
    if (plannedTours) {
        savedTours.forEach(tourItem => {
            console.log(tourItem);
            const plannerTourCard =
                `<div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${tourItem.image}" class="img-fluid rounded-start" alt="${tourItem.name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${tourItem.name}</h5>
                            <p class="card-text">${tourItem.location}</p>
                            <p class="card-text"><small class="text-muted">${tourItem.description}</small></p>
                            <a href="${tourItem.url}" target="_blank" class="btn btn-sm btn-outline-primary">View Details</a>
                        </div>
                    </div>
                </div>
            </div>`;
            plannedTours.insertAdjacentHTML('beforeend', plannerTourCard);
        })
    }
}

/**
 * Initialises the planner page.
 * Called by main.js when the /planner route is detected.
 */

export function initPlannerPage () {
    const plannerForm = document.getElementById('plannerForm');
    plannerContainer = document.getElementById('plannerItems');

    if (plannerForm && plannerContainer) {

        plannerItems = JSON.parse(localStorage.getItem('plannerItems')) || [];
        plannerItems.forEach(item => renderPlannerItem(item));

        plannerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('tripName').value.trim();
            const date = document.getElementById('tripDate').value;
            const location = document.getElementById('tripLocation').value.trim();
            const notes = document.getElementById('tripNotes').value.trim();

            if (!name || !date || !location) return;

            const newItem = { id: Date.now(), name, type: 'Trip', date, location, notes };
            plannerItems.push(newItem);

            localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
            renderPlannerItem(newItem);

            plannerForm.reset();
        });
        // Delete planner item
        plannerContainer.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete-btn')) return;

            const id = Number(e.target.dataset.id);
            plannerItems = plannerItems.filter(item => item.id !== id);
            localStorage.setItem('plannerItems', JSON.stringify(plannerItems));

            e.target.closest('.col-md-4').remove();
        });
    }

    displayFeaturedDestinations();
    displaySavedTours();
}