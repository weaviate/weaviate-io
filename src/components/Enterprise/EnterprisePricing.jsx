import React from "react";
import Link from "@docusaurus/Link";
import styles from "./EnterprisePricing.module.scss";

const plans = [
  {
    title: "Dedicated Cloud",
    icon: "/img/site/2026/dedicated-cloud-enterprise.svg",
    description:
      "A professionally managed AI database on single-tenant infrastructure. Consistent performance with no noisy neighbors, backed by SOC 2 and HIPAA compliance.",
    features: [
      "Isolated, dedicated instance for security and consistency",
      "Up to 99.95% uptime on AWS, GCP & Azure",
      "Dedicated technical account team and 24/7 monitoring",
      "Part of the Premium plan",
    ],
  },
  {
    title: "Shared Cloud",
    icon: "/img/site/2026/shared-cloud-enterprise.svg",
    description:
      "Fully managed Weaviate on shared infrastructure. The fastest way to ship, with the full core database toolkit, replication, and high availability.",
    features: [
      "Zero infrastructure to operate",
      "Scales with your production workloads",
      "Prepaid contract with predictable spend",
      "Available on AWS and Google Cloud",
      "Part of the Premium plan",
    ],
  },
  {
    title: "Enterprise Edition",
    icon: "/img/site/2026/enterprise-edition-enterprise.svg",
    description:
      "Run Weaviate on your own infrastructure with additional security, resilience, operational features, and enterprise support.",
    features: [
      "Self-hosted deployments with a license key",
      "Shard self-recovery",
      "Deduplicated backups",
      "Lifecycle management and operational features",
      "Enterprise support options",
    ],
  },
  {
    title: "Platform Edition",
    icon: "/img/site/2026/platform-edition-enterprise.svg",
    description:
      "Built for platform teams running Weaviate as a shared service, with central control of security and isolated virtual clusters for each team.",
    features: [
      "Platform-specific security and observability",
      "Central management of clusters",
      "Namespaces: isolated virtual clusters, one per team or end user",
      "Expert solution architecture and engineering guidance",
    ],
  },
];

function PlanHeader({ title, icon }) {
  return (
    <div className="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-5 md:tw-gap-4 md:tw-px-5">
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="tw-h-12 tw-w-12 tw-shrink-0"
      />
      <span className="tw-font-['Plus_Jakarta_Sans'] tw-text-[1rem] tw-font-semibold tw-leading-[130%] tw-text-[#DDEBF2] md:tw-text-[1.05rem]">
        {title}
      </span>
    </div>
  );
}

export default function EnterprisePricing() {
  return (
    <section className="tw-bg-[#111111] tw-px-6 tw-py-12 md:tw-py-20 lg:tw-py-24">
      <div className="tw-mx-auto tw-max-w-[1320px]">
        <div className="tw-max-w-4xl">
          <p className="tw-m-0 tw-mb-4 tw-font-['Plus_Jakarta_Sans'] tw-text-[0.9rem] tw-font-semibold tw-uppercase tw-tracking-[0.12em] tw-text-[#43E2C5] md:tw-mb-6 md:tw-text-[1rem]">
            Deployment &amp; Enterprise Plans
          </p>

          <h2 className="tw-mt-0 tw-font-['Plus_Jakarta_Sans'] tw-text-[2rem] tw-font-semibold tw-leading-[1.08] tw-text-[#DDEBF2] md:tw-mt-4 md:tw-text-[2.5rem]">
            Run Weaviate the way your organization requires
          </h2>

          <p className="tw-mt-4 tw-max-w-4xl tw-font-['Inter'] tw-text-[16px] tw-leading-8 tw-text-[#B9C8DE] md:tw-mt-5 md:tw-text-[18px]">
            Managed by us in shared or dedicated environments, or self-hosted in
            your own infrastructure with enterprise backing.
            <br />
            Prepaid annual contracts for teams scaling AI in production who need
            predictable pricing and enhanced reliability.
          </p>
        </div>

        <div className="tw-mt-10 tw-overflow-x-auto md:tw-mt-12">
          <table
            aria-label="Deployment and enterprise plans"
            className={`${styles.table} tw-w-full tw-min-w-[960px] tw-table-fixed tw-border-collapse`}
          >
            <caption className="tw-sr-only">
              Compare fully managed and self-managed Weaviate deployment plans
            </caption>
            <colgroup>
              {plans.map((plan) => (
                <col key={plan.title} className="tw-w-1/4" />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th
                  colSpan={2}
                  scope="colgroup"
                  className={`${styles.groupHeader} tw-text-center`}
                >
                  <span className="tw-inline-block tw-bg-[linear-gradient(223deg,#43E2C5_-4.42%,#70EE62_100%)] tw-bg-clip-text tw-font-['Plus_Jakarta_Sans'] tw-text-[1.25rem] tw-font-medium tw-uppercase tw-leading-[120%] tw-text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                    Fully-managed
                  </span>
                  <span className="tw-mt-3 tw-block tw-font-['Inter'] tw-text-[0.75rem] tw-font-normal tw-text-[#B9C8DE]">
                    Run mission-critical AI workloads in production
                  </span>
                </th>
                <th
                  colSpan={2}
                  scope="colgroup"
                  className={`${styles.groupHeader} tw-text-center`}
                >
                  <span className="tw-inline-block tw-bg-[linear-gradient(123deg,#26D6FF_12.44%,#D77AFF_109.26%)] tw-bg-clip-text tw-font-['Plus_Jakarta_Sans'] tw-text-[1.25rem] tw-font-medium tw-uppercase tw-leading-[120%] tw-text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                    Self-managed
                  </span>
                  <span className="tw-mt-3 tw-block tw-font-['Inter'] tw-text-[0.75rem] tw-font-normal tw-text-[#B9C8DE]">
                    Run Weaviate on your own infrastructure
                  </span>
                </th>
              </tr>
              <tr>
                {plans.map((plan) => (
                  <th
                    key={plan.title}
                    scope="col"
                    className={`${styles.planHeader} tw-text-left`}
                  >
                    <PlanHeader title={plan.title} icon={plan.icon} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {plans.map((plan) => (
                  <td
                    key={plan.title}
                    className="tw-border tw-border-[#6E6B91] tw-p-4 tw-align-top md:tw-p-5"
                  >
                    <p className="tw-m-0 tw-font-['Inter'] tw-text-[0.78rem] tw-leading-[155%] tw-text-[#B9C8DE] md:tw-text-[0.8rem]">
                      {plan.description}
                    </p>
                  </td>
                ))}
              </tr>
              <tr>
                {plans.map((plan) => (
                  <td
                    key={plan.title}
                    className="tw-border tw-border-[#6E6B91] tw-p-4 tw-align-top md:tw-p-5"
                  >
                    <ul className="tw-m-0 tw-list-none tw-space-y-4 tw-p-0">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="tw-flex tw-items-start tw-gap-2 tw-font-['Inter'] tw-text-[0.77rem] tw-leading-[150%] tw-text-[#B9C8DE] md:tw-text-[0.8rem]"
                        >
                          <span
                            aria-hidden="true"
                            className="tw-shrink-0 tw-font-semibold tw-text-[#43E2C5]"
                          >
                            ✓
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="tw-mt-6 tw-flex tw-justify-center">
          <Link
            to="/contact"
            className="tw-inline-flex tw-min-h-[36px] tw-items-center tw-justify-center tw-rounded-md tw-bg-[#111111] tw-px-6 tw-font-['Inter'] tw-text-[0.85rem] tw-font-medium tw-text-[#DDEBF2] tw-no-underline hover:tw-text-[#DDEBF2] hover:tw-no-underline"
            style={{ border: "0.5px solid #43E2C5" }}
          >
            Contact sales
          </Link>
        </div>
      </div>
    </section>
  );
}
