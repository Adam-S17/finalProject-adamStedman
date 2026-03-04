/**
 * tips.js
 * This handles all of the Javascript on the tips page
 * - Gets default and saved tips from local storage
 * - Submits new tips from the tip form
 * - Displays the latest 3 tips on the index page
 */

/** Default tips loaded on the first visit if local storage is empty */
const defaultTips = [
    { category: 'budget', text: 'Create a daily budget and stick to it to manage your expenses effectively.' },
    { category: 'packing', text: 'Pack light and only bring essentials to make your travel easier.' },
    { category: 'health', text: 'Always carry a basic first-aid kit and stay hydrated.' },
    { category: 'transport', text: 'Use local transportation options to save money and experience the culture.' }
];

/**
 * Creates a tips card and appends it to the container
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

    const savedTips = JSON.parse(localStorage.getItem('backpackerTips')) || [];
    savedTips.forEach(tip => addTipToDOM(tipContainer, tip.category, tip.text));

    // Form submission event - Add tip to DOM and save to localStorage and clear form

    tipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const category = document.getElementById('tipCategory').value;
        const text = document.getElementById('tipContent').value.trim();

        if (!category || !text) return;

        addTipToDOM(tipContainer, category, text);

        savedTips.push({ category, text });
        localStorage.setItem('backpackerTips', JSON.stringify(savedTips));

        tipForm.reset();
    });
}

/**
 * Puts the 3 most recent tips on the idec page
 */
export function initHomepageTips() {
    const indexTipContainer = document.getElementById('latestTips');
    if (indexTipContainer) {
        const tips = JSON.parse(localStorage.getItem('backpackerTips')) || [];
        const recentTips = tips.slice(-3).reverse();

        if (recentTips.length === 0) {
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
}