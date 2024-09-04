// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const previousPath = sessionStorage.getItem('previousPath');

    if (previousPath && previousPath !== currentPath && !currentPath.startsWith('/Recete')) {
        sessionStorage.clear();
    }

    sessionStorage.setItem('previousPath', currentPath);
});

window.addEventListener('popstate', function() {
    const currentPath = window.location.pathname;
    const previousPath = sessionStorage.getItem('previousPath');

    if (previousPath && previousPath !== currentPath && !currentPath.startsWith('/Recete')) {
        sessionStorage.clear();
    }

    sessionStorage.setItem('previousPath', currentPath);
});

