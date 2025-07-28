import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

// TODO[g-despot]: Work in progress. Reuse this component where applicable (like quickstarts)
const NextSteps = ({ cards }) => {
  return (
    <div className="container margin-top--xs padding-top--xs margin-bottom--xs padding-bottom--xs">
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col col--6 margin-bottom--md">
            <div className={styles.nextStepsCard}>
              <Link to={card.link}>
                <div className={styles.nextStepsCardHeader}>
                  <h4>{card.title}</h4>
                </div>
                <div className={styles.nextStepsCardBody}>
                  <p>{card.description}</p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextSteps;
