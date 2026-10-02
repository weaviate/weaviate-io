import React from "react";
import styles from "./styles.module.scss";

export default function Study() {
  return (
    <main className={styles.study}>
      <div className={styles.container}>
        <article className={styles.story}>
          <section>
            <h2>Summary</h2>
            <p>
              Weaviate operates isolated, dedicated clusters for its customers.
              Each environment needs enough storage headroom for changing
              workloads, but unused capacity can accumulate and EBS volumes
              cannot natively shrink. Datafy now automatically rightsizes
              storage across this infrastructure, reducing wasted EBS spend by
              50% while leaving Weaviate's storage architecture intact.
            </p>
          </section>

          <section>
            <h2>The challenge: excess capacity that could not shrink</h2>
            <p>
              Storage requirements vary across customer environments and change
              over time. Teams provision headroom to avoid running out of space,
              but AWS does not support shrinking EBS volumes natively. Capacity
              added for growth can therefore remain allocated long after it is
              needed. Before Datafy, average storage utilization across the
              relevant Weaviate infrastructure was approximately 35%.
            </p>
            <p>
              Manually reviewing and adjusting storage across dedicated clusters
              did not scale. And because those clusters run live customer AI
              services, any solution had to protect production reliability while
              avoiding additional operational burden.
            </p>
          </section>

          <section>
            <h2>The solution: automated, bi-directional rightsizing</h2>
            <p>
              Weaviate introduced Datafy gradually. Datafy Sensor first gave the
              team visibility into storage utilization and improvement
              opportunities. After infrastructure integration, QA, and a proof
              of concept, Weaviate deployed Datafy EBS Auto-Scaler to
              automatically grow and shrink volumes based on storage
              requirements.
            </p>
            <p>
              The deployment required no CSI driver replacement, filesystem
              modification, or additional storage layer. In the first three
              months, the team also tested enhanced EBS performance capabilities
              and gained a unified view of volumes across approximately 100 AWS
              accounts.
            </p>
            <blockquote>
              <p>
                “Plug-and-play is what got the contract over the finish line.
                Every other vendor we looked at wanted us to change how we do
                storage. We can't afford a support relationship that puts our
                customers' production environments at risk, and Datafy hasn't.”
              </p>
              <cite>Brave Okafor, Senior Platform Engineer, Weaviate</cite>
            </blockquote>
          </section>

          <section>
            <h2>Operational impact</h2>
            <p>
              Storage capacity can now track actual workload requirements
              through automatic grow and shrink operations. This reduces
              unnecessary EBS capacity and the manual work involved in managing
              it, while preserving the existing storage setup for customer
              environments.
            </p>
          </section>
        </article>

        <aside className={styles.aside}>
          <section className={styles.results}>
            <h2>Results</h2>
            <dl>
              <div>
                <dt>50%</dt>
                <dd>reduction in wasted EBS spend</dd>
              </div>
              <div>
                <dt>140</dt>
                <dd>EBS volumes managed by Datafy</dd>
              </div>
              <div>
                <dt>~100</dt>
                <dd>AWS accounts visible in one console</dd>
              </div>
            </dl>
          </section>
          <section className={styles.context}>
            <div className={styles.logo} role="img" aria-label="Datafy logo" />
            <h2>Datafy EBS Auto-Scaler</h2>
            <p>
              Datafy Sensor provides visibility into storage utilization, while
              Datafy EBS Auto-Scaler automatically grows and shrinks volumes to
              match storage requirements.
            </p>
            <blockquote>
              “The decision was driven by the seamless integration. Without
              requiring CSI driver replacements, filesystem modifications, or
              additional management effort, the solution provided more than just
              functional improvements. For Weaviate, this translates into a
              strategic edge: reducing the cost of our AI services allows for
              more aggressive pricing, helping us capture a larger market
              share.”
            </blockquote>
            <p>
              <strong>
                Spiros Andreou, VP Platform Operations and Security, Weaviate
              </strong>
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
