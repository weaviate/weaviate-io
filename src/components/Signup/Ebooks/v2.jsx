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
    <div className={styles.demoContainer}>
      <div className={styles.demoSideA}>
        <div className={styles.demoLogo}></div>
        <span>EBOOK</span>
        <h1 classname={styles.headerTag}>
          Choosing the Right Database For AI 
        </h1>

        <ul>
          This guide covers:
          <li>A comparison of AI-native and traditional databases.</li>
          <li>
            Key considerations for powering scalable, cost-effective AI
            applications.{' '}
          </li>
          <li>
            Practical tips for indexing, hybrid search, and seamless integration
            with AI models.
          </li>
        </ul>
      </div>
      <div className={styles.demoSideB}>
        <div className={styles.signUp}>
          <div className={styles.signUpBox}>
            <div className={styles.formWrapper}>
              <div id="hs-form" className={styles.hsForm}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
