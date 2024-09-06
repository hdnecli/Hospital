const urlParams = new URLSearchParams(window.location.search);
const hastaNo = urlParams.get('hastaNo');

document.querySelectorAll('.recete-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.recete-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

function openLink() {
    const url = "https://recetem.enabiz.gov.tr/"; 
    window.open(url, '_blank'); 
}

function openTani() {
    const url = `/Tani/Index?hastaNo=${hastaNo}`;
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
    var textarea = document.getElementById('ilac-aciklama');
    var charCountDisplay = document.getElementById('char-count');

    textarea.addEventListener('input', function() {
        var charCount = textarea.value.length;
        charCountDisplay.textContent = charCount + ' / 3000';
    });

    const selected = JSON.parse(sessionStorage.getItem('selected'));
    if(selected){
        selected.forEach(tani => {
            if(tani.isSelected){
                addToSelected(tani.id.replace("tani_",""), tani.name, tani.code);
            }
        });
    }

    var searchButton = document.getElementById('search-button');
    console.log('Search button:', searchButton);

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            araIlac();
        });
    } else {
        console.error('Ara butonu bulunamadı');
    }
});

function araIlac() {
    console.log('Ara butonuna tıklandı');
    var search = document.getElementById('search-bar').value;
    
    console.log('Arama:', search);
    console.log('Hasta No:', hastaNo);

    fetch(`/Recete/AraIlac?search=${encodeURIComponent(search)}&hastaNo=${hastaNo}`)
        .then(response => response.json())
        .then(data => {
            console.log('Gelen veri:', data);
            var ilacListesiBody = document.getElementById('ilac-list-body');
            ilacListesiBody.innerHTML = '';
            data.forEach(ilac => {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ilac.ilac_adi}</td>
                    <td>${ilac.kutu}</td>
                    <td>${ilac.doz}</td>
                    <td>${ilac.verilis_yolu}</td>
                    <td><button type="button" class="btn btn-primary btn-sm" onclick="ilacEkle(${ilac.id}, '${ilac.ilac_adi}')">Ekle</button></td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="ilacSil(${ilac.id})">Sil</button></td>
                `;
                ilacListesiBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function addToSelected(id, name, code) {
    const taniItem = document.createElement('div');
    taniItem.dataset.id = id;

    taniItem.innerHTML = `
        ${code} - ${name} `;
    const selectedList = document.getElementById('selectedList');
    let added = false;

    for (let child of selectedList.children) {
        if (child.dataset.id > id) {
            selectedList.insertBefore(taniItem, child);
            added = true;
            break;
        }
    }

    if (!added) {
        selectedList.appendChild(taniItem);
    }
}

function ilacEkle(ilacId, ilacAdi) {
    console.log("İlaç eklendi: " + ilacAdi);
}

function ilacSil(ilacId) {
    console.log("İlaç silindi: " + ilacId);
}