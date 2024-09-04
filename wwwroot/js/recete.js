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
    const urlParams = new URLSearchParams(window.location.search);
    const hastaID = urlParams.get('hastaID');
    const url = `/Tani/Index?hastaID=${hastaID}`;
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
});

function addToSelected(id, name, code) {
    const taniItem = document.createElement('div');
    taniItem.dataset.id = id;

    taniItem.innerHTML = `
        ${code} - ${name} `;
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