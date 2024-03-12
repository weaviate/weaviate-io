import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function ContactUsForm({ theme = 'light' }) {
  const [thx, setThx] = useState(false);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const options = [
    {
      value: 'conferenceTalk',
      text: 'Conference Talk',
    },
    { value: 'blogPost', text: 'Blog post' },
    {
      value: 'searchEngine',
      text: 'Search engine (e.g., Google or DuckDuckGo)',
    },
    { value: 'githubList', text: 'Github List' },
    { value: 'reddit', text: 'Reddit' },
    { value: 'twitter', text: 'Twitter' },
    { value: 'friend', text: 'A friend' },
    { value: 'other', text: 'Other' },
  ];

  const packageOptions = [
    {
      value: 'Serverless',
      text: 'Serverless',
    },
    {
      value: 'EnterpriseDedicated',
      text: 'Enterprise Dedicated',
    },
    {
      value: 'BYOC',
      text: 'BYOC',
    },
    {
      value: 'EducationSupport',
      text: 'Education & Support',
    },
  ];

  const [selected, setSelected] = useState(options[0].value);

  const [packageSelected, setSelectedPackage] = useState(
    packageOptions[0].value
  );
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = emailAddress.toLowerCase();
    setThx(!thx);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open(
      'GET',
      'https://us-central1-semi-production.cloudfunctions.net/sign-up-for-private-beta?email=' +
        email +
        '&name=' +
        name +
        '&foundHow=' +
        selected +
        '&packageSelected=' +
        packageSelected
    );
    xmlHttp.send(null);
    return xmlHttp.status;
  };

  const headerChange = theme === 'dark' ? styles.bgHeadDark : styles.bgHead;

  return (
    <>
      <div className={headerChange}></div>
      <div className={styles.contactBg}>
        <div className="container">
          <form
            className={styles.form}
            id="contact-sales"
            onSubmit={handleSubmit}
          >
            <div className={styles.intro}>
              <h2 id="contact-sales">Get Started with Weaviate</h2>
              <p>
                Please leave your contact details below and one of our sales
                representatives will reach out to you within 24 hours.
              </p>
            </div>
            <div className={styles.formWrapper}>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="name"
                placeholder="Name"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                autoComplete="off"
                className={styles.input}
                type="email"
                name="email"
                required={true}
                placeholder="Email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            <div className={styles.selectWrapper}>
              <label htmlFor="foundHow">
                How did you hear about Weaviate?*
              </label>

              <select
                value={selected}
                onChange={handleChange}
                className={styles.select}
              >
                {options.map((option, index) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.selectWrapper}>
              <label htmlFor="whichPackage">
                What package are you interested in?*
              </label>

              <select
                value={packageSelected}
                onChange={handlePackageChange}
                className={styles.select}
              >
                {packageOptions.map((packageOptions, index) => {
                  return (
                    <option
                      key={packageOptions.value}
                      value={packageOptions.value}
                    >
                      {packageOptions.text}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.actionBtn}>
              {thx === false && (
                <button className={styles.button} type="submit">
                  Complete registration
                </button>
              )}
              {thx === true && (
                <p>Thank you! You've received a confirmation email 🙏</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
