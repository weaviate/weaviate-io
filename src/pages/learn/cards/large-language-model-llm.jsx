import React from 'react';
import knowledge from '/data/knowledgecards.json';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const CardPage = () => {
  const card = knowledge.all.find(
    (c) => c.title === 'Large Language Model (LLM)'
  );

  if (!card) return <p>Card not found</p>;

  function formatTitleForUrl(title) {
    return title
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  const formattedTitle = formatTitleForUrl(card.title);
  const redirectUrl = `/learn/knowledgebase#card=${formattedTitle}`;
  const pageTitle = formattedTitle.replace(/-/g, ' ');

  const imageFullUrl = card.cardImage
    ? `${window.location.origin}/img/cards/${card.cardImage}`
    : `${window.location.origin}/img/og/content/knowledgecards.jpg`;

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: card.title,
    description: card.text,
    image: imageFullUrl,
    url: `${window.location.origin}/learn/cards/large-language-model-llm`,
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
          content={`${window.location.origin}/learn/cards/large-language-model-llm`}
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
      <Redirect to={redirectUrl} />
    </>
  );
};

export default CardPage;
