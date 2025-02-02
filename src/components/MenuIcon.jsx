import React from 'react';
import "../App.css";

export function MenuIcon({open}) {
  const closePath = "M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19";
  const openPath = "M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19";

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
      <path 
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d={open ? closePath : openPath}
        className='menu-path'
      ></path>
    </svg>
  )
}
export default MenuIcon;
