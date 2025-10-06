import React, { useEffect } from 'react';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'msclkid',
];

function getUtmsFromUrl() {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  const out = {};
  UTM_KEYS.forEach((k) => {
    const v = q.get(k);
    if (v) out[k] = v;
  });
  return out;
}

function getUtmsFromStorage() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('first_touch_utms');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveFirstTouchUtmsIfMissing() {
  const existing = getUtmsFromStorage();
  if (Object.keys(existing).length) return;
  const now = getUtmsFromUrl();
  if (!Object.keys(now).length) return;
  try {
    localStorage.setItem('first_touch_utms', JSON.stringify(now));
  } catch {}
}

function buildConsoleUrl(utms) {
  const url = new URL('https://console.weaviate.cloud/');
  Object.entries(utms || {}).forEach(([k, v]) => {
    if (v != null && v !== '') url.searchParams.set(k, v);
  });
  return url.toString();
}

export default function GoConsole() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    saveFirstTouchUtmsIfMissing();

    const current = getUtmsFromUrl();
    const utms = Object.keys(current).length ? current : getUtmsFromStorage();

    const target = buildConsoleUrl(utms);
    window.location.replace(target);
  }, []);

  return (
    <noscript>
      Redirecting to Weaviate Console…{' '}
      <a href="https://console.weaviate.cloud/">Continue</a>
    </noscript>
  );
}
