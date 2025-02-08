//home-loading-animations.js
document.addEventListener("DOMContentLoaded", function () {
  // Animated Path Code (Run Immediately)
  const path = document.getElementById("animatedPath");

  if (path) {
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.opacity = "1";
    path.getBoundingClientRect();

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "linear",
      repeat: 0,
      delay: 0.55,
      yoyo: false,
    });
  }

  // Cache frequently used elements
  const loaderText = document.querySelectorAll(".linkwrap");
  const loaderImg = document.querySelectorAll(".imgbghome");
  const textBlock = document.querySelector("#text-block");
  const backRound = document.querySelector("._100wrap");
  const numberElement = document.getElementById("number");
  const mainInterface = document.getElementById("maininterf");
  const outbutton = document.querySelector(".outsidebutton");
  const menuoverlay = document.getElementById("menuoverlay");
  const pathsvg = document.getElementById("path-svg");
  const noisi = document.getElementById("grainiwrapppp");
  const beforeAllEmbed = document.querySelector(".before-all");

  // Reusable function for common animations
  function animateCommonElements() {
    gsap.set(loaderText, {
      opacity: 0,
      y: 10,
      willChange: "transform, opacity",
    });
    gsap.set([mainInterface, outbutton], {
      opacity: 0,
      y: 20,
      willChange: "transform, opacity",
    });
    gsap.set(menuoverlay, { opacity: 0, willChange: "opacity" });
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
      willChange: "transform, width, height, opacity",
    });
  }

  function animateInternalNavigation() {
    beforeAllEmbed.style.display = "none";
    textBlock.style.display = "none";
    pathsvg.style.display = "none";
    numberElement.style.display = "none";

    animateCommonElements();

    gsap.to(loaderImg, {
      width: "100%",
      height: "100%",
      duration: 1,
      ease: "power4.inOut",
      willChange: "width, height",
    });

    setTimeout(() => {
      textBlock.style.display = "flex";
      gsap.to(loaderText, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.2,
        ease: "power3.inOut",
        willChange: "transform, opacity",
      });
      gsap.to(menuoverlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut",
        willChange: "opacity",
        onComplete: () => {
          gsap.to(menuoverlay, {
            opacity: 0.5,
            width: "500px",
            duration: 1.2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            willChange: "opacity, width",
          });
          gsap.to([mainInterface, outbutton], {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.inOut",
            willChange: "transform, opacity",
          });
        },
      });
    }, 600);
  }

  function animateExternalNavigation() {
    beforeAllEmbed.style.display = "none";
    textBlock.style.display = "none";
    textBlock.style.opacity = "1";

    animateCommonElements();

    gsap.set(noisi, { opacity: 0, willChange: "opacity" });
    gsap.set(numberElement, {
      top: "calc(50% - 0px)",
      opacity: 0,
      willChange: "transform, opacity",
    });
    gsap.set(backRound, {
      backgroundColor: "#f0eade",
      willChange: "background-color",
    });

    // Animate the number counter directly
    gsap.to(numberElement, {
      textContent: "100", // Set the final text content
      duration: 3.65,
      ease: "none",
      snap: { textContent: 1 }, // Snap to integer values
      willChange: "textContent",
    });

    gsap.to(noisi, {
      opacity: 1,
      duration: 0.5,
      delay: 0.25,
      ease: "power2.inOut",
      willChange: "opacity",
    });
    gsap.to(numberElement, {
      top: "calc(50% - 20px)",
      duration: 0.35,
      opacity: 1,
      ease: "power2.inOut",
      delay: 0.5,
      willChange: "transform, opacity",
    });

    setTimeout(() => {
      gsap.to(loaderImg, {
        width: 300,
        height: 200,
        duration: 0.6,
        ease: "power2.inOut",
        delay: 1.25,
        stagger: 0.125,
        willChange: "width, height",
      });
      gsap.to(numberElement, {
        top: "calc(50% - 120px)",
        duration: 0.6,
        ease: "power2.inOut",
        delay: 1.25,
        willChange: "transform",
      });
      gsap.to(loaderImg, {
        width: "100%",
        height: "100%",
        duration: 1,
        delay: 2.55,
        ease: "power3.inOut",
        willChange: "width, height",
      });
      gsap.to(numberElement, {
        top: "calc(0% - 20px)",
        duration: 1,
        delay: 2.55,
        ease: "power3.inOut",
        willChange: "transform",
      });
      gsap.to([mainInterface, outbutton], {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: 3.35,
        ease: "power1.inOut",
        willChange: "transform, opacity",
      });

      setTimeout(() => {
        textBlock.style.display = "flex";
        gsap.to(loaderText, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.2,
          ease: "power3.inOut",
          willChange: "transform, opacity",
        });
        gsap.to(menuoverlay, {
          opacity: 1,
          duration: 0.3,
          delay: 0.75,
          ease: "power1.inOut",
          willChange: "opacity",
          onComplete: () => {
            gsap.to(menuoverlay, {
              opacity: 0.5,
              width: "500px",
              duration: 1.2,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
              willChange: "opacity, width",
            });
            pathsvg.style.display = "none";
          },
        });
      }, 3100);
    }, 750);
  }

  // Function to call the appropriate animation based on navigation type
  function mainExecution() {
    const internal = isInternalNavigation();
    if (internal) {
      animateInternalNavigation();
    } else {
      animateExternalNavigation();
    }
  }

  mainExecution();
});

// // loading-animations.js
// document.addEventListener("DOMContentLoaded", function () {
//   // Animated Path Code (Run Immediately)
//   const path = document.getElementById("animatedPath");

//   if (path) {
//     // Gesamtlänge des Pfades berechnen
//     const length = path.getTotalLength();

//     // Setzen der Anfangswerte für stroke-dasharray und stroke-dashoffset
//     path.style.strokeDasharray = length;
//     path.style.strokeDashoffset = length;
//     path.style.opacity = "1";
//     // Optional: Force a layout to apply the initial styles
//     path.getBoundingClientRect();

//     // GSAP-Animation: strokeDashoffset von der Länge des Pfades auf 0 animieren
//     gsap.to(path, {
//       strokeDashoffset: 0,
//       duration: 1.5, // Dauer in Sekunden
//       ease: "linear", // Lineare Animation für konstante Geschwindigkeit
//       repeat: 0,
//       delay: 0.55, // Keine Wiederholung
//       yoyo: false, // Kein Yoyo-Effekt (Rückwärtsanimation)
//     });
//   }

//   function animateInternalNavigation() {
//     const loaderText = document.querySelectorAll(".linkwrap");
//     const loaderImg = document.querySelectorAll(".imgbghome");
//     const textBlock = document.querySelector("#text-block");
//     const backRound = document.querySelector("._100wrap");
//     const numberElement = document.getElementById("number");
//     const mainInterface = document.getElementById("maininterf");
//     const outbutton = document.querySelector(".outsidebutton");
//     const menuoverlay = document.getElementById("menuoverlay");
//     const pathsvg = document.getElementById("path-svg");
//     const beforeAllEmbed = document.querySelector(".before-all");
//     beforeAllEmbed.style.display = "none";
//     textBlock.style.display = "none";
//     pathsvg.style.display = "none";
//     numberElement.style.display = "none";
//     gsap.set(loaderText, {
//       opacity: 0,
//       y: 10,
//     });
//     gsap.set([mainInterface, outbutton], {
//       opacity: 0,
//       y: 20,
//     });
//     gsap.set(menuoverlay, {
//       opacity: 0,
//     });
//     gsap.set(loaderImg, {
//       width: 0,
//       height: 0,
//       minWidth: "auto",
//       maxHeight: "none",
//       opacity: 1,
//       left: "50%",
//       top: "50%",
//       xPercent: -50,
//       yPercent: -50,
//       position: "absolute",
//     });
//     gsap.to(loaderImg, {
//       width: "100%",
//       height: "100%",
//       duration: 1,
//       ease: "power4.inOut",
//     });
//     setTimeout(() => {
//       textBlock.style.display = "flex";
//     }, 600);
//     gsap.to(loaderText, {
//       y: 0,
//       delay: 0.65,
//       opacity: 1,
//       stagger: 0.1,
//       duration: 0.2,
//       stagger: 0.05,
//       ease: "power3.inOut",
//     });
//     gsap.to(menuoverlay, {
//       opacity: 1,
//       duration: 0.3,
//       ease: "power1.inOut",
//       onComplete: () => {
//         gsap.to(menuoverlay, {
//           opacity: 0.5,
//           width: "500px",
//           duration: 1.2,
//           ease: "power1.inOut",
//           yoyo: true,
//           repeat: -1,
//         });
//         gsap.to([mainInterface, outbutton], {
//           opacity: 1,
//           y: 0,
//           duration: 0.3,
//           ease: "power1.inOut",
//         });
//       },
//     });
//   }

//   function animateExternalNavigation() {
//     const loaderText = document.querySelectorAll(".linkwrap");
//     const loaderImg = document.querySelectorAll(".imgbghome");
//     const textBlock = document.querySelector("#text-block");
//     const backRound = document.querySelector("._100wrap");
//     const numberElement = document.getElementById("number");
//     const mainInterface = document.getElementById("maininterf");
//     const outbutton = document.querySelector(".outsidebutton");
//     const menuoverlay = document.getElementById("menuoverlay");
//     const pathsvg = document.getElementById("path-svg");
//     const noisi = document.getElementById("grainiwrapppp");
//     const beforeAllEmbed = document.querySelector(".before-all");
//     beforeAllEmbed.style.display = "none";
//     textBlock.style.display = "none";
//     textBlock.style.opacity = "1";
//     gsap.set(loaderText, {
//       opacity: 0,
//       y: 10,
//     });
//     gsap.set(noisi, {
//       opacity: 0,
//     });
//     gsap.set(numberElement, {
//       top: "calc(50% - 0px)",
//       opacity: 0,
//     });
//     gsap.set(backRound, {
//       backgroundColor: "#f0eade",
//     });
//     gsap.set([mainInterface, outbutton], {
//       opacity: 0,
//       y: 20,
//     });
//     gsap.set(menuoverlay, {
//       opacity: 0,
//     });
//     gsap.set(loaderImg, {
//       width: 0,
//       height: 0,
//       minWidth: "auto",
//       maxHeight: "none",
//       opacity: 1,
//       left: "50%",
//       top: "50%",
//       xPercent: -50,
//       yPercent: -50,
//       position: "absolute",
//     });
//     let currentNumber = { value: 0 };
//     gsap.to(currentNumber, {
//       value: 100,
//       duration: 3.65,
//       ease: "none",
//       onUpdate: function () {
//         // Update the DOM with the current value
//         numberElement.textContent = `${Math.round(currentNumber.value)}`;
//       },
//       onComplete: function () {
//         numberElement.textContent = "100";
//       },
//     });
//     gsap.to(noisi, {
//       opacity: 1,
//       duration: 0.5,
//       delay: 0.25,
//       ease: "power2.inOut",
//     });
//     gsap.to(numberElement, {
//       top: "calc(50% - 20px)",
//       duration: 0.35,
//       opacity: 1,
//       ease: "power2.inOut",
//       delay: 0.5,
//     });
//     setTimeout(() => {
//       gsap.to(loaderImg, {
//         width: 300,
//         height: 200,
//         duration: 0.6,
//         ease: "power2.inOut",
//         delay: 1.25,
//         stagger: 0.125,
//       });
//       gsap.to(numberElement, {
//         top: "calc(50% - 120px)",
//         duration: 0.6,
//         ease: "power2.inOut",
//         delay: 1.25,
//       });
//       gsap.to(loaderImg, {
//         width: "100%",
//         height: "100%",
//         duration: 1,
//         delay: 2.55,
//         ease: "power3.inOut",
//       });
//       gsap.to(numberElement, {
//         top: "calc(0% - 20px)",
//         duration: 1,
//         delay: 2.55,
//         ease: "power3.inOut",
//       });
//       gsap.to([mainInterface, outbutton], {
//         opacity: 1,
//         y: 0,
//         duration: 0.3,
//         delay: 3.35,
//         ease: "power1.inOut",
//       });
//       setTimeout(() => {
//         textBlock.style.display = "flex";
//         gsap.to(loaderText, {
//           y: 0,
//           opacity: 1,
//           delay: 0.3,
//           stagger: 0.05,
//           duration: 0.2,
//           ease: "power3.inOut",
//         });
//         gsap.to(menuoverlay, {
//           opacity: 1,
//           duration: 0.3,
//           delay: 0.75,
//           ease: "power1.inOut",
//           onComplete: () => {
//             gsap.to(menuoverlay, {
//               opacity: 0.5,
//               width: "500px",
//               duration: 1.2,
//               ease: "power1.inOut",
//               yoyo: true,
//               repeat: -1,
//             });
//             pathsvg.style.display = "none";
//           },
//         });
//       }, 3100);
//     }, 750);
//   }

//   // Function to call the appropriate animation based on navigation type
//   function mainExecution() {
//     const internal = isInternalNavigation();
//     if (internal) {
//       animateInternalNavigation();
//     } else {
//       animateExternalNavigation();
//     }
//   }

//   mainExecution();
// });
