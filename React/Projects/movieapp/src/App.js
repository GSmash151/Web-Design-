// src/App.js

import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/movieAppSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await axios.get("/trending/all/week");

        // FIX: Pass only the data as the payload
        dispatch(setBannerData(response.data));

        console.log("response:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchConfiguration = async () => {
      try {
        const response = await axios.get("/configuration");
        dispatch(setImageURL(response.data.images.secure_base_url+"original"))
      } catch (error) {}
    };

    fetchTrendingData();
    fetchConfiguration();
  }, [dispatch]); // Add dispatch to dependency array (though it's stable)

  return (
    <div className="App text-white bg-neutral-900 min-h-screen">
      <main className="pb-14 lg:pb-0 ">
        <Header />
        <div className="">
          <Outlet />
        </div>
        <Footer />
        <MobileNavigation />
      </main>
    </div>
  );
};

export default App;
