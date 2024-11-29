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
          formId: '62e704b7-b857-421e-a30d-46ac0a3f5d81',
          target: '#hs-form',
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <div className={styles.demoContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.demoTitle}>
            <div className={styles.demoLogo}></div>
            <span></span>
            <h1 classname={styles.headerTag}>Weaviate AI Secret Party</h1>
          </div>
          <div className={styles.content}>
            <div className={styles.contentSideA}>
              <div className={styles.contentImage} />
            </div>
            <div className={styles.contentSideB}>
              <div className={styles.signUp}>
                <div className={styles.signUpBox}>
                  <h3>Request a ticket</h3>
                  <div className={styles.formWrapper}>
                    <div id="hs-form" className={styles.hsForm}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <span>Weaviate, 2024</span>
        <div className={styles.footerLinks}>
          <div className={styles.footerIcon}>
            <i className="fab fa-linkedin"></i>
          </div>
          <div className={styles.footerIcon}>
            <i className="fab fa-instagram"></i>
          </div>
          <div className={styles.footerIcon}>
            <i className="fab fa-twitter"></i>
          </div>
          <div className={styles.footerIcon}>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
    </>
  );
}
