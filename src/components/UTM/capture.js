// Sitewide UTM capture (registered as a Docusaurus clientModule).
//
// Stores the UTMs a visitor landed with for the current browser session only,
// so /go/console can pass them through to Console signup. Session scope means
// a plain "Try now" click on a later visit does not reuse stale campaign data.

export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'msclkid',
];

const SESSION_KEY = 'session_utms';
// Older versions kept last-touch UTMs here for 90 days; clear them out.
const LEGACY_KEY = 'first_touch_utms';

const INVALID_VALUES = new Set(['undefined', 'null', 'none', '']);

function cleanValue(v) {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim();
  return INVALID_VALUES.has(trimmed.toLowerCase()) ? null : trimmed;
}

export function getUtmsFromSearch(search) {
  const out = {};
  if (typeof window === 'undefined') return out;
  const q = new URLSearchParams(search ?? window.location.search);
  UTM_KEYS.forEach((k) => {
    const v = cleanValue(q.get(k));
    if (v) out[k] = v;
  });
  return out;
}

export function getSessionUtms() {
  if (typeof window === 'undefined') return {};
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || '{}');
    const out = {};
    UTM_KEYS.forEach((k) => {
      const v = cleanValue(parsed?.[k]);
      if (v) out[k] = v;
    });
    return out;
  } catch {
    return {};
  }
}

function captureUtms(search) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LEGACY_KEY);
  } catch {}

  const utms = getUtmsFromSearch(search);
  if (!Object.keys(utms).length) return;
  // /go/console?utm_content=navbar style CTA params describe the click, not
  // how the visitor arrived, so don't let them replace the landing UTMs.
  if (window.location.pathname.replace(/\/$/, '') === '/go/console') return;
  try {
    // Replace as a set: never mix params from two different campaigns.
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(utms));
  } catch {}
}

// Initial page load.
captureUtms();

// Client-side navigations inside the SPA.
export function onRouteDidUpdate({ location, previousLocation }) {
  if (previousLocation && location.search !== previousLocation.search) {
    captureUtms(location.search);
  }
}
