import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';

export default function SplitImageSlider() {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleStart = () => setIsDragging(true);
  const handleEnd = () => setIsDragging(false);

  const handleMove = (e) => {
    if (!isDragging) return;
    const bounds = containerRef.current.getBoundingClientRect();
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    if (!x) return;
    const newPos = ((x - bounds.left) / bounds.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, newPos)));
  };

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
      {sliderPos >= 45 && (
        <div className={styles.beforeLabel}>BEFORE WEAVIATE</div>
      )}
      {sliderPos <= 55 && (
        <div className={styles.afterLabel}>WITH WEAVIATE</div>
      )}

      {/* Base image*/}
      <div className={styles.imageWrapperBase}>
        <img
          src="/img/site/code-after-block.png"
          className={styles.image}
          alt="After"
        />
      </div>

      {/* Overlay (clipped) */}
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

      {/* Handle */}

      <div className={styles.sliderHandle} style={{ left: `${sliderPos}%` }} />
      <div
        className={styles.sliderLine}
        style={{ left: `${sliderPos}%` }}
      ></div>
    </div>
  );
}
