import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import CalculatorContainer from '/src/components/Pricing/CalculatorContainer';

export default function PricingStandard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (window.location.pathname === '/pricing') {
      window.history.pushState(null, null, '/pricing/serverless');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (window.location.pathname === '/pricing/serverless') {
      window.history.replaceState(null, null, '/pricing');
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/pricing/serverless') {
      setIsModalOpen(true);
    }
  }, []);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);

  return (
    <>
      <div className={`${styles.box} ${styles.standardPlan}`}>
        <div className={styles.title}>
          <div>
            <h3>Serverless Cloud</h3>
            <span>We manage everything for you in the Weaviate Cloud.</span>
          </div>
          <div className={styles.totalBox}></div>
        </div>
        <hr></hr>
        <div className={styles.features}>
          <p>
            For building and prototyping with seamless scaling and flexible
            pay-as-you-go pricing.
          </p>
          <ul>
            <li>Serverless SaaS deployment</li>
            <li>Get started with a free trial in minutes</li>
            <li>Various SLA tiers to meet your needs</li>
          </ul>
        </div>
        <div className={styles.price}>
          <Link
            className={styles.buttonTryOutline}
            to="https://console.weaviate.cloud"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
