// JavaScript to detect browser and show/hide the overlay
function getBrowser() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Edg") == -1) {
    return "Chrome";
  } else if (
    userAgent.indexOf("Safari") > -1 &&
    userAgent.indexOf("Chrome") == -1
  ) {
    return "Safari";
  } else if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox";
  } else if (userAgent.indexOf("Edg") > -1) {
    return "Edge";
  } else if (
    userAgent.indexOf("MSIE") > -1 ||
    !!document.documentMode == true
  ) {
    return "Internet Explorer"; // Check for IE
  } else {
    return "Unknown";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const browser = getBrowser();
  const overlay = document.getElementById("browser-check-overlay");
  const browserSpan = document.getElementById("current-browser");
  const whyLink = document.getElementById("browser-check-why-link");
  const explanation = document.getElementById("browser-check-explanation");

  browserSpan.textContent = browser;

  if (browser !== "Chrome" && browser !== "Firefox" && browser !== "Edge") {
    overlay.classList.remove("hidden"); // Remove the hidden class
  }

  whyLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the link from navigating
    explanation.classList.toggle("show"); // Toggle the 'show' class
  });
});
