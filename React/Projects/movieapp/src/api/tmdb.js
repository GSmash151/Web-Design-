// src/api/tmdb.js
import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Access your TMDb Read Access Token from environment variables.
// Ensure you have a .env file in your project root with:
// REACT_APP_TMDB_ACCESS_TOKEN='YOUR_ACTUAL_TMDB_V4_READ_ACCESS_TOKEN_HERE'
const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

// Create an Axios instance with default headers for TMDb authentication.
const tmdbAxiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`, // Correctly uses the token
    'Content-Type': 'application/json',
  },
});

export default tmdbAxiosInstance;
