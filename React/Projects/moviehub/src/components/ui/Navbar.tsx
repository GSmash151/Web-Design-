import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Genres from "./Genres";
import { Input } from "./input";
import logo from "../../assets/images/logo.png"; // Assuming logo path is correct

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Handles the change event for the search input
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handles the form submission for the search
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (searchQuery.trim()) {
      // Navigate to the search results page with the query as a URL parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // Clear the search input after submission
    }
  };

  return (
    <div className="flex justify-between items-center gap-3 px-5 sm:px-5 md:px-10 py-3 shadow-md bg-white/80 backdrop-blur-sm rounded-xl sticky top-0 z-50">
      <Link to="/"> {/* Added Link to home for logo */}
        <img
          src={logo}
          alt="Logo"
          className="md:h-14 sm:h-9 hover:opacity-80 cursor-pointer transition-opacity"
        />
      </Link>

      <div className="flex gap-3 items-center">
        <form onSubmit={handleSearchSubmit}>
          <Input
            placeholder="Search..."
            className="border border-gray-300 rounded-2xl px-4 py-1 w-[30vw] max-w-xs"
            value={searchQuery} // Bind input value to state
            onChange={handleSearchInputChange} // Handle input changes
          />
        </form>

        <div className="hidden md:flex gap-6 items-center text-gray-700 text-base font-medium">
          <div className="hover:text-blue-500 cursor-pointer transition-colors">
            <Genres />
          </div>
          <Link to="/movies" className="hover:text-blue-500 transition-colors">
            Movies
          </Link>
          <Link to="/tvshows" className="hover:text-blue-500 transition-colors">
            TV Shows
          </Link>
        </div>
      </div>
    </div>
  );
};
