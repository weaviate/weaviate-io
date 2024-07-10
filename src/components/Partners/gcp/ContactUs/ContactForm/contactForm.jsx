import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function ContactForm() {
  return (
    <div className={styles.contactBackground} id="Form">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <iframe
              id="JotFormIFrame-233166493842058"
              width="600"
              height="1738"
              title="Step 2: Fill out the form below to get your shirt"
              onload="window.parent.scrollTo(0,0)"
              allowtransparency="true"
              allowfullscreen="true"
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/233166493842058"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
