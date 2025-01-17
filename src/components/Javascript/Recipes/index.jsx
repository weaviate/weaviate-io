import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Recipes() {
  return (
    <div className="container">
      <div className={styles.grid}>
        <div className={styles.box}>
          <h2>Try our recipes</h2>
          <p>
            Recipes are topical code snippets covering popular use cases and
            integrations.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonLight}
              to="https://github.com/weaviate/recipes-ts"
            >
              Get them on GitHub
            </Link>
            <Link
              className={styles.buttonDark}
              to="https://replit.com/@malgamves/recipes-ts#readme.md"
            >
              Get them on Replit
            </Link>
          </div>
        </div>
        <div className={styles.image}></div>
      </div>
    </div>
  );
}
