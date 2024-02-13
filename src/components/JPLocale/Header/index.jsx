import React, { useState } from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';
import Link from '@docusaurus/Link';

export default function HomepageHeader() {
  return (
    <header className={styles.headerHome}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.img} />

          <div className={styles.box}>
            <h1>最も簡単にAIアプリケーションを構築し拡張する</h1>
            <div className={styles.headerBox}>
              <p className="text-center">
                Weaviateは、開発者が信頼性のあるAIアプリケーションを作成するのをサポートするオープンソースのAI
                Nativeのベクトルデータベースです。
              </p>
            </div>
          </div>

          <div className={styles.buttons}>
            <Link
              className={styles.buttonGradient}
              to="https://console.weaviate.cloud"
            >
              無料で始める
            </Link>
            <Link className={styles.buttonOutline} to="/developers/weaviate">
              ドキュメント
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
