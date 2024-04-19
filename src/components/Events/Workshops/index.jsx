import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function WorkshopSection() {
  const [isCalendarLoaded, setCalendarLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const calendar = document.createElement('div');
      calendar.classList.add(
        'elfsight-app-0068937f-3d15-4161-9289-c657562f9f91'
      );
      document.querySelector('.workshopContainer').appendChild(calendar);
      setTimeout(() => {
        setCalendarLoaded(true);
      }, 1000);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <h2>Our upcoming workshops & events around the world</h2>
        <p>
          We believe that the next wave of software infrastructure is AI-first
          and that a strong open-source community is a basis for creating
          high-quality software. <br/>Our workshops deliver new information and
          details on our service.
        </p>
      </div>
      <div className={styles.workshopWrapper}>
        <div className="workshopContainer">
          {!isCalendarLoaded && (
            <div className={styles.loadGrid}>
              <div className={styles.loader}></div>
              <div className={styles.loader}></div>
              <div className={styles.loader}></div>
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
