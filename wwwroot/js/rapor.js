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
});

document.querySelectorAll('.rapor-btn').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.rapor-btn').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
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
}