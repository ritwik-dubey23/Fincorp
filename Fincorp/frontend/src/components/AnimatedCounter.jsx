import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ target, end, suffix = '%', prefix = '', className = '' }) => {
  const finalTarget = Number(target ?? end ?? 100);
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
          const increment = finalTarget / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= finalTarget) {
              setCount(finalTarget);
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
  }, [finalTarget]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
