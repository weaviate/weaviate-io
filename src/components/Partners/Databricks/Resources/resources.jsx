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
          <h2 className={styles.title}>Resources</h2>
          <p className={styles.subtitle}>
            Learn and explore the latest from Weaviate across the web.
          </p>
        </div>
        <div className={styles.latestModule}>
          <Link to="/blog/genai-apps-with-weaviate-and-databricks">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} `}></div>
              <div className={styles.textBox}>
                <h3>Blog</h3>
                <p>
                  Build Scalable Gen AI Data Pipelines with Weaviate and
                  Databricks
                </p>
              </div>
            </div>
          </Link>

          <Link to="https://docs.weaviate.io/weaviate/model-providers/databricks">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} `}></div>
              <div className={styles.textBox}>
                <h3>Docs</h3>
                <p>Weaviate Model Providers: Databricks</p>
              </div>
            </div>
          </Link>

          <Link to="https://docs.weaviate.io/integrations/data-platforms/databricks">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} `}></div>
              <div className={styles.textBox}>
                <h3>Docs</h3>
                <p>Weaviate Data Platform Integrations: Databricks</p>
              </div>
            </div>
          </Link>
          <Link to="https://github.com/weaviate/recipes/blob/main/integrations/data-platforms/databricks/databricks-spark-connector-demo.ipynb">
            <div className={styles.latestBox}>
              <div className={`${styles.insideBox} `}></div>
              <div className={styles.textBox}>
                <h3>GitHub</h3>
                <p>Recipe: Databricks Spark connector</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
