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
          formId: '93643aca-5ec0-4043-a2cd-9cdead9d1239',
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
              <span>GUIDE</span>
              <h1 classname={styles.headerTag}>
                Agentic Architectures for Retrieval-intensive Applications
              </h1>
              <span className={styles.subTitle}>
                A comprehensive guide to mastering fundamentals, patterns, and
                examples of agentic architectures.
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
            This e-book is your comprehensive guide to understanding agentic
            architectures, especially for retrieval-intensive applications. It
            discusses the fundamentals of agentic architectures including its
            components, the different between single-agent and multi-agent
            architectures, and atomic patterns of agentic architectures. Then,
            it walks through various examples of agentic architectures for
            retrieval-intensive applications, discussing the underlying
            considerations for each. This e-book provides a solid foundation for
            your journey into agentic architectures.
          </p>
          <br></br>
          <ul>
            <li>Fundamentals of agentic architectures</li>
            <li>Components of AI agents</li>
            <li>Single-agent vs. multi-agent architectures</li>
            <li>Patterns in multi-agent systems</li>
          </ul>
        </div>
      </div>
    </>
  );
}
