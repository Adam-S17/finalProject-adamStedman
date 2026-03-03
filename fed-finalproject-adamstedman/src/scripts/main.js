/**
 * main.js
 * Entry point for the Backpackers Travel Website
 * Detects current page and initialise the relevant modules.
 * 
 * Modules:
 * - destinations.js    → Destination cards, filters and weather table
 * - map.js             → Leaflet map on destinations page
 * - tours.js           → Tours page heart buttons
 * - planner.js         → Travel Planner page
 * - tips.js            → Travel tips page + homepage tip preview
 * - search.js          → Global header search bar
 */

import { initTipsPage, initHomepageTips } from "./tips";
import { initPlannerPage } from "./planner";
import { initMap } from "./map";
import { initDestinationsPage, initTopPlacesTable } from "./destinations";
import { initToursPage } from "./tours";
import { initSearch } from "./search";

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname

    //Global search bar is present on every page
    initSearch();

    //Home page
    if (path === '/' || path === '/index') {
        initHomepageTips();
    }

    //Destinations page
    if (path.startsWith('/destinations')) {
        initDestinationsPage();
        initTopPlacesTable();
        initMap();
    }

    //Tips page
    if (path.startsWith('/tips')) {
        initTipsPage();
    }

    //Planner page
    if (path.startsWith('/planner')) {
        initPlannerPage();
    }

    //Tours page
    if (path.startsWith('/tours')) {
        initToursPage();
    }
})