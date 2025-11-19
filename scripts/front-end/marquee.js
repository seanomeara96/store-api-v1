function animationEnd(el) {
  return new Promise((resolve) => el.addEventListener("animationend", resolve));
}

function isTopInViewport(elem) {
  const distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.top <=
      (window.innerHeight || document.documentElement.clientHeight)
  );
}

async function animateMarquee(el) {
  const $el = document.querySelector(el);

  if ($el.scrollWidth <= $el.offsetWidth) {
    return;
  }

  const speed =
    (($el.scrollWidth - $el.scrollLeft - $el.offsetWidth) / $el.scrollWidth) *
    8000;

  // stop existing animation
  $el.style.animation = "none";

  $el.animate(
    {
      opacity: [1, 1], // Ensures opacity stays 1
      transform: [
        `translateX(0px)`,
        `translateX(-${$el.scrollWidth - $el.offsetWidth}px)`,
      ],
    },
    {
      duration: speed,
      iterations: 1,
    },
  );

  // Wait for the animation to complete
  await animationEnd($el);

  // Reset scroll position
  $el.scrollLeft = 0;

  requestAnimationFrame(() => animateMarquee(el));
}

/**
 * Usage Instructions:
 * 1. Add a data attribute `data-marquee` to any element you want to animate as a marquee.
 * 2. Make sure that the content of the element is wider than its container to see the marquee effect.
 * 3. The script will automatically detect elements in the viewport and apply the marquee animation.
 * 4. Touch events will pause and resume the animation to allow for user interaction.
 */

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

window.addEventListener(
  "resize load",
  debounce(() => {
    document
      .querySelectorAll("[data-marquee]")
      .forEach((el) => isTopInViewport(el) && animateMarquee(el));
  }, 500),
);

document.body.addEventListener("touchstart", () => {
  document.querySelectorAll("[data-marquee]").forEach((m) => {
    m.style.animation = "none";
  });
});

document.body.addEventListener("touchend", () => {
  document
    .querySelectorAll("[data-marquee]")
    .filter((el) => isTopInViewport(el))
    .forEach((el) => animateMarquee(el));
});
