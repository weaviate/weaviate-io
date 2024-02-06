import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { MetaSEO } from '/src/theme/MetaSEO';
import Head from '@docusaurus/Head';
import HomepageHeader from '/src/components/JPLocale/Header';
import HomepageWhatYouCanDo from '/src/components/JPLocale/WhatYouCanDoUpdate';
import ContactForm from '/src/components/JPLocale/ContactForm/contactForm';
import ThemeSwitch from '/src/components/ThemeSwitch';

export default function HomeJP() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    const tryButton = document.querySelector('.tryNow');

    if (window.location.pathname === '/ja') {
      document.body.classList.add('jp-page');

      tryButton.innerHTML = '無料で始める';
    }
  }, []);

  return (
    <div className="custom-page noBG">
      <Layout
        title="Weaviate ベクトルデータベース"
        description="Weaviate ベクトルデータベース"
      >
        <Head>
          <meta charset="UTF-8" />
          <meta name="language" content="ja" />
          <link rel="alternate" href="https://weaviate.jp/ja" hreflang="ja" />
          <link
            rel="alternate"
            href="https://weaviate.jp"
            hreflang="x-default"
          />
          <meta
            property="og:image"
            content="https://weaviate.jp/og/website/home-jp.jpg"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Weaviate ベクトルデータベース" />
          <meta
            property="og:description"
            content="Weaviate ベクトルデータベース"
          />
          <meta property="og:url" content="https://weaviate.jp" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Weaviate ベクトルデータベース" />
          <meta
            name="twitter:description"
            content="Weaviate ベクトルデータベース"
          />
          <meta
            name="twitter:image"
            content="https://weaviate.jp/og/website/home-jp.jpg"
          />
          <link rel="preconnect" href="https://weaviate.jp" />
          <link rel="canonical" href="https://weaviate.jp" />
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Organization',
              name: 'Weaviate ベクトルデータベース',
              url: 'https://weaviate.jp',
              logo: 'https://weaviate.jp/og/website/home-jp.jpg',
            })}
          </script>
        </Head>
        <MetaSEO img="og/website/home-jp.jpg" />
        <HomepageHeader />
        <main>
          <HomepageWhatYouCanDo />
          <ContactForm />
        </main>
      </Layout>
      <ThemeSwitch />
    </div>
  );
}
