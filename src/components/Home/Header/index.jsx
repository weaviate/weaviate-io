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

export default function HomepageHeader() {
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
    .get("Article"))
  
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
  # View the generated pointsprint(response.generated)`;

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
    ref=Reference.to([new_ad_id])    
  )`;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          variableWidth: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          variableWidth: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <header className={styles.headerHome}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.img} />

          <p className={styles.title}>
            <h1>
              The easiest way to build and<br></br> scale AI applications
            </h1>
          </p>
          <p className={styles.text}>
            Weaviate is an open source, AI-native vector database that helps
            <br></br>
            developers create intuitive and reliable AI-powered applications.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud"
            >
              Start Free
            </Link>
            <Link
              className={styles.buttonOutline}
              to="https://weaviate.io/developers/weaviate"
            >
              Documentation
            </Link>
          </div>
        </div>
        <Slider {...settings}>
          <div>
            <div className={styles.grid}>
              <div className={styles.codeBlock}>
                <div className={styles.codeBlockContent}>
                  <div className={styles.codeBlockContentLeft}>
                    <h2>HYBRID SEARCH</h2>
                    <p className={styles.subTitle}>
                      Unlock better insights for your customers
                    </p>
                    <p>
                      Push the limits of search across unstructured data.
                      Combine the best of keyword and vector search with ML
                      models to deliver fast, relevant, contextual results to
                      your users.
                    </p>
                  </div>

                  <div className={styles.codeBlockContentRight}>
                    <div className={styles.codeBlockTitle} />
                    <div className={styles.lineBar} />
                    <CodeSnippet code={codeExample} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.grid}>
              <div className={styles.codeBlock}>
                <div className={styles.codeBlockContent}>
                  <div className={styles.codeBlockContentLeft}>
                    <h2 className={styles.slide2Title}>
                      Retrieval Augmented Generation
                    </h2>
                    <p className={styles.subTitle}>
                      Build secure, explainable AI applications with less hassle
                    </p>
                    <p>
                      Reduce hallucination and make generative AI applications
                      more reliable. Use proprietary or domain specific data to
                      improve accuracy, without compromising data privacy.
                    </p>
                  </div>

                  <div className={styles.codeBlockContentRight}>
                    <div
                      className={`${styles.codeBlockTitle} ${styles.bigLine}`}
                    />

                    <div className={styles.lineBar} />
                    <CodeSnippet code={codeExample2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.grid}>
              <div className={styles.codeBlock}>
                <div className={styles.codeBlockContent}>
                  <div className={styles.codeBlockContentLeft}>
                    <h2 className={styles.slide3Title}>
                      Generative Feedback Loops
                    </h2>
                    <p className={styles.subTitle}>
                      Automatically improve the quality of data with generative
                      AI
                    </p>
                    <p>
                      Better data means better outcomes. Use content generated
                      by Large Language Models (LLMs) to enrich your dataset.
                      Spend less time on tedious, manual data cleaning.
                    </p>
                  </div>

                  <div className={styles.codeBlockContentRight}>
                    <div
                      className={`${styles.codeBlockTitle} ${styles.bigLine}`}
                    />
                    <div className={styles.lineBar} />

                    <CodeSnippet code={codeExample3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
        <div className={styles.bottomBar}>
          <h2 className={styles.text}>
            Loved by developers and trusted by companies of all sizes<br></br>to
            power search and generative applications
          </h2>
          <div className={styles.innerBar}>
            <div className={styles.logoSection}>
              <div
                className={`${styles.customerLogo} ${styles.stackoverflowLogo}`}
              />
              <div
                className={`${styles.customerLogo} ${styles.instabaseLogo}`}
              />
              <div className={`${styles.customerLogo} ${styles.redhatLogo}`} />
              <div className={`${styles.customerLogo} ${styles.mulinyLogo}`} />
              <div className={`${styles.customerLogo} ${styles.shippoLogo}`} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
