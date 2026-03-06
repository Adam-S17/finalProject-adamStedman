/**
 * main.js
 * Entry point for the Backpackers Travel Website
 * waits for the DOM to load and Detects current page and initialise the relevant modules.
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
    const path = window.location.pathname //Get current page path to determine which modules to use

    //Global search bar is present on every page
    initSearch();

    //Home page - load homepage tips preview
    if (path === '/' || path === '/index') {
        initHomepageTips();
    }

    //Destinations page - load destination cards, weather table and map
    if (path.startsWith('/destinations')) {
        initDestinationsPage();
        initTopPlacesTable();
        initMap();
    }

    //Tips page - loads tips form, categories and user tips
    if (path.startsWith('/tips')) {
        initTipsPage();
    }

    //Planner page - load planner form, saved destinations and saved tours
    if (path.startsWith('/planner')) {
        initPlannerPage();
    }

    //Tours page - load heart button save/unsave functionality
    if (path.startsWith('/tours')) {
        initToursPage();
    }
})