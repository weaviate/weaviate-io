import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState('partner');

  useEffect(() => {
    const updateTabFromURL = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.split('?')[1]);
      const tabParam = params.get('tab');

      if (tabParam === 'deal') {
        setActiveTab('deal');
      } else {
        setActiveTab('partner');
      }
    };

    updateTabFromURL();

    window.addEventListener('hashchange', updateTabFromURL);

    return () => {
      window.removeEventListener('hashchange', updateTabFromURL);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '8738733',
          formId:
            activeTab === 'partner'
              ? '43cd579f-e01c-4adf-a5b0-234d0924037e'
              : '6f40eea0-cc2f-444a-96b6-0446a740f50d',
          target: '#hubspotForm',
        });
      }
    });

    return () => {
      document.body.removeChild(script);
    };
  }, [activeTab]);

  return (
    <div className={styles.contactBackground} id="request-form">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  activeTab === 'partner' ? styles.activeTab : ''
                }`}
                onClick={() => setActiveTab('partner')}
              >
                Become a Partner
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === 'deal' ? styles.activeTab : ''
                }`}
                onClick={() => setActiveTab('deal')}
              >
                Register a Deal
              </button>
            </div>
            <h2>
              {activeTab === 'partner'
                ? 'Become a Weaviate Partner'
                : 'Register a Deal'}
            </h2>
            <p>
              {activeTab === 'partner'
                ? 'Interested in learning more about the Weaviate Partner Program? Fill out the form below to connect with us.'
                : 'Register your deal with us by filling out the form below to get started.'}
            </p>
            <br />
            <div id="hubspotForm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
