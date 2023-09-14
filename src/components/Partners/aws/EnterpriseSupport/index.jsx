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
          <h2>End-to-end vector search and generative AI apps, faster</h2>
          <p>
            Weaviate is an open source vector database that's purpose-built for
            AI.<br></br> Tight integrations with AWS infrastructure and services
            like SageMaker<br></br> and Bedrock help developers build and deploy
            production-ready<br></br> generative AI applications with less
            hassle.
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}>
              <h4 className={styles.title}>AI-native architecture</h4>
            </div>
            <p className={styles.subTitle}>
              Sub-second semantic search performance and ability to scale to
              handle billions of vectors and millions of tenants.
            </p>
            <p className={styles.boxed}>Stream Governance</p>
            <p className={styles.boxed}>Stream Processing/ ksiqlDB</p>
            <p className={styles.boxed}>Multi-language Development</p>
            <p className={styles.boxed}>Infinite Storage</p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon2}>
              <h4 className={styles.title}>Modular integration framework</h4>
            </div>
            <p className={styles.subTitle}>
              Natively integrate with AWS SageMaker, AWS Bedrock, and model
              providers like Cohere, OpenAI, Hugging Face, and more. Or, use
              custom models.
            </p>
            <p className={styles.boxed}>120+ Pre-built Connectors</p>
            <p className={styles.boxed}>Cluster Linking</p>
            <p className={styles.boxed}>Certified ready on AWS Outpost</p>
            <p className={styles.boxed}>Amazon Redshift Service Ready</p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon3}>
              <h4 className={styles.title}>Secure deployment on AWS</h4>
            </div>
            <p className={styles.subTitle}>
              Weaviate is available in AWS marketplace and allows one-click
              container based scalable deployment inside the customers tenant.
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
