import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Function to manage Kapi Widget
    function manageKapiWidget() {
      const currentPath = location.pathname;

      // Allow widget on /developers but exclude /developers/weaviate/api/
      const isDocsOrBlogs =
        (currentPath.startsWith('/developers') && !currentPath.startsWith('/developers/weaviate/api/rest')) ||
        currentPath.startsWith('/blog');

      const existingScript = document.querySelector('script[src="https://widget.kapa.ai/kapa-widget.bundle.js"]');

      if (isDocsOrBlogs && !existingScript) {
        // Add the script if the path is valid
        const script = document.createElement('script');
        script.src = "https://widget.kapa.ai/kapa-widget.bundle.js";
        script.setAttribute("data-website-id", "109019ee-418e-4434-b485-85a09533c865");
        script.setAttribute("data-project-name", "Weaviate");
        script.setAttribute("data-project-color", "#130c49");
        script.setAttribute("data-project-logo", "/img/site/weaviate-logo-w.png");
        script.setAttribute("data-button-image-width", "35");
        script.setAttribute("data-button-image-height", "20");
        script.setAttribute("data-modal-image-width", "35");
        script.setAttribute("data-modal-image-height", "20");
        script.setAttribute("data-search-mode-enabled", "true");
        script.setAttribute("data-button-border", "1px solid white");
        script.setAttribute("data-button-border-radius", "8px");
        script.setAttribute("data-modal-title-color", "#130c49!important");
        script.setAttribute("data-modal-open-by-default", "false");
        script.setAttribute(
          "data-modal-disclaimer",
          "This is a custom LLM for Weaviate with access to all developer docs, WCS Cloud docs, academy lessons, contributor guides, GitHub issues, and forum questions."
        );
        script.setAttribute(
          "data-modal-example-questions",
          "How do I run Weaviate?,What model providers work with Weaviate?,How do I perform a hybrid search?,How do I create objects with vectors?"
        );
        script.setAttribute("data-modal-footer", "Powered by weaviate and kapa.ai");
        script.async = true;
        document.body.appendChild(script);
      } else if (!isDocsOrBlogs && existingScript) {
        // Remove the script if not on a valid path
        existingScript.remove();

        // Remove the widget container if it exists
        const widgetContainer = document.querySelector('.kapa-widget-container');
        if (widgetContainer) {
          widgetContainer.remove();
        }
      }
    }

    // Run the widget logic whenever the route changes
    manageKapiWidget();
  }, [location]); // Dependency on location to trigger effect on route change

  return <>{children}</>;
}
