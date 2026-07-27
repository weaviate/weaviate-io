import React from "react";

const logos = [
  "answear_logo.svg",
  "akamai-logo.svg",
  "alexi-logo.svg",
  "booking-logo.svg",
  "bosch-logo.svg",
  "build_logo_Kapa_AI.svg",
  "build_logo_point72.svg",
  "build-ltk-logo.svg",
  "build-trc-logo.svg",
  "bumble_logo.svg",
  "deel-logo.svg",
  "cisco.svg",
  "deacero-logo.svg",
  "factset.svg",
  "finster-logo.svg",
  "givingcompass-logo.svg",
  "globo-logo.png",
  "gloo-logo.svg",
  "HPE_logo.svg",
  "intuit-logo.svg",
  "inveniam-logo.svg",
  "Kantar-logo.svg",
  "loti-white.svg",
  "MBH-bank-logo.svg",
  "mednet-logo.svg",
  "MTG-logo.svg",
  "netapp.svg",
  "oliver-logo.svg",
  "Patronus-Logo.svg",
  "Perceptyx-logo.svg",
  "predori-logo.svg",
  "prm_logo.svg",
  "saga_legal.svg",
  "scribd.svg",
  "stack.svg",
  "thales-logo.svg",
  "yabble-logo.svg",
  "wearmedicine_logo.svg",
];

const loopedLogos = [...logos, ...logos];
const DESKTOP_MARQUEE_DURATION_SECONDS = 250;
const MOBILE_MARQUEE_DURATION_SECONDS = 350;

function LogoCard({ logo, mobile = false }) {
  return (
    <div
      className={`tw-flex tw-shrink-0 tw-items-center tw-justify-center tw-border tw-border-white/10 tw-bg-[#151515] tw-transition-colors tw-duration-300 hover:tw-border-white/20 hover:tw-bg-[#191919] ${
        mobile
          ? "tw-h-14 tw-w-[168px] tw-rounded-[12px] tw-px-4"
          : "tw-h-16 tw-w-[196px] tw-rounded-[14px] tw-px-5"
      }`}
    >
      <img
        src={`/img/site/HP-logos/${logo}`}
        alt={logo.replace(/[-_.]/g, " ").replace(/\bsvg\b|\bpng\b/gi, "")}
        className={`tw-w-auto tw-max-w-full tw-object-contain tw-opacity-90 ${
          mobile ? "tw-max-h-6" : "tw-max-h-7"
        }`}
        loading="lazy"
      />
    </div>
  );
}

export default function TrustedBy() {
  const [animationDelays, setAnimationDelays] = React.useState({
    desktop: "0s",
    mobile: "0s",
  });
  const [isDesktopPaused, setIsDesktopPaused] = React.useState(false);
  const [isMobilePaused, setIsMobilePaused] = React.useState(false);
  const desktopContainerRef = React.useRef(null);
  const mobileContainerRef = React.useRef(null);

  const handleWheelWhenPaused = React.useCallback(
    (event, containerRef, isPaused) => {
      if (!isPaused || !containerRef.current) return;

      // While paused, map vertical wheel movement to horizontal scrolling.
      event.preventDefault();
      containerRef.current.scrollLeft += event.deltaY + event.deltaX;
    },
    [],
  );

  React.useEffect(() => {
    setAnimationDelays({
      desktop: `-${(Math.random() * DESKTOP_MARQUEE_DURATION_SECONDS).toFixed(
        2,
      )}s`,
      mobile: `-${(Math.random() * MOBILE_MARQUEE_DURATION_SECONDS).toFixed(
        2,
      )}s`,
    });
  }, []);

  return (
    <section className="tw-bg-[#111111] tw-pb-10 tw-pt-2 md:tw-pb-12 md:tw-pt-2">
      <div className="tw-mx-auto tw-max-w-7xl tw-px-6">
        <p
          className="tw-text-center tw-text-xs tw-font-semibold tw-uppercase tw-tracking-[0.18em] tw-text-white/55"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Trusted By AI Teams
        </p>

        {/* mobile / tablet marquee */}
        <div className="tw-relative tw-mt-6 tw-overflow-hidden lg:tw-hidden">
          <div className="tw-pointer-events-none tw-absolute tw-bottom-0 tw-left-0 tw-top-0 tw-z-10 tw-w-10 tw-bg-[linear-gradient(90deg,#111111_0%,rgba(17,17,17,0)_100%)]" />
          <div className="tw-pointer-events-none tw-absolute tw-bottom-0 tw-right-0 tw-top-0 tw-z-10 tw-w-10 tw-bg-[linear-gradient(270deg,#111111_0%,rgba(17,17,17,0)_100%)]" />

          <div
            ref={mobileContainerRef}
            className={
              isMobilePaused
                ? "tw-overflow-x-auto tw-overflow-y-hidden"
                : "tw-overflow-hidden"
            }
            onMouseEnter={() => setIsMobilePaused(true)}
            onMouseLeave={() => setIsMobilePaused(false)}
            onTouchStart={() => setIsMobilePaused(true)}
            onTouchEnd={() => setIsMobilePaused(false)}
            onTouchCancel={() => setIsMobilePaused(false)}
            onWheel={(event) =>
              handleWheelWhenPaused(event, mobileContainerRef, isMobilePaused)
            }
          >
            <div
              className="trusted-logos-track-mobile tw-flex tw-w-max tw-gap-3"
              style={{
                "--trusted-logos-mobile-duration": `${MOBILE_MARQUEE_DURATION_SECONDS}s`,
                "--trusted-logos-mobile-delay": animationDelays.mobile,
                animationPlayState: isMobilePaused ? "paused" : "running",
              }}
            >
              {loopedLogos.map((logo, index) => (
                <LogoCard key={`mobile-${logo}-${index}`} logo={logo} mobile />
              ))}
            </div>
          </div>
        </div>

        {/* desktop marquee */}
        <div className="tw-relative tw-mt-6 tw-hidden tw-overflow-hidden lg:tw-block">
          <div className="tw-pointer-events-none tw-absolute tw-bottom-0 tw-left-0 tw-top-0 tw-z-10 tw-w-24 tw-bg-[linear-gradient(90deg,#111111_0%,rgba(17,17,17,0)_100%)]" />
          <div className="tw-pointer-events-none tw-absolute tw-bottom-0 tw-right-0 tw-top-0 tw-z-10 tw-w-24 tw-bg-[linear-gradient(270deg,#111111_0%,rgba(17,17,17,0)_100%)]" />

          <div
            ref={desktopContainerRef}
            className={
              isDesktopPaused
                ? "tw-overflow-x-auto tw-overflow-y-hidden"
                : "tw-overflow-hidden"
            }
            onMouseEnter={() => setIsDesktopPaused(true)}
            onMouseLeave={() => setIsDesktopPaused(false)}
            onWheel={(event) =>
              handleWheelWhenPaused(event, desktopContainerRef, isDesktopPaused)
            }
          >
            <div
              className="trusted-logos-track tw-flex tw-w-max tw-gap-4"
              style={{
                "--trusted-logos-duration": `${DESKTOP_MARQUEE_DURATION_SECONDS}s`,
                "--trusted-logos-delay": animationDelays.desktop,
                animationPlayState: isDesktopPaused ? "paused" : "running",
              }}
            >
              {loopedLogos.map((logo, index) => (
                <LogoCard key={`${logo}-${index}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
