import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import knowledge from '/data/knowledgecards.json';
import styles from './styles.module.scss';
import KnowledgeHeader from './KnowledgeHeader';
import ShareOptions from './shareOptions';

const KnowledgeBasePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = knowledge.all.length;
  const card = knowledge.all.find(
    (c) => c.title === 'ANN - Approximate Nearest Neighbor'
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

  useEffect(() => {
    const currentCardIndex = knowledge.all.findIndex(
      (c) => c.title === card.title
    );
    setCurrentIndex(currentCardIndex);
  }, [card.title]);

  const onNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="custom-page noBG">
      <Layout>
        <Head>
          <title>{card.title} - Weaviate Knowledge Cards</title>
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
        <KnowledgeHeader />
        <div className={styles.cardPage}>
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
                  {/* {card.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))} */}

                  {/* related content */}
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
                } of ${totalCards}`}</span>
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
        </div>
      </Layout>
    </div>
  );
};

export default KnowledgeBasePage;
