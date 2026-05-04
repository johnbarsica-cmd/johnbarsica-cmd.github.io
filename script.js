// Handle header links for info.html dropdowns
document.addEventListener('DOMContentLoaded', function() {
    // Only run this functionality on info.html
    if (!window.location.pathname.includes('info.html')) {
        return;
    }
    
    // Function to open a dropdown by ID
    const openDropdown = (id) => {
        const details = document.getElementById(id);
        if (details && details.tagName === 'DETAILS') {
            details.open = true;
        }
    };
    
    // Open dropdown if there's a hash in the URL
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        openDropdown(hashId);
    }
    
    // Add click handlers to header links
    const headerLinks = document.querySelectorAll('.header-info-link');
    headerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.includes('#')) {
                const targetId = href.split('#')[1];
                openDropdown(targetId);
                e.preventDefault();
                // Scroll after opening the dropdown
                const details = document.getElementById(targetId);
                if (details) {
                    setTimeout(() => {
                        details.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                }
            }
        });
    });
});

// Also handle hash changes (e.g., when navigating via back button or direct URL entry)
window.addEventListener('hashchange', function() {
    // Only run this functionality on info.html
    if (!window.location.pathname.includes('info.html')) {
        return;
    }
    
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        const details = document.getElementById(hashId);
        if (details && details.tagName === 'DETAILS') {
            details.open = true;
            setTimeout(() => {
                details.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        }
    }
});

// Form toggle logic
document.addEventListener('DOMContentLoaded', function() {
    const queryTypeSelect = document.getElementById('786733064');
    const locationFieldset = document.getElementById('location-fieldset');
    const commentFieldset = document.getElementById('comment-fieldset');    
    const nameFieldset = document.getElementById('name-fieldset');    
    const typeFieldset = document.getElementById('type-fieldset');
    const featuresFieldset = document.getElementById('features-fieldset');
    const notesFieldset = document.getElementById('notes-fieldset');
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const formWrapper = document.getElementById('formWrapper');
    const mapElement = document.getElementById('map');
    const mapBlocker = document.getElementById('mapBlocker');
    const toggleFilterBoxBtn = document.getElementById('toggleFilterBoxBtn');

    function setMapInteractivity(enabled) {
        if (map && typeof map === 'object') {
            if (enabled) {
                map.dragging.enable();
                map.scrollWheelZoom.enable();
                map.doubleClickZoom.enable();
                map.boxZoom.enable();
                map.keyboard.enable();
                map.touchZoom.enable();
            } else {
                map.dragging.disable();
                map.scrollWheelZoom.disable();
                map.doubleClickZoom.disable();
                map.boxZoom.disable();
                map.keyboard.disable();
                map.touchZoom.disable();
                map.closePopup();
            }
        }
        if (mapBlocker) {
            mapBlocker.style.display = enabled ? 'none' : 'block';
        }
        if (mapElement) {
            mapElement.style.pointerEvents = enabled ? 'auto' : 'none';
        }
    }

    function toggleFields() {
        const selectedValue = queryTypeSelect.value;
        if (selectedValue === 'Comment') {
            locationFieldset.style.display = 'block';
            commentFieldset.style.display = 'block';
            nameFieldset.style.display = 'none';
            typeFieldset.style.display = 'none';
            featuresFieldset.style.display = 'none';
            notesFieldset.style.display = 'none';
            // Add required
            document.getElementById('999410215').required = true;
            document.getElementById('2006740745').required = true;
            // Remove required from others
            document.getElementById('808266618').required = false;
            document.querySelectorAll('#type-fieldset input').forEach(input => input.required = false);
            document.querySelectorAll('#features-fieldset input').forEach(input => input.required = false);
            document.getElementById('199907410').required = false;
        } else if (selectedValue === 'New Location Suggestion') {
            locationFieldset.style.display = 'none';
            commentFieldset.style.display = 'none';
            nameFieldset.style.display = 'block';
            typeFieldset.style.display = 'block';
            featuresFieldset.style.display = 'block';
            notesFieldset.style.display = 'block';
            // Add required for text fields only; checkbox/radio groups are validated manually
            document.getElementById('808266618').required = true;
            document.querySelectorAll('#type-fieldset input').forEach(input => input.required = false);
            document.querySelectorAll('#features-fieldset input').forEach(input => input.required = false);
            document.getElementById('199907410').required = true;
            // Remove required from others
            document.getElementById('999410215').required = false;
            document.getElementById('2006740745').required = false;
        } else {
            // Hide all if no valid selection
            locationFieldset.style.display = 'none';
            commentFieldset.style.display = 'none';
            nameFieldset.style.display = 'none';
            typeFieldset.style.display = 'none';
            featuresFieldset.style.display = 'none';
            notesFieldset.style.display = 'none';
            // Remove all required
            document.getElementById('999410215').required = false;
            document.getElementById('2006740745').required = false;
            document.getElementById('808266618').required = false;
            document.querySelectorAll('#type-fieldset input').forEach(input => input.required = false);
            document.querySelectorAll('#features-fieldset input').forEach(input => input.required = false);
            document.getElementById('199907410').required = false;
        }
    }

    // Initial hide all
    toggleFields();

    // Hide form wrapper initially (extra safety)
    if (formWrapper) {
        formWrapper.style.display = 'none';
    }
    if (toggleFormBtn) {
        toggleFormBtn.textContent = 'Comment or Suggest';
        function handleOutsideClick(e) {
            if (!formWrapper.contains(e.target) && !toggleFormBtn.contains(e.target)) {
                mapElement.style.filter = 'none';
                toggleFilterBoxBtn.style.filter = 'none';
                setMapInteractivity(true);
                formWrapper.classList.remove('visible');
                setTimeout(() => formWrapper.style.display = 'none', 850);
                toggleFormBtn.textContent = 'Comment or Suggest';
                if (formContainer) formContainer.classList.remove('form-open');
                document.removeEventListener('click', handleOutsideClick);
            }
        }
        toggleFormBtn.addEventListener('click', function() {
            if (formWrapper.style.display === 'none') {
                formWrapper.style.display = 'block';
                setTimeout(() => formWrapper.classList.add('visible'), 10);
                toggleFormBtn.textContent = 'Hide Form';
                setMapInteractivity(false);
                mapElement.style.filter = 'blur(5px)';
                toggleFilterBoxBtn.style.filter = 'blur(5px)';
                if (formContainer) formContainer.classList.add('form-open');
                document.addEventListener('click', handleOutsideClick);
                // Hide filters panel when showing form
                if (mapPanel) {
                    mapPanel.classList.remove('visible');
                    setTimeout(() => mapPanel.style.display = 'none', 850);
                    if (toggleFilterBoxBtn) toggleFilterBoxBtn.textContent = 'Show Filters';
                }
            } else {
                mapElement.style.filter = 'none';
                toggleFilterBoxBtn.style.filter = 'none';
                setMapInteractivity(true);
                formWrapper.classList.remove('visible');
                setTimeout(() => formWrapper.style.display = 'none', 850);
                toggleFormBtn.textContent = 'Comment or Suggest';
                if (formContainer) formContainer.classList.remove('form-open');
                document.removeEventListener('click', handleOutsideClick);
            }
        });

        const closeFormBtn = document.getElementById('closeFormBtn');
        if (closeFormBtn) {
            closeFormBtn.addEventListener('click', function() {
                if (formWrapper) {
                    formWrapper.classList.remove('visible');
                    setTimeout(() => formWrapper.style.display = 'none', 850);
                }
                if (toggleFormBtn) {
                    toggleFormBtn.textContent = 'Comment or Suggest';
                }
                mapElement.style.filter = 'none';
                toggleFilterBoxBtn.style.filter = 'none';
                setMapInteractivity(true);
                if (formContainer) formContainer.classList.remove('form-open');
                document.removeEventListener('click', handleOutsideClick);
            });
        }
    }

    const mapPanel = document.getElementById('mapPanel');

    if (toggleFilterBoxBtn && mapPanel) {
        toggleFilterBoxBtn.textContent = 'Show Filters';
        toggleFilterBoxBtn.addEventListener('click', function() {
            if (mapPanel.style.display === 'none') {
                mapPanel.style.display = 'block';
                setTimeout(() => mapPanel.classList.add('visible'), 10);
                toggleFilterBoxBtn.textContent = 'Hide Filters';
                setMapInteractivity(false);
                // Hide form when showing filters
                if (formWrapper) {
                    formWrapper.classList.remove('visible');
                    setTimeout(() => formWrapper.style.display = 'none', 850);
                    if (toggleFormBtn) toggleFormBtn.textContent = 'Comment or Suggest';
                    mapElement.style.filter = 'none';
                    toggleFilterBoxBtn.style.filter = 'none';
                    setMapInteractivity(true);
                }
            } else {
                setMapInteractivity(true);
                mapPanel.classList.remove('visible');
                setTimeout(() => mapPanel.style.display = 'none', 850);
                toggleFilterBoxBtn.textContent = 'Show Filters';
            }
        });
    }

    // Hide panel when clicking outside
    document.addEventListener('click', function(event) {
        if (mapPanel && mapPanel.style.display !== 'none') {
            if (!mapPanel.contains(event.target) && !toggleFilterBoxBtn.contains(event.target)) {
                setMapInteractivity(true);
                mapPanel.classList.remove('visible');
                setTimeout(() => mapPanel.style.display = 'none', 850);
                if (toggleFilterBoxBtn) toggleFilterBoxBtn.textContent = 'Show Filters';
            }
        }
    });

    // Hide panel when touching/swiping outside
    document.addEventListener('touchstart', function(event) {
        if (mapPanel && mapPanel.style.display !== 'none') {
            if (!mapPanel.contains(event.target) && !toggleFilterBoxBtn.contains(event.target)) {
                setMapInteractivity(true);
                mapPanel.style.display = 'none';
                if (toggleFilterBoxBtn) toggleFilterBoxBtn.textContent = 'Show Filters';
            }
        }
    });

    // Add event listener
    queryTypeSelect.addEventListener('change', toggleFields);

    // Ensure map is interactive when form is hidden
    setMapInteractivity(true);

    // If user clicks on map blocker, close form and re-enable map
    if (mapBlocker) {
        mapBlocker.addEventListener('click', function() {
            formWrapper.style.display = 'none';
            toggleFormBtn.textContent = 'Show Form';
            setMapInteractivity(true);
        });
    }

    // Add helper for opening comment form from map popup
    window.openCommentForm = function(locationName) {
        // close any open popup when opening form
        if (typeof map !== 'undefined' && map.closePopup) {
            map.closePopup();
        }

        if (formWrapper) {
            formWrapper.style.display = 'block';
            setTimeout(() => formWrapper.classList.add('visible'), 10);
        }
        if (toggleFormBtn) {
            toggleFormBtn.textContent = 'Hide Form';
        }

        if (mapElement) {
            mapElement.classList.add('blurred');
        }
        if (toggleFilterBoxBtn) {
            toggleFilterBoxBtn.classList.add('blurred');
        }

        setMapInteractivity(false);

        // Hide filters panel when opening form
        if (mapPanel) {
            mapPanel.classList.remove('visible');
            setTimeout(() => mapPanel.style.display = 'none', 850);
            if (toggleFilterBoxBtn) toggleFilterBoxBtn.textContent = 'Show Filters';
        }

        queryTypeSelect.value = 'Comment';
        
        // Auto-select the location if provided
        if (locationName) {
            document.getElementById('999410215').value = locationName;
        }
        
        toggleFields();
        // Scroll form into view if needed
        document.getElementById('bootstrapForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Form submission with validation and handling
    const form = document.getElementById('bootstrapForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const selectedValue = queryTypeSelect.value;

        // Validation for New Location Suggestion
        if (selectedValue === 'New Location Suggestion') {
            const typeChecked = Array.from(document.querySelectorAll('#type-fieldset input[type="radio"]')).some(input => input.checked);
            const featureChecked = Array.from(document.querySelectorAll('#features-fieldset input[type="checkbox"]')).some(input => input.checked);

            if (!typeChecked) {
                alert('Please select at least one option for Type of Establishment.');
                return;
            }

            if (!featureChecked) {
                alert('Please select at least one option for Features.');
                return;
            }
        }

        // Copy form data BEFORE clearing fields
        const formData = new FormData(form);

        // Submit form via hidden iframe
        const tempForm = document.createElement('form');
        tempForm.action = form.action;
        tempForm.method = form.method;
        tempForm.target = 'hidden_iframe';
        tempForm.style.display = 'none';
        
        // Add all form data to temporary form
        for (let [name, value] of formData) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            tempForm.appendChild(input);
        }
        
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);

        // Wait for iframe to load before showing success and redirecting
        const iframe = document.querySelector('iframe[name="hidden_iframe"]');
        iframe.addEventListener('load', function() {
            // Clear fields AFTER submission based on form type
            if (selectedValue === 'Comment') {
                // Clear new location fields
                document.getElementById('808266618').value = '';
                document.querySelectorAll('#type-fieldset input').forEach(input => input.checked = false);
                document.querySelectorAll('#features-fieldset input').forEach(input => input.checked = false);
                document.getElementById('199907410').value = '';
            } else if (selectedValue === 'New Location Suggestion') {
                // Clear comment fields
                document.getElementById('999410215').selectedIndex = 0;
                document.getElementById('2006740745').value = '';
            }
            
            // Show success message and redirect
            alert("Form successfully submitted!");
            window.location.href = "index.html";
        });
    });
});

var map = L.map('map', {zoomControl: false}).setView([14.604976, 121.029790], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.zoom({
    position: 'bottomright'
}).addTo(map)

// Icons

var mainIcon = L.Icon.extend({
    options: {
        iconSize: [28,28],
        iconAnchor: [20,5],
        popupAnchor: [0,-20]
    }
})

var mallIcon = new mainIcon({
    iconUrl: 'icons/basket2-fill.svg',
    className: 'mallIcon'
});
    
var governmentIcon = new mainIcon({
    iconUrl: 'icons/bank2.svg',
    className: 'governmentIcon'
});

var parkIcon = new mainIcon({
    iconUrl: 'icons/park.svg',
    className: 'parkIcon'
})

const mall = [
    {
    name: "Santolan Town Plaza",
    coords: [14.604715, 121.033720],
    info: ["Online Services", "Elevator access on all floors", "Escalators", "Accesisibility Parking Spaces", "Wheelchair-accessible entrances", "Accessible/Universal Washrooms", "Service Animal-Friendly Establishment", "No Flashing Lights", "Abundant Public Seating"],
    directions: [
        { label: 'Main Entrance', text: 'Coming Soon!'},
        { label: 'Parking Lot Route', text: 'Coming Soon!'}
    ],
    id: "mall-1",
    onlineServiceUrl: "https://www.facebook.com/SantolanTownPlaza/",
    comments: []
    },
    {
    name: "Puregold Agora",
    coords: [14.605218, 121.023248],
    info: ["Online Services", "Escalators", "Accessibility Parking Spaces", "No Flashing Lights", "Abundant Public Seating"],
    directions: [
        { label: 'Front Entrance', text: 'Coming Soon!' },
        { label: 'Back Entrance', text: 'Coming Soon!' }
    ],
    id: "mall-2",
    onlineServiceUrl: "https://www.foodpanda.ph/shop/ybql/puregold-agora",
    comments: []
    },
    {
    name: "GH Mall",
    coords: [14.601245, 121.048031],
    info: ["Online Services", "Elevator access on all floors", "Escalators", "Accessibility Parking Spaces", "Wheelchair-accessible entrances", "Accessible/Universal Washrooms", "Service Animal-Friendly Establishment", "No Flashing Lights", "Abundant Public Seating"],
    directions: [
        { label: 'Primary Entrance', text: 'Coming Soon!'},
        { label: 'Service Entrance', text: 'Coming Soon!'}
    ],
    id: "mall-3",
    onlineServiceUrl: "https://www.ortigasmalls.com/greenhills",
    comments: []
    }
    ,
    {
    name: "The Corner House",
    coords: [14.597672315528328, 121.03828288057815],
    info: ["Online Services", "Elevators", "Accessibility Parking Spaces", "Wheelchair-accessible entrances", "Accessible/Universal Washrooms", "Service Animal-Friendly Establishment", "No Flashing Lights", "Abundant Public Seating"],
    directions: [
        { label: 'Primary Entrance', text: 'Coming Soon!'},
        { label: 'Service Entrance', text: 'Coming Soon!'}
    ],
    id: "mall-4",
    onlineServiceUrl: "https://www.facebook.com/thecornerhouseph/",
    comments: []
    }
    
];

const government = [
    {
    name: "City Hall",
    coords: [14.604858, 121.029903],
    info: ["Online Services", "Elevators", "Accessibility Parking Spaces", "Wheelchair-accessible entrances", "Accessible/Universal Washrooms", "No Flashing Lights", "Abundant Public Seating"],
    directions: [
        { label: 'Main Lobby Entrance', text: 'Coming Soon!'},
        { label: 'Back Entrance', text: 'Coming Soon!'}
    ],
    id: "gov-1",
    onlineServiceUrl: "https://www.sanjuancity.gov.ph",
    comments: []
    },
    {
    name: "National Government Center",
    coords: [14.603879, 121.031914],
    info: ["Online Services", "Elevators", "Accessibility Parking Spaces", "Wheelchair-accessible entrances", "Accessible/Universal Washrooms", "No Flashing Lights", "Abundant Public Seating"],
    directions: [
        { label: 'Front Entrance', text: 'Coming Soon!' },
        { label: 'Parking Area Access', text: 'Coming Soon!' }
    ],
    id: "gov-2",
    comments: []
    }
    ,
    {
    name: "San Juan Hall of Justice",
    coords: [14.604397672370293, 121.03217091862406],
    info: ["Elevators", "Accessibility Parking Spaces", "Wheelchair-accessible entrances", "Accessible/Universal Washrooms", "No Flashing Lights", "Abundant Public Seating"],
    directions: [
        { label: 'Front Entrance', text: 'Coming Soon!' },
        { label: 'Parking Area Access', text: 'Coming Soon!' }
    ],
    id: "gov-4",
    comments: []
    }
    ,
    {
    name: "Land Transportation Office (LTO) San Juan",
    coords: [14.606038628539768, 121.02316122986402],
    info: ["Online Services", "Accessibility Parking Spaces", "Wheelchair-accessible entrances", "No flashing lights", "Abundant Public Seating"],
    directions: [
        { label: 'Front Entrance', text: 'Coming Soon!' },
        { label: 'Parking Area Access', text: 'Coming Soon!' }
    ],
    id: "gov-5",
    onlineServiceUrl: "https://portal.lto.gov.ph/ords/f?p=1200:HOME::::::",
    comments: []
    }
]

const parks = [
    {
    name: "Pinaglabanan Park",
    coords: [14.604730, 121.030581],
    info: [
        {text: "Acessibility Parking Spaces"},
        {text: "Tactile Flooring"},
        {text: "Wheelchair-accessible entrances", warning: "Motorcycles park and cars often block the wheelchair ramps."},
        {text: "Service Animal-Friendly Establishment", warning: "Animals need to be wearing diapers in the park museums. Owners should be prepared to clean up after their pets."},
        {text: "No Flashing Lights"},
        {text: "Abundant Public Seating"}
    ],
    directions: [
        { label: 'Front Entrance', text: 'Coming Soon!' },
        { label: 'Back Entrance', text: 'Coming Soon!'}
    ],
    id: "park-1",
    comments: []
    },
    {
    name: "Mini Park",
    coords: [14.603928, 121.028049],
    info: [
        {text: "Tactile Flooring"},
        {text: "Wheelchair-accessible entrances", warning: "The wheelchair ramp does not extend to the main road (there is a curb). Visitors may need assistance crossing the street to access the ramp."},
        {text: "Service Animal-Friendly Establishment", warning: "Animals need to be wearing diapers in the park museums. Owners should be prepared to clean up after their pets."},
        {text: "Accessible/Universal Washrooms"},
        {text: "No Flashing Lights"},
        {text: "Abundant Public Seating"}
        ],
    directions: [
        { label: 'Main Entrance', text: 'Coming Soon!'},
        { label: 'Side Walkway', text: 'Coming Soon!'}
    ],
    id: "park-2",
    comments: []
    },
    {
    name: "Filoil EcoOil Centre",
    coords: [14.605566, 121.032907],
    info: ["Accessibility Parking Spaces", "Wheelchair-accessible entrances", "Accessible/Universal Washrooms"],
    directions: [
        { label: 'Main Gate', text: 'Coming Soon!'},
        { label: 'Back Entry', text: 'Coming Soon!'}
    ],
    id: "park-3",
    comments: []
    }
    ,
    {
    name: "San Juan Plaza",
    coords: [14.605635141051149, 121.02268517063243],
    info: [
        {text: "Acessibility Parking Spaces"},
        {text: "Wheelchair-accessible entrances"},
        {text: "Service Animal-Friendly Establishment", warning: "Animals need to be wearing diapers in the park museums. Owners should be prepared to clean up after their pets."},
        {text: "No Flashing Lights"},
        {text: "Abundant Public Seating"}
    ],
    directions: [
        { label: 'Primary Entrance', text: 'Coming Soon!'},
        { label: 'Service Entrance', text: 'Coming Soon!'}
    ],
    id: "park-6",
    comments: []
    }
]

// Load comments from localStorage
function loadComments() {
    const saved = localStorage.getItem('mapComments');
    if (saved) {
        const allComments = JSON.parse(saved);
        mall.forEach(m => { m.comments = allComments[m.id] || []; });
        government.forEach(g => { g.comments = allComments[g.id] || []; });
        parks.forEach(p => { p.comments = allComments[p.id] || []; });
    }
}

// Save comments to localStorage
function saveComments() {
    const allComments = {};
    mall.forEach(m => { allComments[m.id] = m.comments; });
    government.forEach(g => { allComments[g.id] = g.comments; });
    parks.forEach(p => { allComments[p.id] = p.comments; });
    localStorage.setItem('mapComments', JSON.stringify(allComments));
}

// Create popup content with comments
function createPopupContent(location) {
    const getFeatureIcon = (feature) => {
        if (feature.includes('Elevator')) return 'elevator';
        if (feature.includes('Escalator')) return 'escalator';
        if (feature.includes('Online Services')) return 'language';
        if (feature.includes('Parking Spaces')) return 'local_parking';
        if (feature.includes('Tactile Flooring')) return 'blind';
        if (feature.includes('Wheelchair-accessible')) return 'accessible';
        if (feature.includes('Sign-language')) return 'sign_language';
        if (feature.includes('Service Animal')) return 'pets';
        if (feature.includes('No Flashing Lights')) return 'flash_off';
        if (feature.includes('Abundant Public Seating')) return 'chair';
        if (feature.includes('Adult/Baby Changing Stations')) return 'baby_changing_station';
        if (feature.includes('Washrooms')) return 'accessible'; // fallback
        return 'help'; // default
    };

    const featureOptions = location.info ? location.info.map(item => {
        let text, warning;
        if (typeof item === 'string') {
            text = item;
            warning = null;
        } else {
            text = item.text;
            warning = item.warning;
        }
        let warningHtml = '';
        if (warning) {
            warningHtml = ` <span class="material-icons warning-icon" onclick="alert('${warning.replace(/'/g, "\\'")}')">warning</span>`;
        }
        
        // Render Online Services as a clickable link if URL exists
        if (text.includes('Online Services') && location.onlineServiceUrl) {
            return `<li class="popup-feature-item"><span><span class="material-icons">${getFeatureIcon(text)}</span><a href="${location.onlineServiceUrl}" target="_blank" style="color: #007bff; text-decoration: none; font-weight: 500; transition: color 0.3s ease;">${text}</a></span>${warningHtml}</li>`;
        }
        
        return `<li class="popup-feature-item"><span><span class="material-icons">${getFeatureIcon(text)}</span>${text}</span>${warningHtml}</li>`;
    }).join('') : '<li>No features available</li>';
    
    const directions = location.directions || [
        { label: 'Main Entrance', text: 'Enter via the main street entrance; follow sidewalk signs to the lobby.', image: 'https://via.placeholder.com/260x150?text=Entrance+Image' },
        { label: 'Parking Lot Route', text: 'From the parking lot, walk through the pedestrian gate and take the ramp to the door.', image: 'https://via.placeholder.com/260x150?text=Entrance+from+Parking' }
    ];
    const directionOptions = directions.map((dir, index) => `<option value="${index}">${dir.label || `Route ${index+1}`}</option>`).join('');
    const defaultDirection = directions[0];

    const directionContentId = `direction-content-${location.id}`;
    const directionTextId = `direction-text-${location.id}`;
    const directionImageId = `direction-image-${location.id}`;
    const directionSelectId = `direction-select-${location.id}`;

    const commentsHTML = location.comments.map(comment => `
        <div class="popup-comment">
            <strong>${comment.author}:</strong>
            ${comment.text}
        </div>
    `).join('');
    
    return `
        <div class="popup-card">
            <strong class="location-name">${location.name}</strong>
            <hr class="popup-divider">
            <details open ontoggle="centerPopupOnScreen()" class="popup-section">
                <summary>Features</summary>
                <div class="popup-section-content">
                    <ul class="popup-feature-list">
                        ${featureOptions}
                    </ul>
                </div>
            </details>
            <details ontoggle="centerPopupOnScreen()" class="popup-section">
                <summary>Entrance Directions</summary>
                <div class="popup-section-content">
                    <select id="${directionSelectId}" class="popup-select" onchange="updatePopupDirection('${location.id}', this.value)">
                        ${directionOptions}
                    </select>
                    <div id="${directionContentId}" class="popup-direction-box">
                        <div id="${directionTextId}" class="popup-direction-text">${defaultDirection.text}</div>
                        <img id="${directionImageId}" src="${defaultDirection.image}" alt="Entrance direction image" class="popup-direction-image" />
                    </div>
                </div>
            </details>
            <hr class="popup-divider">
            ${commentsHTML}
            <button onclick="openCommentForm('${location.name}')" class="popup-action-btn popup-action-btn-primary">Comment or Suggest</button>
            <button onclick="openFullDetails('${location.id}')" class="popup-action-btn popup-action-btn-secondary">View Full Details</button>
        </div>
    `;
}

window.getLocationById = function(locationId) {
    return getAllLocations().find(loc => loc.id === locationId);
};

window.updatePopupDirection = function(locationId, directionIdx) {
    const textEl = document.getElementById(`direction-text-${locationId}`);
    const imageEl = document.getElementById(`direction-image-${locationId}`);

    const location = window.getLocationById(locationId);
    const directions = (location && location.directions && location.directions.length) ? location.directions : [
        { label: 'Main Entrance', text: 'Enter via the main street entrance; follow sidewalk signs to the lobby.', image: 'https://via.placeholder.com/260x150?text=Entrance+Image' }
    ];
    const index = parseInt(directionIdx, 10);
    const selected = directions[isNaN(index) ? 0 : Math.max(0, Math.min(directions.length - 1, index))];

    if(textEl) textEl.textContent = selected.text || 'No direction text provided.';
    if(imageEl) imageEl.src = selected.image || 'https://via.placeholder.com/260x150?text=No+Image';
};

window.openFullDetails = function(locationId) {
    const location = window.getLocationById(locationId);
    const slug = location.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const targetPage = `${slug}.html`;
    window.open(targetPage, '_blank');
};

/*
// Add comment function
window.addComment = function(locationId) {
    const author = document.getElementById(`comment-author-${locationId}`).value.trim();
    const text = document.getElementById(`comment-text-${locationId}`).value.trim();
    
    if (!author || !text) {
        alert('Please enter both name and comment');
        return;
    }
    
    let location = mall.find(m => m.id === locationId) || 
                   government.find(g => g.id === locationId) || 
                   parks.find(p => p.id === locationId);
    
    if (location) {
        const comment = {
            author: author,
            text: text,
            timestamp: new Date().toLocaleString()
        };
        location.comments.unshift(comment);
        saveComments();
        // Update popup with new content
        location.marker.setPopupContent(createPopupContent(location));
        // Clear input fields
        document.getElementById(`comment-author-${locationId}`).value = '';
        document.getElementById(`comment-text-${locationId}`).value = '';
    }
}

// Load comments on page load
loadComments();

*/

var mallLayer = new L.FeatureGroup();
var governmentLayer = new L.FeatureGroup();
var parkLayer = new L.FeatureGroup();

const mapLabelOptions = {
    permanent: true,
    direction: 'right',
    offset: [16, 0],
    className: 'map-label',
    interactive: true
};

mall.forEach(malls => {
    const mallIconPlacer = L.marker(malls.coords, {icon: mallIcon});
    malls.marker = mallIconPlacer;
    mallIconPlacer.bindPopup(createPopupContent(malls));
    mallIconPlacer.bindTooltip(malls.name, mapLabelOptions).on('tooltipopen', function(e) {
        const tooltip = e.tooltip;
        tooltip.getElement().addEventListener('click', function() {
            mallIconPlacer.openPopup();
        });
    });
    mallIconPlacer.on('popupopen', function(){ if (this._icon) { this._icon.classList.add('active'); this._icon.classList.add('clicked'); } });
    mallIconPlacer.on('popupclose', function(){ if (this._icon) { this._icon.classList.remove('active'); this._icon.classList.remove('clicked'); } });
    mallLayer.addLayer(mallIconPlacer)
})

government.forEach(gov => {
    const governmentIconPlacer = L.marker(gov.coords, {icon: governmentIcon});
    gov.marker = governmentIconPlacer;
    governmentIconPlacer.bindPopup(createPopupContent(gov));
    governmentIconPlacer.bindTooltip(gov.name, mapLabelOptions).on('tooltipopen', function(e) {
        const tooltip = e.tooltip;
        tooltip.getElement().addEventListener('click', function() {
            governmentIconPlacer.openPopup();
        });
    });
    governmentIconPlacer.on('popupopen', function(){ if (this._icon) { this._icon.classList.add('active'); this._icon.classList.add('clicked'); } });
    governmentIconPlacer.on('popupclose', function(){ if (this._icon) { this._icon.classList.remove('active'); this._icon.classList.remove('clicked'); } });
    governmentLayer.addLayer(governmentIconPlacer)
})

parks.forEach(park => {
    const parkIconPlacer = L.marker(park.coords, {icon: parkIcon});
    park.marker = parkIconPlacer;
    parkIconPlacer.bindPopup(createPopupContent(park));
    parkIconPlacer.bindTooltip(park.name, mapLabelOptions).on('tooltipopen', function(e) {
        const tooltip = e.tooltip;
        tooltip.getElement().addEventListener('click', function() {
            parkIconPlacer.openPopup();
        });
    });
    parkIconPlacer.on('popupopen', function(){ if (this._icon) { this._icon.classList.add('active'); this._icon.classList.add('clicked'); } });
    parkIconPlacer.on('popupclose', function(){ if (this._icon) { this._icon.classList.remove('active'); this._icon.classList.remove('clicked'); } });
    parkLayer.addLayer(parkIconPlacer)
})

/*var mallIconPlacer = L.marker([mallCoordinatesX[0], mallCoordinatesY[0]], {icon: mallIcon});*/

map.addLayer(mallLayer);
map.addLayer(governmentLayer);
map.addLayer(parkLayer);

function getSelectedFeatureFilters(){
    return Array.from(document.querySelectorAll('.feature-filter:checked')).map(input => input.value.toLowerCase());
}

function getTypeFilterState(){
    return {
        mall: document.getElementById('filterMalls').checked,
        government: document.getElementById('filterGovernment').checked,
        park: document.getElementById('filterParks').checked
    };
}

function getLabelToggleState(){
    const el = document.getElementById('labelToggle');
    return el ? el.checked : true;
}

function normalizeFeature(feature) {
    const lower = feature.toLowerCase();
    if (lower.includes('elevator')) return 'elevator';
    if (lower.includes('escalator')) return 'escalator';
    if (lower.includes('online')) return 'online';
    if (lower.includes('parking')) return 'parking';
    if (lower.includes('tactile')) return 'tactile';
    if (lower.includes('wheelchair')) return 'wheelchair';
    if (lower.includes('washroom')) return 'washroom';
    if (lower.includes('sign-language')) return 'sign-language';
    if (lower.includes('service animal')) return 'service animal';
    if (lower.includes('no flashing')) return 'no flashing';
    if (lower.includes('abundant')) return 'abundant';
    return lower;
}

function locationHasFeatures(location, selectedFeatures){
    if (!selectedFeatures.length) return true;
    if (!location.info || !Array.isArray(location.info) || !location.info.length) return false;
    const infoLower = location.info.map(i => typeof i === 'string' ? i.toLowerCase() : i.text.toLowerCase());

    const normalizedSelected = selectedFeatures.map(normalizeFeature);
    const normalizedInfo = infoLower.map(normalizeFeature);

    // Match ALL selected features (logical AND)
    return normalizedSelected.every(feature => normalizedInfo.includes(feature));
}

function setLabelVisibility(marker, visible){
    if (!marker || !marker._tooltip || !marker._tooltip._container) return;
    const container = marker._tooltip._container;
    container.style.display = visible ? '' : 'none';
    if (!visible) {
        container.style.marginTop = '';
    }
}

function resetLabelShift(marker) {
    if (!marker || !marker._tooltip || !marker._tooltip._container) return;
    marker._tooltip._container.style.marginTop = '';
}

function positionLabelsWithoutOverlap(markers) {
    if (!map || !markers.length) return;

    markers.forEach(marker => {
        const tooltip = marker._tooltip;
        if (!tooltip || !tooltip._container) return;
        tooltip._container.style.marginTop = '';
    });
}

function setMarkerVisibility(marker, visible){
    if (!marker || !marker._icon) return;
    const labelEnabled = getLabelToggleState();

    if (visible){
        marker._icon.classList.remove('marker-hidden');
        setLabelVisibility(marker, labelEnabled);
    } else {
        marker._icon.classList.add('marker-hidden');
        setLabelVisibility(marker, false);
        try { marker.closePopup(); } catch(e){}
    }
}

function avoidLabelOverlap(){
    if (!map) return;
    if (!getLabelToggleState()) return;
    const visibleMarkers = [];
    [mallLayer, governmentLayer, parkLayer].forEach(layer => {
        layer.eachLayer(marker => {
            if (marker._icon && !marker._icon.classList.contains('marker-hidden')) {
                visibleMarkers.push(marker);
            }
        });
    });

    const currentZoom = map.getZoom();
    
    // At high zoom (17+), keep all labels visible and keep labels anchored to their markers
    if (currentZoom >= 17) {
        visibleMarkers.forEach(marker => {
            setLabelVisibility(marker, true);
            resetLabelShift(marker);
        });
        return;
    }
    
    // Minimum distance between labels decreases as you zoom in
    // More space at lower zoom (fewer labels) -> less space at higher zoom (more labels)
    let minDistance = 0;
    if (currentZoom <= 14) {
        minDistance = Infinity; // Hide all labels
    } else if (currentZoom === 15) {
        minDistance = 180;
    } else if (currentZoom === 16) {
        minDistance = 130;
    } else if (currentZoom === 17) {
        minDistance = 90;
    } else if (currentZoom === 18) {
        minDistance = 60;
    } else {
        minDistance = 40;
    }

    const shownLabels = [];

    // Process markers in order - show label if it doesn't collide with already-shown labels
    visibleMarkers.forEach(marker => {
        const point = map.latLngToLayerPoint(marker.getLatLng());
        
        // Check if this label would overlap with any already-shown label
        const hasCollision = shownLabels.some(shownPoint => {
            const dx = point.x - shownPoint.x;
            const dy = point.y - shownPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < minDistance;
        });

        if (hasCollision) {
            setLabelVisibility(marker, false);
        } else {
            setLabelVisibility(marker, true);
            shownLabels.push(point);
        }
    });
}

function updateMarkersByFilters(){
    const typeState = getTypeFilterState();
    const featureFilters = getSelectedFeatureFilters();

    const allLocations = [
        ...mall.map(loc => ({...loc, layer: 'mall'})),
        ...government.map(loc => ({...loc, layer: 'government'})),
        ...parks.map(loc => ({...loc, layer: 'park'}))
    ];

    allLocations.forEach(location => {
        const typeVisible = (location.layer === 'mall' && typeState.mall)
            || (location.layer === 'government' && typeState.government)
            || (location.layer === 'park' && typeState.park);

        const featureVisible = locationHasFeatures(location, featureFilters);
        const visible = typeVisible && featureVisible;

        setMarkerVisibility(location.marker, visible);
    });

    if (map && map.getZoom && map.getZoom() > 14) {
        avoidLabelOverlap();
    }
}

function hideLayer(layer){
    layer.eachLayer(marker => {
        if (marker._icon) {
            marker._icon.classList.add('marker-hidden');
            marker._icon.classList.remove('active');
            marker._icon.classList.remove('clicked');
        }
        setLabelVisibility(marker, false);
        try { marker.closePopup(); } catch(e){}
    });
}

function showLayer(layer){
    layer.eachLayer(marker => {
        if (marker._icon) {
            marker._icon.classList.remove('marker-hidden');
        }
        setLabelVisibility(marker, true);
    });
    avoidLabelOverlap();
}

function toggleLayer(layer, checkbox){
    if (checkbox.checked){
        map.addLayer(layer);
    } else {
        map.removeLayer(layer);
    }
    updateMarkersByFilters();
}

const zoomOverlay = document.getElementById('zoomOverlay');

function updateZoomOverlay() {
    if (!zoomOverlay || !map) return;
    if (map.getZoom() < 15) {
        zoomOverlay.classList.add('active');
    } else {
        zoomOverlay.classList.remove('active');
    }
}

map.on('zoomend', function(){
    if (map.getZoom() <= 14){
        hideLayer(mallLayer);
        hideLayer(governmentLayer);
        hideLayer(parkLayer);
        map.closePopup();
    } else {
        showLayer(mallLayer);
        showLayer(governmentLayer);
        showLayer(parkLayer);
        updateMarkersByFilters();
        avoidLabelOverlap();
    }
    updateZoomOverlay();
});

map.on('zoom', updateZoomOverlay);

// Initialize overlay state after map creation
updateZoomOverlay();

// Feature checkbox listeners
Array.from(document.querySelectorAll('.feature-filter')).forEach(checkbox => {
    checkbox.addEventListener('change', updateMarkersByFilters);
});

const labelToggleCheckbox = document.getElementById('labelToggle');
if (labelToggleCheckbox) {
    labelToggleCheckbox.addEventListener('change', function(){
        updateMarkersByFilters();
        if (map && map.getZoom && map.getZoom() > 14) {
            avoidLabelOverlap();
        }
    });
}

function getAllLocations(){
    return [
        ...mall.map(loc => ({...loc, layer: 'mall'})),
        ...government.map(loc => ({...loc, layer: 'government'})),
        ...parks.map(loc => ({...loc, layer: 'park'}))
    ];
}

function clearSearchResults(){
    const resultBox = document.querySelector('.search-box .result-box');
    const resultList = document.getElementById('resultList');
    if(resultList) resultList.innerHTML = '';
    if(resultBox) resultBox.style.display = 'none';
}

function maybeOpenLocation(location){
    if(!location) return;

    const state = getTypeFilterState();
    if((location.layer === 'mall' && !state.mall) ||
       (location.layer === 'government' && !state.government) ||
       (location.layer === 'park' && !state.park)){
        const id = location.layer === 'mall' ? 'filterMalls' : location.layer === 'government' ? 'filterGovernment' : 'filterParks';
        const checkbox = document.getElementById(id);
        if(checkbox){
            checkbox.checked = true;
            if(location.layer === 'mall') map.addLayer(mallLayer);
            if(location.layer === 'government') map.addLayer(governmentLayer);
            if(location.layer === 'park') map.addLayer(parkLayer);
            updateMarkersByFilters();
        }
    }

    if(location.marker){
        setMarkerVisibility(location.marker, true);
        map.setView(location.coords, 16, {animate: true});
        location.marker.openPopup();
    }
}

function findLocationBySearch(query){
    const normalized = (query || '').trim().toLowerCase();
    const all = getAllLocations();
    if(!normalized) return null;

    // exact match first
    let matched = all.find(loc => loc.name.toLowerCase() === normalized);
    if(matched) return matched;

    // starts with
    matched = all.find(loc => loc.name.toLowerCase().startsWith(normalized));
    if(matched) return matched;

    // contains
    matched = all.find(loc => loc.name.toLowerCase().includes(normalized));
    if(matched) return matched;

    // optional partial word scoring
    const terms = normalized.split(/\s+/);
    let best = null;
    let bestScore = 0;
    all.forEach(loc => {
        const name = loc.name.toLowerCase();
        let score = 0;
        terms.forEach(t => { if(name.includes(t)) score += 1; });
        if(score > bestScore){ bestScore = score; best = loc; }
    });
    return bestScore > 0 ? best : null;
}

function updateSearchSuggestions(){
    const input = document.getElementById('searchInput');
    const query = (input && input.value || '').trim().toLowerCase();
    const resultList = document.getElementById('resultList');
    const resultBox = document.querySelector('.search-box .result-box');

    if(!resultList || !resultBox){ return; }

    if(!query){
        resultList.innerHTML = '';
        resultBox.style.display = 'none';
        return;
    }

    const all = getAllLocations();
    const matches = all.filter(loc => loc.name.toLowerCase().includes(query)).slice(0, 7);

    if(!matches.length){
        resultList.innerHTML = '<li>No results found</li>';
        resultBox.style.display = 'block';
        return;
    }

    resultList.innerHTML = matches.map(loc => `<li data-name="${loc.name}">${loc.name}</li>`).join('');
    resultBox.style.display = 'block';

    resultList.querySelectorAll('li[data-name]').forEach(li => {
        li.addEventListener('click', function() {
            const selectedName = this.getAttribute('data-name');
            if(!selectedName) return;
            if(document.getElementById('searchInput')){
                document.getElementById('searchInput').value = selectedName;
            }
            clearSearchResults();
            const target = getAllLocations().find(loc => loc.name === selectedName);
            maybeOpenLocation(target);
        });
    });
}

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
if(searchInput){
    searchInput.addEventListener('input', updateSearchSuggestions);
    searchInput.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            const target = findLocationBySearch(searchInput.value);
            if(target){
                maybeOpenLocation(target);
                clearSearchResults();
            }
        }
    });
}
if(searchBtn){
    searchBtn.addEventListener('click', function(){
        const target = findLocationBySearch(searchInput.value);
        if(target){
            maybeOpenLocation(target);
            clearSearchResults();
        }
    });
}

// Function to center the popup on the screen
window.centerPopupOnScreen = function() {
    setTimeout(() => {
        const popup = document.querySelector('.leaflet-popup-content');
        if (popup) {
            const rect = popup.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const popupCenterX = rect.left + rect.width / 2;
            const popupCenterY = rect.top + rect.height / 2;
            const viewportCenterX = viewportWidth / 2;
            const viewportCenterY = viewportHeight / 2;
            const panX = popupCenterX - viewportCenterX;
            const panY = popupCenterY - viewportCenterY;
            map.panBy([panX, panY]);
        }
    }, 200);
};

// Call once at init
updateMarkersByFilters();
map.on('moveend', function(){
    if (map.getZoom() > 14) {
        avoidLabelOverlap();
    }
});

/*
$('#bootstrapForm').submit(function (event) {
    event.preventDefault()
    var extraData = {}
    $('#bootstrapForm').ajaxSubmit({
        data: extraData,
        dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
        error: function () {
            // Submit of form should be successful but JSONP callback will fail because Google Forms
            // does not support it, so this is handled as a success.
            alert("Form successfully submitted!");
            // You can also redirect the user to a custom thank-you page:
            // window.location = 'http://www.mydomain.com/thankyoupage.html'
        }
    })
})*/

// Preloader hide on window load
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});