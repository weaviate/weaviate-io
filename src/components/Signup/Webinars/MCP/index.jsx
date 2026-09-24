import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const HUBSPOT = {
  portalId: "8738733",
  formId: "4f916e0b-6762-4270-af8e-af3b4ce6938f",
  region: "na1",
  shareUrl: "https://share.hsforms.com/1T5FuC2diQnCvjq87TOaTjw57aul",
};

export default function WebinarRegistration() {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let formCreated = false;
    const timer = setTimeout(() => {
      if (!formCreated) setFallback(true);
    }, 2500);

    const scriptSelector =
      'script[src="https://js.hsforms.net/forms/embed/v2.js"]';
    const existing = document.querySelector(scriptSelector);

    const createForm = () => {
      if (!window.hbspt?.forms?.create) {
        setFallback(true);
        return;
      }

      try {
        window.hbspt.forms.create({
          portalId: HUBSPOT.portalId,
          formId: HUBSPOT.formId,
          region: HUBSPOT.region,
          target: "#webinar-registration-form",
        });
        formCreated = true;
        clearTimeout(timer);
      } catch (error) {
        setFallback(true);
      }
    };

    const onLoad = () => {
      const script = document.querySelector(scriptSelector);
      script?.setAttribute("data-loaded", "true");
      createForm();
    };

    const onError = () => setFallback(true);

    if (existing) {
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });

      if (
        existing.getAttribute("data-loaded") === "true" &&
        window.hbspt?.forms?.create
      ) {
        createForm();
      }
    } else {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/embed/v2.js";
      script.async = true;
      script.setAttribute("data-cookieconsent", "ignore");
      script.addEventListener("load", onLoad);
      script.addEventListener("error", onError);
      document.body.appendChild(script);
    }

    return () => {
      clearTimeout(timer);
      existing?.removeEventListener("load", onLoad);
      existing?.removeEventListener("error", onError);
    };
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <a className={styles.logo} href="/" aria-label="Weaviate home" />

        <div className={styles.grid}>
          <section className={styles.introduction}>
            <div
              className={styles.visual}
              role="img"
              aria-label="Inside Weaviate's MCP Ecosystem webinar"
            >
              <span className={styles.liveLabel}>Live webinar</span>
            </div>

            <div className={styles.eventMeta}>
              <span>WEBINAR</span>
              <span>OCTOBER 14 · ONLINE · 16:00 - 17:00 BST</span>
            </div>
            <h1>Inside Weaviate's MCP Ecosystem</h1>
            <p>
              Explore why MCP matters and see two MCP servers in the Weaviate
              ecosystem in action: Weaviate Database and Weaviate Query Agent
              MCP.
            </p>
          </section>

          <section
            className={styles.registration}
            aria-labelledby="register-title"
          >
            <p className={styles.eyebrow}>Save your seat</p>
            <h2 id="register-title">Register for the webinar</h2>
            <p className={styles.formIntro}>
              Complete the form to receive the joining link, reminders, and
              webinar materials.
            </p>

            <div className={styles.formWrapper}>
              {!fallback ? (
                <div
                  id="webinar-registration-form"
                  className={styles.webinarForm}
                  aria-live="polite"
                />
              ) : (
                <iframe
                  title="Register for Inside Weaviate's MCP Ecosystem"
                  className={styles.hsIframe}
                  src={HUBSPOT.shareUrl}
                  loading="lazy"
                  sandbox="allow-forms allow-scripts allow-same-origin"
                />
              )}
            </div>

            {fallback && (
              <p className={styles.fallbackNote}>
                Having trouble loading the form?{" "}
                <a
                  href={HUBSPOT.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the registration form.
                </a>
              </p>
            )}
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
            src="/img/site/2026/MCP-Ecosystem-speakers-webinar-socials.jpg"
            alt="Webinar speakers Connor Shorten, Ivan Despot, and Alexander Ledbetter"
            loading="lazy"
          />
        </section>
      </div>
    </main>
  );
}
