import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function enterpriseSupport() {
  return (
    <div className={styles.benefits}>
      <div className="container">
        <div className={styles.header}>
          <h2>Seamless Deployment and Enterprise Support</h2>
          <p>
            The ​Weaviate Kubernetes​ offering is part of Weaviate's Bring Your
            Own Cloud (BYOC)<br></br> offering, allowing you to deploy the
            vector database cluster inside your AWS tenant<br></br> and VPC. The
            deployment is end-to-end and comes with the Weaviate Enterprise
            <br></br>
            Terms​ (support) and Enterprise Service License Agreement.
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}>
              <h3 className={styles.title}>Build.</h3>
            </div>
            <p className={styles.subTitle}>
              Scale event processing on AWS to build real-time apps and
              analytics faster at a lower TCO.
            </p>
            <p className={styles.boxed}>Stream Governance</p>
            <p className={styles.boxed}>Stream Processing/ ksiqlDB</p>
            <p className={styles.boxed}>Multi-language Development</p>
            <p className={styles.boxed}>Infinite Storage</p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon2}>
              <h3 className={styles.title}>Scale.</h3>
            </div>
            <p className={styles.subTitle}>
              Scale event processing on AWS to build real-time apps and
              analytics faster at a lower TCO.
            </p>
            <p className={styles.boxed}>120+ Pre-built Connectors</p>
            <p className={styles.boxed}>Cluster Linking</p>
            <p className={styles.boxed}>Certified ready on AWS Outpost</p>
            <p className={styles.boxed}>Amazon Redshift Service Ready</p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon3}>
              <h3 className={styles.title}>Intergrate.</h3>
            </div>
            <p className={styles.subTitle}>
              Scale event processing on AWS to build real-time apps and
              analytics faster at a lower TCO.
            </p>
            <p className={styles.boxed}>Marketplace Integration</p>
            <p className={styles.boxed}>Flexible Payment Term</p>
            <p className={styles.boxed}>AWS PrivateLink ready partner</p>
            <p className={styles.boxed}>
              Monitoring with CloudWatch by<br></br>fully managed connectors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
