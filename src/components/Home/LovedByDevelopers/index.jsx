import React, { useState, useEffect } from 'react';
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
import quotes from '/data/quotes.json';
import Quotecontainer from './quoteContainer';

export default function HomepageLovedByDevelopers() {
  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    const rand = Math.floor(Math.random() * quotes.length);
    setInitialSlide(rand);
  }, []);

  const StyledSlider = styled(Slider)`
    .slick-track:hover {
      transition: -webkit-transform ease 0s !important;
    }
    .slick-prev:before,
    .slick-next:before {
      font-size: 48px !important;

      color: #2021246e !important;
    }
    .slick-slide {
      width: 20rem !important;
    }
  `;

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 5000,
    initialSlide: initialSlide,
    autoplaySpeed: 10000,
    arrows: false,
    slidesToScroll: 1,
    swipe: false,
    slidesToShow: 3,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1380,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          speed: 5000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 1224,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          speed: 5000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          dots: false,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          speed: 5000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 5000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 5000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.lovedBg}>
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          <div className={styles.shadowL}></div>
          <StyledSlider {...settings}>
            {quotes.map((quote) => {
              return <Quotecontainer key={quote.name} details={quote} />;
            })}
          </StyledSlider>
          <div className={styles.shadowR}></div>
        </div>
      </div>
    </div>
  );
}
