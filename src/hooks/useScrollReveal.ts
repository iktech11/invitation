import { useEffect } from 'react';

export function useScrollReveal(dependencies: any[] = []) {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to keep rendered smoothly
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    // Handle any elements that might already be in viewport
    const handleInitialCheck = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
          el.classList.add('is-revealed');
        }
      });
    };

    const timer = setTimeout(handleInitialCheck, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, dependencies);
}
