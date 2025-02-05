import React, { useState } from 'react';
import { ButtonContainer } from '/src/theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.bgCol}>
      <div className={styles.container}>
        <div className={styles.boxContainer}>
          <ul>
            <Link to="#what-is-an-ai-database">Concept</Link>
          </ul>
          <ul>
            <Link to="#examples">Examples</Link>
          </ul>
          <ul>
            <Link to="#tools">Tools</Link>
          </ul>
          <ul>
            <Link to="#design">Design</Link>
          </ul>
          <ul>
            <Link to="#go-further">Summary</Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
