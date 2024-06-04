import React from 'react';
import { useEffect } from 'react';
import styles from './styles.module.scss';

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      // @TS-ignore
      if (window.hbspt) {
        // @TS-ignore
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: '228989b7-50f5-446c-90a6-5ed524210df9',
          target: '#hubspotForm',
        });
      }
    });
  }, []);
  return (
    <div className={styles.contactBackground} id="contact-sales">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form className={styles.formContact}>
              <h2 className={styles.title}>Get Started with Weaviate</h2>
              <div className={styles.links}></div>
              <div id="hubspotForm"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
