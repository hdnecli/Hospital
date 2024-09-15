document.addEventListener('DOMContentLoaded', function() {
    const alerjiVarMiButtons = document.querySelectorAll('#alerjiVarMi .alerji-btn');
    const alerjiTurBtnGroup = document.getElementById('alerjiTurBtnGroup');
    const textarea = document.getElementById('alerji-aciklama');
    const charCountDisplay = document.getElementById('char-count');
    const alerjiAdiInput = document.getElementById('AlerjiAdi');

    textarea.addEventListener('input', function() {
        const charCount = this.value.length;
        charCountDisplay.textContent = `${charCount} / 3000`;
    });

    // Alerji türü butonları için olay dinleyicisi
    document.querySelectorAll('#alerjiTurBtnGroup .alerji-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            updateAlerjiAdiInput();
        });
    });

    function updateAlerjiAdiInput() {
        const seciliAlerjiTurleri = Array.from(document.querySelectorAll('#alerjiTurBtnGroup .alerji-btn.active'))
            .map(btn => btn.textContent.trim());
        alerjiAdiInput.value = seciliAlerjiTurleri.join(', ');
    }

    // Alerji var mı butonları için olay dinleyicisi
    alerjiVarMiButtons.forEach(button => {
        button.addEventListener('click', function() {
            const alerjiVarMi = this.getAttribute('data-type') === 'Var';
            alerjiTurBtnGroup.style.display = alerjiVarMi ? 'block' : 'none';
            
            alerjiVarMiButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (!alerjiVarMi) {
                document.querySelectorAll('#alerjiTurBtnGroup .alerji-btn').forEach(btn => btn.classList.remove('active'));
                alerjiAdiInput.value = '';
            } else {
                updateAlerjiAdiInput();
            }
        });
    });

    alerjiTurBtnGroup.style.display = 'none';

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const seciliAlerjiTurleri = Array.from(document.querySelectorAll('#alerjiTurBtnGroup .alerji-btn.active'))
            .map(btn => btn.textContent.trim());
        
        document.getElementById('AlerjiAdi').value = seciliAlerjiTurleri.join(', ');
        
        this.submit();
    });
});

