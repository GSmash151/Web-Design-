// Imports: 
import { Route, Routes } from "react-router";
import MovieList from "../components/ui/MovieList";
import TvShowList from "../components/ui/TvShowList";

const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element /> */}
        <Route path="/movies" element={<MovieList />} />
        <Route path="/tvshows" element={<TvShowList />} />
    </Routes>
  );
}

export default AllRoutes
