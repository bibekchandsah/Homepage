// side button for calendar website

document.addEventListener("DOMContentLoaded", function () {
    const colorSwitcher = document.getElementById("color-switcher");
    const themeContainer = document.getElementById("theme-buttons-container");

    // Function to close the website (remove the iframe)
    function closeWebsite() {
        // Check if the theme container is not empty
        if (themeContainer.childElementCount !== 0) {
            // Remove the iframe
            themeContainer.innerHTML = "";

            // Remove the "active" class from color-switcher for styling
            colorSwitcher.classList.remove("active");
        }
    }

    colorSwitcher.addEventListener("click", function (event) {
        // Prevent the click event from propagating to the document
        event.stopPropagation();

        // Check if the theme container is already populated
        if (themeContainer.childElementCount === 0) {
            // Create an iframe element
            const iframe = document.createElement("iframe");
            iframe.src = "https://bibek10550.github.io/calendar/";
            iframe.width = "459";
            iframe.height = "628";
            iframe.style.border = "none";

            // Append the iframe to the theme container
            themeContainer.appendChild(iframe);
        }

        // Toggle the active class on color-switcher for styling
        colorSwitcher.classList.toggle("active");
    });

    // Event listener to close the website when clicking outside of specified elements
    document.addEventListener("click", function (event) {
        const target = event.target;
        if (!colorSwitcher.contains(target) && !themeContainer.contains(target)) {
            closeWebsite();
        }
    });
});



