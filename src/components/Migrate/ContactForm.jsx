import React, { useEffect } from "react";

export default function MigrationContactForm() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/embed/8738733.js";
    script.defer = true;
    script.setAttribute("data-cookieconsent", "ignore");
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <section id="contact-sales" className="tw-bg-[#111111] tw-py-16">
      <div className="container">
        <div className="tw-rounded-2xl tw-border tw-border-white/10 tw-bg-[#1a1a1a] tw-p-6 md:tw-p-8">
          <h2 className="!tw-mb-4">Talk to our team about your migration.</h2>
          <p className="!tw-mb-8 tw-text-[#B9C8DE]">
            Planning a larger migration? Talk to our team about your workloads, requirements, and timeline.
          </p>
          <div
            className="hs-form-frame tw-w-full"
            data-region="na1"
            data-form-id="d39cf595-b9ac-491d-9525-733a68c45a32"
            data-portal-id="8738733"
          />
        </div>
      </div>
    </section>
  );
}
