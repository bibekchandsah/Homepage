// side button for calendar website
document.addEventListener("DOMContentLoaded", function () {
    const colorSwitcher = document.getElementById("color-switcher");
    const themeContainer = document.getElementById("theme-buttons-container");

    colorSwitcher.addEventListener("click", function () {
        // Check if the theme container is already populated
        if (themeContainer.childElementCount === 0) {
            // Create an iframe element
            const iframe = document.createElement("iframe");
            iframe.src = "https://bibek10550.github.io/calander/";
            iframe.width = "453";
            iframe.height = "693";
            iframe.style.border = "none";

            // Append the iframe to the theme container
            themeContainer.appendChild(iframe);
        }

        // Toggle the active class on color-switcher for styling
        colorSwitcher.classList.toggle("active");
    });
});

