// v21 hover-effects.js
document.addEventListener("DOMContentLoaded", function () {
  // Hover stuff
  let hoverEffectActive = false;
  let hoverEventHandler;
  let throttledHoverEventHandler; // Declare throttledHoverEventHandler in the outer scope
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
    throttledHoverEventHandler = throttle(hoverEventHandler, 50); // Assign throttledHoverEventHandler here
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
    if (hoverEventHandler && throttledHoverEventHandler) {
      document.removeEventListener(
        "mousemove",
        throttledHoverEventHandler // Use throttledHoverEventHandler here
      );
      hoverEventHandler = null; // Clear the handler reference
      // throttledHoverEventHandler = null; // Remove this line
    }
  }

  // Initialize hover effects only when loading animation is complete
  function initializeHoverEffects() {
    if (!window.terminalActive && !userHoverDisabled) {
      hoverEffectActive = true;
      initializeHoverScript();
    }
  }

  // Listen for a custom event to trigger hover initialization
  document.addEventListener("hoverEffectsReady", function () {
    if (window.loadingAnimationComplete) {
      initializeHoverEffects();
    } else {
      // If loading animation is not complete, wait and try again
      setTimeout(() => {
        if (window.loadingAnimationComplete) {
          initializeHoverEffects();
        } else {
          console.warn(
            "Loading animation still not complete, hover effects not initialized."
          );
        }
      }, 500); // Check again after 500ms
    }
  });

  const links = document.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      if (hoverEffectActive || !userHoverDisabled) {
        hoverEffectActive = false;
        userHoverDisabled = true;
        stopHoverScript();
      }
    });
  });

  window.monitorTerminalState = setInterval(() => {
    // Assign to the global variable
    if (window.terminalActive && hoverEffectActive) {
      hoverEffectActive = false;
      stopHoverScript();
    } else if (!window.terminalActive && !userHoverDisabled) {
      hoverEffectActive = true;
      initializeHoverScript();
    }
  }, 500);

  window.addEventListener("beforeunload", () => {
    if (window.monitorTerminalState) {
      // Check if window.monitorTerminalState is defined
      clearInterval(window.monitorTerminalState);
    }
  });
});
