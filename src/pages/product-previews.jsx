import React from 'react';
import Head from '@docusaurus/Head';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Header from '/src/components/ProductPreviews/Header';
import SessionsGrid from '../components/ProductPreviews/SessionGrid';
import ContactForm from '../components/ProductPreviews/Contact/contactForm';
import Layout from '@theme/Layout';

export default function ProductPreviews() {
  const pageTitle = 'Product Previews | Weaviate';
  const pageDescription =
    'Explore Weaviate product previews—early-access features you can request access to, share feedback on, and help shape as we iterate.';
  const ogImage = 'og/website/home.jpg'; // TODO: replace with a Product Previews OG image when ready
  const pageUrl = 'https://weaviate.io/product-previews';

  return (
    <div className="custom-page noBG">
      <Layout>
        <Head>
          {/* Keep noindex while this is in draft; remove when ready to publish */}
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />

          <title>{pageTitle}</title>

          <meta name="description" content={pageDescription} />

          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={pageUrl} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content={ogImage} />
        </Head>

        <Header />
        <SessionsGrid />

        <ContactForm />
      </Layout>

      <ThemeSwitch />
    </div>
  );
}
