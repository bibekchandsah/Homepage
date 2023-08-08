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
