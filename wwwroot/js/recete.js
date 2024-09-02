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
});