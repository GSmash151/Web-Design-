import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { navigation } from "../contents/navigation";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // Debounced search navigation
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput) {
        navigate(`/search?q=${searchInput}`);
      }
    }, 500); // Debounce time of 500ms

    return () => {
      clearTimeout(handler); // Clear timeout if searchInput changes before the timeout
    };
  }, [navigate, searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-50 shadow-md z-40"> {/* Added z-50 for layering */}
      <div className="container mx-auto px-4 flex items-center h-full">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-6 text-white"> {/* Added text-white for visibility */}
          {navigation.map((nav) => ( // Removed 'index' as it's not used, and directly returning JSX
            <NavLink
              key={nav.label} // Use nav.label or a unique ID from your data
              to={nav.href}
              className={({ isActive }) =>
                `px-2 hover:text-neutral-100 ${
                  isActive ? "text-neutral-100" : "" // Simpler ternary operator
                }`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-5">
          <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search...."
              className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block text-white placeholder-neutral-300" // Added text-white and placeholder color
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button type="submit" className="text-2xl text-white"> {/* Added type="submit" */}
              <IoSearchSharp />
            </button>
          </form>
          <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all sm:block">
            <img src={userIcon} alt="userIcon" className="w-full h-full object-cover" /> {/* Made image cover the div */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;