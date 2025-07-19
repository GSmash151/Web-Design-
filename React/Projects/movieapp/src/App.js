import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import tmdbAxiosInstance from "./api/tmdb";
import { setBannerData, setImageURL } from "./store/movieAppSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch trending data
        const trendingResponse = await tmdbAxiosInstance.get("/trending/all/week");
        dispatch(setBannerData(trendingResponse.data));
        console.log("Trending data fetched:", trendingResponse.data);

        // Fetch API configuration
        const configResponse = await tmdbAxiosInstance.get("/configuration");
        const imageUrl = configResponse.data.images.secure_base_url + "original";
        dispatch(setImageURL(imageUrl));
        console.log("Configuration fetched, Image URL set to:", imageUrl);

      } catch (error) {
        console.error("Error during initial data fetch:", error.response?.data?.status_message || error.message);
        // Optionally, dispatch an error action to Redux store
      }
    };

    fetchInitialData();

  }, [dispatch]); // dispatch is stable, but good practice to include

  return (
    <div className="App text-white bg-neutral-900 min-h-screen">
      <main className="pb-14 lg:pb-0">
        <Header />
        {/*
          Removed pt-16 from this div to prevent double padding if BannerHome has mt-16.
          The spacing should be managed by the individual components (like BannerHome)
          or by their parent containers using padding/margin directly.
          Outlet will render the routed components here.
        */}
        <div className="pt-16"> {/* Add padding top here to ensure content is below fixed header */}
          <Outlet />
        </div>
        <Footer />
        <MobileNavigation />
      </main>
    </div>
  );
};

export default App;