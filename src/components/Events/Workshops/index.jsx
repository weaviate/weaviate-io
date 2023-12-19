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
    <>
      <header>
        <div className={styles.container}>
          <div className={styles.headerBox}>
            <h2>All our upcoming events around the World</h2>
            <p>
              Connect with the Weaviate Team and hundreds of developers and data
              engineers! Our community is here to help you with your projects
              and provide expert advice. Share how you build your apps with
              Weaviate.
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
                  <div className={styles.loader}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
