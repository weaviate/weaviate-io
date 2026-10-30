import React, { useEffect } from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

export default function EnterpriseEditionPage() {
  // The embed script scans for .hs-form-frame on load, so it must be
  // (re)inserted after the container is mounted.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/8738733.js";
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout
      title="30-day Weaviate Enterprise Edition trial"
      description="Try Weaviate Enterprise Edition for 30 days on your own infrastructure. Request a trial license key for your self-hosted deployment."
    >
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Head>

      <main>
        <section className="tw-bg-[#111111] tw-px-6 tw-py-14 md:tw-py-20">
          <div className="tw-mx-auto tw-max-w-[1320px]">
            <div className="tw-grid tw-items-start tw-gap-12 lg:tw-grid-cols-[1.05fr_0.95fr] lg:tw-gap-16">
              <div>
                <p className="tw-m-0 tw-mb-5 tw-font-['Inter'] tw-text-base tw-font-semibold tw-uppercase tw-text-[#43E2C5]">
                  Weaviate Enterprise Edition
                </p>
                <h1 className="tw-m-0 tw-max-w-3xl tw-font-['Plus_Jakarta_Sans'] tw-text-4xl tw-font-semibold tw-leading-tight tw-text-[#DDEBF2] md:tw-text-5xl">
                  Try Weaviate Enterprise Edition for 30 days
                </h1>
                <p className="tw-mb-0 tw-mt-7 tw-max-w-2xl tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE] md:tw-text-xl">
                  Run your trial on your own infrastructure. Enterprise Edition adds features for
                  teams running Weaviate on their own infrastructure at scale,
                  and is included with Weaviate Assurance, our enterprise
                  subscription for self-hosted teams.
                </p>
                <p className="tw-mb-0 tw-mt-5 tw-max-w-2xl tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]">
                  It focuses on security, scaling and stability for larger
                  deployments. The current feature list is in the documentation,
                  and it grows with each release.
                </p>
                <p className="tw-mb-0 tw-mt-7 tw-font-['Inter'] tw-text-lg">
                  <Link to="#trial-form" className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4">
                    Request your 30-day self-hosted trial
                  </Link>
                </p>
              </div>

              <div
                className="tw-rounded-2xl tw-p-[2px] lg:tw-ml-4"
                style={{
                  background:
                    "linear-gradient(48deg, #68FFA8 -4.58%, #00B7E2 86.47%)",
                }}
              >
                <div className="tw-rounded-[14px] tw-bg-[#111111] tw-p-6 md:tw-p-8">
                  <h2
                    id="trial-form"
                    className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-2xl tw-font-semibold tw-text-[#111111]"
                    style={{ color: "#DDEBF2" }}
                  >
                    Request your 30-day trial key
                  </h2>
                  <div
                    className="hs-form-frame"
                    data-region="na1"
                    data-form-id="0edcff12-285d-4534-bbc9-58e807d97855"
                    data-portal-id="8738733"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="tw-bg-[#111111] tw-px-6 tw-py-14 md:tw-py-20">
          <div className="tw-mx-auto tw-grid tw-max-w-[1320px] tw-gap-12 lg:tw-grid-cols-2 lg:tw-gap-20">
            <div>
              <h2
                className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-3xl tw-font-semibold tw-text-[#111111]"
                style={{ color: "#DDEBF2" }}
              >
                How it works
              </h2>
              <ul
                className="tw-mb-0 tw-mt-6 tw-space-y-5 tw-pl-6 tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#374151]"
                style={{ color: "#B9C8DE" }}
              >
                <li>
                  One image, one binary. Community Edition and Enterprise
                  Edition ship in the same Docker image.
                </li>
                <li>
                  A license key selects the edition when Weaviate starts. No key
                  means Community Edition.
                </li>
                <li>
                  Upgrading needs no new download. Get a key, restart Weaviate
                  with it, then enable the features you want to evaluate.
                </li>
                <li>
                  Already on Weaviate Cloud? You don't need a license key.
                  License keys apply to self-hosted deployments only.
                </li>
              </ul>
            </div>

            <div className="tw-border-t tw-border-[#4B5563] tw-pt-8 lg:tw-border-l lg:tw-border-t-0 lg:tw-pl-12 lg:tw-pt-0">
              <h2
                className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-3xl tw-font-semibold tw-text-[#111111]"
                style={{ color: "#DDEBF2" }}
              >
                Learn more
              </h2>
              <p
                className="tw-mb-0 tw-mt-5 tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#374151]"
                style={{ color: "#B9C8DE" }}
              >
                For activation details, environment variables and the full
                feature list, see the{" "}
                <Link
                  to="https://docs.weaviate.io/deploy/enterprise"
                  className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4"
                >
                  Enterprise Edition features and activation guide
                </Link>
                .
              </p>
              <p className="tw-mb-0 tw-mt-5 tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]">
                Explore <Link to="/product/assurance" className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4">Weaviate Assurance for self-hosted teams</Link>,
                compare <Link to="/pricing" className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4">Weaviate pricing options</Link>,
                or follow the <Link to="https://docs.weaviate.io/deploy" className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4">self-hosted deployment guides</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="tw-bg-[#111111] tw-px-6 tw-py-14 md:tw-py-20" aria-labelledby="trial-features">
          <div className="tw-mx-auto tw-max-w-[1320px]">
            <h2 id="trial-features" className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-3xl tw-font-semibold" style={{ color: "#DDEBF2" }}>
              Evaluate Enterprise Edition on your infrastructure
            </h2>
            <p className="tw-mt-5 tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]">
              Explore features for larger self-hosted deployments, available from Weaviate v1.40. Each feature has its own configuration setting.
            </p>
            <ul className="tw-mt-6 tw-grid tw-list-none tw-gap-6 tw-p-0 md:tw-grid-cols-3">
              {["Shard Self-Recovery", "Namespaces", "Deduplicated backups"].map((feature) => (
                <li key={feature} className="tw-rounded-2xl tw-border tw-border-solid tw-border-[#4B5563] tw-p-6">
                  <h3 className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-xl tw-font-semibold" style={{ color: "#DDEBF2" }}>{feature}</h3>
                </li>
              ))}
            </ul>
            <Link to="https://docs.weaviate.io/deploy/enterprise#enterprise-edition-features" className="tw-font-['Inter'] tw-text-lg tw-text-[#43E2C5] tw-underline tw-underline-offset-4">
              Compare Enterprise Edition features and configuration requirements
            </Link>
          </div>
        </section>

        <section className="tw-bg-[#111111] tw-px-6 tw-py-14 md:tw-py-20" aria-labelledby="trial-faq">
          <div className="tw-mx-auto tw-max-w-[1320px]">
            <h2 id="trial-faq" className="tw-m-0 tw-mb-8 tw-font-['Plus_Jakarta_Sans'] tw-text-3xl tw-font-semibold" style={{ color: "#DDEBF2" }}>Enterprise Edition trial FAQ</h2>
            {[
              ["Who is the trial for?", "Teams evaluating Enterprise Edition on their own infrastructure. Enterprise Edition is included with Weaviate Assurance, our enterprise subscription for self-hosted teams."],
              ["Is this a Weaviate Cloud trial?", "No. This trial license is for self-hosted deployments. Weaviate Cloud customers do not need an Enterprise Edition license key."],
              ["Do I need a different image or binary?", "No. Community Edition and Enterprise Edition ship in the same Docker image and binary. Without a license key, Weaviate runs as Community Edition."],
              ["How long is the trial?", "Your trial license key is valid for 30 days."],
              ["What happens when the trial expires?", <>To discuss continuing with a full license and confirm how expiry affects your deployment, <Link to="/contact" className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4">contact the Weaviate team</Link> before your trial ends.</>],
              ["Can I upgrade an existing self-hosted deployment?", <>Yes. On a supported version (v1.40 or later), provide a valid license key and restart Weaviate, then configure the Enterprise features you want to use. Switching editions does not require a separate image or binary. Follow the <Link to="https://docs.weaviate.io/deploy/enterprise#activate-the-enterprise-edition" className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4">Enterprise Edition activation instructions</Link>.</>],
            ].map(([question, answer]) => (
              <details key={question} className="tw-border-b tw-border-[#4B5563] tw-py-5 tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]">
                <summary className="tw-cursor-pointer tw-font-semibold tw-text-[#DDEBF2]">{question}</summary>
                <p className="tw-mb-0 tw-mt-4">{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
