import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './V2/styles.module.scss';
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
          </div>
          <div className={styles.content}>
            <div className={styles.contentSideA}>
              <div className={styles.reportImage}></div>
            </div>
            <div className={styles.contentSideB}>
              <span>EBOOK</span>
              <h1 classname={styles.headerTag}>
                Choosing the Right Database For AI
              </h1>
              <span className={styles.subTitle}>
                A guide to help you choose the right database for your AI
                applications.
              </span>
              <div className={styles.signUp}>
                <div className={styles.signUpBox}>
                  <div className={styles.formWrapper}>
                    <div id="hs-form" className={styles.ebookForm}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentBottom}>
        <div>
          <h3>About the guide</h3>
          <p>
            Choosing the right database is crucial to the success of your AI
            projects. This guide will help you understand the key differences
            between AI-native and traditional databases, and provide practical
            tips for powering scalable, cost-effective AI applications
          </p>
          <br></br>
          <ul>
            <li>A comparison of AI-native and traditional databases.</li>
            <li>
              Key considerations for powering scalable, cost-effective AI
              applications.{' '}
            </li>
            <li>
              Practical tips for indexing, hybrid search, and seamless
              integration with AI models.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
