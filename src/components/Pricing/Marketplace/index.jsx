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
              <Link to="https://aws.amazon.com/marketplace/pp/prodview-ng2dfhb4yjoic?sr=0-3&ref_=beagle&applicationId=AWSMPContessa&utm_source=website&utm_medium=button&utm_campaign=AWSMarketplace">
                Amazon Web Services
              </Link>
              <div className={`${styles.cellIcon} ${styles.googleIcon}`}></div>
              <Link to="https://console.cloud.google.com/marketplace/product/weaviate-gcp-mktplace/weaviate?hl=en&project=clean-pen-427907-c5&invt=AbnoVg&utm_source=website&utm_medium=button&utm_campaign=GCPMarketplace&inv=1">
                Google Cloud Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
