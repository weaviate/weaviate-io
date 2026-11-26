import Link from '@docusaurus/Link';
import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

const investors = [
  { name: 'Index Ventures', url: 'https://www.indexventures.com/' },
  { name: 'Battery Ventures', url: 'https://www.battery.com/' },
  { name: 'New Enterprise Associates', url: 'https://www.nea.com/' },
  { name: 'Cortical Ventures', url: 'https://cortical.vc/' },
  { name: 'Zetta Venture Partners', url: 'https://www.zettavp.com/' },
  { name: 'ING Ventures', url: 'https://www.ingwb.com/en/corporate-investments/ing-ventures' },
  { name: 'GTM-fund', url: 'https://www.gtmfund.com/' },
  { name: 'Scale Asia Ventures', url: 'https://www.sav.vc/' },
  { name: 'Alex van Leeuwen', url: 'https://www.alexvanleeuwen.co' },
];

export default function Investors() {
  const listRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    let frame;
    const shouldPause = (list) =>
      !window.matchMedia('(max-width: 700px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.hidden ||
      list.contains(document.activeElement) ||
      (window.matchMedia('(hover: hover)').matches && list.matches(':hover'));

    const timer = window.setInterval(() => {
      const list = listRef.current;
      if (!list || shouldPause(list)) return;

      const items = Array.from(list.children);
      const listLeft = list.getBoundingClientRect().left;
      const currentIndex = items.reduce((closest, item, index) =>
        Math.abs(item.getBoundingClientRect().left - listLeft) <
        Math.abs(items[closest].getBoundingClientRect().left - listLeft)
          ? index
          : closest, 0);
      const next = items[(currentIndex + 1) % items.length];
      const start = list.scrollLeft;
      const distance = next.getBoundingClientRect().left - listLeft;
      let startTime;
      list.style.scrollSnapType = 'none';

      const animate = (time) => {
        if (shouldPause(list)) {
          list.style.removeProperty('scroll-snap-type');
          return;
        }
        if (startTime === undefined) startTime = time;
        const progress = Math.min((time - startTime) / 1400, 1);
        const eased = 1 - (1 - progress) ** 3;
        list.scrollLeft = start + distance * eased;
        if (progress < 1) {
          frame = window.requestAnimationFrame(animate);
        } else {
          list.style.removeProperty('scroll-snap-type');
        }
      };
      frame = window.requestAnimationFrame(animate);
    }, 6500);

    return () => {
      window.clearInterval(timer);
      window.cancelAnimationFrame(frame);
      listRef.current?.style.removeProperty('scroll-snap-type');
    };
  }, [paused]);

  return (
    <div className={styles.investorsContainer}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.investorBox}>
            <h2>Our investors</h2>

            <p>
              We are backed by investors who support our journey to bring
              AI-native database infrastructure to developers and teams around
              the world.
            </p>
            <div className={styles.investorButton}>
              <Link
                className={styles.pricingButton}
                to="https://www.crunchbase.com/organization/weaviate"
              >
                Crunchbase
              </Link>
              <Link
                className={styles.boardButton}
                to="https://theorg.com/org/weaviate/teams/board-and-advisors"
              >
                Board & Advisors
              </Link>
            </div>
          </div>
          <div className={styles.investorPanel}>
            <div className={styles.panelHeader}>
              <h3>Our backers</h3>
              <button
                type="button"
                className={styles.carouselControl}
                aria-label={paused ? 'Resume automatic scrolling' : 'Pause automatic scrolling'}
                title={paused ? 'Resume automatic scrolling' : 'Pause automatic scrolling'}
                onClick={() => setPaused((value) => !value)}
              >
                <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
              </button>
            </div>
            <ul
              className={styles.investorList}
              ref={listRef}
              onTouchStart={() => setPaused(true)}
            >
              {investors.map((investor) => (
                <li key={investor.name}>
                  <Link to={investor.url}>{investor.name}<span aria-hidden="true"> ↗</span></Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
