// v48 hover-effects.js
let monitorTerminalState; // Declare monitorTerminalState in the global scope

document.addEventListener("DOMContentLoaded", function () {
  console.log("hover-effects.js: DOMContentLoaded");

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
    console.log("hover-effects.js: initializeHoverScript() called");
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

      // Get the position of the container element
      // const container = document.querySelector("#text-block"); // Replace with your container selector
      // if (!container) {
      //   console.warn("Container element not found!");
      //   return;
      // }
      // const containerRect = container.getBoundingClientRect();
      // const containerTop = containerRect.top;
      // const containerLeft = containerRect.left;

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

      // Check if the closest link is different from the last hovered link
      if (closestLink && closestLink !== lastHoveredLink) {
        // If a new link is hovered, add it to the queue and update the last hovered link
        hoveredLinksQueue.push(closestLink); // Add to the queue
        lastHoveredLink = closestLink; // Update the last hovered link
        processQueue(); // Start processing the queue
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

  function stopHoverScript() {
    if (hoverEventHandler) {
      document.removeEventListener(
        "mousemove",
        throttledHoverEventHandler // Use throttledHoverEventHandler here
      );
      hoverEventHandler = null; // Clear the handler reference
    }
  }

  // Listen for a custom event to trigger hover initialization
  document.addEventListener("hoverEffectsReady", function () {
    console.log("hover-effects.js: hoverEffectsReady event received");
    if (!window.terminalActive && !userHoverDisabled) {
      hoverEffectActive = true;
      initializeHoverScript();
    }
  });

  const links = document.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      // The following lines are the only changes from the previous version
      stopHoverScript(); // Always stop the hover script
      hoverEffectActive = false; // Set hoverEffectActive to false
      userHoverDisabled = true; // Set userHoverDisabled to true

      // Re-initialize hover effects after a delay
      setTimeout(() => {
        if (!window.terminalActive && userHoverDisabled) {
          // Only re-initialize if the user is still on the same page
          hoverEffectActive = true;
          userHoverDisabled = false;
          initializeHoverScript();
        }
      }, 750); // Wait 750ms
    });
  });

  window.addEventListener("beforeunload", () => {
    clearInterval(monitorTerminalState);
  });

  monitorTerminalState = setInterval(() => {
    // Assign to the global variable
    if (window.terminalActive && hoverEffectActive) {
      hoverEffectActive = false;
      stopHoverScript();
    } else if (!window.terminalActive && userHoverDisabled) {
      hoverEffectActive = true;
      initializeHoverScript();
    }
  }, 500);
});
