import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function ContactForm() {
  return (
    <div className={styles.contactBackground} id="meetingForm">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSen-orc85VQyajMjTLrULDJUuk2b8Tfl2gsZ-yzExgFxSzJCA/viewform?embedded=true"
              width="600"
              height="1738"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
