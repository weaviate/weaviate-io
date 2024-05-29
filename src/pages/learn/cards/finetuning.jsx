import React from 'react';
import knowledge from '/data/knowledgecards.json';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CardPage = () => {
  const card = knowledge.all.find((c) => c.title === 'Finetuning');

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
    url: `${window.location.origin}/learn/cards/finetuning`,
  };

  return (
    <>
      <Helmet>
        <title>{card.title}</title>
        <meta property="og:title" content={card.title} />
        <meta property="og:description" content={card.longText} />
        <meta property="og:image" content={imageFullUrl} />
        <meta
          property="og:url"
          content={`${window.location.origin}/learn/cards/finetuning`}
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
      {/* Redirect to the main knowledge base page with the card open */}
      <Redirect
        to={`/learn/knowledgebase#card=${encodeURIComponent(
          card.title.replace(/\s/g, '-').toLowerCase()
        )}`}
      />
    </>
  );
};

export default CardPage;
