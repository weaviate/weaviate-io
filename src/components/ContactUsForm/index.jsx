import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function ContactUsForm() {
  const [thx, setThx] = useState(false);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const options = [
    { value: 'conferenceTalk', text: 'Conference Talk' },
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
  const [selected, setSelected] = useState(options[0].value);
  const handleChange = (event) => {
    setSelected(event.target.value);
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
        selected
    );
    xmlHttp.send(null);
    return xmlHttp.status;
  };

  return (
    <div className="container" id="register">
      <form className={styles.form} id="contact-sales" onSubmit={handleSubmit}>
        <div className={styles.intro}>
          <h2>Register for Private Beta</h2>
          <p>
            We are currently onboarding customers onto the Weaviate Cloud
            Services via the Private Beta program. Please leave your contact
            details below if you want to join the first wave of managed vector
            search users. After leaving your details, a representative will
            reach out to you within 24 hours to investigate if you qualify for
            the private beta program.
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
          <label htmlFor="foundHow">How did you hear about Weaviate?</label>

          <select
            value={selected}
            onChange={handleChange}
            className={styles.select}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.actionBtn}>
          {thx === false && (
            <button className={styles.button} type="submit">
              Sign Up for the Private Beta
            </button>
          )}
          {thx === true && (
            <p>Thank you! You've received a confirmation email 🙏</p>
          )}
        </div>
      </form>
    </div>
  );
}
