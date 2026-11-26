import React, { useEffect } from "react";
import { getUtmsFromSearch, getSessionUtms } from "../../components/UTM/capture";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CONSOLE_ORIGIN = "https://console.weaviate.cloud";

// Console paths we allow deep-linking to via /go/console?path=/...
// Add any real console paths your CTAs need.
const ALLOWED_PATHS = ["/", "/signup"];

const REDIRECT_FALLBACK_MS = 800; // max wait for GA before redirecting

// ---------------------------------------------------------------------------
// Console URL
// ---------------------------------------------------------------------------
function buildConsoleUrl(utms) {
  const q = new URLSearchParams(window.location.search);
  const path = q.get("path");
  const safePath = ALLOWED_PATHS.includes(path) ? path : "/";
  const url = new URL(safePath, CONSOLE_ORIGIN);
  Object.entries(utms || {}).forEach(([k, v]) => {
    if (v != null && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function GoConsole() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // UTMs on the /go/console link itself win as a complete set; otherwise
    // fall back to what the visitor landed with this session. Never merge the
    // two, so params from different campaigns can't be mixed together.
    const fromLink = getUtmsFromSearch();
    const utms = Object.keys(fromLink).length ? fromLink : getSessionUtms();
    const target = buildConsoleUrl(utms);

    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      window.location.replace(target);
    };

    // Give GA4 a chance to send the page_view / console_click before leaving.
    if (typeof window.gtag === "function") {
      window.gtag("event", "console_redirect", {
        transport_type: "beacon",
        event_callback: go,
      });
    }

    // Fallback if gtag is blocked, missing or slow.
    const timer = setTimeout(go, REDIRECT_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <noscript>
      Redirecting to Weaviate Console…{" "}
      <a href="https://console.weaviate.cloud/">Continue</a>
    </noscript>
  );
}
