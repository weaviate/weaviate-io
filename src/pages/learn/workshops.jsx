import React from 'react';
import Layout from '@theme/Layout';
import styles from '/src/components/Workshop/styles.module.scss';

export default function Workshops() {
  return (
    <Layout title="Workshops" description="Weaviate Workshops Page">
      <div className="custom-page">
        <div className="container">
          <div className={styles.box}>
            <h1>Weaviate Workshops</h1>
            <p className="text-center">
              We believe that the next wave of software infrastructure is
              AI-first and that a strong open-source community is a basis for
              creating high-quality software. Our workshops deliver new
              information and details on our service.
            </p>
          </div>
          <script
            src="https://static.elfsight.com/platform/platform.js"
            data-use-service-core
            defer
          ></script>
          <div class="elfsight-app-01a3e7d9-f320-4491-a464-8339fafe3e80"></div>
        </div>
      </div>
    </Layout>
  );
}
