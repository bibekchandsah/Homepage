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
// const resultsBox = document.querySelector(".result-box");
// const inputBox = document.getElementById("input-box");
// window.onload = function () {
//     // var SearchResult = document.getElementById("ResultBox");
//     var SearchResult = document.getElementById("ResultBox");
//     document.onclick = function (event) {
//         if (event.target.id == "input-box") {
//             SearchResult.style.display = "block";
//             resultsBox.style.animation = "to-bottom 0.3s ease-in"
//         }
//         if (event.target.id !== "input-box") {
//             // SearchResult.style.display = "none";
//             // Hide the volume bar with an animation
//             resultsBox.style.animation = "to-top 0.3s ease-in";
//             setTimeout(() => {
//                 SearchResult.style.display = "none";
//                 resultsBox.style.animation = ""; // Reset animation property
//             }, 300); // Adjust the timeout to match the animation duration
//         }
//     }
// };

document.addEventListener("DOMContentLoaded", function () {
    const resultsBox = document.getElementById("ResultBox");
    const ResultsBox = document.querySelector(".result-box");
    const inputBox = document.getElementById("input-box");
    var SearchResult = document.getElementById("ResultBox");

    // Handle click on document to close the results box if clicked outside
    document.addEventListener("click", function (event) {
        if (event.target.id == "input-box") {
            SearchResult.style.display = "block";
            ResultsBox.style.animation = "to-bottom 0.3s ease-in"
        }
        if (!resultsBox.contains(event.target) && event.target !== inputBox) {
            ResultsBox.style.animation = "to-top 0.3s ease-in";
            setTimeout(() => {
                SearchResult.style.display = "none";
                // resultsBox.style.display = "none";
                ResultsBox.style.animation = ""; // Reset animation property
            }, 300);
        }
    });

    // Handle click on user-typed word to search on Google
    resultsBox.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
            const query = event.target.textContent.trim();
            if (query !== "") {
                const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
                window.open(searchUrl, "_blank");
            }
        }
    });

    // Handle input changes to dynamically update the results box
    inputBox.addEventListener("input", function () {
        const filter = inputBox.value.trim().toLowerCase();
        // resultsBox.innerHTML = ""; // Clear the current list

        if (filter !== "") {
            const newLi = document.createElement("li");
            const newA = document.createElement("a");
            newA.href = "#";
            newA.textContent = filter;
            newLi.appendChild(newA);
            resultsBox.appendChild(newLi);
            ResultsBox.style.display = "block";
            ResultsBox.style.animation = "to-bottom 0.3s ease-in";
        } else {
            ResultsBox.style.animation = "to-top 0.3s ease-in";
            setTimeout(() => {
                ResultsBox.style.display = "none";
                ResultsBox.style.animation = ""; // Reset animation property
            }, 300);
        }
    });
});



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
