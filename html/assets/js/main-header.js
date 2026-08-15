async function loadPartial(element, path) {
    if (!element) {
        return;
    }

    try {
        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }

        element.innerHTML = await response.text();
    } catch (err) {
        console.error(`Failed to load partial ${path}:`, err);
        // Graceful fallback UI
        element.innerHTML = '<div class="partial-fallback">Content unavailable</div>';
    }
}

async function loadSiteHeader() {
    const headerMount = document.querySelector('[data-header]');
    const footerMount = document.querySelector('[data-footer]');

    await Promise.all([
        loadPartial(headerMount, './header.html'),
        loadPartial(footerMount, './footer.html')
    ]);

    if (headerMount) {
        const activePage = document.body.dataset.page;
        const activeLink = activePage ? headerMount.querySelector(`[data-nav="${activePage}"]`) : null;

        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load header/footer after DOM is ready so mounts exist
    loadSiteHeader().catch((error) => {
        console.error('Failed to load shared site content:', error);
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function() {
            // Toggle the 'active' class to show/hide the menu on mobile
            navLinks.classList.toggle('active');
        });
    }
});