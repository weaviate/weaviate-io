import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Use from '/src/components/Javascript/Use'
import Link from '@docusaurus/Link';

export default function Details() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
      <div className={styles.serviceBox}>
          <div className={styles.serviceText}>
            {/*  <div className={styles.serviceIcon}></div> */}

            <h2>New Content! 🚨</h2>

            <p>
              Check out our new academy course. Go from 0-1 with building AI-Native applications starting with working 
              on text data.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="/developers/academy/js/starter_text_data"
              >
                Jump In!
              </Link>
            </div>
          </div>
          <div className={styles.serviceImage}></div>

        </div>
        <Use />

        <div className={styles.header}>
          <h2>Learning Paths</h2>
          <p> Step by step to building AI-Native Applications</p>
          
        </div>
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Getting Started with Vector Search</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Understand the concepts and technology behind Vector Search.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/search"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.search}`}></div>
              <h2>Using Machine Learning Models</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to pick and use various Machine Learning models.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/concepts/modules"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={`${styles.homeIcon} ${styles.scale}`}></div>
              <h2>Building Web Applications </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Learn how to build production ready full-stack Web Applications.
              </p>
              <p>
              <Link
                className={styles.cardLink}
                to="/developers/weaviate/model-providers"
              >
                Learn more
              </Link>
            </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
