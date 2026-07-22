import React from "react";

const socialLinks = [
  [
    "GitHub",
    "https://github.com/weaviate/weaviate",
    "/img/site/2026/github-logo.svg",
  ],
  ["Community", "/community", null],
  ["X", "https://x.com/weaviate_io", "/img/site/2026/x-logo.svg"],
  [
    "YouTube",
    "https://youtube.com/@Weaviate",
    "/img/site/2026/youtube-logo.svg",
  ],
  [
    "LinkedIn",
    "https://www.linkedin.com/company/weaviate-io",
    "/img/site/2026/linkedin-logo.svg",
  ],
];

const BEEHIIV_EMBED_URL =
  "https://embeds.beehiiv.com/15b21ebd-decd-433b-ada8-2d405e345f2e?slim=true";

export default function NewsletterPanel() {
  return (
    <section
      className="tw-mb-[26px] tw-grid tw-border-[0.5px] tw-border-[#6E6B91] tw-bg-[#1A1A1A] md:tw-grid-cols-[minmax(0,2fr)_minmax(250px,1fr)]"
      aria-labelledby="blog-newsletter-title"
    >
      <div className="tw-px-[34px] tw-py-[30px]">
        <h2
          className="tw-mb-2 tw-bg-[linear-gradient(48deg,#00FE6B_13.81%,#00B7E2_92.18%)] tw-bg-clip-text tw-font-['Plus_Jakarta_Sans'] tw-text-[2rem] tw-font-semibold tw-leading-[1.4] tw-text-transparent"
          id="blog-newsletter-title"
        >
          Don&apos;t want to miss another blog post?
        </h2>
        <p className="tw-mb-4 tw-text-[0.85rem] tw-text-[#b9c8de]">
          Sign up for our bi-weekly newsletter to stay updated!
        </p>
        <div className="tw-h-[53px] tw-max-w-[380px] tw-overflow-hidden tw-rounded-lg tw-border-[0.5px] tw-border-[#6E6B91] tw-bg-[#080a0e]">
          <iframe
            className="tw-h-[53px] tw-w-full"
            src={BEEHIIV_EMBED_URL}
            title="Newsletter signup"
            data-test-id="beehiiv-embed"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </div>
      <div className="tw-border-t-[0.5px] tw-border-[#6E6B91] tw-px-[34px] tw-py-[30px] md:tw-border-l-[0.5px] md:tw-border-t-0">
        <h3 className="tw-mb-5 tw-text-base tw-text-[#b9c8de]">Follow us</h3>
        <div className="tw-flex tw-flex-wrap tw-gap-3">
          {socialLinks.map(([label, href, image]) => (
            <a
              key={label}
              href={href}
              className="tw-inline-flex tw-h-[38px] tw-w-[38px] tw-items-center tw-justify-center tw-rounded-lg tw-border-[0.5px] tw-border-[#6E6B91] tw-bg-[#0b0e15] tw-text-[#d0d8ea] hover:tw-border-[#63e689]"
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
            >
              {image ? (
                <img
                  className="tw-h-4 tw-w-4 tw-object-contain"
                  src={image}
                  alt=""
                  aria-hidden="true"
                />
              ) : (
                <span aria-hidden="true">◎</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
