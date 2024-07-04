import React from 'react';

import Head from '@docusaurus/Head';
import { Redirect } from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';
import knowledge from '/data/knowledgecards.json';

const CardPage = () => {
  const card = knowledge.all.find((c) => c.title === 'Multimodal');
  if (!card) return <p>Card not found</p>;

  const imageFullUrl = card.cardImage
    ? `/img/cards/${card.cardImage}`
    : `/img/og/content/knowledgecards.jpg`;

  const pageUrl = `/learn/cards/multimodal`;

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
      <Head>
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
      </Head>
      <BrowserOnly
        fallback={
          <div className="loadingIcon">
            <svg
              width="50px"
              height="50px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
            >
              <circle
                fill="#130C49"
                stroke="#130C49"
                stroke-width="15"
                r="15"
                cx="40"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.4"
                ></animate>
              </circle>
              <circle
                fill="#130C49"
                stroke="#130C49"
                stroke-width="15"
                r="15"
                cx="100"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.2"
                ></animate>
              </circle>
              <circle
                fill="#130C49"
                stroke="#130C49"
                stroke-width="15"
                r="15"
                cx="160"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="0"
                ></animate>
              </circle>
            </svg>
          </div>
        }
      >
        {() => {
          setTimeout(() => {
            window.location.href = `/learn/knowledgecards#card=${encodeURIComponent(
              card.title
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-')
                .toLowerCase()
            )}`;
          }, 2000);

          return (
            <div className="loadingIcon">
              <svg
                width="50px"
                height="50px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
              >
                <circle
                  fill="#130C49"
                  stroke="#130C49"
                  stroke-width="15"
                  r="15"
                  cx="40"
                  cy="65"
                >
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                  ></animate>
                </circle>
                <circle
                  fill="#130C49"
                  stroke="#130C49"
                  stroke-width="15"
                  r="15"
                  cx="100"
                  cy="65"
                >
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                  ></animate>
                </circle>
                <circle
                  fill="#130C49"
                  stroke="#130C49"
                  stroke-width="15"
                  r="15"
                  cx="160"
                  cy="65"
                >
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="2"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                  ></animate>
                </circle>
              </svg>
            </div>
          );
        }}
      </BrowserOnly>
    </>
  );
};

export default CardPage;
