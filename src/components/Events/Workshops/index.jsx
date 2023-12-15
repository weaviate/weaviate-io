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
        'elfsight-app-0068937f-3d15-4161-9289-c657562f9f91'
      );
      document.querySelector('.workshopContainer').appendChild(calendar);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <header>
        <div className={styles.container}>
          <div className={styles.workshopWrapper}>
            <div className="workshopContainer"></div>
          </div>
        </div>
      </header>
    </>
  );
}
