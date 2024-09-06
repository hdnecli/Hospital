// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function handlePathChange() {
    const currentPath = window.location.pathname;
    const previousPath = sessionStorage.getItem('previousPath');

    if (previousPath && previousPath !== currentPath && !currentPath.startsWith('/Recete')) {
        const selectedValue = sessionStorage.getItem('selected');
        sessionStorage.clear();
        if (selectedValue) {
            sessionStorage.setItem('selected', selectedValue);
        }
    }

    sessionStorage.setItem('previousPath', currentPath);
}

document.addEventListener('DOMContentLoaded', handlePathChange);
window.addEventListener('popstate', handlePathChange);

