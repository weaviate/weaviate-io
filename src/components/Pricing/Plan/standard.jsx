import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import Calculator from '../Calculator';
import SlaPlan from '../SLAS';
import { keysIn } from 'lodash';
export default function PricingStandard() {
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
          <h3>Serverless</h3>
        </div>
        <div className={styles.price}>
          <p>We manage everything for you in the Weaviate Cloud.</p>
          <p>
            Starting at <span className={styles.big}>$25 /mo</span>
          </p>
        </div>
        <hr></hr>
        <div className={styles.features}>
          <li>
            <div className={`${styles.checkIcon} ${styles.doubleIcon}`}></div>
            <span>Serverless SaaS deployment</span>
          </li>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Based on # vectors and objects stored</span>
          </li>
          <li>
            <div className={styles.checkIcon}></div>
            <span>Pay-as-you-go, on consumption</span>
          </li>

          <li>
            <div className={styles.checkIcon}></div>
            <span>
              SLA tiers:
              <ul>
                <li>
                  <div className={styles.checkIconWhite}></div>Standard
                </li>
                <li>
                  <div className={styles.checkIconWhite}></div>Enterprise
                </li>
                <li>
                  <div className={styles.checkIconWhite}></div>Business Critical
                </li>
              </ul>
            </span>
          </li>
        </div>
        <br />
        <br />
        <div className={styles.buttonBox}>
          <Link className={styles.buttonTry} onClick={openModal}>
            View Pricing Information
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
          <SlaPlan />
        </div>
      </div>
    </>
  );
}
