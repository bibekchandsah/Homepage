// Declaring HTML elements
const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

// If the user hovers on the img div
imgDiv.addEventListener('mouseenter', function () {
    uploadBtn.style.display = "block";
});

// If we hover out from the img div
imgDiv.addEventListener('mouseleave', function () {
    uploadBtn.style.display = "none";
});

// Load the last chosen image from local storage on page load
const savedImage = localStorage.getItem('profileImage');
if (savedImage) {
    img.src = savedImage;
}

// Let's work for the image showing functionality when we choose an image to upload
// When we choose a photo to upload
file.addEventListener('change', function () {
    // This refers to the file input element
    const choosedFile = this.files[0];
    if (choosedFile) {
        const reader = new FileReader(); // FileReader is a predefined function of JS
        reader.addEventListener('load', function () {
            // Resize the image before storing and displaying
            resizeImage(reader.result, 250, 250, (resizedImage) => {
                img.setAttribute('src', resizedImage);
                localStorage.setItem('profileImage', resizedImage);
            });
        });
        reader.readAsDataURL(choosedFile);
    }
});

// Resize the image using canvas
function resizeImage(inputDataURL, maxWidth, maxHeight, callback) {
    const img = new Image();
    img.src = inputDataURL;
    img.onload = function () {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }

        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Increase the quality to 0.9 (90%)
        const outputDataURL = canvas.toDataURL('image/jpeg', 0.99);
        callback(outputDataURL);
    };
}


// clean the local storage
// Add a click event listener to the button
document.getElementById('clearLocalStorageBtn').addEventListener('click', function () {
    // Change button color to green
    this.style.backgroundColor = '#2ecc71';

    // Clear the local storage
    localStorage.clear();

    // Optionally, you can provide feedback to the user
    console.log('Local storage cleared!');

    // Revert button color after 5 seconds
    setTimeout(() => {
        this.style.backgroundColor = '#ff0202';
    }, 5000);
});
