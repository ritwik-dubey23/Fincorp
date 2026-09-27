import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, suffix = '%', prefix = '', className = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let start = 0;
          const duration = 1200; // ms
          const steps = 30;
          const stepTime = duration / steps;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.round(start));
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
