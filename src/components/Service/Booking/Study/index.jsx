import React from "react";
import styles from "./styles.module.scss";
import Link from "@docusaurus/Link";

export default function Study() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.studyContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.studyContent}>
            <h2>Summary</h2>
            <p>
              <strong>
                When Booking.com's internal embedding service requirements
                outgrew OpenSearch, its Machine Learning &amp; Data Science team
                moved to Weaviate to handle the wide variety of AI use cases
                across the company, with faster performance and roughly 40%
                lower cost.
              </strong>
            </p>
            <h2>The Challenge</h2>
            <p>
              Booking.com's Machine Learning &amp; Data Science team runs a
              centralized embedding service that powers vector search and data
              management for machine learning, agentic, and GenAI projects
              across the organization. The service originally launched on
              OpenSearch because the team already had familiarity with it.
            </p>
            <p>
              As more teams adopted the service, datasets grew to hundreds of
              millions of embeddings, queries increased in complexity, and
              concurrency and low-latency expectations rose, especially for
              user-facing applications. Holding OpenSearch performance steady
              meant constant tuning and ever-increasing costs as cluster sizes
              and operational overhead grew.
            </p>
            <p>
              “As more teams started using our vector store, we began seeing
              highly diverse requirements across use cases. Some teams needed
              advanced capabilities like hybrid search or multi-vector support,
              while others demanded larger vector capacities and higher RPS
              metrics. These requirements brought us to a point where we needed
              to reassess whether our current setup could support this next
              phase of growth.” - Başak Tuğçe Eskili, Machine Learning Engineer,
              Booking.com
            </p>
            <h2>Why Weaviate?</h2>
            <p>
              Booking.com built a performance benchmark that closely resembled
              its production workloads: 100 million embeddings, increasing
              concurrent threads, and nearest-neighbor, filtered KNN, and mixed
              read/write queries. Weaviate delivered the most consistent
              performance of the evaluated databases.
            </p>
            <ul className={styles.whyWeaviate}>
              <li>
                <strong>20x faster performance at scale:</strong> Weaviate
                outperformed OpenSearch by 20x in the benchmark, with a 40x
                reduction in usage cost.
              </li>
              <li>
                <strong>40% lower usage cost:</strong> Weaviate ran on a
                substantially smaller compute and memory footprint than the
                heavily tuned OpenSearch database.
              </li>
              <li>
                <strong>Fit for purpose:</strong> Weaviate scored better in
                operational maturity, deployment flexibility, cost
                predictability, and integration with the Booking.com ML
                ecosystem.
              </li>
            </ul>
            <h2>What's Next?</h2>
            <p>
              With Weaviate, Booking.com now has an AI data platform suited to
              the wide variety of AI systems across the enterprise. Because
              database access was abstracted behind its internal embedding
              service, migration from OpenSearch to Weaviate meant little more
              than a configuration change. As the team brings on new AI
              applications, it relies on Weaviate's continuous innovation and
              support.
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>Results</h2>
            <h3>A fit for every AI use case</h3>
            <p>
              As a system built specifically for vector search, Weaviate
              provides exceptional performance and ease of use for the AI
              applications supported by Booking.com's central Machine Learning
              and Data Science team.
            </p>
            <h3>20x faster, 40% lower cost</h3>
            <p>
              In benchmark tests based on actual production workloads, Weaviate
              outperformed OpenSearch by 20x at scale and with 40% lower
              operational costs.
            </p>
            <h3>Transparent onboarding</h3>
            <p>
              Because storage was abstracted behind the internal embedding
              service, most teams moved to Weaviate with little more than a
              configuration change and no client-side rewrites.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>

            <p>
              <Link to="https://www.booking.com/">Booking.com</Link> is one of
              the world's leading digital travel companies. Part of Booking
              Holdings Inc. (NASDAQ: BKNG), its mission is to make it easier for
              everyone to experience the world. Available in 43 languages,
              Booking.com connects millions of travelers to memorable
              experiences, transportation options, and places to stay.
            </p>
            <br></br>
            <p className={styles.quote}>
              “Our evaluation confirmed that systems built specifically for
              vector search behave better than general-purpose search engines
              with vector capabilities added on. Among the evaluated options,
              Weaviate showed the most consistent performance across our
              scenarios, so we selected it as the new backend for our shared
              embedding services platform.”
            </p>
            <br></br>
            <p>
              <strong>
                - Başak Tuğçe Eskili, Machine Learning Engineer, Booking.com
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
