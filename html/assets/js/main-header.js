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
    const headerMount = document.querySelector('[data-header]');
    const footerMount = document.querySelector('[data-footer]');

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

document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function() {
            // Toggle the 'active' class to show/hide the menu on mobile
            navLinks.classList.toggle('active');
        });
    }
});