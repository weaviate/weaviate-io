import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function Header() {
  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <span>JavaScript and Weaviate</span>
            <h1>try our recipes</h1>
            <p>
              Recipes are topical code snippets covering popular use cases and integrations.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://github.com/weaviate/recipes-ts"
              >
                Get them on Github
              </Link>
              <Link className={styles.buttonOutline} to="https://replit.com/@malgamves/Weaviate-Typescript-Quickstart#index.ts">
              Get them on Replit
              </Link>
            </div>
          </div>
          <div className={styles.exampleBox}></div>
        </div>
      </div>
    </header>
  );
}
