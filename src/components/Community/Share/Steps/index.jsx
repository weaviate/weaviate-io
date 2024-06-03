import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

import useBaseUrl from '@docusaurus/useBaseUrl';
import ValueKind from '/static/img/company/values/values-be-kind.svg';
import ValueExcellence from '/static/img/company/values/values-excellence.svg';
import ValueTransparency from '/static/img/company/values/values-transparency.svg';
import ValueTrust from '/static/img/company/values/values-trust.svg';
import ValueWorkTogether from '/static/img/company/values/values-work-together.svg';

export default function Steps() {
  return (
    <div className={styles.valuesBG}>
      <div className="container" id="our_company_values">
        <div className={styles.title}>
          <h2>Build with Weaviate Framework</h2>
          <p>
            First things first, you're about to build an AI application, but
            where do you begin? We've outlined some important steps to prepare
            you:
          </p>
        </div>
        <div className={styles.valuesSection}>
          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon1}> </div>
              <div className={styles.valuesHead}>
                <span>Step 1</span>
                <h4>Build something cool with Weaviate</h4>
              </div>
            </div>

            <p>
              Are you in the process of building AI applications or just
              starting out? Perhaps you've never even heard of Weaviate before?
              We're here to assist you on your journey to create your own AI
              applications and to make the process as smooth and transparent as
              possible.
            </p>
            <Link to="/developers/weaviate">Get started with Weaviate</Link>
          </div>

          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon2}> </div>
              <div className={styles.valuesHead}>
                <span>Step 2</span>
                <h4>Submit your project</h4>
              </div>
            </div>

            <p>
              Have a great project to share? Let us help you to spread the word
              and the love for open source! Whether you're a project owner
              looking to maximize visibility or a showcase client aiming to
              stand out on social media, our program provides the tools and
              support you need to succeed.
            </p>
            <Link to="/community/share-the-weaviate-love/#contact-form">
              Submit your project
            </Link>
          </div>

          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon3}> </div>
              <div className={styles.valuesHead}>
                <span>Step 3</span>
                <h4>Promote your project with us</h4>
              </div>
            </div>

            <p>
              Struggling to gain visibility for your AI project?Let us help you
              in boosting your projects and campaigns. Whether you're a project
              owner looking to maximize visibility or a showcase client aiming
              to make an impact on social media, our program equips you with the
              tools and support necessary for success.
            </p>
            <Link to="mailto:grow@weaviate.io">Grow with Weaviate</Link>
          </div>

          <div className={styles.valuesBox}>
            <div className={styles.valuesHeader}>
              <div className={styles.valuesIcon4}> </div>
              <div className={styles.valuesHead}>
                <span>Step 4</span>
                <h4>Get picked by Weaviate</h4>
              </div>
            </div>

            <p>
              We'll review your project based on the solution, size and quality
              and reach out to your once you submitted your form within 48 hours
              and get back to you with a best fitting proposal for potential
              collaboration, based on your specific project. Weaviate's favorite
              projects are highlighted on our website.
            </p>
            <Link to="">Contact us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
