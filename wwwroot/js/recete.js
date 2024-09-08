const urlParams = new URLSearchParams(window.location.search);
const hastaNo = urlParams.get('hastaNo');

document.querySelectorAll('.recete-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.recete-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('ReceteTuru').value = this.dataset.type;
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

    const elektronikOnayCheckbox = document.getElementById('elektronikOnay');
    const kaydetBtn = document.getElementById('kaydetBtn');
    const kaydetYazdirBtn = document.getElementById('kaydetYazdirBtn');

    elektronikOnayCheckbox.addEventListener('change', function() {
        if (this.checked) {
            kaydetBtn.disabled = false;
            kaydetYazdirBtn.disabled = false;
        } else {
            kaydetBtn.disabled = true;
            kaydetYazdirBtn.disabled = true;
        }
    });

    kaydetBtn.addEventListener('click', function(event) {
        if (!elektronikOnayCheckbox.checked) {
            event.preventDefault();
            alert('Lütfen elektronik onay kutusunu işaretleyin.');
        } else {
            const seciliReceteTuru = document.querySelector('.recete-btn.active');
            if (seciliReceteTuru) {
                document.getElementById('ReceteTuru').value = seciliReceteTuru.dataset.type;
            } else {
                event.preventDefault();
                alert('Lütfen bir Reçete Türü seçin.');
            }
        }
    });

    kaydetYazdirBtn.addEventListener('click', function(event) {
        if (!elektronikOnayCheckbox.checked) {
            event.preventDefault();
            alert('Lütfen elektronik onay kutusunu işaretleyin.');
        }
    });
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
            updateIlacList(data.ilaclar, data.verilisYollari, data.periyotBirimleri);
        })
        .catch(error => console.error('Error:', error));
}

function updateIlacList(ilaclar, verilisYollari, periyotBirimleri) {
    var ilacListesiBody = document.getElementById('ilac-list');
    ilacListesiBody.innerHTML = '';
    
    if (ilaclar.length === 0) {
        ilacListesiBody.innerHTML = '<p>İlaç bulunamadı.</p>';
        return;
    }

    var table = document.createElement('table');
    table.className = 'table';
    
    var thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>İlaç Adı</th>
            <th>Kutu</th>
            <th>Doz</th>
            <th>Veriliş Yolu</th>
            <th>Periyot</th>
            <th>Ekle</th>
            <th>Sil</th>
        </tr>
    `;
    table.appendChild(thead);

    var tbody = document.createElement('tbody');
    ilaclar.forEach(ilac => {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td>${ilac.ilac_adi}</td>
            <td><input type="number" class="kutu-input" min="1" max="10" value="1" data-ilac-id="${ilac.id}"></td>
            <td>
                <input type="number" class="doz-input" min="1" max="10" value="1" data-ilac-id="${ilac.id}">
                X
                <input type="number" class="doz-input" min="1" max="10" value="1" data-ilac-id="${ilac.id}">
            </td>
            <td>
                <select class="verilis-yolu-select" data-ilac-id="${ilac.id}">
                    ${verilisYollari.map(yol => `<option value="${yol.id}">${yol.adi}</option>`).join('')}
                </select>
            </td>
            <td>
                <input type="number" class="periyot-input" min="1" max="10" value="1" data-ilac-id="${ilac.id}">
                <select class="periyot-birim-select" data-ilac-id="${ilac.id}">
                    ${periyotBirimleri.map(birim => `<option value="${birim.id}">${birim.adi}</option>`).join('')}
                </select>
            </td>
            <td><button type="button" class="btn btn-primary btn-sm" onclick="ilacEkle(${ilac.id}, '${ilac.ilac_adi}')">Ekle</button></td>
            <td><button type="button" class="btn btn-danger btn-sm" onclick="ilacSil(${ilac.id})">Sil</button></td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    ilacListesiBody.appendChild(table);
    addInputListeners();
}

function addInputListeners() {
    document.querySelectorAll('.kutu-input, .doz-input').forEach(input => {
        input.addEventListener('input', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    });
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
    const kutuInput = document.querySelector(`.kutu-input[data-ilac-id="${ilacId}"]`);
    const dozInputs = document.querySelectorAll(`.doz-input[data-ilac-id="${ilacId}"]`);
    const verilisYoluSelect = document.querySelector(`.verilis-yolu-select[data-ilac-id="${ilacId}"]`);
    const kutuMiktari = kutuInput ? kutuInput.value : 1;
    const doz1 = dozInputs[0] ? dozInputs[0].value : 1;
    const doz2 = dozInputs[1] ? dozInputs[1].value : 1;
    const verilisYolu = verilisYoluSelect ? verilisYoluSelect.options[verilisYoluSelect.selectedIndex].text : '';
    console.log(`İlaç eklendi: ID: ${ilacId}, İlaç: ${ilacAdi}, Kutu: ${kutuMiktari}, Doz: ${doz1} X ${doz2}, Veriliş Yolu: ${verilisYolu}`);
}

function ilacSil(ilacId) {
    console.log("İlaç silindi: " + ilacId);
}