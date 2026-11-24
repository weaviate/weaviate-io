import Link from "@docusaurus/Link";
import React from "react";

export const useCaseCards = [
  {
    id: "loti",
    company: "Loti",
    companyLogo: "/img/site/2026/loti-white-hp.svg",
    tag: "RAG",
    quote:
      "I need peace of mind. When we are scaling our systems, I don't want to worry about scalability and uptime of our vector database as it serves as a core foundation supporting all our services.",
    person: "Dr. Hirak Chhatbar",
    role: "Co-Founder and CTO",
    avatar: "/img/site/2026/loti-person-icon.png",
    ctaLabel: "Read Case Study",
    ctaTo: "/case-studies/loti",
    stats: [
      { value: "200+", label: "Hours saved on database maintenance" },
      { value: "9B", label: "Vectors in production" },
    ],
    accent: "linear-gradient(180deg, #7C7BFF 0%, #A855F7 100%)",
    tagColor: "#8B5CF6",
  },
  {
    id: "metabuddy",
    company: "MetaBuddy",
    companyLogo: "/img/site/2026/metabuddy-logo-enterprise.svg",
    tag: "AGENTIC AI",
    quote:
      "Weaviate’s Query Agent allowed us to unify our users’ wellness data into a single intelligent interface. Our users love the natural language interactions, and our trainers now have a powerful tool to personalize coaching at scale.",
    person: "Waseem Sarwar",
    role: "Product Lead",
    avatar: "/img/site/MetaBuddy-Product-Lead.png",
    ctaLabel: "Read Case Study",
    ctaTo: "/case-studies/metabuddy",
    stats: [
      { value: "60%", label: "Reduced Analysis Time" },
      { value: "3×", label: "Boosted User Engagement" },
    ],
    accent: "linear-gradient(123deg, #26D6FF 12.44%, #D77AFF 109.26%)",
    tagColor: "#7487EC",
  },
  {
    id: "docsbot",
    company: "DocsBot",
    companyLogo: "/img/site/2026/docbots-logo-hp.svg",
    tag: "SEARCH",
    quote:
      "Weaviate stood out as it’s clearly built for production use, not just testing. It was the only solution with an efficient tenant system that scaled to our workload of tens of thousands of segmented indexes.",
    person: "Aaron Edwards",
    role: "Founder",
    avatar: "/img/site/2026/docbots-founder-hp.jpg",
    ctaLabel: "Read Case Study",
    ctaTo: "/case-studies/docsbot",
    stats: [
      { value: "50K+", label: "Tenants stored in a single cluster" },
      { value: "6.1M+", label: "Customer questions answered" },
    ],
    accent: "linear-gradient(180deg, #61D384 0%, #43E2C5 100%)",
    tagColor: "#61D384",
  },
  {
    id: "finster",
    company: "FINSTER AI",
    companyLogo: "/img/site/2026/finster-logo-hp.svg",
    tag: "ENTERPRISE",
    quote:
      "Many large banks focus on quick AI wins but there’s a big opportunity to reinvent research workflows from start to finish in an AI-native way.",
    person: "Seán Kilgarriff",
    role: "Product Lead & Founding Team",
    avatar: "/img/site/2026/finster-person-icon.png",
    ctaLabel: "Read Case Study",
    ctaTo: "/case-studies/finster",
    stats: [
      { value: "42M", label: "Vectors in production" },
      { value: "1DAY", label: "Enterprise deployment" },
    ],
    accent: "linear-gradient(180deg, #FF4D8D 0%, #A855F7 100%)",
    tagColor: "#D77AFF",
  },
  {
    id: "marvelx",
    company: "MarvelX",
    companyLogo: "/img/site/2026/marvelx-logo-hp.svg",
    tag: "SECURITY",
    quote:
      "Before MarvelX, I implemented Weaviate in banking where security was really important. Being able to have trust in something battle-tested is very important.",
    person: "Ali el Hassouni",
    role: "Founder",
    avatar: "/img/site/2026/marvelx-founder-hp.png",
    ctaLabel: "Read Case Study",
    ctaTo: "/case-studies/marvelx",
    stats: [
      { value: "10×", label: "Improved processing output" },
      { value: "99.9%", label: "Faster turnaround" },
    ],
    accent: "linear-gradient(180deg, #43E2C5 0%, #26D6FF 100%)",
    tagColor: "#26D6FF",
  },
  {
    id: "instabase",
    company: "Instabase",
    companyLogo: "/img/site/2026/instabase-logo-hp.svg",
    tag: "RAG",
    quote:
      "Accuracy — how good the answer is — is the first thing we want to optimize for. That’s how we found Weaviate.",
    person: "Kerry Chang",
    role: "Head of Product Engineering",
    avatar: "/img/site/2026/instabase-person-hp.png",
    ctaLabel: "Read Case Study",
    ctaTo: "/case-studies/instabase",
    stats: [
      { value: "450+", label: "Data types supported" },
      { value: "50K+", label: "Tenants stored" },
    ],
    accent: "linear-gradient(180deg, #7C7BFF 0%, #A855F7 100%)",
    tagColor: "#8B5CF6",
  },
];

export function UseCaseCard({ card, compact = false, trust = false }) {
  return (
    <article
      className={
        trust
          ? "tw-h-full tw-min-h-[300px] tw-rounded-[1.25rem] tw-bg-[#1A1A1A] tw-p-6"
          : "tw-h-full tw-min-h-[420px] tw-rounded-[28px] tw-border tw-border-white/20 tw-bg-[#151515] tw-p-6 md:tw-p-7 lg:tw-min-h-[362px] lg:tw-p-8"
      }
      style={trust ? { border: "0.5px solid #6E6B91" } : undefined}
    >
      <div
        className={`tw-grid tw-h-full ${trust ? "tw-gap-5 md:tw-grid-cols-[minmax(0,1fr)_150px]" : `tw-gap-8 ${compact ? "lg:tw-grid-cols-[minmax(0,1fr)_140px] lg:tw-gap-5" : "lg:tw-grid-cols-[minmax(0,1fr)_220px]"}`}`}
      >
        <div className="tw-flex tw-h-full tw-flex-col">
          <div className="tw-flex tw-min-h-[42px] tw-flex-wrap tw-items-center tw-justify-between tw-gap-4">
            <img
              src={card.companyLogo}
              alt={card.company}
              className="tw-h-8 tw-w-auto tw-max-w-[170px] tw-object-contain md:tw-h-9 md:tw-max-w-[180px]"
            />

            <div
              className={`tw-inline-flex tw-items-center tw-justify-center tw-rounded-full tw-px-4 tw-font-medium tw-uppercase tw-tracking-[0.04em] tw-text-[#DDEBF2] ${trust ? "tw-min-h-[30px] tw-text-[12px]" : "tw-min-h-[34px] tw-border tw-text-[12px] md:tw-min-h-[38px] md:tw-px-5 md:tw-text-[14px]"}`}
              style={{
                fontFamily: "Inter, sans-serif",
                ...(trust
                  ? {
                      border: `0.5px solid ${card.tagColor}`,
                      background: card.id === "loti" ? "#111111" : "#1A1A1A",
                    }
                  : { borderColor: `${card.tagColor}80` }),
              }}
            >
              {card.tag}
            </div>
          </div>

          <div className={trust ? "tw-mt-5" : "tw-mt-6 md:tw-mt-8"}>
            <p
              className={`tw-m-0 tw-text-[#DDEBF2] ${trust ? "tw-text-[15px] tw-leading-[1.45]" : "tw-text-[17px] tw-leading-[1.55] md:tw-text-[18px]"}`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              “{card.quote}”
            </p>
          </div>

          <div className={`tw-mt-auto ${trust ? "tw-pt-5" : "tw-pt-8"}`}>
            <div
              className={`tw-flex tw-flex-col ${trust ? "tw-gap-3 md:tw-flex-row md:tw-flex-wrap md:tw-items-end md:tw-justify-between" : `tw-gap-6 md:tw-gap-7 ${compact ? "xl:tw-flex-row xl:tw-flex-wrap xl:tw-items-end xl:tw-justify-between" : "lg:tw-flex-row lg:tw-items-end lg:tw-justify-between"}`}`}
            >
              <div
                className={`tw-flex tw-items-center ${trust ? "tw-gap-3" : "tw-gap-4"}`}
              >
                <img
                  src={card.avatar}
                  alt={card.person}
                  className={`tw-rounded-full tw-object-cover ${trust ? "tw-h-9 tw-w-9" : "tw-h-12 tw-w-12"}`}
                />
                <div>
                  <p
                    className="tw-m-0 tw-text-[15px] tw-font-semibold tw-leading-6 tw-text-[#DDEBF2]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {card.person},
                  </p>
                  <p
                    className="tw-m-0 tw-text-[15px] tw-leading-6 tw-text-[#A8B6CE]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {card.role}
                  </p>
                </div>
              </div>

              <Link
                to={card.ctaTo}
                className="tw-text-[16px] tw-font-medium tw-text-white tw-underline tw-underline-offset-4 hover:tw-opacity-80"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {card.ctaLabel}
              </Link>
            </div>
          </div>
        </div>

        <div
          className={
            trust
              ? "tw-hidden md:tw-flex md:tw-h-full md:tw-flex-col  md:tw-pl-5"
              : `tw-hidden lg:tw-flex lg:tw-h-full lg:tw-flex-col lg:tw-border-l lg:tw-border-white/15 ${compact ? "lg:tw-pl-5" : "lg:tw-pl-8"}`
          }
        >
          <div className="tw-flex tw-h-full tw-flex-col tw-justify-between tw-gap-8">
            {card.stats.map((stat) => (
              <div
                key={stat.label}
                className={`tw-flex tw-flex-col tw-justify-start ${trust ? "" : "tw-min-h-[118px]"}`}
              >
                <p
                  className={`tw-m-0 tw-font-semibold tw-leading-[0.92] ${trust ? "tw-whitespace-nowrap" : ""} ${compact || trust ? "tw-text-[40px]" : "tw-text-[56px]"}`}
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    background: card.accent,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </p>

                <p
                  className={`tw-m-0 tw-mt-2 tw-max-w-[180px] tw-leading-[1.2] tw-text-[#DDEBF2] ${trust ? "tw-text-[14px]" : "tw-text-[16px]"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function UseCasesV2() {
  const cards = useCaseCards.map((card) =>
    card.id === "loti"
      ? {
          ...card,
          tag: "SEARCH",
          tagColor: "#61D384",
          accent: "linear-gradient(223deg, #43E2C5 -4.42%, #70EE62 100%)",
        }
      : card,
  );
  const scrollingCards = [...cards, ...cards];

  return (
    <section className="tw-overflow-hidden tw-bg-[#111111] tw-py-12 md:tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px] tw-px-6">
        <div className="tw-max-w-4xl">
          <p
            className="tw-m-0 tw-mb-4 tw-text-[0.9rem] tw-font-semibold tw-uppercase tw-tracking-[0.12em] md:tw-mb-6 md:tw-text-[1rem]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: "#43E2C5",
            }}
          >
            Trust
          </p>

          <h2
            className="tw-m-0 tw-text-[2.5rem] tw-font-semibold tw-leading-[1.08]"
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              color: "#DDEBF2",
            }}
          >
            Enterprise teams building with Weaviate
          </h2>

          <p
            className="tw-m-0 tw-mt-5 tw-max-w-4xl tw-text-[16px] tw-leading-8 tw-text-[#B9C8DE] md:tw-mt-6 md:tw-text-[18px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            With over 20M open source downloads and thousands of customers,
            Weaviate is a core piece of the stack for leading startups,
            scale-ups, and enterprises.
          </p>
        </div>
      </div>

      <div className="tw-marquee-wrapper tw-mt-10 md:tw-mt-12">
        <div className="tw-marquee-track">
          {scrollingCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="tw-marquee-item tw-w-[calc(100vw-48px)] tw-max-w-[666px] tw-shrink-0 md:tw-w-[666px]"
            >
              <UseCaseCard card={card} trust />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
