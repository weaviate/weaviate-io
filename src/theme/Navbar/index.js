import React, { useEffect, useState } from 'react';
import OriginalNavbar from '@theme-original/Navbar';



export default function Navbar(props) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
   
    const logoElement = document.querySelector('.navbar__logo');

    if (logoElement) {
     

     
      const handleRightClick = (e) => {
        e.preventDefault(); 

        if (showTooltip) {
          // If tooltip is already showing, trigger the download
          console.log("Tooltip is visible, triggering download");
          const link = document.createElement('a');
          link.href = '/img/site/weaviate-logo-horizontal-light-1.svg';
          link.download = 'weaviate-logo.svg';
          link.click();
          setShowTooltip(false); 
        } else {
         
          console.log("Right-click detected, showing tooltip");
          setShowTooltip(true);
        }
      };

      
      const handleLeftClick = () => {
        if (showTooltip) {
          console.log("Left-click detected, hiding tooltip");
          setShowTooltip(false);
        }
      };

     
      logoElement.addEventListener('contextmenu', handleRightClick);
      logoElement.addEventListener('click', handleLeftClick);

      
      return () => {
        logoElement.removeEventListener('contextmenu', handleRightClick);
        logoElement.removeEventListener('click', handleLeftClick);
      };
    }
  }, [showTooltip]);

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
