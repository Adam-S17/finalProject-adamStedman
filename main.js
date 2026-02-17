document.addEventListener('DOMContentLoaded', () => {

    // This code makes each tips card clickable. 
    // Clicking a card will automatically switch to the corresponding tab pane
    document.querySelectorAll('.tips-categories .col-md-4').forEach(card => {
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


    //Default tips to appear on page and Load tips from localStorage when the page loads
    const tipContainer = document.getElementById('userTips');
    const tipForm = document.getElementById('tipForm');

    if (tipContainer && tipForm) {

        const defaultTips = [
            { category: 'budget', text: 'Create a daily budget and stick to it to manage your expenses effectively.' },
            { category: 'packing', text: 'Pack light and only bring essentials to make your travel easier.' },
            { category: 'health', text: 'Always carry a basic first-aid kit and stay hydrated.' },
            { category: 'transport', text: 'Use local transportation options to save money and experience the culture.' }
        ];

        //check if localStorage is empty, if so load default tips - double check this is working
        if (!localStorage.getItem('backpackerTips')) {
            localStorage.setItem('backpackerTips', JSON.stringify(defaultTips));
        }

        const savedTips = JSON.parse(localStorage.getItem('backpackerTips')) || [];
        savedTips.forEach(tip => addTipToDOM(tip.category, tip.text));

        // Form submission event - Add tip to DOM and save to localStorage and clear form

        tipForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const category = document.getElementById('tipCategory').value;
            const text = document.getElementById('tipContent').value.trim();

            if (!category || !text) return;

            addTipToDOM(category, text);

            savedTips.push({ category, text });
            localStorage.setItem('backpackerTips', JSON.stringify(savedTips));

            tipForm.reset();
        });

        //add tip to page
        function addTipToDOM(category, text) {
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
            tipContainer.appendChild(newTip);
        }
    }

    //Planner Page JS - maybe try add drag and drop later
    const plannerForm = document.getElementById('plannerForm');
    const plannerContainer = document.getElementById('plannerItems');
    let plannerItems = JSON.parse(localStorage.getItem('plannerItems')) || [];

    if (plannerForm && plannerContainer) {

        plannerItems.forEach(item => renderPlannerItem(item));

        plannerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('tripName').value.trim();
            const date = document.getElementById('tripDate').value;
            const location = document.getElementById('tripLocation').value.trim();
            const notes = document.getElementById('tripNotes').value.trim();

            if (!name || !date || !location) return;

            const newItem = { id: Date.now(), name, type: 'Trip', date, location, notes };
            plannerItems.push(newItem);

            localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
            renderPlannerItem(newItem);

            plannerForm.reset();
        });
    }

    // Render a planner item in the DOM
    function renderPlannerItem(item) {

        const div = document.createElement('div');
        div.className = 'col-md-4'

        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${item.type}</span>
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.date ? `Date: ${item.date}` : ''}</p>
                    ${item.notes ? `<p class="card-text">Notes: ${item.notes}</p>` : ''}

                    <button class="btn btn-sm btn-danger mt-2 delete-btn" data-id="${item.id}">Delete</button>
                </div>
            </div>
        `;

        plannerContainer.appendChild(div);
    }

    // Delete planner item
    plannerContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) return;

        const id = Number(e.target.dataset.id);
        plannerItems = plannerItems.filter(item => item.id !== id);
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));

        e.target.closest('.col-md-4').remove();
    });

});