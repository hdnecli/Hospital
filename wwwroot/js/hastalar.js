let page = 1;
let cachedSearch = sessionStorage.getItem('searchQueryHasta');

document.querySelector('#infinite-table').addEventListener('scroll', function() {
    cachedSearch = sessionStorage.getItem('searchQueryHasta');
    if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        page++; 

        //let search = encodeURIComponent(document.querySelector('#search-bar').value);
        let url = `/HastaIslemleri/Index?search=${cachedSearch}&page=${page}`;

        fetch(url)
        .then(response => response.text())
        .then(data => {
            // Yeni verileri mevcut olanın altına ekliyoruz
            const newContent = new DOMParser().parseFromString(data, 'text/html').getElementById('hastalar').innerHTML;
            document.getElementById('hastalar').insertAdjacentHTML('beforeend', newContent);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
});

document.addEventListener('DOMContentLoaded', function(){
    const searchBar = document.getElementById('search-bar');
    if (cachedSearch) {
        searchBar.value = cachedSearch;
    }
    searchBar.addEventListener('input', function() {
        sessionStorage.setItem('searchQueryHasta', searchBar.value);
    });
});

document.querySelectorAll('.action-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        const panel = this.nextElementSibling;
        // Diğer panelleri kapat
        document.querySelectorAll('.action-panel').forEach(p => {
            if (p !== panel) p.style.display = 'none';
        });
        // Paneli aç veya kapat
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
});

// Panel dışında bir yere tıklanınca panelin kapanmasını sağla
window.addEventListener('click', function(event) {
    if (!event.target.matches('.action-btn')) {
        document.querySelectorAll('.action-panel').forEach(panel => {
            panel.style.display = 'none';
        });
    }
});

document.querySelectorAll('.tanı-ekle').forEach(function(button) {
    button.addEventListener('click', function() {
        const hastaID = this.getAttribute('data-hasta-id');
        const page = 1; 
        const isFavorite = false; 
        const url = `/Tani/Index?page=${page}&isFavorites=${isFavorite}&hastaID=${hastaID}`;
     
        window.location.href = url;
    });
});

document.querySelectorAll('.recete-yaz').forEach(function(button) {
    button.addEventListener('click', function(){
        const hastaID = this.getAttribute('data-hasta-id');
        const url = `/Recete/Index?hastaID=${hastaID}`;
        window.location.href = url;
    });
});
