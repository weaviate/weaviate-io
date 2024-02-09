import React from 'react';

import styles from './styles.module.scss';
import Link from '@docusaurus/Link';
import * as Tabs from '@radix-ui/react-tabs';
import { LinkButton } from '/src/theme/Buttons';
import { ButtonContainer } from '../../../theme/Buttons';
import CodeSnippet from './CodeSnippet';
import CodeClientInstall from '/_includes/code/quickstart/clients.install.mdx';
import ConnectToWeaviateWithKey from '/_includes/code/quickstart/connect.withkey.mdx';
import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart/collection.definition.mdx';
import CodeAutoschemaImport from '/_includes/code/quickstart/import.mdx';
import CodeAutoschemaNeartext from '/_includes/code/quickstart/neartext.mdx';
import BiologyQuestionsJson from '/_includes/code/quickstart/response.biology.questions.mdx';
import CodeAutoschemaGenerative from '/_includes/code/quickstart/generativesearch.single.mdx';
import BiologyGenerativeSearchJson from '/_includes/code/quickstart/response.biology.generativesearch.single.mdx';

export default function HomepageWhatYouCanDo() {
  return (
    <div className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>クイックスタート</h1>
        <p className={styles.subtitle}></p>
      </div>

      <div className={styles.module}>
        <div className={`${styles.codeImage} ${styles.code1}`} />
      </div>
      <div className={styles.tutorialBox}>
        <h2>1. Weaviate データベース作成</h2>
        <p>まずはじめに、Weaviate データベースを作成します。</p>
        <p>
          本記事ではクラウドマネージド版のWeaviate Cloud
          Services（WCS）の無料プランを使用します。
        </p>
        <p>
          クラウド環境のセットアップにあたっては、
          <a href="https://weaviate.io/developers/wcs/quickstart">
            WCS クイックスタート
          </a>{' '}
          も参考にしてください。
        </p>
        <p>
          オープンソースのWeaviateは、
          <a href="https://weaviate.io/developers/weaviate/installation">
            DockerやKubernetesなどでローカルに立てる
          </a>
          こともできます。
        </p>
      </div>
      <div className={styles.tutorialBox}>
        <h2>2. Weaviate Clientライブラリのインストール</h2>
        <p>
          次は
          <a href="https://weaviate.io/developers/weaviate/client-libraries">
            Weaviate Clientライブラリ
          </a>
          の準備をします。ライブラリは以下の言語をサポートしています。
        </p>
        <ul>
          <li>Python</li>
          <li>TypeScript/JavaScript</li>
          <li>Go</li>
          <li>Java</li>
        </ul>
        <p>必要なパッケージをインストールしてください。</p>

        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <CodeClientInstall />
        </div>
      </div>
      <div className={styles.tutorialBox}>
        <h2>3. 簡単なデータの取り込み</h2>
        <h3>Weaviateの接続情報をセットアップ</h3>
        <p>
          次はWeaviate
          Clientを初期化します。Weaviateの接続情報をセットアップには以下の情報が必要です。
        </p>
        <ul>
          <li>接続はWeaviateのURLとAPIキー (WCSの`Details` タブから)</li>
          <li>
            EmbeddingはOpenAIを使用するのでOpenAIのAPIキー (
            <a href="https://platform.openai.com/signup">登録はこちら</a>).
          </li>
        </ul>

        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <ConnectToWeaviateWithKey />
        </div>

        <h3>サンプルデータ</h3>

        <p>今回用いるサンプルデータは、"Jeopardy!"データです。</p>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Category</th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>SCIENCE</td>
              <td>
                This organ removes excess glucose from the blood &amp; stores it
                as glycogen
              </td>
              <td>Liver</td>
            </tr>
            <tr>
              <td>1</td>
              <td>ANIMALS</td>
              <td>It's the only living mammal in the order Proboseidea</td>
              <td>Elephant</td>
            </tr>
            <tr>
              <td>2</td>
              <td>ANIMALS</td>
              <td>
                The gavial looks very much like a crocodile except for this
                bodily feature
              </td>
              <td>the nose or snout</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ANIMALS</td>
              <td>
                Weighing around a ton, the eland is the largest species of this
                animal in Africa
              </td>
              <td>Antelope</td>
            </tr>
            <tr>
              <td>4</td>
              <td>ANIMALS</td>
              <td>
                Heaviest of all poisonous snakes is this North American
                rattlesnake
              </td>
              <td>the diamondback rattler</td>
            </tr>
            <tr>
              <td>5</td>
              <td>SCIENCE</td>
              <td>
                2000 news: the Gunnison sage grouse isn't just another northern
                sage grouse, but a new one of this classification
              </td>
              <td>species</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.tutorialBox}>
        <h3>データコレクションの定義</h3>
        <p>
          次は、クラスを作成して
          <a href="https://weaviate.io/developers/weaviate/tutorials/schema">
            Schema
          </a>
          を定義します。
        </p>

        <p>クラスは、オブジェクトを格納するデータコレクションです。</p>
        <p>
          クラスのSchemaに
          <a href="https://weaviate.io/developers/weaviate/modules">
            モジュール
          </a>
          を定義します。
        </p>
        <ul>
          <li>
            Vectorizerモジュールには<code>text2vec-openai</code>を使用します。
          </li>
          <li>
            Generatorモジュールには<code>generative-openai</code>を使用します。
          </li>
        </ul>
        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <CodeAutoschemaMinimumSchema />
        </div>
      </div>
      <div className={styles.tutorialBox}>
        <h3>データ登録</h3>
        <p>次はWeaviateのClientにデータを登録します。</p>

        <p>
          事前にベクトル化する必要はなく、Vectorizerモジュールでベクトル化して取り込めます。
        </p>
        <p>
          なので、ベクトルデータではなくデータオブジェクトをそのまま登録します。
        </p>
        <p>
          内部的にはVectorizerの<code>text2vec-openai</code>
          モジュールが、OpenAPIのEmbeddings
          APIを実行してベクトルに変換しています。
        </p>

        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <CodeAutoschemaImport />
        </div>
      </div>

      <div className={styles.tutorialBox}>
        <h2>4. クエリ方法</h2>
        <p>
          Weaviateを使ってベクトル検索、キーワード検索とハイブリッド検索のクエリを実行できます。
        </p>

        <p>Generatorモジュールを使って簡単に検索拡張生成もできます。</p>
        <p>
          このチュートリアルではベクトル検索と検索拡張生成の方法を紹介させていただきます。
        </p>
      </div>

      <div className={styles.tutorialBox}>
        <h3>ベクトル検索</h3>
        <p>まずは、ベクトル検索のクエリを実行します。</p>

        <p>
          クエリの<code>nearText</code>
          で指定した文章に関連するデータオブジェクトが取得でます。
        </p>
        <p>テキストを入力値として、類似度の高いデータを検索します。</p>

        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <CodeAutoschemaNeartext />
        </div>
        <p>結果はこちら</p>

        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <BiologyQuestionsJson />
        </div>
      </div>

      <div className={styles.tutorialBox}>
        <h3>検索拡張生成 (RAG)</h3>
        <p>次は、検索拡張生成のクエリを実行します。</p>

        <p>
          まずは、ベクトル検索のクエリと似たように<code>nearText</code>
          で検索します。
        </p>
        <p>
          <code>nearText</code>
          で検索したデータオブジェクトに対して、Generatorモジュールを使ってプロンプトで結果を加工することがでます。
        </p>

        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <CodeAutoschemaGenerative />
        </div>
        <p>結果はこちら</p>

        <div className="theme-admonition theme-admonition-info alert alert--info admonition_LlT9">
          <BiologyGenerativeSearchJson />
        </div>
      </div>
    </div>
  );
}
