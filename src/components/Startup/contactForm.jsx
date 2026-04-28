import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function ContactForm() {
  const [title, setTitle] = useState('Get in touch with us');

  useEffect(() => {
    if (window.location.pathname === '/deployment/dedicated') {
      setTitle('Get Started with Dedicated Cloud');
    } else {
      setTitle('Redemption form');
    }

    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.setAttribute('data-cookieconsent', 'ignore');
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: '515ad9cd-8a0f-4fc4-8346-2446cd9b6899',
          target: '#hubspotForm',
        });
      }
    });

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={styles.contactBackground} id="redemptionForm">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form className={styles.formContact}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.links}></div>
              <div id="hubspotForm"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
