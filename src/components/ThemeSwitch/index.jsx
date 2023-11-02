import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function ThemeSwitch() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme');
    const currentTheme =
      preferredTheme || siteConfig.themeConfig.colorMode.defaultMode;
    document.documentElement.setAttribute('data-theme', 'light');

    const darkModeToggleButton = document.querySelector(
      '[class*="toggle_node_modules-@docusaurus-theme-classic-lib-theme-ColorModeToggle-styles-module"]'
    );

    if (darkModeToggleButton) {
      darkModeToggleButton.style.display = 'none';
    }
  }, [siteConfig.themeConfig.colorMode.defaultMode]);

  return null;
}

export default ThemeSwitch;
