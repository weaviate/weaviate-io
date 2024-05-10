import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Study() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.studyContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.studyContent}>
            <h2>The AI Application Platform for Unstructured Data</h2>
            <p>
              Instabase is an enterprise-grade AI Application Platform that
              turns unstructured data into insights, instantly. They solve one
              of the most acute problems businesses face – slow or inaccurate
              decisioning due to unstructured data. Their engineering team was
              looking for a database that would allow them to deliver data
              insights to their users with a high degree of accuracy and rapid
              performance. They chose Weaviate because of the flexibility that a
              leading open-source tool gave them while hitting Instabase’s
              critical performance metrics better than any other database they
              tested. Built-in features like hybrid search and distance metrics,
              as well as support from an engaged developer community, made
              Weaviate the clear choice for Instabase.
            </p>
            <h2>Challenge</h2>
            <p>
              Instabase processes over 500K highly varied documents per day and
              needs to scale to the ever-growing demand of their customers. They
              needed a database solution that would allow them to index, store,
              and retrieve massive volumes of data while delivering results with
              an incredibly high level of accuracy to their users. “Accuracy
              determines the amount of savings any large institution can get,”
              said Shaunak Godbole, Head of Infrastructure Engineering at
              Instabase. “If the results aren’t accurate or take too long to
              surface, a human needs to get involved, and the cost savings goes
              away. So accuracy and speed are critical for us.”  Additionally,
              Instabase needed to support customers in highly regulated
              environments. European customers needed to ensure their data
              didn’t leave certain countries, while financial institutions
              didn’t want their data to leave their on-premises servers. They
              needed a database solution that could be deployed anywhere while
              maintaining a high level of performance. If accuracy, speed, and
              flexible deployment criteria were not met, Instabase would not be
              able to reduce the need for human intervention in complex data
              workflows for their customers.
            </p>

            <h2>Why Instabase Chose Weaviate</h2>
            <p>
              Instabase wants to empower their customers to focus on making fast
              and accurate decisions. They achieve this by classifying,
              extracting, and validating information from highly unstructured
              data. “The collaboration with Weaviate’s team, the community, and
              the results of our performance tests made Weaviate an easy
              choice,” notes Godbole. “In terms of performance, nobody needed
              convincing – the benchmarks spoke for themselves.”
            </p>
            <p>Weaviate checked all of Instabase’s boxes:</p>
            <ul>
              <li>
                <strong>Powerful performance:</strong> Instabase had their own
                benchmarks for the use cases they knew they had to solve really,
                really well. These benchmarks focus on retrieval accuracy and
                latency, and the queries are complex aggregation and composition
                where both dense and sparse searches are required. Each use case
                had different benchmarks, and Weaviate was a clear winner with
                high retrieval accuracy and low latency for vector search. Once
                the benchmarking team was convinced Weaviate was up for the
                challenge, teams across the organization worked together to
                bring Weaviate into production.
              </li>
              <li>
                <strong>High adaptability:</strong> By using an AI-native
                open-source vector database, Instabase could meet their
                customers wherever they operated, whether in the cloud or
                on-prem. This allowed for maximum flexibility to fulfill the
                strict deployment needs of organizations in highly regulated
                regions and industries.
              </li>
              <li>
                <strong>Modular architecture:</strong> Instead of having to
                build out their own capabilities, Instabase developers saved
                time by using Weaviate’s out of the box features like hybrid
                search and distance metrics, as well as easy integrations with
                popular large language models (LLMs).
              </li>
              <li>
                <strong>Strong support:</strong> Weaviate has cultivated an
                engaged, open source community with over 6M downloads and tens
                of thousands of organizations using the platform. Over 5K
                developers have direct access to the experts and comprehensive
                documentation they need to quickly problem solve as they build
                their applications. In addition, Weaviate’s core team was very
                collaborative with Instabase and was able to provide short,
                medium and long-term solutions to existing and anticipated
                challenges.
              </li>
            </ul>

            <p>
              <span className={styles.quote}>
                “Accuracy determines the amount of savings any large institution
                can get. If the results aren’t accurate or take too long to
                surface, a human needs to get involved, and the cost savings are
                greatly reduced. So accuracy and speed are critical for us.”
              </span>
              <br></br> Shaunak Godbole, Head of Infrastructure Engineering at
              Instabase
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Rapid performance</h2>
            <p>
              Instabase is able to store 50K+ tenants in the Weaviate cluster
              and query data from specific tenants within milliseconds.
            </p>
            <h2>Scales to unlimited document size</h2>
            <p>
               Instabase has seen the same impressive results whether customers
              engage with single-page handwritten notes, 200 pages of
              documentation, or 400 pages of financial filings.
            </p>
            <h2>450+ data types supported</h2>
            <p>
              With Weaviate, Instabase was able to support the ingestion and
              indexing of 450+ data types for a single customer solution.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              <Link to="https://instabase.com/">Instabase</Link> helps
              organizations across large enterprises, mid-market companies, and
              the federal government solve mission-critical automation problems
              and obtain insights from unstructured data. Their platform, called
              AI Hub, enables customers to obtain instant insights in Converse
              mode. When in Build mode, they can extract data from any content,
              classify, clean it up and embed the newly structured data
              downstream into existing systems. These automations enable
              customers to quickly and accurately make vital business decisions
              for complex processes like mortgage underwriting, driver’s license
              verification, or insurance broker submissions. Instabase’s
              customers include the world’s largest financial institutions,
              insurance companies, transportation, retail, and public sector
              organizations.
            </p>
            <h2>Why AWS</h2>
            <p>
              In 2017, the engineers at Instabase made the choice to build
              entirely on Kubernetes. They have several microservices that run
              on top of that and are deeply integrated with the{' '}
              <Link to="https://aws.amazon.com/solutions/case-studies/instabase-ec2-case-study/">
                AWS ecosystem
              </Link>
              , making use of products including AWS EC2, ECS, EKS, ELB, S3,
              ElastiCache, CDN, and Shield. AWS allows Instabase to build a
              highly-available, secure, scalable, and performant platform to
              support even their largest customers.
            </p>
            <h2>About Weaviate</h2>
            <p>
              Vector databases are becoming core to the AI tech stack because
              they can handle a very large amount of unstructured data in an
              efficient way. Weaviate is an AI-native vector database available
              on the AWS marketplace that can scale to handle billions of
              vectors and millions of tenants. Customers and community members
              use Weaviate to power large-scale search and generative AI
              applications like chatbots and agents. Weaviate’s extensible
              architecture offers easy pluggability with the AI ecosystem,
              empowering developers of all levels to build and iterate faster.
              And flexible deployment options let teams abstract the burden of
              hosting and managing their database, while still meeting
              enterprise requirements for security and compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
