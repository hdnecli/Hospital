// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
let page = 1;
const selectedTanilar = new Set(); // Set to keep track of selected tanilar
const allCheckboxes = {}; // Object to keep track of all checkboxes
var cachedSearch = sessionStorage.getItem('searchQuery');
const searchBar = document.getElementById('search-bar');

function showAll() {
    searchBar.value = '';
    sessionStorage.setItem('searchQuery', '');
    sessionStorage.removeItem('searchQuery');
    fetchMoreTanilar(true);
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
    taniItem.innerHTML = `
        ${code} - ${name} 
        <span class="favoriteTani" onclick="toggleFavorite(${id}, this)">[☆]</span>
        <span class="removeTani" onclick="removeTani(this)">[Sil]</span>`;
    document.getElementById('selectedList').appendChild(taniItem);
}

function toggleFavorite(taniId, element) {
    const isFavorite = element.textContent === '[★]';
    const url = isFavorite ? '/Tani/RemoveFromFavorites' : '/Tani/AddToFavorites';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
        },
        body: JSON.stringify({ id: taniId })
    }).then(response => {
        if (response.ok) {
            element.textContent = isFavorite ? '[☆]' : '[★]'; // Toggle the star symbol
        }
    });
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

function fetchMoreTanilar(isdefault) {
    if (isdefault) {
        page = 1;
    }
    else {
        ++page;
    }
    let url = `/Tani/Index?search=${cachedSearch}&page=${page}`;
    if (cachedSearch === null) {
        url = `/Tani/Index?page=${page}`;
    }
    fetch(url)
        .then(response => response.text())
        .then(data => {
            // Yeni verileri mevcut olanın altına ekliyoruz
            if (isdefault) {
                document.getElementById('tanilar').innerHTML = '';
            }
            const newContent = new DOMParser().parseFromString(data, 'text/html').getElementById('tanilar').innerHTML;
            document.getElementById('tanilar').insertAdjacentHTML('beforeend', newContent);
            restoreCheckboxState(); // Restore checkbox states after fetching more tanilar
        });
}

// Restore checkbox state for already selected tanilar
function restoreCheckboxState() {
    const allTanilarCheckboxes = document.querySelectorAll('#tanilar input[type="checkbox"]');
    allTanilarCheckboxes.forEach(checkbox => {
        const taniId = checkbox.value;
        if (selectedTanilar.has(taniId)) {
            checkbox.disabled = true;
            checkbox.checked = true;
        }
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
        restoreCheckboxState(); // Update checkbox states on change
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde, cache'den (sessionStorage) veriyi al ve input'a yerleştir
    if (cachedSearch) {
        searchBar.value = cachedSearch;
    }

    // Kullanıcı input girişi yaptığında veya değiştirdiğinde cache'i güncelle ve scroll'u kontrol et
    searchBar.addEventListener('input', function() {
        sessionStorage.setItem('searchQuery', searchBar.value);
        //document.getElementById('search-form').submit();
    });

    const checkboxes = document.querySelectorAll('#tanilar input[type="checkbox"]');

    // Sayfa yüklendiğinde sessionStorage'daki değerleri kontrol et
    checkboxes.forEach(checkbox => {
        if (sessionStorage.getItem(checkbox.id)) {
            checkbox.checked = true;
        }
    });

    // Checkbox'lar değiştiğinde sessionStorage'ı güncelle
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                sessionStorage.setItem(this.id, 'true'); // Checkbox işaretliyse sessionStorage'a ekle
            } else {
                sessionStorage.removeItem(this.id); // Checkbox işaretli değilse sessionStorage'dan sil
            }
        });
    });
});

