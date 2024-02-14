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
          <h2>
            End-to-end vector search and<br></br> generative AI apps, faster
          </h2>
          <p>
            Weaviate is an open source vector database that's purpose-built for
            AI. Weaviate cloud service is natively built on Google Cloud and
            scales using Google Kubernetes Engine. Integrations with Google AI
            Workbench and Vertex AI, including the latest Foundation Models like
            Gemini Pro and Ultra LLMs, help developers build and deploy
            production-ready generative AI applications with less hassle.
          </p>
        </div>
        <div className={styles.features}>
          <div className={styles.box}>
            <div className={styles.icon1}></div>
            <h4 className={styles.title}>AI-native architecture</h4>

            <p className={styles.subTitle}>
              Sub-second semantic search performance and ability to scale to
              handle billions of vectors and millions of tenants.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon2}> </div>
            <h4 className={styles.title}>Modular integration framework</h4>

            <p className={styles.subTitle}>
              Natively integrate with Gemini Pro and Ultra, PaLM, Vertex AI, and
              model providers like Cohere, OpenAI, Hugging Face, and more. Or,
              use custom models.
            </p>
          </div>
          <div className={styles.box}>
            <div className={styles.icon3}> </div>
            <h4 className={styles.title}>Secure deployment on GCP</h4>

            <p className={`${styles.subTitle} ${styles.text3} `}>
              Weaviate is available in the GCP marketplace and allows one-click
              container based scalable deployment inside the customers’ tenant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
