import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';

export default function SplitImageSlider() {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [autoAnimating, setAutoAnimating] = useState(true);
  const rafRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false); // NEW

  const handleStart = () => {
    setIsDragging(true);
    setAutoAnimating(false);
    cancelAnimationFrame(rafRef.current);
  };
  const handleEnd = () => setIsDragging(false);

  const handleMove = (e) => {
    if (!isDragging) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    if (!x) return;
    const newPos = ((x - bounds.left) / bounds.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, newPos)));
  };

  useEffect(() => {
    setIsMounted(true); // Hydration done, show slider
  }, []);

  useEffect(() => {
    if (!autoAnimating) return;

    let direction = 1;
    let pos = 50;
    let lastTime = null;
    let loopCount = 0;
    const maxLoops = 3;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      const speed = 0.009;

      pos += direction * delta * speed;

      if (pos >= 90) {
        pos = 90;
        direction = -1;
        loopCount++;
      }
      if (pos <= 10) {
        pos = 10;
        direction = 1;
        loopCount++;
      }

      setSliderPos(pos);

      if (loopCount < maxLoops * 2) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Pause, then restart after 4s if no interaction
        setTimeout(() => {
          if (!isDragging && autoAnimating) {
            loopCount = 0;
            rafRef.current = requestAnimationFrame(animate);
          }
        }, 4000);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [autoAnimating, isDragging]);

  if (!isMounted) return null; // Do not render on first server paint

  return (
    <div
      className={styles.sliderContainer}
      ref={containerRef}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onMouseMove={handleMove}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchMove={handleMove}
    >
      {sliderPos >= 49 && (
        <div className={styles.beforeLabel}>BEFORE WEAVIATE</div>
      )}
      {sliderPos <= 50 && (
        <div className={styles.afterLabel}>WITH WEAVIATE</div>
      )}

      <div className={styles.imageWrapperBase}>
        <img
          src="/img/site/code-after-block.png"
          className={styles.image}
          alt="After"
        />
      </div>

      <div
        className={styles.overlay}
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <div className={styles.imageWrapperOverlay}>
          <img
            src="/img/site/code-before-block.png"
            className={styles.image}
            alt="Before"
          />
        </div>
      </div>

      <div className={styles.sliderHandle} style={{ left: `${sliderPos}%` }} />
      <div
        className={styles.sliderLine}
        style={{ left: `${sliderPos}%` }}
      ></div>
    </div>
  );
}
