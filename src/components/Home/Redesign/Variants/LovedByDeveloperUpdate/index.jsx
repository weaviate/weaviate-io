import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import styles from './styles.module.scss';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../../theme/Buttons';
import quotes from '/data/quotes.json';
import Quotecontainer from './quoteContainer';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function HomepageLovedByDevelopers() {
  const [shuffledQuotes, setShuffledQuotes] = useState([]);

  useEffect(() => {
    const shuffled = shuffleArray([...quotes]);
    setShuffledQuotes([...shuffled, ...shuffled]);
  }, []);

  return (
    <div className={styles.lovedBg}>
      <div className={styles.container}>
        <div className={styles.shadowL}></div>
        <div className={styles.sliderContainer}>
          <div className={styles.innerBar}>
            {shuffledQuotes.map((quote, index) => {
              return (
                <Quotecontainer
                  key={`${quote.name}-${index}`}
                  details={quote}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.shadowR}></div>
      </div>
    </div>
  );
}
