// src/components/MobileNavigation.js
import React from 'react';
import { mobileNavigation } from '../contents/navigation';
import { NavLink } from 'react-router-dom';

const MobileNavigation = () => {
  // Defensive check and fallback UI
  if (!Array.isArray(mobileNavigation) || mobileNavigation.length === 0) {
    console.error("mobileNavigation is not a valid array or is empty.");
    return (
      <section className="lg:hidden h-14 bg-neutral-800 fixed bottom-0 w-full flex items-center justify-center text-white text-sm">
        Navigation unavailable
      </section>
    );
  }

  return (
    <section className="lg:hidden h-14 bg-neutral-600 bg-opacity-40 fixed bottom-0 w-full z-40 backdrop-blur">
      <nav className="flex justify-around h-full items-center text-neutral-400">
        {mobileNavigation.map((nav) => (
          <NavLink
            key={nav.label}
            to={nav.href}
            title={nav.label}
            aria-label={nav.label}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-200 ${
                isActive ? 'text-neutral-100' : ''
              }`
            }
          >
            <div className="text-2xl">{nav.icon}</div>
            <p className="text-xs">{nav.label}</p>
          </NavLink>
        ))}
      </nav>
    </section>
  );
};

export default MobileNavigation;
