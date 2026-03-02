/**
 * tours.js
 * This file handles all tours page Javascript functionality
 * - Save/unsave button on tour cards using local storage
 * - Displaying tours in planner page using local stoage
 */

/**
 * Syncs all tour heart buttons with the saved state in localStorage.
 * Restore saved/unsaved state.
 */

// Fill heart button red and save to local storage when clicked
export function savedTourHearts () {
    const saveButtons = document.querySelectorAll('.save-tour');

    let savedTours = JSON.parse(localStorage.getItem('savedTours')) || [];
    savedTours.forEach(tourObj => {
        const button = document.querySelector(`.save-tour[data-tour="${tourObj.name}"]`);
        if (button) {
            const icon = button.querySelector('i');
            icon.classList.add('bi-heart-fill');
            icon.classList.add('filled');
        }
    });

    savedTours.forEach(tourObj => {
        saveButtons.forEach(button => {
            const buttonData = JSON.parse(button.dataset.tour);
            if (buttonData.name === tourObj.name) {
                const icon = button.querySelector('i');
                if (buttonData.name === tourObj.name) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill', 'filled');
                }
            }
        });
    });

    saveButtons.forEach(button => {
        button.addEventListener('click', function () {
            const icon = this.querySelector('i');
            let tourData;
            try {
                tourData = JSON.parse(this.dataset.tour);
            } catch (e) {
                console.error('Error parsing tour data:', e);
                return;
            }

            let savedTours = JSON.parse(localStorage.getItem('savedTours')) || [];

            if (icon.classList.contains('bi-heart-fill')) {
                icon.classList.remove('bi-heart-fill', 'filled');
                icon.classList.add('bi-heart');
                savedTours = savedTours.filter(t => t.name !== tourData.name);
            } else {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill', 'filled');
                savedTours.push(tourData);
            }
            localStorage.setItem('savedTours', JSON.stringify(savedTours));
        });
    });
}

 // Display saved tours in the planned tours section
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