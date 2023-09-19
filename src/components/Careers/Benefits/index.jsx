import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function Benefits() {
  return (
    <div className={styles.benefitsBg}>
      <div className="container">
        <div className={styles.title}>
          <h2>Our benefits & perks</h2>
          <p>
            At Weaviate, we care about our people and therefore we invest in
            them. Some of our benefits and perks are...
          </p>
        </div>
        <div className={styles.box}>
          <div className={styles.item}>
            <div className={`${styles.img} ${styles.flowerImg}`} />
            <div className={styles.itemText}>
              <h3>Work equipment</h3>
              <p>
                This includes a shiny new MacBook and a budget for (upgrading)
                your home or digital office.
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={`${styles.img} ${styles.facesImg}`} />
            <div className={styles.itemText}>
              <h3>Flexible remote work</h3>
              <p>
                This includes working from <br />
                anywhere, decide which work <br />
                rhythm and balance works for <br />
                you, and you have flexibility <br />
                when taking time off.
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={`${styles.img} ${styles.earthImg}`} />
            <div className={styles.itemText}>
              <h3>Company trips</h3>
              <p>
                With a global distributed team,
                <br />
                we can treat ourselves to meet <br />
                each other in person in the <br />
                most beautiful places e.g. Italy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
