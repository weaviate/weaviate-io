
(function() {
    var currentPath = '';
  
    function loadScript(src) {
      const script = document.createElement('img');
      script.src = src;
      script.referrerPolicy = 'no-referrer-when-downgrade';
      script.style = 'display: none;';
      document.body.appendChild(script);
    }
  
    function checkPath() {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
  
   
        document.querySelectorAll('body > img[referrerPolicy="no-referrer-when-downgrade"]').forEach(el => el.remove());
  
        if (currentPath.startsWith('/developers')) {
          loadScript('https://static.scarf.sh/a.png?x-pxid=2758e82f-6546-4356-a8bd-5b5c16368efb');
        } else if (currentPath.startsWith('/pricing')) {
          loadScript('https://static.scarf.sh/a.png?x-pxid=5c79460c-47af-4477-a1d9-3624dcce35d3');
        } else {
          loadScript('https://static.scarf.sh/a.png?x-pxid=a41b0758-a3a9-4874-a880-8b5d5a363d40');
        }
      }
    }
  
    
    setInterval(checkPath, 500);
  })();
  