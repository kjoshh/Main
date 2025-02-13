document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll("[data-click-effect]");

  elements.forEach((element) => {
    element.addEventListener("click", function () {
      gsap.to(element, {
        scale: 0.95,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
      });
    });
  });
});
