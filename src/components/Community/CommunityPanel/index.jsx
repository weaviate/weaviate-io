import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function CommunityPanel() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Join our Online Communities on Slack and Discourse</h2>
        <p>
          Connect with the Weaviate Team and hundreds of developers and data
          engineers! Our community is here to help you<br></br> with your
          projects and provide expert advice. Share how you build your apps with
          Weaviate.
        </p>
      </div>
      <div className={styles.box}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>
              EDUCATION &<br></br>ELEVATION
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              In order to stay up to date Weaviate heroes will have access to
              special educational material, activities and more:
              <ul>
                <li>Special education workshops</li>
                <li>Internal roundtables with Weaviators</li>
                <li>Access to dedicated content & material</li>
                <li>Feature previews</li>
              </ul>
            </p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>
              EDUCATION &<br></br>ELEVATION
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              In order to stay up to date Weaviate heroes will have access to
              special educational material, activities and more:
              <ul>
                <li>Special education workshops</li>
                <li>Internal roundtables with Weaviators</li>
                <li>Access to dedicated content & material</li>
                <li>Feature previews</li>
              </ul>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>
              EDUCATION &<br></br>ELEVATION
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              In order to stay up to date Weaviate heroes will have access to
              special educational material, activities and more:
              <ul>
                <li>Special education workshops</li>
                <li>Internal roundtables with Weaviators</li>
                <li>Access to dedicated content & material</li>
                <li>Feature previews</li>
              </ul>
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>
              EDUCATION &<br></br>ELEVATION
            </h3>
          </div>
          <div className={styles.contentDiv}>
            <p className={styles.textCardContent}>
              In order to stay up to date Weaviate heroes will have access to
              special educational material, activities and more:
              <ul>
                <li>Special education workshops</li>
                <li>Internal roundtables with Weaviators</li>
                <li>Access to dedicated content & material</li>
                <li>Feature previews</li>
              </ul>
            </p>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link className={styles.buttonGradient} to="#jobs">
            Join the Community
          </Link>
          <Link className={styles.buttonOutline} to="#interview-process">
            Join the Community
          </Link>
        </div>
      </div>
    </div>
  );
}
