import React, { useEffect } from 'react';
import styles from './styles.module.scss';

export default function WorkshopSection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const calendar = document.createElement('div');
      calendar.classList.add(
        'elfsight-app-01a3e7d9-f320-4491-a464-8339fafe3e80'
      );
      document.querySelector('.workshopContainer').appendChild(calendar);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className={styles.box}>
            <h2>Weaviate Workshops</h2>
            <div className={styles.headerBox}>
              <p>
                We believe that the next wave of software infrastructure is
                AI-first and that a strong open-source community is a basis for
                creating high-quality software. Our workshops deliver new
                information and details on our service.
              </p>
            </div>
          </div>
          <div className="workshopContainer"></div>
        </div>
      </header>
    </>
  );
}
