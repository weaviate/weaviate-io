import React, { useEffect } from "react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CONSOLE_ORIGIN = "https://console.weaviate.cloud";

// Console paths we allow deep-linking to via /go/console?path=/...
// Add any real console paths your CTAs need.
const ALLOWED_PATHS = ["/", "/signup"];

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "msclkid",
];

const STORAGE_KEY = "first_touch_utms";
const TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const REDIRECT_FALLBACK_MS = 800; // max wait for GA before redirecting

// ---------------------------------------------------------------------------
// UTM helpers
// ---------------------------------------------------------------------------
function getUtmsFromUrl() {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const out = {};
  UTM_KEYS.forEach((k) => {
    const v = q.get(k);
    if (v) out[k] = v;
  });
  return out;
}

function getStoredUtms() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);

    // Legacy format (old version stored the UTM object directly, no timestamp):
    // keep it, but stamp it now so it expires in 90 days.
    if (parsed && !("ts" in parsed) && !("utms" in parsed)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ utms: parsed, ts: Date.now() }),
      );
      return parsed;
    }

    const { utms, ts } = parsed || {};
    if (!ts || Date.now() - ts > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return {};
    }
    return utms || {};
  } catch {
    return {};
  }
}

function captureFirstTouchUtms() {
  if (Object.keys(getStoredUtms()).length) return;
  const now = getUtmsFromUrl();
  if (!Object.keys(now).length) return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ utms: now, ts: Date.now() }),
    );
  } catch {}
}

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

    captureFirstTouchUtms();

    const current = getUtmsFromUrl();
    const utms = Object.keys(current).length ? current : getStoredUtms();
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
