document.addEventListener("DOMContentLoaded", function () {
    const widgetContainer = document.getElementById("widget-container");
    const themeContainers = {
        calendar: { container: document.getElementById("theme-buttons-container-calendar"), url: "https://bibek10550.github.io/calendar/", width: 453, height: 630 },
        commenting: { container: document.getElementById("theme-buttons-container-commenting"), url: "https://bibek10550.github.io/dailyQuote/", width: 640, height: 376 },
        music: { container: document.getElementById("theme-buttons-container-music"), url: "https://bibek10550.github.io/bibeksha/music.html", width: 420, height: 762 },
        linksaver: { container: document.getElementById("theme-buttons-container-linksaver"), url: "https://bibek10550.github.io/linksaver/", width: 330, height: 456 },
    };

    // Function to close all theme containers
    function closeAllThemeContainers() {
        Object.values(themeContainers).forEach(containerInfo => {
            containerInfo.container.style.display = 'none';
            containerInfo.container.style.right = '0px';
            containerInfo.container.style.transition = 'all .3s linear';

        });
    }

    // Function to handle icon click
    function handleIconClick(icon) {
        // Close all theme containers
        closeAllThemeContainers();

        // Show the corresponding theme container
        const containerInfo = themeContainers[icon];
        containerInfo.container.style.display = 'flex';
        // containerInfo.container.style.right = '-640px';
        // containerInfo.container.style.transition = 'all .3s linear';

        // Check if the iframe already exists
        const existingIframe = containerInfo.container.querySelector('iframe');
        if (!existingIframe) {
            // Create iframe
            const iframe = document.createElement('iframe');
            iframe.src = containerInfo.url;
            iframe.width = `${containerInfo.width}px`;
            iframe.height = `${containerInfo.height}px`;
            containerInfo.container.appendChild(iframe);
            iframe.style.border = "none";
        }

        // Toggle the active class on widget-container for styling
        widgetContainer.classList.toggle("active");
    }

    widgetContainer.addEventListener("click", function (event) {
        // Prevent the click event from propagating to the document
        event.stopPropagation();

        // Check if the theme container is already populated
        const clickedIcon = event.target.closest('.switcher-btn');
        if (clickedIcon) {
            const iconTitle = clickedIcon.getAttribute('title');
            handleIconClick(iconTitle);
        }
    });

    // Event listener to close the website when clicking outside of specified elements
    document.addEventListener("click", function (event) {
        const target = event.target;
        if (!widgetContainer.contains(target)) {
            closeAllThemeContainers();
            // Remove the "active" class from color-switcher for styling
            widgetContainer.classList.remove("active");
        }
    });
});
