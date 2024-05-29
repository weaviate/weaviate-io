import React, { useState, useEffect } from 'react';
import knowledge from '/data/knowledgecards.json';
import { Helmet } from 'react-helmet';
import BrowserOnly from '@docusaurus/BrowserOnly';

const CardPage = () => {
  const [redirected, setRedirected] = useState(false);
  const card = knowledge.all.find((c) => c.title === 'Embedding model');

  if (!card) return <p>Card not found</p>;

  const imageFullUrl = card.cardImage
    ? `${window.location.origin}/img/cards/${card.cardImage}`
    : `${window.location.origin}/img/og/content/knowledgecards.jpg`;

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: card.title,
    description: card.text,
    image: imageFullUrl,
    url: `${window.location.origin}/learn/cards/embedding-model`,
  };

  useEffect(() => {
    if (!redirected) {
      const formattedTitle = encodeURIComponent(
        card.title.replace(/\s/g, '-').toLowerCase()
      );
      window.location.href = `/learn/knowledgebase#card=${formattedTitle}`;
      setRedirected(true);
    }
  }, [redirected, card.title]);

  return (
    <>
      <Helmet>
        <title>{card.title}</title>
        <meta property="og:title" content={card.title} />
        <meta property="og:description" content={card.longText} />
        <meta property="og:image" content={imageFullUrl} />
        <meta
          property="og:url"
          content={`${window.location.origin}/learn/cards/embedding-model`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={card.title} />
        <meta name="twitter:description" content={card.longText} />
        <meta name="twitter:image" content={imageFullUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <h1>{card.title}</h1>
      <p>{card.text}</p>
    </>
  );
};

export default CardPage;
