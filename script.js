// // Function to reload the page
// function reloadPage() {
//     location.reload();
// }

// // Reload the page every 1 minute (60,000 milliseconds)
// setInterval(reloadPage, 100000);

//Execute after the page loaded
// check either qr or link should be displayed
window.addEventListener("load", () => {
    setWhatsappLink();
});

// edit url
window.addEventListener('DOMContentLoaded', function () {
    console.log("loading new icons");
    // Get all elements with class 'icon-item'
    var iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach(function (iconItem) {
        var editIcon = iconItem.querySelector('.edit-icon');
        var modal = createModal(iconItem);
        // Toggle the modal on edit icon click
        if (editIcon) {
            editIcon.addEventListener('click', function () {
                showModal(modal);
            });
        }
    });

    // function createInput(labelText, defaultValue, storageKey) {
    function createInput(labelText, defaultValue, storageKey) {
        var label = document.createElement('label');
        label.textContent = labelText;
        var input = document.createElement('input');
        input.type = 'text';
        // Retrieve the value from local storage or use the default value
        input.value = localStorage.getItem(storageKey) || defaultValue;
        var inputContainer = document.createElement('div');
        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        return inputContainer;
    }

    function createModal(iconItem) {
        // Create the modal
        var modal = document.createElement('div');
        modal.classList.add('modal');
        // Create input fields
        var nameInput = createInput('Name', iconItem.querySelector('.icon-name').innerHTML, 'iconNameContent_' + iconItem.dataset.itemId);
        // Check if the element with the class '.linkUrl' exists
        var urlInput = createInput('URL', iconItem.querySelector('.linkUrl') ? iconItem.querySelector('.linkUrl').href : '', 'iconUrl_' + iconItem.dataset.itemId);
        // Check if the element with the class '.imageUrl' exists
        var iconInput = createInput('Icon URL', iconItem.querySelector('.imageUrl') ? iconItem.querySelector('.imageUrl').src : '', 'iconIcon_' + iconItem.dataset.itemId);
        // Create check icon for saving data
        var checkIcon = document.createElement('i');
        checkIcon.classList.add('fa', 'fa-check', 'check-icon');
        checkIcon.addEventListener('click', function () {
            // Save the entered data to local storage
            localStorage.setItem('iconNameContent_' + iconItem.dataset.itemId, nameInput.querySelector('input').value);
            localStorage.setItem('iconUrl_' + iconItem.dataset.itemId, urlInput.querySelector('input').value);
            localStorage.setItem('iconIcon_' + iconItem.dataset.itemId, iconInput.querySelector('input').value);
            // Update the icon-item with the new data
            iconItem.querySelector('.icon-name').innerHTML = nameInput.querySelector('input').value;
            if (iconItem.querySelector('.linkUrl')) {
                iconItem.querySelector('.linkUrl').href = urlInput.querySelector('input').value;
            }
            if (iconItem.querySelector('.imageUrl')) {
                iconItem.querySelector('.imageUrl').src = iconInput.querySelector('input').value;
            }
            // Close the modal
            closeModal(modal);
        });
        // Append input fields and check icon to the modal
        modal.appendChild(nameInput);
        modal.appendChild(urlInput);
        modal.appendChild(iconInput);
        modal.appendChild(checkIcon);
        return modal;
    }
    // show popup
    function showModal(modal) {
        document.body.appendChild(modal);
        modal.style.display = 'block';
    }
    // close popup
    function closeModal(modal) {
        document.body.removeChild(modal);
    }
});





// // detect mouse movement for reload
// var lastMouseActivity = new Date().getTime();
// function handleMouseActivity() {
//     lastMouseActivity = new Date().getTime();
// }
// function checkAndReloadPage() {
//     var currentTime = new Date().getTime();
//     var timeDifferenceInSeconds = (currentTime - lastMouseActivity) / 1000;
//     console.log(timeDifferenceInSeconds);

//     // Check if there has been no mouse movement for 1 minute (60 seconds)
//     if (timeDifferenceInSeconds > 60) {
//         // Reload the page
//         location.reload();
//     }
// }
// // Add event listeners to detect mouse movement
// document.addEventListener('mousemove', handleMouseActivity);
// document.addEventListener('mousedown', handleMouseActivity);
// // Check and reload the page every 10 seconds (adjust as needed)
// setInterval(checkAndReloadPage, 10000); // Check every 10 seconds


// var lastMouseActivity = new Date().getTime();
// var excludeReload = false;
// function handleMouseActivity(event) {
//     lastMouseActivity = new Date().getTime();
//     // Check if the mouse is over an iframe
//     if (event.target.tagName.toLowerCase() === 'iframe') {
//         excludeReload = true;
//     } else {
//         excludeReload = false;
//     }
// }
// function checkAndReloadPage() {
//     if (excludeReload) {
//         // If mouse is over an iframe, exclude the reload
//         return;
//     }
//     var currentTime = new Date().getTime();
//     var timeDifferenceInSeconds = (currentTime - lastMouseActivity) / 1000;
//     console.log(timeDifferenceInSeconds);
//     // Check if there has been no mouse movement for 1 minute (60 seconds)
//     if (timeDifferenceInSeconds > 60) {
//         // Reload the page
//         location.reload();
//     }
// }
// // Add event listeners to detect mouse movement
// document.addEventListener('mousemove', handleMouseActivity);
// document.addEventListener('mousedown', handleMouseActivity);
// // Check and reload the page every 10 seconds (adjust as needed)
// setInterval(checkAndReloadPage, 10000); // Check every 10 seconds


// its working but there is one small issue with this code. when user mouse is in music iframe till then only it doesn't reload the page. but when user mouse is in outside of music iframe and song is playing then it reloads the page. but it shouldn't reload the page when user mouse is outside of music iframe and music is playing i.e. if music iframe is playing music in background then it shouldn't reload the page. 
// var lastMouseActivity = new Date().getTime();
// var excludeReload = false;
// function handleMouseActivity(event) {
//     lastMouseActivity = new Date().getTime();
//     // Check if the mouse is over an iframe or audio element
//     if (
//         event.target.tagName.toLowerCase() === 'iframe' ||
//         (event.target.tagName.toLowerCase() === 'audio' && !event.target.paused)
//     ) {
//         excludeReload = true;
//     } else {
//         excludeReload = false;
//     }
// }
// function checkAndReloadPage() {
//     if (excludeReload) {
//         // If the mouse is over an iframe with music playing, exclude the reload
//         console.log(excludeReload);
//         console.log("page shouldn't be reload");
//         return;
//     }
//     var currentTime = new Date().getTime();
//     var timeDifferenceInSeconds = (currentTime - lastMouseActivity) / 1000;
//     console.log(timeDifferenceInSeconds);
//     // Check if there has been no mouse movement for 1 minute (60 seconds)
//     if (timeDifferenceInSeconds > 60) {
//         // Reload the page
//         location.reload();
//     }
// }
// // Add event listeners to detect mouse movement
// document.addEventListener('mousemove', handleMouseActivity);
// document.addEventListener('mousedown', handleMouseActivity);
// // Check and reload the page every 10 seconds (adjust as needed)
// setInterval(checkAndReloadPage, 10000); // Check every 10 seconds


var lastMouseActivity = new Date().getTime();
var isMusicPlaying = false;

function handleMouseActivity(event) {
    lastMouseActivity = new Date().getTime();

    // Log mouse activity for debugging
    // console.log('Mouse moved over:', event.target.tagName);

    // Check if the mouse is over an iframe or audio element
    if (event.target.tagName.toLowerCase() === 'iframe') {
        // Assuming the iframe content is from the same origin
        var iframeDocument = event.target.contentDocument || event.target.contentWindow.document;
        var audioElements = iframeDocument.querySelectorAll('audio');

        // Check if the mouse is over an audio element inside the iframe
        if (audioElements.length > 0) {
            isMusicPlaying = !audioElements[0].paused;
            // console.log('Music state:', isMusicPlaying);
        }
    }
}

function checkAndReloadPage() {
    if (isMusicPlaying) {
        // If music is playing, exclude the reload
        // console.log('Skipping reload because music is playing.');
        return;
    }

    var currentTime = new Date().getTime();
    var timeDifferenceInSeconds = (currentTime - lastMouseActivity) / 1000;
    console.log(timeDifferenceInSeconds);

    // Check if there has been no mouse movement for 1 minute (60 seconds)
    if (timeDifferenceInSeconds > 600) {
        // Reload the page
        // console.log('Reloading the page due to inactivity.');
        location.reload();
    }
}

// Add event listeners to detect mouse movement
document.addEventListener('mousemove', handleMouseActivity);
document.addEventListener('mousedown', handleMouseActivity);

// Check and reload the page every 10 seconds (adjust as needed)
setInterval(checkAndReloadPage, 10000); // Check every 10 seconds










// update notification
// jQuery(document).ready(function ($) {
//     window.onload = function () {
//         $(".bts-popup").delay(1000).addClass('is-visible');
//     }
//     //open popup
//     $('.bts-popup-trigger').on('click', function (event) {
//         event.preventDefault();
//         $('.bts-popup').addClass('is-visible');
//     });
//     //close popup
//     $('.bts-popup').on('click', function (event) {
//         if ($(event.target).is('.bts-popup-close') || $(event.target).is('.bts-popup')) {
//             event.preventDefault();
//             $(this).removeClass('is-visible');
//         }
//     });
//     //close popup when clicking the esc keyboard button
//     $(document).keyup(function (event) {
//         if (event.which == '27') {
//             $('.bts-popup').removeClass('is-visible');
//         }
//     });
// });

jQuery(document).ready(function ($) {
    // Function to check if the popup should be displayed
    function shouldDisplayPopup() {
        var popupStatus = localStorage.getItem('popupStatus');
        var lastPopupTime = localStorage.getItem('lastPopupTime');

        if (!popupStatus || popupStatus === 'not visited' || isPopupStale(lastPopupTime)) {
            return true;
        }
        return false;
    }
    // Function to set the popup status as visited
    function setPopupVisited() {
        localStorage.setItem('popupStatus', 'visited');
    }
    // Function to set the popup status as not visited
    function setPopupNotVisited() {
        localStorage.setItem('popupStatus', 'not visited');
    }
    // Function to set the last popup time
    function setLastPopupTime() {
        var currentTime = new Date().getTime();
        localStorage.setItem('lastPopupTime', currentTime);
    }
    // Function to clear the stored popup status and time
    function clearPopupStatus() {
        localStorage.removeItem('popupStatus');
        localStorage.removeItem('lastPopupTime');
    }
    // Function to check if the stored popup status is stale (older than 7 days)
    function isPopupStale(lastPopupTime) {
        if (!lastPopupTime) {
            return true;
        }
        var currentTime = new Date().getTime();
        var sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
        return currentTime - lastPopupTime > sevenDaysInMillis;
    }
    // Function to show the popup
    function showPopup() {
        $('.bts-popup').addClass('is-visible');
    }
    // Function to hide the popup
    function hidePopup() {
        $('.bts-popup').removeClass('is-visible');
    }
    // Check if the popup should be displayed
    if (shouldDisplayPopup()) {
        // Display the popup after a delay
        setTimeout(function () {
            showPopup();
        }, 1000);
    }
    // Open popup when trigger is clicked
    $('.bts-popup-trigger').on('click', function (event) {
        event.preventDefault();
        showPopup();
    });
    // Close popup when clicking the close button or outside the popup
    $('.bts-popup').on('click', function (event) {
        if ($(event.target).is('.bts-popup-close') || $(event.target).is('.bts-popup')) {
            event.preventDefault();
            hidePopup();
            // Set popup status as visited and update last popup time when the popup is closed
            setPopupVisited();
            setLastPopupTime();
        }
    });
    // Close popup when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            hidePopup();
            // Set popup status as visited and update last popup time when the popup is closed
            setPopupVisited();
            setLastPopupTime();
        }
    });
    // Example usage: call clearPopupStatus() to clear stored status and time
    // clearPopupStatus();
});










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
    // select the input box after clearing the text
    input.select();
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
// function setWhatsappLink() {
//     const whatsappLink = document.getElementById('whatsappLink');
//     const imagePreview = document.getElementById('imagePreview');

//     if (isMobileDevice()) {
//         console.log("mobile devices");
//         whatsappLink.addEventListener('click', () => {
//             // Display image preview when clicked
//             imagePreview.innerHTML = '<img src="qrcode.png" alt="QR Code">';
//             imagePreview.style.display = 'block';
//             console.log("clicked");
//         });
//         imagePreview.addEventListener("click", () => {
//             imagePreview.style.display = 'none';
//             console.log("clicked");
//         });
//     } else {
//         console.log("pc devices");
//         whatsappLink.href = 'whatsapp://send?text=Go%20to%20Homepage-%20https://bibek10550.github.io/Homepage/%20This%20homepage%20is%20designed%20to%20suit%20your%20preferences%20and%20needs.%20It%20offers%20many%20features%20and%20useful%20items%20that%20you%20use%20every%20day.%20You%20can%20easily%20customize%20it%20to%20make%20it%20your%20own.';
//         // Hide image preview if it's visible
//         imagePreview.style.display = 'none';
//     }
// }


// Function to detect whether the user is on a mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to set the appropriate link based on the device
function setWhatsappLink() {
    const whatsappLink = document.getElementById('whatsappLink');
    const imagePreview = document.getElementById('imagePreview');
    const shareIcon = document.querySelector(".whatsappLink");

    if (isMobileDevice()) {
        console.log("mobile devices");
        whatsappLink.addEventListener('click', (event) => {
            imagePreview.innerHTML = '<img src="qrcode.png" alt="QR Code">';
            event.stopPropagation(); // Prevent the click event from reaching the document
            // Toggle display of image preview
            imagePreview.style.display = imagePreview.style.display === 'none' ? 'block' : 'none';
        });

        document.addEventListener('click', () => {
            // Close the image preview when clicked outside
            imagePreview.style.animation = "disappear 0.3s ease-out";
            setTimeout(() => {
                imagePreview.style.display = 'none';
                imagePreview.style.animation = ""; // Reset animation property
            }, 300); // Adjust the timeout to match the animation duration
        });
    } else {
        console.log("pc devices");
        whatsappLink.href = 'whatsapp://send?text=Go%20to%20Homepage-%20https://bibek10550.github.io/Homepage/%20This%20homepage%20is%20designed%20to%20suit%20your%20preferences%20and%20needs.%20It%20offers%20many%20features%20and%20useful%20items%20that%20you%20use%20every%20day.%20You%20can%20easily%20customize%20it%20to%20make%20it%20your%20own.';
        // Hide image preview if it's visible
        imagePreview.style.display = 'none';
        // imagePreview.style.animation = "zoomOut 0.3s ease-in";
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





