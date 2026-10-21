import React from "react";
import styles from "./styles.module.scss";

const VIDEO_ID = "VZjicnVSfVs";

export default function WebinarOnDemand() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a className={styles.logo} href="/" aria-label="Weaviate home" />

        <div className={styles.grid}>
          <section className={styles.introduction}>
            <div className={styles.eventMeta}>
              <span>WEBINAR RECORDING</span>
              <span>ON DEMAND · RECORDED OCTOBER 14</span>
            </div>
            <h1>Inside Weaviate's MCP Ecosystem</h1>
            <p>
              Explore why MCP matters and see two MCP servers in the Weaviate
              ecosystem in action: Weaviate Database and Weaviate Query Agent
              MCP.
            </p>
          </section>

          <section className={styles.video} aria-label="Webinar recording">
            <div className={styles.videoFrame}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
                title="Inside Weaviate's MCP Ecosystem"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>
            <p className={styles.videoNote}>
              Want more? Browse all{" "}
              <a href="/community/events#past-webinars">on-demand webinars</a>.
            </p>
          </section>
        </div>

        <section className={styles.about} aria-labelledby="about-event">
          <p className={styles.eyebrow}>What you'll learn</p>
          <h2 id="about-event">About the event</h2>
          <div className={styles.aboutContent}>
            <p>
              AI assistants are only as useful as the context they can access.
              MCP (Model Context Protocol) is an open standard that connects AI
              assistants to external data sources and tools.
            </p>
            <p>
              In this webinar, we’ll explore why MCP matters and demonstrate two
              MCP servers in the Weaviate ecosystem: Weaviate Database and
              Weaviate Query Agent MCP. Through live demos, you’ll see how an AI
              assistant can inspect your schema, run hybrid search across your
              collections, and answer plain-English questions about your own
              data.
            </p>
            <p>
              We’ll also be joined by Delegance Brokerage, who built their own
              MCP server on top of Weaviate. They’ll share what they built, why
              they chose MCP, and what they learned bringing it into production.
            </p>
          </div>
        </section>

        <section className={styles.speakers} aria-labelledby="webinar-speakers">
          <p className={styles.eyebrow}>Meet the speakers</p>
          <h2 id="webinar-speakers">Learn from the people building with MCP</h2>
          <img
            src="/img/site/2026/MCP-Ecosystem-speakers-webinar-socials.png"
            alt="Webinar speakers Connor Shorten, Ivan Despot, and Alexander Ledbetter"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  );
}
