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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{' '}
          <br></br> eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div>
        <StyledSlider {...settings}>
          <div className={styles.xbox}>
            <TwitterTweetEmbed
              options={{
                cards: 'hidden',
                hideCard: true,
                hideThread: false,
                maxWidth: 300,
                theme: 'dark',
                width: 300,

                conversation: 'none',
              }}
              tweetId={'1624058429584322560'}
            />
          </div>
          <div className={styles.xbox}>
            <TwitterTweetEmbed
              options={{
                cards: 'hidden',
                hideCard: true,
                hideThread: false,
                maxWidth: 300,
                theme: 'dark',
                width: 300,

                conversation: 'none',
              }}
              tweetId={'1631317445326643201'}
            />
          </div>
          <div className={styles.xbox}>
            <TwitterTweetEmbed
              options={{
                cards: 'hidden',
                hideCard: true,
                hideThread: false,
                maxWidth: 300,
                theme: 'dark',
                width: 300,

                conversation: 'none',
              }}
              tweetId={'1629383824395366402'}
            />
          </div>
          <div className={styles.xbox}>
            <TwitterTweetEmbed
              options={{
                cards: 'hidden',
                hideCard: true,
                hideThread: false,
                maxWidth: 300,
                theme: 'dark',
                width: 300,

                conversation: 'none',
              }}
              tweetId={'1625045987017256960'}
            />
          </div>
          <div className={styles.xbox}>
            <TwitterTweetEmbed
              options={{
                cards: 'hidden',
                hideCard: true,
                hideThread: false,
                maxWidth: 300,
                theme: 'dark',
                width: 300,

                conversation: 'none',
              }}
              tweetId={'1632430609610973185'}
            />
          </div>
          <div className={styles.xbox}>
            <TwitterTweetEmbed
              options={{
                cards: 'hidden',
                hideCard: true,
                hideThread: false,
                maxWidth: 300,
                theme: 'dark',
                width: 300,

                conversation: 'none',
              }}
              tweetId={'1631351144042594304'}
            />
          </div>
        </StyledSlider>
      </div>
    </div>
  );
}
