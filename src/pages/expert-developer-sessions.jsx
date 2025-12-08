import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import ThemeSwitch from '/src/components/ThemeSwitch';
import Header from '/src/components/BookSession/DeveloperTrack/Header';
import LogosBar from '/src/components/BookSession/LogoBar';
import SessionsGrid from '/src/components/BookSession/SessionGrid';
import CTASection from '../components/BookSession/CTASection';
import Layout from '@theme/Layout';

export default function BookASessionPage() {
  useEffect(() => {
    document.body.setAttribute('data-hide-annc', 'true');
    return () => document.body.removeAttribute('data-hide-annc');
  }, []);

  return (
    <div className="custom-page noBG">
      <Layout>
        <Head>
          <style>{`
            body[data-hide-annc="true"] .theme-announcement-bar { 
              display: none !important; 
            }
          `}</style>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
          <title>Expert Developer Sessions | Weaviate</title>

          <meta
            name="description"
            content="Book a free 1-on-1 technical deep dive with a Weaviate expert."
          />
          <meta
            property="og:title"
            content="Expert Developer Sessions | Weaviate"
          />
          <meta
            property="og:description"
            content="Book a free 1-on-1 technical deep dive with a Weaviate expert."
          />
          <meta property="og:image" content="og/website/home.jpg" />
          <meta
            property="og:url"
            content="https://weaviate.io/expert-sessions"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Expert Sessions | Weaviate" />
          <meta
            name="twitter:description"
            content="Book a free 1-on-1 technical deep dive with a Weaviate expert."
          />
          <meta name="twitter:image" content="og/website/home.jpg" />
        </Head>

        <Header />
        <LogosBar />
        <SessionsGrid />
        <CTASection />
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
