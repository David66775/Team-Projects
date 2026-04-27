/*
add the following html content to the head element of your document.
    <meta charset = "Utf-8"> <!-- If you already have this, just paste the rest and not this.-->
    
    <noscript>
      <meta http-equiv = "refresh" content = "0; https://david66775.github.io/Blank">
    </noscript>
    <script src = "https://david66775.github.io/Team-Projects/assets/Hyper.js"></script>
    
-----------------end html content-----------------
you must, in using ths file on your page, put on the visible webpage: "This page uses Hyper.js from david66775.github.io" in a minimum font size of 16px on your pages and have it display constantly.
*/
const nointerval = window.setInterval(no, 30);
document.addEventListener("keydown", function(event) {
  const key = event.key.toLowerCase();
  if (event.ctrlKey && key === "u") {
    event.preventDefault();
  }
  if (event.ctrlKey && key === "i") {
    event.preventDefault();
  }
  if (key === "f12") {
    event.preventDefault();
  }
  if (event.ctrlKey && event.shiftKey && key === "j") {
    event.preventDefault();
  }
  if (event.ctrlKey && event.shiftKey && key === "c") {
    event.preventDefault();
  }
  if (event.ctrlKey && event.shiftKey && key === "m") {
    event.preventDefault();
  }
  if (event.key === "Escape" || key === "esc") {
  window.open("https://david66775.github.io/Blank", "_self");
  window.close();
  }
  });
  function closepage() {
    window.open("https://david66775.github.io/Blank", "_self");
    window.close();
    if (window.location.href !== "https://david66775.github.io/Blank" && window.location.href !== "https://David66775.github.io/Blank/") {
      window.location.href = "https://david66775.github.io/Blank";
      
    }
  }
  const observer = new MutationObserver(closepage);
  function no() {
    if(window.outerWidth > window.innerWidth) {
      closepage();
    }
    observer.observe(document.body, { childList: true, subtree: true });
  }
  window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
