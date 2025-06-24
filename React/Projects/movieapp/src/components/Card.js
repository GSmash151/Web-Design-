// src/components/Card.js
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ data, mediaType }) => {
    const type = mediaType || data.media_type;
    const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
    
    const imageUrl = data.poster_path
        ? `${posterBaseUrl}${data.poster_path}`
        : "https://placehold.co/500x750/333333/FFFFFF?text=No+Poster";

    const renderStars = (voteAverage) => {
        const maxStars = 5;
        const validVoteAverage = typeof voteAverage === 'number' ? voteAverage : 0;
        const filledStarsCount = Math.round(validVoteAverage / 2);

        const stars = [];
        for (let i = 0; i < filledStarsCount; i++) {
            stars.push(<span key={`star-filled-${i}`} className="text-yellow-400">★</span>);
        }
        for (let i = 0; i < maxStars - filledStarsCount; i++) {
            stars.push(<span key={`star-empty-${i}`} className="text-gray-400">☆</span>);
        }
        return <div className="flex items-center gap-0.5">{stars}</div>; // Reduced gap for stars
    };

    return (
        <Link to={`/${type}/${data.id}`}>
            <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer flex flex-col h-full">
                {/* Image Container with 2:3 Aspect Ratio for Uniform Height */}
                {/* pb-[150%] means padding-bottom is 150% of the width (for 2:3 ratio) */}
                <div className="relative w-full pb-[150%] bg-neutral-700"> 
                    <img
                        src={imageUrl}
                        alt={data.title || data.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/500x750/333333/FFFFFF?text=Image+Load+Failed";
                        }}
                    />
                </div>
                
                <div className="p-3 text-white flex flex-col flex-grow"> {/* flex-grow to ensure content fills remaining space */}
                   
                    {/* Rating and Popularity display - Adjusted spacing and font size */}
                    <div className="flex items-center gap-1 text-xs mb-2 flex-wrap"> {/* text-xs and flex-wrap */}
                        {data.vote_average > 0 && renderStars(data.vote_average)}
                        {data.vote_average > 0 && (
                            <span className="font-semibold whitespace-nowrap"> {/* whitespace-nowrap to keep number together */}
                                {Number(data.vote_average).toFixed(1)}/10
                            </span>
                        )}
                        {/* Check if popularity exists and is a number before displaying */}
                        {data.popularity && typeof data.popularity === 'number' && (
                            <span className="font-semibold border-l border-gray-500 pl-1.5 ml-1.5 whitespace-nowrap"> {/* Adjusted padding/margin */}
                                Views: {Number(data.popularity).toFixed(0)}
                            </span>
                        )}
                    </div>
                    
                    <p className="text-sm text-neutral-400 mt-auto"> {/* mt-auto pushes year to bottom */}
                        {data.release_date || data.first_air_date ? 
                         (data.release_date || data.first_air_date).substring(0, 4) : 'N/A'}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
