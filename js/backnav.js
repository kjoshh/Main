// Function to set internal navigation state
function setInternalNavigationState(event) {
  sessionStorage.setItem("isInternalNavigation", "true");
}

// Attach event listener to the internal link with ID 'crosslink'
const internalLink = document.getElementById("cross");

if (internalLink) {
  internalLink.addEventListener("click", setInternalNavigationState);
}
