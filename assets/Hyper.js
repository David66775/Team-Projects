const nointerval = window.setInterval(No, 30);
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
  if (event.key === "Escape") {
  window.open("", "_self");
  window.close();
  }
  });
  function closepage() {
    window.open("", "_self");
    window.close();
  }
  function No() {
    if(document.documentElement.clientWidth < window.innerwidth) {
      closepage();
    }
  }
  window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });
