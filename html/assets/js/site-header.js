async function loadSiteHeader() {
    const headerMount = document.querySelector('[data-site-header]');

    if (!headerMount) {
        return;
    }

    const response = await fetch('/header.html');
    headerMount.innerHTML = await response.text();

    const activePage = document.body.dataset.page;
    const activeLink = activePage ? headerMount.querySelector(`[data-nav="${activePage}"]`) : null;

    if (activeLink) {
        activeLink.classList.add('active');
    }
}

loadSiteHeader().catch((error) => {
    console.error('Failed to load shared site header:', error);
});
