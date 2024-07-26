import React, { useState } from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function EnterpriseContainer() {
  const [activeTab, setActiveTab] = useState('aws');

  const renderContent = () => {
    switch (activeTab) {
      case 'aws':
        return (
          <>
            <span>Starting from $2.64 per AI Unit (AIU)</span>
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
              <p>21.51</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.hot}`} />
              <div className={styles.tabText}>
                <p>HOT</p>
                <span>Used for data accessed frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0017534</p>
              <p>1.28</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.warm}`} />
              <div className={styles.tabText}>
                <p>WARM</p>
                <span>Used for data accessed less-frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0000959</p>
              <p>0.07</p>
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
              <p>0.01</p>
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
            <span>Starting from $2.64 per AI Unit (AIU)</span>
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
              <p>21.51</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.hot}`} />
              <div className={styles.tabText}>
                <p>HOT</p>
                <span>Used for data accessed frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0017534</p>
              <p>1.28</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.warm}`} />
              <div className={styles.tabText}>
                <p>WARM</p>
                <span>Used for data accessed less-frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0000959</p>
              <p>0.07</p>
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
              <p>0.01</p>
            </div>
            <div className={styles.tabBottom}>
              <em>*Standard SLA tier</em>
              <em> **Based on us-east-1</em>
            </div>
          </>
        );
      case 'azure':
        return (
          <>
            <span>Starting from $2.64 per AI Unit (AIU)</span>
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
              <p>21.51</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.hot}`} />
              <div className={styles.tabText}>
                <p>HOT</p>
                <span>Used for data accessed frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0017534</p>
              <p>1.28</p>
            </div>
            <div className={styles.tabBar}>
              <div className={`${styles.vpcIcon} ${styles.warm}`} />
              <div className={styles.tabText}>
                <p>WARM</p>
                <span>Used for data accessed less-frequently.</span>
              </div>
              <p className={styles.marginRight}>0.0000959</p>
              <p>0.07</p>
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
              <p>0.01</p>
            </div>
            <div className={styles.tabBottom}>
              <em>*Standard SLA tier</em>
              <em> **Based on us-east-1</em>
            </div>
          </>
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
            The easiest way to get started with Weaviate. All the power of our
            AI-native vector database, as a fully-managed SaaS offering. Best
            for nimble teams at all stages of building.
          </p>
          <p className={styles.subHeader}>
            Our Serverless Cloud pricing is based on dimensions stored and
            chosen SLA tier. The exact calculation can be found in the{' '}
            <Link className={styles.faqLink} to="#faq">
              FAQ
            </Link>{' '}
            (not inclusive of discounts and taxes).
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
              <h3>Configure consumption for your use case </h3>
              <p>
                Optimize the cost of running multi-tenant AI workloads at scale.
                Move between hot, warm, and cold storage tiers based on usage
                patterns.
              </p>
              <p>
                Pay only for what you need. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua.
              </p>
            </div>
            <div className={styles.tabBody}>{renderContent()}</div>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link
            className={styles.buttonGradient}
            to="https://console.weaviate.cloud/"
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
