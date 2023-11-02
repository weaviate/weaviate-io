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
              loops. Get a hands on demo from the Weaviate team at booth #1620.
            </p>
            <h4 className={styles.unlockHeaders}>
              Attend our speaking session
            </h4>
            <p>
              Hear our CEO share what’s possible when you combine Weaviate with
              AWS infrastructure and services. Read our session description for
              more information and make sure to add it to your schedule!
            </p>

            <div className={styles.communityForm}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
