// js/internal.js
import gsap from "gsap"; // Assuming you're using GSAP with modules
import { animateHomeLoading } from "./home-loading.js";
import "./hover-effects.js"; // Import the hover effects script

document.addEventListener("DOMContentLoaded", function () {
  // Function to check if it's the homepage
  function isHomePage() {
    return window.location.pathname === "/"; // Or whatever your homepage URL is
  }

  if (isHomePage()) {
    animateHomeLoading();
  }

  // ... (rest of your general website logic)
});
