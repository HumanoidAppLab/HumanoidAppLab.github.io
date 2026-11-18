const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const introVideo = document.getElementById('intro-video');
if (introVideo && 'IntersectionObserver' in window) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const autoplayThreshold = 0.6;
  let shouldAutoplay = true;

  introVideo.addEventListener('play', () => {
    shouldAutoplay = false;
  }, { once: true });

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        introVideo.pause();
      } else if (entry.intersectionRatio >= autoplayThreshold && shouldAutoplay && !reducedMotion.matches) {
        shouldAutoplay = false;
        introVideo.play().catch(() => {
          // The visitor can still use the player controls if autoplay is blocked.
        });
      }
    }
  }, { threshold: [0, autoplayThreshold] });

  observer.observe(introVideo);
}
