// Imports: 
import type { MovieResult } from "../../hooks/useMovies";
import { Card, CardContent } from "./card";

// Component: MoviesCard
// Description: Displays a single movie card with its poster image.
interface Props {
    movieResult : MovieResult
}
// Usage: <MoviesCard movieResult={movie} />
// This component takes a movieResult prop of type MovieResult and displays the movie poster.
const MoviesCard: React.FC<Props> = ({ movieResult }) => {
  return (
    <Card className="border-0">
        <CardContent>
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${movieResult.poster_path}`}
                alt="poster"
                className="hover:opacity-80 transition-all"
                />
                <h1 className="mt-3 text-lg font-semibold ">
                  {movieResult.title ? movieResult.title : movieResult.name}
                </h1>
            </div>
        </CardContent>
    </Card>
  )
}

export default MoviesCard
