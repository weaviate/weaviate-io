import React, { useEffect } from 'react';

const CookieDeclaration = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'CookieDeclaration';
    script.src =
      'https://consent.cookiebot.com/4397b0f9-0b32-41f5-b24a-9370be245e85/cd.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
};

export default CookieDeclaration;
