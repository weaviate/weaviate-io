import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import knowledge from '/data/knowledgecards.json';
import styles from './styles.module.scss';
import KnowledgeHeader from './Knowledgeheader';
import ShareOptions from './shareOptions';

const KnowledgeBasePage = () => {
  const totalCards = knowledge.all.length;
  const card = knowledge.all.find(
    (c) => c.title === 'Hierarchical Graph Structure'
  );
  if (!card) return <p>Card not found</p>;

  const imageFullUrl = card.cardImage
    ? `/img/cards/${card.cardImage}`
    : `/img/og/content/knowledgecards.jpg`;

  const formatTitleForUrl = (title) => {
    return title
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  };

  const pageUrl = `${
    window.location.origin
  }/learn/knowledgecards/${formatTitleForUrl(card.title)}`;

  const typeClass = card.type ? card.type.toLowerCase() : '';

  const structuredData = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    headline: card.title,
    description: card.text,
    image: imageFullUrl,
    url: pageUrl,
  };

  const formattedTitle = formatTitleForUrl(card.title);

  const filteredCards = knowledge.all.filter(
    (c) => c.category === card.category
  );
  const totalFilterCards = filteredCards.length;

  const [currentIndex, setCurrentIndex] = useState(
    filteredCards.findIndex((c) => c.title === card.title)
  );

  const onNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < totalFilterCards) {
      setCurrentIndex(nextIndex);
    }
  };

  const onPrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
    }
  };

  return (
    <div className="custom-page noBG">
      <Layout>
        <Head>
          <title>{card.title} - Weaviate Knowledge Cards</title>
          {/* Open Graph */}
          <meta property="og:title" content={card.title} />
          <meta property="og:type" content="article" />
          <meta property="og:image" content={imageFullUrl} />
          <meta property="og:image:alt" content="Knowledge card image" />
          <meta property="og:url" content={pageUrl} />
          <meta property="og:description" content={card.longText} />
          <meta property="og:site_name" content="Weaviate Knowledge Cards" />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:article:published_time"
            content="2024-06-04T08:00:00Z"
          />
          <meta property="og:article:author" content="weaviate.io" />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@weaviate_io" />
          <meta name="twitter:title" content={card.title} />
          <meta name="twitter:description" content={card.longText} />
          <meta name="twitter:image" content={imageFullUrl} />
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
                  <div className={styles.nextButton} onClick={onPrevious}>
                    Previous
                  </div>
                  <div className={styles.nextButton} onClick={onNext}>
                    Next
                  </div>
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
