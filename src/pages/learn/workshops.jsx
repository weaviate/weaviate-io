import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Header from '/src/components/Workshops/header';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function WorkshopPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const calendar = document.createElement('div');
      calendar.classList.add(
        'elfsight-app-01a3e7d9-f320-4491-a464-8339fafe3e80'
      );
      document.querySelector('.container').appendChild(calendar);
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="custom-page noBG">
      <Layout>
        <MetaSEO img="og/content/workshops.jpg" />
        <Header />
        <div className="container"></div>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
