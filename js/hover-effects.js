document.addEventListener("DOMContentLoaded", function () {
  // Hover stuff
  let hoverEffectActive = false;
  let hoverEventHandler;
  let delayCompleted = false;
  let userHoverDisabled = false;
  let isFirstHover = true;
  if (typeof window.terminalActive === "undefined") {
    window.terminalActive = false;
  }

  // **Add the debounce function here, before initializeHoverScript**
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
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

    // **Replace the original event listener with the debounced version**
    const debouncedHoverEventHandler = debounce(hoverEventHandler, 10); // Adjust the delay as needed
    document.addEventListener("mousemove", debouncedHoverEventHandler);

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
      //document.removeEventListener("mousemove", hoverEventHandler); // Remove event listener
      document.removeEventListener("mousemove", debouncedHoverEventHandler); // Remove debounced event listener
      hoverEventHandler = null; // Clear the handler reference
    }
  }

  // Function to activate hover effect after delay (External Navigation)
  function externalActivateHoverEffectAfterDelay() {
    setTimeout(() => {
      delayCompleted = true;
      if (!window.terminalActive && !userHoverDisabled) {
        hoverEffectActive = true;
        initializeHoverScript();
      }
    }, 4225);
  }

  // Function to activate hover effect after delay (Internal Navigation)
  function internalActivateHoverEffectAfterDelay() {
    setTimeout(() => {
      delayCompleted = true;
      if (!window.terminalActive && !userHoverDisabled) {
        hoverEffectActive = true;
        initializeHoverScript();
      }
    }, 1150);
  }

  const monitorTerminalState = setInterval(() => {
    if (window.terminalActive && hoverEffectActive) {
      hoverEffectActive = false;
      stopHoverScript();
    } else if (
      !window.terminalActive &&
      !hoverEffectActive &&
      delayCompleted &&
      !userHoverDisabled
    ) {
      hoverEffectActive = true;
      initializeHoverScript();
    }
  }, 500);

  // Event listener for vidopen to disable hover effect
  const vidOpenElement = document.querySelector("#vidopen");
  if (vidOpenElement) {
    vidOpenElement.addEventListener("click", () => {
      if (hoverEffectActive || !userHoverDisabled) {
        hoverEffectActive = false;
        userHoverDisabled = true; // Set user disabled flag
        stopHoverScript();
      }
    });
  } else {
    console.warn("Element with ID 'vidopen' not found.");
  }

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

  window.addEventListener("beforeunload", () => {
    clearInterval(monitorTerminalState);
  });

  // Initialize hover effects based on navigation type
  function initializeHover() {
    const internal = isInternalNavigation(); // Use the shared function
    if (internal) {
      internalActivateHoverEffectAfterDelay();
    } else {
      externalActivateHoverEffectAfterDelay();
    }
  }

  initializeHover(); // Call the initialization function
});
