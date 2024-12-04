import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.bgCol}>
      <div className={styles.container}>
        <div className={styles.boxContainer}>
          <ul>
            <Link to="#get-started">Get started</Link>
          </ul>
          <ul>
            <Link to="#guided-courses">Guided courses</Link>
          </ul>
          <ul>
            <Link to="#documentation">Documentation</Link>
          </ul>
          <ul>
            <Link to="#code-examples">Code examples</Link>
          </ul>
          <ul>
            <Link to="#go-further">Go further</Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
