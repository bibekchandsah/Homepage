// Function to reload the page
// function reloadPage() {
//     location.reload();
// }

// Reload the page every 1 minute (60,000 milliseconds)
// setInterval(reloadPage, 60000);

//Execute after the page loaded
window.addEventListener("load", () => {
    setWhatsappLink();
});

// detect mouse movement for reload
var lastMouseActivity = new Date().getTime();
function handleMouseActivity() {
    lastMouseActivity = new Date().getTime();
}
function checkAndReloadPage() {
    var currentTime = new Date().getTime();
    var timeDifferenceInSeconds = (currentTime - lastMouseActivity) / 1000;
    // Check if there has been no mouse movement for 1 minute (60 seconds)
    if (timeDifferenceInSeconds > 60) {
        // Reload the page
        location.reload();
    }
}


// online status toast 
const toastElement = document.getElementById("toast");
const toastMessageElement = document.getElementById("toast-message");
const wifiIconElement = document.getElementById("wifi-icon");
const closeIconElement = document.getElementById("close-icon");

let isOffline = false; // To track offline status
let hideTimeout; // To store the timeout reference

function showToast(message, isConnected) {
    toastMessageElement.textContent = message;
    wifiIconElement.style.display = isConnected ? "inline-block" : "none";
    toastElement.classList.remove("hide-toast");
    toastElement.classList.add("show-toast");

    if (!isConnected) {
        isOffline = true;
        clearTimeout(hideTimeout); // Clear the timeout when offline
    }

    if (isConnected) {
        if (!isOffline) {
            hideTimeout = setTimeout(hideToast, 5000); // Hide after 5 seconds if online
        }
    }
}

function hideToast() {
    toastElement.classList.remove("show-toast");
    toastElement.classList.add("hide-toast");
}

function updateStatus() {
    const isConnected = navigator.onLine;
    if (isConnected) {
        showToast("You are currently online", true);
        toastElement.style.backgroundColor = "green";

        if (isOffline) {
            hideTimeout = setTimeout(hideToast, 5000); // Start the timer if back online
            isOffline = false; // Reset offline status
        }
    } else {
        showToast("You are currently offline", false);
        toastElement.style.backgroundColor = "red";
        isOffline = true;
    }
}

updateStatus();

// Listen for online and offline events
window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

// Hide the toast when close icon is clicked
closeIconElement.addEventListener("click", hideToast);


// greeting
function getGreeting(username) {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let greetingMessage;

    if (currentHour >= 5 && currentHour < 12) {
        greetingMessage = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
        greetingMessage = 'Good Afternoon';
    } else if (currentHour >= 17 && currentHour < 21) {
        greetingMessage = 'Good Evening';
    } else {
        greetingMessage = 'Good Night';
    }

    if (username) {
        greetingMessage += ' ' + username;
    }

    return greetingMessage;
}

function askForUsername() {
    const username = prompt('Enter your name:');
    if (username) {
        localStorage.setItem('username', username);
        setGreeting();
    }
}

function setGreeting() {
    const username = localStorage.getItem('username');
    const greetingElement = document.getElementById('greeting');
    const greeting = getGreeting(username);
    greetingElement.textContent = greeting;
}

document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('username');
    if (!username) {
        askForUsername();
    } else {
        setGreeting();
    }
});


// date
function getOrdinalSuffix(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = number % 100;
    return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
}

function getCurrentDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const suffix = getOrdinalSuffix(day);

    return `Today is the ${day}${suffix} of ${month} ${year}`;
}

// Display the current date on page load
document.getElementById('dateDisplay').textContent = getCurrentDate();


// flip-flop clock
var clock = $('.clock').FlipClock({
    clockFace: 'TwelveHourClock'
})


// Initial greeting message
const greetingElement = document.getElementById('greeting');
const currentDateElement = document.getElementById('currentDate');
const greeting = getGreeting();
const currentDate = getCurrentDate();
greetingElement.textContent = greeting;
currentDateElement.textContent = currentDate;


// search box
function searchOnEnter(event) {
    if (event.keyCode === 13) {
        searchGoogle();
    }
}
// search on google
function searchGoogle() {
    const searchInput = document.querySelector(".search-input");
    const query = searchInput.value.trim();
    if (query !== "") {
        const searchUrl = "https://www.bing.com/search?q=" + encodeURIComponent(query);
        window.open(searchUrl, "_blank");
        // Select the text inside the input after the search button is pressed
        searchInput.select();
    }
}
// toggle the clear icon
function toggleClearIcon() {
    var input = document.querySelector('.search-input');
    var clearIcon = document.querySelector('.clear-icon');

    // If there's text in the input, show the cross icon; otherwise, hide it
    clearIcon.style.display = input.value.trim() !== '' ? 'block' : 'none';
}
// clear the search input
function clearSearchInput() {
    var input = document.querySelector('.search-input');
    input.value = '';
    toggleClearIcon(); // Hide the cross icon after clearing the input
}


// show different link of whatsapp according to device
// Function to detect whether the user is on a mobile device
// Function to set the appropriate link based on the device
// function setWhatsappLink() {
//     const whatsappLink = document.getElementById('whatsappLink');
//     if (window.innerWidth <= 768) {
//         // Assuming a screen width of 768 pixels or less is considered a mobile device
//         console.log("mobile device");
//         whatsappLink.href = 'qrcode.png';
//     } else {
//         console.log("pc devices");
//         whatsappLink.href = 'whatsapp://send?text=Go%20to%20Homepage-%20https://bibek10550.github.io/Homepage/%20This%20homepage%20is%20designed%20to%20suit%20your%20preferences%20and%20needs.%20It%20offers%20many%20features%20and%20useful%20items%20that%20you%20use%20every%20day.%20You%20can%20easily%20customize%20it%20to%20make%20it%20your%20own.';
//     }
// }
// Function to detect whether the user is on a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
// Function to set the appropriate link based on the device
function setWhatsappLink() {
    const whatsappLink = document.getElementById('whatsappLink');
    if (isMobileDevice()) {
        console.log("mobile devices");
        whatsappLink.href = 'qrcode.png';
        // Set target attribute for mobile devices
        whatsappLink.setAttribute('target', '_blank');
    } else {
        console.log("pc devices");
        whatsappLink.href = 'whatsapp://send?text=Go%20to%20Homepage-%20https://bibek10550.github.io/Homepage/%20This%20homepage%20is%20designed%20to%20suit%20your%20preferences%20and%20needs.%20It%20offers%20many%20features%20and%20useful%20items%20that%20you%20use%20every%20day.%20You%20can%20easily%20customize%20it%20to%20make%20it%20your%20own.';
    }
}
// Call the function on page load
// setWhatsappLink();


// icon images stored locally
// Data with website details
const data = `
All in 1 AI	https://www.futurepedia.io/	https://www.futurepedia.io/futurepedia-small.svg
ChatGPT	https://chat.openai.com/	https://chat.openai.com/apple-touch-icon.png
Bard	https://bard.google.com/	https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg
Firefly	https://firefly.adobe.com/	https://firefly.adobe.com/adobe_android_192.png
DALL-E	https://labs.openai.com/	https://openailabs-site.azureedge.net/public-assets/d/3aca25711c/apple-touch-icon.png
Leonardo	https://app.leonardo.ai/	https://app.leonardo.ai/img/leonardo-logo-396x396.webp
Slidesgo	https://slidesgo.com/ai-presentations	https://slidesgo.com/apple-touch-icon-152x152.png
Voice to text	https://otter.ai/home	https://otter.ai/favicon.ico

Word	https://www.office.com/launch/word?auth=1	https://www.drware.com/wp-content/uploads/2020/10/Word.png
Excel	https://www.office.com/launch/excel?auth=1	https://www.drware.com/wp-content/uploads/2020/10/Excel.png
PowerPoint	https://www.office.com/launch/powerpoint?auth=1	https://www.drware.com/wp-content/uploads/2020/10/PowerPoint.png
OneDrive	https://onedrive.live.com/?sw=bypass&gologin=1	https://www.drware.com/wp-content/uploads/2020/10/OneDrive.png
Edge Add-ons	https://microsoftedge.microsoft.com/addons/Microsoft-Edge-Extensions-Home	https://purepng.com/public/uploads/large/purepng.com-microsoft-logo-iconlogobrand-logoiconslogos-251519939091wmudn.png
Google	https://www.google.com/	https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0
Google Translate	https://translate.google.com.np/?hl=en&tab=oT	https://ssl.gstatic.com/translate/favicon.ico
Chrome webStore	https://chrome.google.com/webstore/category/extensions	https://ssl.gstatic.com/chrome/webstore/images/icon_144px.png

Photoshop	https://www.photopea.com/	https://www.photopea.com/promo/icon512.png
Remove Background	https://www.remove.bg/	https://www.remove.bg/apple-touch-icon.png?v=YAXaAv7pao
Tiny wow	https://tinywow.com/	https://tinywow.com/v3/img/favicon-tinywow.svg
Resize Image	https://www.reduceimages.com/	https://www.reduceimages.com/img/app-icons/new-icon.png
Magic Eraser	https://magicstudio.com/magiceraser/	https://static.magicstudio.com/favicon.ico
Watermark Remover	https://www.watermarkremover.io/	https://www.watermarkremover.io/static/assets/images/favicon.0aad398..ico
Image Upscalar	https://www.upscale.media/	https://cdn.pixelbin.io/v2/dummy-cloudname/original/upscalemedia_assets/logo/favicon.png?f_auto=true
Image Converter	https://www.freeconvert.com/image-converter	https://www.freeconvert.com/favicon.ico

C-compiler	https://www.programiz.com/c-programming/online-compiler/	https://avatars.githubusercontent.com/u/25499428?s=200&v=4
KIIT archive	https://kiitarchives.in/	https://play-lh.googleusercontent.com/ZeHcsQwEEx-nmRJjpKI_O0dwn3wfos9Wg4opkl-6ci0lczsd3-beJX92Ele0rSB8XGo=w240-h480-rw
KIIT connect	https://www.kiitconnect.live/	https://www.kiitconnect.live/_next/image?url=%2Flogo.png&w=48&q=75
KIIT Moodle	https://kiitmoodle.in/course/index.php	https://kiitmoodle.in/theme/image.php?theme=boost&component=theme&rev=1674119251&image=favicon
Integration	https://www.integral-calculator.com/	https://www.integral-calculator.com/layout/xintegral-calculator.png,q1473621695.pagespeed.ic.UCzXaOzHTl.webp
Derivative	https://www.derivative-calculator.net/	https://www.derivative-calculator.net/layout/xderivative-calculator.png,q1473621370.pagespeed.ic.fO-LSMkmJ3.webp
Free Courses	https://freesoff.com/	https://freesoff.com/uploads/default/optimized/2X/f/f810d7dde449a2a3c8eb2261094adf92c12c2c81_2_180x180.png
Public in G-Drive	https://www.dedigger.com/#gsc.tab=0	https://www.dedigger.com/favicon.ico

Caligraphr  https://www.calligraphr.com/en/accounts/login/?next=/en/webapp/app_home/%3F/   https://www.calligraphr.com/static/website/img/favicons/apple-touch-icon-152x152.png
Pic hidden data https://jimpl.com/    https://jimpl.com/assets/logo-7140b31ff082690f0eb7d51de90174f086901434c51a29375817936efda630b8.svg
Face Check  https://facecheck.id/    https://facecheck.id/img/favicon.svg
IP Logger   https://grabify.link/   https://grabify.link/images/favicon.svg
Proxyium    https://proxyium.com/   https://cdn.proxyium.com/img/favicon/favicon.ico?v=4
Footprint   https://saymineapp.com/overview  https://static.saymine.com/app/app/icon.png
UrlScanner  https://urlscan.io/ https://urlscan.io/img/urlscan_256.png
URL where goes  https://wheregoes.com/ https://wheregoes.com/c/themes/custom-theme/img/favicon.svg
`;

// Parse the data and split into individual items
const items = data.split('\n');

// Function to create an icon item with given details
function createIconItem(title, link, image) {
    const iconItem = document.createElement('div');
    iconItem.classList.add('icon-item');

    const anchor = document.createElement('a');
    anchor.href = link;

    const img = document.createElement('img');
    img.src = image;
    img.alt = title;

    const iconName = document.createElement('div');
    iconName.classList.add('icon-name');
    iconName.textContent = title;

    anchor.appendChild(img);
    anchor.appendChild(iconName);
    iconItem.appendChild(anchor);

    return iconItem;
}

// Load icons from local storage or create new elements
function loadIcons() {
    const iconsContainer = document.getElementById('icons-container');
    const storedData = localStorage.getItem('websiteIcons');

    if (storedData) {
        const icons = JSON.parse(storedData);
        icons.forEach(icon => {
            const { title, link, image } = icon;
            const iconItem = createIconItem(title, link, image);
            iconsContainer.appendChild(iconItem);
        });
    } else {
        const icons = [];
        items.forEach(item => {
            const [title, link, image] = item.split(/\s+/);
            const iconItem = createIconItem(title, link, image);
            iconsContainer.appendChild(iconItem);
            icons.push({ title, link, image });
        });

        // Save icons to local storage for future offline use
        localStorage.setItem('websiteIcons', JSON.stringify(icons));
    }
}

loadIcons();

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





