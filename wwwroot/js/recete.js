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
            data.ilaclar.forEach(ilac => {
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
                            ${data.verilisYollari.map(yol => `<option value="${yol.id}">${yol.adi}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <input type="number" class="periyot-input" min="1" max="10" value="1" data-ilac-id="${ilac.id}">
                        <select class="periyot-birim-select" data-ilac-id="${ilac.id}">
                            ${data.periyotBirimleri.map(birim => `<option value="${birim.id}">${birim.adi}</option>`).join('')}
                        </select>
                    </td>
                    <td><button type="button" class="btn btn-primary btn-sm" onclick="ilacEkle(${ilac.id}, '${ilac.ilac_adi}')">Ekle</button></td>
                    <td><button type="button" class="btn btn-danger btn-sm" onclick="ilacSil(${ilac.id})">Sil</button></td>
                `;
                ilacListesiBody.appendChild(row);
            });
            addInputListeners();
        })
        .catch(error => console.error('Error:', error));
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