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
  }
  function no() {
    if(window.outerWidth > window.innerWidth) {
      closepage();
    }
  }
  window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
