# Backpackers Travel
Backpackers travel is a full-featured travel planning website for backpackers, its built with
**Astro**, **Bootstrap 5**, and **JavaScript**

It provides live weather data, an interactive map, multiple destinationa and tours, a personal travel planner, and a comminty tips page.

GitHub link: https://github.com/Adam-S17/finalProject-adamStedman 

## Table of Contents
- [Backpackers Travel](#backpackers-travel)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [File Structure](#file-structure)
  - [Pages](#pages)
    - [Home - '/'](#home---)
    - [Destinations - '/destinations'](#destinations---destinations)
    - [Tours - '/tours'](#tours---tours)
    - [Planner -'/planner'](#planner--planner)
    - [Travel Tips - '/tips'](#travel-tips---tips)
  - [Project Info](#project-info)
  - [Naming Convention](#naming-convention)
  - [Styling](#styling)
    - [CSS Class Naming](#css-class-naming)
    - [Responsive Breakpoints](#responsive-breakpoints)
  - [API Keys](#api-keys)
  - [Data \& Storage](#data--storage)

---
## Features
- **Interactive Leaflet map** - Click anywhere on the map to get live weather for that location
- **Live weather data** - Powered by OpenWeatherMap, shown in the map panel and the destinations table
- **Country info panel**- Displays flag, currency, language, capital and timezone when button is cliked via REST countries API
- **70+ destinations** - An array of destinations filterable by region and type
- **Save favourites** - Hearts destinations and tours to save them to the planner
- **Travel Planner** - Add travel plans with name, date, location and notes
- **Tours Page** - Recommended tours by continent linked to getyourguide
- **Travel Tips** - Community-submitted tips by category
- **Global search** - Search across the destinations page from any page through names, countrys, regions, types and descriptions 
- **Fully responsive** - Custom breakpoints for mobiles, tablets and desktops
---

## File Structure
```
fed-finalproject-adamstedman/
├──src/
│   ├── pages/
│   │   ├── index.astro           # Home page
│   │   ├── destinations.astro    # Destinations page
│   │   ├── tours.astro           # Tours page
│   │   ├── planner.astro         # Planner page
│   │   └── tips.astro            # Travel Tips page
│   ├── components/
│   │   ├── Header.astro          # Navbar with global search
│   │   ├── Footer.astro          # Footer with links and contact info
│   │   └── Carousel.astro        # Custom hero image carousel
│   ├── scripts/
│   │   ├── main.js               # Entry point — initialises page modules
│   │   ├── destinations.js       # Destination data, filtering, card rendering
│   │   ├── map.js                # Leaflet map and weather on click
│   │   ├── countryInfo.js        # REST Countries API fetch and display
│   │   ├── tours.js              # Tour heart/save button logic
│   │   ├── planner.js            # Planner form and saved items rendering
│   │   ├── tips.js               # Tips form, localStorage, homepage preview
│   │   └── search.js             # Global search logic
│   └── styles/
│       └── styles.css            # Custom styles and responsive breakpoints
```
---
## Pages

### Home - '/'
- Hero carousel with 5 destinations
- *What You Can Do* cards linking to Destinations, Tours and Planner
- Latest 3 community travel tips pulled from localStorage
- Sidebar with About Me section and travel stats

### Destinations - '/destinations'
- Leaflet world map - click to view the weather info
- Weather panel showing tempature destination name and weather icon
- Country info panel showing flag, currency, language, capital and timezone when destination card is clicked
- Top 10 destinations table refershed randomly on page load - shows local time and weather of destinations
- 12 random destination vatfs shown by default(70 cards in total)
- Filter destination cards be region and type

### Tours - '/tours'
- GetYourGuide activity widget showing live trending tours
- Tours split by continent 
  - **Asia** — 12 tours across Vietnam, Thailand, Laos, Japan, Cambodia, South Korea, China, Philippines, Indonesia, and Malaysia
  - **Europe** — 6 tours across Austria, Spain, Poland, Romania, Vatican City, and France
  - **North America** — 2 tours across Mexico and the USA
  - **Africa** — 1 tour in Morocco
- Each card links to its GetYourGuide booking page and has a heart save button

### Planner -'/planner'
- Form to add a trips with name, date, location and optional notes
- Planner cards from form submission with a delete button
- Saved destinations section dynamically populated from destinations page
- Saved tours section dynmaically populated from the tours page
- All data saved/pulled from local storage

### Travel Tips - '/tips'
- Category cards that scroll and show the matching tab when clicked
- Tabbed detail view with built-in tips per category
- From to submit a new tip - saves to localStorage and appears immediately
- Community tips section showing all user submitted tips

---
## Project Info
| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build/) |
| CSS Framework | [Bootstrap 5.3.8](https://getbootstrap.com/) |
| Icons | [Bootstrap Icons 1.11.1](https://icons.getbootstrap.com/) |
|  Map | [Leaflet.js](https://leafletjs.com/) |
| Weather | [OpenWeatherMap API](https://openweathermap.org/api) |
| Geocoding | [Nominatim (OpenStreetMap)](https://nominatim.org/) |
| Country Data | [REST Countries API](https://restcountries.com/) |
|  Tours | [GetYourGuide Widget](https://www.getyourguide.com/) |
| Storage | Browser localStorage |
| Language | HTML, CSS, JavaScript |

---
## Naming Convention
JavaScript functions and variables use **camelCase**:

```JavaScript
function initDestinationsPage() {}
let plannerItems = [];
```
CSS classes follow **BEM (Block Element Modifier)** naming:

```
.destination-card                 /* Block */
.destination-card__image-wrapper  /* Element */
.destination-card__save-btn       /* Element */
.hero-carousel__dot--active       /* Modifier */
```

File names use **kebab-case**:

```
destinations.js
countryInfo.js
styles.css
```

---
## Styling 

### CSS Class Naming
Classes follow BEM convention (see Naming Convention above). Component-specific styles are scoped within their block prefix, e.g. `.weather__panel`, `.top-places`, `.planner__card`.

### Responsive Breakpoints
Custom breakpoints are defined in `styles.css` to complement Bootstrap's grid:

| Breakpoint | Target | Notes |
|------------|--------|
| `@media (max-width: 576px)` | Mobile phones | Reduced Image heights |
| `@media (min width: 577px) and (max-width: 991px)` | Tablets/small screens | Medium sized carousel and map |
| `@media (min-width: 992px)` | Larger tablets/Laptops | Full sized elements |

---
## API Keys
This project uses the **OpenWeatherMap API** and **REST Countries API**. These key is currently hardcoded in `map.js` , `destinations.js` and countryInfo.js for development.

---
## Data & Storage
All user data is stored in the browser's **localStorage** under the following keys:

| Key | Description |
|---|---|
| `savedDestinations` | Destinations hearted by the user |
| `savedTours` | Tours hearted by the user |
| `plannerItems` | Plans added via the planner form |
| `backpackerTips` | Community tips, initialised with defaults on first visit |

---