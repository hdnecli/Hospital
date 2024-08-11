// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let page = 1;
const pageSize = 10;
const selectedTanilar = new Set(); // Set to keep track of selected tanilar
const allCheckboxes = {}; // Object to keep track of all checkboxes

function showAll() {
    document.getElementById('tanilar').style.display = 'block';
    document.getElementById('favorites').style.display = 'none';
}

function showFavorites() {
    document.getElementById('tanilar').style.display = 'none';
    document.getElementById('favorites').style.display = 'block';
}

function addSelectedTanilar() {
    const selectedCheckboxesElements = document.querySelectorAll('#tanilar input[type="checkbox"]:checked');
    selectedCheckboxesElements.forEach(checkbox => {
        const taniId = checkbox.value;
        if (selectedTanilar.has(taniId)) return; // Skip if already added

        const taniSpan = checkbox.nextElementSibling; // Use nextElementSibling to get the span
        if (taniSpan) {
            const taniCodeAndName = taniSpan.textContent.trim();
            const [taniCode, taniName] = taniCodeAndName.split(' - ');
            addToSelected(taniId, taniName, taniCode);
            selectedTanilar.add(taniId); // Add to the set
            allCheckboxes[taniId] = checkbox; // Store checkbox reference
            checkbox.disabled = true; // Disable checkbox to prevent re-selection
        }
    });
}

function addToSelected(id, name, code) {
    const taniItem = document.createElement('div');
    taniItem.dataset.id = id; // Store the ID in a data attribute
    taniItem.innerHTML = `${code} - ${name} <span class="removeTani" onclick="removeTani(this)">[Sil]</span>`;
    document.getElementById('selectedList').appendChild(taniItem);
}

function removeTani(element) {
    const item = element.parentElement;
    const taniId = item.dataset.id; // Retrieve the ID from the data attribute

    // Remove from the selected tanilar set
    selectedTanilar.delete(taniId);

    // Remove item from the selected list
    item.remove();

    // Re-enable the corresponding checkbox
    if (allCheckboxes[taniId]) {
        allCheckboxes[taniId].checked = false; // Uncheck the box
        allCheckboxes[taniId].disabled = false; // Re-enable the checkbox
    }
}

function fetchMoreTanilar() {
    const url = `/Tani/Index?search=&page=${++page}`;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const newContent = new DOMParser().parseFromString(data, 'text/html').getElementById('tanilar').innerHTML;
            document.getElementById('tanilar').innerHTML += newContent;
            disableCheckboxes(); // Update checkbox states after fetching more tanilar
        });
}

// Infinite scrolling functionality
document.querySelector('.tanilar-container').addEventListener('scroll', function() {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        fetchMoreTanilar();
    }
});

// Event listener for checkbox changes
document.querySelector('#tanilar').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        disableCheckboxes(); // Update checkbox states on change
    }
});

