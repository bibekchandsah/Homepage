// copy image prompt
document.addEventListener('DOMContentLoaded', function () {
    const promptCopyButtons = document.querySelectorAll('.promptCopy');

    promptCopyButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const cardText = this.parentElement.querySelector('.card-text');

            navigator.clipboard.writeText(cardText.textContent).then(function () {
                // Display "Copied!" message
                button.innerHTML = 'Copied';
                setTimeout(function () {
                    button.innerHTML = 'Copy';
                }, 3000);
            }).catch(function (err) {
                console.error('Unable to copy text to clipboard', err);
                button.innerHTML = 'Error';
                setTimeout(function () {
                    button.innerHTML = 'Copy';
                }, 3000);
            });
        });
    });
});


// when click on search dropdown apperar
const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-box");
window.onload = function () {
    // var SearchResult = document.getElementById("ResultBox");
    var SearchResult = document.getElementById("ResultBox");
    document.onclick = function (event) {
        if (event.target.id == "input-box") {
            SearchResult.style.display = "block";
            resultsBox.style.animation = "to-bottom 0.3s ease-in"
        }
        if (event.target.id !== "input-box") {
            // SearchResult.style.display = "none";
            // Hide the volume bar with an animation
            resultsBox.style.animation = "to-top 0.3s ease-in";
            setTimeout(() => {
                SearchResult.style.display = "none";
                resultsBox.style.animation = ""; // Reset animation property
            }, 300); // Adjust the timeout to match the animation duration
        }
    }
};



// filter
const search = () => {
    let filter = document.getElementById('input-box').value.toUpperCase();
    let ul = document.getElementById('ResultBox');
    let li = ul.getElementsByTagName('li');
    for (var i = 0; i < li.length; i++) {
        let a = li[i].getElementsByTagName('a')[0];
        let textValue = a.textContent || a.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
