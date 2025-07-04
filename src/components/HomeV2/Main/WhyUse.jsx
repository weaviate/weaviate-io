import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';
import CodeTabs from '../CodeBlock';
import SplitImageSlider from '../SplitBlock';

export default function WhyUse() {
  return (
    <div className={styles.boxContainer}>
      <div className={styles.whyContainer}>
        <div className={styles.leftContainer}>
          <h4>Easy start, boundless scale, deploy anywhere.</h4>
          <div className={`${styles.benefitText} ${styles.ww01}`}>
            <div>
              <h5>AI-first features under one roof</h5>
              <p>
                Avoid separate systems and complex data pipelines. Write less
                custom code and build AI-native apps faster.
              </p>
            </div>
          </div>
          <div className={`${styles.benefitText} ${styles.ww02}`}>
            <div>
              <h5>Billion-scale architecture</h5>
              <p>
                Adapt to any workload. Scale seamlessly as you grow up or out,
                all while optimizing costs.
              </p>
            </div>
          </div>
          <div className={`${styles.benefitText} ${styles.ww03}`}>
            <div>
              <h5>Enterprise-ready deployment</h5>
              <p>
                Run securely in our cloud or yours. Meet enterprise requirements
                like RBAC, SOC 2, and HIPAA.
              </p>
            </div>
          </div>
          <div className={`${styles.benefitText} ${styles.ww04}`}>
            <div>
              <h5>A partner in innovation</h5>
              <p>
                Fuel your AI products with cutting-edge features and first-class
                support from our global team of experts.
              </p>
            </div>
          </div>
          <div className={`${styles.benefitText} ${styles.ww05}`}>
            <div>
              <h5>Where the AI builders build </h5>
              <p>
                Join our community of over 50,000 AI builders. Attend courses,
                events, and discussions online or in-person.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <SplitImageSlider />
        </div>
      </div>
    </div>
  );
}
