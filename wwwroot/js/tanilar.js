let page = 1;
const selectedTanilar = new Set(); // Set to keep track of selected tanilar
const allCheckboxes = {}; // Object to keep track of all checkboxes
let cachedSearch = sessionStorage.getItem('searchQuery');
const searchBar = document.getElementById('search-bar');

// Sayfa yüklendiğinde sessionStorage'dan isFavorites değerini al ve input'a ayarla
window.onload = function() {
    const isFavoritesValue = sessionStorage.getItem('isFavorites');
    if (isFavoritesValue !== null) {
        document.getElementById('isFavorites').value = isFavoritesValue;
    }
};

function showAll() {
    searchBar.value = '';
    sessionStorage.removeItem('searchQuery');
    setIsFavorites('false');
}

function showFavorites() {
    searchBar.value = '';
    sessionStorage.removeItem('searchQuery');
    setIsFavorites('true');
}

function setIsFavorites(value) {
    document.getElementById('isFavorites').value = value;
    document.getElementById('search-form').submit(); // Submit the form to get the new tanilar
    sessionStorage.setItem('isFavorites', value);
}

function moveToRecete() {
    const urlParams = new URLSearchParams(window.location.search);
    const hastaID = urlParams.get('hastaID');
    const url = `/Recete/Index?hastaID=${hastaID}`;
    window.location.href = url;
}

function addSelectedTanilar() {
    const selectedCheckboxesElements = JSON.parse(sessionStorage.getItem('selected'));
    selectedCheckboxesElements.forEach(checkbox => {
        const taniId = checkbox.id;
        const taniName = checkbox.name;
        const taniCode = checkbox.code;

        if (selectedCheckboxesElements.find(x => x.id === taniId && x.isSelected === true)) {
            return;
        }
        const domCheckbox = document.getElementById(`${taniId}`); // Retrieve the checkbox element
        domCheckbox.checked = true; // Check the checkbox
        domCheckbox.disabled = true; // Disable the checkbox

        checkFavorite(taniId.replace("tani_","")).then(isDBFavorite => {
            addToSelected(taniId, taniName, taniCode, isDBFavorite);
        });
        checkbox.isSelected = true; // Set isSelected property to true
    });
    sessionStorage.setItem('selected', JSON.stringify(selectedCheckboxesElements)); // Update sessionStorage with the new selected tanilar
}

function addToSelected(id, name, code, isDBFavorite) {
    const taniItem = document.createElement('div');
    taniItem.dataset.id = id;

    // Yıldızı isDBFavorite durumuna göre belirleyelim
    const star = isDBFavorite ? '[★]' : '[☆]';

    taniItem.innerHTML = `
        ${code} - ${name} 
        <span class="favoriteTani" onclick="toggleFavorite(${id}, this)">${star}</span>
        <span class="removeTani" onclick="removeTani(this)">[Sil]</span>`;

    const selectedList = document.getElementById('selectedList');
    let added = false;

    // Tanıyı doğru sıraya göre ekle
    for (let child of selectedList.children) {
        if (child.dataset.id > id) {
            selectedList.insertBefore(taniItem, child);
            added = true;
            break;
        }
    }

    // Eğer uygun yer bulunmazsa, sonuna ekle
    if (!added) {
        selectedList.appendChild(taniItem);
    }
}

function toggleFavorite(taniId, element) {
    const isFavorite = element.textContent === '[★]';
    let url = isFavorite ? '/Tani/RemoveFromFavorites' : '/Tani/AddToFavorites';
    url += `?id=${taniId.value}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({ id: taniId.value })
    }).then(response => {
        if (response.ok) {
            element.textContent = isFavorite ? '[☆]' : '[★]'; // Toggle the star symbol
        }
    });
}

function checkFavorite(taniId) {
    const url = `/Tani/IsFavorite?id=${taniId}`;
    return fetch(url)
    .then(response => response.json())    
    .then(data => {
        return data.isFavorite;
    });
}

function removeTani(element) {
    const item = element.parentElement;
    const taniId = item.dataset.id; // Retrieve the ID from the data attribute
    const selected = JSON.parse(sessionStorage.getItem('selected'));
    const index = selected.findIndex(x => x.id === taniId); // Find the index of the item in the selected array
    if(index !== -1){
        selected.splice(index, 1); // Remove the item from the selected array
    }  // Remove the item from the selected array

    // Remove item from the selected list
    item.remove();

    const checkbox = document.getElementById(`${taniId}`); // Retrieve the checkbox element
    checkbox.checked = false; // Uncheck the checkbox
    checkbox.disabled = false; // Enable the checkbox
    sessionStorage.setItem('selected', JSON.stringify(selected)); // Update sessionStorage with the new selected tanilar
}

function fetchMoreTanilar(isdefault, isFavorite) {
    cachedSearch = sessionStorage.getItem('searchQuery');
    if (isdefault) {
        page = 1;
    }
    else {
        ++page;
    }
    let url = `/Tani/Index?search=${cachedSearch}&page=${page}&isFavorites=${isFavorite}`;
    if (cachedSearch === null) {
        url = `/Tani/Index?page=${page}&isFavorites=${isFavorite}`;
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

// Infinite scrolling functionality tanilar
document.querySelector('.tanilar-container').addEventListener('scroll', function() {
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        if (document.getElementById('isFavorites').value === 'true') {
            fetchMoreTanilar(false, true);
        }
        else {
            fetchMoreTanilar(false, false);
        }
    }
});

// Event listener for checkbox changes
document.querySelector('#tanilar').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        restoreCheckboxState(); // Update checkbox states on change
    }
});

document.addEventListener('DOMContentLoaded', function() {
    let selected = JSON.parse(sessionStorage.getItem('selected'));
    if (selected) {
        selected.forEach(checkbox => {
            const domCheckbox = document.getElementById(`${checkbox.id}`); // Retrieve the checkbox element
            if (domCheckbox) {
                domCheckbox.checked = true; // Uncheck the checkbox
            }
            if (checkbox.isSelected) {
                checkFavorite(checkbox.id.replace("tani_","")).then(isDBFavorite => {
                    addToSelected(checkbox.id, checkbox.name, checkbox.code, isDBFavorite);
                });
                if (domCheckbox) {
                    domCheckbox.disabled = true; // Uncheck the checkbox
                }
            } 
        }); // Update checkbox states on page load
    } 
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
            let selected = JSON.parse(sessionStorage.getItem('selected'));
            if (!selected) {
                selected = [];
            }
            if (this.checked) {
                const taniSpan = checkbox.nextElementSibling; // Use nextElementSibling to get the span
                if (taniSpan) {
                    const taniCodeAndName = taniSpan.textContent.trim();
                    var [taniCode, taniName] = taniCodeAndName.split(' - ');
                }
                selected.push({ id: this.id, isSelected: false, code: taniCode, name: taniName}); // Checkbox işaretliyse sessionStorage'a ekle
            } else {
                selected.find((x, index) => {if(x.id === this.id){
                    selected.splice(index, 1); // Remove the item from the selected array
                }}); 
            }
            sessionStorage.setItem('selected', JSON.stringify(selected));
        });
    });
});