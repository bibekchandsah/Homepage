// copy image prompt
// document.addEventListener('DOMContentLoaded', function () {
//     const promptCopyButtons = document.querySelectorAll('.promptCopy');

//     promptCopyButtons.forEach(function (button) {
//         button.addEventListener('click', function () {
//             const cardText = this.parentElement.querySelector('.card-text');
//             const copiedMessage = this.parentElement.querySelector('.copied');

//             navigator.clipboard.writeText(cardText.textContent).then(function () {
//                 // Display "Copied!" message
//                 promptCopyButtons.innerHTML = '';
//                 setTimeout(function () {
//                     promptCopyButtons.innerHTML = 'Copied';
//                 }, 3000);
//             }).catch(function (err) {
//                 console.error('Unable to copy text to clipboard', err);
//                 promptCopyButtons.innerHTML = 'Copied';
//             });
//         });
//     });
// });


// const promptCopyButtons = document.querySelectorAll('.promptCopy');
// promptCopyButtons.addEventListener('click', function (){
//     alert("Copied!");
// });


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




// // Event listener for clicking outside search
// document.addEventListener("click", function (e) {
//     var SearchResult = document.getElementById("ResultBox");
//     // Check if the click is outside the volume control
//     if (!inputBox.contains(e.target)) {
//         // Hide the volume bar with an animation
//         resultsBox.style.animation = "to-top 0.3s ease-in";
//         setTimeout(() => {
//             SearchResult.style.display = "none";
//             resultsBox.style.animation = ""; // Reset animation property
//         }, 300); // Adjust the timeout to match the animation duration
//     }
// });


// // when click on search dropdown apperar
// const resultsBox = document.querySelector(".result-box");
// const inputBox = document.getElementById("input-box");
// window.onload = function () {
//     var SearchResult = document.getElementById("ResultBox");
//     document.onclick = function (event) {
//         if (event.target.id == "input-box") {
//             SearchResult.style.display = "block";
//             resultsBox.style.animation = "to-bottom 0.3s ease-in"
//         }
//         if (event.target.id !== "input-box") {
//             // SearchResult.style.display = "none";
//             // Hide the result box with an animation
//             resultsBox.style.animation = "to-top 0.3s ease-in";
//             setTimeout(() => {
//                 SearchResult.style.display = "none";
//                 resultsBox.style.animation = ""; // Reset animation property
//             }, 300); // Adjust the timeout to match the animation duration
//         }
//     }
// };

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
        console.log(event.target.href)
        if (event.target.tagName == "a") {
            if (event.target.href == "#") {
                const query = event.target.textContent.trim();
                if (query !== "") {
                    const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(query);
                    window.open(searchUrl, "_blank");
                }
                // Select the text inside the input after the search button is pressed
                inputBox.select();
            }
        }
    });
    // Handle input changes to dynamically update the results box
    inputBox.addEventListener("input", function (e) {
        const filter = inputBox.value.trim().toLowerCase();
        // resultsBox.innerHTML = ""; // Clear the current list
        console.log(e);
        if (filter !== "") {
            const newLi = document.createElement("li");
            const newA = document.createElement("a");
            newA.href = "#";
            newA.textContent = filter;
            newLi.appendChild(newA);
            resultsBox.appendChild(newLi);
            ResultsBox.style.display = "block";
            ResultsBox.style.animation = "to-bottom 0.3s ease-in";

            newA.addEventListener("click", () => {
                window.open("https://google.com/search?q=" + newA.textContent, "_blank");
            })
        } else {
            // ResultsBox.style.animation = "to-top 0.3s ease-in";
            // setTimeout(() => {
            //     ResultsBox.style.display = "none";
            //     ResultsBox.style.animation = ""; // Reset animation property
            // }, 300);
        }
    });
});





// short cut key for music "alt + m"
document.addEventListener('keydown', function (event) {
  // Check if ALt + M is pressed
  if (event.altKey && event.key === 'm') {
    const musicContainer = document.getElementById('theme-buttons-container-music');
    const musicButton = document.querySelector('.switcher-btn[title="music"]');
    if (musicButton && musicContainer.style.display === 'none') {
      musicButton.click(); // Simulate a click on the music button
      musicContainer.style.display = 'flex';
    } else {
      musicContainer.style.display = 'none';
    }
  }
});








// short cut key for calendar "alt + c"
document.addEventListener('keydown', function (event) {
  // Check if alt + c is pressed
  if (event.altKey && event.key === 'c') {
    const calendarContainer = document.getElementById('theme-buttons-container-calendar');
    const calendarButton = document.querySelector('.switcher-btn[title="calendar"]');
    if (calendarButton && calendarContainer.style.display === 'none') {
      calendarButton.click(); // Simulate a click on the calendar button
      calendarContainer.style.display = 'flex';
    } else {
      calendarContainer.style.display = 'none';
    }
  }
});




// short cut key for search "alt + s"
document.addEventListener('keydown', function (event) {
  if (event.altKey && event.key === 's') {
    const resultBox = document.getElementById('ResultBox');
    const inputBox = document.getElementById('input-box');

    // Toggle display style for ResultBox
    if (resultBox.style.display === 'none') {
      resultBox.style.display = 'block';
    } else {
      resultBox.style.display = 'none';
    }

    // Focus on the input box
    inputBox.focus();
  }
});
