import React from "react";
import Link from "@docusaurus/Link";
import Hero from "../../ProductPageTemplate/Hero";
import CTA from "../../ProductPageTemplate/CTA";
import TrustedBy from "../../Enterprise/TrustedBy";
import EnterpriseUseCases from "../../Enterprise/UseCasesV2";
import ContactForm from "../../Contact/contactForm";
import styles from "./styles.module.scss";

const pages = {
  dedicated: {
    name: "Dedicated Cloud",
    description:
      "For businesses seeking high performance and consistent speed without the complexities of infrastructure and software management.",
    heading: "Run mission-critical AI workloads in production",
    cards: [
      {
        title: "Dedicated and isolated",
        icon: "dedicated-step1.svg",
        description:
          "Your data and operations run in a dedicated tenant, isolated from everyone else.",
        points: [
          "Data isolation keeps your data, and your customers' data, private and secure",
          "Consistent performance with no noisy neighbors",
          "Available on cloud marketplaces",
        ],
      },
      {
        title: "Performance and predictability",
        icon: "dedicated-step2.svg",
        description:
          "Resources that are available when you need them, scoped to your workload.",
        points: [
          "Each package is tailored to an optimal balance of resources for your use case",
          "Pre-scoped dimensions, storage, query, and latency parameters, so there's no guesswork",
          "Optimized to support your applications reliably at scale",
        ],
      },
      {
        title: "Security and compliance",
        icon: "dedicated-step3.svg",
        description: "Enterprise-grade protection, continuously monitored.",
        points: [
          "Enhanced security controls and 24/7 monitoring",
          "SOC 2 Type II certified",
          "HIPAA compliant",
          "Adherence to industry standards and best practices",
        ],
      },
      {
        title: "Expert support from day one",
        icon: "dedicated-step4.svg",
        description: "A team behind you, from onboarding to production.",
        points: [
          "Dedicated Success Manager to guide your team and optimize your project's success",
          "Professional support 24/7 by email and phone",
          "Onboarding and education: training courses and resources for teams at any skill level",
        ],
      },
    ],
  },
  shared: {
    name: "Shared Cloud",
    description:
      "Fully managed Weaviate on shared infrastructure. The fastest way to ship, with the full core database toolkit, replication, and high availability.",
    heading: "The easiest way to get started with Weaviate",
    cards: [
      {
        title: "Global and AI-ready",
        icon: "shared-step1.svg",
        description: "Close to your users, with AI services built in.",
        points: [
          "Available across five cloud regions",
          "Built-in access to cloud-native AI services, including the Embedding Service and Query Agent",
          "Available on cloud marketplaces",
        ],
      },
      {
        title: "No operational overhead",
        icon: "shared-step2.svg",
        description: "Get started in minutes; just bring your data.",
        points: [
          "Weaviate manages all infrastructure, configuration, and upgrades",
          "No servers to run, patch, or tune",
          "Focus on your applications, not the database",
        ],
      },
      {
        title: "Automatic scalability",
        icon: "shared-step3.svg",
        description: "Your database grows and shrinks with your workload.",
        points: [
          "Scales up or down automatically based on vector memory requirements",
          "No manual tuning or capacity planning required",
          "Pay for what you use as your data changes",
        ],
      },
      {
        title: "Simple management",
        icon: "shared-step4.svg",
        description: "Everything you need in one console.",
        points: [
          "Create and manage clusters with one click through the Weaviate Console",
          "Explore your data interactively",
          "Monitor usage in real time",
        ],
      },
    ],
  },
};

const steps = [
  {
    title: "Explore Console",
    description:
      "Go directly to the Weaviate Cloud console and create your first cluster.",
    label: "Go to Console",
    to: "/go/console",
    icon: "launch.svg",
  },
  {
    title: "Pricing",
    description: "Check out the available pricing plans for Weaviate Cloud.",
    label: "Go to Pricing",
    to: "/pricing",
    icon: "database-power.svg",
  },
  {
    title: "Documentation",
    description: "Find the right documentation and resources.",
    label: "View Docs",
    to: "https://docs.weaviate.io/weaviate",
    icon: "Developer-Resources-icon.svg",
  },
];

export default function CloudPage({ variant }) {
  const page = pages[variant];

  return (
    <main className={styles.page}>
      <Hero
        eyebrow="Fully-managed"
        title="Weaviate"
        subtitle={page.name}
        description={page.description}
        primaryCta={{ label: "Start building", to: "/go/console" }}
        secondaryCta={{ label: "Contact sales", to: "#contact-sales" }}
        media={
          <img
            src={`/img/site/2026/${variant}-cloud-header.svg`}
            alt={`Weaviate ${page.name} architecture`}
            className="tw-h-auto tw-w-full"
          />
        }
      />
      <TrustedBy />
      <section className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Overview</p>
          <h2>{page.heading}</h2>
          <div className={styles.features}>
            {page.cards.map((card) => (
              <article className={styles.card} key={card.title}>
                <div className={styles.cardHeading}>
                  <img src={`/img/site/2026/${card.icon}`} alt="" />
                  <h3>{card.title}</h3>
                </div>
                <p>{card.description}</p>
                <ul>
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <EnterpriseUseCases />
      <section className={styles.section}>
        <div className={styles.wrap}>
          <p className={styles.eyebrow}>Get started</p>
          <h2>Ready to get started?</h2>
          <div className={styles.steps}>
            {steps.map((step) => (
              <article className={styles.card} key={step.title}>
                <div className={styles.cardHeading}>
                  <img src={`/img/site/2026/${step.icon}`} alt="" />
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
                <Link className={styles.stepLink} to={step.to}>
                  {step.label} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactForm title={`Get Started with ${page.name}`} cloudSupport />
      <CTA
        heading={
          <>
            Start building on
            <br />
            Weaviate Cloud today
          </>
        }
        description="Spin up a cluster, point it at your data, and go. Weaviate can take care of embeddings, serving, and auto-scaling so you can ship features, not infrastructure."
        cta={{ label: "Start building", to: "/go/console" }}
      />
    </main>
  );
}
