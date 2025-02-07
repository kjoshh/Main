// loading-animations.js
document.addEventListener("DOMContentLoaded", function () {
  function animateInternalNavigation() {
    const loaderText = document.querySelectorAll(".linkwrap");
    const loaderImg = document.querySelectorAll(".imgbghome");
    const textBlock = document.querySelector("#text-block");
    const backRound = document.querySelector("._100wrap");
    const numberElement = document.getElementById("number");
    const mainInterface = document.getElementById("maininterf");
    const outbutton = document.querySelector(".outsidebutton");
    const menuoverlay = document.getElementById("menuoverlay");
    const pathsvg = document.getElementById("path-svg");
    const beforeAllEmbed = document.querySelector(".before-all");
    beforeAllEmbed.style.display = "none";
    textBlock.style.display = "none";
    pathsvg.style.display = "none";
    numberElement.style.display = "none";
    gsap.set(loaderText, {
      opacity: 0,
      y: 10,
    });
    gsap.set([mainInterface, outbutton], {
      opacity: 0,
      y: 20,
    });
    gsap.set(menuoverlay, {
      opacity: 0,
    });
    gsap.set(loaderImg, {
      width: 0,
      height: 0,
      minWidth: "auto",
      maxHeight: "none",
      opacity: 1,
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      position: "absolute",
    });
    gsap.to(loaderImg, {
      width: "100%",
      height: "100%",
      duration: 1,
      ease: "power4.inOut",
    });
    setTimeout(() => {
      textBlock.style.display = "flex";
    }, 600);
    gsap.to(loaderText, {
      y: 0,
      delay: 0.65,
      opacity: 1,
      stagger: 0.1,
      duration: 0.2,
      stagger: 0.05,
      ease: "power3.inOut",
    });
    gsap.to(menuoverlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(menuoverlay, {
          opacity: 0.5,
          width: "500px",
          duration: 1.2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to([mainInterface, outbutton], {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.inOut",
        });
      },
    });
  }

  function animateExternalNavigation() {
    const loaderText = document.querySelectorAll(".linkwrap");
    const loaderImg = document.querySelectorAll(".imgbghome");
    const textBlock = document.getElementById("text-block");
    const backRound = document.querySelector("._100wrap");
    const numberElement = document.getElementById("number");
    const mainInterface = document.getElementById("maininterf");
    const outbutton = document.querySelector(".outsidebutton");
    const menuoverlay = document.getElementById("menuoverlay");
    const pathsvg = document.getElementById("path-svg");
    const noisi = document.getElementById("grainiwrapppp");
    const beforeAllEmbed = document.querySelector(".before-all");
    beforeAllEmbed.style.display = "none";
    textBlock.style.display = "none";
    textBlock.style.opacity = "1";
    gsap.set(loaderText, {
      opacity: 0,
      y: 10,
    });
    gsap.set(noisi, {
      opacity: 0,
    });
    gsap.set(numberElement, {
      top: "calc(50% - 0px)",
      opacity: 0,
    });
    gsap.set(backRound, {
      backgroundColor: "#f0eade",
    });
    gsap.set([mainInterface, outbutton], {
      opacity: 0,
      y: 20,
    });
    gsap.set(menuoverlay, {
      opacity: 0,
    });
    gsap.set(loaderImg, {
      width: 0,
      height: 0,
      minWidth: "auto",
      maxHeight: "none",
      opacity: 1,
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      position: "absolute",
    });
    let currentNumber = { value: 0 };
    gsap.to(currentNumber, {
      value: 100,
      duration: 3.65,
      ease: "none",
      onUpdate: function () {
        // Update the DOM with the current value
        numberElement.textContent = `${Math.round(currentNumber.value)}`;
      },
      onComplete: function () {
        numberElement.textContent = "100";
      },
    });
    gsap.to(noisi, {
      opacity: 1,
      duration: 0.5,
      delay: 0.25,
      ease: "power2.inOut",
    });
    gsap.to(numberElement, {
      top: "calc(50% - 20px)",
      duration: 0.35,
      opacity: 1,
      ease: "power2.inOut",
      delay: 0.5,
    });
    setTimeout(() => {
      gsap.to(loaderImg, {
        width: 300,
        height: 200,
        duration: 0.6,
        ease: "power2.inOut",
        delay: 1.25,
        stagger: 0.125,
      });
      gsap.to(numberElement, {
        top: "calc(50% - 120px)",
        duration: 0.6,
        ease: "power2.inOut",
        delay: 1.25,
      });
      gsap.to(loaderImg, {
        width: "100%",
        height: "100%",
        duration: 1,
        delay: 2.55,
        ease: "power3.inOut",
      });
      gsap.to(numberElement, {
        top: "calc(0% - 20px)",
        duration: 1,
        delay: 2.55,
        ease: "power3.inOut",
      });
      gsap.to([mainInterface, outbutton], {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 3.35,
        ease: "power1.inOut",
      });
      setTimeout(() => {
        textBlock.style.display = "flex";
        gsap.to(loaderText, {
          y: 0,
          opacity: 1,
          delay: 0.3,
          stagger: 0.05,
          duration: 0.2,
          ease: "power3.inOut",
        });
        gsap.to(menuoverlay, {
          opacity: 1,
          duration: 0.3,
          delay: 0.75,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(menuoverlay, {
              opacity: 0.5,
              width: "500px",
              duration: 1.2,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            });
            pathsvg.style.display = "none";
          },
        });
      }, 3100);
    }, 750);
  }

  // Function to call the appropriate animation based on navigation type
  function mainExecution() {
    const internal = isInternalNavigation(); // Use the shared function
    if (internal) {
      animateInternalNavigation();
    } else {
      animateExternalNavigation();
    }
  }

  mainExecution(); // Call the execution function
});
