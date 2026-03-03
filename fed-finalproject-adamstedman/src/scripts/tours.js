/**
 * tours.js
 * This file handles all tours page Javascript functionality
 * - Save/unsave button on tour cards using local storage
 */

/**
 * Syncs all tour heart buttons with the saved state in localStorage.
 * Restore saved/unsaved state.
 * Called by main.js when tours is detected
 */
export function initToursPage() {
    const saveButtons = document.querySelectorAll('.save-tour');

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