import React, { useEffect } from 'react';
import styles from './styles.module.scss';

export default function ContactForm() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.setAttribute('data-cookieconsent', 'ignore');

    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: 'c722587c-7ef8-414b-a64e-e33a71bcf02c',
          target: '#hubspotForm',
        });
      }
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.contactBackground} id="contact-us">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form className={styles.formContact}>
              <h2 className={styles.title}>Get in touch with us</h2>
              <div className={styles.links}></div>
              <div id="hubspotForm"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
