/**
 * tips.js
 * This handles all of the Javascript on the tips page
 * - Gets default and saved tips from local storage
 * - Submits new tips from the tip form
 * - Displays the latest 3 tips on the index page
 */

/** Default tips loaded on the first visit if local storage is empty 
 * Makes sure tips page is never empty for the user
*/
const defaultTips = [
    { category: 'budget', text: 'Create a daily budget and stick to it to manage your expenses effectively.' },
    { category: 'packing', text: 'Pack light and only bring essentials to make your travel easier.' },
    { category: 'health', text: 'Always carry a basic first-aid kit and stay hydrated.' },
    { category: 'transport', text: 'Use local transportation options to save money and experience the culture.' }
];

/**
 * Creates a tips card and appends it to the container
 * Capitalises the first letter of the category for the display
 * @param {HTMLElement} container - The container element to append the tip to
 * @param {string} category - The tip category eg packing
 * @param {string} text - the tip text content
 */
function addTipToDOM(container, category, text) {
    const newTip = document.createElement('div');
    newTip.className = 'col-md-4';

    newTip.innerHTML = `
        <div class="card h-100 shadow-sm">
            <div class="card-body">
                <h5 class="card-title text-capitalize">${category.charAt(0).toUpperCase() + category.slice(1)}</h5>
                <p class="card-text">${text}</p>
            </div>
        </div>
    `;
    container.appendChild(newTip);
}

/**
 * Initialises the Travel Tips page.
 * Attaches click handles to category cards to show the corresponding tab and scroll to view
 * Puts default tips into local storage if none are in it
 * Displays all saved tips from local storage
 * Handles tip form submission
 * Called by main.js when tips route is detecetd 
 */
export function initTipsPage() {
    document.querySelectorAll('.tips__categories .col-md-4').forEach(card => {
        card.addEventListener('click', () => {
            const tabId = card.getAttribute('data-target');
            const tabTriggerEl = document.querySelector(`.nav-tabs button[data-bs-target="${tabId}"]`);

            if (tabTriggerEl) {
                new bootstrap.Tab(tabTriggerEl).show();

                document.querySelector('.tips-details')
                    .scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const tipContainer = document.getElementById('userTips');
    const tipForm = document.getElementById('tipForm');

    if (!tipContainer || !tipForm) return;

    //check if localStorage is empty, if so load default tips
    if (!localStorage.getItem('backpackerTips')) {
        localStorage.setItem('backpackerTips', JSON.stringify(defaultTips));
    }

    //Load and display all saved tips from local storage
    const savedTips = JSON.parse(localStorage.getItem('backpackerTips')) || [];
    savedTips.forEach(tip => addTipToDOM(tipContainer, tip.category, tip.text));

    // Form submission event - Add tip to DOM and save to localStorage and clear form
    tipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById('tipCategory').value;
        const text = document.getElementById('tipContent').value.trim();

        if (!category || !text) return; //Requires both category and text before submission

        addTipToDOM(tipContainer, category, text);//Displays new tips when page loads

        //Puts new tip into local storage
        savedTips.push({ category, text });
        localStorage.setItem('backpackerTips', JSON.stringify(savedTips));

        tipForm.reset(); //Clears form fields after succesful submission
    });
}

/**
 * Puts the 3 most recent tips on the home page
 * Shows a prompt to submit a tip is localStorage is empty
 * Called by main.js on the home page route
 */
export function initHomepageTips() {
    const indexTipContainer = document.getElementById('latestTips');
    if (indexTipContainer) return; //Stops if tips container is not available on the homepage

    const tips = JSON.parse(localStorage.getItem('backpackerTips')) || [];
    const recentTips = tips.slice(-3).reverse(); //Takes the last 3 tops and reverses to show the newest first

    if (recentTips.length === 0) {
        //User prompt to submit tips
        indexTipContainer.innerHTML = `<p>No tips yet, be the first to <a href="/tips">share one!</a></p>`;
    } else {
        recentTips.forEach(tip => {
            indexTipContainer.innerHTML += `
                <li class="list-group-item">
                    <strong>${tip.category.charAt(0).toUpperCase() + tip.category.slice(1)}:</strong> ${tip.text}
                </li>
                `
        });
    }
}