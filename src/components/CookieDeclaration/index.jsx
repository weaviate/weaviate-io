import React, { useEffect } from 'react';

const CookieDeclaration = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'CookieDeclaration';
    script.src =
      'https://consent.cookiebot.com/4397b0f9-0b32-41f5-b24a-9370be245e85/cd.js';
    script.type = 'text/javascript';
    script.async = true;

    // Append the script to the correct div
    const targetDiv = document.getElementById('cookie-declaration-container');
    if (targetDiv) {
      targetDiv.appendChild(script);
    } else {
      document.body.appendChild(script); // Fallback if the div is missing
    }
  }, []);

  return <div id="cookie-declaration-container"></div>;
};

export default CookieDeclaration;
