const urlParams = new URLSearchParams(window.location.search);
const hastaNo = urlParams.get('hastaNo');

function openTani() {
    const url = `/Tani/Index?hastaNo=${hastaNo}`;
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('rapor-notu');
    const charCountDisplay = document.getElementById('char-count');
    const selected = JSON.parse(sessionStorage.getItem('selected'));
    
    textarea.addEventListener('input', function() {
        const charCount = this.value.length;
        charCountDisplay.textContent = `${charCount} / 3000`;
    });

    if(selected){
        selected.forEach(tani => {
            if(tani.isSelected){
                addToSelected(tani.id.replace("tani_",""), tani.name, tani.code);
            }
        });
    }

    const form = document.querySelector('form');
    const tanilarInput = document.getElementById('Tanilar');

    function updateTanilarInput() {
        const seciliTanilar = Array.from(document.querySelectorAll('#selectedList input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.nextElementSibling.textContent.split(' - ')[0].trim());
        document.getElementById('Tanilar').value = seciliTanilar.join(', ');
    }

    document.getElementById('selectedList').addEventListener('change', updateTanilarInput);

    document.getElementById('kaydetBtn').addEventListener('click', function(e) {
        e.preventDefault();

        const raporBitiminde = document.querySelector('.rapor-btn.active').dataset.type;
        document.getElementById('RaporBitiminde').value = raporBitiminde;

        updateTanilarInput();

        form.submit();
    });

    document.getElementById('kaydetYazdirBtn').addEventListener('click', function(e) {
        e.preventDefault();

        const raporBitiminde = document.querySelector('.rapor-btn.active').dataset.type;
        document.getElementById('RaporBitiminde').value = raporBitiminde;

        updateTanilarInput();

        var form = document.getElementById('raporForm');
        form.action = '/Rapor/RaporYazdir';
        form.submit();
    });

    // Rapor Bitiminde butonlarının işlevselliği
    document.querySelectorAll('#raporTurBtnGroup .rapor-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#raporTurBtnGroup .rapor-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            document.getElementById('RaporBitiminde').value = this.getAttribute('data-type');
        });
    });
});

function addToSelected(id, name, code) {
    const taniItem = document.createElement('div');
    taniItem.dataset.id = id;
    taniItem.dataset.code = code;

    taniItem.innerHTML = `
        <input type="checkbox" id="tani_${id}" checked>
        <label for="tani_${id}">${code} - ${name}</label>`;
    
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

    updateTanilarInput();
}

function updateTanilarInput() {
    const seciliTanilar = Array.from(document.querySelectorAll('#selectedList input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.nextElementSibling.textContent.split(' - ')[0].trim());
    document.getElementById('Tanilar').value = seciliTanilar.join(', ');
}

document.querySelectorAll('.rapor-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.rapor-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

function openTani() {
    const url = `/Tani/Index?hastaNo=${hastaNo}`;
    window.location.href = url;
}