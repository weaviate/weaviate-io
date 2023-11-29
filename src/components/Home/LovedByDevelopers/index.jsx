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
import quotes from '/data/quotes.json';
import Quotecontainer from './quoteContainer';

export default function HomepageLovedByDevelopers() {
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

  var rand = Math.floor(Math.random() * quotes.length);

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,

    autoplay: true,
    speed: 5000,
    initialSlide: rand,
    autoplaySpeed: 10000,
    arrows: false,
    swipeToSlide: false,
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
          initialSlide: 2,
          speed: 5000,
          autoplaySpeed: 10000,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          speed: 5000,
          autoplaySpeed: 10000,
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
