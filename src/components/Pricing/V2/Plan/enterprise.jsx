import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import EnterpriseContainer from '/src/components/Pricing/EnterpriseContainer';

export default function PricingEnterprise() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (window.location.pathname === '/pricing') {
      window.history.pushState(null, null, '/pricing/enterprise');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (window.location.pathname === '/pricing/enterprise') {
      window.history.replaceState(null, null, '/pricing');
    }
  };

  useEffect(() => {
    if (window.location.pathname === '/pricing/enterprise') {
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
      <div className={`${styles.box} ${styles.enterprisePlan}`}>
        <div className={styles.title}>
          <div>
            <h3>Enterprise Cloud</h3>
            <span>
              We manage everything for you in a dedicated instance in Weaviate
              Cloud.
            </span>
          </div>
          <div className={styles.totalBox}></div>
        </div>
        <hr></hr>
        <div className={styles.features}>
          <p>
            For deploying large-scale production use cases without the
            complexities of self-management.
          </p>
          <ul>
            <li>Dedicated resources for customer isolation</li>
            <li>Built for high-performance at large scale</li>
            <li>Optimize resource consumption with flexible storage tiers</li>
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

          <EnterpriseContainer closeModal={closeModal} />
        </div>
      </div>
    </>
  );
}
