// v3 hover-effects.js
document.addEventListener("DOMContentLoaded", function () {
  // Hover stuff
  let hoverEffectActive = false;
  let hoverEventHandler;
  let userHoverDisabled = false;

  if (typeof window.terminalActive === "undefined") {
    window.terminalActive = false;
  }

  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  function initializeHoverScript() {
    if (!hoverEffectActive) return;
    const hoveredLinksQueue = [];
    let isHovering = false;
    let lastHoveredLink = null;
    hoverEventHandler = (event) => {
      if (!hoverEffectActive) return;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const links = document.querySelectorAll(".link");
      let closestLink = null;
      let smallestDistance = Infinity;
      links.forEach((link) => {
        const rect = link.getBoundingClientRect();
        const linkCenterX = (rect.left + rect.right) / 2;
        const linkCenterY = (rect.top + rect.bottom) / 2;
        const distance = Math.sqrt(
          Math.pow(mouseX - linkCenterX, 2) + Math.pow(mouseY - linkCenterY, 2)
        );
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestLink = link;
        }
      });
      if (closestLink && closestLink !== lastHoveredLink) {
        hoveredLinksQueue.push(closestLink);
        lastHoveredLink = closestLink;
        processQueue();
      }
    };

    // **Replace the original event listener with the throttled version**
    const throttledHoverEventHandler = throttle(hoverEventHandler, 50); // Adjust the limit as needed
    document.addEventListener("mousemove", throttledHoverEventHandler);

    function processQueue() {
      if (!hoverEffectActive || isHovering || hoveredLinksQueue.length === 0)
        return;
      isHovering = true;
      const link = hoveredLinksQueue.shift();
      link.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
      setTimeout(() => {
        link.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
        isHovering = false;
        processQueue();
      }, 80);
    }
  }

  // Function to stop the hover script
  function stopHoverScript() {
    if (hoverEventHandler) {
      document.removeEventListener(
        "mousemove",
        throttledHoverEventHandler // Use throttledHoverEventHandler here
      );
      hoverEventHandler = null; // Clear the handler reference
    }
  }

  // Initialize hover effects after a fixed delay
  setTimeout(function () {
    if (!window.terminalActive && !userHoverDisabled) {
      hoverEffectActive = true;
      initializeHoverScript();
    }
  }, 1250); // Wait 1.25 seconds after DOMContentLoaded

  // // Event listener for vidopen to disable hover effect
  // const vidOpenElement = document.querySelector("#vidopen");
  // if (vidOpenElement) {
  //   vidOpenElement.addEventListener("click", () => {
  //     if (hoverEffectActive || !userHoverDisabled) {
  //       hoverEffectActive = false;
  //       userHoverDisabled = true; // Set user disabled flag
  //       stopHoverScript();
  //     }
  //   });
  // } else {
  //   console.warn("Element with ID 'vidopen' not found.");
  // }

  // const links = document.querySelectorAll("a");
  // links.forEach(function (link) {
  //   link.addEventListener("click", function (event) {
  //     const href = this.getAttribute("href");
  //     if (hoverEffectActive || !userHoverDisabled) {
  //       hoverEffectActive = false;
  //       userHoverDisabled = true;
  //       stopHoverScript();
  //     }
  //   });
  // });

  window.addEventListener("beforeunload", () => {
    clearInterval(monitorTerminalState);
  });
});
