import React, { useEffect } from 'react';

const CustomScriptLoader = () => {
  useEffect(() => {
    const loadScript = (src) => {
      document
        .querySelectorAll('img[referrerPolicy="no-referrer-when-downgrade"]')
        .forEach((el) => el.remove());

      const script = document.createElement('img');
      script.src = src;
      script.referrerPolicy = 'no-referrer-when-downgrade';
      script.style = 'display: none;';
      document.body.appendChild(script);
    };

    const scriptsMap = new Map([
      [
        '/developers/weaviate',
        'https://static.scarf.sh/a.png?x-pxid=2758e82f-6546-4356-a8bd-5b5c16368efb',
      ],
      [
        '/pricing',
        'https://static.scarf.sh/a.png?x-pxid=5c79460c-47af-4477-a1d9-3624dcce35d3',
      ],

      [
        'default',
        'https://static.scarf.sh/a.png?x-pxid=a41b0758-a3a9-4874-a880-8b5d5a363d40',
      ],
    ]);

    const currentPath = window.location.pathname;
    const scriptToLoad =
      scriptsMap.get(currentPath) || scriptsMap.get('default');
    loadScript(scriptToLoad);
  }, []);

  return null;
};

export default CustomScriptLoader;
