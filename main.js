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


    //Default tips to appear on page - Update tips for better ones
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

    //Load tips from localStorage when the page loads
    const tipContainer = document.getElementById('userTips');
    const savedTips = JSON.parse(localStorage.getItem('backpackerTips')) || [];
    savedTips.forEach(tip => addTipToDOM(tip.category, tip.text));

    // Form submission event - Add tip to DOM and save to localStorage and clear form

    const tipForm = document.getElementById('tipForm');

    if (tipForm) {
        tipForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const category = document.getElementById('tipCategory').value;
            const text = document.getElementById('tipContent').value.trim();

            if (!category || !text) return;

            addTipToDOM(category, text);

            savedTips.push({ category, text });
            localStorage.setItem('backpackerTips', JSON.stringify(savedTips));

<<<<<<< HEAD
        tipForm.reset();
    });
    
=======
            tipForm.reset();
        });
    }

>>>>>>> 645bde8 (Add planner functionality -html/js: implemented item addition, rendering, and deletion similar to tips section to keep code consistent)
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

    //Planner Page JS - maybe try add drag and drop later
    const plannerForm = document.getElementById('plannerForm');
    const plannerContainer = document.getElementById('plannerItems');
    const plannerNotes = document.getElementById('plannerNotes');
    let plannerItems = JSON.parse(localStorage.getItem('plannerItems')) || [];

    if (plannerForm && plannerContainer) {

        plannerItems.forEach(renderPlannerItem);

        plannerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('itemName').value.trim();
            const type = document.getElementById('itemType').value;
            const date = document.getElementById('itemDate').value;

            if (!name) return;

            const newItem = { id: Date.now(), name, type, date };
            plannerItems.push(newItem);

            localStorage.setItem('plannerItems', JSON.stringify(plannerItems));
            renderPlannerItem(newItem);

            plannerForm.reset();
        });
    }

    // Render a planner item in the DOM
    function renderPlannerItem(item) {
        const plannerContainer = document.getElementById('plannerItems');

        const div = document.createElement('div');
        div.className = 'col-md-4'

        div.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <span class="badge bg-primary mb-2">${item.type}</span>
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.date ? `Date: ${item.date}` : ''}</p>

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

        const index = plannerItems.findIndex(item => item.id === id);
        if (index === -1) return;

        plannerItems.splice(index, 1);
        localStorage.setItem('plannerItems', JSON.stringify(plannerItems));

        e.target.closest('.col-md-4').remove();
    });
});