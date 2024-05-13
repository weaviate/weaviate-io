import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
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
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.box}>
            <span>Hybrid Search</span>
            <h1>Take search to new AI-powered heights</h1>
            <p>
              Blend vector, keyword, and multimodal techniques to deliver
              accurate, contextual search with less complexity.
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
          <div className={styles.exampleBox}></div>
        </div>
      </div>
    </header>
  );
}
