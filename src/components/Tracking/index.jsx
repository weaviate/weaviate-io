import { useEffect } from 'react';

const HubSpotTracking = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hs-scripts.com/8738733.js';
    script.async = true;
    script.defer = true;
    script.id = 'hs-script-loader';

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default HubSpotTracking;
