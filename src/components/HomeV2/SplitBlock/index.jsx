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
      {sliderPos <= 55 && (
        <div className={styles.beforeLabel}>BEFORE WEAVIATE</div>
      )}
      {sliderPos >= 45 && (
        <div className={styles.afterLabel}>WITH WEAVIATE</div>
      )}

      {/* Base image always visible */}
      <div className={styles.imageWrapperBase}>
        <img
          src="/img/site/gen-feedback-code-block.png"
          className={styles.image}
          alt="Before"
        />
      </div>

      {/* Overlay (clipped) */}
      <div className={styles.overlay} style={{ width: `${sliderPos}%` }}>
        <div className={styles.imageWrapperOverlay}>
          <img
            src="/img/site/hybrid-search-code-block.png"
            className={styles.image}
            alt="After"
          />
        </div>
      </div>

      {/* Handle */}
      <div className={styles.sliderHandle} style={{ left: `${sliderPos}%` }} />
    </div>
  );
}
