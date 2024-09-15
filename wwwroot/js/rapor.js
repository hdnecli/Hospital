const urlParams = new URLSearchParams(window.location.search);
const hastaNo = urlParams.get('hastaNo');

function openTani() {
    const url = `/Tani/Index?hastaNo=${hastaNo}`;
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('rapor-notu');
    const charCountDisplay = document.getElementById('char-count');
    
    textarea.addEventListener('input', function() {
        const charCount = this.value.length;
        charCountDisplay.textContent = `${charCount} / 3000`;
    });
});