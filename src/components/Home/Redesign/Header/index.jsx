import React, { useState } from 'react';
import { ButtonContainer } from '../../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';
import Typewriter from './typingTitle';
import CodeSnippet from './CodeSnippet';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

export default function HomepageHeader() {
  const StyledSlider = styled(Slider)`
    .slick-dots li.slick-active button:before {
      opacity: 1;
      color: #61bd73;
    }

    .slick-dots li button:before {
      opacity: 0.75;
      color: #61bd73;
    }
  `;

  const codeExample = `collection = (
    client.collections
    .get("Article")
 )

 # Find relevant articles
 # with hybrid search
 response = (
    collection.query
    .hybrid(
          query="Generative AI",
          limit=2
    )
 )
`;

  const codeExample2 = `collection = (
    client.collections
    .get("Article")
    )

  # Perform RAG with a command
  response = (
    collection
      .generate.hybrid(
        query="Generative AI",
        limit=5,
        grouped_task="""
        Summarize highlights
        from these as bullet points.
        """
    )
  )
  # View the generated points
  print(response.generated)`;

  const codeExample3 = `listings = client.collections.get("Listing")
  ads = client.collections.get("Ad")

  # Perform RAG
  response = (
    listings.generate.fetch_objects(
      single_prompt="""
      Write an engaging advertisement
      for this AirBnb listing {description}
      """,
      limit=5,
    )
  )

  # Save the results as new data
  for obj in response.objects:
  new_ad_id = ads.data.insert(
    properties={"content": obj.generated},
  )
  listings.data.reference_add(
    from_uuid=obj.uuid,
    from_property="hasAd",
    ref=[new_ad_id]
  )`;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 13000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <header className={styles.headerHome}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.box}>
              <h1>
                The AI-native database<br></br> for a new generation of<br></br>{' '}
                software
              </h1>
              <p>
                Bring intuitive applications to life with<br></br> less
                hallucination, data leakage, and<br></br> vendor lock-in
              </p>
            </div>

            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://console.weaviate.cloud"
              >
                Start Free
              </Link>
              <Link className={styles.buttonOutline} to="/platform">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        {/*   <Link to="https://events.weaviate.io/ai-in-prod-ny-24">
        <div className={styles.awsBanner}></div>
      </Link> */}
        <div className={styles.typeContainer}>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>Hybrid Search</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Improve search experiences by merging vector and keyword
                techniques. Deliver contextual, precise results across all of
                your data in any modality, with less effort.
              </p>
              <Link to="/hybrid-search">Learn more</Link>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>RAG</h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Build trustworthy generative AI applications using your own
                data, with privacy and security top-of-mind. Surface relevant
                and accurate answers using your favorite LLMs.
              </p>
              <Link to="/rag">Learn more</Link>
            </div>
          </div>
          <div className={styles.typeBox}>
            <div className={styles.typeIcon}>
              <div className={styles.homeIcon}></div>
              <h2>
                Generative<br></br>Feedback Loops
              </h2>
            </div>
            <div className={styles.typeText}>
              <p>
                Make your dataset smarter by enriching it with AI-generated
                answers. Improve personalization and spend less time on manual
                data cleaning.
              </p>
              <Link to="/gen-feedback-loops">Learn more</Link>
            </div>
          </div>
        </div>
        <div className={styles.serviceBox}>
          <div className={styles.serviceText}>
            <h2>The future of software is AI-native.</h2>
            <span>
              And requires infrastructure that is flexible, open source, and
              reliable.
            </span>
            <p>
              Our Services are designed to support organizations of all sizes
              from prototype to production. Whether you’re a fast-moving startup
              or a well-established enterprise, we have flexible options to meet
              your needs.
            </p>
            <div className={styles.buttons}>
              <Link
                className={styles.buttonGradient}
                to="https://console.weaviate.cloud"
              >
                Start Free
              </Link>
              <Link className={styles.buttonOutline} to="/platform">
                Learn More
              </Link>
            </div>
          </div>

          <div className={styles.serviceImage}></div>
        </div>
      </header>
      <div className={styles.bottomBg}>
        <div className="container">
          <div className={styles.bottomBar}>
            <h2 className={styles.text}>
              Loved by developers and trusted by companies of all sizes<br></br>
              to power search and generative applications
            </h2>
            <div className={styles.innerBar}>
              <div className={styles.logoSection}>
                <div
                  className={`${styles.customerLogo} ${styles.stackoverflowLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.instabaseLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.redhatLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.mulinyLogo}`}
                />
                <div
                  className={`${styles.customerLogo} ${styles.shippoLogo}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
