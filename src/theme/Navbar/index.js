import React, { useEffect, useState } from 'react';
import OriginalNavbar from '@theme-original/Navbar';


console.log("Custom Navbar component is being rendered");

export default function Navbar(props) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Target the existing logo element by class
    const logoElement = document.querySelector('.navbar__logo');

    if (logoElement) {
      // Log to confirm logo is targeted
      console.log("Navbar logo element found");

      // Right-click event to trigger download
      const handleRightClick = (e) => {
        e.preventDefault(); // Prevent the default context menu
        console.log("Right-click download triggered from existing logo");
        
       
        const link = document.createElement('a');
        link.href = '/img/site/weaviate-logo-horizontal-light-1.svg';
        link.download = 'weaviate-logo.svg';
        link.click();
      };

     
      logoElement.addEventListener('contextmenu', handleRightClick);

      
      return () => {
        logoElement.removeEventListener('contextmenu', handleRightClick);
      };
    }
  }, []);

 
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <OriginalNavbar {...props} />
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            marginTop: '8px',
            padding: '4px 8px',
            background: 'black',
            color: 'white',
            borderRadius: '4px',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          Right-click to download the logo
        </div>
      )}
    </div>
  );
}
