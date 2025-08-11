// Imports: 
import axios from 'axios';

// This file contains the API client for The Movie Database (TMDB) API
// It sets up the base URL and includes the API key from environment variables
export default axios.create({
    baseURL:'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
})


