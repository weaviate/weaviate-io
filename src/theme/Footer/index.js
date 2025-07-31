import React, { useEffect } from 'react';
import OriginalFooter from '@theme-original/Footer';

export default function FooterWrapper(props) {
  useEffect(() => {
    const cookieBtn = document.getElementById('cookie-settings');
    if (cookieBtn) {
      cookieBtn.addEventListener('click', () => {
        if (window.Cookiebot) {
          window.Cookiebot.renew();
        } else {
          console.warn('Cookiebot is not loaded.');
        }
      });
    }
  }, []);

  return <OriginalFooter {...props} />;
}
