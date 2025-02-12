const cross = document.getElementById("cross");

if (!cross) {
  return;
}

cross.addEventListener("click", function (e) {
  e.preventDefault();

  const href = "https://kernjosh.com/";

  sessionStorage.setItem("isInternalNavigation", "true");

  fetch(href, { mode: "no-cors" })
    .then(() => console.log("Page preloaded:", href))
    .catch(() => console.warn("Failed to preload page:", href));

  cross.style.pointerEvents = "none";
});

if (sessionStorage.getItem("isInternalNavigation") === "true") {
}
