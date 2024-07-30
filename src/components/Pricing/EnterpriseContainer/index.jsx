import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function EnterpriseContainer({ closeModal }) {
  const [activeTab, setActiveTab] = useState('aws');

  const renderContent = () => {
    switch (activeTab) {
      case 'aws':
        return (
          <>
            <Link className={styles.faqLink} to="#faq" onClick={closeModal}>
              <span>Starting from $2.64 per AI Unit (AIU)</span>
            </Link>

            <div className={styles.tabRight}>
              <span>AIU per hour / GB</span>
              <span>AIU per month / GB</span>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.vpcs}`} />
              <div className={styles.tabText}>
                <p>vCPU</p>
              </div>
              <p className={styles.marginRight}>0.0294658</p>
              <p>21.544</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.hot}`} />
              <div className={styles.tabText}>
                <p>HOT</p>
                <span>Used for data accessed frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0017534</p>
              <p>1.280</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.warm}`} />
              <div className={styles.tabText}>
                <p>WARM</p>
                <span>Used for data accessed less-frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0000959</p>
              <p>0.071</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.cold}`} />
              <div className={styles.tabText}>
                <p>COLD</p>
                <span>
                  Used for data not needed at the time,<br></br> but fast to
                  activate.
                </span>
              </div>
              <p className={styles.marginRight}>0.0000137</p>
              <p>0.010</p>
            </div>
            <div className={styles.tabBottom}>
              <em>*Standard SLA tier</em>
              <em> **Based on us-east-1</em>
            </div>
          </>
        );
      case 'google':
        return (
          <>
            <Link className={styles.faqLink} to="#faq" onClick={closeModal}>
              <span>Starting from $2.64 per AI Unit (AIU)</span>
            </Link>
            <div className={styles.tabRight}>
              <span>AIU per hour / GB</span>
              <span>AIU per month / GB</span>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.vpcs}`} />
              <div className={styles.tabText}>
                <p>vCPU</p>
              </div>
              <p className={styles.marginRight}>0.0294658</p>
              <p>22.254</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.hot}`} />
              <div className={styles.tabText}>
                <p>HOT</p>
                <span>Used for data accessed frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0017534</p>
              <p>1.280</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.warm}`} />
              <div className={styles.tabText}>
                <p>WARM</p>
                <span>Used for data accessed less-frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0000959</p>
              <p>0.076</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.cold}`} />
              <div className={styles.tabText}>
                <p>COLD</p>
                <span>
                  Used for data not needed at the time,<br></br> but fast to
                  activate.
                </span>
              </div>
              <p className={styles.marginRight}>0.0000137</p>
              <p>0.08</p>
            </div>
            <div className={styles.tabBottom}>
              <em>*Standard SLA tier</em>
              <em> **Based on us-east-1</em>
            </div>
          </>
        );
      case 'azure':
        return (
          <div className={styles.azureContainer}>
            <p>
              Contact our Sales team for more information about Azure pricing.
            </p>
            <Link
              className={styles.contactUsButton}
              to="#contact-sales"
              onClick={closeModal}
            >
              Contact us
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.bgColor}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className={`${styles.pricingIcon} ${styles.enterprise}`}></div>
            <h3>Enterprise Cloud Pricing</h3>
          </div>
          <p className={styles.subHeader}>
            Tailored for businesses seeking high performance, Weaviate’s
            Enterprise Cloud solution provides the power of Weaviate on
            dedicated resources, ensuring consistent, high-speed results without
            the complexities of self-management.
          </p>
        </div>

        <div className={styles.tabContainer}>
          <div className={styles.tabs}>
            <div
              className={`${styles.tab} ${
                activeTab === 'aws' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('aws')}
            >
              <div className={`${styles.cellIcon} ${styles.awsIcon}`} /> Amazon
              Web Services
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === 'google' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('google')}
            >
              <div className={`${styles.cellIcon} ${styles.googleIcon}`} />{' '}
              Google
            </div>
            <div
              className={`${styles.tab} ${
                activeTab === 'azure' ? styles.activeTab : ''
              }`}
              onClick={() => setActiveTab('azure')}
            >
              <div className={`${styles.cellIcon} ${styles.azureIcon}`} /> Azure
            </div>
          </div>
          <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
              <h3>
                {activeTab === 'azure'
                  ? 'Questions about pricing?'
                  : 'Configure consumption for your use case'}
              </h3>
              {activeTab !== 'azure' && (
                <p>
                  Optimize the cost of running multi-tenant AI workloads at
                  scale. Move between hot, warm, and cold storage tiers based on
                  usage patterns.
                </p>
              )}
            </div>
            <div className={styles.tabBody}>{renderContent()}</div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link
            className={styles.buttonGradient}
            to="https://events.weaviate.io/pricing-download"
          >
            Get the pricing guide
          </Link>
          <Link
            className={styles.buttonOutline}
            to="/services/enterprise-cloud"
          >
            Explore all benefits and features
          </Link>
        </div>
      </div>
    </div>
  );
}
