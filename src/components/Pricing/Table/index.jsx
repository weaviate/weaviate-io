import Link from '@docusaurus/Link';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import SlaPlan from '../SLAS';

export default function PricingTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isModalOpen]);
  return (
    <div className={styles.bgContainer}>
      <div className={styles.soc2Container}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.soc2Box}>
              <h2>Pricing Overview</h2>

              <p>
                Our ecosystem is designed to give you the capabilities to build
                and test your applications for free. When you are ready to move
                to production, simply pick a plan that best suits your needs.
              </p>
            </div>

            <div className={styles.tableBackground}>
              <div className={styles.tableContainer}>
                <div className={styles.tablePoints}>
                  <div className={styles.longCell}></div>
                  <hr></hr>
                  <div className={styles.smallCell}>
                    <span className={styles.cellSpan}>Best for</span>
                  </div>
                  <hr></hr>
                  <div className={styles.smallCell}>
                    <span className={styles.cellSpan}>Deployment Options</span>
                  </div>
                  <hr></hr>
                  <div className={styles.longCell}>
                    <span className={styles.cellSpan}>Pricing type</span>
                  </div>
                </div>
                {/* Table Content */}
                <div className={styles.tableContent}>
                  {/* Serverless Table */}
                  <div className={styles.serverlessTable}>
                    <div className={styles.longCell}>
                      <div className={styles.cellContent}>
                        <div className={styles.cellImage}></div>
                        <h3>Serverless</h3>
                        <span>
                          We manage everything for you in Weaviate Cloud
                          Services (WCS)
                        </span>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <span className={styles.cellSpan}>
                        Building and prototyping with seamless scaling and
                        flexible pay-as-you-go pricing
                      </span>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <div className={styles.cellContent}>
                        <div className={styles.cellLogo}>
                          <div className={styles.logoText}>
                            <span>Weaviate</span>
                            <span>Cloud Services</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={`${styles.longCell} ${styles.pricing}`}>
                      <span className={styles.cellSpan}>
                        Charges are consumption-based, pay-as-you-go, determined
                        by the dimensions stored and the chosen SLA package
                      </span>
                      <div className={styles.buttons}>
                        <Link
                          className={styles.buttonGradient}
                          onClick={openModal}
                        >
                          Sign up
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.modals} ${
                      isModalOpen ? styles.open : ''
                    }`}
                    style={{ display: isModalOpen ? 'flex' : 'none' }}
                  >
                    <div className={styles.modalContents}>
                      <span className={styles.close} onClick={closeModal}>
                        &times;
                      </span>
                      <SlaPlan />
                    </div>
                  </div>

                  {/* Enterprise Table */}
                  <div
                    className={`${styles.serverlessTable} ${styles.enterprise}`}
                  >
                    <div className={styles.longCell}>
                      <div className={styles.cellContent}>
                        <div
                          className={`${styles.edImage} ${styles.cellImage} `}
                        ></div>
                        <h3>Enterprise Dedicated</h3>
                        <span>
                          We manage everything for you in a dedicated instance
                          in Weaviate Cloud Services (WCS)
                        </span>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <span className={styles.cellSpan}>
                        Deploying large-scale production use cases without the
                        complexities of self-management
                      </span>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <div className={styles.cellContent}>
                        <div className={styles.iconSection}>
                          <div
                            className={`${styles.cellIcon} ${styles.azureIcon}`}
                          ></div>
                          <div
                            className={`${styles.cellIcon} ${styles.awsIcon}`}
                          ></div>
                          <div
                            className={`${styles.cellIcon} ${styles.googleIcon}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={`${styles.longCell} ${styles.pricing}`}>
                      <span className={styles.cellSpan}>
                        Annual contract based on reserved resources and expected
                        usage patterns
                      </span>
                      <div className={styles.buttons}>
                        <Link
                          to="#contact-sales"
                          className={styles.buttonGradient}
                        >
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* BYOC Table */}
                  <div className={`${styles.serverlessTable} ${styles.byoc}`}>
                    <div className={styles.longCell}>
                      <div className={styles.cellContent}>
                        <div
                          className={`${styles.byocImage} ${styles.cellImage} `}
                        ></div>
                        <h3>Bring Your Own Cloud</h3>
                        <span>A fully managed solution within your VPC</span>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <span className={styles.cellSpan}>
                        Running workflows within your Virtual Private Cloud
                        (VPC)
                      </span>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <div className={styles.cellContent}>
                        <div className={styles.iconSection}>
                          <div
                            className={`${styles.cellIcon} ${styles.azureIcon}`}
                          ></div>
                          <div
                            className={`${styles.cellIcon} ${styles.awsIcon}`}
                          ></div>
                          <div
                            className={`${styles.cellIcon} ${styles.googleIcon}`}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={`${styles.longCell} ${styles.pricing}`}>
                      <span className={styles.cellSpan}>
                        Annual contract based upon CPU + RAM utilization
                      </span>
                      <div className={styles.buttons}>
                        <Link
                          to="#contact-sales"
                          className={styles.buttonGradient}
                        >
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Education & Support Table */}
                  <div
                    className={`${styles.serverlessTable} ${styles.support}`}
                  >
                    <div className={styles.longCell}>
                      <div className={styles.cellContent}>
                        <div
                          className={`${styles.byocImage} ${styles.cellImage} `}
                        ></div>
                        <h3>Education & Training</h3>
                        <span>
                          A variety of bespoke and self-service support and
                          training options to accelerate adoption and success
                        </span>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <span className={styles.cellSpan}>
                        Everyone! Anyone looking for help building and scaling
                        with Weaviate
                      </span>
                    </div>
                    <hr></hr>
                    <div className={styles.smallCell}>
                      <div className={styles.cellContent}>
                        <span>
                          Support for any type of user on any type of deployment
                        </span>
                        <br></br>
                        <span className={styles.cellNotice}>
                          *Self-serve with on-demand resources
                        </span>
                      </div>
                    </div>
                    <hr></hr>
                    <div className={`${styles.longCell} ${styles.pricing}`}>
                      <span className={styles.cellSpan}>
                        Annual contract based upon CPU + RAM utilization
                      </span>
                      <div className={styles.buttons}>
                        <Link
                          to="#contact-sales"
                          className={styles.buttonGradient}
                        >
                          Contact us
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.tableFooter}>
              <div className={styles.tableFooterText}>
                Available on Marketplaces
              </div>
              <div className={styles.iconSection}>
                <div className={`${styles.cellIcon} ${styles.azureIcon}`}></div>
                <Link to="https://azuremarketplace.microsoft.com/en-us/marketplace/apps/weaviatebv1686614539420.weaviate_1?tab=overview">
                  Microsoft Azure
                </Link>
                <div className={`${styles.cellIcon} ${styles.awsIcon}`}></div>
                <Link to="https://aws.amazon.com/marketplace/pp/prodview-27nbweprm7hha?sr=0-2&ref_=beagle&applicationId=AWSMPContessa">
                  Amazon Web Services
                </Link>
                <div
                  className={`${styles.cellIcon} ${styles.googleIcon}`}
                ></div>
                <Link to="https://cloud.google.com/customers/weaviate">
                  Google Cloud Platform
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
