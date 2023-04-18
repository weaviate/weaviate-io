import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../components/Pricing/HybridBusinessCritical/styles.module.scss';
import PricingHeader from '../components/Pricing/Header';
import PricingCalculator from '../components/Pricing/Calculator';
import PricingPlan from '../components/Pricing/Plan';
import PricingFAQ from '../components/Pricing/FAQ';
import ContactUsForm from '../components/ContactUsForm';
import HybridBusinessCritical from '../components/Pricing/HybridBusinessCritical';

export default function PricingPage() {
  const [selectedType, setSelectedType] = useState('saas');
  const divStyle = {
    marginTop: '0px',
    // width: '440px',
  };

  return (
    <div className="custom-page">
      <Layout>
        <PricingHeader
          selectedType={selectedType}
          handleSelected={setSelectedType}
        />
        {selectedType === 'saas' ? (
          <>
            <div className={styles.buttons} style={divStyle}>
              <Link className={styles.buttonGradient} to="https://console.weaviate.cloud/">
                Login to the Weaviate Cloud console
              </Link>
            </div>
            <PricingPlan />
            <PricingCalculator />
          </>
        ) : (
          <HybridBusinessCritical />
        )}
        <PricingFAQ />

        {selectedType === 'saas' ? (
          <></>
        ) : (
          <ContactUsForm />
        )}

      </Layout>
    </div>
  );
}
