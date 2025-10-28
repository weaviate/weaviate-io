import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import PricingHeader from '/src/components/Pricing/Header';
import PricingPlan from '/src/components/Pricing/Plan';
import PricingFAQ from '/src/components/Pricing/FAQ';
import ContactUsForm from '/src/components/Contact/contactForm';
import Soc2 from '/src/components/Pricing/SOC2/soc2';
import ThemeSwitch from '/src/components/ThemeSwitch';
import CustomScriptLoader from '/src/components/scriptSwitch/index.jsx';
import CalculatorContainer from '/src/components/Pricing/CalculatorContainer/index.jsx';
import styles from '/src/components/Pricing/Plan/styles.module.scss';

export default function ServerlessPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
    <div className="custom-page noBG">
      <Layout
        title="Serverless Pricing"
        description="Serverless Pricing models"
      >
        <PricingHeader />

        {/* Render Serverless content */}
        <PricingPlan />
        <Soc2 socLight="dark" />
        <PricingFAQ faqType="Serverless" />
        <ContactUsForm />

        {/* Modal for Serverless */}
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
      </Layout>
      <ThemeSwitch />
      <CustomScriptLoader />
    </div>
  );
}
