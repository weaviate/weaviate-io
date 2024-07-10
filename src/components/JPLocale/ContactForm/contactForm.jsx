import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function ContactForm() {
  return (
    <div className={styles.contactBackground}>
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form
              className={styles.formContact}
              action="https://formcarry.com/s/FZwYB5WwuG"
              method="POST"
            >
              <h2 className={styles.title}>お問い合わせ</h2>
              <div className={styles.links}></div>

              <input type="input" name="formName" placeholder="名前"></input>
              <span></span>
              <input
                type="email"
                name="formEmail"
                placeholder="メールアドレス"
              ></input>
              <span></span>

              <textarea
                type="text"
                name="formMessage"
                className={styles.formMessage}
                placeholder="メッセージ"
              ></textarea>
              <button type="submit" name="formSumbit">
                送信
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
