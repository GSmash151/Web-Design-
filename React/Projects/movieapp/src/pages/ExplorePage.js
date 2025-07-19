import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdb";
import Card from "../components/Card";

const ExplorePage = () => {
  const { explore } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalPageNo, setTotalPageNo] = useState(0);

  const fetchData = useCallback(
    async (isNewSearch = false) => {
      if (!explore) {
        setError("Invalid exploration type. Please specify 'movie' or 'tv'.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await tmdbApi.get(`/discover/${explore}`, {
          params: {
            page: pageNo,
          },
        });

        const newResults = response.data.results || [];

        setData((prevData) => {
          if (isNewSearch) return newResults;

          const uniqueNewResults = newResults.filter(
            (newItem) =>
              !prevData.some((existingItem) => existingItem.id === newItem.id)
          );

          return [...prevData, ...uniqueNewResults];
        });

        setTotalPageNo(response.data.total_pages);
        setHasMore(response.data.page < response.data.total_pages);
      } catch (err) {
        console.error(
          `Error fetching explore data for ${explore}:`,
          err.response?.data?.status_message || err.message
        );
        setError(`Failed to load ${explore} content. Please try again later.`);
      } finally {
        setLoading(false);
      }
    },
    [explore, pageNo]
  );

  // On explore type change: reset data and fetch first page
  useEffect(() => {
    setData([]);
    setPageNo(1);
    setHasMore(true);
    setError(null);
    fetchData(true);
  }, [explore]);

  // Load more when page number increments
  useEffect(() => {
    if (pageNo > 1) {
      fetchData();
    }
  }, [pageNo, fetchData]);

  // Scroll listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        hasMore &&
        !loading
      ) {
        setPageNo((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  const pageTitle = explore
    ? `${explore
        .replace("_", " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")} Explore`
    : "Explore Content";

  return (
    <div className="explore-page px-4 sm:px-6 lg:px-8 py-8 text-white mt-16 min-h-[calc(100vh-200px)]">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        {pageTitle}
      </h1>

      {loading && data.length === 0 && (
        <p className="text-center text-lg py-10">Loading content...</p>
      )}

      {error && (
        <p className="text-red-500 text-center text-lg py-10">{error}</p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-neutral-400 text-center text-lg py-10">
          No content found for "{explore ? explore.replace("_", " ") : ""}".
        </p>
      )}

      {data.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.map((item) => (
            <Card
              key={item.id}
              data={item}
              mediaType={item.media_type || explore.slice(0, -1)}
            />
          ))}
        </div>
      )}

      {hasMore && !loading && data.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPageNo((prevPageNo) => prevPageNo + 1)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}

      {loading && data.length > 0 && (
        <p className="text-center text-lg mt-4">Loading more...</p>
      )}
    </div>
  );
};

export default ExplorePage;
