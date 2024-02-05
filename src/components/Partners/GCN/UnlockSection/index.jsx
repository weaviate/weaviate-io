import React from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function UnlockSection() {
  return (
    <div className={styles.benefits}>
      <div className="container">
        <h2>Harness the power of generative AI</h2>
        <div className={styles.wrapper}>
          <div className={styles.rightSide}>
            <div className={styles.teamImage}></div>
          </div>
          <div className={styles.leftSide}>
            <h4 className={styles.unlockHeaders}>
              Accelerate multimodal discovery
            </h4>
            <p>
              Learn how to build multimodal search and generative applications
              that are reliable, secure, and scalable— in less time.
            </p>
            <h4 className={styles.unlockHeaders}>See it in action</h4>
            <p>
              Get a hands-on demo from the Weaviate technical team at booth
              #1914. Explore uses cases across search, retrieval augmented
              generation, and generative feedback loops.
            </p>
            <h4 className={styles.unlockHeaders}>
              Learn about our Google integrations
            </h4>
            <p>
              Find out how our integrations with Google AI Workbench and Vertex
              AI, including the latest Foundation Models like Gemini and PaLM
              LLMs, help developers build and deploy production-ready generative
              AI applications.
            </p>

            <div className={styles.communityForm}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
