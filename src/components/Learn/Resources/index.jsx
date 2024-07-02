import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Learning resources at a glance</h2>
        </div>
        <div className={styles.boxContainer}>
          <ul>
            <Link to="">Get started</Link>
            <li>Quickstart</li>
            <li>Starter guides</li>
            <li>Introductory workshop</li>
          </ul>
          <ul>
            <Link to="">Get started</Link>
            <li>Quickstart</li>
            <li>Starter guides</li>
            <li>Introductory workshop</li>
          </ul>
          <ul>
            <Link to="">Get started</Link>
            <li>Quickstart</li>
            <li>Starter guides</li>
            <li>Introductory workshop</li>
          </ul>
          <ul>
            <Link to="">Get started</Link>
            <li>Quickstart</li>
            <li>Starter guides</li>
            <li>Introductory workshop</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
