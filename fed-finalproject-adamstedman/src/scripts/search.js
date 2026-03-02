/**
 * search.js
 * This handles the Javsrcipt functionality for the search button
 * - on the destinations page: filters and shows destination cards
 * - on any other page: redirects to /destinations?search=<query>
 */

import { destinations, displayFeaturedDestinations } from "./destinations";

/**
 * Initialises global search bar funcitonality
 * Has click and keypress(enter) handlers to search the input
 */

export function initSearch() {
    const searchInput = document.getElementById('siteSearch');
    const searchButton = document.getElementById('searchButton');

    if (searchButton) {
        const goToSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            if (window.location.pathname.startsWith(`/destinations`)) {
                const searchResults = destinations.filter(dest =>
                    dest.name.toLowerCase().includes(query) ||
                    dest.description.toLowerCase().includes(query) ||
                    dest.region.toLowerCase().includes(query) ||
                    dest.type.toLowerCase().includes(query)
                );

                displayFeaturedDestinations(searchResults);

                setTimeout(() => {
                    const destElement = document.getElementById('featuredDestinations');
                    if (destElement) {
                        destElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else {
                window.location.href = `/destinations?search=${query}`;
            }
        };

        searchButton.addEventListener('click', goToSearch);

        searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                goToSearch();
            }
        });
    }
}