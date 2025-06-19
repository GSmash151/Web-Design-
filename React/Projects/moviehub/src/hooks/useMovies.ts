// src/hooks/useMovies.ts
// Description: Custom hook to fetch a list of movies from an API.// Import:
import { useEffect, useState } from "react";
import apiClients from "../services/api-clients"


// Define the type for the movie result
// This should match the structure of the data returned by the API
export interface MovieResult {
    adult : boolean;
    id : number;
    original_language : string;
    original_title : string;
    title : string;
    backdrop_path : string;
    poster_path : string;
    overview : string;
    name?: string;
}

// Custom hook to fetch movie list
// This hook will return the movie list and a function to fetch it
const useMovieList = () => {
    // State to hold the movie list
    const [movieList, setMovieList] = useState<MovieResult[]>();

    // Function to fetch movie list
    const fetchMovieList = async () => {
        try { 
            const res = await apiClients.get('discover/movie');
            setMovieList(res.data.results);
            console.log(res.data.results);
        } catch (error) {

        }
    }; 

    useEffect(() => {
        fetchMovieList();
    }, []); 

    return {movieList};
    
}

export default useMovieList;