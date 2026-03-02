/**
 * destinations.js
 * This file handles all of the Destinations page's JavaScript functionality, including:
 * Destination dataset
 * Random destination selector for weather table
 * Weather fetching for weather table
 * Destination filtering functionality
 * Save/Unsave functionality for destination cards
 * "View on Map" button functionality for destination cards
 * Search query parameter handling on page load
 */

import { map, getWeather } from "./map.js";

//** @type {Array<Object>} Full list of available destinations with their details */
export const destinations = [
    { region: "Asia", name: "Bangkok", lat: 15.8700, lon: 100.9925, type: "Food & Drink", description: "A buzzing capital in Thailand known for rooftop bars, street food markets, and golden temples.", image: "https://images.unsplash.com/photo-1583491470869-ca0b9fa90216?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhbmdrb2t8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Barcelona", lat: 41.3851, lon: 2.1734, type: "Cultural", description: "A vibrant city in Spain known for its unique architecture, beaches, and rich cultural heritage.", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww" },
    { region: "South America", name: "Buenos Aires", lat: -34.6037, lon: -58.3816, type: "Urban", description: "A lively capital of Argentina known for tango, street art, and world-class cuisine.", image: "https://plus.unsplash.com/premium_photo-1697729901052-fe8900e24993?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVlbm9zJTIwYWlyZXN8ZW58MHx8MHx8fDA%3D" },
    { region: "Africa", name: "Cape Town", lat: -33.9249, lon: 18.4241, type: "Adventure", description: "A scenic coastal city in South Africa with stunning mountain views and a rich history.", image: "https://images.unsplash.com/photo-1580060860978-d479ebf95a53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcGUlMjB0b3dufGVufDB8fDB8fHww" },
    { region: "Asia", name: "Hanoi", lat: 21.0285, lon: 105.8542, type: "Cultural", description: "The historic capital of Vietnam, blending French colonial architecture with Vietnamese traditions.", image: "https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFub2l8ZW58MHx8MHx8fDA%3D" },
    { region: "South America", name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, type: "Beach", description: "A vibrant city in Brazil, famous for its beaches, carnival celebrations, and iconic Christ the Redeemer statue.", image: "https://images.unsplash.com/photo-1516834611397-8d633eaec5d0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpbyUyMGRlJTIwamFuZWlyb3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Europe", name: "Istanbul", lat: 41.0151, lon: 28.9795, type: "Cultural", description: "A historic city in Turkey uniquely straddling Europe and Asia with a rich blend of cultures and history.", image: "https://plus.unsplash.com/premium_photo-1691338312403-e9f7f7984eeb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXN0YW5idWx8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Prague", lat: 50.0755, lon: 14.4378, type: "Cultural", description: "The capital of Czechia, known for its medieval architecture and vibrant cultural scene.", image: "https://plus.unsplash.com/premium_photo-1661963067279-2f7bf970c49c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJhZ3VlfGVufDB8fDB8fHww" },
    { region: "Africa", name: "Marrakech", lat: 31.6253, lon: -7.9848, type: "Adventure", description: "A vibrant city in Morocco, known for its bustling souks, stunning architecture, and rich cultural heritage.", image: "https://plus.unsplash.com/premium_photo-1674156433236-2338418ec4d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hcnJha2VjaHxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Oceania", name: "Sydney", lat: -33.8651, lon: 151.2099, type: "Beach", description: "A coastal city in Australia, known for its iconic harbor, beaches, and vibrant cultural scene.", image: "https://images.unsplash.com/photo-1624138784614-87fd1b6528f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3lkbmV5fGVufDB8fDB8fHww" },
    { region: "Europe", name: "London", lat: 51.5074, lon: -0.1278, type: "Urban", description: "The capital of England, United Kingdom, known for its museums, parks, and rich heritage.", image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bG9uZG9ufGVufDB8fDB8fHww" },
    { region: "North America", name: "New York City", lat: 40.7128, lon: -74.0060, type: "Urban", description: "A bustling metropolis in America, known for its skyscrapers, cultural diversity, and iconic landmarks.", image: "https://images.unsplash.com/photo-1543716091-a840c05249ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Tokyo", lat: 35.6762, lon: 139.6503, type: "Urban", description: "The capital of Japan, blending traditional culture with cutting-edge technology.", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8fDA%3D" },
    { region: "North America", name: "Mexico City", lat: 19.4326, lon: -99.1332, type: "Cultural", description: "The capiatl of Mexico, with a rich history of indigenous cultures and colonial architecture.", image: "https://images.unsplash.com/photo-1570663899874-a049e53007d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1leGljbyUyMGNpdHl8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Bali", lat: -8.3405, lon: 115.0920, type: "Beach", description: "An island paradise in Indonesia, known for its rice terraces, temples, and tropical beaches.", image: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaSUyMGJlYWNoZXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Beijing", lat: 39.9042, lon: 116.4074, type: "Cultural", description: "The capital of China, where imperial palaces, ancient hutongs, and the Great Wall meet a fast-modernising skyline", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmVpamluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Africa", name: "Cairo", lat: 30.0444, lon: 31.2357, type: "Cultural", description: "The capital of Egypt located on the Nile, famous for the Pyramids of Giza, ancient history, and lively street markets.", image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fpcm98ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Lisbon", lat: 38.7223, lon: -9.1393, type: "Food & Drink", description: "Portugal’s coastal capital, known for colorful streets, historic trams, and vibrant food and music culture.", image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlzYm9ufGVufDB8fDB8fHww" },
    { region: "Europe", name: "Athens", lat: 37.9838, lon: 23.7275, type: "Cultural", description: "Greece’s ancient capital, home to the Acropolis, historic ruins, and a lively Mediterranean city life.", image: "https://images.unsplash.com/photo-1636589034541-c46fe8f2c3ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXRoZW5zfGVufDB8fDB8fHww" },
    { region: "Asia", name: "Seoul", lat: 37.5665, lon: 126.9780, type: "Urban", description: "South Korea’s bustling capital, where modern skyscrapers meet ancient palaces, markets, and a dynamic urban culture.", image: "https://images.unsplash.com/photo-1586274677440-231405a4c74c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2VvdWx8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Manila", lat: 14.5995, lon: 120.9842, type: "Urban", description: "Philippines’ vibrant capital, rich with Spanish heritage, bustling streets, colorful markets, and lively bayfront scenes.", image: "https://images.unsplash.com/photo-1655016268120-383558788b37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFuaWxhfGVufDB8fDB8fHww" },
    { region: "South America", name: "Lima", lat: -12.0464, lon: -77.0428, type: "Food & Drink", description: "Peru’s coastal capital, known for its culinary scene, colonial architecture, and Pacific Ocean views.", image: "https://plus.unsplash.com/premium_photo-1733342523406-43ad5578305e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGltYXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869, type: "Urban", description: "Malaysia’s vibrant capital, known for its iconic skyline, multicultural heritage, and bustling street life.", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3VhbGElMjBsdW1wdXJ8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Moscow", lat: 55.7558, lon: 37.6173, type: "Cultural", description: "Russia’s capital city, known for its grand architecture, rich history, and vibrant cultural scene.", image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9zY293fGVufDB8fDB8fHww" },
    { region: "Europe", name: "Dublin", lat: 53.3498, lon: -6.2603, type: "Food & Drink", description: "Ireland’s capital city, known for its literary heritage, green landscapes, and lively pub culture.", image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZHVibGlufGVufDB8fDB8fHww" },
    { region: "Asia", name: "Dubai", lat: 25.2048, lon: 55.2708, type: "Urban", description: "The UAE’s largest city and a global hub for business and tourism.", image: "https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHViYWl8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Vang Vieng", lat: 18.9189, lon: 102.4478, type: "Adventure", description: "A charming town in Laos known for its scenic river landscapes and outdoor adventure activities.", image: "https://images.unsplash.com/photo-1739591816074-3dfde2faf16b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmFuZyUyMHZpZluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Siem Reap", lat: 13.3671, lon: 103.8448, type: "Cultural", description: "Home to the Angkor Wat temples and vibrant Cambodian culture.", image: "https://images.unsplash.com/photo-1599283787923-51b965a58b05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2llbSUyMHJlYXB8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Budapest", lat: 47.4979, lon: 19.0402, type: "Cultural", description: "The capital of Hungary, famous for its historic thermal baths, stunning architecture, and the Danube river.", image: "https://images.unsplash.com/photo-1541343672885-9be56236302a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVkYXBlc3R8ZW58MHx8MHx8fDA%3D" },
    { region: "South America", name: "Cartagena", lat: 10.3910, lon: -75.4794, type: "Beach", description: "A colorful coastal city in Colombia with colonial architecture and Caribbean vibes.", image: "https://images.unsplash.com/photo-1534943441045-1009d7cb0bb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FydGFnZW5hfGVufDB8fDB8fHww" },
    { region: "Africa", name: "Zanzibar", lat: -6.1659, lon: 39.2026, type: "Beach", description: "An island paradise in Zanzibar with white sandy beaches, spice farms, and vibrant culture.", image: "https://images.unsplash.com/photo-1628531895969-df353541bafe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8emFuemliYXJ8ZW58MHx8MHx8fDA%3D" },
    { region: "Oceania", name: "Queenstown", lat: -45.0312, lon: 168.6626, type: "Adventure", description: "Known as the adventure capital of New Zealand, surrounded by lakes and mountains.", image: "https://images.unsplash.com/photo-1547314283-befb6cc5cf29?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cXVlZW5zdG93bnxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Kathmandu", lat: 27.7172, lon: 85.3240, type: "Cultural", description: "A historic city in Nepal with temples, bustling streets, and gateway to the Himalayas.", image: "https://images.unsplash.com/photo-1592285896110-8d88b5b3a5d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2F0aG1hbmR1fGVufDB8fDB8fHww" },
    { region: "Europe", name: "Reykjavik", lat: 64.1355, lon: -21.8954, type: "Adventure", description: "Iceland’s capital, known for hot springs, volcanic landscapes, and northern lights.", image: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJleWtqYXYlQzMlQURrfGVufDB8fDB8fHww" },
    { region: "North America", name: "Vancouver", lat: 49.2827, lon: -123.1207, type: "Urban", description: "A coastal city in Canada surrounded by mountains and water, known for its outdoor lifestyle.", image: "https://images.unsplash.com/photo-1567705781280-0e03ffb323f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZhbmNvdXZlcnxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Luang Prabang", lat: 19.8860, lon: 102.1350, type: "Cultural", description: "A serene town in Laos with temples, riverside charm, and French colonial architecture.", image: "https://images.unsplash.com/photo-1593315921963-463bb27d91b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHVhbmclMjBwcmFiYW5nfGVufDB8fDB8fHww" },
    { region: "Europe", name: "Florence", lat: 43.7696, lon: 11.2558, type: "Cultural", description: "Birthplace of the Renaissance, famous for art, architecture, and italian cuisine.", image: "https://plus.unsplash.com/premium_photo-1676288635850-cd91d5b2a3af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmxvcmVuY2V8ZW58MHx8MHx8fDA%3D" },
    { region: "South America", name: "Cusco", lat: -13.5319, lon: -71.9675, type: "Cultural", description: "Historic city in Peru and former capital of the Inca Empire, gateway to Machu Picchu.", image: "https://plus.unsplash.com/premium_photo-1733342523406-43ad5578305e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3VzY298ZW58MHx8MHx8fDA%3D" },
    { region: "Africa", name: "Mombasa", lat: -4.0435, lon: 39.6682, type: "Beach", description: "Kenya’s coastal city with beaches, historic forts, and Swahili culture.", image: "https://plus.unsplash.com/premium_photo-1697729911993-626a3e2c44eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9tYmFzYXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Hokkaido", lat: 43.2203, lon: 142.8635, type: "Adventure", description: "Japan’s northern island, known for ski resorts, volcanoes, and hot springs.", image: "https://images.unsplash.com/photo-1624112931739-4f84f574f3dd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhva2thaWRvfGVufDB8fDB8fHww" },
    { region: "Oceania", name: "Auckland", lat: -36.8485, lon: 174.7633, type: "Urban", description: "New Zealand’s largest city, blending city life with natural harbors and volcanoes.", image: "https://images.unsplash.com/photo-1595125989588-36d745a2a828?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXVja2xhbmR8ZW58MHx8MHx8fDA%3D" },
    { region: "Europe", name: "Edinburgh", lat: 55.9533, lon: -3.1883, type: "Cultural", description: "Scotland’s historic capital with a medieval castle and vibrant festivals.", image: "https://images.unsplash.com/photo-1569668444050-b7bc2bfec0c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWRpbmJ1cmdofGVufDB8fDB8fHww" },
    { region: "Asia", name: "Guilin", lat: 25.2742, lon: 110.2991, type: "Adventure", description: "Located in China its famous for its limestone karst landscapes and scenic river cruises.", image: "https://plus.unsplash.com/premium_photo-1692049122499-30cd8a2f3cc5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3VpbGlufGVufDB8fDB8fHww" },
    { region: "South America", name: "Santiago", lat: -33.4489, lon: -70.6693, type: "Urban", description: "Chile’s capital, nestled between mountains, offering culture and modern city life.", image: "https://images.unsplash.com/photo-1689850543263-01a52ccc6943?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FudGlhZ28lMjBjaGlsZXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Europe", name: "Valencia", lat: 39.4699, lon: -0.3763, type: "Beach", description: "A Spanish city known for futuristic architecture, beaches, and paella.", image: "https://plus.unsplash.com/premium_photo-1697730336238-5d1d342127e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmFsZW5jaWF8ZW58MHx8MHx8fDA%3D" },
    { region: "Africa", name: "Essaouira", lat: 31.5085, lon: -9.7679, type: "Adventure", description: "Moroccan coastal town with historic medina, windsurfing, and seafood.", image: "https://plus.unsplash.com/premium_photo-1697730007162-3acd986a87f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXNzYW91aXJhfGVufDB8fDB8fHww" },
    { region: "Asia", name: "Jaipur", lat: 26.9124, lon: 75.7873, type: "Cultural", description: "India’s Pink City, famous for palaces, forts, and vibrant markets.", image: "https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpcHVyfGVufDB8fDB8fHww" },
    { region: "Europe", name: "Stockholm", lat: 59.3293, lon: 18.0686, type: "Urban", description: "Sweden’s capital spread across islands, known for architecture, culture, and waterways.", image: "https://plus.unsplash.com/premium_photo-1697729828023-35f1eb84db3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RvY2tob2xtfGVufDB8fDB8fHww" },
    { region: "Oceania", name: "Fiji", lat: -17.7134, lon: 178.0650, type: "Beach", description: "Tropical paradise with crystal-clear waters, coral reefs, and island resorts.", image: "https://plus.unsplash.com/premium_photo-1719843013775-1a101dd75b37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZpaml8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Penang", lat: 5.4164, lon: 100.3327, type: "Food & Drink", description: "Malaysian island known for its street food, historic George Town, and culture.", image: "https://images.unsplash.com/photo-1597141439895-26b45a8cdd4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVuYW5nfGVufDB8fDB8fHww" },
    { region: "Europe", name: "Santorini", lat: 36.3932, lon: 25.4615, type: "Beach", description: "Greek island with iconic whitewashed buildings, blue domes, and sunsets.", image: "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FudG9yaW5pfGVufDB8fDB8fHww" },
    { region: "South America", name: "Medellín", lat: 6.2442, lon: -75.5812, type: "Urban", description: "Colombian city famous for transformation, modern transport, and lively culture.", image: "https://images.unsplash.com/photo-1512250431446-d0b4b57b27ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkZWxsJUMzJUFEbnxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Africa", name: "Windhoek", lat: -22.5609, lon: 17.0658, type: "Adventure", description: "Namibia’s capital, gateway to deserts, safaris, and cultural experiences.", image: "https://plus.unsplash.com/premium_photo-1697729770899-75269b3c26dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2luZGhvZWt8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Yangon", lat: 16.8409, lon: 96.1735, type: "Cultural", description: "Myanmar’s largest city, known for golden pagodas and colonial architecture.", image: "https://images.unsplash.com/photo-1528305741302-839a4d76c780?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eWFuZ29ufGVufDB8fDB8fHww" },
    { region: "Europe", name: "Krakow", lat: 50.0647, lon: 19.9450, type: "Cultural", description: "Historic Polish city with medieval squares, castles, and rich culture.", image: "https://images.unsplash.com/photo-1522689764216-4e6966e5e444?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a3Jha293fGVufDB8fDB8fHww" },
    { region: "Oceania", name: "Rotorua", lat: -38.1368, lon: 176.2497, type: "Adventure", description: "New Zealand town known for geothermal activity, Maori culture, and lakes.", image: "https://plus.unsplash.com/premium_photo-1661963749842-8c69a3f99987?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm90b3J1YXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Bukhara", lat: 39.7750, lon: 64.4150, type: "Cultural", description: "Ancient Silk Road city in Uzbekistan, full of historic architecture and mosques.", image: "https://plus.unsplash.com/premium_photo-1694475128245-999b1ae8a44e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVraGFyYXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "South America", name: "Quito", lat: -0.1807, lon: -78.4678, type: "Cultural", description: "Ecuador’s capital, set high in the Andes, with colonial buildings and culture.", image: "https://plus.unsplash.com/premium_photo-1697729921570-a7e324d7baac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cXVpdG98ZW58MHx8MHx8fDA%3D" },
    { region: "Africa", name: "Lamu", lat: -2.2710, lon: 40.9000, type: "Adventure", description: "Historic Kenyan island town with Swahili culture, beaches, and narrow streets.", image: "https://plus.unsplash.com/premium_photo-1671211752184-0171cef138cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFtdXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Pokhara", lat: 28.2096, lon: 83.9856, type: "Adventure", description: "Nepalese city by the Phewa Lake, gateway to trekking in the Himalayas.", image: "https://images.unsplash.com/photo-1540961018629-a53dfce2fb66?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9raGFyYXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Europe", name: "Porto", lat: 41.1579, lon: -8.6291, type: "Food & Drink", description: "Portuguese city famous for port wine, riverside charm, and colorful streets.", image: "https://plus.unsplash.com/premium_photo-1677344087971-91eee10dfeb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydG98ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Koh Samui", lat: 9.5120, lon: 100.0131, type: "Beach", description: "A tropical island in Thailand known for its palm-fringed beaches, luxury resorts, and vibrant nightlife.", image: "https://plus.unsplash.com/premium_photo-1661962432490-6188a6420a81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a29oJTIwc2FtdWl8ZW58MHx8MHx8fDA%3D" },
    { region: "Asia", name: "Koh Rong", lat: 10.6760, lon: 103.1667, type: "Beach", description: "A Cambodian island known for its pristine beaches, clear waters, and laid-back atmosphere.", image: "https://images.unsplash.com/photo-1651510688557-38374c863380?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a29oJTIwcm9uZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Asia", name: "Ha Giang", lat: 22.7636, lon: 104.9950, type: "Adventure", description: "A stunning mountainous region in northern Vietnam, known for winding roads, ethnic minority villages, and breathtaking landscapes.", image: "https://images.unsplash.com/photo-1536511671359-849531c0a576?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGElMjBnaWFuZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Africa", name: "Addis Ababa", lat: 8.9806, lon: 38.7578, type: "Food & Drink", description: "Ethiopia’s capital, famous for coffee culture, traditional cuisine, and lively markets.", image: "https://images.unsplash.com/photo-1626598442658-ea6a1a5943df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFkZGlzJTIwYWJhYmF8ZW58MHx8MHx8fDA%3D" },
    { region: "Africa", name: "Dakar", lat: 14.7167, lon: -17.4677, type: "Food & Drink", description: "A vibrant coastal capital in Senegal known for seafood, music, and West African culture.", image: "https://images.unsplash.com/photo-1711024109764-09668e4e0ee7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRha2hhcnxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Africa", name: "Johannesburg", lat: -26.2041, lon: 28.0473, type: "Urban", description: "South Africa’s largest city, known for modern culture, history, and vibrant nightlife.", image: "https://images.unsplash.com/photo-1583076477550-38e4019672a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpvaGFubmVzYnVyZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "Africa", name: "Nairobi", lat: -1.2921, lon: 36.8219, type: "Urban", description: "Kenya’s capital, a fast-growing city where urban life meets nearby wildlife reserves.", image: "https://images.unsplash.com/photo-1635595358293-03620e36be48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmFpcm9iaXxlbnwwfHwwfHx8MA%3D%3D" },
    { region: "North America", name: "Cancún", lat: 21.1619, lon: -86.8515, type: "Beach", description: "A popular Caribbean destination in Mexico known for white-sand beaches and turquoise waters.", image: "https://images.unsplash.com/photo-1711220465753-2450b31ea318?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FuY3VuJTIwbWV4aWNvfGVufDB8fDB8fHww" },
    { region: "North America", name: "Banff", lat: 51.1784, lon: -115.5708, type: "Adventure", description: "A Canadian mountain town surrounded by national parks, lakes, and hiking trails.", image: "https://plus.unsplash.com/premium_photo-1672116453000-c31b150f48ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFuZmZ8ZW58MHx8MHx8fDA%3D" },
    { region: "North America", name: "New Orleans", lat: 29.9511, lon: -90.0715, type: "Food & Drink", description: "A cultural hub in America for famous for Creole cuisine, jazz music, and historic streets.", image: "https://images.unsplash.com/photo-1635352934507-cd4ad73275c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIwb3JsZWFuc3xlbnwwfHwwfHx8MA%3D%3D" },
    { region: "South America", name: "La Paz", lat: -16.4897, lon: -68.1193, type: "Adventure", description: "Bolivia’s high-altitude capital, surrounded by mountains and dramatic landscapes.", image: "https://images.unsplash.com/photo-1596118769843-08e9ad381ab0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGElMjBwYXp8ZW58MHx8MHx8fDA%3D" },
    { region: "South America", name: "Bariloche", lat: -41.1335, lon: -71.3103, type: "Adventure", description: "An Argentine town known for lakes, mountains, skiing, and outdoor adventures.", image: "https://images.unsplash.com/photo-1598162461164-5cb059c382c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFyaWxvY2hlfGVufDB8fDB8fHww" },
    { region: "Oceania", name: "Hobart", lat: -42.8821, lon: 147.3272, type: "Cultural", description: "Tasmania’s historic capital, known for art, heritage buildings, and waterfront markets.", image: "https://images.unsplash.com/photo-1706065495724-60ed0d69460e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG9iYXJ0fGVufDB8fDB8fHww" },
    { region: "Oceania", name: "Apia", lat: -13.8333, lon: -171.7667, type: "Cultural", description: "The capital of Samoa, known for Polynesian culture, markets, and island traditions.", image: "https://plus.unsplash.com/premium_photo-1726612067616-e38c26812b2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBpYSUyMHNhbW9hfGVufDB8fDB8fHww" },
];

/**
 * Returns a random number of destinations from the list.
 * @param {Array} array - The array of destinations to choose from.
 * @param {number} count - The number of random destinations to return.
 * @returns {Array} An array of randomly selected destinations.
 */
export function getRandomDestinations(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};


/**
 * Converts a timezone offset in seconds to a local time string.
 * @param {number} getTimezoneOffset - The timezone offset in seconds.
 * @returns {string} The local time as a string in "HH:MM" format.
 */
export function getTimes(getTimezoneOffset) {
    const nowUTC = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
    const localTime = new Date(nowUTC + (getTimezoneOffset * 1000));
    return localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Gets the weather data for a given destination using the OpenWeatherMap API and returns an object as the result.
 * @param {Object} destinations - The destination object containing latitude and longitude.
 * @returns {Promise<Object>} An object containing the destination name, temperature, weather description, icon, and local time.
*/
async function randomDestinationsWeather(destinations) {
    const apiKey = "00cad81850be91cc53869e295fb55b5b"; //API key from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${destinations.lat}&lon=${destinations.lon}&units=metric&appid=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {

            const localTime = getTimes(data.timezone);

            return {
                name: destinations.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                localTime: localTime
            };
        });
};

/**
 * Gets weather data for randomly selected destinations and displays them in a table on the webpage.
 * Gets 10 random destionations and puts them as rows into the table
 */
const randomDestinations = getRandomDestinations(destinations, 10);
export function displayRandomDestinations(destinations) {
    const tableBody = document.querySelector('#topPlacesTable tbody');
    if (!tableBody) return;

    const rowCount = tableBody.rows.length;
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${rowCount + 1}</td>
        <td>${destinations.name}</td>
        <td>${destinations.localTime}</td>
        <td>${destinations.temp} °C</td>
        <td>${destinations.description}</td>
        <td><img src="https://openweathermap.org/img/wn/${destinations.icon}.png" alt="${destinations.description}"></td>
    `;
    tableBody.appendChild(row);
}

randomDestinations.forEach(dest => {
    const tableBody = document.querySelector('#topPlacesTable tbody');
    if (tableBody) {
        randomDestinationsWeather(dest)
            .then(displayRandomDestinations);
    }
});

/**
 * 
 */
function displaySavedDestinations() {
    const savedDestinations = JSON.parse(localStorage.getItem('savedDestinations')) || [];
    savedDestinations.forEach(destObj => {
        document.querySelectorAll('.save-destination').forEach(button => {
            const buttonData = JSON.parse(button.dataset.destination);
            if (buttonData.name === destObj.name) {
                const icon = button.querySelector('i');
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill', 'filled');
            }
        });
    });
}

/**
 * Puts destinations cards into the featured destinations container
 */
export function displayFeaturedDestinations(destinations) {
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

        //View on map and get weather for the destination when the button is clicked
        card.querySelector('.view-map').addEventListener('click', () => {
            if (map) {
                map.setView([dest.lat, dest.lon], 8);
                getWeather(dest.lat, dest.lon);
                //Scroll map into view when the button is clicked
                document.getElementById('weatherDescription').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });

        container.appendChild(card);
    });

    displaySavedDestinations();
}

/** 
 * Filters the destinations list based on region or type input from the user
 * then displays these cards that match
*/
export function filterDestinations() {
    const selectedRegion = document.getElementById('regionFilter').value;
    const selectedType = document.getElementById('typeFilter').value;

    const filtered = destinations.filter(dest => {
        return (selectedRegion === 'All' || dest.region === selectedRegion) &&
            (selectedType === 'All' || dest.type === selectedType);
    });

    displayFeaturedDestinations(filtered);
}

/**
 * Initialises destinations page:
 * - Handles search querys from URL
 * - Sets up region and type filter change handlers
 * - Shows inital random or searched destinations
 * - Keeps hearts on cards even through event changes
 */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('search');

    console.log('Search query:', query);
    console.log('Destinations:', destinations?.length);

    if (query) {
        const searchResults = destinations.filter(dest =>
            dest.name.toLowerCase().includes(query.toLowerCase()) ||
            dest.description.toLowerCase().includes(query.toLowerCase()) ||
            dest.region.toLowerCase().includes(query.toLowerCase()) ||
            dest.type.toLowerCase().includes(query.toLowerCase())
        );

        displayFeaturedDestinations(searchResults);

        setTimeout(() => {
            const destElement = document.querySelector('#featuredDestinations');
            if (destElement) {
                destElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    } else {
        displayFeaturedDestinations(getRandomDestinations(destinations, 12));
    }

    //Filter change handlers
    const typeFilter = document.getElementById('typeFilter');
    const regionFilter = document.getElementById('regionFilter');
    if (typeFilter) typeFilter.addEventListener('change', filterDestinations);
    if (regionFilter) regionFilter.addEventListener('change', filterDestinations);

    document.addEventListener('click', function (event) {
        if (event.target.closest('.save-destination')) {
            const button = event.target.closest('.save-destination');
            const icon = button.querySelector('i');
            let destData;
            try {
                destData = JSON.parse(button.dataset.destination);
            } catch (e) {
                console.error('Error parsing destination data:', e);
                return;
            }

            let savedDestinations = JSON.parse(localStorage.getItem('savedDestinations')) || [];

            if (icon.classList.contains('bi-heart-fill')) {
                icon.classList.remove('bi-heart-fill', 'filled');
                icon.classList.add('bi-heart');
                savedDestinations = savedDestinations.filter(d => d.name !== destData.name);
            } else {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill', 'filled');
                savedDestinations.push(destData);
            }
            localStorage.setItem('savedDestinations', JSON.stringify(savedDestinations));
            displaySavedDestinations();
        }
    });
});