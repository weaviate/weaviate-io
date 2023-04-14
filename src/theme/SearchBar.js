import React, { useEffect, useRef, useState } from 'react';
import './searchBar.scss';
import CommandMenu from '../components/CommandMenu';

export default function SearchBarWrapper(props) {
    const [open, setOpen] = useState(false);
    const [isApple, setIsApple] = useState(true);

  useEffect(() => {
    if (navigator.appVersion.indexOf("Apple") != -1) {
        setIsApple(true);
    }
  }, [])
  return (
    <>
      <CommandMenu open={open} setOpen={setOpen} />
      <div className='searchBox'>
        <button className='searchButton' onClick={() => setOpen(true)} >
          <span className='searchPlaceholder'>
            <i className="searchIcon fas fa-magnifying-glass" />
            <span className='searchPlaceholderText'>Search</span>
          </span>
          <div className='commandIconContainer'>
            <span className='commandIcon'>
                {isApple ? '⌘K' : 'Ctrl + K'}
            </span>
          </div>
        </button>
      </div>
    </>
  );
}
