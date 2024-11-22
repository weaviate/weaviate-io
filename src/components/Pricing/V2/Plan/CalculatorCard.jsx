import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import Calculator from '/src/components/Pricing/V2/Calculator';

export default function CalculatorCard() {
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
      <div className={`${styles.box} ${styles.calculatorCard}`}>
        <Calculator />
      </div>
    </>
  );
}
