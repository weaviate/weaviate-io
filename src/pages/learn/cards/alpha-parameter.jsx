import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';
import knowledge from '/data/knowledgecards.json';

const CardPage = () => {
  const card = knowledge.all.find((c) => c.title === 'Alpha Parameter');
  if (!card) return <p>Card not found</p>;

  const imageFullUrl = card.cardImage
    ? `/img/cards/${card.cardImage}`
    : `/img/og/content/knowledgecards.jpg`;

  const pageUrl = `/learn/cards/alpha-parameter`;

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: card.title,
    description: card.text,
    image: imageFullUrl,
    url: pageUrl,
  };

  return (
    <>
      <Helmet>
        <title>{card.title}</title>
        <meta property="og:title" content={card.title} />
        <meta property="og:description" content={card.longText} />
        <meta property="og:image" content={imageFullUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={card.title} />
        <meta name="twitter:description" content={card.longText} />
        <meta name="twitter:image" content={imageFullUrl} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <BrowserOnly fallback={<p>Loading...</p>}>
        {() => {
          setTimeout(() => {
            window.location.href = `/learn/knowledgebase#card=${encodeURIComponent(
              card.title.replace(/\s/g, '-').toLowerCase()
            )}`;
          }, 3000); // Redirect after 3 seconds for SEO purposes

          return (
            <div>
              <h1>{card.title}</h1>
              <p>{card.text}</p>
            </div>
          );
        }}
      </BrowserOnly>
    </>
  );
};

export default CardPage;
