import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import Calculator from '../Calculator';
import Sandbox from './Sandbox';

export default function CalculatorContainer() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.header}>
        <h2>Serverless Pricing</h2>
        <p className={styles.subHeader}>
          Our pricing is based on dimensions stored and chosen SLA tier. The
          exact calculation can be found in the{' '}
          <Link className={styles.faqLink} to="/platform">
            FAQ
          </Link>{' '}
          (not inclusive of discounts and taxes).
        </p>
      </div>
      <Sandbox />
      <Calculator />
      <div className={styles.desktopPlan}>
        <div className={styles.productPlan}>
          <div className={styles.plans}>
            <h2>SLA Tiers</h2>
            <p>Price per 1M vector dimensions stored per month</p>
            <p>Phone Escalation</p>
            <p>
              <span>Response time:</span> Severity 1
            </p>
            <p>Severity 2</p>
            <p>Severity 3</p>
            <p>Severity 4</p>
          </div>
          <div className={styles.plansTrack}>
            <div className={`${styles.plans} ${styles.standard}`}>
              <h2>Standard</h2>
              <p className={styles.pricing}>
                from <span>$25</span>/mo
              </p>
              <p>$0.095</p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.0625 2L12.125 11.9395"
                    stroke="#130C49"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                  <path
                    d="M12.0625 2L2 11.9395"
                    stroke="#130C49"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                </svg>
              </p>
              <p>1bd</p>
              <p>2bd</p>
              <p>3bd</p>
              <p>5bd</p>
            </div>
            <div className={`${styles.plans} ${styles.enterprise}`}>
              <h2>Enterprise</h2>
              <p className={styles.pricing}>
                from <span>$135</span>/mo
              </p>
              <p>$0.145</p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                >
                  <path
                    d="M2 6.2711L6.82222 11L16 2"
                    stroke="#130C49"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </p>
              <p>4h (24/7)</p>
              <p>8h (24/7)</p>
              <p>1bd</p>
              <p>2bd</p>
            </div>
            <div className={`${styles.plans} ${styles.businessCritical}`}>
              <h2>Business Critical</h2>
              <p className={styles.pricing}>
                from <span>$450</span>/mo
              </p>
              <p>$0.175</p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                >
                  <path
                    d="M2 6.2711L6.82222 11L16 2"
                    stroke="#130C49"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </p>
              <p>1h (24/7)</p>
              <p>4h (24/7)</p>
              <p>8h (24/7)</p>
              <p>1bd</p>
            </div>
          </div>
          <div className={`${styles.lines} ${styles.line1}`}></div>
          <div className={`${styles.lines} ${styles.line2}`}></div>
          <div className={`${styles.lines} ${styles.line3}`}></div>
        </div>
      </div>

      <div className={styles.mobile}>
        <div className={`${styles.productPlan} ${styles.mobilePlans}`}>
          <div className={styles.plans}>
            <h2>SLA Tiers</h2>
            <p>Price per 1M vector dimensions stored per month</p>
            <p>Phone Escalation</p>
            <p>
              <span>Response time:</span> Severity 1
            </p>
            <p>Severity 2</p>
            <p>Severity 3</p>
            <p>Severity 4</p>
          </div>

          <div className={`${styles.plans} ${styles.standard}`}>
            <h2>Standard</h2>
            <p className={styles.pricing}>
              from <span>$25</span>/mo
            </p>
            <p>$0.095</p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2.0625 2L12.125 11.9395"
                  stroke="#130C49"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <path
                  d="M12.0625 2L2 11.9395"
                  stroke="#130C49"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </p>
            <p>1bd</p>
            <p>2bd</p>
            <p>3bd</p>
            <p>5bd</p>
          </div>

          <div className={`${styles.lines} ${styles.line1}`}></div>
          <div className={`${styles.lines} ${styles.line2}`}></div>
          <div className={`${styles.lines} ${styles.line3}`}></div>
        </div>

        <div className={`${styles.productPlan} ${styles.mobilePlans}`}>
          <div className={styles.plans}>
            <h2>SLA Tiers</h2>
            <p>Price per 1M vector dimensions stored per month</p>
            <p>Phone Escalation</p>
            <p>
              <span>Response time:</span> Severity 1
            </p>
            <p>Severity 2</p>
            <p>Severity 3</p>
            <p>Severity 4</p>
          </div>

          <div className={`${styles.plans} ${styles.enterprise}`}>
            <h2>Enterprise</h2>
            <p className={styles.pricing}>
              from <span>$135</span>/mo
            </p>
            <p>$0.145</p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
              >
                <path
                  d="M2 6.2711L6.82222 11L16 2"
                  stroke="#130C49"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
            <p>4h (24/7)</p>
            <p>8h (24/7)</p>
            <p>1bd</p>
            <p>2bd</p>
          </div>

          <div className={`${styles.lines} ${styles.line1}`}></div>
          <div className={`${styles.lines} ${styles.line2}`}></div>
          <div className={`${styles.lines} ${styles.line3}`}></div>
        </div>

        <div className={`${styles.productPlan} ${styles.mobilePlans}`}>
          <div className={styles.plans}>
            <h2>SLA Tiers</h2>
            <p>Price per 1M vector dimensions stored per month</p>
            <p>Phone Escalation</p>
            <p>
              <span>Response time:</span> Severity 1
            </p>
            <p>Severity 2</p>
            <p>Severity 3</p>
            <p>Severity 4</p>
          </div>

          <div className={`${styles.plans} ${styles.businessCritical}`}>
            <h2 className={styles.mobileHeader}>Business Critical</h2>
            <p className={styles.pricing}>
              from <span>$450</span>/mo
            </p>
            <p>$0.175</p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
              >
                <path
                  d="M2 6.2711L6.82222 11L16 2"
                  stroke="#130C49"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
            <p>1h (24/7)</p>
            <p>4h (24/7)</p>
            <p>8h (24/7)</p>
            <p>1bd</p>
          </div>

          <div className={`${styles.lines} ${styles.line1}`}></div>
          <div className={`${styles.lines} ${styles.line2}`}></div>
          <div className={`${styles.lines} ${styles.line3}`}></div>
        </div>
      </div>

      <div className={styles.buttons}>
        <Link
          className={styles.buttonOutline}
          to="https://console.weaviate.cloud/"
        >
          Get started with Serverless
        </Link>
      </div>
    </div>
  );
}
