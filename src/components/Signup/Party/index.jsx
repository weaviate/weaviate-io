import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { css } from 'styled-components';

export default function Introduction() {
  useEffect(() => {
    // Load the external HubSpot form script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: 'b1edc7c4-e5ff-4077-832b-26c0ad4f5f7a',
          target: '#hs-form',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className={styles.demoContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.contentSideA}>
            <div className={styles.contentImage} />
          </div>
          <div className={styles.contentSideB}>
            <div className={styles.signUp}>
              <div className={styles.signUpBox}>
                <h1>Weaviate</h1>
                <h3>AI Builder Secret Party</h3>
                <div className={styles.formWrapper}>
                  <div id="hs-form" className={styles.hsForm}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
