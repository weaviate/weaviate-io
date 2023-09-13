import React from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

export default function HomepageLovedByDevelopers() {
  const StyledSlider = styled(Slider)`
    .slick-prev:before,
    .slick-next:before {
      font-size: 48px !important;

      color: #2021246e !important;

      @media screen and (max-width: 485px) {
        display: none;
      }
    }
  `;

  var settings = {
    dots: true,
    cssEase: 'linear',
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    <div className="container">
      <div className={styles.header}>
        <h2 className={styles.title}>Loved by Developers</h2>
        <p className={styles.subtitle}>
          Developer Experience is at the core of everything we do. Weaviate is
          not just a tool;<br></br> it's a community-driven ecosystem carefully
          crafted to empower developers to build<br></br> end-to-end AI
          applications fast and easy. From our documentation to the open-source
          <br></br>
          community, Weaviate is designed to be the go-to solution that
          developers love.
        </p>
      </div>

      <div>
        <StyledSlider {...settings}>
          <div className={styles.xbox}>
            <div className={styles.quoteBox}>
              <p>
                With Weaviate's cloud and self-hosted services at our disposal
                and an innovative feature set in our toolkit, Kreoh is equipped
                to rapidly deliver high-value AI solutions to all of our
                clients, irrespective of their technology infrastructure.
              </p>
              <span>
                <strong>Fareed Idris</strong>
                <br></br>
                Kreoh
              </span>
            </div>
          </div>
          <div className={styles.xbox}>
            <div className={styles.quoteBox}>
              <p>
                With Weaviate's cloud and self-hosted services at our disposal
                and an innovative feature set in our toolkit, Kreoh is equipped
                to rapidly deliver high-value AI solutions to all of our
                clients, irrespective of their technology infrastructure.
              </p>
              <span>
                <strong>Fareed Idris</strong>
                <br></br>
                Kreoh
              </span>
            </div>
          </div>
          <div className={styles.xbox}>
            <div className={styles.quoteBox}>
              <p>
                With Weaviate's cloud and self-hosted services at our disposal
                and an innovative feature set in our toolkit, Kreoh is equipped
                to rapidly deliver high-value AI solutions to all of our
                clients, irrespective of their technology infrastructure.
              </p>
              <span>
                <strong>Fareed Idris</strong>
                <br></br>
                Kreoh
              </span>
            </div>
          </div>
          <div className={styles.xbox}>
            <div className={styles.quoteBox}>
              <p>
                With Weaviate's cloud and self-hosted services at our disposal
                and an innovative feature set in our toolkit, Kreoh is equipped
                to rapidly deliver high-value AI solutions to all of our
                clients, irrespective of their technology infrastructure.
              </p>
              <span>
                <strong>Fareed Idris</strong>
                <br></br>
                Kreoh
              </span>
            </div>
          </div>
          <div className={styles.xbox}>
            <div className={styles.quoteBox}>
              <p>
                With Weaviate's cloud and self-hosted services at our disposal
                and an innovative feature set in our toolkit, Kreoh is equipped
                to rapidly deliver high-value AI solutions to all of our
                clients, irrespective of their technology infrastructure.
              </p>
              <span>
                <strong>Fareed Idris</strong>
                <br></br>
                Kreoh
              </span>
            </div>
          </div>
          <div className={styles.xbox}>
            <div className={styles.quoteBox}>
              <p>
                With Weaviate's cloud and self-hosted services at our disposal
                and an innovative feature set in our toolkit, Kreoh is equipped
                to rapidly deliver high-value AI solutions to all of our
                clients, irrespective of their technology infrastructure.
              </p>
              <span>
                <strong>Fareed Idris</strong>
                <br></br>
                Kreoh
              </span>
            </div>
          </div>
        </StyledSlider>
      </div>
    </div>
  );
}
