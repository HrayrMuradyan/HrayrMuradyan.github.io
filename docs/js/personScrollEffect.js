window.addEventListener("scroll", () => {
  const clip = document.querySelector(".summary_background_clip");
  const summary = document.querySelector(".summary_background");
  const rect = summary.getBoundingClientRect();

  // Control how far above the viewport the animation starts
  const triggerOffset = 500; // Increase this to delay entrance

  if (rect.top > window.innerHeight - triggerOffset) {
    const distance = Math.min(rect.top - (window.innerHeight - triggerOffset), 300);
    clip.style.transform = `translateX(${-distance}px)`;
  } else {
    clip.style.transform = "translateX(0)";
  }
});