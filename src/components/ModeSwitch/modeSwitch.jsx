import React, { useEffect } from 'react';

const ModeSwitch = () => {
  useEffect(() => {
    const currentPageURL = window.location.pathname;
    const isBlogPage = currentPageURL.startsWith('/blog');

    if (isBlogPage) {
      const darkModeToggleButton = document.querySelector(
        '[class*="toggle_node_modules-@docusaurus-theme-classic-lib-theme-ColorModeToggle-styles-module"]'
      );

      if (darkModeToggleButton) {
        darkModeToggleButton.style.display = 'none';
      }
    }
  }, []);

  return null;
};

export default ModeSwitch;
