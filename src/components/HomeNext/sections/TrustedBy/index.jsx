import React from 'react';

const logos = [
  'deel-logo.svg',
  'cisco.svg',
  'factset.svg',
  'build-ltk-logo.svg',
  'stack.svg',
  'booking-logo.svg',
  'Perceptyx-logo.svg',
  'toric-logo.svg',
];

export default function TrustedBy() {
  return (
    <section className="tw-bg-[#111111] tw-pb-10 tw-pt-6 md:tw-pb-12 md:tw-pt-8">
      <div className="tw-mx-auto tw-max-w-7xl tw-px-6">
        <p className="tw-text-center tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.18em] tw-text-white/55">
          Trusted By AI Teams
        </p>

        <div className="tw-mt-6 tw-grid tw-grid-cols-2 tw-gap-3 sm:tw-grid-cols-4 lg:tw-grid-cols-8">
          {logos.map((logo) => (
            <div
              key={logo}
              className="tw-flex tw-h-14 tw-items-center tw-justify-center tw-rounded-md tw-border tw-border-white/12 tw-bg-[#161616] tw-px-3"
            >
              <img
                src={`/img/site/HP-logos/${logo}`}
                alt={logo.replace(/[-_.]/g, ' ')}
                className="tw-max-h-6 tw-w-auto tw-max-w-full tw-object-contain tw-opacity-90"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
