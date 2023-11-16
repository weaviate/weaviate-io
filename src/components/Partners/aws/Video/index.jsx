import Link from '@docusaurus/Link';
import React from 'react';

import styles from './styles.module.scss';

export default function Video() {
  return (
    <div className={styles.bgColor}>
      <div className="container">
        <div className={styles.header}>
          <h2>Weaviate Powered by AWS Bedrock</h2>
          <p>
            Using Amazon Bedrock, customers can harness large language models
            and build AI capabilities<br></br> within the Amazon Web Services
            (AWS) environment, allowing them to create innovative<br></br>{' '}
            semantic search and generative AI functionalities. In this video,
            you’ll hear how Weaviate is growing<br></br> fast using AWS, as well
            as how the company plans to expand its platform and deliver greater
            <br></br>
            security to customers in the cloud.
          </p>
        </div>
        <div className={styles.techContainer}>
          <br></br>
          <iframe
            width="720"
            height="400"
            src="https://www.youtube.com/embed/hlWJuv1bLJM?si=1vSuXl6JMI198WS1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
