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
            <Link to="#get-started">Get started</Link>
            <li>Quickstart</li>
            <li>Starter guides</li>
            <li>Introductory workshop</li>
          </ul>
          <ul>
            <Link to="#guided-courses">Guided courses</Link>
            <li>Weaviate Academy</li>
            <li>Workshops</li>
            <li>Webinars</li>
            <li>External courses</li>
          </ul>
          <ul>
            <Link to="#documentation">Documentation</Link>
            <li>How-tos</li>
            <li>References</li>
            <li>Concepts</li>
          </ul>
          <ul>
            <Link to="#code-examples">Code examples</Link>
            <li>Recipes</li>
            <li>Demos</li>
            <li>Source code</li>
          </ul>
          <ul>
            <Link to="#go-further">Go further</Link>
            <li>Forum</li>
            <li>Paper reviews</li>
            <li>Blog</li>
            <li>Podcast</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
