// src/components/Card.js
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const Card = ({ data, mediaType }) => {
  const type = mediaType || data.media_type;
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  const imageUrl = data.poster_path
    ? `${posterBaseUrl}${data.poster_path}`
    : "https://placehold.co/500x750/333333/FFFFFF?text=No+Poster";

  // Function to get video quality based on vote_average or other criteria
  const getVideoQuality = (voteAverage) => {
    // This is a simplified example; you might have actual video quality data from TMDb
    // For a more realistic scenario, you'd check for a 'video' property or resolution info
    if (typeof voteAverage !== "number") return "N/A";

    if (voteAverage >= 7.5) {
      // Higher threshold for "HD" based on ratings
      return "HD";
    } else if (voteAverage >= 5.5) {
      // Mid-range for "SD"
      return "SD";
    } else {
      return "LQ"; // Lower Quality
    }
  };

  const renderStars = (voteAverage) => {
    const maxStars = 5;
    const validVoteAverage = typeof voteAverage === "number" ? voteAverage : 0;
    const filledStarsCount = Math.round(validVoteAverage / 2); // Convert 0-10 scale to 0-5 stars

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
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  //const releaseDate = data.release_date || data.first_air_date;
  //const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";

  return (
    <Link to={`/${data.media_type}/${data.id}`}>
      <div className="w-full rounded-3xl bg-neutral-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer flex flex-col">
        {/* Image Container with 2:3 Aspect Ratio for Uniform Height */}
        <div className="relative rounded-xl min-w-[230px] max-w-[230px]h-80 pb-[150%] bg-neutral-700 overflow-hidden">
          <img
            src={imageUrl}
            alt={data.title || data.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/500x750/333333/FFFFFF?text=Image+Load+Failed";
            }}
          />

          {/* Rating and Popularity display - Top Right */}
          {/* Adjusted top and right for better spacing, rounded-bl-lg for bottom-left corner round */}
          <div className="absolute py-1 px-1 top-1 rounded-r-3xl backdrop-blur-3xl bg-black/50 flex gap-1 text-sm">
            {data.vote_average > 0 && renderStars(data.vote_average)}
            {data.vote_average > 0 && (
              <span className="font-semibold whitespace-nowrap">
                {Number(data.vote_average).toFixed(1)}/10
              </span>
            )}
            {data.popularity && typeof data.popularity === "number" && (
              <span className="font-semibold border-l border-gray-300 pl-1.5 ml-1.5 whitespace-nowrap">
                Views: {Number(data.popularity).toFixed(0)}
              </span>
            )}
          </div>

          <div className="absolute bottom-0 w-full h-12 p-2  backdrop-blur-xl bg-black/20 flex justify-between overflow-hidden">
            {/* Release Date - Bottom Left Absolute */}
            <div className="text-xs text-white font-semibold left-2 p-2">
              <p className="">
                {moment(data.release_date).format("MMM Do YYYY")}
              </p>
            </div>

            {/* Video Quality - Bottom Right Absolute */}
            <div className="bg-yellow-700 rounded-xl text-white text-xs font-semibold right-2 p-2 ">
              {getVideoQuality(data.vote_average)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
