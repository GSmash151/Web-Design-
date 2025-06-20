import logo from "../../assets/images/logo.png";
import Genres from "./Genres";
import { Input } from "./input";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center gap-3 px-5 sm:px-5 md:px-10 py-3 shadow-md bg-white/80 backdrop-blur-sm rounded-xl sticky top-0 z-50">
      <img
        src={logo}
        alt="Logo"
        className="md:h-14 sm:h-9 hover:opacity-80 cursor-pointer transition-opacity"
      />

      <div className="flex gap-3 items-center">
        <form>
          <Input
            placeholder="Search..."
            className="border border-gray-300 rounded-2xl px-4 py-1 w-[30vw] max-w-xs"
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
