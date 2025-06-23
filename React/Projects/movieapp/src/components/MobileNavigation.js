// src/components/MobileNavigation.js
import React from 'react';
import { mobileNavigation } from '../contents/navigation'; // This is the key line
import { NavLink } from 'react-router-dom';

const MobileNavigation = () => {
  // It's a good practice to add a defensive check
  // in case mobileNavigation somehow ends up undefined or not an array.
  if (!mobileNavigation || !Array.isArray(mobileNavigation)) {
    console.error("mobileNavigation is not an array or is undefined.");
    return null; // Or render a fallback UI
  }

  return (
    <section className='lg:hidden h-14 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full'>
      <div className='flex justify-around h-full items-center text-neutral-400'>
        {mobileNavigation.map((nav) => (
          <NavLink
            key={nav.label}
            to={nav.href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive && 'text-neutral-100'
              }`
            }
          >
            <div className='text-2xl'>
              {nav.icon}
            </div>
            <p className='text-sm'>{nav.label}</p>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default MobileNavigation;