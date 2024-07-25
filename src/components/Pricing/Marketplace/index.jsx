import Link from '@docusaurus/Link';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import SlaPlan from '../SLAS';

export default function Marketplace() {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.soc2Container}>
        <div className={styles.box}>
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
              <div className={`${styles.cellIcon} ${styles.googleIcon}`}></div>
              <Link to="https://cloud.google.com/customers/weaviate">
                Google Cloud Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
