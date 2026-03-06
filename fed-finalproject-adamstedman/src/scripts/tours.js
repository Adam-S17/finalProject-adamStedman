/**
 * tours.js
 * This file handles all the tours page Javascript functionality
 * - Save/unsave button on tour cards using localStorage
 * - Restores Save/unsave button from localStorage when page is reloaded
 */

/**
 * Initialises the Tours page
 * Syncs all tour heart buttons with the saved state in localStorage.
 * Restore saved/unsaved state.
 * Called by main.js when tours is detected
 */
export function initToursPage() {
    const saveButtons = document.querySelectorAll('.tour-card__save-btn');

    //Restore saved state - loop through saved tours and fill in the matching heart icons
    let savedTours = JSON.parse(localStorage.getItem('savedTours')) || [];
    savedTours.forEach(tourObj => {
        saveButtons.forEach(button => {
            const buttonData = JSON.parse(button.dataset.tour);
            if (buttonData.name === tourObj.name) {
                const icon = button.querySelector('i');
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill', 'filled');
            }
        });
    });

    // Attach a click handler to each heart button
    saveButtons.forEach(button => {
        button.addEventListener('click', function () {
            const icon = this.querySelector('i');
            let tourData;

            //Parse tour data from the buttons data attribute
            try {
                tourData = JSON.parse(this.dataset.tour);
            } catch (e) {
                console.error('Error parsing tour data:', e);
                return;
            }

            //Re-read from localStorage to confirm latest saved state
            let savedTours = JSON.parse(localStorage.getItem('savedTours')) || [];

            if (icon.classList.contains('bi-heart-fill')) {
                //Tour is already saved - unsave it and remove from localStorage
                icon.classList.remove('bi-heart-fill', 'filled');
                icon.classList.add('bi-heart');
                savedTours = savedTours.filter(t => t.name !== tourData.name);
            } else {
                //Tour is not saved - save it and add to localStorage
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill', 'filled');
                savedTours.push(tourData);
            }

            //Persist updated saved tours array back to localStorage
            localStorage.setItem('savedTours', JSON.stringify(savedTours));
        });
    });
}