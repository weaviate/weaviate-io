import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Details() {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const hideTooltipTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (hideTooltipTimeout.current) {
      clearTimeout(hideTooltipTimeout.current);
    }
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    hideTooltipTimeout.current = setTimeout(() => {
      setTooltipVisible(false);
    }, 1000);
  };

  return (
    <div className={styles.bgCol}>
      <div className="container">
        <div className={styles.header}>
          <h2>Explore the advantages of a remote work culture</h2>
          <p>
            Enjoy the freedom to do your best work, connect with colleagues, and
            expand your knowledge working with cutting-edge technology and
            smart, motivated people.
          </p>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.parentGrid}>
            <div className={styles.imageGrid1}></div>
            <div className={styles.imageGrid2}></div>
            <div className={styles.imageGrid3}></div>
            <div className={styles.imageGrid4}></div>
            <div className={styles.imageGrid5}></div>
            <div className={styles.imageGrid6}></div>
          </div>
          <div className={styles.typeContainer}>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={styles.homeIcon}></div>
                <h2>Work that fits your life</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Enjoy the flexibility and freedom to do your best work,
                  whenever and wherever you choose.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.travel}`}></div>
                <h2>Global travel opportunities</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Connect with colleagues worldwide and enjoy our annual company
                  trip.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.culture}`}></div>
                <h2>Culture of AI and innovation</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Expand your role with cutting-edge technology and a creative
                  team, encouraging experimentation and creativity.
                </p>
              </div>
            </div>
            <div className={styles.typeBox}>
              <div className={styles.typeIcon}>
                <div className={`${styles.homeIcon} ${styles.perks}`}></div>
                <h2>Benefits and perks</h2>
              </div>
              <div className={styles.typeText}>
                <p>
                  Home office budget, flexible time off, and{' '}
                  <Link
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={styles.tooltipTrigger}
                  >
                    local benefits
                  </Link>
                  .
                  {tooltipVisible && (
                    <div
                      className={styles.tooltip}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className={styles.tooltipContent}>
                        <div className={styles.toolList}>
                          <ul>
                            <strong>USA:</strong>
                            <li>Healthcare</li>
                            <li>
                              401(k) employer
                              <br /> matching
                            </li>
                          </ul>

                          <ul>
                            <strong>The Netherlands:</strong>
                            <li>Holiday allowance</li>
                            <li>Pension plan</li>
                          </ul>
                        </div>
                        <p>
                          *For benefits in other countries, we rely on our
                          Employer of Record partner Remote. Have a look at the
                          benefits they offer{' '}
                          <Link to="https://remote.com/country-explorer?service=all">
                            here
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
