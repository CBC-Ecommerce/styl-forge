import React from 'react';

export default function Ribbon() {
  return (
    <div className="ribbon">
      <span className="nav-logo">Styl Forge</span>
      <div className="nav-container">
        <input className="nav-search" type="text" placeholder="" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="nav-searchIcon">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
    </div>
  );
}
