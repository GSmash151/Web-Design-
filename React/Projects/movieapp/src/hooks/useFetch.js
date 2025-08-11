import { useEffect, useState } from "react";
import tmdbApi from "../api/tmdb"; // Ensure this path is correct based on your file structure

const useFetch = (endpoint) => {
  const [data, setData] = useState(null); // Initialize with null, or [] if always expecting an array
  const [loading, setLoading] = useState(true); // Set to true initially as data starts loading
  const [error, setError] = useState(null); // Consolidated error state

  const fetchData = async () => {
    setLoading(true); // Indicate loading has started
    setError(null);   // Clear any previous errors

    if (!endpoint) { // Handle cases where endpoint might be empty
      setData(null);
      setLoading(false);
      setError("No API endpoint provided.");
      return;
    }

    try {
      const response = await tmdbApi.get(endpoint);
      // TMDb APIs sometimes return 'results' array, sometimes a direct object (e.g., /configuration)
      // Check if results exists, otherwise use the whole data object
      setData(response.data.results || response.data);
      // console.log(`Data from ${endpoint}:`, response.data.results || response.data); // Dynamic log
    } catch (err) {
      console.error(`Error fetching data from ${endpoint}:`, err);
      // Provide a more generic error message for the hook consumer
      setError(`Failed to load data for ${endpoint}. Please try again later.`);
    } finally {
      setLoading(false); // Loading finished, regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]); // Re-run effect if the endpoint changes

  return { data, loading, error }; // Return error state as well
};

export default useFetch;