import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function GoFurther() {
  return (
    <div className={styles.bgCol} id="go-further">
      <div className="container">
        <div className={styles.header}>
          <h2>Go Further</h2>
          <p>
            Training courses, resources, and support options for builders of all
            levels.<br></br> We’re with you on your AI journey.
          </p>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.typeContainer}>
            <Link to="https://forum.weaviate.io/">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={styles.homeIcon}></div>
                  <h2>Forum</h2>
                </div>
                <div className={styles.typeText}>
                  <p>Ask technical questions to the community & Weaviators</p>
                </div>
              </div>
            </Link>
            <Link to="/papers">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.papers}`}></div>
                  <h2>Paper reviews</h2>
                </div>
                <div className={styles.typeText}>
                  <p>Digestible summaries of the latest in Al & data science</p>
                </div>
              </div>
            </Link>
            <Link to="/podcast">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.podcast}`}></div>
                  <h2>Podcast</h2>
                </div>
                <div className={styles.typeText}>
                  <p>
                    Connor & guests dive into big topics & ideas in Al & data
                    science
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/blog">
              <div className={styles.typeBox}>
                <div className={styles.typeIcon}>
                  <div className={`${styles.homeIcon} ${styles.blog}`}></div>
                  <h2>Blog</h2>
                </div>
                <div className={styles.typeText}>
                  <p>More from the Weaviate team on what's going on</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
