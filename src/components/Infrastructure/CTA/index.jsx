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
          <h2 className={styles.title}>
            The AI-native database for a new generation of software
          </h2>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud"
            >
              Start Free
            </Link>
            <Link className={styles.buttonOutline} to="/platform">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
