import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import knowledge from '/data/knowledgecards.json';
import styles from './styles.module.scss';
import KnowledgeHeader from './Knowledgeheader';
import ShareOptions from './shareOptions';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const KnowledgeBasePage = () => {
  const totalCards = knowledge.all.length;
  const card = knowledge.all.find((c) => c.title === 'Vector Embedding');
  if (!card) return <p>Card not found</p>;

  const baseUrl = 'https://weaviate.io';

  const imageFullUrl = card.cardImage
    ? `${baseUrl}/img/cards/${card.cardImage}`
    : `${baseUrl}/img/og/content/knowledgecards.jpg`;

  const formatTitleForUrl = (title) => {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  };

  let pageUrl = '';
  if (ExecutionEnvironment.canUseDOM) {
    pageUrl = `${
      window.location.origin
    }/learn/knowledgecards/${formatTitleForUrl(card.title)}`;
  }

  const typeClass = card.type ? card.type.toLowerCase() : '';

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: 'Vector Embedding - Weaviate Knowledge Cards',
    description:
      'Numerical representations of objects, such as words or images, in a vector space...',
    image: 'https://weaviate.io/img/cards/vector-embedding.jpg',
    url: 'https://weaviate.io/learn/knowledgecards/vector-embedding',
  };

  const formattedTitle = formatTitleForUrl(card.title);

  const filteredCards = knowledge.all.filter(
    (c) => c.category === card.category
  );
  const totalFilterCards = filteredCards.length;

  const [currentIndex, setCurrentIndex] = useState(
    filteredCards.findIndex((c) => c.title === card.title)
  );

  return (
    <div className="custom-page noBG">
      <Layout>
        <Head>
          <title>{card.title} - Weaviate Knowledge Cards</title>
          {/* Open Graph */}
          <meta
            property="og:title"
            content="Vector Embedding - Weaviate Knowledge Cards"
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content="https://weaviate.io/img/cards/vector-embedding.jpg"
          />
          <meta property="og:image:alt" content="Knowledge card image" />
          <meta
            property="og:url"
            content="https://weaviate.io/learn/knowledgecards/vector-embedding"
          />
          <meta
            property="og:description"
            content="Numerical representations of objects, such as words or images, in a vector space. These representations capture semantic relationships and are used in machine-learning tasks."
          />
          <meta property="og:site_name" content="Weaviate Knowledge Cards" />
          <meta property="og:locale" content="en_US" />
          <meta
            property="article:published_time"
            content="2024-06-07T12:35+00:00"
          />
          <meta property="article:author" content="weaviate.io" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@weaviate_io" />
          <meta
            name="twitter:title"
            content="Vector Embedding - Weaviate Knowledge Cards"
          />
          <meta
            name="twitter:description"
            content="Numerical representations of objects, such as words or images, in a vector space. These representations capture semantic relationships and are used in machine-learning tasks."
          />
          <meta
            name="twitter:image"
            content="https://weaviate.io/img/cards/vector-embedding.jpg"
          />
          <meta name="twitter:image:alt" content="Knowledge card image" />

          {/* Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Head>

        <KnowledgeHeader />
        <main className={styles.cardPage}>
          <div className={styles.breadCrumbs}>
            <Link to="/learn/knowledgecards">Knowledge Cards</Link>
            <span> / </span>
            <span>{card.category}</span>
            <span> / </span>
            <span>{card.title}</span>
          </div>
          <div className={styles.modals}>
            <div className={`${styles.modalContents} ${styles[typeClass]}`}>
              <div className={styles.cardHeader}>
                <span className={styles.cardType}>{card.category}</span>
              </div>
              <div className={styles.cardContents}>
                {card.photo && (
                  <img
                    src={`/img/site/${card.photo}`}
                    alt={card.title}
                    className={styles.cardImage}
                  />
                )}
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.modalText}>{card.longText}</p>

                <ShareOptions url={pageUrl} />
                <div className={styles.bottomCard}>
                  {(card.bloglink ||
                    card.bloglink2 ||
                    card.doclink ||
                    card.doclink2 ||
                    card.videolink) && (
                    <>
                      <p className={styles.relatedText}>Related Content:</p>
                      <div className={styles.relatedBox}>
                        {card.bloglink && (
                          <Link to={card.bloglink}>
                            <div className={styles.relatedBlog}>
                              <div className={styles.relatedImage}></div>
                              <div className={styles.relatedBottom}>
                                <span className={styles.relatedTitle}>
                                  Blog:
                                </span>
                                <span className={styles.relatedSubtitle}>
                                  {card.blogTitle}
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                        {card.bloglink2 && (
                          <Link to={card.bloglink2}>
                            <div className={styles.relatedBlog}>
                              <div className={styles.relatedImage}></div>
                              <div className={styles.relatedBottom}>
                                <span className={styles.relatedTitle}>
                                  Blog:
                                </span>
                                <span className={styles.relatedSubtitle}>
                                  {card.blogTitle2}
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                        {card.doclink && (
                          <Link to={card.doclink}>
                            <div className={styles.relatedBlog}>
                              <div className={styles.relatedImage}></div>
                              <div className={styles.relatedBottom}>
                                <span className={styles.relatedTitle}>
                                  Doc:
                                </span>
                                <span className={styles.relatedSubtitle}>
                                  {card.docTitle}
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                        {card.doclink2 && (
                          <Link to={card.doclink2}>
                            <div className={styles.relatedBlog}>
                              <div className={styles.relatedImage}></div>
                              <div className={styles.relatedBottom}>
                                <span className={styles.relatedTitle}>
                                  Doc:
                                </span>
                                <span className={styles.relatedSubtitle}>
                                  {card.docTitle2}
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                        {card.videolink && (
                          <Link to={card.videolink}>
                            <div className={styles.relatedBlog}>
                              <div className={styles.relatedImage}></div>
                              <div className={styles.relatedBottom}>
                                <span className={styles.relatedTitle}>
                                  Video:
                                </span>
                                <span className={styles.relatedSubtitle}>
                                  {card.videoTitle}
                                </span>
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <span className={styles.nextText}>{`${
                  currentIndex + 1
                } of ${totalFilterCards}`}</span>
                <div className={styles.nextContainer}>
                  <Link to={card.previous} className={styles.nextButton}>
                    Previous
                  </Link>
                  <Link to={card.next} className={styles.nextButton}>
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
};

export default KnowledgeBasePage;
