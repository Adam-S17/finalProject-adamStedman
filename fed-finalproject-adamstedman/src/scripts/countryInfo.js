/**
 * countryInfo.js
 * This page handles the collection of data on a selected country from the destinations array.
 */


/**
 * Gets and displays info for a given country name.
 * @param {Object} destination - The destination object containing the country to look up
 */
export async function getCountryInfo(destination) {
    const url = `https://restcountries.com/v3.1/name/${destination.country}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const c = data[0];

        return {
            name: c.name.common,
            flag: c.flags.png,
            currency: Object.values(c.currencies)[0].name,
            language: Object.values(c.languages)[0],
            capital: c.capital[0],
            timezone: c.timezones[0]
        };
    } catch (error) {
        console.error('Error fetching country info', error);
    }
}

/**
 * Displays country info in country panel
 * @param {Object} info - The country info retrieved by getCountryInfo
 */
export function displayCountryInfo(info) {
    const panel = document.getElementById('countryInfoPanel');
    if(!panel || !info) return;

    document.getElementById('countryFlag').src = info.flag;
    document.getElementById('countryFlag').alt = `${info.name} flag`;
    document.getElementById('countryName').textContent = info.name;
    document.getElementById('countryCurrency').textContent = info.currency;
    document.getElementById('countryLanguage').textContent = info.language;
    document.getElementById('countryCapital').textContent = info.capital
    document.getElementById('countryTimezone').textContent = info.timezone;

    panel.style.display = "block"

}