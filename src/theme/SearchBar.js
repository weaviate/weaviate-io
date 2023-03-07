import React, { useEffect, useRef, useState } from 'react';
import './searchBar.scss';
import CommandMenu from '../components/CommandMenu';

export default function SearchBarWrapper(props) {
  const [open, setOpen] = useState(false);

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
              ⌘K
            </span>
          </div>
        </button>
      </div>
    </>
  );
}
