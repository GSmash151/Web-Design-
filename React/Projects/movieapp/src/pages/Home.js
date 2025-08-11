import React from "react";
import BannerHome from "../components/BannerHome";
import HorizontalScroll from "../components/HorizontalScroll";
import { useSelector } from "react-redux"; // Keeping this if BannerHome still uses Redux for its data
import useFetch from "../hooks/useFetch"; // Ensure this path is correct

const Home = () => {
  // Option 1: If your BannerHome or other parts of the app still depend on trendingData from Redux,
  // keep this. Otherwise, if useFetch completely replaces this, you might remove it.
  // For now, let's assume BannerHome uses it.
  const trendingDataFromRedux = useSelector((state) => state.movieApp.bannerData);

  // Use the custom hook for "Trending" data
  // FIX: Renamed 'trendingData' to 'trendingMovies' to avoid conflict.
  // FIX: Corrected endpoint with a time_window (e.g., 'day' or 'week').
  const {
    data: trendingMovies, // Renamed to avoid conflict
    loading: trendingLoading, // Renamed for clarity
    error: trendingError,     // Renamed for clarity
  } = useFetch("/trending/all/day"); // Using 'day' as time_window

  // Use the custom hook for "Now Playing" movies
  const {
    data: nowPlayingMovies,
    loading: nowPlayingLoading,
    error: nowPlayingError,
  } = useFetch("/movie/now_playing");

  // Use the custom hook for "Top Rated" movies
  const {
    data: topRatedMovies,
    loading: topRatedLoading,
    error: topRatedError,
  } = useFetch("/movie/top_rated");

  // Use the custom hook for "Popular TV Shows"
  const {
    data: popularTvShows,
    loading: popularTvShowsLoading,
    error: popularTvShowsError,
  } = useFetch("/tv/popular");

  // NEW: Use the custom hook for "On The Air TV Shows"
  const {
    data: onTheAirTvShows,
    loading: onTheAirTvShowsLoading,
    error: onTheAirTvShowsError,
  } = useFetch("/tv/on_the_air");


  return (
    <div className="home-page">
      <BannerHome />

      {/* Trending Movies/TV Shows Section */}
      <div> {/* ADDED py-8 for consistent spacing */}
        {trendingLoading ? (
          <p className="text-white text-center text-lg">
            Loading trending content...
          </p>
        ) : trendingError ? (
          <p className="text-red-500 text-center text-lg">
            {trendingError}
          </p>
        ) : trendingMovies && trendingMovies.length > 0 ? (
          <HorizontalScroll data={trendingMovies} heading={"Trending"} />
        ) : (
          <p className="text-neutral-400 text-center text-lg">
            No "Trending" content available.
          </p>
        )}
      </div>

      {/* Now Playing Movies Section */}
      <div>
        {nowPlayingLoading ? (
          <p className="text-white text-center text-lg">
            Loading "Now Playing" movies...
          </p>
        ) : nowPlayingError ? (
          <p className="text-red-500 text-center text-lg">{nowPlayingError}</p>
        ) : nowPlayingMovies && nowPlayingMovies.length > 0 ? (
          <HorizontalScroll data={nowPlayingMovies} heading={"Now Playing Movies"} />
        ) : (
          <p className="text-neutral-400 text-center text-lg">
            No "Now Playing" movies available.
          </p>
        )}
      </div>

      {/* Top Rated Movies Section */}
      <div>
        {topRatedLoading ? (
          <p className="text-white text-center text-lg">
            Loading "Top Rated" movies...
          </p>
        ) : topRatedError ? (
          <p className="text-red-500 text-center text-lg">{topRatedError}</p>
        ) : topRatedMovies && topRatedMovies.length > 0 ? (
          <HorizontalScroll data={topRatedMovies} heading={"Top Rated Movies"} />
        ) : (
          <p className="text-neutral-400 text-center text-lg">
            No "Top Rated" movies available.
          </p>
        )}
      </div>

      {/* Popular TV Shows Section */}
      <div>
        {popularTvShowsLoading ? (
          <p className="text-white text-center text-lg">
            Loading "Popular" TV shows...
          </p>
        ) : popularTvShowsError ? (
          <p className="text-red-500 text-center text-lg">
            {popularTvShowsError}
          </p>
        ) : popularTvShows && popularTvShows.length > 0 ? (
          <HorizontalScroll data={popularTvShows} heading={"Popular TV Shows"} />
        ) : (
          <p className="text-neutral-400 text-center text-lg">
            No "Popular" TV shows available.
          </p>
        )}
      </div>

      {/* On The Air TV Shows Section */}
      <div>
        {onTheAirTvShowsLoading ? (
          <p className="text-white text-center text-lg">
            Loading "On The Air" TV shows...
          </p>
        ) : onTheAirTvShowsError ? (
          <p className="text-red-500 text-center text-lg">
            {onTheAirTvShowsError}
          </p>
        ) : onTheAirTvShows && onTheAirTvShows.length > 0 ? (
          <HorizontalScroll data={onTheAirTvShows} heading={"On The Air TV Shows"} />
        ) : (
          <p className="text-neutral-400 text-center text-lg">
            No "On The Air" TV shows available.
          </p>
        )}
      </div>

    </div>
  );
};

export default Home;