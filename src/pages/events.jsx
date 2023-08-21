import React from 'react';
import Layout from '@theme/Layout';
import styles from '../components/Events/styles.module.scss';
import ThemeSwitch from '../components/ThemeSwitch';

export default function events() {
  return (
    <Layout title="Events " description="Weaviate Events Page">
      <div className="custom-page">
        <div className={styles.centerBox}>
          <script
            src="https://static.elfsight.com/platform/platform.js"
            data-use-service-core
            defer
          ></script>
          <div class="elfsight-app-01a3e7d9-f320-4491-a464-8339fafe3e80"></div>
        </div>
      </div>
      <ThemeSwitch />
    </Layout>
  );
}
