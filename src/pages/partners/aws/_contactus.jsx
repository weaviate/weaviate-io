import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Header from '/src/components/Partners/aws/ContactUs/Header';
import Introduction from '../../../components/Partners/aws/ContactUs/Introduction/introduction';
import ContactForm from '../../../components/Partners/aws/ContactUs/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function awsContactPage() {
  return (
    <div className="custom-page noBG">
      <Layout
        title="AWS Partners Contact"
        description="Contact us for all information about our AWS Partnership"
      >
        <Introduction />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
