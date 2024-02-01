// custom right click 
// feather icon 
feather.replace()

// animation 
window.addEventListener('contextmenu', (event) => {
    event. preventDefault()
    var contextMenu = document.getElementById('context-menu')
    contextMenu.classList.add('active')
})

window.addEventListener('click', () => {
    document.getElementById('context-menu').classList.remove('active')

})

// on right click 
const contextMenu = document.querySelector(".container"),
shareMenu = contextMenu.querySelector(".menu-sub-list");

window.addEventListener("contextmenu", e => {
    e.preventDefault();
    let x = e.offsetX, y = e.offsetY,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    cmWidth = contextMenu.offsetWidth,
    cmHeight = contextMenu.offsetHeight;

    if(x > (winWidth - cmWidth - shareMenu.offsetWidth)) {
        shareMenu.style.left = "-200px";
    } else {
        shareMenu.style.left = "";
        shareMenu.style.right = "-200px";
    }

    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;
    
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
});

document.addEventListener("click", () => contextMenu.style.visibility = "hidden");

// full screen mode 
function FullScreenMode() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
     (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {  
        document.documentElement.requestFullScreen();  
      } else if (document.documentElement.mozRequestFullScreen) {  
        document.documentElement.mozRequestFullScreen();  
      } else if (document.documentElement.webkitRequestFullScreen) {  
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
      }  
    } else {  
      if (document.cancelFullScreen) {  
        document.cancelFullScreen();  
      } else if (document.mozCancelFullScreen) {  
        document.mozCancelFullScreen();  
      } else if (document.webkitCancelFullScreen) {  
        document.webkitCancelFullScreen();  
      }  
    }  
}

// copy function 
function Copy(text) {
  var inputc = document.body.appendChild(document.createElement("input"));
  inputc.value = window.location.href;
  inputc.focus();
  inputc.select();
  document.execCommand('copy');
  inputc.parentNode.removeChild(inputc);
  alert("URL Copied.");
}




// copy selected item
function copySelected() {
      const selectedText = window.getSelection().toString().trim();

      if (selectedText !== '') {
        // Create a temporary textarea element to hold the selected text
        const textarea = document.createElement('textarea');
        textarea.value = selectedText;

        // Append the textarea to the document
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();

        // Execute the copy command
        document.execCommand('copy');

        // Remove the textarea
        document.body.removeChild(textarea);

        console.log('Text copied to clipboard: ' + selectedText);
      }
    }




// disable right click for mobile devices
document.addEventListener('DOMContentLoaded', function () {
  // Check if the device is a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Disable the context menu if the device is mobile
  if (isMobile) {
    document.getElementById('context-menu').addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  }
});
