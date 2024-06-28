document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('main-content');
    const searchInput = document.getElementById('small-search-input');
    const searchButton = document.getElementById('small-search-button');
    const suggestionsDiv = document.getElementById('small-suggestions');
    const placeholders = {
        characters: ['Character1', 'Character2', 'Character3', 'Character4', 'Character5', 'Character6', 'Character7', 'Character8', 'Character9', 'Character10'],
        weapons: ['Weapon1', 'Weapon2', 'Weapon3', 'Weapon4', 'Weapon5', 'Weapon6', 'Weapon7', 'Weapon8', 'Weapon9', 'Weapon10'],
        regions: ['Region1', 'Region2', 'Region3', 'Region4', 'Region5', 'Region6', 'Region7', 'Region8', 'Region9', 'Region10']
    };

    function displayHomePage() {
        contentDiv.innerHTML = `
            <div class="search-bar" id="small-search-bar">
                <input type="text" id="small-search-input" placeholder="Search...">
                <button id="small-search-button">Search</button>
                <div id="small-suggestions"></div>
            </div>
            <p>Welcome to Fanwik! This site is currently in progress and there will be errors...</p>
        `;
        attachSmallSearchListeners();
    }

    function displayPlaceholders(type) {
        contentDiv.innerHTML = `
            <div class="search-bar" id="small-search-bar">
                <input type="text" id="small-search-input" placeholder="Search...">
                <button id="small-search-button">Search</button>
                <div id="small-suggestions"></div>
            </div>
            <h2>${type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            ${placeholders[type].map(name => `<a href="#" class="placeholder-link" data-type="${type}" data-name="${name}">${name}</a>`).join('')}
        `;
        attachSmallSearchListeners();
    }

    document.getElementById('home').addEventListener('click', displayHomePage);
    document.getElementById('search').addEventListener('click', () => {
        contentDiv.innerHTML = `
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Search...">
                <button id="search-button">Search</button>
                <div id="suggestions"></div>
            </div>
        `;
        attachMainSearchListeners();
    });
    document.getElementById('characters').addEventListener('click', () => displayPlaceholders('characters'));
    document.getElementById('weapons').addEventListener('click', () => displayPlaceholders('weapons'));
    document.getElementById('regions').addEventListener('click', () => displayPlaceholders('regions'));

    contentDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('placeholder-link')) {
            event.preventDefault();
            const type = event.target.dataset.type;
            const name = event.target.dataset.name;
            contentDiv.innerHTML = `
                <div class="search-bar" id="small-search-bar">
                    <input type="text" id="small-search-input" placeholder="Search...">
                    <button id="small-search-button">Search</button>
                    <div id="small-suggestions"></div>
                </div>
                <h2>${name}</h2>
                <p>Hello, this is ${name}.</p>
            `;
            attachSmallSearchListeners();
        }
    });

    function attachSmallSearchListeners() {
        const smallSearchInput = document.getElementById('small-search-input');
        const smallSearchButton = document.getElementById('small-search-button');
        const smallSuggestionsDiv = document.getElementById('small-suggestions');

        smallSearchButton.addEventListener('click', function() {
            const query = smallSearchInput.value.toLowerCase();
            let results = [];
            for (let type in placeholders) {
                results = results.concat(placeholders[type].filter(name => name.toLowerCase().includes(query)).map(name => ({ type, name })));
            }
            if (results.length > 0) {
                contentDiv.innerHTML = `
                    <div class="search-bar" id="small-search-bar">
                        <input type="text" id="small-search-input" placeholder="Search...">
                        <button id="small-search-button">Search</button>
                        <div id="small-suggestions"></div>
                    </div>
                    ${results.map(result => `<a href="#" class="placeholder-link" data-type="${result.type}" data-name="${result.name}">${result.name}</a>`).join('')}
                `;
                attachSmallSearchListeners();
            } else {
                contentDiv.innerHTML = '<p>No results found.</p>';
            }
        });

        smallSearchInput.addEventListener('input', function() {
            const query = smallSearchInput.value.toLowerCase();
            let suggestions = [];
            if (query.length > 0) {
                for (let type in placeholders) {
                    suggestions = suggestions.concat(placeholders[type].filter(name => name.toLowerCase().includes(query)));
                }
                if (suggestions.length > 0) {
                    smallSuggestionsDiv.innerHTML = suggestions.map(name => `<div>${name}</div>`).join('');
                    smallSuggestionsDiv.style.display = 'block';
                    smallSuggestionsDiv.style.width = `${smallSearchInput.offsetWidth}px`; // Set width to match input
                } else {
                    smallSuggestionsDiv.style.display = 'none';
                }
            } else {
                smallSuggestionsDiv.style.display = 'none';
            }
        });

        smallSuggestionsDiv.addEventListener('click', function(event) {
            if (event.target.tagName === 'DIV') {
                smallSearchInput.value = event.target.textContent;
                smallSuggestionsDiv.style.display = 'none';
            }
        });
    }

    function attachMainSearchListeners() {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const suggestionsDiv = document.getElementById('suggestions');

        searchButton.addEventListener('click', function() {
            const query = searchInput.value.toLowerCase();
            let results = [];
            for (let type in placeholders) {
                results = results.concat(placeholders[type].filter(name => name.toLowerCase().includes(query)).map(name => ({ type, name })));
            }
            if (results.length > 0) {
                contentDiv.innerHTML = `
                    <div class="search-bar" id="small-search-bar">
                        <input type="text" id="small-search-input" placeholder="Search...">
                        <button id="small-search-button">Search</button>
                        <div id="small-suggestions"></div>
                    </div>
                    ${results.map(result => `<a href="#" class="placeholder-link" data-type="${result.type}" data-name="${result.name}">${result.name}</a>`).join('')}
                `;
                attachSmallSearchListeners();
            } else {
                contentDiv.innerHTML = '<p>No results found.</p>';
            }
        });

        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase();
            let suggestions = [];
            if (query.length > 0) {
                for (let type in placeholders) {
                    suggestions = suggestions.concat(placeholders[type].filter(name => name.toLowerCase().includes(query)));
                }
                if (suggestions.length > 0) {
                    suggestionsDiv.innerHTML = suggestions.map(name => `<div>${name}</div>`).join('');
                    suggestionsDiv.style.display = 'block';
                    suggestionsDiv.style.width = `${searchInput.offsetWidth}px`; // Set width to match input
                } else {
                    suggestionsDiv.style.display = 'none';
                }
            } else {
                suggestionsDiv.style.display = 'none';
            }
        });

        suggestionsDiv.addEventListener('click', function(event) {
            if (event.target.tagName === 'DIV') {
                searchInput.value = event.target.textContent;
                suggestionsDiv.style.display = 'none';
            }
        });
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
    }

    document.getElementById('theme').addEventListener('click', toggleTheme);

    displayHomePage();
});
