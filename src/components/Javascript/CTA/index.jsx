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
            Build AI-Native Applications with Javascript
          </h2>
          <div className={styles.buttons}>
            <Link className={styles.buttonOutline} to="/developers/weaviate/client-libraries/typescript/typescript-v3">
              Explore the Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
