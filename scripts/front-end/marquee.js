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

  if ($el.scrollWidth <= Math.round($el.outerWidth())) {
    return;
  }

  const speed =
    (($el.scrollWidth - $el.scrollLeft() - Math.round($el.outerWidth())) /
      $el.scrollWidth) *
    8000;

  // stop existing animation
  $el.style.animation = "none";

  $el.animate(
    {
      opacity: 1,
    },
    1000
  );

  await animationEnd($el);

  $el.animate(
    {
      scrollLeft: $el.scrollWidth - Math.round($el.outerWidth()),
    },
    speed
  );

  await animationEnd($el);

  $el.animate(
    {
      opacity: 0,
    },
    1000
  );

  await animationEnd($el);

  $el.scrollLeft(0);

  $el.animate(
    {
      opacity: 1,
    },
    500
  );

  await animationEnd($el);

  animateMarquee(el);
}

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
      .filter((el) => isTopInViewport(el))
      .forEach((el) => animateMarquee(el));
  }, 500)
);

document.body.addEventListener("touchstart", () => {
  const m = document.querySelector("[data-marquee]");
  m.style.animation = "none";
});

document.body.addEventListener("touchend", () => {
  document
    .querySelectorAll("[data-marquee]")
    .filter((el) => isTopInViewport(el))
    .forEach((el) => animateMarquee(el));
});
