import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import Calculator from '../Calculator';
import SlaPlan from '../SLAS';
import { keysIn } from 'lodash';
export default function PricingBusinessCritical() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <div className={`${styles.pricingIcon} ${styles.byoc}`}></div>
          <h3>Bring Your Own Cloud</h3>
        </div>
        <div className={styles.price}>
          <p>
            Choose a fully-managed solution or 24/7 support within your VPC.
          </p>
          <div className={styles.bottomPrice}>
            <span></span>
            <p></p>
          </div>
          <Link className={styles.buttonTryOutline} to="#contact-sales">
            Contact Sales
          </Link>
        </div>

        <hr></hr>
        <div className={styles.features}>
          <p>
            For building and prototyping with seamless scaling and flexible
            pay-as-you-go pricing.
          </p>
          <ul>
            <li>
              <span>Serverless SaaS deployment</span>
            </li>
            <li>
              <span>Get started with a free trial in minutes</span>
            </li>
            <li>
              <span>Various SLA tiers to meet your needs</span>
            </li>
          </ul>
          <Link className={styles.buttonView} to="/services/byoc">
            Learn More
          </Link>
        </div>
      </div>
    </>
  );
}
