import React, { useEffect, useState } from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import { useColorMode } from '@docusaurus/theme-common';

export default function Navbar(props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { colorMode } = useColorMode(); 

  useEffect(() => {
    const logoElement = document.querySelector('.navbar__logo');

    if (logoElement) {
      
      const handleRightClick = (e) => {
        e.preventDefault();

        if (showTooltip) {
        
         

        
          const logoUrl = colorMode === 'dark'
            ? '/img/site/weaviate-logo-horizontal-light-1.svg'
            : '/img/site/weaviate-logo-horizontal-dark-1.svg';

         
          const link = document.createElement('a');
          link.href = logoUrl;
          link.download = 'weaviate-logo.svg';
          link.click();
          setShowTooltip(false); 
        } else {
       
         
          setShowTooltip(true);
        }
      };

  
      const handleClickOutside = (e) => {
        if (showTooltip && !logoElement.contains(e.target)) {
          
          setShowTooltip(false);
        }
      };

      
      logoElement.addEventListener('contextmenu', handleRightClick);
      document.addEventListener('mousedown', handleClickOutside);

     
      return () => {
        logoElement.removeEventListener('contextmenu', handleRightClick);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showTooltip, colorMode]);

  return (
    <div style={{ position: 'relative' }}>
      <OriginalNavbar {...props} />
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            marginTop: '-10px',
            padding: '4px 8px',
            background: '#130c49',
            fontFamily: 'Inter, sans-serif',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          Right-click to download our logo
        </div>
      )}
    </div>
  );
}
