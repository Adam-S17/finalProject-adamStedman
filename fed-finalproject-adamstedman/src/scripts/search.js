/**
 * search.js
 * This handles the JavaScript functionality for the search button
 * - on the destinations page: filters and shows destination cards
 * - on any other page: redirects to /destinations?search=<query> to show results
 */

import { destinations, displayFeaturedDestinations } from "./destinations.js";

/**
 * Initialises global search bar funcitonality
 * Has click and keypress(enter) handlers to search the input
 * Stops early if the search elements arent found in the DOM
 */

export function initSearch() {
    const searchInput = document.getElementById('siteSearch');
    const searchButton = document.getElementById('searchButton');

    if (!searchButton || !searchInput) return //Stops if search bar isnt on the page

    /**
     * Reads the search input, filte destinations and displays results directly on destinations page or redirects from other pages 
     */
    const goToSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return; // Do nothing if the search input is empty

        if (window.location.pathname.startsWith(`/destinations`)) {

            // Filter destinations array against multiple fields for search
            const searchResults = destinations.filter(dest =>
                dest.name.toLowerCase().includes(query) ||
                dest.description.toLowerCase().includes(query) ||
                dest.region.toLowerCase().includes(query) ||
                dest.type.toLowerCase().includes(query) ||
                dest.country.toLowerCase().includes(query)
            );

            displayFeaturedDestinations(searchResults);

            //Delay to allow cards to render before scrolling into view
            setTimeout(() => {
                const destElement = document.getElementById('featuredDestinations');
                if (destElement) {
                    destElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Redirect to destinations page with search query as a URL parameter
            window.location.href = `/destinations?search=${encodeURIComponent(query)}`;
        }
    };

    //Trigger search on click event
    searchButton.addEventListener('click', goToSearch);

    //Also trigger if users presses enter in the input field
    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToSearch();
        }
    });
}