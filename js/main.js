document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cube-logo').forEach(cube => {
        cube.addEventListener('click', function(e) {
            e.preventDefault();
            const cubeName = this.getAttribute('data-cube');
            loadCubeIframe(cubeName);
        });
    });
});

function loadCubeIframe(cubeName) {
    const cubeContainer = document.getElementById('cube-container');
    const bannerSpace = document.getElementById('banner-space');

    // Clear previous content
    bannerSpace.innerHTML = '';
    cubeContainer.innerHTML = '';

    // Define URLs for each banner
    const urls = [
        "https://www.un.org/sustainabledevelopment/fr/poverty/",
        "https://www.un.org/sustainabledevelopment/fr/hunger/",
        "https://www.un.org/sustainabledevelopment/fr/health/",
        "https://www.un.org/sustainabledevelopment/fr/education/",
        "https://www.un.org/sustainabledevelopment/fr/gender-equality/",
        "https://www.un.org/sustainabledevelopment/fr/water-and-sanitation/",
        "https://www.un.org/sustainabledevelopment/fr/energy/",
        "https://www.un.org/sustainabledevelopment/fr/economic-growth/",
        "https://www.un.org/sustainabledevelopment/fr/infrastructure/",
        "https://www.un.org/sustainabledevelopment/fr/inequality/",
        "https://www.un.org/sustainabledevelopment/fr/cities/",
        "https://www.un.org/sustainabledevelopment/fr/sustainable-consumption-production/",
        "https://www.un.org/sustainabledevelopment/fr/climate-change-2/",
        "https://www.un.org/sustainabledevelopment/fr/oceans/",
        "https://www.un.org/sustainabledevelopment/fr/biodiversity/",
        "https://www.un.org/sustainabledevelopment/fr/peace-justice/",
        "https://www.un.org/sustainabledevelopment/fr/globalpartnerships/"
    ];

    // Create a new anchor element for the banner link
    const bannerLink = document.createElement('a');
    const bannerIndex = parseInt(cubeName.slice(3)) - 1;
    bannerLink.href = urls[bannerIndex];
    bannerLink.target = '_blank'; // Ensures the link opens in a new tab

    // Create a new banner for the specific cube
    const banner = document.createElement('img');
    banner.src = `img/Webbanderollesodd/b${cubeName.slice(3)}.jpg`;
    banner.alt = `Banner for ${cubeName}`;
    banner.classList.add('img-fluid');
    banner.style.width = '100%'; // Ensures the banner fills the width

    // Append banner to link, and then link to the banner space
    bannerLink.appendChild(banner);
    bannerSpace.appendChild(bannerLink);

    // Create a new iframe for the specific cube
    const iframe = document.createElement('iframe');
    iframe.src = `${cubeName}/index.html`;
    iframe.style.width = '100%';
    iframe.style.height = '100%'; // Uses all available height
    iframe.frameBorder = '0';
    cubeContainer.appendChild(iframe);
}
