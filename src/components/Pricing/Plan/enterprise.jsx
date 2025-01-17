import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import EnterpriseContainer from '../EnterpriseContainer';

export default function PricingEnterprise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null); // Ref for the modal content

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

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

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
      <div className={styles.box}>
        <div className={styles.title}>
          <div className={`${styles.pricingIcon} ${styles.enterprise}`}></div>
          <h3>Enterprise Cloud</h3>
        </div>
        <div className={styles.price}>
          <p>
            We manage everything for you in a dedicated instance in Weaviate
            Cloud (Enterprise Vector Database).
          </p>
          <div className={styles.bottomPrice}>
            <span>from $2.64 / AIU</span>
            <p>AIU = AI Unit</p>
          </div>
          <Link className={styles.buttonTryOutline} to="#contact-sales">
            Contact Sales
          </Link>
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
        onClick={handleOutsideClick}
      >
        <div className={styles.modalContents} ref={modalRef}>
          <span className={styles.close} onClick={closeModal}>
            &times;
          </span>
          <EnterpriseContainer closeModal={closeModal} />
        </div>
      </div>
    </>
  );
}
