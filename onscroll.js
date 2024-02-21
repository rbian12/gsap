gsap.registerPlugin(ScrollTrigger);

// Function to check if the current device is likely a desktop
function isDesktop() {
  return window.innerWidth > 1024; // Example breakpoint
}

if (isDesktop()) {
  // Select all elements with the data attribute ani-mate
  const elementsToAnimate = document.querySelectorAll('[data-ani-mate="right"], [data-ani-mate="left"], [data-ani-mate="bottom"]');

  elementsToAnimate.forEach((element) => {
    // Determine the direction based on the data attribute
    const direction = element.getAttribute('data-ani-mate');
    let startPositionX = 0; // Horizontal start position (for left/right)
    let startPositionY = 0; // Vertical start position (for bottom)

    // Adjust starting positions based on the animation direction
    if (direction === "left") {
      startPositionX = -100; // Start to the left
    } else if (direction === "right") {
      startPositionX = 100; // Start to the right
    } else if (direction === "bottom") {
      startPositionY = 100; // Start below
    }

    // Set initial state based on direction
    gsap.set(element, { x: startPositionX, y: startPositionY, opacity: 0 });

    // Create the scroll-triggered animation
    gsap.to(element, {
      x: 0, // Reset horizontal position to its natural state
      y: 0, // Reset vertical position to its natural state
      opacity: 1, // Fade in to full opacity
      ease: "power1.out", // Use a gentle easing function
      scrollTrigger: {
        trigger: element, // Use the element itself as the trigger
        start: "top +=100%", // Start the animation when the top of the element hits 80% of the viewport
        end: "bottom top", // End the animation when the bottom of the element passes the top of the viewport
      }
    });
  });
}
