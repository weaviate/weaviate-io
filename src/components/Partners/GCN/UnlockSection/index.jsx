import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function UnlockSection() {
  return (
    <div className={styles.benefits}>
      <div className="container">
        <h2>Uncover the potential of GenAI</h2>
        <div className={styles.wrapper}>
          <div className={styles.rightSide}>
            <div className={styles.teamImage}></div>
          </div>
          <div className={styles.leftSide}>
            <h4 className={styles.unlockHeaders}>
              Establish foundations to scale
            </h4>
            <p>
              Explore the purpose-built vector database for secure, stateful,
              and explainable generative AI applications.
            </p>
            <h4 className={styles.unlockHeaders}>See it in action</h4>
            <p>
              Learn how to simplify building generative AI applications powered
              by search, retrieval augmented generation, and generative feedback
              loops. Get a hands on demo from the Weaviate team at booth #1914.
            </p>
            <h4 className={styles.unlockHeaders}>
              Discover our Google Integrations
            </h4>
            <p>
              Find out how our integrations with Google AI Workbench and Vertex
              AI, including the latest Foundation Models like Gemini and PaLM
              LLMs, help developers build and deploy production-ready generative
              AI applications with less hassle.
            </p>

            <div className={styles.communityForm}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
