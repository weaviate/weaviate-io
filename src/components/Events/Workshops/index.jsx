import React from 'react';
import styles from './styles.module.scss';

export default function WorkshopSection() {
  return (
    <div className={styles.container}>
      <div className={styles.headerBox}>
        <h2>Learn from the experts, we'll meet you where you are!</h2>

        <p>Join an online workshop or meet us in person at an event.</p>
      </div>

      <div className={styles.messageBox}>
        <p>
          Sorry, there are no events right now. Check back soon for future
          workshops and community events.
        </p>
      </div>
    </div>
  );
}
