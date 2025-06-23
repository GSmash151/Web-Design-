import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieApp.bannerData);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback to empty array if bannerData is missing
  const results = bannerData?.results?.slice(0, 5) || [];

  // Auto-rotate only if there is data
  useEffect(() => {
    if (results.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % results.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [results.length]);

  if (results.length === 0) {
    return (
      <div className="text-white text-center py-8">
        Loading amazing content...
      </div>
    );
  }

  const featuredItem = results[activeIndex];
  const imageBaseUrl = "https://image.tmdb.org/t/p/original";
  const imageUrl = featuredItem.backdrop_path
    ? `${imageBaseUrl}${featuredItem.backdrop_path}`
    : "https://placehold.co/1280x720/333333/FFFFFF?text=No+Image";

  return (
    <section
      className="h-[500px] pt-16 bg-cover bg-center relative transition-all duration-500"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 px-6 lg:px-16 h-full flex flex-col justify-center">
        <div className="text-white max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
            {featuredItem.title || featuredItem.name}
          </h2>
          <p className="text-lg mb-6 line-clamp-3 drop-shadow-sm">
            {featuredItem.overview}
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-xl">
            Watch Now
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {results.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? "bg-white" : "bg-gray-500"
              } transition-all duration-300`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerHome;
