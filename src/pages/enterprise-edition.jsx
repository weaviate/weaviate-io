import React from "react";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

export default function EnterpriseEditionPage() {
  return (
    <Layout
      title="Enterprise Edition license request"
      description="Request a commercial license key for Weaviate Enterprise Edition."
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
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
                  Request an Enterprise Edition license
                </h1>
                <p className="tw-mb-0 tw-mt-7 tw-max-w-2xl tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE] md:tw-text-xl">
                  Weaviate is open source. Enterprise Edition adds features for
                  teams running Weaviate on their own infrastructure at scale,
                  and is included with Weaviate Assurance, our enterprise
                  subscription for self-hosted teams.
                </p>
                <p className="tw-mb-0 tw-mt-5 tw-max-w-2xl tw-font-['Inter'] tw-text-lg tw-leading-relaxed tw-text-[#B9C8DE]">
                  It focuses on security, scaling and stability for larger
                  deployments. The current feature list is in the documentation,
                  and it grows with each release.
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
                    className="tw-m-0 tw-font-['Plus_Jakarta_Sans'] tw-text-2xl tw-font-semibold tw-text-[#111111]"
                    style={{ color: "#DDEBF2" }}
                  >
                    Request a license key
                  </h2>
                  <p
                    className="tw-mb-5 tw-mt-2 tw-font-['Inter'] tw-text-base tw-leading-relaxed tw-text-[#4B5563]"
                    style={{ color: "#B9C8DE" }}
                  >
                    Sign in to Weaviate Cloud to get your Enterprise Edition
                    license key.
                  </p>
                  <Link
                    to="https://console.weaviate.cloud/enterprise-edition-trial"
                    className="tw-inline-block tw-rounded-lg tw-bg-[#43E2C5] tw-px-6 tw-py-3 tw-font-['Inter'] tw-text-base tw-font-semibold tw-text-[#111111] hover:tw-no-underline"
                    style={{ color: "#111111" }}
                  >
                    Sign in to Weaviate Cloud
                  </Link>
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
                  with it, and the Enterprise features activate.
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
                  to="http://docs.weaviate.io/deploy/enterprise#frequently-asked-questions"
                  className="tw-text-[#43E2C5] tw-underline tw-underline-offset-4"
                >
                  Enterprise Edition documentation
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
