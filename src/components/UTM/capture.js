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

(function saveLastTouchUtmsSitewide() {
  if (typeof window === 'undefined') return;
  try {
    const utms = getUtmsFromUrl();
    
    if (Object.keys(utms).length) {
      window.localStorage.setItem('first_touch_utms', JSON.stringify(utms));
    }
  } catch {
  
  }
})();
