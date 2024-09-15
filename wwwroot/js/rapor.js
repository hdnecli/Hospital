const urlParams = new URLSearchParams(window.location.search);
const hastaNo = urlParams.get('hastaNo');

function openTani() {
    const url = `/Tani/Index?hastaNo=${hastaNo}`;
    window.location.href = url;
}