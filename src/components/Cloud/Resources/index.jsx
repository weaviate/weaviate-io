import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.bgContain}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Learn more about Weaviate Cloud</h2>
          <p className={styles.subtitle}>
            Our developer-approved resources will help you get started quickly
            Weaviate Cloud. And our team and community are here for support as
            you need us.
          </p>
        </div>
        <div className={styles.latestModule}>
          <Link to="/developers/weaviate">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource3}`}
              ></div>
              <h3>Documentation</h3>
              <p>Concepts, releases, research, how-tos and more.</p>
            </div>
          </Link>
          <Link to="/pricing">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource2}`}
              ></div>
              <h3>Pricing</h3>
              <p>
                Find the right plan for you, whether you're just starting out or
                scaling up.
              </p>
            </div>
          </Link>
          <Link to="/workbench">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource1}`}
              ></div>
              <h3>Workbench</h3>
              <p>
                Get started with Weaviate and learn how to get the most out of
                its features.
              </p>
            </div>
          </Link>
        </div>
        <div className={styles.latestModule}>
          <Link to="/deployment/serverless">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource4}`}
              ></div>
              <h3>Serverless Cloud</h3>
              <p> More information on Serverless Cloud</p>
            </div>
          </Link>
          <Link to="/deployment/byoc">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource2}`}
              ></div>
              <h3>Bring Your Own Cloud</h3>
              <p> More information on BYOC</p>
            </div>
          </Link>
          <Link to="/deployment/enterprise-cloud">
            <div className={styles.resourceBox}>
              <div
                className={`${styles.resourceIcon} ${styles.resource4}`}
              ></div>
              <h3>Enterprise Cloud</h3>
              <p> More information on Enterprise Cloud</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
