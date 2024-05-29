import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import knowledge from '/data/knowledgecards.json';

const CardPage = () => {
  const [redirectPath, setRedirectPath] = useState('');
  const card = knowledge.all.find((c) => c.title === 'Alpha Parameter');

  if (!card) return <p>Card not found</p>;

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      const formattedTitle = card.title.replace(/\s/g, '-').toLowerCase();
      setRedirectPath(
        `/learn/knowledgebase#card=${encodeURIComponent(formattedTitle)}`
      );
    }
  }, [card]);

  const imageFullUrl = card.cardImage
    ? `${window.location.origin}/img/cards/${card.cardImage}`
    : `${window.location.origin}/img/og/content/knowledgecards.jpg`;

  return (
    <>
      <Helmet>
        <title>{card.title}</title>
        <meta property="og:title" content={card.title} />
        <meta property="og:description" content={card.longText} />
        <meta property="og:image" content={imageFullUrl} />
        <meta
          property="og:url"
          content={window.location.origin + redirectPath}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={card.title} />
        <meta name="twitter:description" content={card.longText} />
        <meta name="twitter:image" content={imageFullUrl} />
      </Helmet>
      <h1>{card.title}</h1>
      <p>{card.text}</p>
      {redirectPath && <Redirect to={redirectPath} />}
    </>
  );
};

export default CardPage;
