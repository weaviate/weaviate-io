import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from '../components/Partners/HybridBusinessCritical/styles.module.scss';
import PartnersHeader from '../components/Partners/Header';
import TechnologyPartners from '../components/Partners/TechnologyPartners';
import PartnerOpportunities from '../components/Partners/PartnerOpportunities';
import PartnersFooter from '../components/Partners/PartnersFooter';

import ThemeSwitch from '/src/components/ThemeSwitch';

export default function PartnersPage() {
  const [selectedType, setSelectedType] = useState('saas');
  const divStyle = {
    marginTop: '0px',
    // width: '440px',
  };

  return (
    <div className="custom-page noBG">
      <Layout>
        <PartnersHeader />

        <TechnologyPartners />
        <PartnerOpportunities />
        <PartnersFooter />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
