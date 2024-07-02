import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function GoFurther() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Go Further</h2>
          <p>
            Training courses, resources, and support options for builders of all
            levels. We’re with you on your AI journey.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Recipes</h2>
              </div>
              <div className={styles.typeText}>
                <p>Ask technical questions to the community & Weaviators</p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.workshops}`}></div>
                <h2>Demos</h2>
              </div>
              <div className={styles.typeText}>
                <p>Example projects and demo apps powered by Weaviate</p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.workshops}`}></div>
                <h2>Demos</h2>
              </div>
              <div className={styles.typeText}>
                <p>Example projects and demo apps powered by Weaviate</p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.workshops}`}></div>
                <h2>Demos</h2>
              </div>
              <div className={styles.typeText}>
                <p>Example projects and demo apps powered by Weaviate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
