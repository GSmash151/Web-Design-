//Imports:
import { useContext } from "react";
import useMovieList from "../../hooks/useMovies"
import MoviesCard from "./MoviesCard";
import { GenresContext } from "../../context/genres.context";

// Component: MovieList
// Description: Displays a list of movies fetched from the API.
const MovieList = () => {
    const {genres} = useContext(GenresContext)
    const { movieList } = useMovieList(genres);  
    console.log(movieList);
  return (
    <div className="p-3 mb-4">
      <h1 className="text-4xl font-semibold p-5 py-6">Movies</h1>
      {/* Grid layout for movie cards */}
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-y-2">      
           {movieList?.map((movieList) => (
            <div key={movieList.id}>
                <MoviesCard movieResult={movieList} />
            </div>
        ))}
      </div>
    </div>
  );
}
// Export the MovieList component
export default MovieList
