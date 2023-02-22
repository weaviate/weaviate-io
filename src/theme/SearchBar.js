import React, { useEffect, useRef, useState } from 'react';
import SearchBar from '@theme-original/SearchBar';
import './searchBar.scss';
import SearchIcon from '../../static/img/site/search.svg'
import CommandMenu from '../components/CommandMenu';

export default function SearchBarWrapper(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CommandMenu open={open} setOpen={setOpen} />
      <div className='searchBox'>
        <button className='searchButton' onClick={() => setOpen(true)} >
          <span className='searchPlaceholder'>
            <SearchIcon width={20} style={{fill: '#e5e5e5', marginRight: 3}} />
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
