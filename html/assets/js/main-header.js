async function loadPartial(element, path) {
    if (!element) {
        return;
    }

    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
    }

    element.innerHTML = await response.text();
}

async function loadSiteHeader() {
    const headerMount = document.querySelector('[data-site-header]');
    const footerMount = document.querySelector('[data-site-footer]');

    await Promise.all([
        loadPartial(headerMount, '/header.html'),
        loadPartial(footerMount, '/footer.html')
    ]);

    if (headerMount) {
        const activePage = document.body.dataset.page;
        const activeLink = activePage ? headerMount.querySelector(`[data-nav="${activePage}"]`) : null;

        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

loadSiteHeader().catch((error) => {
    console.error('Failed to load shared site content:', error);
});
