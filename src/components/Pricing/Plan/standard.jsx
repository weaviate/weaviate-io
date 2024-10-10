import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import CalculatorContainer from '../CalculatorContainer';

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
      <div className={styles.box}>
        <div className={styles.title}>
          <div className={styles.pricingIcon}></div>
          <h3>Serverless Cloud</h3>
        </div>
        <div className={styles.price}>
          <p>We manage everything for you in the Weaviate Cloud.</p>
          <div className={styles.bottomPrice}>
            <span>Starting at $25 /mo</span>
            <p>per 1M vector dimensions stored/month</p>
          </div>
          <Link
            className={styles.buttonTryOutline}
            to="https://console.weaviate.cloud"
          >
            Get Started
          </Link>
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
          <Link className={styles.buttonView} onClick={openModal}>
            View pricing
          </Link>
        </div>
      </div>
      <div
        className={`${styles.modals} ${isModalOpen ? styles.open : ''}`}
        style={{ display: isModalOpen ? 'flex' : 'none' }}
      >
        <div className={styles.modalContents}>
          <span className={styles.close} onClick={closeModal}>
            &times;
          </span>

          <CalculatorContainer />
        </div>
      </div>
    </>
  );
}
