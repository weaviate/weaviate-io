import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.resourceBg}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>More Resources</h2>
          <p className={styles.subtitle}>
            Learn and explore the latest from Weaviate across the web.
          </p>
        </div>
        <div className={styles.latestModule}>
          <Link to="https://innovativesol.com/success-stories/livtech/">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource1}`}></div>
              <div className={styles.textBox}>
                <h3>Success story</h3>
                <p>
                  LivTech, a pioneer in health technology, advances physician
                  tech market with Generative AI
                </p>
              </div>
            </div>
          </Link>
          <Link to="https://www.youtube.com/watch?v=uHFM4sVHNxk">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource2}`}></div>
              <div className={styles.textBox}>
                <h3>Podcast</h3>
                <p>
                  Connor Shorten, Farshad Farahbakhshian and Etienne Dilocker on
                  Weaviate and AWS
                </p>
              </div>
            </div>
          </Link>
          <Link to="https://aws.amazon.com/marketplace/pp/prodview-cicacyv63r43i?sr=0-1&ref_=beagle&applicationId=AWSMPContessa">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource3}`}></div>
              <div className={styles.textBox}>
                <h3>Marketplace</h3>
                <p>Simple, secure deployment on AWS</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
