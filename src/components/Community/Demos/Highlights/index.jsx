import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

export default function Highlights() {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.title}>
          <h2>Highlights</h2>
          <p>
            Check out our favorite Weaviate projects! We've hand picked the best
            to showcase AI innovation and creativity.
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.stars}>
                4900
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="yellow"
                >
                  <path
                    d="M8.82065 0.559817C9.03938 -0.113347 9.99172 -0.113345 10.2104 0.559819L11.8122 5.48936C11.91 5.79041 12.1905 5.99424 12.5071 5.99424H17.6903C18.3981 5.99424 18.6924 6.89997 18.1198 7.31601L13.9264 10.3626C13.6703 10.5487 13.5632 10.8785 13.661 11.1795L15.2627 16.1091C15.4814 16.7822 14.711 17.342 14.1383 16.926L9.94502 13.8794C9.68893 13.6933 9.34217 13.6933 9.08608 13.8794L4.89276 16.926C4.32013 17.342 3.54966 16.7822 3.76839 16.1091L5.37009 11.1795C5.46791 10.8785 5.36075 10.5487 5.10467 10.3626L0.911344 7.31601C0.338717 6.89997 0.63301 5.99424 1.34082 5.99424H6.52405C6.84059 5.99424 7.12113 5.79041 7.21895 5.48936L8.82065 0.559817Z"
                    fill="#FFD644"
                  />
                </svg>
              </span>
              <h3>Verba</h3>
              <span>The Golden RAGtriever</span>
              <Link
                to="https://verba.weaviate.io"
                className={`${styles.top} ${styles.cardButton} `}
              >
                <span className={styles.play}></span> Start Demo
              </Link>
            </div>
            <div className={styles.contentDiv}>
              <div className={styles.textCardContent}>
                <p>
                  Meet Verba, your open source RAG assistant for any topic. You
                  can create stuff and make stuff and do more stuff with this
                  demo showing you stuff and stuff
                </p>
                <div className={styles.bottomContainer}>
                  <Link
                    to="https://weaviate.io/blog/verba-open-source-rag-app"
                    className={styles.cardButton}
                  >
                    {' '}
                    <span className={styles.blog}></span> Blogpost
                  </Link>
                  <Link
                    to="https://www.youtube.com/watch?v=swKKRdLBhas"
                    className={`${styles.videoButton} ${styles.cardButton}`}
                  >
                    {' '}
                    <span className={styles.video}></span> Youtube
                  </Link>
                  <Link
                    to="https://github.com/weaviate/Verba"
                    className={`${styles.gitButton} ${styles.cardButton} `}
                  >
                    {' '}
                    <span className={styles.git}></span> GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageCard}>
            <video
              className={styles.verbaVideo}
              muted="muted"
              autoplay="autoplay"
              playsinline="playsinline"
              loop="loop"
              controls
            >
              <source
                src="/img/site/verba-video.mp4"
                poster="img/site/screenshot-verba.png"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className={styles.box}>
          <div className={`${styles.card} ${styles.bigCard}`}>
            <div className={styles.cardHeader}>
              <span className={styles.stars}>
                153
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="yellow"
                >
                  <path
                    d="M8.82065 0.559817C9.03938 -0.113347 9.99172 -0.113345 10.2104 0.559819L11.8122 5.48936C11.91 5.79041 12.1905 5.99424 12.5071 5.99424H17.6903C18.3981 5.99424 18.6924 6.89997 18.1198 7.31601L13.9264 10.3626C13.6703 10.5487 13.5632 10.8785 13.661 11.1795L15.2627 16.1091C15.4814 16.7822 14.711 17.342 14.1383 16.926L9.94502 13.8794C9.68893 13.6933 9.34217 13.6933 9.08608 13.8794L4.89276 16.926C4.32013 17.342 3.54966 16.7822 3.76839 16.1091L5.37009 11.1795C5.46791 10.8785 5.36075 10.5487 5.10467 10.3626L0.911344 7.31601C0.338717 6.89997 0.63301 5.99424 1.34082 5.99424H6.52405C6.84059 5.99424 7.12113 5.79041 7.21895 5.48936L8.82065 0.559817Z"
                    fill="#FFD644"
                  />
                </svg>
              </span>
              <h3>Heathsearch</h3>
              <span>Generative AI in Healthcare</span>
              <Link
                to="https://healthsearch.weaviate.io/"
                className={`${styles.top} ${styles.cardButton} `}
              >
                <span className={styles.play}></span> Start Demo
              </Link>
            </div>
            <div className={styles.contentDiv}>
              <div className={`${styles.textCardContent} ${styles.bigText}`}>
                <p>
                  HealthSearch is an open source demo that decodes user-written
                  reviews of supplements, performing semantic and generative
                  searches to retrieve related products for specific health
                  effects. It leverages Large Language Models to understand
                  natural language queries and generate product and review
                  summaries.
                </p>
                <div className={styles.bottomContainer}>
                  <Link
                    to="https://weaviate.io/blog/healthsearch-demo"
                    className={`${styles.videoButton} ${styles.cardButton}`}
                  >
                    {' '}
                    <span className={styles.blog}></span> Blogpost
                  </Link>

                  <Link
                    to="https://github.com/weaviate/healthsearch-demo"
                    className={`${styles.gitButton} ${styles.cardButton} `}
                  >
                    {' '}
                    <span className={styles.git}></span> GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.imageCard} ${styles.health}`}>
            <video
              className={styles.healthVideo}
              muted="muted"
              autoplay="autoplay"
              playsinline="playsinline"
              loop="loop"
              controls
            >
              <source
                src="/img/site/healthsearch-video.mp4"
                poster="img/site/screenshot-healthsearch.png"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className={styles.box}>
          <div className={`${styles.card} ${styles.bigCard}`}>
            <div className={styles.cardHeader}>
              <span className={styles.stars}>
                69
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="yellow"
                >
                  <path
                    d="M8.82065 0.559817C9.03938 -0.113347 9.99172 -0.113345 10.2104 0.559819L11.8122 5.48936C11.91 5.79041 12.1905 5.99424 12.5071 5.99424H17.6903C18.3981 5.99424 18.6924 6.89997 18.1198 7.31601L13.9264 10.3626C13.6703 10.5487 13.5632 10.8785 13.661 11.1795L15.2627 16.1091C15.4814 16.7822 14.711 17.342 14.1383 16.926L9.94502 13.8794C9.68893 13.6933 9.34217 13.6933 9.08608 13.8794L4.89276 16.926C4.32013 17.342 3.54966 16.7822 3.76839 16.1091L5.37009 11.1795C5.46791 10.8785 5.36075 10.5487 5.10467 10.3626L0.911344 7.31601C0.338717 6.89997 0.63301 5.99424 1.34082 5.99424H6.52405C6.84059 5.99424 7.12113 5.79041 7.21895 5.48936L8.82065 0.559817Z"
                    fill="#FFD644"
                  />
                </svg>
              </span>
              <h3>Awesome-moviate</h3>
              <span>A Movie Search Engine</span>
              <Link
                to="https://awesome-moviate.weaviate.io/"
                className={`${styles.top} ${styles.cardButton} `}
              >
                <span className={styles.play}></span> Start Demo
              </Link>
            </div>
            <div className={styles.contentDiv}>
              <div className={`${styles.textCardContent} ${styles.bigText}`}>
                <p>
                  Awesome-Moviate is a movie recommender system built with
                  OpenAI embeddings and Weaviate. It uses a simple user
                  interface to provide movie search and recommendation
                  functionalities. Users can search for movies by title and
                  receive a list of similar movies based on plot similarity
                  using AI-generated embeddings.
                </p>
                <div className={styles.bottomContainer}>
                  <Link
                    to="https://towardsdatascience.com/recreating-andrej-karpathys-weekend-project-a-movie-search-engine-9b270d7a92e4"
                    className={styles.cardButton}
                  >
                    {' '}
                    <span className={styles.blog}></span> Blogpost
                  </Link>

                  <Link
                    to="https://github.com/weaviate-tutorials/awesome-moviate"
                    className={`${styles.gitButton} ${styles.cardButton} `}
                  >
                    {' '}
                    <span className={styles.git}></span> GitHub
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.imageCard} ${styles.movie}`}>
            <video
              className={styles.healthVideo}
              muted="muted"
              autoplay="autoplay"
              playsinline="playsinline"
              loop="loop"
              controls
            >
              <source
                src="/img/site/awesome-moviate-video.mp4"
                poster="img/site/screenshot-healthsearch.png"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
