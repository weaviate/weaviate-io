import Link from '@docusaurus/Link';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { css } from 'styled-components';

export default function Introduction() {
  useEffect(() => {
    // Load the external HubSpot form script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.setAttribute('data-cookieconsent', 'ignore');
    script.async = true;
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '8738733',
          formId: '5bcb8eca-d759-42f3-93f0-343ff958911a',
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
              <h1 classname={styles.headerTag}>The AI Strategy Playbook</h1>
              <span className={styles.subTitle}>
                The AI Leader’s Guide to Operationalizing AI
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
            Whether you’re a startup founder, a technical leader at a large
            enterprise, or an individual who wants to bring AI to your
            workplace, this e-book is here to help you navigate the complexities
            of AI adoption.{' '}
          </p>
          <p>
            You'll learn how to clearly define and articulate the business value
            of your AI project, navigate strategic conversations, and secure the
            necessary backing and resources to launch and scale your project.
          </p>
          <br></br>
          <ul>
            <p className={styles.listHeader}>
              The AI Strategy Playbook covers:
            </p>
            <li>Defining your business problem</li>
            <li>Organizational readiness</li>
            <li>Calculating return on investment (ROI)</li>
            <li>Data assessment</li>
            <li>Technical readiness</li>
            <li>Scalability and growth</li>
          </ul>
          <h3>About the author</h3>
          <div className={styles.authorBox}>
            <div className={styles.authorImage}></div>
            <div className={styles.authorInfo}>
              <h4>Byron Voorbach</h4>
              <h5>Field CTO at Weaviate</h5>
            </div>
          </div>
          <p>
            Byron Voorbach has spent over a decade in the search domain,
            consulting hundreds of companies and aiding in implementing
            large-scale search systems. As the Field CTO at Weaviate, he
            collaborates with customers globally to harness the power of
            semantic search in their operations.
          </p>
          <p>
            He’s also a regular conference speaker and active contributor to
            open-source projects. When he’s not helping companies build and
            scale their AI projects, he enjoys spending time with his two cats,
            scuba diving, and traveling the world.
          </p>
          <p>
            Connect with him on{' '}
            <Link to="https://www.linkedin.com/in/byronvoorbach/">
              LinkedIn
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}
