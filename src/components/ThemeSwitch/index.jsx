import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function ThemeSwitch() {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme');
    const currentTheme =
      preferredTheme || siteConfig.themeConfig.colorMode.defaultMode;
    document.documentElement.setAttribute('data-theme', 'light');
  }, [siteConfig.themeConfig.colorMode.defaultMode]);

  return null;
}

export default ThemeSwitch;
