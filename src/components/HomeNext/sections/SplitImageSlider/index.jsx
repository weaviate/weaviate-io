import React, { useRef, useState, useEffect } from 'react';
import styles from './styles.module.scss';

export default function SplitImageSlider() {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [autoAnimating, setAutoAnimating] = useState(true);

  const handleStart = () => {
    setIsDragging(true);
    setAutoAnimating(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    if (!x) return;

    const newPos = ((x - bounds.left) / bounds.width) * 100;
    setSliderPos(Math.max(8, Math.min(92, newPos)));
  };

  useEffect(() => {
    if (!autoAnimating) return;

    let direction = 1;
    let pos = 50;
    let lastTime = null;
    let loopCount = 0;
    const maxLoops = 3;
    let pauseTimeout;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      const speed = 0.009;
      pos += direction * delta * speed;

      if (pos >= 88) {
        pos = 88;
        direction = -1;
        loopCount++;
      }

      if (pos <= 12) {
        pos = 12;
        direction = 1;
        loopCount++;
      }

      setSliderPos(pos);

      if (loopCount < maxLoops * 2) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        pauseTimeout = setTimeout(() => {
          if (!isDragging) {
            loopCount = 0;
            lastTime = null;
            rafRef.current = requestAnimationFrame(animate);
          }
        }, 3000);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
  }, [autoAnimating, isDragging]);

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
      <div className={styles.beforeLabel}>BEFORE WEAVIATE</div>
      <div className={styles.afterLabel}>WITH WEAVIATE</div>

      <div className={styles.imageWrapperBase}>
        <img
          src="/img/site/code-before-block.png"
          className={styles.image}
          alt="Before Weaviate"
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
            src="/img/site/code-after-block.png"
            className={styles.image}
            alt="With Weaviate"
          />
        </div>
      </div>

      <div className={styles.sliderLine} style={{ left: `${sliderPos}%` }} />
      <div className={styles.sliderHandle} style={{ left: `${sliderPos}%` }} />
    </div>
  );
}
