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
