import React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

export default function ContactUsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <div className="container">
      <form className={styles.form}>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            autoComplete="off"
            className={styles.input}
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
