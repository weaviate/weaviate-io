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
          <Link to="https://aws.amazon.com/blogs/machine-learning/build-enterprise-ready-generative-ai-solutions-with-cohere-foundation-models-in-amazon-bedrock-and-weaviate-vector-database-on-aws-marketplace/">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource1}`}></div>
              <div className={styles.textBox}>
                <h3>Success story</h3>
                <p>
                  Build enterprise-ready generative AI solutions with Cohere +
                  Amazon Bedrock and Weaviate
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
          <Link to="https://innovativesol.com/success-stories/preverity/">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} ${styles.resource4}`}></div>
              <div className={styles.textBox}>
                <h3>Success Story</h3>
                <p>
                  Preverity looked to evolve their risk management and patient
                  safety products with AI.
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
