import React from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../../theme/Buttons';
import Image from 'react';
import Link from '@docusaurus/Link';

export default function Resources() {
  return (
    <div className={styles.resourceBg}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>More Resources</h2>
          <p className={styles.subtitle}>
            Learn and explore the latest from Weaviate across the web.
          </p>
        </div>
        <div className={styles.latestModule}>
          <Link to="https://weaviate.io/developers/weaviate/model-providers/databricks">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} `}></div>
              <div className={styles.textBox}>
                <h3>Documentation</h3>
                <p>Databricks + Weaviate</p>
              </div>
            </div>
          </Link>

          <Link to="https://weaviate.io/developers/integrations/data-platforms/databricks">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} `}></div>
              <div className={styles.textBox}>
                <h3>Integrations</h3>
                <p>Databricks and Weaviate</p>
              </div>
            </div>
          </Link>
          <Link to="https://github.com/weaviate/recipes/blob/main/integrations/data-platforms/databricks/databricks-spark-connector-demo.ipynb">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} `}></div>
              <div className={styles.textBox}>
                <h3>Recipes</h3>
                <p>GitHub Repository</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
