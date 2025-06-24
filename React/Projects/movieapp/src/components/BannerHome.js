import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"; // Importing icons
import { Link } from "react-router-dom"; // For linking to details page

// Helper component to render a single banner slide's content
const BannerSlideContent = ({ data, imageBaseUrl, renderStars }) => (
  <div className="min-w-full min-h-full h-full relative">
    {/* Background image */}
    <img
      src={
        data.backdrop_path
          ? `${imageBaseUrl}${data.backdrop_path}`
          : "https://placehold.co/1920x1080/333333/FFFFFF?text=No+Image+Available"
      }
      alt={data.title || data.name}
      className="h-full w-full object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          "https://placehold.co/1920x1080/333333/FFFFFF?text=Image+Load+Failed";
      }}
    />

    {/* Semi-transparent black overlay */}
    <div className="absolute inset-0 bg-black/20 z-10" />

    {/* Text content (Title, Overview, Rating, Button) */}
    <div className="absolute bottom-0 w-full px-4 sm:px-8 lg:px-16 z-20 pb-8 sm:pb-12 lg:pb-16">
      {" "}
      {/* Adjusted padding-bottom */}
      <div className="text-white max-w-2xl">
        {/* Media Type Label - hidden on mobile, inline-block on sm+ */}
        {data.media_type && (
          <span
            className="text-xs px-2 py-1 rounded-full uppercase font-semibold mb-2 hidden sm:inline-block
                                     bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:from-yellow-500 hover:to-red-600 transition-colors duration-300"
          >
            {data.media_type === "movie" ? "Movie" : "TV Show"}
          </span>
        )}

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg leading-tight">
          {data?.title || data?.name}
        </h2>

        {/* Rating and Popularity display */}
        <div className="flex items-center gap-4 mb-2 sm:mb-6">
          {data.vote_average && renderStars(data.vote_average)}
          {data.vote_average && (
            <span className="text-sm sm:text-base font-semibold">
              {Number(data.vote_average).toFixed(1)}/10
            </span>
          )}
          {data.popularity && (
            <span className="text-sm sm:text-base font-semibold border-l border-gray-500 pl-4">
              Views: {Number(data.popularity).toFixed(0)}
            </span>
          )}
        </div>

        {/* Overview/description */}
        <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-4 line-clamp-3 drop-shadow-sm">
          {data.overview}
        </p>

        {/* Watch Now button - hidden on mobile, block on sm+ */}
        <Link to={"/" + data?.media_type + "/" + data.id}>
          <button
            className="font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-300 shadow-xl text-sm sm:text-base hidden sm:block 
                                       bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:from-yellow-500 hover:to-red-600"
          >
            Play Now
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const BannerHome = () => {
  // Corrected Redux state access
  const bannerData = useSelector((state) => state.movieApp.bannerData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  // Filter results to ensure valid backdrop_path and limit to 5
  const results =
    bannerData?.results?.filter((item) => item.backdrop_path).slice(0, 5) || [];

  // Helper function for star rendering (moved outside for clarity and reusability)
  const renderStars = (voteAverage) => {
    const maxStars = 5;
    const filledStarsCount = Math.round(voteAverage / 2);

    const stars = [];
    for (let i = 0; i < filledStarsCount; i++) {
      stars.push(
        <span key={`star-filled-${i}`} className="text-yellow-400">
          ★
        </span>
      );
    }
    for (let i = 0; i < maxStars - filledStarsCount; i++) {
      stars.push(
        <span key={`star-empty-${i}`} className="text-gray-400">
          ☆
        </span>
      );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // Carousel navigation handlers
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % results.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + results.length) % results.length
    );
  };

  // Auto-play effect
  useEffect(() => {
    if (results.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % results.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [results.length]); // Dependency Array: Only re-run if results.length changes

  // Loading state display
  if (results.length === 0) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-120px)] sm:h-[calc(100vh-64px)] text-white text-xl mt-16">
        Loading amazing content...
      </div>
    );
  }

  return (
    // Main banner container - defines overall size and positioning context
    <div className="relative w-full h-[calc(100vh-120px)] sm:h-[calc(100vh-64px)] overflow-hidden rounded-lg shadow-xl mt-16 group">
      {/* Carousel slides container - uses flex for horizontal arrangement and transform for sliding */}
      <div
        className="flex w-full h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {results.map((data, index) => (
          <BannerSlideContent
            key={data.id || index} // Use unique ID for key, fallback to index
            data={data}
            imageBaseUrl={imageBaseUrl}
            renderStars={renderStars}
          />
        ))}
      </div>

      {/* Navigation Buttons (Left/Right) - hidden on mobile, flex on desktop hover */}
      <div className="absolute top-0 w-full h-full hidden md:flex items-center justify-between px-4 sm:px-8 lg:px-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrevious}
          className="bg-white p-1 rounded-full text-xl text-black bg-opacity-70 hover:bg-opacity-100 transition-opacity"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-white p-1 rounded-full text-xl text-black bg-opacity-70 hover:bg-opacity-100 transition-opacity"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default BannerHome;
