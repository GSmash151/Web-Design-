// src/App.js

import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import "./App.css";
// REMOVED: import axios from "axios"; // No longer needed for direct calls here
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// IMPORTING THE CENTRALIZED AXIOS INSTANCE
import tmdbAxiosInstance from "./api/tmdb"; // Ensure this path is correct: src/api/tmdb.js
import { setBannerData, setImageURL } from "./store/movieAppSlice";

// REMOVED: TMDB_BASE_URL and TMDB_ACCESS_TOKEN declarations as they are now in src/api/tmdb.js
// REMOVED: axiosInstance creation as it's now imported

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to fetch trending data
    const fetchTrendingData = async () => {
      try {
        // USE THE IMPORTED tmdbAxiosInstance
        const response = await tmdbAxiosInstance.get("/trending/all/week");
        dispatch(setBannerData(response.data));
        console.log("Trending data fetched:", response.data);
      } catch (error) {
        // More descriptive error logging for network/API issues
        console.error("Error fetching trending data:", error.response?.data?.status_message || error.message);
      }
    };

    // Function to fetch API configuration (e.g., image base URLs)
    const fetchConfiguration = async () => {
      try {
        // USE THE IMPORTED tmdbAxiosInstance
        const response = await tmdbAxiosInstance.get("/configuration");
        // Ensure you're setting the full original base URL for images
        dispatch(setImageURL(response.data.images.secure_base_url + "original"));
        console.log("Configuration fetched:", response.data.images.secure_base_url + "original");
      } catch (error) {
        console.error("Error fetching configuration:", error.response?.data?.status_message || error.message);
      }
    };

    // Call the fetch functions.
    // The token check is now encapsulated within the tmdbAxiosInstance in src/api/tmdb.js.
    fetchTrendingData();
    fetchConfiguration();

  }, [dispatch]); // dispatch is stable, but good practice to include

  return (
    <div className="App text-white bg-neutral-900 min-h-screen">
      <main className="pb-14 lg:pb-0 ">
        <Header />
        {/* This div should NOT have pt-16 if BannerHome has mt-16 for correct spacing */}
        <div> 
          <Outlet />
        </div>
        <Footer />
        <MobileNavigation />
      </main>
    </div>
  );
};

export default App;
