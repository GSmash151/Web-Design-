// src/components/BannerHome.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BannerSlideContent = ({ data, imageBaseUrl, renderStars }) => {
  const releaseDate = data.release_date || data.first_air_date || "N/A";
  const releaseYear = releaseDate.substring(0, 4);

  return (
    <div className="min-w-full min-h-full relative">
      {/* Background Image */}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="absolute bottom-0 w-full px-4 sm:px-8 lg:px-16 z-20 pb-4 sm:pb-12 lg:pb-16 text-white max-w-2xl">
        {/* Media Type */}
        {data.media_type && (
          <span className="text-xs px-2 py-1 rounded-full uppercase font-semibold mb-2 inline-block bg-gradient-to-r from-red-600 to-yellow-500 text-white">
            {data.media_type === "movie" ? "Movie" : "TV Show"}
          </span>
        )}

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg leading-tight">
          {data?.title || data?.name}
        </h2>

        {/* Stars + Vote + Popularity */}
        <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-6">
          {data.vote_average && renderStars(data.vote_average)}
          {data.vote_average && (
            <span className="text-sm sm:text-base font-semibold">
              {Number(data.vote_average).toFixed(1)}/10
            </span>
          )}
          {data.popularity && (
            <span className="text-xs sm:text-base font-semibold border-l border-gray-500 pl-2 sm:pl-4">
              Views: {Number(data.popularity).toFixed(0)}
            </span>
          )}
        </div>

        {/* Overview */}
        <p className="text-xs sm:text-base md:text-lg mb-4 line-clamp-2 sm:line-clamp-3 drop-shadow-sm">
          {data.overview}
        </p>

        {/* CTA Button */}
        <Link to={`/${data?.media_type}/${data.id}`}>
          <button className="font-bold py-2 px-4 rounded-lg shadow-xl text-sm sm:text-base block bg-gradient-to-r from-red-600 to-yellow-500 text-white hover:from-yellow-500 hover:to-red-600 transition-colors duration-300">
            Play Now
          </button>
        </Link>
      </div>

      {/* Absolute Footer Info */}
      <div className="absolute hidden lg:flex bottom-2 left-4 z-30 text-xs sm:text-sm text-white bg-black/50 px-2 py-1 rounded shadow">
        {releaseYear}
      </div>
      <div className="absolute hidden lg:flex bottom-2 right-4 z-30 text-xs sm:text-sm text-white bg-black/50 px-2 py-1 rounded shadow">
        HD
      </div>
    </div>
  );
};

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieApp.bannerData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  const results =
    bannerData?.results?.filter((item) => item.backdrop_path).slice(0, 5) || [];

  const renderStars = (voteAverage) => {
    const maxStars = 5;
    const filledStars = Math.round((voteAverage || 0) / 2);
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }, (_, i) => (
          <span
            key={i}
            className={i < filledStars ? "text-yellow-400" : "text-gray-400"}
          >
            {i < filledStars ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % results.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + results.length) % results.length
    );
  };

  useEffect(() => {
    if (results.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % results.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [results.length]);

  if (results.length === 0) {
    return (
      <div className="flex justify-center items-center h-72 sm:h-[calc(100vh-64px)] text-white text-xl mt-16">
        Loading amazing content...
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 sm:h-[calc(100vh-64px)] overflow-hidden rounded-lg shadow-xl group">
      {/* Slides */}
      <div
        className="flex w-full h-full transition-transform duration-500"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {results.map((data, index) => (
          <BannerSlideContent
            key={data.id || index}
            data={data}
            imageBaseUrl={imageBaseUrl}
            renderStars={renderStars}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-0 w-full h-full flex items-center justify-between px-2 sm:px-4 lg:px-2 z-30 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={handlePrevious}
          className="bg-white p-1 rounded-full text-xl text-black bg-opacity-70 hover:bg-opacity-100 hidden sm:flex"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={handleNext}
          className="bg-white p-1 rounded-full text-xl text-black bg-opacity-70 hover:bg-opacity-100 hidden sm:flex"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default BannerHome;
