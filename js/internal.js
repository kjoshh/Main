// js/internal.js (or a separate file)

document.addEventListener("DOMContentLoaded", function () {
  // Get the activate button
  const activateButton = document.getElementById("activate-terminal");

  // Add an event listener to the activate button
  if (activateButton) {
    activateButton.addEventListener("click", function () {
      // Call the initializeTerminalScript function from random.js
      initializeTerminalScript();
    });
  } else {
    console.error("Activate button not found!");
  }

  // ... (rest of your internal.js code)
});
