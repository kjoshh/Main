const cross = document.getElementById("cross");

if (!cross) {
  console.warn("Element with ID 'cross' not found.");
  return;
}

cross.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent immediate navigation

  const href = "https://kernjosh.com/"; // Real URL

  // ✅ Store internal navigation state using sessionStorage (works on new page)
  sessionStorage.setItem("isInternalNavigation", "true");
  console.log("Internal navigation state set in sessionStorage.");

  // ✅ Preload the page in the background without an iframe
  fetch(href, { mode: "no-cors" })
    .then(() => console.log("Page preloaded:", href))
    .catch(() => console.warn("Failed to preload page:", href));

  cross.style.pointerEvents = "none"; // Prevent multiple clicks
});

// ✅ Debugging: Check if internal navigation was triggered
if (sessionStorage.getItem("isInternalNavigation") === "true") {
  console.log("Page loaded via internal navigation.");
  // You can now apply special styles or animations for preloader
}
